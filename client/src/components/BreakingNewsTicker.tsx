import { trpc } from "@/lib/trpc";
import { AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function BreakingNewsTicker() {
  const { data: news } = trpc.breakingNews.active.useQuery();

  if (!news || news.length === 0) return null;

  return (
    <div className="bg-destructive text-destructive-foreground overflow-hidden">
      <div className="container flex items-center py-2">
        <div className="flex-shrink-0 flex items-center gap-2 pr-4 border-r border-destructive-foreground/30">
          <AlertTriangle className="w-4 h-4 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">Alerte</span>
        </div>
        <div className="overflow-hidden ml-4 flex-1">
          <div className="breaking-ticker whitespace-nowrap">
            {news.map((item, i) => (
              <span key={item.id} className="text-sm font-medium">
                {item.sourceUrl ? (
                  item.sourceUrl.startsWith('/') ? (
                    <Link href={item.sourceUrl} className="hover:underline">
                      {item.headline}
                    </Link>
                  ) : (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {item.headline}
                    </a>
                  )
                ) : (
                  item.headline
                )}
                {i < news.length - 1 && (
                  <span className="mx-6 opacity-50">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
