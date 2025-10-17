import type { LocalesValues } from '@intlayer/config';

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
