import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import fg from 'fast-glob';
import { rewriteRelativeImports } from '../nextAppRouter/restructure';

/** Source file extensions whose relative imports must be rewritten after a move. */
const SCRIPT_GLOB = '**/*.{ts,tsx,js,jsx,mjs,cjs}';

/** The TanStack Router locale segment directory (optional `{-$locale}` param). */
export const LOCALE_SEGMENT = '{-$locale}';

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
  | { status: 'already-structured' }
  | { status: 'nothing-to-move' }
  | { status: 'moved'; movedEntries: string[] };

/**
 * Moves the routable entries of `routesDir` under a new `{-$locale}` segment and
 * rewrites relative imports in the moved files. Idempotent: a no-op when
 * `{-$locale}` already exists. Root-only files (see {@link shouldKeepRouteAtRoot})
 * are left in place.
 */
export const restructureRoutesIntoLocale = async (
  rootDir: string,
  routesDir: string
): Promise<RestructureResult> => {
  const routesDirAbs = join(rootDir, routesDir);
  const localeDirAbs = join(routesDirAbs, LOCALE_SEGMENT);

  if (existsSync(localeDirAbs)) {
    return { status: 'already-structured' };
  }

  const entries = await readdir(routesDirAbs, { withFileTypes: true });
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
