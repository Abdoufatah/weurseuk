import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("Accueil — revues de presse compactes", () => {
  it("utilise deux lecteurs réduits au lieu des anciens lecteurs de 480 px", () => {
    expect(homeSource).toContain("sm:w-[260px] md:w-[300px] lg:w-[330px]");
    expect(homeSource).not.toContain("md:w-[480px]");
  });

  it("préserve les deux lecteurs et leurs accès vidéo tout en réduisant la densité du texte", () => {
    expect((homeSource.match(/Revue de presse du jour/g) ?? [])).toHaveLength(2);
    expect((homeSource.match(/hidden lg:block text-xs text-muted-foreground leading-relaxed line-clamp-2/g) ?? [])).toHaveLength(2);
    expect(homeSource).toContain("https://www.youtube.com/embed/${aidaraLatest.videoId}");
    expect(homeSource).toContain("https://www.youtube.com/embed/${fabriceNguemaLatest.videoId}");
  });

  it("rend la Télévision au même format compact que les vidéos tendances tout en conservant toutes les sources", () => {
    expect(homeSource).toContain("Télévision");
    expect(homeSource).toContain("televisionPreviews.map");
    expect(homeSource).toContain("otherTelevisionChannels.map");
    expect(homeSource).toContain("getUploadsPlaylistId(channel.channelId)");
    expect(homeSource).toContain("Dernières vidéos de ${channel.fullName}");
    expect(homeSource).toContain("grid-cols-2 gap-3 sm:grid-cols-4");
  });

  it("place les deux revues quotidiennes avant la télévision et les vidéos tendances", () => {
    const aidaraIndex = homeSource.indexOf("AHMED AÏDARA");
    const fabriceIndex = homeSource.indexOf("FABRICE NGUÉMA");
    const televisionIndex = homeSource.indexOf("format compact, aligné sur les vidéos tendances");
    const trendsIndex = homeSource.indexOf("Vidéos tendances — après les deux revues quotidiennes");

    expect(aidaraIndex).toBeGreaterThan(-1);
    expect(fabriceIndex).toBeGreaterThan(aidaraIndex);
    expect(televisionIndex).toBeGreaterThan(fabriceIndex);
    expect(trendsIndex).toBeGreaterThan(televisionIndex);
  });
});
