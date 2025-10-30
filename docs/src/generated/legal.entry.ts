/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, dirname as pathDirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPackageJsonPath, getProjectRequire } from '@intlayer/config';
import type { LocalesValues } from '@intlayer/types';

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

const readLocale = (
  relativeAfterLocale: string,
  locale: LocalesValues
): Promise<string> => {
  const target1 = join(baseDir, `./legal/${locale}/${relativeAfterLocale}`);
  if (existsSync(target1)) {
    return readFile(target1, 'utf8');
  }
  const target2 = join(baseDir, `./legal/en/${relativeAfterLocale}`);
  if (existsSync(target2)) {
    return readFile(target2, 'utf8');
  }

  return Promise.reject(
    new Error(
      `[docs] File not found: ${relativeAfterLocale} - locale: ${locale} - path: ${target1} - path: ${target2}`
    )
  );
};

export const legalEntry = {
  './legal/en/privacy_notice.md': {
    en: readLocale('privacy_notice.md', 'en'),
    ru: readLocale('privacy_notice.md', 'ru'),
    ja: readLocale('privacy_notice.md', 'ja'),
    fr: readLocale('privacy_notice.md', 'fr'),
    ko: readLocale('privacy_notice.md', 'ko'),
    zh: readLocale('privacy_notice.md', 'zh'),
    es: readLocale('privacy_notice.md', 'es'),
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
  } as unknown as Record<LocalesValues, Promise<string>>,
  './legal/en/terms_of_service.md': {
    en: readLocale('terms_of_service.md', 'en'),
    ru: readLocale('terms_of_service.md', 'ru'),
    ja: readLocale('terms_of_service.md', 'ja'),
    fr: readLocale('terms_of_service.md', 'fr'),
    ko: readLocale('terms_of_service.md', 'ko'),
    zh: readLocale('terms_of_service.md', 'zh'),
    es: readLocale('terms_of_service.md', 'es'),
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
  } as unknown as Record<LocalesValues, Promise<string>>,
} as const;
