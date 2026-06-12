import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { EXCLUDED_PATHS } from '@intlayer/config/defaultValues';
import { ALL_LOCALES } from '@intlayer/types/allLocales';
import fg from 'fast-glob';

/**
 * Helper to check if a file exists
 */
export const exists = async (rootDir: string, filePath: string) => {
  try {
    await access(join(rootDir, filePath));
    return true;
  } catch {
    return false;
  }
};

/**
 * Helper to read a file
 */
export const readFileFromRoot = async (rootDir: string, filePath: string) =>
  await readFile(join(rootDir, filePath), 'utf8');

/**
 * Helper to write a file
 */
export const writeFileToRoot = async (
  rootDir: string,
  filePath: string,
  content: string
) => await writeFile(join(rootDir, filePath), content, 'utf8');

/**
 * Helper to ensure a directory exists
 */
export const ensureDirectory = async (rootDir: string, dirPath: string) => {
  try {
    await mkdir(join(rootDir, dirPath), { recursive: true });
  } catch {
    // Directory already exists or could not be created
  }
};

/**
 * Pattern type for locale JSON file organisation.
 * - 'nested': files are at `{base}/{locale}/{key}.json`
 * - 'flat':   files are at `{base}/{locale}.json`
 */
export type JsonLocalePatternType = 'nested' | 'flat';

/**
 * Detected locale JSON file pattern and the corresponding source template.
 * `template` uses `${locale}` and `${key}` as literal placeholders (not JS
 * expressions) so it can be embedded directly in a template-literal string.
 */
export type JsonLocalePattern = {
  type: JsonLocalePatternType;
  /**
   * Source path template for syncJSON `source` option.
   * Example nested: `./locales/${locale}/${key}.json`
   * Example flat:   `./locales/${locale}.json`
   */
  template: string;
};

/**
 * Set of all known locale string values from the intlayer Locales registry
 * (e.g. `'en'`, `'fr'`, `'zh-TW'`).  Keyed by the exact locale string so
 * `.has()` lookups are O(1) and common short directory names (`src`, `lib`,
 * `app`, …) are not mistaken for locales.
 */
const ALL_LOCALE_VALUES = new Set<string>(Object.values(ALL_LOCALES));

/**
 * Returns true when `segment` matches a known BCP-47 locale identifier, e.g.
 * `en`, `fr`, `zh-TW`, `pt-BR`, `en-US`.
 */
const isLocaleSegment = (segment: string): boolean =>
  ALL_LOCALE_VALUES.has(segment);

/** JSON filenames that are never locale translation files. */
const KNOWN_CONFIG_FILENAMES = new Set([
  'package.json',
  'tsconfig.json',
  'jsconfig.json',
  'biome.json',
  'turbo.json',
  'lerna.json',
  'vercel.json',
  'netlify.json',
  'babel.config.json',
  'jest.config.json',
  'vitest.config.json',
  '.eslintrc.json',
  '.prettierrc.json',
]);

/**
 * Scans the project for JSON files and determines whether locale files are
 * organised as `{base}/{locale}/{key}.json` (nested) or `{base}/{locale}.json`
 * (flat).  Returns the most likely source template, or `null` when no locale
 * JSON files are found.
 *
 * The returned `template` contains `${locale}` and `${key}` as **literal**
 * placeholder strings so it can be embedded inside a JS template literal.
 */
export const detectJsonLocalePattern = async (
  rootDir: string
): Promise<JsonLocalePattern | null> => {
  const files = await fg('**/*.json', {
    cwd: rootDir,
    ignore: EXCLUDED_PATHS,
    absolute: false,
    onlyFiles: true,
  });

  const nestedBasePaths: string[] = [];
  const flatBasePaths: string[] = [];

  for (const file of files) {
    const parts = file.split('/');
    const filename = parts[parts.length - 1] ?? '';

    if (KNOWN_CONFIG_FILENAMES.has(filename)) continue;

    // Nested: …/{locale}/{key}.json — parent directory is a locale code
    if (parts.length >= 3) {
      const localeDir = parts[parts.length - 2] ?? '';
      if (isLocaleSegment(localeDir)) {
        nestedBasePaths.push(parts.slice(0, -2).join('/') || '.');
      }
    }

    // Flat: …/{locale}.json — filename (without extension) is a locale code
    if (parts.length >= 2) {
      const baseName = filename.slice(0, -5); // strip ".json"
      if (isLocaleSegment(baseName)) {
        flatBasePaths.push(parts.slice(0, -1).join('/') || '.');
      }
    }
  }

  if (nestedBasePaths.length === 0 && flatBasePaths.length === 0) {
    return null;
  }

  /**
   * Returns the path prefix that appears most frequently among the matches,
   * formatted as a relative path suitable for a source template.
   */
  const mostFrequentPrefix = (paths: string[]): string => {
    const counts = paths.reduce<Record<string, number>>((accumulator, path) => {
      accumulator[path] = (accumulator[path] ?? 0) + 1;
      return accumulator;
    }, {});
    const topEntry = Object.entries(counts).sort(([, a], [, b]) => b - a)[0];
    const basePath = topEntry?.[0] ?? '.';
    return basePath === '.' ? '.' : `./${basePath}`;
  };

  if (nestedBasePaths.length >= flatBasePaths.length) {
    const prefix = mostFrequentPrefix(nestedBasePaths);
    return {
      type: 'nested',
      // Literal ${locale} and ${key} — not evaluated here, used in template literals
      template: `${prefix}/\${locale}/\${key}.json`,
    };
  }

  const prefix = mostFrequentPrefix(flatBasePaths);
  return {
    type: 'flat',
    template: `${prefix}/\${locale}.json`,
  };
};
