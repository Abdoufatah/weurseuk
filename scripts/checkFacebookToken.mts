import { runFacebookPageTokenCheck } from "../server/facebookTokenMonitor";

const result = await runFacebookPageTokenCheck();

if (!result.ok) {
  console.error(JSON.stringify(result));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(result));
}
