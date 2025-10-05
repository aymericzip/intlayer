/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { LocalesValues } from '@intlayer/config';

const isESModule = typeof import.meta.url === 'string';
const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

const readLocale = (
  relativeAfterLocale: string,
  locale: LocalesValues
): Promise<string> => {
  const target = join(dir, `../../../legal/${locale}/${relativeAfterLocale}`);
  if (!existsSync(target)) {
    console.error(`File not found: ${target}`);
    return readFile(
      join(dir, `../../../legal/en/${relativeAfterLocale}`),
      'utf8'
    );
  }
  return readFile(target, 'utf8');
};

export const legalEntry = {
  './legal/en/privacy_notice.md': {
    en: readLocale('privacy_notice.md', 'en'),
    fr: readLocale('privacy_notice.md', 'fr'),
    ru: readLocale('privacy_notice.md', 'ru'),
    ja: readLocale('privacy_notice.md', 'ja'),
    ko: readLocale('privacy_notice.md', 'ko'),
    zh: readLocale('privacy_notice.md', 'zh'),
    es: readLocale('privacy_notice.md', 'es'),
    de: readLocale('privacy_notice.md', 'de'),
    ar: readLocale('privacy_notice.md', 'ar'),
    pt: readLocale('privacy_notice.md', 'pt'),
    'en-GB': readLocale('privacy_notice.md', 'en-GB'),
    it: readLocale('privacy_notice.md', 'it'),
    hi: readLocale('privacy_notice.md', 'hi'),
    tr: readLocale('privacy_notice.md', 'tr'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './legal/en/terms_of_service.md': {
    en: readLocale('terms_of_service.md', 'en'),
    fr: readLocale('terms_of_service.md', 'fr'),
    ru: readLocale('terms_of_service.md', 'ru'),
    ja: readLocale('terms_of_service.md', 'ja'),
    ko: readLocale('terms_of_service.md', 'ko'),
    zh: readLocale('terms_of_service.md', 'zh'),
    es: readLocale('terms_of_service.md', 'es'),
    de: readLocale('terms_of_service.md', 'de'),
    ar: readLocale('terms_of_service.md', 'ar'),
    pt: readLocale('terms_of_service.md', 'pt'),
    'en-GB': readLocale('terms_of_service.md', 'en-GB'),
    it: readLocale('terms_of_service.md', 'it'),
    hi: readLocale('terms_of_service.md', 'hi'),
    tr: readLocale('terms_of_service.md', 'tr'),
  } as unknown as Record<LocalesValues, Promise<string>>,
} as const;
