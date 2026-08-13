import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, extname, join, resolve } from 'node:path';
import type { CallerVariableBinding, MessageUsage } from '@intlayer/lsp/utils';

/**
 * Project-wide dictionary usage, shared by the `no-unused-content` rule.
 *
 * ESLint lints one file at a time and offers no end-of-run hook, so a rule that
 * needs to know whether a *declared* field is read *somewhere else* has to build
 * that knowledge itself. This module does exactly what the VS Code extension's
 * unused-content decoration does — glob the project's source files, run the
 * shared `@intlayer/lsp` analyser over each one, and aggregate the result —
 * behind a process-level cache so the scan happens once per lint run rather
 * than once per content file.
 *
 * Everything here is loaded lazily. The rule is off by default, and a plugin
 * that eagerly pulled a native parser and the config loader into every lint run
 * would tax the projects that never enable it.
 */

// ── Lazily required modules ──────────────────────────────────────────────────

/**
 * True when this file runs from the ESM build. `import.meta.url` is rewritten
 * to a `__filename`-based shim in the CJS build, so both branches below stay
 * correct whichever bundle the host loads.
 */
const isEsModule = typeof import.meta.url === 'string';

/** `require` resolved from this package — the fallback when the host project cannot resolve a module. */
const packageRequire: NodeJS.Require = isEsModule
  ? createRequire(import.meta.url)
  : require;

/**
 * Require a module from the linted project first, falling back to this
 * package's own resolution.
 *
 * Preferring the project copy keeps the analyser in step with the Intlayer
 * version the project actually builds with; the fallback covers strict
 * `node_modules` layouts (pnpm) where the plugin's own dependencies are not
 * hoisted into the project tree.
 *
 * @param moduleName - Specifier to resolve.
 * @param baseDir - Directory the project resolution starts from.
 */
const requireFromProject = <ModuleExports>(
  moduleName: string,
  baseDir: string
): ModuleExports | null => {
  try {
    return createRequire(join(baseDir, 'noop.js'))(moduleName) as ModuleExports;
  } catch {
    // Not resolvable from the project — try this package's own dependencies.
  }

  try {
    return packageRequire(moduleName) as ModuleExports;
  } catch {
    return null;
  }
};

/** The subset of `@intlayer/lsp/utils` this module drives. */
type LspAnalyzer = {
  collectMessageUsages: (text: string) => MessageUsage[];
  collectCallerBindings: (text: string) => CallerVariableBinding[];
  getCallerNamesAlternation: () => string;
};

/** The subset of `@intlayer/config/node` this module drives. */
type ConfigLoader = {
  getConfiguration: (options: { baseDir: string }) => IntlayerProjectConfig;
};

/** The subset of `fast-glob` this module drives. */
type Glob = {
  sync: (
    patterns: string[],
    options: {
      cwd: string;
      ignore: string[];
      absolute: boolean;
      dot: boolean;
      followSymbolicLinks: boolean;
    }
  ) => string[];
};

/**
 * The configuration fields the scan reads.
 *
 * Declared structurally rather than imported from `@intlayer/types` so the
 * plugin keeps its single runtime dependency, and so the exact surface this
 * rule depends on stays visible in one place.
 */
export type IntlayerProjectConfig = {
  content: { fileExtensions?: string[]; codeDir?: string[] };
  build: { traversePattern?: string[] };
  compiler?: { transformPattern?: string | string[] };
  system: { baseDir: string; unmergedDictionariesDir: string };
};

// ── Public shapes ────────────────────────────────────────────────────────────

/** How one dictionary key is consumed across the project. */
export type DictionaryUsage = {
  /**
   * Dotted content-field paths read somewhere, every parent prefix included —
   * reading `hero.title` marks `hero` used too.
   */
  usedFieldPaths: Set<string>;
  /**
   * True when at least one reference consumes the dictionary in a way field
   * tracking cannot follow: the content object escapes as a whole, a translator
   * function is bound, or the referencing file could not be parsed. No field of
   * the dictionary may be reported unused once this is set.
   */
  tracksEveryField: boolean;
};

