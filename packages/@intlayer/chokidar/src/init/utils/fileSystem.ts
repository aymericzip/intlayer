import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
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
  /**
   * Detected locales in the directory.
   */
  locales: string[];
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
  const nestedLocales = new Set<string>();
  const flatLocales = new Set<string>();

  for (const file of files) {
    const parts = file.split('/');
    const filename = parts[parts.length - 1] ?? '';

    if (KNOWN_CONFIG_FILENAMES.has(filename)) continue;

    // Nested: …/{locale}/{key}.json — parent directory is a locale code
    if (parts.length >= 3) {
      const localeDir = parts[parts.length - 2] ?? '';
      if (isLocaleSegment(localeDir)) {
        nestedBasePaths.push(parts.slice(0, -2).join('/') || '.');
        nestedLocales.add(localeDir);
      }
    }

    // Flat: …/{locale}.json — filename (without extension) is a locale code
    if (parts.length >= 2) {
      const baseName = filename.slice(0, -5); // strip ".json"
      if (isLocaleSegment(baseName)) {
        flatBasePaths.push(parts.slice(0, -1).join('/') || '.');
        flatLocales.add(baseName);
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
      locales: Array.from(nestedLocales),
    };
  }

  const prefix = mostFrequentPrefix(flatBasePaths);
  return {
    type: 'flat',
    template: `${prefix}/\${locale}.json`,
    locales: Array.from(flatLocales),
  };
};

/**
 * The messages source template derived from a `next-intl` `i18n/request.ts`
 * file, ready to be used as a `syncJSON` `source` builder.
 */
export type NextIntlMessagesPattern = {
  /** `'flat'` (one file per locale) or `'nested'` (per-namespace files). */
  type: JsonLocalePatternType;
  /**
   * Source path template relative to the project root, with `${locale}` (and
   * `${key}` when nested) as literal placeholders, e.g. `./messages/${locale}.json`.
   */
  template: string;
};

/** Common locations of the `next-intl` request config, relative to the root. */
const NEXT_INTL_REQUEST_FILES = [
  'i18n/request.ts',
  'i18n/request.tsx',
  'i18n/request.js',
  'i18n/request.mjs',
  'src/i18n/request.ts',
  'src/i18n/request.tsx',
  'src/i18n/request.js',
  'src/i18n/request.mjs',
  'app/i18n/request.ts',
  'src/app/i18n/request.ts',
];

/**
 * Derives the messages source template from a `next-intl` `i18n/request.ts`
 * file, which is the authoritative location of the messages path in a next-intl
 * project (e.g. `messages: (await import(\`../messages/${locale}.json\`)).default`).
 *
 * Reading it removes the ambiguity of globbing the file system and yields the
 * exact `source` template for `syncJSON`. When the resulting template has no
 * `${key}` segment (the common single-file-per-locale layout, where top-level
 * keys are namespaces), `syncJSON` `splitKeys` auto-detection turns each
 * top-level key into its own dictionary.
 *
 * Returns `null` when no request file is found, the messages import cannot be
 * parsed, or the path is not project-root-relative (e.g. uses a TS path alias).
 *
 * @param rootDir - Project root directory.
 */
export const detectNextIntlMessagesPattern = async (
  rootDir: string
): Promise<NextIntlMessagesPattern | null> => {
  for (const requestFile of NEXT_INTL_REQUEST_FILES) {
    if (!(await exists(rootDir, requestFile))) continue;

    const content = await readFileFromRoot(rootDir, requestFile);

    // Capture the template-literal path of the messages dynamic import, e.g.
    // import(`../messages/${locale}.json`) → `../messages/${locale}.json`.
    const importMatch = content.match(
      /import\(\s*`([^`]*\$\{\s*locale\s*\}[^`]*\.json)`/
    );

    const importPath = importMatch?.[1];
    if (!importPath) continue;

    // Only relative imports can be resolved against the file system; path
    // aliases (e.g. `@/messages/...`) are skipped in favour of glob detection.
    if (!importPath.startsWith('.')) continue;

    // Resolve the import (relative to the request file) back to a
    // project-root-relative template. The `${locale}` / `${key}` placeholders
    // are kept literal — path utilities treat them as ordinary segments.
    const requestDir = dirname(resolve(rootDir, requestFile));
    const absoluteTemplate = resolve(requestDir, importPath);
    const relativeTemplate = relative(rootDir, absoluteTemplate)
      .split(sep)
      .join('/');

    const template = relativeTemplate.startsWith('.')
      ? relativeTemplate
      : `./${relativeTemplate}`;

    const type: JsonLocalePatternType =
      template.includes('${key}') || template.includes('${namespace}')
        ? 'nested'
        : 'flat';

    return { type, template };
  }

  return null;
};
