/**
 * Writes Brotli and gzip siblings next to every compressible file in a
 * directory, so both Nitro's static handler and `server/staticPages.ts` can
 * serve pre-compressed bytes with zero per-request CPU cost.
 *
 * Nitro's own `compressPublicAssets` option only runs inside *Nitro's*
 * prerender pass; this app prerenders through TanStack Start instead, so that
 * hook never fires and nothing in the output would otherwise be compressed.
 *
 * The build calls this twice, because the two halves of the output become
 * available at different points:
 *
 * 1. `vite.config.ts` runs it on the client bundle as that environment closes —
 *    early enough that the `.br` / `.gz` files are copied into `.output/public`
 *    before Nitro globs it for the asset manifest baked into the server. Assets
 *    missing from that manifest cannot be encoding-negotiated at runtime, so
 *    this timing is what makes compressed JS and CSS possible at all.
 * 2. `postbuild` runs it over `.output/public`, covering the prerendered HTML
 *    that TanStack Start writes after the Nitro build has finished.
 *
 * Already-compressed files are skipped, so the second pass only pays for what
 * the first one did not cover.
 */

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import { extname, join, relative } from 'node:path';
import { promisify } from 'node:util';
import { brotliCompress, constants, gzip } from 'node:zlib';

const compressBrotli = promisify(brotliCompress);
const compressGzip = promisify(gzip);

/** Root of the Nitro public output, relative to the app directory. */
const PUBLIC_DIRECTORY = join(process.cwd(), '.output/public');

/**
 * Files below this size cost more in request overhead than they save in
 * bytes — the same 1 KiB floor Nitro applies in `compressPublicAssets`.
 */
const MINIMUM_COMPRESSIBLE_BYTES = 1024;

/** Reads a positive integer environment override, or falls back. */
const readIntEnv = (name: string, fallback: number): number => {
  const parsed = Number(process.env[name]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

/**
 * Brotli quality for the bulk of the output — the prerendered HTML pages and
 * the `__tsr/staticServerFnCache` JSON payloads, together tens of thousands of
 * files and several gigabytes.
 *
 * Brotli's step from 9 to 10 turns on a much more expensive context-modelling
 * pass. Measured on a 440 KiB prerendered page: quality 9 took 12 ms, quality
 * 10 took 155 ms, quality 11 431 ms — 13× the CPU at quality 10 to shave a
 * further ~1 point off the ratio (11.7 % → 10.8 % of raw). Over this output
 * that is the difference between a ~30 s `postbuild` and one measured in
 * minutes. Quality 9 still beats gzip by ~35 %, and the HTML is re-rendered on
 * every deploy, so a slower permanent copy is never worth it. `BROTLI_QUALITY`
 * overrides it.
 */
const BROTLI_QUALITY = Math.min(11, readIntEnv('BROTLI_QUALITY', 9));

/**
 * Brotli quality for the content-hashed, year-immutable assets (`assets/*.js`
 * and `*.css`). There are only a few hundred, every visitor downloads them, and
 * a hashed filename means one compression lasts until the file's contents
 * change — so the top quality earns its one-time cost here, unlike the HTML.
 * `BROTLI_QUALITY_ASSETS` overrides it.
 */
const BROTLI_QUALITY_ASSETS = Math.min(
  11,
  readIntEnv('BROTLI_QUALITY_ASSETS', 11)
);

/** Extensions billed at {@link BROTLI_QUALITY_ASSETS} rather than the default. */
const IMMUTABLE_ASSET_EXTENSIONS = new Set(['.css', '.js', '.mjs']);

/**
 * Brotli above this size drops to {@link BROTLI_QUALITY_LARGE}. A few
 * multi-megabyte chunks would otherwise dominate the run for a few percent of
 * extra savings.
 */
const HIGH_QUALITY_BROTLI_LIMIT_BYTES = 2 * 1024 * 1024;

/** Brotli quality for files past {@link HIGH_QUALITY_BROTLI_LIMIT_BYTES}. */
const BROTLI_QUALITY_LARGE = readIntEnv('BROTLI_QUALITY_LARGE', 9);

/**
 * Picks the Brotli quality for one file: immutable assets get the top level,
 * oversized files get the cheap level, everything else the default.
 */
const brotliQualityForFile = (
  absolutePath: string,
  sizeBytes: number
): number => {
  if (sizeBytes > HIGH_QUALITY_BROTLI_LIMIT_BYTES) return BROTLI_QUALITY_LARGE;

  return IMMUTABLE_ASSET_EXTENSIONS.has(extname(absolutePath).toLowerCase())
    ? BROTLI_QUALITY_ASSETS
    : BROTLI_QUALITY;
};

/**
 * gzip level for the fallback sibling. Level 6 is zlib's own default and lands
 * within ~1 % of level 9 on this content at roughly half the CPU; the brotli
 * sibling is what modern clients actually receive.
 */
const GZIP_LEVEL = Math.min(9, readIntEnv('GZIP_LEVEL', 6));

/**
 * How many files are compressed at once.
 *
 * Node/Bun run async Brotli off-thread, so four lanes already keep several
 * cores busy; measured, four finished this output faster than eight, which only
 * added scheduling contention. The cap also protects a CI container, whose real
 * CPU quota is lower than the `availableParallelism()` host core count.
 * `COMPRESS_CONCURRENCY` overrides it.
 */
const COMPRESSION_CONCURRENCY = Math.max(
  1,
  readIntEnv('COMPRESS_CONCURRENCY', Math.min(4, availableParallelism()))
);

/** Extensions worth compressing — everything else is already compact. */
const COMPRESSIBLE_EXTENSIONS = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.svg',
  '.txt',
  '.webmanifest',
  '.xml',
]);

