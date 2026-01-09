import type { Logger } from '@intlayer/config';

/**
 * Validates that the translated content matches the structure of the original.
 * Throws an error if a mismatch is found, triggering a retry.
 */
export const validateTranslation = (
  original: string,
  translated: string,
  logger: Logger
): boolean => {
  const errors: string[] = [];

  // YAML Frontmatter Integrity (CRITICAL)
  if (original.trimStart().startsWith('---')) {
    if (!translated.trimStart().startsWith('---')) {
      errors.push(
        'YAML Frontmatter missing: Input starts with "---", output does not.'
      );
    }
    const originalDashes = (original.match(/^---$/gm) || []).length;
    const translatedDashes = (translated.match(/^---$/gm) || []).length;
    if (originalDashes >= 2 && translatedDashes < 2) {
      errors.push(
        'YAML Frontmatter unclosed: Input has closing "---", output is missing it.'
      );
    }
  }

  // Code Fence Check
  const fenceRegex = /^\s*```/gm;
  const originalFences = (original.match(fenceRegex) || []).length;
  const translatedFences = (translated.match(fenceRegex) || []).length;

  if (originalFences !== translatedFences) {
    errors.push(
      `Code fence mismatch: Input has ${originalFences}, output has ${translatedFences}`
    );
  }

  // Length/Duplication Check
  const ratio = translated.length / (original.length || 1);
  const isTooLong = ratio > 2.5;
  const isSignificantLength = original.length > 50;

  if (isTooLong && isSignificantLength) {
    errors.push(
      `Length deviation: Output is ${translated.length} chars vs Input ${original.length} (${ratio.toFixed(1)}x). Likely included context.`
    );
  }

  // Line Count Heuristic
  const originalLines = original.split('\n').length;
  const translatedLines = translated.split('\n').length;

  if (originalLines > 5) {
    if (translatedLines < originalLines * 0.4) {
      errors.push(
        `Line count deviation: Output has ${translatedLines} lines, Input has ${originalLines}. Likely content deletion.`
      );
    }
  }

  if (errors.length > 0) {
    logger(`Validation Failed: ${errors.join(', ')}`);
    return false;
  }

  return true;
};

/**
 * Clean common AI artifacts
 */
export const sanitizeChunk = (translated: string, original: string): string => {
  let cleaned = translated;
  const wrapRegex = /^```(?:markdown|md|txt)?\n([\s\S]*?)\n```$/i;
  const match = cleaned.match(wrapRegex);
  if (match) cleaned = match[1];

  if (!original.startsWith('\n') && cleaned.startsWith('\n')) {
    cleaned = cleaned.replace(/^\n+/, '');
  }
  if (!original.startsWith(' ') && cleaned.startsWith(' ')) {
    cleaned = cleaned.trimStart();
  }
  return cleaned;
};
