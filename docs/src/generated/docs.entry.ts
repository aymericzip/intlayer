/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import type { LocalesValues } from '@intlayer/config';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const isESModule = typeof import.meta.url === 'string';
const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

export const docsEntry = {
  './docs/en/CI_CD.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/CI_CD.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/CI_CD.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/autoFill.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/autoFill.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/autoFill.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/configuration.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/configuration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/configuration.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/condition.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/dictionary/condition.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/condition.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/content_file.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/dictionary/content_file.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/dictionary/content_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/content_file.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/enumeration.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/dictionary/enumeration.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/enumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/file.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/dictionary/file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/function_fetching.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/dictionary/function_fetching.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/function_fetching.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/gender.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/dictionary/gender.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/gender.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/insertion.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/dictionary/insertion.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/insertion.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/markdown.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/dictionary/markdown.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/markdown.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/nesting.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/dictionary/nesting.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/dictionary/nesting.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/dictionary/translation.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/dictionary/translation.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/dictionary/translation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/formatters.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/formatters.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/formatters.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/how_works_intlayer.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/how_works_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/how_works_intlayer.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/index.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/index.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/interest_of_intlayer.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/interest_of_intlayer.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/interest_of_intlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_CMS.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_CMS.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_CMS.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_cli.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_cli.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_cli.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_visual_editor.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_visual_editor.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_visual_editor.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_angular.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_angular.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_angular.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_create_react_app.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/intlayer_with_create_react_app.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_create_react_app.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_express.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_express.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_express.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_lynx+react.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_lynx+react.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_lynx+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_lynx+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_nestjs.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_nestjs.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nestjs.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_nextjs_14.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_nextjs_14.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_nextjs_14.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_14.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_nextjs_15.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_nextjs_15.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_nextjs_15.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_15.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_nextjs_page_router.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/intlayer_with_nextjs_page_router.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_nextjs_page_router.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_nuxt.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_nuxt.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/intlayer_with_nuxt.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_react_native+expo.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/intlayer_with_react_native+expo.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_native+expo.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_react_router_v7.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/intlayer_with_react_router_v7.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_react_router_v7.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_tanstack.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_tanstack.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_tanstack.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_vite+preact.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_vite+preact.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_vite+preact.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+preact.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_vite+react.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_vite+react.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_vite+react.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+react.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_vite+solid.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_vite+solid.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_vite+solid.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+solid.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_vite+svelte.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/intlayer_with_vite+svelte.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_vite+svelte.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+svelte.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/intlayer_with_vite+vue.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/intlayer_with_vite+vue.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/intlayer_with_vite+vue.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/introduction.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/introduction.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/introduction.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/locale_mapper.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/locale_mapper.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/locale_mapper.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/mcp_server.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/mcp_server.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/mcp_server.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/api/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/@intlayer/api/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/api/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/chokidar/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/@intlayer/chokidar/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/chokidar/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/cli/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/@intlayer/cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/config/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/@intlayer/config/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/config/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/core/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/@intlayer/core/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/core/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/design-system/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/@intlayer/design-system/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/design-system/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/dictionary-entry/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/@intlayer/dictionary-entry/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/dictionary-entry/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/editor-react/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/@intlayer/editor-react/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/@intlayer/editor-react/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/editor/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/@intlayer/editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/@intlayer/webpack/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/@intlayer/webpack/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/@intlayer/webpack/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/angular-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/angular-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/angular-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/express-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/express-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/express-intlayer/t.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/express-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/express-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer-cli/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer-cli/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-cli/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer-editor/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer-editor/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer-editor/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getConfiguration.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer/getConfiguration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getConfiguration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getEnumeration.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer/getEnumeration.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getEnumeration.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getHTMLTextDir.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer/getHTMLTextDir.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getHTMLTextDir.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getLocaleLang.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer/getLocaleLang.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleLang.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getLocaleName.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer/getLocaleName.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocaleName.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getLocalizedUrl.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer/getLocalizedUrl.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getLocalizedUrl.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getMultilingualUrls.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer/getMultilingualUrls.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getMultilingualUrls.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getPathWithoutLocale.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer/getPathWithoutLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getPathWithoutLocale.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getTranslation.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer/getTranslation.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/getTranslation.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/getTranslationContent.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/intlayer/getTranslationContent.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/intlayer/getTranslationContent.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/intlayer/index.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/packages/intlayer/index.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/lynx-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/lynx-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/lynx-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/next-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/t.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/next-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/packages/next-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/useDictionary.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/next-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/next-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/useIntlayer.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/next-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useIntlayer.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/next-intlayer/useLocale.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/next-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/next-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/nuxt-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/nuxt-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/nuxt-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/preact-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/preact-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/preact-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/react-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/t.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/react-intlayer/t.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/packages/react-intlayer/t.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/t.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/useDictionary.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/react-intlayer/useDictionary.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useDictionary.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/useI18n.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/react-intlayer/useI18n.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useI18n.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/useIntlayer.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/react-intlayer/useIntlayer.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-intlayer/useIntlayer.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-intlayer/useLocale.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/react-intlayer/useLocale.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/react-intlayer/useLocale.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-native-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/react-native-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-native-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/react-scripts-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/react-scripts-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(
              dir,
              '../../../docs/en/packages/react-scripts-intlayer/index.md'
            ),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/solid-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/solid-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/solid-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/svelte-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/svelte-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/svelte-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/vite-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/vite-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vite-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/packages/vue-intlayer/index.md': {
    en: (() => {
      const target = join(
        dir,
        '../../../docs/en/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(
        dir,
        '../../../docs/fr/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(
        dir,
        '../../../docs/ru/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(
        dir,
        '../../../docs/ja/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(
        dir,
        '../../../docs/ko/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(
        dir,
        '../../../docs/zh/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(
        dir,
        '../../../docs/es/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(
        dir,
        '../../../docs/de/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(
        dir,
        '../../../docs/ar/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(
        dir,
        '../../../docs/pt/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(
        dir,
        '../../../docs/en-GB/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(
        dir,
        '../../../docs/it/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(
        dir,
        '../../../docs/hi/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(
        dir,
        '../../../docs/tr/packages/vue-intlayer/index.md'
      );
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(
            join(dir, '../../../docs/en/packages/vue-intlayer/index.md'),
            'utf8'
          )
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/per_locale_file.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/per_locale_file.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/per_locale_file.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/readme.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/readme.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/readme.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/releases/v6.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/releases/v6.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/releases/v6.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/roadmap.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/roadmap.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/roadmap.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/testing.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/testing.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/testing.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './docs/en/vs_code_extension.md': {
    en: (() => {
      const target = join(dir, '../../../docs/en/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    fr: (() => {
      const target = join(dir, '../../../docs/fr/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ru: (() => {
      const target = join(dir, '../../../docs/ru/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ja: (() => {
      const target = join(dir, '../../../docs/ja/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ko: (() => {
      const target = join(dir, '../../../docs/ko/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    zh: (() => {
      const target = join(dir, '../../../docs/zh/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    es: (() => {
      const target = join(dir, '../../../docs/es/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    de: (() => {
      const target = join(dir, '../../../docs/de/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    ar: (() => {
      const target = join(dir, '../../../docs/ar/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    pt: (() => {
      const target = join(dir, '../../../docs/pt/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    'en-GB': (() => {
      const target = join(dir, '../../../docs/en-GB/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    it: (() => {
      const target = join(dir, '../../../docs/it/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    hi: (() => {
      const target = join(dir, '../../../docs/hi/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
    tr: (() => {
      const target = join(dir, '../../../docs/tr/vs_code_extension.md');
      if (!existsSync(target)) {
        console.error('File not found: ' + target);
        return Promise.resolve(
          readFile(join(dir, '../../../docs/en/vs_code_extension.md'), 'utf8')
        );
      }
      return Promise.resolve(readFile(target, 'utf8'));
    })(),
  } as unknown as Record<LocalesValues, Promise<string>>,
} as const;
