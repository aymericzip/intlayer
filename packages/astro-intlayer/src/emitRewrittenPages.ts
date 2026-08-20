import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getCanonicalPath,
  getRewriteRules,
  resolveLocalizedPath,
} from '@intlayer/core/localization';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Description of a built HTML page, expressed both as the URL path it is served
 * at and as the on-disk layout Astro used to emit it.
 */
type BuiltPage = {
  /** Absolute path of the emitted HTML file. */
  filePath: string;
  /** URL path the file is served at, without trailing slash (e.g. `/en/about`). */
  urlPath: string;
  /** Whether the file is a directory index (`about/index.html`) or flat (`about.html`). */
  isDirectoryIndex: boolean;
};

/**
 * Recursively lists every `.html` file contained in a directory.
 */
const listHtmlFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });

  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);

      if (entry.isDirectory()) return listHtmlFiles(entryPath);

      return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
    })
  );

  return nestedFiles.flat();
};

/**
 * Converts an emitted HTML file path into the URL path it is served at.
 *
 * - `about/index.html` → `/about`
 * - `about.html`       → `/about`
 * - `index.html`       → `/`
 */
const toBuiltPage = (outputDirectory: string, filePath: string): BuiltPage => {
  const relativePath = relative(outputDirectory, filePath).split(sep).join('/');

  const isDirectoryIndex = relativePath.endsWith('index.html');

  const pathWithoutExtension = isDirectoryIndex
    ? relativePath.slice(0, -'index.html'.length).replace(/\/$/, '')
    : relativePath.slice(0, -'.html'.length);

  return {
    filePath,
    urlPath: `/${pathWithoutExtension}`.replace(/\/{2,}/g, '/'),
    isDirectoryIndex,
  };
};

/**
 * Splits a URL path into its locale prefix (when present) and the remainder.
 */
const splitLocalePrefix = (
  urlPath: string,
  locales: Locale[]
): { localePrefix: string; pathWithoutLocale: string } => {
  const firstSegment = urlPath.split('/')[1];

  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return {
      localePrefix: `/${firstSegment}`,
      pathWithoutLocale: urlPath.slice(firstSegment.length + 1) || '/',
    };
  }

  return { localePrefix: '', pathWithoutLocale: urlPath || '/' };
};

/**
 * Maps a URL path back onto the on-disk layout Astro used for the source page,
 * so the emitted twin keeps the same `directory` / `file` build format.
 */
const toFilePath = (
  outputDirectory: string,
  urlPath: string,
  isDirectoryIndex: boolean
): string => {
  const trimmedPath = urlPath.replace(/^\//, '');

  return join(
    outputDirectory,
    isDirectoryIndex ? join(trimmedPath, 'index.html') : `${trimmedPath}.html`
  );
};

/**
 * Emits a copy of every prerendered page at its rewritten ("pretty") URL.
 *
 * Astro renders pages from their canonical file-system route (`/about`,
 * `/en/about`), so a static build contains no file for the localized paths
 * declared in `routing.rewrite` (`/nosotros`). The dev and SSR proxies resolve
 * those paths at request time, but a static host has nothing to serve and
 * answers 404 — even though `getLocalizedUrl` (links, hreflang, sitemap)
 * already points at them.
 *
 * This mirrors each canonical page onto its localized path at the end of the
 * build. The canonical path is kept reachable, matching the proxy behaviour.
 *
 * @param configuration - The resolved Intlayer configuration.
 * @param outputDirectoryUrl - The build output directory, as given by `astro:build:done`.
 * @returns The list of `[from, to]` URL paths that were emitted.
 */
export const emitRewrittenPages = async (
  configuration: IntlayerConfig,
  outputDirectoryUrl: URL
): Promise<[from: string, to: string][]> => {
  const { routing, internationalization } = configuration;

  const rewriteRules = getRewriteRules(routing.rewrite, 'url');

  // Without prefixes a single file serves every locale, so a per-locale
  // rewrite cannot be resolved from the file path alone.
  const isPrefixMode =
    routing.mode === 'prefix-all' || routing.mode === 'prefix-no-default';

  if (!rewriteRules || !isPrefixMode) return [];

  const locales = internationalization.locales as Locale[];
  const defaultLocale = internationalization.defaultLocale as Locale;

  const outputDirectory = fileURLToPath(outputDirectoryUrl);
  const htmlFiles = await listHtmlFiles(outputDirectory);

  const emittedPages: [from: string, to: string][] = [];

  for (const htmlFile of htmlFiles) {
    const { filePath, urlPath, isDirectoryIndex } = toBuiltPage(
      outputDirectory,
      htmlFile
    );

    const { localePrefix, pathWithoutLocale } = splitLocalePrefix(
      urlPath,
      locales
    );

    // An unprefixed path is only reachable when the default locale is not
    // prefixed, in which case it belongs to the default locale.
    const locale = (localePrefix.slice(1) || defaultLocale) as Locale;

    const canonicalPath = getCanonicalPath(
      pathWithoutLocale,
      locale,
      rewriteRules
    );

    const { path: localizedPath, isRewritten } = resolveLocalizedPath(
      canonicalPath,
      locale,
      rewriteRules
    );

    // Either no rule matches, or the page is already emitted at its pretty URL.
    if (!isRewritten || localizedPath === pathWithoutLocale) continue;

    const targetUrlPath = `${localePrefix}${localizedPath}`.replace(
      /\/{2,}/g,
      '/'
    );
    const targetFilePath = toFilePath(
      outputDirectory,
      targetUrlPath,
      isDirectoryIndex
    );

    await mkdir(dirname(targetFilePath), { recursive: true });
    await copyFile(filePath, targetFilePath);

    emittedPages.push([urlPath, targetUrlPath]);
  }

  return emittedPages;
};
