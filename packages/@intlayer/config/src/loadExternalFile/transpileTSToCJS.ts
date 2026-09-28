import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, extname, isAbsolute, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import configPackageJson from '@intlayer/types/package.json' with {
  type: 'json',
};
import {
  type BuildOptions,
  type BuildResult,
  build,
  buildSync,
  version as esbuildVersion,
  type Metafile,
} from 'esbuild';
import { CACHE_DIR } from '../defaultValues/system';
import { computeKeyId } from '../utils/cacheMemory';
import { getPackageJsonPath } from '../utils/getPackageJsonPath';
import { getLoader } from './bundleFile';

export type TranspileOptions = BuildOptions & {
  /**
   * Optional custom esbuild instance to use for transpilation.
   * Useful in environments (e.g. VS Code extensions) where the bundled
   * esbuild binary may not match the host platform.
   * When provided, its `buildSync`/`build` methods are used instead of
   * the ones imported from the `esbuild` package.
   */
  esbuildInstance?: typeof import('esbuild');
  /**
   * Persist the transpiled output on disk so later processes can reuse it.
   * When `false`, the output is only cached in memory. Mirrors `build.cache`.
   *
   * @default true
   */
  cache?: boolean;
  /**
   * Directory the persisted outputs are stored in (under `transpile/`).
   * Mirrors `system.cacheDir`. Defaults to `<project root>/.intlayer/cache`,
   * as the configuration file is transpiled before any configuration exists.
   */
  cacheDir?: string;
};

/**
 * Cache of resolved tsconfig paths keyed by the file's directory.
 * Avoids re-walking to package.json + existsSync on every transpilation.
 */
const tsConfigPathCache = new Map<string, string | undefined>();

const getTsConfigPath = (filePath: string): string | undefined => {
  const fileDirectory = dirname(filePath);

  if (tsConfigPathCache.has(fileDirectory)) {
    return tsConfigPathCache.get(fileDirectory);
  }

  let resolvedPath: string | undefined;
  try {
    const tsconfigPath = join(
      getPackageJsonPath(fileDirectory).baseDir,
      'tsconfig.json'
    );

    // Only return the tsconfig path if it exists
    resolvedPath = existsSync(tsconfigPath) ? tsconfigPath : undefined;
  } catch {
    // No package.json found up the tree — transpile without a tsconfig
    resolvedPath = undefined;
  }

  tsConfigPathCache.set(fileDirectory, resolvedPath);

  return resolvedPath;
};

const getTransformationOptions = (filePath: string): BuildOptions => ({
  loader: {
    '.js': 'js',
    '.jsx': 'jsx',
    '.mjs': 'js',
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.cjs': 'js',
    '.json': 'json',
    '.md': 'text',
    '.mdx': 'text',
  },
  format: 'cjs',
  target: 'node20',
  platform: 'node',
  write: false,
  packages: 'external',
  bundle: true,
  // The metafile lists every bundled input, which the transpile cache uses to
  // invalidate when an imported file changes (the entry itself is keyed by hash).
  metafile: true,
  tsconfig: getTsConfigPath(filePath),
  define: {
    'import.meta.url': JSON.stringify(pathToFileURL(filePath).href),
    'import.meta.env': 'process.env',
  },
});

/** Fingerprint of a bundled input file, used to detect changes without re-reading it. */
type TranspileCacheInput = {
  path: string;
  mtimeMs: number;
  size: number;
};

type TranspileCacheEntry = {
  /** Hash of the entry file's source code. */
  codeHash: string;
  /** Hash of the build options, so different option sets don't collide. */
  optionsKey: string;
  /** The transpiled CJS output. */
  output: string;
  /** Fingerprints of every non-entry input bundled into the output. */
  inputs: TranspileCacheInput[];
};

/**
 * In-memory cache of transpiled outputs keyed by entry file path (one entry
 * per file, so re-transpilations replace rather than accumulate).
 * The entry file is validated by content hash; bundled relative imports are
 * validated by mtime + size so an edited dependency invalidates the cache.
 */
const transpileCache = new Map<string, TranspileCacheEntry>();

/** Bumped whenever the shape or semantics of a persisted entry changes. */
const DISK_CACHE_VERSION = 1;

/** Stamped on persisted entries so an Intlayer upgrade invalidates them. */
const INTLAYER_VERSION = configPackageJson.version;

type PersistedTranspileCacheEntry = TranspileCacheEntry & {
  version: number;
  intlayerVersion: string;
  filePath: string;
};

