import { describe, expect, it } from "vitest";
import { getUploadsPlaylistId, TV_CHANNELS } from "../client/src/pages/Television";

describe("Télévision — sélection éditoriale", () => {
  it("inclut les chaînes sénégalaises et internationales demandées avec leurs identifiants officiels", () => {
    const names = TV_CHANNELS.map((channel) => channel.name);

    expect(names).toEqual(expect.arrayContaining(["RTS", "2STV", "SenTV", "TV5MONDE", "France 24"]));
    expect(TV_CHANNELS.find((channel) => channel.id === "rts")?.channelId).toBe("UC3Pwur55-OPFYDN_xg6JR_w");
    expect(TV_CHANNELS.find((channel) => channel.id === "tfm")?.channelId).toBe("UC5NQ49FVRIAuWE1el6L2gkg");
    expect(TV_CHANNELS.find((channel) => channel.id === "sentv")?.channelId).toBe("UCKbMNmSR3KlI9v3xeInHEYA");
    expect(TV_CHANNELS.find((channel) => channel.id === "france24")?.channelId).toBe("UCQfwfsi5VrQ8yKZ-UWmAEFg");
  });

  it("distingue explicitement les chaînes sénégalaises des chaînes internationales", () => {
    expect(TV_CHANNELS.filter((channel) => channel.group === "senegal")).toHaveLength(5);
    expect(TV_CHANNELS.filter((channel) => channel.group === "international")).toHaveLength(2);
  });

  it("construit la playlist de publications à partir de l’identifiant de chaîne", () => {
    expect(getUploadsPlaylistId("UCdtKKcnU-hHejE2mVVk61kA")).toBe("UUdtKKcnU-hHejE2mVVk61kA");
  });
});
