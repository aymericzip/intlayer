/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, dirname as pathDirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPackageJsonPath, getProjectRequire } from '@intlayer/config/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

// Robustly resolve the base directory of the @intlayer/docs package in both
// bundled environments (Next.js) and standalone CLIs (MCP via npx).
const currentDir =
  typeof __dirname !== 'undefined'
    ? __dirname
    : pathDirname(fileURLToPath(import.meta.url));

let baseDir: string;
try {
  // Prefer resolving from the location of this file (works for CLIs).
  const projectRequire = getProjectRequire(currentDir);
  const docEntryPath = projectRequire.resolve('@intlayer/docs');
  baseDir = getPackageJsonPath(docEntryPath).baseDir;
} catch {
  try {
    // Fallback: resolve from the consumer project (works for apps/bundlers).
    const projectRequire = getProjectRequire();
    const docEntryPath = projectRequire.resolve('@intlayer/docs');
    baseDir = getPackageJsonPath(docEntryPath).baseDir;
  } catch {
    // Last resort: walk up from currentDir (useful when executed inside @intlayer/docs).
    baseDir = getPackageJsonPath(currentDir).baseDir;
  }
}

/**
 * Reads a document, preferring the requested locale and falling back to English.
 */
const readLocaleFile = async (
  relativeAfterLocale: string,
  locale: LocalesValues
): Promise<string> => {
  const target1 = join(baseDir, `./blog/${locale}/${relativeAfterLocale}`);
  if (existsSync(target1)) {
    return await readFile(target1, 'utf8');
  }
  const target2 = join(baseDir, `./blog/en/${relativeAfterLocale}`);
  if (existsSync(target2)) {
    return await readFile(target2, 'utf8');
  }

  throw new Error(
    `[docs] File not found: ${relativeAfterLocale} - locale: ${locale} - path: ${target1} - path: ${target2}`
  );
};

/**
 * Builds a lazy, awaitable handle over a document.
 *
 * The entry map below holds one handle per document *per locale*, so reading
 * eagerly would pull every markdown file of every locale into memory as soon as
 * this module is imported — hundreds of megabytes, duplicated in every
 * prerender worker, for the handful of documents a page actually renders.
 *
 * The returned value is a thenable rather than a promise: consumers only ever
 * `await` it, and `await` triggers `then`, so the file is read on first use and
 * the resulting promise is cached for subsequent reads.
 */
const readLocale = (
  relativeAfterLocale: string,
  locale: LocalesValues
): Promise<string> => {
  let pendingRead: Promise<string> | undefined;

  const read = (): Promise<string> => {
    pendingRead ??= readLocaleFile(relativeAfterLocale, locale);
    return pendingRead;
  };

  return {
    // biome-ignore lint/suspicious/noThenProperty: the thenable is intentional — `await` is what triggers the lazy read.
    then: (onFulfilled, onRejected) => read().then(onFulfilled, onRejected),
    catch: (onRejected) => read().catch(onRejected),
    finally: (onFinally) => read().finally(onFinally),
  } as Promise<string>;
};

export const blogEntry = {} as const;
