/**
 * Replaces the render-blocking stylesheet `<link>` in every prerendered page
 * with an inline `<style>` holding the same rules.
 *
 * The stylesheet is discovered only once the browser has parsed the document
 * head, so its request cannot start until the HTML is in hand — a full extra
 * round trip in front of first paint, for a file every page needs. Lighthouse
 * measured the document landing at 406 ms and the stylesheet not completing
 * until 500 ms. Inlining removes the hop outright: the rules arrive with the
 * markup that needs them.
 *
 * It costs nothing to send. Brotli finds so much redundancy between the class
 * attributes in the markup and the selectors in the stylesheet that the
 * combined document compresses marginally *smaller* than the two files did
 * apart — one 78 KiB response in place of a 57 KiB one that then blocks on a
 * 21 KiB one.
 *
 * This is worth doing here specifically because the site is prerendered. The
 * substitution happens once per page at build time rather than per request,
 * and `compress-static.ts` — which runs after this step — compresses the
 * result, so the inlined rules ship Brotli'd like everything else.
 *
 * The swap is deliberately fail-safe. Server-rendered markup always emits the
 * `<link>`; this step removes it only from pages it has actually inlined. A
 * route the prerender did not cover, or a build where this step did not run,
 * therefore keeps working exactly as it does today — with the linked
 * stylesheet. The browser-side half of that contract lives in
 * `hasInlinedStylesheet`, which stops `__root.tsx` from re-inserting the
 * `<link>` during hydration and pulling the bytes down a second time.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import { join, relative } from 'node:path';
import { INLINED_STYLESHEET_ATTRIBUTE } from '../src/utils/inlinedStylesheet.ts';

/** Root of the Nitro public output, relative to the app directory. */
const PUBLIC_DIRECTORY = join(process.cwd(), '.output/public');

/**
 * Matches any `<link>` element.
 *
 * Attribute order is not fixed by the renderer, and it breaks tags across
 * lines, so `rel` and `href` are read out of each match separately rather than
 * matched in sequence.
 */
const LINK_ELEMENT_PATTERN = /<link\b[^>]*>/gi;

/** Reads one attribute out of a matched tag, tolerating either quote style. */
const readAttribute = (tag: string, name: string): string | null =>
  tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1] ?? null;

/**
 * Escapes the one sequence that could end the `<style>` element early.
 *
 * A `</style` inside a string or `content` value would otherwise close the
 * block and spill the remaining rules into the document as text. The
 * backslash form is a valid CSS escape, so the declaration still parses.
 */
const escapeForStyleElement = (css: string): string =>
  css.replace(/<\/style/gi, '<\\/style');

/**
 * Loads the stylesheet at an absolute site path, or `null` when it cannot be
 * read — in which case the `<link>` that pointed at it is left in place.
 */
type StylesheetLoader = (href: string) => Promise<string | null>;

export type InlineResult = {
  /** The rewritten markup, unchanged when nothing was inlined. */
  html: string;
  /** Site paths folded into the document, in the order they appeared. */
  inlinedHrefs: string[];
  /** Site paths that could not be read, whose links were kept. */
  unresolvedHrefs: string[];
};

/**
 * Swaps every local stylesheet `<link>` in a document for an inline `<style>`.
 *
 * Links to other origins, and links whose stylesheet cannot be loaded, are
 * left untouched — this only ever removes a `<link>` it has already replaced
 * with equivalent rules.
 *
 * @param html - The page to rewrite.
 * @param loadStylesheet - Resolves a site path to its stylesheet contents.
 */
export const inlineStylesheetLinks = async (
  html: string,
  loadStylesheet: StylesheetLoader
): Promise<InlineResult> => {
  const stylesheetLinks = [...html.matchAll(LINK_ELEMENT_PATTERN)]
    .map((match) => match[0])
    .filter((tag) => readAttribute(tag, 'rel')?.toLowerCase() === 'stylesheet');

  let rewritten = html;
  const inlinedHrefs: string[] = [];
  const unresolvedHrefs: string[] = [];

  for (const tag of stylesheetLinks) {
    const href = readAttribute(tag, 'href');

    // Anything not served from this build's own output — a cross-origin sheet,
    // or a link assembled at runtime — is left exactly as it is.
    if (!href?.startsWith('/')) continue;

    const css = await loadStylesheet(href);
    if (css === null) {
      unresolvedHrefs.push(href);
      continue;
    }

    const styleElement = `<style ${INLINED_STYLESHEET_ATTRIBUTE}="${href}">${escapeForStyleElement(css)}</style>`;

    // A replacer function, so `$&` and friends inside the CSS are treated as
    // the literal text they are rather than as replacement patterns.
    rewritten = rewritten.replace(tag, () => styleElement);
    inlinedHrefs.push(href);
  }

  return { html: rewritten, inlinedHrefs, unresolvedHrefs };
};

