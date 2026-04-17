/**
 * Journalist Service - Invoke journalists with LLM
 */

import { invokeLLM } from "../_core/llm";
import { JOURNALISTS, JournalistConfig } from "./config";

export interface JournalistCommand {
  topic: string;
  sources: string[];
  angle?: string;
  context?: string;
}

export interface JournalistArticle {
  N1_breve: string;
  N2_article: string;
  sources: string[];
  tags: string[];
}

/**
 * Invoke a journalist to write an article
 */
export async function invokeJournalist(
  journalistId: string,
  command: JournalistCommand
): Promise<JournalistArticle | null> {
  const journalist = JOURNALISTS[journalistId];
  if (!journalist) {
    console.error(`[Journalist] Unknown journalist: ${journalistId}`);
    return null;
  }

  try {
    const userPrompt = `
Sujet: ${command.topic}
Sources: ${command.sources.join(", ")}
${command.angle ? `Angle: ${command.angle}` : ""}
${command.context ? `Contexte: ${command.context}` : ""}

Produis un article N1 (brève) et N2 (article complet) sur ce sujet en respectant ton style et tes instructions.
Réponds UNIQUEMENT avec un JSON valide, sans explications supplémentaires.
`;

    const response = await invokeLLM({
      messages: [
        { role: "system", content: journalist.systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    if (!response.choices?.[0]?.message?.content) {
      console.error(`[Journalist] No response from ${journalist.name}`);
      return null;
    }

    const contentRaw = response.choices[0].message.content;
    
    // Handle content type
    if (typeof contentRaw !== 'string') {
      console.error(`[Journalist] Invalid content type from ${journalist.name}`);
      return null;
    }

    const content = contentRaw;
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    const article = JSON.parse(jsonStr) as JournalistArticle;

    // Validate article structure
    if (!article.N1_breve || !article.N2_article || !article.sources || !article.tags) {
      console.error(`[Journalist] Invalid article structure from ${journalist.name}`);
      return null;
    }

    // Validate lengths
    const n1Length = article.N1_breve.split(" ").length;
    const n2Length = article.N2_article.split(" ").length;

    if (n1Length < 50 || n1Length > 150) {
      console.warn(`[Journalist] N1 length out of range for ${journalist.name}: ${n1Length} words`);
    }

    if (n2Length < 200 || n2Length > 500) {
      console.warn(`[Journalist] N2 length out of range for ${journalist.name}: ${n2Length} words`);
    }

    console.log(`[Journalist] ✅ ${journalist.name} produced article on "${command.topic}"`);
    return article;
  } catch (error) {
    console.error(`[Journalist] Error invoking ${journalist.name}:`, error);
    return null;
  }
}

/**
 * Fallback: Generate article by imitating journalist style
 */
export async function generateFallbackArticle(
  journalistId: string,
  command: JournalistCommand
): Promise<JournalistArticle | null> {
  const journalist = JOURNALISTS[journalistId];
  if (!journalist) return null;

  try {
    const fallbackPrompt = `
Tu dois générer un article court et long sur ce sujet, en imitant le style de ${journalist.name} (${journalist.styleKey}).

Sujet: ${command.topic}
Sources: ${command.sources.join(", ")}

Produis un JSON avec:
- N1_breve: 80-120 mots
- N2_article: 300-400 mots
- sources: liste des sources utilisées
- tags: tags pertinents

Réponds UNIQUEMENT avec un JSON valide.
`;

    const response = await invokeLLM({
      messages: [
        { role: "system", content: "Tu es un rédacteur de presse sénior. Produis des articles rigoureux et professionnels." },
        { role: "user", content: fallbackPrompt },
      ],
    });

    if (!response.choices?.[0]?.message?.content) {
      return null;
    }

    const contentRaw = response.choices[0].message.content;

    if (typeof contentRaw !== 'string') {
      return null;
    }

    const content = contentRaw;
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    const article = JSON.parse(jsonStr) as JournalistArticle;
    console.log(`[Journalist] ⚠️ Fallback article generated for ${journalist.name}`);
    return article;
  } catch (error) {
    console.error(`[Journalist] Error generating fallback for ${journalist.name}:`, error);
    return null;
  }
}

/**
 * Invoke journalist with fallback
 */
export async function invokeJournalistWithFallback(
  journalistId: string,
  command: JournalistCommand
): Promise<{ article: JournalistArticle | null; usedFallback: boolean }> {
  // Try primary invocation
  const article = await invokeJournalist(journalistId, command);
  if (article) {
    return { article, usedFallback: false };
  }

  // Try fallback
  console.log(`[Journalist] Using fallback for ${journalistId}`);
  const fallbackArticle = await generateFallbackArticle(journalistId, command);
  return { article: fallbackArticle, usedFallback: true };
}
