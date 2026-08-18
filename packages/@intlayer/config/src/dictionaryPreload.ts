import { dirname, resolve } from 'node:path';
import {
  DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER,
  PRELOADED_DYNAMIC_KEY,
  QUALIFIER_DYNAMIC_TYPES_KEY,
} from './defaultValues/dictionary';

/**
 * Matches a generated dynamic entry point, whose layout is
 * `<dynamicDictionariesDir>/<key>.mjs`. The per-locale JSON chunks it imports
 * live one directory deeper, under `json/`, and are deliberately excluded.
 */
export const DYNAMIC_ENTRY_PATTERN = /\/(?<key>[^/]+)\.mjs$/;

/** Escapes a literal path segment for embedding in a regular expression. */
const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Builds a filter matching only the generated dynamic entry points, for
 * bundlers whose load hook is selected by a regular expression over the raw
 * file path (esbuild).
 *
 * A hook registered on every `.mjs` would call back into JavaScript for each
 * such file in the build, `node_modules` included, so the filter is anchored on
 * the dictionaries directory name. It matches both path separators because
 * esbuild tests the platform path, which is backslash-separated on Windows —
 * the directory name itself never contains one.
 *
 * The name alone is not proof of location, so the callback must still confirm
 * the full path lies inside `dynamicDictionariesDir`.
 *
 * @param dynamicDictionariesDir - Absolute dictionaries root, any separator.
 */
export const createDynamicEntryFilter = (
  dynamicDictionariesDir: string
): RegExp => {
  const directoryName =
    dynamicDictionariesDir.split(/[\\/]/).filter(Boolean).pop() ?? '';

  return new RegExp(
    `[\\\\/]${escapeRegExp(directoryName)}[\\\\/][^\\\\/]+\\.mjs$`
  );
};

/**
 * Specifier of the module the injected preamble reads the locale from, as the
 * bundler plugins are expected to resolve it.
 *
 * Never emitted as-is: a generated entry point lives in the *application's*
 * `.intlayer` directory, and an application depends on `intlayer` and its
 * framework binding — not on `@intlayer/core` — so a bare specifier would
 * resolve from a directory where the package is absent, or, worse, silently
 * hit an unrelated copy hoisted higher up the tree.
 */
export const PRELOAD_MODULE_SPECIFIER = '@intlayer/core/localization';

/** Package and subpath {@link PRELOAD_MODULE_SPECIFIER} is composed of. */
const PRELOAD_PACKAGE_NAME = '@intlayer/core';
const PRELOAD_PACKAGE_SUBPATH = './localization';

/** The subset of a `package.json` this resolution reads. */
type PackageManifest = {
  exports?: Record<string, { import?: string } | string | undefined>;
};

/**
 * Resolves {@link PRELOAD_MODULE_SPECIFIER} to an absolute id the injected
 * preamble can import, from a package that actually depends on it.
 *
 * Deliberately not `require.resolve(PRELOAD_MODULE_SPECIFIER)`: that applies
 * the `require` condition and lands on the package's CommonJS build, which the
 * preamble would then pull into a *browser* bundle behind a CommonJS interop
 * wrapper — a second copy of the module alongside the ESM one the application
 * already imports, each with its own memoized locale. The manifest is resolved
 * instead (a condition-free subpath) and its `import` entry read directly.
 *
 * @param requireFn - `require`, or `createRequire(import.meta.url)`, from the
 *   plugin package.
 * @returns Absolute path to the ESM build, falling back to whatever the
 *   standard resolution yields if the package ever stops publishing one.
 */
export const resolvePreloadModuleId = (requireFn: NodeRequire): string => {
  const manifestPath = requireFn.resolve(
    `${PRELOAD_PACKAGE_NAME}/package.json`
  );
  const manifest = requireFn(manifestPath) as PackageManifest;
  const subpathExport = manifest.exports?.[PRELOAD_PACKAGE_SUBPATH];

  const esmEntry =
    typeof subpathExport === 'string' ? subpathExport : subpathExport?.import;

  if (!esmEntry) return requireFn.resolve(PRELOAD_MODULE_SPECIFIER);

  return resolve(dirname(manifestPath), esmEntry);
};

