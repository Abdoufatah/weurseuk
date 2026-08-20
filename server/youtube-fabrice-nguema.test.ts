import { describe, expect, it } from "vitest";
import { isFabriceNguemaPressReview } from "./youtube-sync";

describe("sélection de la revue Fabrice Nguéma", () => {
  it("reconnaît les deux intitulés diffusés par SenTV", () => {
    expect(isFabriceNguemaPressReview("Revue de Presse en Français du Jeudi 20 Aout 2026 avec Fabrice Nguema")).toBe(true);
    expect(isFabriceNguemaPressReview("Revue des Titres Français du Jeudi 20 Aout 2026 avec Fabrice Nguema")).toBe(true);
  });

  it("écarte les vidéos SenTV qui ne relèvent pas de la revue Fabrice Nguéma", () => {
    expect(isFabriceNguemaPressReview("JT 20H du Jeudi 20 Aout 2026")).toBe(false);
    expect(isFabriceNguemaPressReview("Revue de Presse en Français avec un autre présentateur")).toBe(false);
  });
});
