/**
 * AGENT AUTONOME DE REVUE DE PRESSE v2.0
 * Weurseuk.com — Portail d'information de référence
 * 
 * Responsabilités :
 * - Recherche web automatisée (6 thématiques)
 * - Rédaction modulaire (N1 brèves + N2 articles)
 * - Génération de rapport JSON structuré
 * - Validation avant publication
 */

import { invokeLLM } from "../_core/llm";
import { getDb } from "../db";
import { editorials } from "../../drizzle/schema";

// Types
interface Article {
  id: number;
  thematique: string;
  titre: string;
  N1_breve: string;
  N2_article: string;
  rubrique: string;
  tags: string[];
  image_url: string;
  image_credit: string;
  sources_utilisees: string[];
}

interface PressReviewReport {
  session_info: {
    date_heure_gmt: string;
    statut: "pending_validation" | "published" | "rejected";
    nb_sujets_total: number;
    feedback_applique: string;
  };
  a_la_une: Article;
  articles: Article[];
  commandes_administrateur: {
    message: string;
    actions_possibles: string[];
  };
}

// Thématiques couvertes
const THEMATIQUES = [
  "Actualités Générales",
  "Politique",
  "Économie",
  "Diplomatie",
  "Sports",
  "Culture"
];

// Sources prioritaires
const SOURCES_PRIORITAIRES = {
  agences: ["AFP", "Reuters", "AP"],
  francophones: ["RFI", "Jeune Afrique", "Le Monde Afrique", "Sud Quotidien", "Senenews", "Senego"],
  anglophones: ["BBC", "Al Jazeera"]
};

/**
 * Recherche les actualités pour une thématique donnée
 */
async function searchTopics(thematique: string, lastSessionTime: Date): Promise<string[]> {
  const queries = [
    `${thematique} Sénégal Afrique de l'Ouest after:${lastSessionTime.toISOString().split('T')[0]}`,
    `${thematique} actualité site:rfi.fr OR site:jeuneafrique.com`,
    `${thematique} news site:reuters.com OR site:apnews.com`
  ];

  // Simuler la recherche (en production, utiliser une vraie API de recherche)
  console.log(`🔍 Recherche pour ${thematique}...`);
  return queries;
}

/**
 * Rédige une brève (N1) selon les normes
 */
async function redactBrieve(
  titre: string,
  contenu: string,
  source: string
): Promise<string> {
  const prompt = `
Tu es un rédacteur de presse senior. Rédige une BRÈVE de STRICTEMENT 80-120 mots.

Titre: ${titre}
Contenu source: ${contenu}
Source: ${source}

Format obligatoire:
- Phrase 1: Qui, Quoi, Où, Quand
- Phrase 2: Chiffre clé ou conséquence
- Lien vers article complet
- Mention source

Brève:
`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: "Tu es un rédacteur de presse senior spécialisé en Afrique de l'Ouest." },
      { role: "user", content: prompt }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : "";
}

/**
 * Rédige un article complet (N2) selon les normes
 */
async function redactArticle(
  titre: string,
  contenu: string,
  thematique: string,
  sources: string[]
): Promise<string> {
  const styleGuide: Record<string, string> = {
    "Actualités Générales": "Dépêche modernisée. L'essentiel dans le chapeau.",
    "Politique": "Analytique. Contexte institutionnel et historique.",
    "Économie": "Pédagogique. Expliquer le 'pourquoi' des chiffres.",
    "Diplomatie": "Géopolitique. Rapports de force.",
    "Sports": "Narratif et vivant. Focus sur athlètes africains.",
    "Culture": "Sensible et éclairé. Valorisation des créations."
  };

  const prompt = `
Tu es un analyste senior spécialisé en ${thematique} en Afrique de l'Ouest.

Rédige un ARTICLE de STRICTEMENT 300-400 mots.

Titre: ${titre}
Contenu source: ${contenu}
Sources: ${sources.join(", ")}

Style: ${styleGuide[thematique] || "Analytique et rigoureux"}

Règles:
- Rigueur scientifique absolue
- Niveau conceptuel élevé
- Contexte historique et institutionnel
- Chiffres et données précises
- Conclusion avec implications

Article:
`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: "Tu es un analyste senior en sciences sociales et politiques. Tes analyses doivent faire autorité." },
      { role: "user", content: prompt }
    ]
  });

  const content = response.choices[0].message.content;
  return typeof content === 'string' ? content : "";
}

