import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./youtube-sync", () => ({
  syncYouTubeVideos: vi.fn(),
  syncAidaraPressReview: vi.fn(),
  syncFabriceNguemaPressReview: vi.fn(),
}));

import {
  syncAidaraPressReview,
  syncFabriceNguemaPressReview,
  syncYouTubeVideos,
} from "./youtube-sync";
import { runScheduledYoutubeSync } from "./youtubeScheduled";

describe("synchronisation YouTube planifiée", () => {
  beforeEach(() => vi.clearAllMocks());

  it("actualise les vidéos tendances et les deux revues de presse dans une même exécution", async () => {
    vi.mocked(syncYouTubeVideos).mockResolvedValue({ newVideos: 3, errors: 0 });
    vi.mocked(syncAidaraPressReview).mockResolvedValue({ newVideos: 1, latestVideo: { videoId: "aidara" } });
    vi.mocked(syncFabriceNguemaPressReview).mockResolvedValue({ newVideos: 1, latestVideo: { videoId: "fabrice" } });

    await expect(runScheduledYoutubeSync()).resolves.toEqual({
      videos: { newVideos: 3, errors: 0 },
      aidara: { newVideos: 1, latestVideo: { videoId: "aidara" } },
      fabriceNguema: { newVideos: 1, latestVideo: { videoId: "fabrice" } },
    });
  });
});
