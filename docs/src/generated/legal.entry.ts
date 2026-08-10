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
  const target1 = join(baseDir, `./legal/${locale}/${relativeAfterLocale}`);
  if (existsSync(target1)) {
    return await readFile(target1, 'utf8');
  }
  const target2 = join(baseDir, `./legal/en/${relativeAfterLocale}`);
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

export const legalEntry = {
  './legal/en/privacy_notice.md': {
    en: readLocale('privacy_notice.md', 'en'),
    es: readLocale('privacy_notice.md', 'es'),
    ru: readLocale('privacy_notice.md', 'ru'),
    ja: readLocale('privacy_notice.md', 'ja'),
    fr: readLocale('privacy_notice.md', 'fr'),
    ko: readLocale('privacy_notice.md', 'ko'),
    zh: readLocale('privacy_notice.md', 'zh'),
    de: readLocale('privacy_notice.md', 'de'),
    ar: readLocale('privacy_notice.md', 'ar'),
    it: readLocale('privacy_notice.md', 'it'),
    'en-GB': readLocale('privacy_notice.md', 'en-GB'),
    pt: readLocale('privacy_notice.md', 'pt'),
    hi: readLocale('privacy_notice.md', 'hi'),
    tr: readLocale('privacy_notice.md', 'tr'),
    pl: readLocale('privacy_notice.md', 'pl'),
    id: readLocale('privacy_notice.md', 'id'),
    vi: readLocale('privacy_notice.md', 'vi'),
    uk: readLocale('privacy_notice.md', 'uk'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './legal/en/terms_of_service.md': {
    en: readLocale('terms_of_service.md', 'en'),
    es: readLocale('terms_of_service.md', 'es'),
    ru: readLocale('terms_of_service.md', 'ru'),
    ja: readLocale('terms_of_service.md', 'ja'),
    fr: readLocale('terms_of_service.md', 'fr'),
    ko: readLocale('terms_of_service.md', 'ko'),
    zh: readLocale('terms_of_service.md', 'zh'),
    de: readLocale('terms_of_service.md', 'de'),
    ar: readLocale('terms_of_service.md', 'ar'),
    it: readLocale('terms_of_service.md', 'it'),
    'en-GB': readLocale('terms_of_service.md', 'en-GB'),
    pt: readLocale('terms_of_service.md', 'pt'),
    hi: readLocale('terms_of_service.md', 'hi'),
    tr: readLocale('terms_of_service.md', 'tr'),
    pl: readLocale('terms_of_service.md', 'pl'),
    id: readLocale('terms_of_service.md', 'id'),
    vi: readLocale('terms_of_service.md', 'vi'),
    uk: readLocale('terms_of_service.md', 'uk'),
  } as unknown as Record<LocalesValues, Promise<string>>,
} as const;
