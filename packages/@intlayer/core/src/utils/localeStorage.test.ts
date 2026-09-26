// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/config/built', () => {
  const config = {
    internationalization: { locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
    routing: {
      storage: {
        cookies: [{ name: 'INTLAYER_LOCALE', attributes: {} }],
        localStorage: [],
        sessionStorage: [],
      },
    },
  };
  return { ...config, default: config };
});

import {
  getCachedLocaleFromStorageClient,
  localeStorageOptions,
  setLocaleInStorageClient,
} from './localeStorage';

describe('getCachedLocaleFromStorageClient', () => {
  it('reads storage once, until intlayer writes a new locale', () => {
    // biome-ignore lint/suspicious/noDocumentCookie: seeds the stored locale
    document.cookie = 'INTLAYER_LOCALE=fr';
    expect(getCachedLocaleFromStorageClient()).toBe('fr');

    // A write outside intlayer is not seen: the read is cached
    // biome-ignore lint/suspicious/noDocumentCookie: external write
    document.cookie = 'INTLAYER_LOCALE=en';
    expect(getCachedLocaleFromStorageClient()).toBe('fr');

    setLocaleInStorageClient('es', localeStorageOptions);
    expect(getCachedLocaleFromStorageClient()).toBe('es');
  });
});
