/**
 * Admin Agent - Orchestrates the press review
 * Runs biquotidian sessions at 07:30 and 14:30 GMT
 */

import { invokeJournalistWithFallback } from "./service";
import { JOURNALISTS } from "./config";
import { invokeLLM } from "../_core/llm";

export interface PressReviewSession {
  sessionId: string;
  dateTimeGmt: string;
  status: "pending_validation" | "validated" | "published" | "rejected";
  nbSubjectsTotal: number;
  incidents: string[];
  aLaUne: any;
  articles: any[];
  validationFeedback?: string;
  publishedAt?: string;
}

/**
 * Generate press review session
 */
export async function generatePressReviewSession(): Promise<PressReviewSession | null> {
  const sessionId = `session-${Date.now()}`;
  const dateTimeGmt = new Date().toISOString();

  console.log(`[AdminAgent] Starting press review session: ${sessionId}`);

  try {
    // Step 1: Veille et Sélection - Search for news topics
    const searchPrompt = `
Tu es l'Agent Administrateur de Weurseuk. Identifie les 3 sujets clés du jour pour chaque thématique:
- Politique (Awa Diop)
- Économie (Moussa Fall)
- International (Aïcha Benali)
- Sports (Ousmane Ndiaye)
- Actualités Générales (Fatou Sow)

Produis un JSON avec cette structure:
{
  "politique": [
    { "topic": "...", "sources": ["source1", "source2"], "angle": "..." },
    ...
  ],
  "economie": [...],
  "international": [...],
  "sports": [...],
  "actualites": [
    { "topic": "...", "sources": ["source1", "source2"], "angle": "...", "isALaUne": true }
  ]
}

Réponds UNIQUEMENT avec un JSON valide.
`;

    const searchResponse = await invokeLLM({
      messages: [
        { role: "system", content: "Tu es un journaliste sénior qui identifie les sujets clés du jour." },
        { role: "user", content: searchPrompt },
      ],
    });

    if (!searchResponse.choices?.[0]?.message?.content) {
      console.error("[AdminAgent] Failed to generate topics");
      return null;
    }

    const contentRaw = searchResponse.choices[0].message.content;
    if (typeof contentRaw !== 'string') {
      console.error("[AdminAgent] Invalid content type");
      return null;
    }

    let jsonStr = contentRaw;
    const jsonMatch = contentRaw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    const topics = JSON.parse(jsonStr);

    // Step 2: Invocation des Journalistes
    const articles: any[] = [];
    const incidents: string[] = [];

    // Process "À la Une"
    if (topics.actualites && topics.actualites.length > 0) {
      const aLaUneTopic = topics.actualites.find((t: any) => t.isALaUne);
      if (aLaUneTopic) {
        console.log(`[AdminAgent] Processing "À la Une": ${aLaUneTopic.topic}`);
        const { article, usedFallback } = await invokeJournalistWithFallback("fatou_sow", {
          topic: aLaUneTopic.topic,
          sources: aLaUneTopic.sources,
          angle: aLaUneTopic.angle,
          context: "Ceci est l'article principal 'À la Une' de la revue de presse",
        });

        if (article) {
          articles.push({
            id: 0,
            thematique: "Actualités Générales",
            journaliste_redacteur: "Fatou Sow",
            ...article,
            rubrique: "Actualité",
            redaction_secours: usedFallback,
            isALaUne: true,
          });
        } else {
          incidents.push("Impossible de générer l'article À la Une");
        }
      }
    }

    // Process other journalists
    const journalistMap: Record<string, { journalistId: string; thematique: string; rubrique: string }> = {
      politique: { journalistId: "awa_diop", thematique: "Politique", rubrique: "Politique & Économie" },
      economie: { journalistId: "moussa_fall", thematique: "Économie", rubrique: "Politique & Économie" },
      international: { journalistId: "aicha_benali", thematique: "International", rubrique: "International" },
      sports: { journalistId: "ousmane_ndiaye", thematique: "Sports", rubrique: "Société" },
    };

    let articleId = 1;
    for (const [key, config] of Object.entries(journalistMap)) {
      const topicsList = topics[key] || [];
      
      for (const topic of topicsList.slice(0, 3)) {
        console.log(`[AdminAgent] Processing ${config.thematique}: ${topic.topic}`);
        
        const { article, usedFallback } = await invokeJournalistWithFallback(config.journalistId, {
          topic: topic.topic,
          sources: topic.sources,
          angle: topic.angle,
        });

        if (article) {
          articles.push({
            id: articleId++,
            thematique: config.thematique,
            journaliste_redacteur: JOURNALISTS[config.journalistId].name,
            ...article,
            rubrique: config.rubrique,
            redaction_secours: usedFallback,
          });
        } else {
          incidents.push(`Impossible de générer article pour ${config.thematique}: ${topic.topic}`);
        }
      }
    }

    const session: PressReviewSession = {
      sessionId,
      dateTimeGmt,
      status: "pending_validation",
      nbSubjectsTotal: articles.length,
      incidents,
      aLaUne: articles.find(a => a.isALaUne) || null,
      articles: articles.filter(a => !a.isALaUne),
    };

    console.log(`[AdminAgent] ✅ Session generated: ${sessionId} with ${articles.length} articles`);
    return session;
  } catch (error) {
    console.error("[AdminAgent] Error generating session:", error);
    return null;
  }
}

/**
 * Validate and publish session
 */
export async function validateAndPublishSession(session: PressReviewSession): Promise<boolean> {
  try {
    // Auto-control checklist
    const allArticles = [session.aLaUne, ...session.articles].filter(Boolean);
    
    for (const article of allArticles) {
      const n1Length = article.N1_breve?.split(" ").length || 0;
      const n2Length = article.N2_article?.split(" ").length || 0;

      if (n1Length < 50 || n1Length > 150) {
        console.warn(`[AdminAgent] N1 length out of range: ${n1Length} words`);
      }

      if (n2Length < 200 || n2Length > 500) {
        console.warn(`[AdminAgent] N2 length out of range: ${n2Length} words`);
      }

      if (!article.sources || article.sources.length === 0) {
        console.warn(`[AdminAgent] No sources for article: ${article.N1_breve?.substring(0, 50)}`);
      }
    }

    session.status = "validated";
    session.publishedAt = new Date().toISOString();

    console.log(`[AdminAgent] ✅ Session validated and published: ${session.sessionId}`);
    return true;
  } catch (error) {
    console.error("[AdminAgent] Error validating session:", error);
    return false;
  }
}
