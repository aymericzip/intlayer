/**
 * Checks whether the given text should be extracted as a translatable string.
 *
 * Filters out:
 * - Empty strings
 * - Emails
 * - Uncapitalized strings of 2 words or fewer (likely technical terms)
 * - Dynamic content patterns like Vue bindings (`v-`) or object patterns (`{`)
 */
export const shouldExtract = (text: string): boolean => {
  const trimmed = text.trim();

  if (!trimmed) return false;

  // Ignore emails
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return false;

  // Ignore dynamic content patterns
  if (trimmed.startsWith('{') || trimmed.startsWith('v-')) return false;

  const wordCount = trimmed.split(/\s+/).length;
  const isCapitalized = /^[A-Z]/.test(trimmed);

  // Ignore technical identifiers (one word strings with camelCase, kebab-case, snake_case etc.)
  if (wordCount === 1) {
    // CamelCase or internal capitals (like camelCaseProperty or CamelCaseProperty)
    if (/[a-z][A-Z]/.test(trimmed)) return false;
    // kebab-case or snake_case
    if (trimmed.includes('-') || trimmed.includes('_')) return false;
  }

  // We usually want to extract full sentences or labels, not single/short technical words.
  // Extract if capitalized, or if it contains more than 2 words.
  if (!isCapitalized && wordCount <= 2) return false;

  return true;
};