/**
 * Builds the import the injected preamble relies on, hoisted ahead of the
 * generated source.
 *
 * @param preloadModuleId - Specifier resolving to {@link PRELOAD_MODULE_SPECIFIER}
 *   from the plugin package, which does depend on it.
 */
const buildPreloadImport = (preloadModuleId: string): string =>
  `import { getPreloadLocale as __intlayerGetPreloadLocale } from '${preloadModuleId}';\n`;

/**
 * Preamble appended to a generated dynamic entry point.
 *
 * The `await` is top-level on purpose: it makes the entry point an async
 * module, so every chunk that statically imports it — a route component, a
 * lazily loaded section — only finishes evaluating once the awaited locale
 * chunk has arrived. A router's own `import()` of a route therefore already
 * covers that route's dictionaries, and the read during render finds them in
 * place instead of suspending and revealing a pending fallback.
 *
 * Only the resolved locale is awaited, so a page still downloads exactly the
 * language it renders.
 *
 * A failed load is swallowed: leaving the marker unset drops the read back onto
 * the asynchronous path, where the existing loading state surfaces the error.
 * Throwing here would instead break the whole route chunk, turning a missing
 * dictionary into a blank page.
 */
const PRELOAD_PREAMBLE = [
  '',
  '// Injected by Intlayer: preloads the browsing locale before render.',
  'const __intlayerLocale = __intlayerGetPreloadLocale();',
  `const __intlayerLoader = ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER}[__intlayerLocale];`,
  '',
  `if (typeof window !== 'undefined' && typeof __intlayerLoader === 'function') {`,
  '  const __intlayerDictionary = await __intlayerLoader().catch(() => undefined);',
  '',
  '  if (__intlayerDictionary !== undefined) {',
  `    ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER}['${PRELOADED_DYNAMIC_KEY}'] = {`,
  '      locale: __intlayerLocale,',
  '      dictionary: __intlayerDictionary,',
  '    };',
  '  }',
  '}',
  '',
].join('\n');

/** Why a generated entry point was left untransformed. */
export type PreloadSkipReason = 'qualified' | 'unrecognized-shape';

export type PreloadTransformResult =
  | { code: string; skipped?: undefined }
  | { code?: undefined; skipped: PreloadSkipReason };

/**
 * Adds the top-level-await locale preload to a generated dynamic entry point.
 *
 * Bundler-agnostic on purpose: the Vite plugin and the esbuild plugin apply the
 * identical transform, and keeping one implementation means the emitted shape
 * cannot drift between them. The caller decides *which* modules to hand over
 * (the id is matched against the dynamic dictionaries directory) and how to
 * report a skip.
 *
 * @param code - Source of the generated `<key>.mjs` entry point.
 * @param preloadModuleId - Specifier the preamble imports the locale resolver
 *   from, already resolved against the plugin package.
 * @returns The transformed source, or the reason it was left alone.
 */
export const addDynamicEntryPreload = (
  code: string,
  preloadModuleId: string
): PreloadTransformResult => {
  // Qualified entry points (collections, variants) expose a nested tree of
  // loaders per locale rather than one loader, so preloading them would have to
  // guess which coordinate the call site targets — and would fetch every chunk
  // to avoid guessing wrong.
  if (code.includes(QUALIFIER_DYNAMIC_TYPES_KEY)) {
    return { skipped: 'qualified' };
  }

  // The preamble mutates the generated binding; if the code generator ever
  // stops emitting it, skipping keeps the build correct (and merely
  // unoptimized) instead of emitting a reference error.
  if (!code.includes(`const ${DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER} =`)) {
    return { skipped: 'unrecognized-shape' };
  }

  return {
    code: buildPreloadImport(preloadModuleId) + code + PRELOAD_PREAMBLE,
  };
};
