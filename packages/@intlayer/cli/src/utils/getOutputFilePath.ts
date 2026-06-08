import { resolveRelativePath } from '@intlayer/chokidar/utils';
import { parseStringPattern } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { Fill } from '@intlayer/types/dictionary';
import type {
  FilePathPattern,
  FilePathPatternContext,
} from '@intlayer/types/filePathPattern';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * Get the output file path by replacing the base locale with the target locale
 *
 * This function handles two types of replacements:
 * 1. Actual locale values (e.g., `/en/` → `/fr/`)
 * 2. Template placeholders (e.g., `{{baseLocale}}` → `{{locale}}`, `{{baseLocaleName}}` → `{{localeName}}`)
 *
 * Replacement patterns:
 * - `/baseLocale/` → `/locale/`
 * - `\baseLocale\` → `\locale\`
 * - `_baseLocale.` → `_locale.`
 * - `baseLocale_` → `locale_`
 * - `.baseLocaleName.` → `.localeName.`
 * - `{{baseLocale}}` → `{{locale}}`
 * - `{{baseLocaleName}}` → `{{localeName}}`
 *
 * If no patterns match, appends `.locale` to the file extension.
 *
 * @param filePath - The input file path
 * @param locale - The target locale
 * @param baseLocale - The base locale to replace
 * @returns The output file path with locale replacements
 */
export const getOutputFilePath = (
  filePath: string,
  locale: LocalesValues,
  baseLocale: LocalesValues
): string => {
  if (!filePath || !locale || !baseLocale) {
    throw new Error('filePath, locale, and baseLocale are required');
  }

  let outputFilePath = filePath;

  // Define replacement patterns with global flag to replace all occurrences
  const replacements = [
    // Template placeholders (processed first)
    {
      pattern: /\{\{baseLocale\}\}/g,
      replacement: '{{locale}}',
    },
    {
      pattern: /\{\{baseLocaleName\}\}/g,
      replacement: '{{localeName}}',
    },

    // Path separators (most specific first)
    {
      // Unix path separators
      pattern: new RegExp(`/${baseLocale}/`, 'g'),
      replacement: `/${locale}/`,
    },
    {
      // Windows path separators
      pattern: new RegExp(`\\\\${baseLocale}\\\\`, 'g'),
      replacement: `\\${locale}\\`,
    },

    // File naming patterns
    {
      // file_en.md → file_fr.md
      pattern: new RegExp(`_${baseLocale}\\.`, 'g'),
      replacement: `_${locale}.`,
    },
    {
      // /file_en.md → /file_fr.md
      pattern: new RegExp(`/${baseLocale}_`, 'g'),
      replacement: `/${locale}_`,
    },
    {
      // Start of filename pattern en_guide.md → fr_guide.md (or after path separator)
      pattern: new RegExp(`(^|[\\/])${baseLocale}_`, 'g'),
      replacement: `$1${locale}_`,
    },
    {
      // Dot delimited pattern guide.en.md → guide.fr.md
      pattern: new RegExp(`\\.${baseLocale}\\.`, 'g'),
      replacement: `.${locale}.`,
    },
  ];

  // Apply all replacements
  for (const { pattern, replacement } of replacements) {
    outputFilePath = outputFilePath.replace(pattern, replacement);
  }

  // If no changes were made, append locale as extension
  if (outputFilePath === filePath) {
    const lastDotIndex = filePath.lastIndexOf('.');
    if (lastDotIndex > 0) {
      // Insert locale before the file extension
      return `${filePath.slice(0, lastDotIndex)}.${locale}${filePath.slice(lastDotIndex)}`;
    } else {
      // No extension found, just append
      return `${filePath}.${locale}`;
    }
  }

  return outputFilePath;
};

/**
 * Get the effective FilePathPattern for a given locale from a Fill/CompilerOutput value.
 *
 * - If Fill is an object, returns the pattern for that locale (or `false` if disabled/missing).
 * - If Fill is a string/function, returns it as-is (applies to all locales).
 * - If Fill is `false`, returns `false` (disabled for all locales).
 * - If Fill is `true` or a locale entry is `true`, returns `undefined` (use default).
 */
export const getPatternForLocale = (
  output: Fill,
  locale: Locale
): FilePathPattern | false | undefined => {
  if (output === false) return false;
  if (output === true) return undefined;
  if (typeof output === 'string' || typeof output === 'function')
    return output as FilePathPattern;
  if (typeof output === 'object' && output !== null) {
    const entry = (output as Record<string, boolean | FilePathPattern>)[locale];
    if (entry === undefined || entry === false) return false;
    if (entry === true) return undefined;
    return entry as FilePathPattern;
  }
  return false;
};

/**
 * Resolve a Fill/CompilerOutput pattern to an absolute file path for a given locale.
 * Returns `false` if the locale is disabled or no pattern is configured.
 */
export const resolveOutputPattern = async (
  output: Fill,
  locale: Locale,
  context: FilePathPatternContext,
  sourceFilePath: string,
  baseDir: string
): Promise<string | false> => {
  const pattern = getPatternForLocale(output, locale);
  if (pattern === false || pattern === undefined) return false;

  const rawPath =
    typeof pattern === 'function'
      ? await pattern(context)
      : parseStringPattern(pattern, context);

  return resolveRelativePath(rawPath, sourceFilePath, baseDir);
};
