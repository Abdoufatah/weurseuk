import { syncAllRssSources } from "../server/rssService";

const results = await syncAllRssSources();
const summary = results.map((result) => ({
  source: result.sourceName,
  newArticles: result.newArticles,
  verifiedArticles: result.verifiedArticles,
  errors: result.errors,
}));

console.log(JSON.stringify(summary, null, 2));

if (summary.some((result) => result.errors.length > 0)) {
  process.exitCode = 1;
}
