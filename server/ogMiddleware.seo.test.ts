import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  getEditorialBySlug: vi.fn(),
  getAggregatedArticleBySlug: vi.fn(),
}));

import { getAggregatedArticleBySlug, getEditorialBySlug } from "./db";
import { ogMiddleware } from "./ogMiddleware";

type ResponseCapture = {
  body: string;
  headers: Record<string, string>;
  statusCode: number;
};

function makeResponse(): { response: any; capture: ResponseCapture } {
  const capture: ResponseCapture = { body: "", headers: {}, statusCode: 200 };
  const response = {
    status: (statusCode: number) => {
      capture.statusCode = statusCode;
      return response;
    },
    setHeader: (key: string, value: string) => {
      capture.headers[key] = value;
      return response;
    },
    send: (body: string) => {
      capture.body = body;
      return response;
    },
  };
  return { response, capture };
}

async function renderForCrawler(path: string) {
  const { response, capture } = makeResponse();
  const request = {
    path,
    protocol: "https",
    headers: { "user-agent": "Googlebot" },
    get: (header: string) => header === "host" ? "weurseuk.com" : undefined,
  };
  await ogMiddleware()(request as any, response as any, vi.fn());
  return capture;
}

describe("middleware OG — rendu SEO crawler", () => {
  beforeEach(() => vi.clearAllMocks());

  it("sert à l’accueil une URL canonique ainsi que Organization et WebSite", async () => {
    const page = await renderForCrawler("/");

    expect(page.statusCode).toBe(200);
    expect(page.body).toContain('<link rel="canonical" href="https://weurseuk.com" />');
    expect(page.body).toContain('"@type":"Organization"');
    expect(page.body).toContain('"@type":"WebSite"');
  });

  it("sert à un éditorial son canonique, NewsArticle et BreadcrumbList", async () => {
    vi.mocked(getEditorialBySlug).mockResolvedValue({
      title: "Une analyse de référence",
      slug: "analyse-reference",
      excerpt: "Un chapeau rigoureux.",
      content: "<p>Contenu</p>",
      coverImageUrl: "https://images.example.org/editorial.jpg",
      categorySlug: "analyses",
      categoryName: "Analyses",
      authorName: "Abdou Fatah Fall",
      authorAlias: "Bensirac",
      useAlias: true,
      publishedAt: new Date("2026-08-24T10:00:00Z"),
      updatedAt: new Date("2026-08-24T12:00:00Z"),
    } as any);

    const page = await renderForCrawler("/editorial/analyse-reference");

    expect(page.body).toContain('href="https://weurseuk.com/editorial/analyse-reference"');
    expect(page.body).toContain('<meta property="og:image:secure_url" content="https://images.example.org/editorial.jpg" />');
    expect(page.body).toContain('<meta property="og:image:alt" content="Une analyse de référence — Weurseuk" />');
    expect(page.body).toContain('"@type":"NewsArticle"');
    expect(page.body).toContain('"@type":"BreadcrumbList"');
    expect(page.body).toContain('"name":"Bensirac"');
  });

  it("sert à un article agrégé son canonique, NewsArticle et BreadcrumbList", async () => {
    vi.mocked(getAggregatedArticleBySlug).mockResolvedValue({
      title: "Une dépêche vérifiée",
      excerpt: "Un résumé documenté.",
      content: "<p>Texte</p>",
      sourceName: "Source partenaire",
      region: "Sénégal",
      imageUrl: "https://images.example.org/article.jpg",
      publishedAt: new Date("2026-08-24T08:00:00Z"),
      fetchedAt: new Date("2026-08-24T09:00:00Z"),
    } as any);

    const page = await renderForCrawler("/article/depeche-verifiee");

    expect(page.body).toContain('href="https://weurseuk.com/article/depeche-verifiee"');
    expect(page.body).toContain('<meta property="og:image:secure_url" content="https://images.example.org/article.jpg" />');
    expect(page.body).toContain('"@type":"NewsArticle"');
    expect(page.body).toContain('"@type":"BreadcrumbList"');
    expect(page.body).toContain('"name":"Source partenaire"');
  });

  it("versionne l’image interne de couverture afin que les réseaux sociaux puissent renouveler leur cache", async () => {
    vi.mocked(getEditorialBySlug).mockResolvedValue({
      title: "Éditorial illustré",
      slug: "editorial-illustre",
      excerpt: "Un chapeau.",
      content: "<p>Contenu</p>",
      coverImageUrl: "/manus-storage/couverture.png",
      categorySlug: "editoriaux",
      categoryName: "Éditoriaux",
      authorName: "Abdou Fatah Fall",
      useAlias: false,
      publishedAt: new Date("2026-08-25T10:00:00Z"),
      updatedAt: new Date("2026-08-25T12:00:00Z"),
    } as any);

    const page = await renderForCrawler("/editorial/editorial-illustre");

    expect(page.body).toContain('https://weurseuk.com/manus-storage/couverture.png?v=1787659200000');
  });
});
