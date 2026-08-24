export function formatLatestEdition(publishedAt?: Date | string | null): string {
  if (!publishedAt) return "Dernière édition disponible";

  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return "Dernière édition disponible";

  const dateLabel = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return `Dernière édition disponible · publiée le ${dateLabel}`;
}
