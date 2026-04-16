/**
 * AGENT ADMINISTRATEUR v2.1
 * Orchestrateur de la Rédaction Autonome pour Weurseuk
 * 
 * Mission : Coordonner 5 journalistes IA spécialisés pour produire
 * une revue de presse biquotidienne de qualité professionnelle
 */

import { invokeLLM } from "../_core/llm";
import { getDb } from "../db";

// Types
interface JournalistCommand {
  journaliste: string;
  type_contenu: "N1_breve" | "N2_article";
  sujet: string;
  sources_urls: string[];
  contexte_resume: string;
  mots_cles: string[];
  langue: "fr" | "en";
}

interface Article {
  id: number;
  titre?: string;
  thematique: string;
  journaliste_redacteur: string;
  N1_breve: string;
  N2_article: string;
  rubrique: string;
  tags: string[];
  image_url: string;
  image_credit: string;
  sources_utilisees: string[];
}

interface SessionReport {
  session_info: {
    date_heure_gmt: string;
    statut: "pending_validation" | "validated" | "rejected";
    nb_sujets_total: number;
    feedback_applique: string;
  };
  a_la_une: Article | null;
  articles: Article[];
  commandes_administrateur: {
    message: string;
    actions_possibles: string[];
  };
}

// Équipe de journalistes
const JOURNALISTS = {
  awa_diop: {
    name: "Awa Diop",
    role: "Cheffe rubrique Politique & Société",
    themes: ["Politique", "Culture"],
    style: "Analytique, contextuel, sobre (politique) ; sensible et invitant à approfondir (culture)",
  },
  moussa_fall: {
    name: "Moussa Fall",
    role: "Journaliste Économique",
    themes: ["Économie"],
    style: "Pédagogique, chiffres expliqués, impact concret",
  },
  aicha_benali: {
    name: "Aïcha Benali",
    role: "Correspondante Internationale",
    themes: ["Diplomatie", "International"],
    style: "Géopolitique, bilinguisme FR/EN",
  },
  ousmane_ndiaye: {
    name: "Ousmane Ndiaye",
    role: "Reporter Sportif",
    themes: ["Sports"],
    style: "Narratif, passionné, émotion contenue",
  },
  fatou_sow: {
    name: "Fatou Sow",
    role: "Rédactrice Généraliste",
    themes: ["Actualités Générales", "À la Une"],
    style: "Brèves percutantes (N1), synthèse transversale (N2)",
  },
};

/**
 * Étape 1 : Veille et Sélection des sujets
 */
