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

  it("rend les sources Télévision visibles sur l’accueil et liées à leur sélection individuelle", () => {
    expect(homeSource).toContain("Télévision");
    expect(homeSource).toContain("TV_CHANNELS.map");
    expect(homeSource).toContain("/television?channel=${channel.id}");
  });
});