/**
 * Default cache directory per file directory, resolved from the project root.
 * `null` when no package.json is found up the tree (nothing is written then).
 */
const defaultCacheDirectoryCache = new Map<string, string | null>();

const getDefaultCacheDirectory = (filePath: string): string | null => {
  const fileDirectory = dirname(filePath);
  const cachedDirectory = defaultCacheDirectoryCache.get(fileDirectory);

  if (cachedDirectory !== undefined) return cachedDirectory;

  let cacheDirectory: string | null = null;
  try {
    cacheDirectory = join(getPackageJsonPath(fileDirectory).baseDir, CACHE_DIR);
  } catch {
    // No package.json found up the tree — keep the cache in memory only
  }

  defaultCacheDirectoryCache.set(fileDirectory, cacheDirectory);

  return cacheDirectory;
};

const getDiskCacheFilePath = (
  filePath: string,
  cacheDir: string | undefined
): string | null => {
  const cacheDirectory = cacheDir ?? getDefaultCacheDirectory(filePath);

  if (!cacheDirectory) return null;

  return join(cacheDirectory, 'transpile', `${computeKeyId([filePath])}.json`);
};

const readDiskCacheEntry = (
  filePath: string,
  cacheDir: string | undefined
): TranspileCacheEntry | undefined => {
  const diskCacheFilePath = getDiskCacheFilePath(filePath, cacheDir);

  if (!diskCacheFilePath) return undefined;

  try {
    const persistedEntry = JSON.parse(
      readFileSync(diskCacheFilePath, 'utf-8')
    ) as PersistedTranspileCacheEntry;

    // Guards against format changes, upgrades and file name hash collisions
    if (persistedEntry.version !== DISK_CACHE_VERSION) return undefined;
    if (persistedEntry.intlayerVersion !== INTLAYER_VERSION) return undefined;
    if (persistedEntry.filePath !== filePath) return undefined;

    return persistedEntry;
  } catch {
    // Missing or corrupted cache file
    return undefined;
  }
};

const writeDiskCacheEntry = (
  filePath: string,
  cacheDir: string | undefined,
  cacheEntry: TranspileCacheEntry
): void => {
  const diskCacheFilePath = getDiskCacheFilePath(filePath, cacheDir);

  if (!diskCacheFilePath) return;

  const persistedEntry: PersistedTranspileCacheEntry = {
    version: DISK_CACHE_VERSION,
    intlayerVersion: INTLAYER_VERSION,
    filePath,
    ...cacheEntry,
  };

  try {
    mkdirSync(dirname(diskCacheFilePath), { recursive: true });

    // Write then rename, so concurrent processes never read a partial file
    const temporaryFilePath = `${diskCacheFilePath}.${process.pid}.tmp`;
    writeFileSync(temporaryFilePath, JSON.stringify(persistedEntry));
    renameSync(temporaryFilePath, diskCacheFilePath);
  } catch {
    // Read-only file system or similar — the cache is an optimization only
  }
};

/**
 * Removes the persisted transpilation of a file, if any.
 * Used when `build.cache` turns out to be disabled after the file was loaded.
 */
export const clearPersistedTranspilation = (
  filePath: string,
  cacheDir?: string
): void => {
  const diskCacheFilePath = getDiskCacheFilePath(filePath, cacheDir);

  if (!diskCacheFilePath) return;

  try {
    rmSync(diskCacheFilePath, { force: true });
  } catch {
    // Nothing to remove, or not removable — the entry is harmless either way
  }
};

/**
 * Persists unless disabled. esbuild plugins can change the output without any
 * input file changing, so their results are never persisted across processes.
 */
const canUseDiskCache = (
  cache: boolean | undefined,
  buildOptions: BuildOptions
): boolean => cache !== false && !buildOptions.plugins?.length;

/**
 * Key of the build options, including the esbuild version so an upgrade
 * invalidates outputs persisted by a previous version.
 */
const getOptionsKey = (
  buildOptions: BuildOptions,
  esbuildInstance?: typeof import('esbuild')
): string =>
  computeKeyId([buildOptions, esbuildInstance?.version ?? esbuildVersion]);

/** Whether (and where) a transpilation is persisted on disk. */
type DiskCacheTarget = {
  enabled: boolean;
  cacheDir: string | undefined;
};

const isInputUnchanged = (input: TranspileCacheInput): boolean => {
  try {
    const stats = statSync(input.path);
    return stats.mtimeMs === input.mtimeMs && stats.size === input.size;
  } catch {
    // File removed or unreadable — treat as changed
    return false;
  }
};

