import { getAllRssSources } from "../server/db.ts";
import { syncRssSource } from "../server/rssService.ts";

const sources = await getAllRssSources();
const source = sources.find((item) => item.name === "École de Synodalité de Dakar");

if (!source) {
  throw new Error("Source RSS de l’École de Synodalité de Dakar introuvable.");
}

const result = await syncRssSource(source);
console.log(JSON.stringify(result));

if (result.errors.length > 0) {
  process.exitCode = 1;
}
