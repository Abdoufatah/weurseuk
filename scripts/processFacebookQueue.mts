import { runFacebookPublicationQueue } from "../server/facebookPublisher";

const result = await runFacebookPublicationQueue(4);
console.log(JSON.stringify(result));

if (result.failed > 0) {
  process.exitCode = 1;
}