const isCacheEntryValid = (
  cacheEntry: TranspileCacheEntry,
  codeHash: string,
  optionsKey: string
): boolean =>
  cacheEntry.codeHash === codeHash &&
  cacheEntry.optionsKey === optionsKey &&
  cacheEntry.inputs.every(isInputUnchanged);

const getCachedTranspilation = (
  filePath: string,
  codeHash: string,
  optionsKey: string,
  diskCacheTarget: DiskCacheTarget
): string | undefined => {
  const memoryCacheEntry = transpileCache.get(filePath);

  if (
    memoryCacheEntry &&
    isCacheEntryValid(memoryCacheEntry, codeHash, optionsKey)
  ) {
    return memoryCacheEntry.output;
  }

  if (!diskCacheTarget.enabled) return undefined;

  const diskCacheEntry = readDiskCacheEntry(filePath, diskCacheTarget.cacheDir);

  if (
    !diskCacheEntry ||
    !isCacheEntryValid(diskCacheEntry, codeHash, optionsKey)
  ) {
    return undefined;
  }

  transpileCache.set(filePath, diskCacheEntry);

  return diskCacheEntry.output;
};

/**
 * Extracts the fingerprints of every bundled input from the esbuild metafile.
 * Returns `undefined` when an input cannot be fingerprinted (the result should
 * then not be cached, as invalidation would be unreliable).
 */
const getInputFingerprints = (
  metafile: Metafile | undefined,
  entryFilePath: string
): TranspileCacheInput[] | undefined => {
  if (!metafile) return undefined;

  const resolvedEntryFilePath = resolve(entryFilePath);
  const inputs: TranspileCacheInput[] = [];

  for (const inputPath of Object.keys(metafile.inputs)) {
    // The entry itself is provided via stdin and validated by content hash.
    // esbuild labels it "<stdin>", or with the sourcefile path when set.
    if (inputPath === '<stdin>') continue;
    // Virtual modules from plugins (e.g. "plugin:...") cannot be fingerprinted
    if (inputPath.includes(':') && !isAbsolute(inputPath)) return undefined;

    const absoluteInputPath = isAbsolute(inputPath)
      ? inputPath
      : resolve(process.cwd(), inputPath);

    if (absoluteInputPath === resolvedEntryFilePath) continue;

    try {
      const stats = statSync(absoluteInputPath);
      inputs.push({
        path: absoluteInputPath,
        mtimeMs: stats.mtimeMs,
        size: stats.size,
      });
    } catch {
      return undefined;
    }
  }

  return inputs;
};

/**
 * Fingerprints the tsconfig used for the transpilation: it is not part of the
 * esbuild metafile, but changes the output (paths, JSX settings...).
 */
const getTsConfigFingerprint = (
  filePath: string
): TranspileCacheInput[] | undefined => {
  const tsConfigPath = getTsConfigPath(filePath);

  if (!tsConfigPath) return [];

  try {
    const stats = statSync(tsConfigPath);
    return [{ path: tsConfigPath, mtimeMs: stats.mtimeMs, size: stats.size }];
  } catch {
    return undefined;
  }
};

const setCachedTranspilation = (
  filePath: string,
  codeHash: string,
  optionsKey: string,
  moduleResult: BuildResult,
  output: string,
  diskCacheTarget: DiskCacheTarget
): void => {
  const inputs = getInputFingerprints(moduleResult.metafile, filePath);
  const tsConfigInputs = getTsConfigFingerprint(filePath);

  // Without a usable metafile the cache cannot be invalidated reliably — skip
  if (!inputs || !tsConfigInputs) return;

  const cacheEntry: TranspileCacheEntry = {
    codeHash,
    optionsKey,
    output,
    inputs: [...inputs, ...tsConfigInputs],
  };

  transpileCache.set(filePath, cacheEntry);

  if (diskCacheTarget.enabled) {
    writeDiskCacheEntry(filePath, diskCacheTarget.cacheDir, cacheEntry);
  }
};

/** Clears the in-memory transpilation cache (mainly for tests). */
export const clearTranspileCache = (): void => {
  transpileCache.clear();
  tsConfigPathCache.clear();
  defaultCacheDirectoryCache.clear();
};

