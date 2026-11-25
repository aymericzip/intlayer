// @vitest-environment node
import * as upstream from 'next-i18next';
import type { I18nConfig } from 'next-i18next';
import { describe, expect, it } from 'vitest';
import { getInternalPath } from './getInternalPath';
import { getLocalizedPath } from './getLocalizedPath';

const pathnames = {
  '/contact': { de: '/kontakt', en: '/contact' },
  '/blog/[slug]': { de: '/artikel/[slug]' },
  '/docs/[...path]': { de: '/hilfe/[...path]' },
  '/about': { de: '/über-uns' },
};
const configurations: I18nConfig[] = [
  {},
  { supportedLngs: ['en', 'de'], pathnames },
  { supportedLngs: ['en', 'de'], pathnames, basePath: '/app/' },
  { supportedLngs: ['en', 'de'], pathnames, hideDefaultLocale: true },
  { supportedLngs: ['en', 'de'], pathnames, localeInPath: false },
  { supportedLngs: ['en', 'de'], pathnames, localeInPath: 'internal' },
  {
    i18n: { locales: ['default', 'en', 'de'], defaultLocale: 'en' },
    pathnames,
  },
];

describe.each(configurations)(
  'pathname parity with configuration %j',
  (configuration) => {
    it.each([
      '/',
      '/contact',
      '/blog/hello',
      '/docs/a/b',
      '/about',
      '/unknown',
    ])('localizes %s like upstream', (path) => {
      for (const language of ['en', 'de']) {
        expect(getLocalizedPath(path, language, configuration)).toBe(
          upstream.getLocalizedPath(path, language, configuration)
        );
      }
    });
    it.each([
      '/',
      '/contact',
      '/de/kontakt',
      '/DE/artikel/hello/',
      '/de/hilfe/a/b',
      '/de/%C3%BCber-uns/',
      '/de/%invalid',
      '/app/de/kontakt',
      '/application/contact',
    ])('resolves %s like upstream', (path) => {
      expect(getInternalPath(path, configuration)).toEqual(
        upstream.getInternalPath(path, configuration)
      );
    });
  }
);
