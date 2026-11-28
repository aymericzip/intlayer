import type { CompilerTextField } from '@intlayer/lsp/utils';

/** Whitespace-insensitive form of a text, as compared between both sides. */
const normalizeText = (text: string): string =>
  text.replace(/\s+/g, ' ').trim();

/**
 * Drops the strings the compiler already extracted: with
 * `compiler.saveComponents: false` an extracted string stays in the component,
 * its text being a source-locale field of a dictionary the component owns.
 */
export const excludeExtractedContent = <Content extends { text: string }>(
  detectedContent: Content[],
  extractedFields: CompilerTextField[]
): Content[] => {
  if (extractedFields.length === 0) return detectedContent;

  const extractedTexts = new Set(
    extractedFields.map((field) => normalizeText(field.text))
  );

  return detectedContent.filter(
    (content) => !extractedTexts.has(normalizeText(content.text))
  );
};
