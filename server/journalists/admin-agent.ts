/**
 * Admin Agent v2.2 - Orchestre la revue de presse biquotidienne
 * Génère des articles via les 5 journalistes IA et les PUBLIE en base de données
 */

import { invokeJournalistWithFallback } from "./service";
import { JOURNALISTS } from "./config";
import { invokeLLM } from "../_core/llm";
import * as db from "../db";

// Mapping journaliste -> catégorie DB
const CATEGORY_MAP: Record<string, number> = {
  "Actualité": 30004,
  "Politique & Économie": 30005,
  "International": 30006,
  "Société": 30007,
  "Analyses": 30008,
};

export interface PublishedArticle {
  id: number;
  title: string;
  slug: string;
  journalist: string;
  rubrique: string;
  categoryId: number;
}

export interface PressReviewSession {
  sessionId: string;
  dateTimeGmt: string;
  status: "generating" | "published" | "failed";
  articlesPublished: PublishedArticle[];
  incidents: string[];
  publishedAt?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 200);
}

/**
 * Génère et PUBLIE une session de revue de presse
 */
export async function generateAndPublishPressReview(): Promise<PressReviewSession> {
  const sessionId = `session-${Date.now()}`;
  const dateTimeGmt = new Date().toISOString();
  const articlesPublished: PublishedArticle[] = [];
  const incidents: string[] = [];

  console.log(`[AdminAgent] === DÉMARRAGE SESSION ${sessionId} ===`);

  try {
    // Step 1: Demander au LLM les sujets du jour
    const topicsResponse = await invokeLLM({
      messages: [
        { role: "system", content: "Tu es un rédacteur en chef sénégalais. Identifie les sujets d'actualité les plus importants du jour. Réponds UNIQUEMENT en JSON valide." },
        { role: "user", content: `Identifie 1 sujet clé pour chaque thématique. Réponds en JSON:
{
  "politique": { "topic": "...", "sources": ["source1"], "angle": "..." },
  "economie": { "topic": "...", "sources": ["source1"], "angle": "..." },
  "international": { "topic": "...", "sources": ["source1"], "angle": "..." },
  "sports": { "topic": "...", "sources": ["source1"], "angle": "..." },
  "actualites": { "topic": "...", "sources": ["source1"], "angle": "..." }
}` },
      ],
    });

    const contentRaw = topicsResponse.choices?.[0]?.message?.content;
    if (!contentRaw || typeof contentRaw !== 'string') {
      incidents.push("Impossible de générer les sujets");
      return { sessionId, dateTimeGmt, status: "failed", articlesPublished, incidents };
    }

    let jsonStr = contentRaw;
    const jsonMatch = contentRaw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) jsonStr = jsonMatch[1];

    let topics: any;
    try {
      topics = JSON.parse(jsonStr);
    } catch {
      incidents.push("JSON invalide retourné par le LLM pour les sujets");
      return { sessionId, dateTimeGmt, status: "failed", articlesPublished, incidents };
    }

    // Step 2: Invoquer chaque journaliste et publier en DB
    const assignments = [
      { key: "actualites", journalistId: "fatou_sow", rubrique: "Actualité" },
      { key: "politique", journalistId: "awa_diop", rubrique: "Politique & Économie" },
      { key: "economie", journalistId: "moussa_fall", rubrique: "Politique & Économie" },
      { key: "international", journalistId: "aicha_benali", rubrique: "International" },
      { key: "sports", journalistId: "ousmane_ndiaye", rubrique: "Société" },
    ];

    for (const assignment of assignments) {
      const topicData = topics[assignment.key];
      if (!topicData || !topicData.topic) {
        incidents.push(`Pas de sujet pour ${assignment.key}`);
        continue;
      }

      console.log(`[AdminAgent] ${JOURNALISTS[assignment.journalistId].name} rédige: ${topicData.topic}`);

      try {
        const { article, usedFallback } = await invokeJournalistWithFallback(assignment.journalistId, {
          topic: topicData.topic,
          sources: topicData.sources || [],
          angle: topicData.angle,
        });

        if (!article) {
          incidents.push(`${JOURNALISTS[assignment.journalistId].name}: échec de rédaction pour "${topicData.topic}"`);
          continue;
        }

        if (usedFallback) {
          incidents.push(`${JOURNALISTS[assignment.journalistId].name}: article généré en mode fallback`);
        }

        // Construire le contenu de l'article
        const title = article.N1_breve?.split('.')[0]?.trim() || topicData.topic;
        const slug = slugify(title) + "-" + Date.now().toString(36);
        const categoryId = CATEGORY_MAP[assignment.rubrique] || 30004;
        const journalistName = JOURNALISTS[assignment.journalistId].name;

        const content = `${article.N2_article || article.N1_breve || ""}

---
**Par ${journalistName}** | ${assignment.rubrique}
Sources: ${(article.sources || topicData.sources || []).join(", ")}`;

        const excerpt = article.N1_breve || (content.substring(0, 200) + "...");

        // PUBLIER EN BASE DE DONNÉES
        await db.createEditorial({
          title,
          slug,
          excerpt,
          content,
          categoryId,
          isPublished: true,
          isFeatured: false,
          publishedAt: new Date(),
        });

        articlesPublished.push({
          id: articlesPublished.length + 1,
          title,
          slug,
          journalist: journalistName,
          rubrique: assignment.rubrique,
          categoryId,
        });

        console.log(`[AdminAgent] ✅ Article publié: "${title}" par ${journalistName} dans ${assignment.rubrique}`);

      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        incidents.push(`${JOURNALISTS[assignment.journalistId].name}: erreur - ${errMsg}`);
        console.error(`[AdminAgent] ❌ Erreur pour ${assignment.key}:`, errMsg);
      }
    }

    const status = articlesPublished.length > 0 ? "published" : "failed";
    console.log(`[AdminAgent] === FIN SESSION ${sessionId}: ${articlesPublished.length} articles publiés, ${incidents.length} incidents ===`);

    return {
      sessionId,
      dateTimeGmt,
      status,
      articlesPublished,
      incidents,
      publishedAt: status === "published" ? new Date().toISOString() : undefined,
    };

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error(`[AdminAgent] ❌ Erreur fatale session ${sessionId}:`, errMsg);
    incidents.push(`Erreur fatale: ${errMsg}`);
    return { sessionId, dateTimeGmt, status: "failed", articlesPublished, incidents };
  }
}