/** Recursively lists every file under a directory, returning absolute paths. */
const listFilesRecursively = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = join(directory, entry.name);

      if (entry.isDirectory()) return listFilesRecursively(absolutePath);
      if (entry.isFile()) return [absolutePath];
      return [];
    })
  );

  return nested.flat();
};

/**
 * Builds a loader that reads stylesheets out of the public output, memoised
 * across the whole run — every prerendered page points at the same file.
 */
const createStylesheetLoader = (publicDirectory: string): StylesheetLoader => {
  const cache = new Map<string, Promise<string | null>>();

  return (href) => {
    const cached = cache.get(href);
    if (cached) return cached;

    const pending = readFile(join(publicDirectory, href), 'utf8').catch(
      () => null
    );
    cache.set(href, pending);
    return pending;
  };
};

/**
 * Runs `worker` over `items` with a bounded number of concurrent tasks, so a
 * few thousand pages do not open a file handle each.
 */
const mapWithConcurrency = async <TItem, TResult>(
  items: readonly TItem[],
  concurrency: number,
  worker: (item: TItem) => Promise<TResult>
): Promise<TResult[]> => {
  const results = new Array<TResult>(items.length);
  let nextIndex = 0;

  const runLane = async (): Promise<void> => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex++;
      results[currentIndex] = await worker(items[currentIndex]);
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, runLane)
  );

  return results;
};

/**
 * Number of pages rewritten at once.
 *
 * Each lane transiently holds the source page, the ~190 KiB stylesheet folded
 * into it, and the rewritten copy, so a wide fan-out is what pushes a
 * memory-constrained CI box into the OOM killer (exit 137). It stays modest by
 * default and honours `INLINE_CSS_CONCURRENCY` for hosts that can afford more.
 */
const PAGE_CONCURRENCY = Math.max(
  1,
  Number(process.env.INLINE_CSS_CONCURRENCY) ||
    Math.min(8, availableParallelism())
);

/** Per-page result kept after writing — deliberately free of the page markup. */
type PageOutcome = {
  didInline: boolean;
  unresolvedHrefs: string[];
};

/**
 * Inlines stylesheets across every prerendered page under `.output/public`.
 *
 * Exits non-zero when the output is missing or when no page could be
 * rewritten: both mean the pages are shipping without the head this step is
 * supposed to have produced, and passing silently there would hide it until
 * the next Lighthouse run.
 */
const inlineCriticalCss = async (): Promise<void> => {
  console.log('🎨 Inlining stylesheets into prerendered pages...');

  const startedAt = Date.now();

  let allFiles: string[];
  try {
    allFiles = await listFilesRecursively(PUBLIC_DIRECTORY);
  } catch {
    console.error(
      `   ✗ ${relative(process.cwd(), PUBLIC_DIRECTORY)} not found — nothing inlined.`
    );
    process.exitCode = 1;
    return;
  }

  const pages = allFiles.filter((file) => file.endsWith('.html'));
  if (pages.length === 0) {
    console.error('   ✗ No prerendered pages found — nothing inlined.');
    process.exitCode = 1;
    return;
  }

  const loadStylesheet = createStylesheetLoader(PUBLIC_DIRECTORY);

  const outcomes = await mapWithConcurrency<string, PageOutcome>(
    pages,
    PAGE_CONCURRENCY,
    async (page) => {
      const result = await inlineStylesheetLinks(
        await readFile(page, 'utf8'),
        loadStylesheet
      );

      const didInline = result.inlinedHrefs.length > 0;
      if (didInline) await writeFile(page, result.html);

      // Only the tallies survive this scope; `result.html` — the source page
      // plus the inlined stylesheet — is released here rather than retained
      // for every page at once.
      return { didInline, unresolvedHrefs: result.unresolvedHrefs };
    }
  );

  for (const href of new Set(
    outcomes.flatMap((outcome) => outcome.unresolvedHrefs)
  )) {
    console.error(`   ! ${href} could not be read — its link was kept.`);
  }

  const rewrittenPageCount = outcomes.filter(
    (outcome) => outcome.didInline
  ).length;

  if (rewrittenPageCount === 0) {
    console.error(
      `   ✗ None of the ${pages.length} pages carried an inlinable stylesheet link.`
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `   ✓ ${rewrittenPageCount}/${pages.length} pages in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`
  );
};

/**
 * Importing this file (from the test) only pulls in `inlineStylesheetLinks`;
 * running it directly is the `postbuild` pass over the whole output.
 */
if (import.meta.main) await inlineCriticalCss();
