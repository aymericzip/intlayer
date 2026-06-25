import { mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import fg from 'fast-glob';
import type { RoutingMode } from '../../utils/configManipulation';
import { rewriteRelativeImports } from '../nextAppRouter/restructure';

/** Source file extensions whose relative imports must be rewritten after a move. */
const SCRIPT_GLOB = '**/*.{ts,tsx,js,jsx,mjs,cjs}';

/**
 * The optional TanStack Router locale segment directory (`{-$locale}` param),
 * used by every routing mode except `prefix-all` so the default locale stays
 * prefix-free.
 */
export const LOCALE_SEGMENT = '{-$locale}';

/**
 * The required TanStack Router locale segment directory (`$locale` param), used
 * by `prefix-all` routing where every URL — including the default locale — is
 * prefixed.
 */
export const PREFIX_ALL_LOCALE_SEGMENT = '$locale';

/**
 * Picks the locale segment directory for the project's routing mode. `prefix-all`
 * requires the mandatory `$locale` param so the default locale is also prefixed;
 * all other modes use the optional `{-$locale}` param so the default locale stays
 * prefix-free.
 */
export const getLocaleSegment = (routingMode: RoutingMode): string =>
  routingMode === 'prefix-all' ? PREFIX_ALL_LOCALE_SEGMENT : LOCALE_SEGMENT;

/**
 * Detects whether a top-level route entry is already a locale segment, in any of
 * the TanStack Router param forms:
 * - `{-$locale}` — optional param (prefix every locale except the default),
 * - `$locale` / `{$locale}` — required param (prefix **all** locales).
 *
 * Used to skip the restructure when the project is already locale-aware, so an
 * existing prefix-all `$locale` directory is never nested under a freshly created
 * `{-$locale}` (which would produce `{-$locale}/$locale`).
 */
export const isLocaleSegment = (entryName: string): boolean =>
  /^(\{-?\$locale\}|\$locale)$/.test(entryName);

/** Strips a known script extension from a file name, e.g. `index.tsx` -> `index`. */
const stripScriptExtension = (fileName: string): string =>
  fileName.replace(/\.(tsx|ts|jsx|js|mjs|cjs)$/, '');

/**
 * Routes-directory entries that must stay at the root and never be moved under
 * `{-$locale}`:
 * - `__root` (the root route document),
 * - `routeTree.gen` (generated route tree),
 * - `api` (server / API routes — these are not locale-prefixed),
 * - TanStack-ignored entries prefixed with `-` (e.g. `-components`, `-utils`),
 * - stylesheets.
 *
 * Everything else (route files and nested route folders) is moved so it becomes
 * locale-aware.
 */
export const shouldKeepRouteAtRoot = (entryName: string): boolean => {
  if (entryName.startsWith('-')) return true;
  if (entryName.toLowerCase().endsWith('.css')) return true;

  const base = stripScriptExtension(entryName);
  const keepExactBases = new Set(['__root', 'routeTree.gen', 'api']);
  return keepExactBases.has(base);
};

/** Outcome of an attempted `{-$locale}` restructure. */
export type RestructureResult =
  | { status: 'already-structured'; localeSegment: string }
  | { status: 'nothing-to-move' }
  | { status: 'moved'; movedEntries: string[] };

/**
 * Moves the routable entries of `routesDir` under a new `localeSegment` directory
 * (the optional `{-$locale}` by default, or the required `$locale` for
 * `prefix-all`) and rewrites relative imports in the moved files. Idempotent: a
 * no-op when the routes are already locale-aware in any prefix mode (see
 * {@link isLocaleSegment}), which is reported via `localeSegment`. Root-only
 * files (see {@link shouldKeepRouteAtRoot}) are left in place.
 */
export const restructureRoutesIntoLocale = async (
  rootDir: string,
  routesDir: string,
  localeSegment: string = LOCALE_SEGMENT
): Promise<RestructureResult> => {
  const routesDirAbs = join(rootDir, routesDir);
  const localeDirAbs = join(routesDirAbs, localeSegment);

  const entries = await readdir(routesDirAbs, { withFileTypes: true });

  // Skip when the routes are already locale-aware in any prefix mode — a fresh
  // `{-$locale}`, or an existing `$locale` / `{$locale}` (prefix-all) segment.
  const existingLocaleSegment = entries.find((entry) =>
    isLocaleSegment(entry.name)
  );
  if (existingLocaleSegment) {
    return {
      status: 'already-structured',
      localeSegment: existingLocaleSegment.name,
    };
  }

  const movedTopLevelNames = entries
    .map((entry) => entry.name)
    .filter((name) => !shouldKeepRouteAtRoot(name));

  if (movedTopLevelNames.length === 0) {
    return { status: 'nothing-to-move' };
  }

  await mkdir(localeDirAbs, { recursive: true });

  for (const name of movedTopLevelNames) {
    await rename(join(routesDirAbs, name), join(localeDirAbs, name));
  }

  const movedFiles = await fg(SCRIPT_GLOB, {
    cwd: localeDirAbs,
    absolute: true,
    onlyFiles: true,
  });

  const rewriteContext = {
    appDirAbs: routesDirAbs,
    localeDirAbs,
    movedTopLevelNames,
  };

  for (const newAbs of movedFiles) {
    const relFromLocale = relative(localeDirAbs, newAbs);
    const oldAbs = join(routesDirAbs, relFromLocale);
    const code = await readFile(newAbs, 'utf8');
    const rewritten = rewriteRelativeImports(
      code,
      oldAbs,
      newAbs,
      rewriteContext
    );
    if (rewritten !== code) {
      await writeFile(newAbs, rewritten, 'utf8');
    }
  }

  return { status: 'moved', movedEntries: movedTopLevelNames };
};
