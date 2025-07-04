/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { readFile } from 'fs/promises';
import { LocalesValues } from 'intlayer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const isESModule = typeof import.meta.url === 'string';
const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

export const legalEntry = {
  './legal/en/privacy_notice.md': {
    en: Promise.resolve(
      readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
    ),
    fr: Promise.resolve(
      readFile(join(dir, '../../../legal/fr/privacy_notice.md'), 'utf8')
    ),
    ru: Promise.resolve(
      readFile(join(dir, '../../../legal/ru/privacy_notice.md'), 'utf8')
    ),
    ja: Promise.resolve(
      readFile(join(dir, '../../../legal/ja/privacy_notice.md'), 'utf8')
    ),
    ko: Promise.resolve(
      readFile(join(dir, '../../../legal/ko/privacy_notice.md'), 'utf8')
    ),
    zh: Promise.resolve(
      readFile(join(dir, '../../../legal/zh/privacy_notice.md'), 'utf8')
    ),
    es: Promise.resolve(
      readFile(join(dir, '../../../legal/es/privacy_notice.md'), 'utf8')
    ),
    de: Promise.resolve(
      readFile(join(dir, '../../../legal/de/privacy_notice.md'), 'utf8')
    ),
    ar: Promise.resolve(
      readFile(join(dir, '../../../legal/ar/privacy_notice.md'), 'utf8')
    ),
    pt: Promise.resolve(
      readFile(join(dir, '../../../legal/pt/privacy_notice.md'), 'utf8')
    ),
    'en-GB': Promise.resolve(
      readFile(join(dir, '../../../legal/en-GB/privacy_notice.md'), 'utf8')
    ),
    it: Promise.resolve(
      readFile(join(dir, '../../../legal/it/privacy_notice.md'), 'utf8')
    ),
    hi: Promise.resolve(
      readFile(join(dir, '../../../legal/hi/privacy_notice.md'), 'utf8')
    ),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './legal/en/terms_of_service.md': {
    en: Promise.resolve(
      readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
    ),
    fr: Promise.resolve(
      readFile(join(dir, '../../../legal/fr/terms_of_service.md'), 'utf8')
    ),
    ru: Promise.resolve(
      readFile(join(dir, '../../../legal/ru/terms_of_service.md'), 'utf8')
    ),
    ja: Promise.resolve(
      readFile(join(dir, '../../../legal/ja/terms_of_service.md'), 'utf8')
    ),
    ko: Promise.resolve(
      readFile(join(dir, '../../../legal/ko/terms_of_service.md'), 'utf8')
    ),
    zh: Promise.resolve(
      readFile(join(dir, '../../../legal/zh/terms_of_service.md'), 'utf8')
    ),
    es: Promise.resolve(
      readFile(join(dir, '../../../legal/es/terms_of_service.md'), 'utf8')
    ),
    de: Promise.resolve(
      readFile(join(dir, '../../../legal/de/terms_of_service.md'), 'utf8')
    ),
    ar: Promise.resolve(
      readFile(join(dir, '../../../legal/ar/terms_of_service.md'), 'utf8')
    ),
    pt: Promise.resolve(
      readFile(join(dir, '../../../legal/pt/terms_of_service.md'), 'utf8')
    ),
    'en-GB': Promise.resolve(
      readFile(join(dir, '../../../legal/en-GB/terms_of_service.md'), 'utf8')
    ),
    it: Promise.resolve(
      readFile(join(dir, '../../../legal/it/terms_of_service.md'), 'utf8')
    ),
    hi: Promise.resolve(
      readFile(join(dir, '../../../legal/hi/terms_of_service.md'), 'utf8')
    ),
  } as unknown as Record<LocalesValues, Promise<string>>,
} as const;
