import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  getFacebookPublisherSettings: vi.fn(),
  enqueueEligibleFacebookEditorials: vi.fn(),
  getPendingFacebookPublicationJobs: vi.fn(),
  getFacebookPublicationEditorial: vi.fn(),
  markFacebookPublicationPublishing: vi.fn(),
  markFacebookPublicationPublished: vi.fn(),
  markFacebookPublicationFailed: vi.fn(),
}));

import {
  enqueueEligibleFacebookEditorials,
  getFacebookPublisherSettings,
  getPendingFacebookPublicationJobs,
} from "./db";
import { runFacebookPublicationQueue } from "./facebookPublisher";

describe("Facebook publication queue safety guard", () => {
  beforeEach(() => vi.clearAllMocks());

  it("n’envoie ni ne prépare de publication avant confirmation explicite", async () => {
    vi.mocked(getFacebookPublisherSettings).mockResolvedValue({
      isEnabled: false,
      firstPostConfirmed: false,
    } as never);

    await expect(runFacebookPublicationQueue()).resolves.toEqual({
      skipped: "publication-not-confirmed",
      queued: 0,
      published: 0,
      failed: 0,
    });
    expect(enqueueEligibleFacebookEditorials).not.toHaveBeenCalled();
    expect(getPendingFacebookPublicationJobs).not.toHaveBeenCalled();
  });
});