/** The result of one project scan. */
export type ProjectUsageIndex = {
  /** Every dictionary key referenced by the project, and how. */
  byDictionaryKey: Map<string, DictionaryUsage>;
  /**
   * Extension-less absolute paths of modules imported by the scanned files. A
   * content declaration reached through a direct import (`useDictionary(myDict)`)
   * carries no key at the call site, so importing it at all counts as a use.
   */
  importedModulePaths: Set<string>;
  /**
   * False when the project could not be scanned — no config, no analyser, or no
   * matching source file. Every report is suppressed in that case rather than
   * flagging a whole project as unused.
   */
  isAvailable: boolean;
};

/** One other place a dictionary key is declared. */
export type DuplicateDeclaration = {
  /** Path as recorded in the unmerged dictionary, or `'remote'` for CMS entries. */
  filePath: string;
  /** Whether the other declaration lives in the project or in the CMS. */
  location: 'local' | 'remote';
};

// ── File extensions ──────────────────────────────────────────────────────────

/**
 * Extensions the `@intlayer/lsp` analyser parses directly.
 *
 * Single-file components (`.vue`, `.svelte`, `.astro`) hold their script in a
 * markup wrapper the parser rejects, so they take the conservative path below
 * instead of being silently read as "uses nothing".
 */
const ANALYZABLE_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.mts',
  '.cts',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
]);

/** Extensions stripped when comparing an import specifier to a file path. */
const MODULE_EXTENSIONS = [
  '.ts',
  '.tsx',
  '.mts',
  '.cts',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.vue',
  '.svelte',
  '.astro',
];

/**
 * Drop the module extension from a path so `./home.content` and
 * `/project/src/home.content.ts` compare equal.
 *
 * @param filePath - Absolute or relative path.
 */
export const stripModuleExtension = (filePath: string): string => {
  const extension = extname(filePath);

  return MODULE_EXTENSIONS.includes(extension)
    ? filePath.slice(0, -extension.length)
    : filePath;
};

// ── Regular expressions ──────────────────────────────────────────────────────

/**
 * Relative import specifiers, covering the static form, dynamic `import()` and
 * `require()`. Bare specifiers are ignored: a content declaration is always
 * reached through a relative path or an alias, and alias resolution would need
 * the project's TypeScript configuration.
 */
