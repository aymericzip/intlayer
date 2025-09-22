/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import type { LocalesValues } from '@intlayer/config';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const isESModule = typeof import.meta.url === 'string';
const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

export const legalEntry = {
  './legal/en/privacy_notice.md': {
    en: (() => {
      const target = join(dir, '../../../legal/en/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../legal/fr/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../legal/ru/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../legal/ja/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../legal/ko/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../legal/zh/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../legal/es/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../legal/de/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../legal/ar/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../legal/pt/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../legal/en-GB/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../legal/it/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../legal/hi/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../legal/tr/privacy_notice.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/privacy_notice.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './legal/en/terms_of_service.md': {
    en: (() => {
      const target = join(dir, '../../../legal/en/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../legal/fr/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../legal/ru/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../legal/ja/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../legal/ko/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../legal/zh/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../legal/es/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../legal/de/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../legal/ar/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../legal/pt/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../legal/en-GB/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../legal/it/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../legal/hi/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../legal/tr/terms_of_service.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../legal/en/terms_of_service.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
} as const;
