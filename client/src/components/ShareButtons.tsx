import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Share2, Check, Link2, Loader2 } from "lucide-react";
import {
  generateInstagramStory,
  generateFacebookReel,
  shareOrDownload,
} from "@/hooks/useInstagramStory";

interface ShareButtonsProps {
  title: string;
  url?: string;
  ogUrl?: string;
  excerpt?: string;
  authorName?: string;
  authorImageUrl?: string;
  categoryLabel?: string;
  variant?: "horizontal" | "vertical" | "compact";
  className?: string;
}

/**
 * Règle éditoriale — Partage articles natifs Weurseuk :
 * Chaque partage inclut systématiquement :
 *   1. Le titre de l'article
 *   2. Le nom de l'auteur (signataire)
 *   3. Le texte d'accroche / résumé condensé (excerpt)
 *   4. L'URL de l'article
 *
 * Boutons Story Instagram et Reel Facebook :
 *   - Sur mobile : Web Share API → feuille de partage native (1 clic)
 *     L'image + l'URL de l'article sont transmises ensemble.
 *   - Sur desktop : téléchargement PNG + URL copiée dans le presse-papiers.
 */

const NETWORKS = [
  {
    name: "WhatsApp",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    getUrl: (url: string, title: string, excerpt?: string, authorName?: string) => {
      const byline = authorName ? `\nPar ${authorName}` : "";
      const body = excerpt ? `\n\n${excerpt}` : "";
      return `https://wa.me/?text=${encodeURIComponent(`*${title}*${byline}${body}\n\n${url}`)}`;
    },
  },
  {
    name: "X (Twitter)",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    getUrl: (url: string, title: string, excerpt?: string, authorName?: string) => {
      const byline = authorName ? ` — ${authorName}` : "";
      const base = `"${title}"${byline}`;
      const maxExcerpt = 240 - base.length;
      const accroche =
        excerpt && maxExcerpt > 20
          ? ` | ${excerpt.substring(0, maxExcerpt - 3)}${excerpt.length > maxExcerpt - 3 ? "…" : ""}`
          : "";
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${base}${accroche}`)}&url=${encodeURIComponent(url)}`;
    },
  },
  {
    name: "Facebook",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    getUrl: (url: string, _title: string, _excerpt?: string, _authorName?: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    getUrl: (url: string, title: string, excerpt?: string, authorName?: string) => {
      const fullTitle = authorName ? `${title} — ${authorName}` : title;
      const summary = excerpt
        ? `&summary=${encodeURIComponent(excerpt.substring(0, 256))}`
        : "";
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(fullTitle)}${summary}`;
    },
  },
  {
    name: "Telegram",
    color: "#0088cc",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    getUrl: (url: string, title: string, excerpt?: string, authorName?: string) => {
      const byline = authorName ? `\nPar ${authorName}` : "";
      const body = excerpt
        ? `\n\n${excerpt.substring(0, 200)}${excerpt.length > 200 ? "…" : ""}`
        : "";
      return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title}${byline}${body}`)}`;
    },
  },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 40);
}

export default function ShareButtons({
  title,
  url,
  ogUrl,
  excerpt,
  authorName,
  authorImageUrl,
  categoryLabel,
  variant = "horizontal",
  className = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [generatingStory, setGeneratingStory] = useState(false);
  const [generatingReel, setGeneratingReel] = useState(false);
  const [showReelGuide, setShowReelGuide] = useState(false);
  const [reelCaptionCopied, setReelCaptionCopied] = useState(false);
  const [reelBlob, setReelBlob] = useState<Blob | null>(null);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  // Texte complet à coller dans la description du Reel Facebook
  const buildReelCaption = () => {
    const byline = authorName ? `Par ${authorName}` : "";
    const accroche = excerpt ? `\n\n${excerpt.substring(0, 220)}${excerpt.length > 220 ? "…" : ""}` : "";
    const lien = `\n\n🔗 Lire l'article complet : ${shareUrl}`;
    const credit = "\n\n— weurseuk.com";
    return `${title}${byline ? `\n${byline}` : ""}${accroche}${lien}${credit}`;
  };

  const copyReelCaption = async () => {
    try {
      await navigator.clipboard.writeText(buildReelCaption());
      setReelCaptionCopied(true);
      setTimeout(() => setReelCaptionCopied(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Lien copié dans le presse-papiers");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Impossible de copier le lien");
    }
  };

  const handleShare = async (network: (typeof NETWORKS)[number]) => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt
            ? `${title}${authorName ? ` — ${authorName}` : ""}\n\n${excerpt}`
            : `${title}${authorName ? ` — ${authorName}` : ""}`,
          url: ogUrl || shareUrl,
        });
        return;
      } catch {
        // fallback
      }
    }
    const effectiveUrl = network.name === "Facebook" && ogUrl ? ogUrl : shareUrl;
    const shareLink = network.getUrl(effectiveUrl, title, excerpt, authorName);
    window.open(shareLink, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt
            ? `${title}${authorName ? ` — ${authorName}` : ""}\n\n${excerpt}`
            : title,
          url: ogUrl || shareUrl,
        });
      } catch {
        // cancelled
      }
    }
  };

  const handleInstagramStory = async () => {
    setGeneratingStory(true);
    try {
      const blob = await generateInstagramStory({
        title,
        authorName,
        authorImageUrl,
        categoryLabel,
        articleUrl: shareUrl,
        excerpt,
      });
      const result = await shareOrDownload(
        blob,
        `weurseuk-story-${slugify(title)}.png`,
        shareUrl,
        title
      );
      if (result === "shared") {
        toast.success("Story prête — choisissez Instagram dans la liste");
      } else {
        toast.success("Story téléchargée + lien copié ✓");
      }
    } catch (err) {
      console.error("[InstagramStory]", err);
      toast.error("Erreur lors de la génération de la story");
    } finally {
      setGeneratingStory(false);
    }
  };

  const handleFacebookReel = async () => {
    setGeneratingReel(true);
    try {
      const blob = await generateFacebookReel({
        title,
        authorName,
        authorImageUrl,
        categoryLabel,
        articleUrl: shareUrl,
        excerpt,
      });
      const isIOSDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isIOSDevice) {
        // iOS : stocker le blob et afficher le Dialog
        // Le Dialog permet :
        //   1. Copier le texte (appui explicite = Safari autorise le presse-papiers)
        //   2. Partager l'image via la feuille native (Enregistrer dans Photos + Facebook)
        setReelBlob(blob);
        setShowReelGuide(true);

      } else if (isMobile) {  // Android
        // Android : partage natif via Web Share API
        const result = await shareOrDownload(
          blob,
          `weurseuk-reel-fb-${slugify(title)}.png`,
          shareUrl,
          title
        );
        if (result === "shared") {
          toast.success("Reel prêt — choisissez Facebook dans la liste");
        }
      } else {
        // Desktop : téléchargement + copie du texte + guide visuel
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `weurseuk-reel-fb-${slugify(title)}.png`;
        link.click();
        URL.revokeObjectURL(link.href);
        // Copie automatique du texte de description
        await navigator.clipboard.writeText(buildReelCaption()).catch(() => {});
        setReelCaptionCopied(true);
        setTimeout(() => setReelCaptionCopied(false), 5000);
        // Afficher le guide visuel
        setShowReelGuide(true);
      }
    } catch (err) {
      console.error("[FacebookReel]", err);
      toast.error("Erreur lors de la génération du Reel");
    } finally {
      setGeneratingReel(false);
    }
  };

  const isCompact = variant === "compact";
  const isVertical = variant === "vertical";

  return (
    <>
    <div
      className={`${
        isVertical
          ? "flex flex-col gap-2 items-center"
          : "flex flex-wrap items-center gap-2"
      } ${className}`}
    >
      {!isCompact && (
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
          Partager
        </span>
      )}

      {/* Réseaux classiques */}
      {NETWORKS.map((network) => (
        <Tooltip key={network.name}>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleShare(network)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 text-white"
              style={{ backgroundColor: network.color }}
              aria-label={`Partager sur ${network.name}`}
            >
              {network.icon}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Partager sur {network.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}

      {/* Reel Facebook — icône bobine de film + triangle play */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleFacebookReel}
            disabled={generatingReel}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 text-white disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: generatingReel
                ? "#888"
                : "linear-gradient(135deg, #0866FF 0%, #1877F2 50%, #0a4fc4 100%)",
              boxShadow: generatingReel ? "none" : "0 0 0 2px rgba(8,102,255,0.3)",
            }}
            aria-label="Générer une vignette Reel Facebook"
            title="Reel Facebook"
          >
            {generatingReel ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              /* Icône Reel : bobine de film avec sprockets + triangle play */
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                {/* Cercle extérieur bobine */}
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                {/* Sprockets (perforations de bobine) */}
                <circle cx="12" cy="4" r="1.2" />
                <circle cx="12" cy="20" r="1.2" />
                <circle cx="4" cy="12" r="1.2" />
                <circle cx="20" cy="12" r="1.2" />
                <circle cx="7.2" cy="7.2" r="1" />
                <circle cx="16.8" cy="7.2" r="1" />
                <circle cx="7.2" cy="16.8" r="1" />
                <circle cx="16.8" cy="16.8" r="1" />
                {/* Triangle play centré */}
                <path d="M10 8.5l6 3.5-6 3.5V8.5z" />
              </svg>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Reel Facebook
            <span className="block text-xs text-muted-foreground">
              {typeof navigator !== "undefined" && "canShare" in navigator
                ? "Partage direct (1 clic)"
                : "Télécharger + lien copié"}
            </span>
          </p>
        </TooltipContent>
      </Tooltip>

      {/* Story Instagram */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleInstagramStory}
            disabled={generatingStory}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 text-white disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: generatingStory
                ? "#888"
                : "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
            aria-label="Générer une Story Instagram"
          >
            {generatingStory ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Story Instagram
            <span className="block text-xs text-muted-foreground">
              {typeof navigator !== "undefined" && "canShare" in navigator
                ? "Partage direct (1 clic)"
                : "Télécharger + lien copié"}
            </span>
          </p>
        </TooltipContent>
      </Tooltip>

      {/* Copier le lien */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 bg-gray-500 text-white"
            aria-label="Copier le lien"
          >
            {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? "Lien copié !" : "Copier le lien"}</p>
        </TooltipContent>
      </Tooltip>

      {/* Partage natif (mobile) */}
      {typeof navigator !== "undefined" && "share" in navigator && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 bg-amber-600 text-white"
              aria-label="Plus d'options de partage"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Plus d'options</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>

    {/* Guide de publication Reel Facebook — profil personnel */}
    <Dialog open={showReelGuide} onOpenChange={setShowReelGuide}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#1877F2]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="4" r="1.2" />
                <circle cx="12" cy="20" r="1.2" />
                <circle cx="4" cy="12" r="1.2" />
                <circle cx="20" cy="12" r="1.2" />
                <circle cx="7.2" cy="7.2" r="1" />
                <circle cx="16.8" cy="7.2" r="1" />
                <circle cx="7.2" cy="16.8" r="1" />
                <circle cx="16.8" cy="16.8" r="1" />
                <path d="M10 8.5l6 3.5-6 3.5V8.5z" />
              </svg>
              Publier votre Reel Facebook
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              L'image a été téléchargée et le texte de description a été copié dans votre presse-papiers.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">

            {/* Étape 1 : Copier le texte (appui explicite requis par Safari) */}
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Étape 1 — Texte de description
                </span>
              </div>
              <pre className="text-xs text-foreground whitespace-pre-wrap font-sans leading-relaxed max-h-32 overflow-y-auto mb-3">
                {buildReelCaption()}
              </pre>
              <Button
                className="w-full"
                variant="outline"
                onClick={copyReelCaption}
              >
                {reelCaptionCopied ? (
                  <span className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" /> Texte copié !
                  </span>
                ) : (
                  "Copier le texte"
                )}
              </Button>
            </div>

            {/* Étape 2 : Enregistrer l'image + ouvrir Facebook */}
            <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground block">
                Étape 2 — Enregistrer l’image
              </span>
              <p className="text-xs text-muted-foreground">
                Appuyez sur le bouton ci-dessous. La feuille de partage iOS s’ouvre :
                choisissez <strong>« Enregistrer dans Photos »</strong> pour sauvegarder l’image dans votre galerie.
              </p>
              <Button
                className="w-full"
                style={{ backgroundColor: "#1877F2" }}
                onClick={async () => {
                  if (!reelBlob) return;
                  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                  const mimeType = isIOS ? "image/jpeg" : "image/png";
                  const ext = isIOS ? ".jpg" : ".png";
                  const file = new File(
                    [reelBlob],
                    `weurseuk-reel-fb-${slugify(title)}${ext}`,
                    { type: mimeType }
                  );
                  try {
                    await navigator.share({ files: [file], title });
                  } catch {
                    // ignore annulation
                  }
                }}
              >
                Enregistrer l’image dans Photos
              </Button>
            </div>

            {/* Étape 3 : Ouvrir Facebook Reels */}
            <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground block">
                Étape 3 — Publier le Reel
              </span>
              <p className="text-xs text-muted-foreground">
                Ouvrez Facebook Reels, importez l’image depuis votre galerie, puis collez le texte dans la description.
              </p>
              <Button
                className="w-full"
                style={{ backgroundColor: "#1877F2" }}
                onClick={() => {
                  setShowReelGuide(false);
                  // Deep link natif iOS, fallback web
                  window.location.href = "fb://reels/create";
                  setTimeout(() => {
                    window.open("https://www.facebook.com/reels/create", "_blank");
                  }, 2000);
                }}
              >
                Ouvrir Facebook Reels
              </Button>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