/** Suffixes this script produces, skipped when re-scanning the tree. */
const GENERATED_SUFFIXES = ['.br', '.gz'] as const;

type CompressionTotals = {
  fileCount: number;
  originalBytes: number;
  brotliBytes: number;
  gzipBytes: number;
};

/**
 * Recursively lists every file under a directory, returning absolute paths.
 */
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
 * Decides whether a file should get compressed siblings, based on its
 * extension and the suffixes this script itself emits.
 */
const isCompressibleFile = (absolutePath: string): boolean => {
  if (GENERATED_SUFFIXES.some((suffix) => absolutePath.endsWith(suffix))) {
    return false;
  }
  if (absolutePath.endsWith('.map')) return false;

  return COMPRESSIBLE_EXTENSIONS.has(extname(absolutePath).toLowerCase());
};

/**
 * True when both variants already exist and are at least as new as the source,
 * meaning an earlier pass in this build already covered the file.
 */
const isAlreadyCompressed = async (
  absolutePath: string,
  sourceModifiedTimeMs: number
): Promise<boolean> => {
  try {
    const variantStats = await Promise.all(
      GENERATED_SUFFIXES.map((suffix) => stat(`${absolutePath}${suffix}`))
    );

    return variantStats.every(
      (variant) => variant.mtimeMs >= sourceModifiedTimeMs
    );
  } catch {
    return false;
  }
};

/**
 * Writes `.br` and `.gz` siblings for a single file and reports the byte
 * counts, or `null` when the file was too small or is already covered.
 */
const compressFile = async (
  absolutePath: string
): Promise<Omit<CompressionTotals, 'fileCount'> | null> => {
  try {
    const fileStats = await stat(absolutePath);
    if (fileStats.size < MINIMUM_COMPRESSIBLE_BYTES) return null;
    if (await isAlreadyCompressed(absolutePath, fileStats.mtimeMs)) return null;

    const contents = await readFile(absolutePath);

    const brotliQuality = brotliQualityForFile(absolutePath, contents.length);

    const [brotliContents, gzipContents] = await Promise.all([
      compressBrotli(contents, {
        params: {
          [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
          [constants.BROTLI_PARAM_QUALITY]: brotliQuality,
          [constants.BROTLI_PARAM_SIZE_HINT]: contents.length,
        },
      }),
      compressGzip(contents, { level: GZIP_LEVEL }),
    ]);

    await Promise.all([
      writeFile(`${absolutePath}.br`, brotliContents),
      writeFile(`${absolutePath}.gz`, gzipContents),
    ]);

    return {
      originalBytes: contents.length,
      brotliBytes: brotliContents.length,
      gzipBytes: gzipContents.length,
    };
  } catch {
    return null;
  }
};

/**
 * Runs `worker` over `items` with a bounded number of concurrent tasks, so a
 * 2000-file output does not open 2000 file handles or 2000 Brotli buffers.
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

/** Formats a byte count as mebibytes with one decimal place. */
const formatMebibytes = (bytes: number): string =>
  `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/**
 * Compresses every eligible file under `directory`, logging a one-line summary.
 *
 * Missing directories are reported rather than thrown: the client-bundle pass
 * runs from a Vite hook where a missing output directory means the build
 * already failed, and failing again there would only obscure the real error.
 *
 * @param directory - Absolute path to walk.
 * @param label - Name shown in the log line, e.g. `client bundle`.
 */
export const compressDirectory = async (
  directory: string,
  label: string
): Promise<void> => {
  console.log(`🗜️  Pre-compressing ${label}...`);

  const startedAt = Date.now();

  let allFiles: string[];
  try {
    allFiles = await listFilesRecursively(directory);
  } catch {
    console.error(
      `   ✗ ${relative(process.cwd(), directory)} not found — nothing compressed.`
    );
    return;
  }

  const compressibleFiles = allFiles.filter(isCompressibleFile);

  const outcomes = await mapWithConcurrency(
    compressibleFiles,
    COMPRESSION_CONCURRENCY,
    compressFile
  );

  const totals = outcomes.reduce<CompressionTotals>(
    (accumulator, outcome) =>
      outcome === null
        ? accumulator
        : {
            fileCount: accumulator.fileCount + 1,
            originalBytes: accumulator.originalBytes + outcome.originalBytes,
            brotliBytes: accumulator.brotliBytes + outcome.brotliBytes,
            gzipBytes: accumulator.gzipBytes + outcome.gzipBytes,
          },
    { fileCount: 0, originalBytes: 0, brotliBytes: 0, gzipBytes: 0 }
  );

  const brotliRatio = totals.originalBytes
    ? (100 * totals.brotliBytes) / totals.originalBytes
    : 0;
  const gzipRatio = totals.originalBytes
    ? (100 * totals.gzipBytes) / totals.originalBytes
    : 0;

  console.log(
    `   ✓ ${totals.fileCount} files in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`
  );
  console.log(`     raw    ${formatMebibytes(totals.originalBytes)}`);
  console.log(
    `     brotli ${formatMebibytes(totals.brotliBytes)} (${brotliRatio.toFixed(1)}% of raw)`
  );
  console.log(
    `     gzip   ${formatMebibytes(totals.gzipBytes)} (${gzipRatio.toFixed(1)}% of raw)`
  );
};

/**
 * Running this file directly is the `postbuild` pass: it sweeps the whole
 * public output, picking up the prerendered HTML the client-bundle pass could
 * not have seen. Importing it (from `vite.config.ts`) only pulls in
 * `compressDirectory`.
 */
if (import.meta.main) {
  await compressDirectory(PUBLIC_DIRECTORY, 'prerendered output');
}