/**
 * Génère le rapport JSON final
 */
async function generateReport(
  articles: Article[],
  currentDateTime: string,
  previousFeedback: string = "Aucun"
): Promise<PressReviewReport> {
  const aLaUne = articles[0] || articles[0];

  return {
    session_info: {
      date_heure_gmt: currentDateTime,
      statut: "pending_validation",
      nb_sujets_total: articles.length,
      feedback_applique: previousFeedback
    },
    a_la_une: aLaUne,
    articles: articles.slice(1),
    commandes_administrateur: {
      message: "En attente de validation humaine avant publication.",
      actions_possibles: ["VALIDER_TOUT", "VALIDER_IDS(1,3,5)", "REJETER"]
    }
  };
}

/**
 * Exécute une session complète de revue de presse
 */
export async function executePressReviewSession(
  currentDateTime: string = new Date().toISOString(),
  lastSessionDateTime: string = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  previousFeedback: string = "Aucun"
): Promise<PressReviewReport> {
  console.log(`\n📰 DÉMARRAGE SESSION REVUE DE PRESSE`);
  console.log(`📅 Date/Heure: ${currentDateTime}`);
  console.log(`⏮️  Dernière session: ${lastSessionDateTime}`);
  console.log(`📝 Feedback précédent: ${previousFeedback}\n`);

  const articles: Article[] = [];
  const lastSessionTime = new Date(lastSessionDateTime);

  // Traiter chaque thématique
  for (const thematique of THEMATIQUES) {
    console.log(`\n🔎 Traitement: ${thematique}`);
    
    // Recherche
    const queries = await searchTopics(thematique, lastSessionTime);
    
    // Simuler la rédaction (en production, intégrer vraie recherche web)
    const mockArticle: Article = {
      id: articles.length + 1,
      thematique,
      titre: `Actualité clé en ${thematique}`,
      N1_breve: "Brève à générer...",
      N2_article: "Article à générer...",
      rubrique: thematique,
      tags: ["Sénégal", "Afrique de l'Ouest"],
      image_url: "https://via.placeholder.com/800x400",
      image_credit: "© Source",
      sources_utilisees: SOURCES_PRIORITAIRES.francophones.slice(0, 2)
    };

    articles.push(mockArticle);

    // Limiter à 3 articles par thématique
    if (articles.length >= 3) break;
  }

  // Générer le rapport
  const report = await generateReport(articles, currentDateTime, previousFeedback);

  console.log(`\n✅ SESSION COMPLETÉE`);
  console.log(`📊 Nombre d'articles: ${report.session_info.nb_sujets_total}`);
  console.log(`⏳ Statut: ${report.session_info.statut}\n`);

  return report;
}

/**
 * Publie les articles validés
 */
export async function publishValidatedArticles(
  report: PressReviewReport,
  validatedIds: number[]
): Promise<void> {
  console.log(`\n📤 PUBLICATION DES ARTICLES VALIDÉS`);
  console.log(`Articles à publier: ${validatedIds.join(", ")}\n`);

  const allArticles = [report.a_la_une, ...report.articles];
  const articlesToPublish = allArticles.filter(
    (_, idx) => validatedIds.includes(idx)
  );

  for (const article of articlesToPublish) {
    try {
      const db = await getDb();
      if (!db) throw new Error('Database connection failed');
      
      // Générer un slug unique
      const slug = article.titre
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      await db.insert(editorials).values({
        title: article.titre,
        slug: slug,
        content: article.N2_article,
        excerpt: article.N1_breve,
        categoryId: 1, // Actualité
        isFeatured: article.id === 1,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log(`✅ Publié: ${article.titre}`);
    } catch (error) {
      console.error(`❌ Erreur publication: ${article.titre}`, error);
    }
  }

  console.log(`\n✅ PUBLICATION COMPLETÉE\n`);
}

export { PressReviewReport, Article };


