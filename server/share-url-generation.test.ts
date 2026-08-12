import { describe, expect, it } from "vitest";
import { buildShareUrl, type ShareNetwork } from "../client/src/lib/shareUrls";

const articleUrl = "https://weurseuk.com/editorial/capture-legislative";
const payload = {
  url: articleUrl,
  title: "Capture législative",
  excerpt: "Une analyse fondée sur des critères observables.",
  authorName: "Bensirac",
};

describe("génération exécutable des liens de partage", () => {
  const domains: Record<ShareNetwork, string> = {
    "WhatsApp": "https://wa.me/?text=",
    "X (Twitter)": "https://twitter.com/intent/tweet?",
    "Facebook": "https://www.facebook.com/sharer/sharer.php?u=",
    "LinkedIn": "https://www.linkedin.com/sharing/share-offsite/?url=",
    "Telegram": "https://t.me/share/url?url=",
  };

  (Object.keys(domains) as ShareNetwork[]).forEach((network) => {
    it(`produit un lien ${network} avec l’URL canonique encodée`, () => {
      const result = buildShareUrl(network, payload);
      expect(result.startsWith(domains[network])).toBe(true);
      expect(result).toContain(encodeURIComponent(articleUrl));
      expect(result).not.toContain("/api/og/");
    });
  });
});
