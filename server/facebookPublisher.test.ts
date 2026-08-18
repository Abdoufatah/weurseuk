import { describe, expect, it } from "vitest";
import { buildFacebookEditorialPost } from "./facebookPublisher";

describe("Facebook editorial publication format", () => {
  it("prépare un message éditorial et une URL canonique sans contenu HTML", () => {
    const post = buildFacebookEditorialPost({
      title: "Fonds spéciaux : une réforme nécessaire",
      slug: "fonds-speciaux-senegal-reforme-necessaire-prise-en-otage",
      excerpt: "Une analyse  rigoureuse du débat institutionnel.",
      categorySlug: "analyses",
      authorName: "Abdou Fatah Fall",
      authorAlias: null,
      useAlias: false,
    });
    expect(post.targetUrl).toBe("https://weurseuk.com/analyses/fonds-speciaux-senegal-reforme-necessaire-prise-en-otage");
    expect(post.message).toContain("Par Abdou Fatah Fall");
    expect(post.message).toContain("Une analyse rigoureuse du débat institutionnel.");
  });

  it("utilise l’alias éditorial lorsqu’il est activé", () => {
    const post = buildFacebookEditorialPost({
      title: "Titre",
      slug: "titre",
      excerpt: null,
      categorySlug: "editorial",
      authorName: "Abdou Fatah Fall",
      authorAlias: "Bensirac",
      useAlias: true,
    });
    expect(post.message).toContain("Par Bensirac");
    expect(post.message).not.toContain("Par Abdou Fatah Fall");
  });
});