const RELATIVE_IMPORT_REGEX =
  /(?:from|import|require)\s*\(?\s*['"](\.{1,2}\/[^'"]+)['"]/g;

/**
 * `nest("other-dictionary")` inside a content declaration.
 *
 * Nesting is the one way a dictionary is consumed from another *content* file,
 * and content files are excluded from the usage scan — without this the nested
 * dictionary would look unreferenced.
 */
const NEST_CALL_REGEX = /\bnest\s*(?:<[^<>()]*>)?\s*\(\s*['"`]([^'"`]+)['"`]/g;

/**
 * Dictionary keys passed to a caller, for the conservative fallback.
 *
 * Built from the shared caller registry so it recognises the compat adapters
 * too, and matched against files the precise analyser could not read.
 *
 * @param callerNamesAlternation - `useIntlayer|useTranslations|…`.
 */
const buildFallbackKeyRegex = (callerNamesAlternation: string): RegExp =>
  new RegExp(
    `\\b(?:${callerNamesAlternation})\\b\\s*(?:<[^<>()]*>)?\\s*\\(\\s*(?:['"\`]([^'"\`]+)['"\`]|\\{[^{}]*?(?:id|namespace)\\s*:\\s*['"\`]([^'"\`]+)['"\`])`,
    'g'
  );

/**
 * Cheap pre-filter: does this file mention any caller at all?
 *
 * @param callerNamesAlternation - `useIntlayer|useTranslations|…`.
 */
const buildCallerMentionRegex = (callerNamesAlternation: string): RegExp =>
  new RegExp(`\\b(?:${callerNamesAlternation})\\b`);

// ── Caches ───────────────────────────────────────────────────────────────────

type CacheEntry<Value> = { builtAt: number; value: Value };

const configurationCache = new Map<
  string,
  CacheEntry<IntlayerProjectConfig | null>
>();
const usageIndexCache = new Map<string, CacheEntry<ProjectUsageIndex>>();

/** An index that reports nothing, used whenever the scan cannot run. */
const UNAVAILABLE_INDEX: ProjectUsageIndex = {
  byDictionaryKey: new Map(),
  importedModulePaths: new Set(),
  isAvailable: false,
};

/**
 * Read a cache entry that has not outlived `cacheTtlMs`.
 *
 * @param cache - The cache to read.
 * @param cacheKey - Entry key.
 * @param cacheTtlMs - Lifetime in milliseconds; `0` disables caching entirely.
 */
const readCache = <Value>(
  cache: Map<string, CacheEntry<Value>>,
  cacheKey: string,
  cacheTtlMs: number
): Value | undefined => {
  if (cacheTtlMs <= 0) return undefined;

  const entry = cache.get(cacheKey);

  if (!entry) return undefined;

  if (Date.now() - entry.builtAt > cacheTtlMs) {
    cache.delete(cacheKey);

    return undefined;
  }

  return entry.value;
};

/** Drop every cached configuration and usage index. Exposed for tests. */
export const clearProjectUsageCache = (): void => {
  configurationCache.clear();
  usageIndexCache.clear();
};

// ── Configuration ────────────────────────────────────────────────────────────

/**
 * Load the Intlayer configuration for a project, or `null` when it cannot be
 * read — a project without Intlayer installed must not break the lint run.
 *
 * @param baseDir - Project root, normally ESLint's working directory.
 * @param cacheTtlMs - Lifetime of the cached configuration.
 */
export const getProjectConfiguration = (
  baseDir: string,
  cacheTtlMs: number
): IntlayerProjectConfig | null => {
  const cached = readCache(configurationCache, baseDir, cacheTtlMs);

  if (cached !== undefined) return cached;

  const configLoader = requireFromProject<ConfigLoader>(
    '@intlayer/config/node',
    baseDir
  );

  let configuration: IntlayerProjectConfig | null = null;

  try {
    configuration = configLoader?.getConfiguration({ baseDir }) ?? null;
  } catch {
    configuration = null;
  }

  configurationCache.set(baseDir, {
    builtAt: Date.now(),
    value: configuration,
  });

  return configuration;
};

// ── Scanning ─────────────────────────────────────────────────────────────────

/** The glob patterns and roots one project scan walks. */
type ScanTargets = {
  roots: string[];
  includePatterns: string[];
  excludePatterns: string[];
  contentFilePatterns: string[];
};

/**
 * Translate the configuration into the globs the scan runs, mirroring how the
 * build pipeline decides which files are project source.
 *
 * Content declarations are excluded from the source scan — a dictionary must
 * not count as its own consumer — and globbed separately for `nest()` calls.
 *
 * @param configuration - The project configuration.
 */
const getScanTargets = (configuration: IntlayerProjectConfig): ScanTargets => {
  const { transformPattern } = configuration.compiler ?? {};

  const compilerPatterns = transformPattern
    ? Array.isArray(transformPattern)
      ? transformPattern
      : [transformPattern]
    : [];

  const allPatterns = [
    ...(configuration.build.traversePattern ?? []),
    ...compilerPatterns,
  ];

  const contentFilePatterns = (configuration.content.fileExtensions ?? []).map(
    (extension) => `**/*${extension}`
  );

  const roots = [
    configuration.system.baseDir,
    ...(configuration.content.codeDir ?? []),
  ].map((root) => resolve(root));

  return {
    roots: [...new Set(roots)],
    includePatterns: allPatterns.filter((pattern) => !pattern.startsWith('!')),
    excludePatterns: [
      ...allPatterns
        .filter((pattern) => pattern.startsWith('!'))
        .map((pattern) => pattern.slice(1)),
      ...contentFilePatterns,
    ],
    contentFilePatterns,
  };
};

/**
 * List the files matching `patterns` under every root, de-duplicated.
 *
 * @param glob - The lazily required `fast-glob`.
 * @param targets - Roots to walk.
 * @param patterns - Patterns to include.
 * @param excludePatterns - Patterns to skip.
 */
const listFiles = (
  glob: Glob,
  targets: ScanTargets,
  patterns: string[],
  excludePatterns: string[]
): string[] => {
  if (patterns.length === 0) return [];

  const files = new Set<string>();

  for (const root of targets.roots) {
    if (!existsSync(root)) continue;

    try {
      for (const file of glob.sync(patterns, {
        cwd: root,
        ignore: excludePatterns,
        absolute: true,
        dot: false,
        followSymbolicLinks: false,
      })) {
        files.add(file);
      }
    } catch {
      // An unreadable root contributes nothing; the rest of the scan stands.
    }
  }

  return [...files];
};

/**
 * The usage record for `dictionaryKey`, created on first sight.
 *
 * @param index - Index being built.
 * @param dictionaryKey - Key to look up.
 */
const getOrCreateUsage = (
  index: ProjectUsageIndex,
  dictionaryKey: string
): DictionaryUsage => {
  const existing = index.byDictionaryKey.get(dictionaryKey);

  if (existing) return existing;

  const created: DictionaryUsage = {
    usedFieldPaths: new Set(),
    tracksEveryField: false,
  };

  index.byDictionaryKey.set(dictionaryKey, created);

  return created;
};

/**
 * Record a read of `fieldPath`, marking every parent prefix used as well:
 * reading `hero.title` means the `hero` object is read too.
 *
 * @param usage - The record to update.
 * @param fieldPath - Field path segments from the content root.
 */
const addUsedFieldPath = (
  usage: DictionaryUsage,
  fieldPath: string[]
): void => {
  for (let depth = 1; depth <= fieldPath.length; depth++) {
    usage.usedFieldPaths.add(fieldPath.slice(0, depth).join('.'));
  }
};

/**
 * Fold one analysed file into the index.
 *
 * Mirrors the VS Code decoration's interpretation of the analyser output: a
 * bare content reference or a bound translator function means any field may be
 * read, and a dictionary referenced without any trackable binding proves only
 * that the dictionary itself is alive.
 *
 * @param index - Index being built.
 * @param usages - Message usages found in the file.
 * @param bindings - Caller bindings found in the file.
 */
const foldFileAnalysis = (
  index: ProjectUsageIndex,
  usages: MessageUsage[],
  bindings: CallerVariableBinding[]
): void => {
  const keysWithFieldUsage = new Set<string>();

  for (const usage of usages) {
    const record = getOrCreateUsage(index, usage.dictionaryKey);

    if (usage.kind === 'namespace') continue;

    if (usage.fieldPath.length === 0) {
      // The content object itself is consumed — any field may be read from it.
      record.tracksEveryField = true;
      continue;
    }

    keysWithFieldUsage.add(usage.dictionaryKey);
    addUsedFieldPath(record, usage.fieldPath);
  }

  const keysWithBinding = new Set<string>();

  for (const binding of bindings) {
    const record = getOrCreateUsage(index, binding.dictionaryKey);

    keysWithBinding.add(binding.dictionaryKey);

    // A translator function may be forwarded, called with a computed key, or
    // used inside a template region the parser never saw.
    if (binding.bindingKind === 'translator') {
      record.tracksEveryField = true;
      continue;
    }

    // A content binding whose fields were never seen being read means the reads
    // happen somewhere this analysis cannot follow.
    if (!keysWithFieldUsage.has(binding.dictionaryKey)) {
      record.tracksEveryField = true;
    }
  }

  // A dictionary this file names but neither binds nor reads a field from — a
  // bare `useIntlayer('home')` statement — proves existence only. The test is
  // deliberately per file: what another file did with the same key says nothing
  // about what this one does with it.
  for (const usage of usages) {
    if (usage.kind !== 'namespace') continue;

    if (keysWithFieldUsage.has(usage.dictionaryKey)) continue;

    if (keysWithBinding.has(usage.dictionaryKey)) continue;

    getOrCreateUsage(index, usage.dictionaryKey).tracksEveryField = true;
  }
};

/**
 * Fold a file the precise analyser could not read — a single-file component, or
 * anything that failed to parse — by marking every dictionary key it mentions
 * as fully used.
 *
 * @param index - Index being built.
 * @param text - File contents.
 * @param fallbackKeyRegex - Key-extraction pattern from the caller registry.
 */
const foldFallbackAnalysis = (
  index: ProjectUsageIndex,
  text: string,
  fallbackKeyRegex: RegExp
): void => {
  fallbackKeyRegex.lastIndex = 0;

  let match = fallbackKeyRegex.exec(text);

  while (match) {
    const dictionaryKey = match[1] ?? match[2];

    if (dictionaryKey) {
      // `formatMessage({ id: 'home.title' })` addresses a field through the key.
      const [rootKey] = dictionaryKey.split('.');

      getOrCreateUsage(index, rootKey ?? dictionaryKey).tracksEveryField = true;
    }

    match = fallbackKeyRegex.exec(text);
  }
};

/**
 * Record every module a file imports through a relative specifier.
 *
 * @param index - Index being built.
 * @param filePath - Absolute path of the importing file.
 * @param text - File contents.
 */
const foldImports = (
  index: ProjectUsageIndex,
  filePath: string,
  text: string
): void => {
  RELATIVE_IMPORT_REGEX.lastIndex = 0;

  let match = RELATIVE_IMPORT_REGEX.exec(text);

  while (match) {
    const specifier = match[1];

    if (specifier) {
      const resolved = resolve(dirname(filePath), specifier);

      index.importedModulePaths.add(stripModuleExtension(resolved));
      // `import './home'` may resolve to `./home/index.ts`.
      index.importedModulePaths.add(join(resolved, 'index'));
    }

    match = RELATIVE_IMPORT_REGEX.exec(text);
  }
};

/**
 * Mark dictionaries pulled in by `nest()` from another content declaration.
 *
 * @param index - Index being built.
 * @param text - Content declaration source.
 */
const foldNestedDictionaries = (
  index: ProjectUsageIndex,
  text: string
): void => {
  NEST_CALL_REGEX.lastIndex = 0;

  let match = NEST_CALL_REGEX.exec(text);

  while (match) {
    const dictionaryKey = match[1];

    if (dictionaryKey) {
      // `nest('home', 'hero.title')` still keeps the whole subtree reachable.
      getOrCreateUsage(index, dictionaryKey).tracksEveryField = true;
    }

    match = NEST_CALL_REGEX.exec(text);
  }
};

/**
 * Scan the project once and aggregate every dictionary reference it contains.
 *
 * @param baseDir - Project root, normally ESLint's working directory.
 * @param cacheTtlMs - Lifetime of the cached index.
 */
export const getProjectUsageIndex = (
  baseDir: string,
  cacheTtlMs: number
): ProjectUsageIndex => {
  const cached = readCache(usageIndexCache, baseDir, cacheTtlMs);

  if (cached) return cached;

  const index = buildProjectUsageIndex(baseDir, cacheTtlMs);

  usageIndexCache.set(baseDir, { builtAt: Date.now(), value: index });

  return index;
};

/**
 * The uncached body of {@link getProjectUsageIndex}.
 *
 * @param baseDir - Project root.
 * @param cacheTtlMs - Lifetime of the cached configuration.
 */
const buildProjectUsageIndex = (
  baseDir: string,
  cacheTtlMs: number
): ProjectUsageIndex => {
  const configuration = getProjectConfiguration(baseDir, cacheTtlMs);

  if (!configuration) return UNAVAILABLE_INDEX;

  const analyzer = requireFromProject<LspAnalyzer>(
    '@intlayer/lsp/utils',
    baseDir
  );
  // `fast-glob` is CJS, but an interop wrapper may still hand back a namespace
  // object whose callable module sits on `default`.
  const globModule = requireFromProject<Glob & { default?: Glob }>(
    'fast-glob',
    baseDir
  );
  const glob = globModule?.sync ? globModule : globModule?.default;

  if (!analyzer || !glob) return UNAVAILABLE_INDEX;

  const targets = getScanTargets(configuration);
  const sourceFiles = listFiles(
    glob,
    targets,
    targets.includePatterns,
    targets.excludePatterns
  );

  if (sourceFiles.length === 0) return UNAVAILABLE_INDEX;

  const callerNamesAlternation = analyzer.getCallerNamesAlternation();
  const callerMentionRegex = buildCallerMentionRegex(callerNamesAlternation);
  const fallbackKeyRegex = buildFallbackKeyRegex(callerNamesAlternation);

  const index: ProjectUsageIndex = {
    byDictionaryKey: new Map(),
    importedModulePaths: new Set(),
    isAvailable: true,
  };

  for (const filePath of sourceFiles) {
    let text: string;

    try {
      text = readFileSync(filePath, 'utf-8');
    } catch {
      continue; // Unreadable file — nothing to learn from it.
    }

    foldImports(index, filePath, text);

    if (!callerMentionRegex.test(text)) continue;

    if (!ANALYZABLE_EXTENSIONS.has(extname(filePath))) {
      foldFallbackAnalysis(index, text, fallbackKeyRegex);
      continue;
    }

    const usages = analyzer.collectMessageUsages(text);

    if (usages.length === 0) {
      // The file names a caller but the parser found nothing: either the parse
      // failed or the call lives in a region the parser skipped. Stay safe.
      foldFallbackAnalysis(index, text, fallbackKeyRegex);
      continue;
    }

    foldFileAnalysis(index, usages, analyzer.collectCallerBindings(text));
  }

  for (const filePath of listFiles(
    glob,
    targets,
    targets.contentFilePatterns,
    []
  )) {
    try {
      foldNestedDictionaries(index, readFileSync(filePath, 'utf-8'));
    } catch {
      // Unreadable content declaration — nothing to learn from it.
    }
  }

  return index;
};

// ── Duplicate declarations ───────────────────────────────────────────────────

/** One entry of an unmerged dictionary file, reduced to the fields read here. */
type UnmergedDictionaryEntry = {
  filePath?: string;
  location?: string;
};

/**
 * Other declarations of the same dictionary key, read from the unmerged
 * dictionaries the build writes to disk.
 *
 * Returns an empty list when the build output is missing — the rule then simply
 * has nothing to say about duplicates.
 *
 * @param configuration - The project configuration.
 * @param dictionaryKey - Key declared by the linted file.
 * @param currentFilePath - Absolute path of the linted file.
 */
export const getDuplicateDeclarations = (
  configuration: IntlayerProjectConfig,
  dictionaryKey: string,
  currentFilePath: string
): DuplicateDeclaration[] => {
  const dictionaryPath = join(
    configuration.system.unmergedDictionariesDir,
    `${dictionaryKey}.json`
  );

  if (!existsSync(dictionaryPath)) return [];

  let entries: UnmergedDictionaryEntry[];

  try {
    const parsed: unknown = JSON.parse(readFileSync(dictionaryPath, 'utf-8'));

    if (!Array.isArray(parsed)) return [];

    entries = parsed as UnmergedDictionaryEntry[];
  } catch {
    return [];
  }

  const duplicates: DuplicateDeclaration[] = [];

  for (const entry of entries) {
    if (entry.location === 'remote') {
      duplicates.push({ filePath: 'remote', location: 'remote' });
      continue;
    }

    if (!entry.filePath) continue;

    if (
      resolve(configuration.system.baseDir, entry.filePath) === currentFilePath
    ) {
      continue;
    }

    duplicates.push({ filePath: entry.filePath, location: 'local' });
  }

  return duplicates;
};
