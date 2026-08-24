export type SearchCandidate = {
  id: number;
  title: string;
  excerpt?: string | null;
  authorName?: string | null;
  authorAlias?: string | null;
  useAlias?: boolean | null;
  categoryName?: string | null;
  sourceName?: string | null;
  publishedAt?: Date | null;
  contentType: "editorial" | "article";
  slug: string;
  sourceUrl?: string | null;
  imageUrl?: string | null;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR");
}

export function rankSearchCandidates(candidates: SearchCandidate[], rawQuery: string, limit = 30) {
  const query = normalize(rawQuery.trim());
  if (query.length < 2) return [];

  return candidates
    .map((candidate) => {
      const title = normalize(candidate.title);
      const excerpt = normalize(candidate.excerpt ?? "");
      const author = normalize(`${candidate.authorName ?? ""} ${candidate.authorAlias ?? ""}`);
      const category = normalize(candidate.categoryName ?? "");
      const source = normalize(candidate.sourceName ?? "");
      const score =
        (title.includes(query) ? 120 : 0) +
        (author.includes(query) ? 85 : 0) +
        (category.includes(query) ? 65 : 0) +
        (source.includes(query) ? 55 : 0) +
        (excerpt.includes(query) ? 35 : 0);
      return { ...candidate, score };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0))
    .slice(0, limit);
}
