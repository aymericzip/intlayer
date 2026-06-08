import type {
  FilePathPattern,
  FilePathPatternContext,
} from '@intlayer/types/filePathPattern';

/**
 * Parses a FilePathPattern configuration string or function to a final string path.
 * Resolves context variables like `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`.
 */
export const parseFilePathPattern = async (
  pattern: FilePathPattern,
  context: FilePathPatternContext
): Promise<string> => {
  if (typeof pattern === 'function') {
    return await (pattern as any)(context);
  }

  if (typeof pattern === 'object' && pattern !== null && context.locale) {
    const localePattern = (pattern as any)[context.locale];

    if (localePattern) {
      if (typeof localePattern === 'function') {
        return await localePattern(context);
      }
      return parseStringPattern(localePattern, context);
    }
  }

  if (typeof pattern === 'string') {
    return parseStringPattern(pattern, context);
  }

  return '';
};

export const parseStringPattern = (
  pattern: string,
  context: FilePathPatternContext
): string =>
  pattern
    .replaceAll(/\{\{\s*locale\s*\}\}/g, context.locale ?? '')
    .replaceAll(/\{\{\s*key\s*\}\}/g, context.key ?? '')
    .replaceAll(/\{\{\s*fileName\s*\}\}/g, context.fileName ?? '')
    .replaceAll(/\{\{\s*extension\s*\}\}/g, context.extension ?? '')
    .replaceAll(
      /\{\{\s*componentFileName\s*\}\}/g,
      context.componentFileName ?? ''
    )
    .replaceAll(
      /\{\{\s*componentExtension\s*\}\}/g,
      context.componentExtension ?? ''
    )
    .replaceAll(/\{\{\s*format\s*\}\}/g, context.format ?? '')
    .replaceAll(/\{\{\s*componentFormat\s*\}\}/g, context.componentFormat ?? '')
    .replaceAll(
      /\{\{\s*componentDirPath\s*\}\}/g,
      context.componentDirPath ?? ''
    );
