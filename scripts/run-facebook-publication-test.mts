import { runFacebookPublicationQueue } from "../server/facebookPublisher";

const result = await runFacebookPublicationQueue(1);
console.log(JSON.stringify(result));

if (result.published !== 1 || result.failed !== 0) {
  process.exitCode = 1;
}
