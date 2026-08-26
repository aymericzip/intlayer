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

/**
 * Brotli above this size drops to a cheaper quality level. Quality 11 costs
 * roughly 1 MB/s per core; the handful of multi-megabyte chunks in the output
 * would otherwise dominate the build with a few percent of extra savings.
 */
const HIGH_QUALITY_BROTLI_LIMIT_BYTES = 2 * 1024 * 1024;

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

    const brotliQuality =
      contents.length > HIGH_QUALITY_BROTLI_LIMIT_BYTES ? 9 : 11;

    const [brotliContents, gzipContents] = await Promise.all([
      compressBrotli(contents, {
        params: {
          [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
          [constants.BROTLI_PARAM_QUALITY]: brotliQuality,
          [constants.BROTLI_PARAM_SIZE_HINT]: contents.length,
        },
      }),
      compressGzip(contents, { level: 9 }),
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
    availableParallelism(),
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
