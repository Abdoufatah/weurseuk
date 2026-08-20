/**
 * Some clipboard or form widgets can accidentally concatenate the same opaque
 * token twice. Preserve all normal tokens, while collapsing only an exact
 * two-part repetition.
 */
export function normalizeFacebookAccessToken(value: string | undefined) {
  const token = value?.trim();
  if (!token) return undefined;
  if (token.length % 2 !== 0) return token;

  const midpoint = token.length / 2;
  const firstHalf = token.slice(0, midpoint);
  return firstHalf === token.slice(midpoint) ? firstHalf : token;
}
