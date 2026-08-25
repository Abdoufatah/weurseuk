import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("Accueil — revues de presse compactes", () => {
  it("aligne les deux revues sur les écrans Télévision compacts", () => {
    expect(homeSource).toContain("REVUES DE PRESSE QUOTIDIENNES — FORMAT COMPACT");
    expect(homeSource).toContain("mx-auto max-w-[640px]");
    expect(homeSource).toContain("grid grid-cols-1 gap-3 sm:grid-cols-2");
    expect(homeSource).toContain("relative aspect-video overflow-hidden rounded-md bg-black shadow-sm");
  });

  it("préserve les deux lecteurs à la demande et leurs accès aux éditions complètes", () => {
    expect(homeSource).toContain("<LazyYouTubeEmbed");
    expect(homeSource).toContain("https://www.youtube.com/embed/${aidaraLatest.videoId}");
    expect(homeSource).toContain("https://www.youtube.com/embed/${fabriceNguemaLatest.videoId}");
    expect(homeSource).toContain("https://www.youtube.com/watch?v=${aidaraLatest.videoId}");
    expect(homeSource).toContain("https://www.youtube.com/watch?v=${fabriceNguemaLatest.videoId}");
  });

  it("indique que les encarts présentent la dernière édition effectivement disponible", () => {
    expect(homeSource).toContain("Dernières éditions disponibles");
    expect(homeSource).toContain("formatLatestEdition(aidaraLatest.publishedAt)");
    expect(homeSource).toContain("formatLatestEdition(fabriceNguemaLatest.publishedAt)");
  });

  it("répartit la Télévision sur les côtés des dépêches centrales tout en conservant toutes les sources", () => {
    expect(homeSource).toContain("Télévision");
    expect(homeSource).toContain('"rts", "2stv", "marodi-tv", "sentv", "tfm", "evenprod"');
    expect(homeSource).toContain("televisionPreviews.slice(0, 3)");
    expect(homeSource).toContain("televisionPreviews.slice(3, 6)");
    expect(homeSource).toContain("televisionColumns.map");
    expect(homeSource).toContain("otherTelevisionChannels.map");
    expect(homeSource).toContain("getUploadsPlaylistId(channel.channelId)");
    expect(homeSource).toContain("Dernières vidéos de ${channel.fullName}");
    expect(homeSource).toContain("lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]");
    expect(homeSource).toContain("Dernières dépêches");
    expect(homeSource).toContain("articles.slice(0, 4)");
  });

  it("place les deux revues quotidiennes avant la télévision et les vidéos tendances", () => {
    const aidaraIndex = homeSource.indexOf("AHMED AÏDARA");
    const fabriceIndex = homeSource.indexOf("FABRICE NGUÉMA");
    const televisionIndex = homeSource.indexOf("DÉPÊCHES CENTRALES & TÉLÉVISION LATÉRALE");
    const trendsIndex = homeSource.indexOf("Vidéos tendances — après les deux revues quotidiennes");

    expect(aidaraIndex).toBeGreaterThan(-1);
    expect(fabriceIndex).toBeGreaterThan(aidaraIndex);
    expect(televisionIndex).toBeGreaterThan(fabriceIndex);
    expect(trendsIndex).toBeGreaterThan(televisionIndex);
  });

  it("remplace la carte Croisette par la synthèse Bensirac dans la section À la Une", () => {
    expect(homeSource).toContain("const featuredSynthesis = latestThree?.[0]");
    expect(homeSource).toContain("synthèse native sourcée, distincte du bloc éditorial supérieur");
    expect(homeSource).toContain("editorialSlug={featuredSynthesis.slug}");
    expect(homeSource).not.toContain("featuredArticles.slice(0, 1)");
  });

  it("place le bloc éditorial À la Une avant le visuel immersif de l’accueil", () => {
    const uneIndex = homeSource.indexOf("BLOC À LA UNE — priorité éditoriale");
    const heroIndex = homeSource.indexOf("HERO IMMERSIF");

    expect(uneIndex).toBeGreaterThan(-1);
    expect(heroIndex).toBeGreaterThan(uneIndex);
  });
});
