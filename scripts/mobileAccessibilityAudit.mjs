import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";

const port = 9333;
const profile = "/tmp/weurseuk-cdp-mobile-profile";
const output = "/tmp/weurseuk-mobile-accessibility-audit.json";
const url = "https://weurseuk.com/?release=b5af0984&mobile-interaction-audit=1";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForDebugger() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      // Chromium est encore en démarrage.
    }
    await delay(150);
  }
  throw new Error("Le débogueur Chromium n’a pas démarré.");
}

async function openCdpSocket(socketUrl) {
  const socket = new WebSocket(socketUrl);
  const pending = new Map();
  let nextId = 1;

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(String(data));
    const resolver = pending.get(message.id);
    if (!resolver) return;
    pending.delete(message.id);
    if (message.error) resolver.reject(new Error(message.error.message));
    else resolver.resolve(message.result);
  });

  return {
    send(method, params = {}) {
      const id = nextId++;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    close() {
      socket.close();
    },
  };
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  return result.result.value;
}

async function pressKey(cdp, key, code, keyCode) {
  await cdp.send("Input.dispatchKeyEvent", {
    type: "rawKeyDown",
    key,
    code,
    windowsVirtualKeyCode: keyCode,
    nativeVirtualKeyCode: keyCode,
  });
  await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: keyCode });
}

async function click(cdp, point) {
  await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", x: point.x, y: point.y, button: "left", clickCount: 1 });
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: point.x, y: point.y, button: "left", clickCount: 1 });
}

await rm(profile, { recursive: true, force: true });
await mkdir(profile, { recursive: true });

const chromium = spawn("chromium", [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: "ignore" });

try {
  await waitForDebugger();
  const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" }).then((response) => response.json());
  const cdp = await openCdpSocket(target.webSocketDebuggerUrl);

  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await cdp.send("Page.navigate", { url });
  let pageReady = false;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    await delay(200);
    pageReady = await evaluate(cdp, "document.readyState === 'complete' && Boolean(document.querySelector('#contenu-principal'))");
    if (pageReady) break;
  }
  if (!pageReady) throw new Error("La page publique n’a pas atteint son état interactif.");

  await pressKey(cdp, "Tab", "Tab", 9);
  await delay(220);
  const skipFocused = await evaluate(cdp, `(() => {
    const skip = document.querySelector('.skip-link');
    return {
      active: document.activeElement === skip,
      transform: getComputedStyle(skip).transform,
      visible: skip.matches(':focus-visible')
    };
  })()`);

  await pressKey(cdp, "Enter", "Enter", 13);
  await delay(120);
  const skipActivated = await evaluate(cdp, `({ hash: window.location.hash, mainExists: Boolean(document.querySelector('#contenu-principal')) })`);

  const menuPoint = await evaluate(cdp, `(() => {
    const button = document.querySelector('button[aria-controls="navigation-mobile"]');
    if (!button) return { x: 352, y: 28, found: false };
    const rect = button.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, found: true };
  })()`);
  await click(cdp, menuPoint);
  await delay(120);
  const menuOpened = await evaluate(cdp, `(() => {
    const button = document.querySelector('button[aria-controls="navigation-mobile"]');
    const nav = document.querySelector('#navigation-mobile nav');
    return { expanded: button.getAttribute('aria-expanded'), present: Boolean(nav), label: nav?.getAttribute('aria-label') };
  })()`);
  await click(cdp, menuPoint);
  await delay(120);
  const menuClosed = await evaluate(cdp, `(() => {
    const button = document.querySelector('button[aria-controls="navigation-mobile"]');
    return { expanded: button.getAttribute('aria-expanded'), present: Boolean(document.querySelector('#navigation-mobile')) };
  })()`);

  const screenshot = await cdp.send("Page.captureScreenshot", { format: "png" });
  await writeFile("/tmp/weurseuk-mobile-accessibility-interaction.png", Buffer.from(screenshot.data, "base64"));
  await writeFile(output, `${JSON.stringify({ pageReady, skipFocused, skipActivated, menuOpened, menuClosed }, null, 2)}\n`);
  cdp.close();
} finally {
  chromium.kill("SIGTERM");
  await delay(100);
  await rm(profile, { recursive: true, force: true });
}