async function searchAndSelectTopics(
  lastSessionTime: Date,
  currentTime: Date
): Promise<any[]> {
  const topics: any[] = [];

  // Thématiques à couvrir avec mots-clés
  const themes = [
    { name: "Politique", keywords: "politique sénégal gouvernement" },
    { name: "Économie", keywords: "économie sénégal afrique commerce" },
    { name: "International", keywords: "diplomatie international géopolitique" },
    { name: "Sports", keywords: "sports football sénégal afrique" },
    { name: "Culture", keywords: "culture arts sénégal afrique" },
  ];

  // Récupérer les articles RSS existants de la base de données
  try {
    const db = getDb();
    if (!db) {
      console.warn("[Admin Agent] Base de données non disponible");
      return topics;
    }

    // Pour cette version, utiliser les articles RSS existants
    // Dans une version future, intégrer une vraie recherche web
    for (const theme of themes) {
      // Créer des sujets fictifs pour démonstration
      topics.push({
        thematique: theme.name,
        titre: `Actualité ${theme.name} - ${new Date().toLocaleDateString("fr-FR")}`,
        url: "https://example.com",
        source: "AFP",
        resume: `Dernière actualité en ${theme.name.toLowerCase()}`,
        date: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Erreur lors de la recherche des sujets:", error);
  }

  return topics;
}

/**
 * Étape 2 : Préparer les commandes pour les journalistes
 */
function prepareJournalistCommands(topics: any[]): JournalistCommand[] {
  const commands: JournalistCommand[] = [];

  for (const topic of topics) {
    // Déterminer le journaliste approprié
    let journaliste = "fatou_sow"; // par défaut

    if (topic.thematique === "Politique" || topic.thematique === "Culture") {
      journaliste = "awa_diop";
    } else if (topic.thematique === "Économie") {
      journaliste = "moussa_fall";
    } else if (
      topic.thematique === "Diplomatie" ||
      topic.thematique === "International"
    ) {
      journaliste = "aicha_benali";
    } else if (topic.thematique === "Sports") {
      journaliste = "ousmane_ndiaye";
    }

    commands.push({
      journaliste,
      type_contenu: "N2_article",
      sujet: topic.titre,
      sources_urls: [topic.url],
      contexte_resume: topic.resume,
      mots_cles: [topic.thematique, topic.source],
      langue: "fr",
    });
  }

  return commands;
}

/**
 * Étape 3 : Invoquer les journalistes IA
 */
async function invokeJournalist(
  command: JournalistCommand
): Promise<{
  titre: string;
  N1_breve: string;
  N2_article: string;
  image_url: string;
  image_credit: string;
}> {
  const journalist = JOURNALISTS[command.journaliste as keyof typeof JOURNALISTS];

  const prompt = `Tu es ${journalist.name}, ${journalist.role}.

Ton style : ${journalist.style}

Commande de rédaction :
- Sujet : ${command.sujet}
- Sources : ${command.sources_urls.join(", ")}
- Contexte : ${command.contexte_resume}
- Mots-clés : ${command.mots_cles.join(", ")}

Produis :
1. Un titre accrocheur
2. Une brève (N1) de 80-120 mots
3. Un article complet (N2) de 300-400 mots
4. Une suggestion d'image (URL ou description)

Format ta réponse en JSON :
{
  "titre": "...",
  "N1_breve": "...",
  "N2_article": "...",
  "image_url": "...",
  "image_credit": "..."
}`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `Tu es un journaliste professionnel spécialisé. Produis du contenu de haute qualité, rigoureux et engageant.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "journalist_output",
          strict: true,
          schema: {
            type: "object",
            properties: {
              titre: { type: "string" },
              N1_breve: { type: "string" },
              N2_article: { type: "string" },
              image_url: { type: "string" },
              image_credit: { type: "string" },
            },
            required: ["titre", "N1_breve", "N2_article", "image_url", "image_credit"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0].message.content;
    if (typeof content === "string") {
      return JSON.parse(content);
    }
    return content as any;
  } catch (error) {
    console.error(`Erreur lors de l'invocation du journaliste ${command.journaliste}:`, error);
    throw error;
  }
}

/**
 * Étape 4 : Assembler le rapport JSON
 */
async function assembleSessionReport(
  currentTime: Date,
  articles: Article[]
): Promise<SessionReport> {
  // Sélectionner l'article "À la Une"
  const aLaUne = articles.length > 0 ? articles[0] : null;

  return {
    session_info: {
      date_heure_gmt: currentTime.toISOString(),
      statut: "pending_validation",
      nb_sujets_total: articles.length,
      feedback_applique: "Aucun feedback précédent",
    },
    a_la_une: aLaUne,
    articles: articles.slice(1),
    commandes_administrateur: {
      message: "En attente de validation humaine",
      actions_possibles: ["VALIDER_TOUT", "VALIDER_IDS(...)", "REJETER"],
    },
  };
}

/**
 * Fonction principale d'exécution de la session
 */
export async function executeAdminAgentSession(
  lastSessionTime?: Date,
  currentTime: Date = new Date()
): Promise<SessionReport> {
  console.log(
    `[Admin Agent v2.1] Démarrage de la session à ${currentTime.toISOString()}`
  );

  try {
    // Étape 1 : Veille et sélection
    console.log("[Admin Agent] Étape 1 : Veille et sélection des sujets...");
    const topics = await searchAndSelectTopics(lastSessionTime || new Date(Date.now() - 24 * 60 * 60 * 1000), currentTime);
    console.log(`[Admin Agent] ${topics.length} sujets sélectionnés`);

    // Étape 2 : Préparation des commandes
    console.log("[Admin Agent] Étape 2 : Préparation des commandes...");
    const commands = prepareJournalistCommands(topics);

    // Étape 3 : Invocation des journalistes
    console.log("[Admin Agent] Étape 3 : Invocation des journalistes...");
    const articles: Article[] = [];

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      try {
        const content = await invokeJournalist(command);
        const topic = topics[i];

        articles.push({
          id: i + 1,
          thematique: topic.thematique,
          journaliste_redacteur: JOURNALISTS[command.journaliste as keyof typeof JOURNALISTS].name,
          N1_breve: content.N1_breve,
          N2_article: content.N2_article,
          rubrique: getRubrique(topic.thematique),
          tags: [topic.thematique, topic.source],
          image_url: content.image_url,
          image_credit: content.image_credit,
          sources_utilisees: [topic.source],
        });
      } catch (error) {
        console.error(`Erreur pour le sujet ${i + 1}:`, error);
      }
    }

    console.log(`[Admin Agent] ${articles.length} articles produits`);

    // Étape 4 : Assemblage du rapport
    console.log("[Admin Agent] Étape 4 : Assemblage du rapport...");
    const report = await assembleSessionReport(currentTime, articles);

    console.log("[Admin Agent] Session terminée - En attente de validation");
    return report;
  } catch (error) {
    console.error("[Admin Agent] Erreur lors de l'exécution:", error);
    throw error;
  }
}

/**
 * Déterminer la rubrique appropriée
 */
function getRubrique(thematique: string): string {
  const mapping: { [key: string]: string } = {
    Politique: "Politique & Économie",
    Économie: "Politique & Économie",
    International: "International",
    Diplomatie: "International",
    Sports: "Actualité",
    Culture: "Société",
    "Actualités Générales": "Actualité",
    "À la Une": "Actualité",
  };

  return mapping[thematique] || "Actualité";
}

export { JOURNALISTS, JournalistCommand, SessionReport };
