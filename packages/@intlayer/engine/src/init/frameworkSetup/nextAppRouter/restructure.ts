import { mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import fg from 'fast-glob';
import * as recast from 'recast';
import { babelTsParser } from '../../../utils/recastBabelParser';

const { namedTypes: n } = recast.types;

/** Source file extensions whose relative imports must be rewritten after a move. */
const SCRIPT_GLOB = '**/*.{ts,tsx,js,jsx,mjs,cjs}';

/** Strips a known script extension from a file name, e.g. `page.tsx` -> `page`. */
const stripScriptExtension = (fileName: string): string =>
  fileName.replace(/\.(tsx|ts|jsx|js|mjs|cjs)$/, '');

/**
 * Detects whether a top-level App Router entry is already a locale segment, in
 * any of the Next.js dynamic-segment forms:
 * - `[locale]` — required segment (prefix every locale),
 * - `[...locale]` / `[[...locale]]` — catch-all / optional catch-all segments.
 *
 * Used to skip the restructure when the project is already locale-aware, so an
 * existing locale segment is never nested under a freshly created `[locale]`.
 */
export const isLocaleSegment = (entryName: string): boolean =>
  /^\[\[?\.{0,3}locale\]\]?$/.test(entryName);

/**
 * Top-level App Router entries that must stay at the app root and never be
 * moved under `[locale]`:
 * - `api/` route handlers (not locale-prefixed),
 * - global stylesheets,
 * - metadata/asset file conventions (favicon, icon, sitemap, robots, manifest…),
 * - `global-error` and `not-found` boundaries (kept as root fallbacks).
 *
 * Everything else (`page`, `loading`, `error`, `template`, `default`, the root
 * `layout`, and nested route folders) is moved so it becomes locale-aware.
 */
export const shouldKeepAppEntryAtRoot = (entryName: string): boolean => {
  if (entryName === 'api') return true;
  if (entryName.toLowerCase().endsWith('.css')) return true;
  if (entryName === 'favicon.ico') return true;

  const base = stripScriptExtension(entryName);
  const keepExactBases = new Set([
    'not-found',
    'global-error',
    'sitemap',
    'robots',
    'manifest',
  ]);
  if (keepExactBases.has(base)) return true;

  // Image metadata conventions: favicon, icon, apple-icon, opengraph-image,
  // twitter-image — optionally suffixed (e.g. `icon1`, `opengraph-image-alt`).
  const imageConventionPrefixes = [
    'favicon',
    'icon',
    'apple-icon',
    'opengraph-image',
    'twitter-image',
  ];
  if (imageConventionPrefixes.some((prefix) => base.startsWith(prefix))) {
    return true;
  }

  return false;
};

type RewriteContext = {
  appDirAbs: string;
  localeDirAbs: string;
  movedTopLevelNames: string[];
};

/**
 * Maps an import target's pre-move absolute path to its post-move absolute path.
 * Targets that live inside a moved top-level entry are relocated under
 * `[locale]`; targets that stayed at the app root or live outside the app
 * directory are returned unchanged.
 */
const mapTargetPath = (
  oldTargetAbs: string,
  { appDirAbs, localeDirAbs, movedTopLevelNames }: RewriteContext
): string => {
  const relFromApp = relative(appDirAbs, oldTargetAbs);

  // Outside the app directory (e.g. `../components/...`) — never moved.
  if (relFromApp.startsWith('..') || isAbsolute(relFromApp)) {
    return oldTargetAbs;
  }

  const firstSegment = relFromApp.split(sep)[0] ?? '';
  const isMoved = movedTopLevelNames.some(
    (name) =>
      name === firstSegment || stripScriptExtension(name) === firstSegment
  );

  if (!isMoved) return oldTargetAbs;

  return join(localeDirAbs, relFromApp);
};

/**
 * Rewrites relative import/export/`import()`/`require()` specifiers in a file
 * that has moved from `oldAbs` to `newAbs`, so they keep resolving to the same
 * modules after the move. Non-relative specifiers (bare packages, `@/` aliases)
 * are left untouched. Returns the original code unchanged when nothing matched.
 */
export const rewriteRelativeImports = (
  code: string,
  oldAbs: string,
  newAbs: string,
  context: RewriteContext
): string => {
  // babel-ts handles TypeScript *and* JSX (App Router files are `.tsx`).
  const ast = recast.parse(code, { parser: babelTsParser });

  let changed = false;

  const rewriteSource = (sourceNode: any): void => {
    if (!sourceNode || !n.StringLiteral.check(sourceNode)) return;
    const specifier = sourceNode.value;
    if (typeof specifier !== 'string' || !specifier.startsWith('.')) return;

    const oldTargetAbs = resolve(dirname(oldAbs), specifier);
    const newTargetAbs = mapTargetPath(oldTargetAbs, context);

    let newSpecifier = relative(dirname(newAbs), newTargetAbs)
      .split(sep)
      .join('/');
    if (!newSpecifier.startsWith('.')) {
      newSpecifier = `./${newSpecifier}`;
    }

    if (newSpecifier !== specifier) {
      sourceNode.value = newSpecifier;
      changed = true;
    }
  };

  recast.visit(ast, {
    visitImportDeclaration(path) {
      rewriteSource(path.node.source);
      return false;
    },
    visitExportAllDeclaration(path) {
      rewriteSource(path.node.source);
      return false;
    },
    visitExportNamedDeclaration(path) {
      if (path.node.source) rewriteSource(path.node.source);
      return false;
    },
    visitCallExpression(path) {
      const { callee, arguments: args } = path.node;
      const isDynamicImport = callee.type === 'Import';
      const isRequire = n.Identifier.check(callee) && callee.name === 'require';
      if ((isDynamicImport || isRequire) && args.length > 0) {
        rewriteSource(args[0]);
      }
      this.traverse(path);
    },
  });

  if (!changed) return code;
  return recast.print(ast).code;
};

/** Outcome of an attempted `[locale]` restructure. */
export type RestructureResult =
  | { status: 'already-structured'; localeSegment: string }
  | { status: 'nothing-to-move' }
  | { status: 'moved'; movedEntries: string[] };

/**
 * Moves the routable App Router entries of `appDir` under a new `[locale]`
 * segment and rewrites relative imports in the moved files. Idempotent: it is a
 * no-op when the app is already locale-aware in any prefix mode (see
 * {@link isLocaleSegment}), which is reported via `localeSegment`. Root-only
 * files (see {@link shouldKeepAppEntryAtRoot}) are left in place.
 */
export const restructureAppIntoLocale = async (
  rootDir: string,
  appDir: string
): Promise<RestructureResult> => {
  const appDirAbs = join(rootDir, appDir);
  const localeDirAbs = join(appDirAbs, '[locale]');

  const entries = await readdir(appDirAbs, { withFileTypes: true });

  // Skip when the app is already locale-aware in any prefix mode — a fresh
  // `[locale]`, or an existing `[...locale]` / `[[...locale]]` catch-all segment.
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
    .filter((name) => !shouldKeepAppEntryAtRoot(name));

  if (movedTopLevelNames.length === 0) {
    return { status: 'nothing-to-move' };
  }

  await mkdir(localeDirAbs, { recursive: true });

  for (const name of movedTopLevelNames) {
    await rename(join(appDirAbs, name), join(localeDirAbs, name));
  }

  const movedFiles = await fg(SCRIPT_GLOB, {
    cwd: localeDirAbs,
    absolute: true,
    onlyFiles: true,
  });

  const rewriteContext: RewriteContext = {
    appDirAbs,
    localeDirAbs,
    movedTopLevelNames,
  };

  for (const newAbs of movedFiles) {
    const relFromLocale = relative(localeDirAbs, newAbs);
    const oldAbs = join(appDirAbs, relFromLocale);
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