export const transpileTSToCJSSync = (
  code: string,
  filePath: string,
  options?: TranspileOptions
): string | undefined => {
  const extension = extname(filePath);
  const loader = getLoader(extension);

  const { esbuildInstance, cache, cacheDir, ...buildOptions } = options ?? {};

  const codeHash = computeKeyId([code]);
  const optionsKey = getOptionsKey(buildOptions, esbuildInstance);
  const diskCacheTarget: DiskCacheTarget = {
    enabled: canUseDiskCache(cache, buildOptions),
    cacheDir,
  };

  const cachedOutput = getCachedTranspilation(
    filePath,
    codeHash,
    optionsKey,
    diskCacheTarget
  );
  if (typeof cachedOutput === 'string') return cachedOutput;

  const esbuildBuildSync = esbuildInstance?.buildSync ?? buildSync;

  // esbuild's worker thread service calls `new Worker(__filename, …)` on first use.
  // In Vite's SSR module runner the SSR-optimised chunk is ESM and __filename is
  // never declared (confirmed: accessing it throws ReferenceError, not undefined).
  // Because there is no local declaration the bare `__filename` lookup falls
  // through to globalThis, so we set it there to esbuild's own CJS entry-point –
  // the exact path esbuild would use if it were loaded in a normal CJS context.
  //
  // IMPORTANT: We save/restore the globals so this temporary shim does not leak
  // to other Vite plugins (e.g. `@vitejs/plugin-react-swc`) that check
  // `typeof __dirname !== "undefined"` to locate their own assets.
  const g = globalThis as Record<string, unknown>;
  const hadFilename = typeof g.__filename === 'string';
  const prevFilename = g.__filename;
  const prevDirname = g.__dirname;

  if (!hadFilename) {
    try {
      const _require = createRequire(import.meta.url);
      const esbuildEntry = _require.resolve('esbuild');
      g.__filename = esbuildEntry;
      g.__dirname = dirname(esbuildEntry);
    } catch {
      // Best-effort: if esbuild can't be resolved the caller's catch handles it
    }
  }

  let moduleResult: BuildResult;
  try {
    moduleResult = esbuildBuildSync({
      stdin: {
        contents: code,
        loader,
        resolveDir: dirname(filePath), // Add resolveDir to resolve imports relative to the file's location
        sourcefile: filePath, // Add sourcefile for better error messages
      },
      ...getTransformationOptions(filePath),
      ...buildOptions,
    });
  } finally {
    // Always restore the previous values so the globals don't linger.
    if (!hadFilename) {
      if (prevFilename === undefined) {
        // biome-ignore lint/performance/noDelete: the global must be truly absent — assigning undefined would leave the key present and break `typeof __filename` checks in other tools
        delete g.__filename;
      } else {
        g.__filename = prevFilename;
      }
      if (prevDirname === undefined) {
        // biome-ignore lint/performance/noDelete: same as __filename above
        delete g.__dirname;
      } else {
        g.__dirname = prevDirname;
      }
    }
  }

  const moduleResultString = moduleResult!.outputFiles?.[0]?.text;

  if (typeof moduleResultString === 'string') {
    setCachedTranspilation(
      filePath,
      codeHash,
      optionsKey,
      moduleResult!,
      moduleResultString,
      diskCacheTarget
    );
  }

  return moduleResultString;
};

export const transpileTSToCJS = async (
  code: string,
  filePath: string,
  options?: TranspileOptions
): Promise<string | undefined> => {
  const extension = extname(filePath);
  const loader = getLoader(extension);

  const { esbuildInstance, cache, cacheDir, ...buildOptions } = options ?? {};

  const codeHash = computeKeyId([code]);
  const optionsKey = getOptionsKey(buildOptions, esbuildInstance);
  const diskCacheTarget: DiskCacheTarget = {
    enabled: canUseDiskCache(cache, buildOptions),
    cacheDir,
  };

  const cachedOutput = getCachedTranspilation(
    filePath,
    codeHash,
    optionsKey,
    diskCacheTarget
  );
  if (typeof cachedOutput === 'string') return cachedOutput;

  // A one-shot build() releases its Go-side resources on completion and costs a
  // single service round-trip (context()+rebuild()+dispose() costs three).
  const esbuildBuild = esbuildInstance?.build ?? build;

  const moduleResult = await esbuildBuild({
    stdin: {
      contents: code,
      loader,
      resolveDir: dirname(filePath),
      sourcefile: filePath,
    },
    ...getTransformationOptions(filePath),
    ...buildOptions,
  });

  const moduleResultString = moduleResult.outputFiles?.[0]?.text;

  if (typeof moduleResultString === 'string') {
    setCachedTranspilation(
      filePath,
      codeHash,
      optionsKey,
      moduleResult,
      moduleResultString,
      diskCacheTarget
    );
  }

  return moduleResultString;
};
