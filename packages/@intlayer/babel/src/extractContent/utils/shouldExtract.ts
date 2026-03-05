/**
 * Checks whether the given text should be extracted as a translatable string.
 *
 * Filters out:
 * - Empty strings
 * - Single words (typically icons or technical terms)
 * - Strings not starting with an uppercase letter (likely technical values)
 * - Dynamic content patterns like Vue bindings (`v-`) or object patterns (`{`)
 */
export const shouldExtract = (text: string): boolean => {
  const trimmed = text.trim();

  if (!trimmed) return false;

  // We usually want to extract full sentences or labels, not single technical words
  if (!trimmed.includes(' ')) return false;

  // We assume content to extract starts with an uppercase letter
  if (!/^[A-Z]/.test(trimmed)) return false;

  // Ignore dynamic content patterns
  if (trimmed.startsWith('{') || trimmed.startsWith('v-')) return false;

  return true;
};
