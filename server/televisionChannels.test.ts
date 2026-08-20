import { describe, expect, it } from "vitest";
import { getUploadsPlaylistId, isEmbeddableChannel, TV_CHANNELS } from "../client/src/pages/Television";

describe("Télévision — sélection éditoriale", () => {
  it("inclut les chaînes sénégalaises et internationales demandées avec leurs identifiants officiels", () => {
    const names = TV_CHANNELS.map((channel) => channel.name);

    expect(names).toEqual(expect.arrayContaining(["RTS", "2STV", "SenTV", "iTV", "Marodi TV", "Evenprod", "Canal Info News", "TV5MONDE", "France 24"]));
    expect(TV_CHANNELS.find((channel) => channel.id === "rts")?.channelId).toBe("UC3Pwur55-OPFYDN_xg6JR_w");
    expect(TV_CHANNELS.find((channel) => channel.id === "tfm")?.channelId).toBe("UC5NQ49FVRIAuWE1el6L2gkg");
    expect(TV_CHANNELS.find((channel) => channel.id === "sentv")?.channelId).toBe("UCKbMNmSR3KlI9v3xeInHEYA");
    expect(TV_CHANNELS.find((channel) => channel.id === "itv-senegal")?.channelId).toBe("UCIdNAY1QlzXahhX6lsZv2kg");
    expect(TV_CHANNELS.find((channel) => channel.id === "marodi-tv")?.channelId).toBe("UCqe0sSESmaQbLFdTExctQLA");
    expect(TV_CHANNELS.find((channel) => channel.id === "evenprod")?.channelId).toBe("UCKKbOgsOxOT83r1TdfjMaYg");
    expect(TV_CHANNELS.find((channel) => channel.id === "france24")?.channelId).toBe("UCQfwfsi5VrQ8yKZ-UWmAEFg");
  });

  it("distingue explicitement les chaînes sénégalaises des chaînes internationales", () => {
    expect(TV_CHANNELS.filter((channel) => channel.group === "senegal")).toHaveLength(9);
    expect(TV_CHANNELS.filter((channel) => channel.group === "international")).toHaveLength(2);
  });

  it("identifie Canal Info News comme une archive non diffusée en direct", () => {
    const canalInfo = TV_CHANNELS.find((channel) => channel.id === "canal-info-news");
    expect(canalInfo?.isArchive).toBe(true);
    expect(canalInfo?.channelId).toBe("PLBtKFt06Urb4n-6wzf8YI3SV4hUPhC3yT");
    expect(canalInfo).toBeDefined();
    expect(isEmbeddableChannel(canalInfo!)).toBe(false);
  });

  it("construit la playlist de publications à partir de l’identifiant de chaîne", () => {
    expect(getUploadsPlaylistId("UCdtKKcnU-hHejE2mVVk61kA")).toBe("UUdtKKcnU-hHejE2mVVk61kA");
  });
});
