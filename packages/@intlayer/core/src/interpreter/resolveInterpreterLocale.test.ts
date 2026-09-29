// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

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

import type { Dictionary } from '@intlayer/types/dictionary';
import { setLocaleInStorageClient } from '../utils/localeStorage';
import { getDictionary } from './getDictionary';
import {
  registerAmbientLocaleResolver,
  registerAsyncAmbientLocaleResolver,
  resolveInterpreterLocale,
  resolveInterpreterLocaleAsync,
} from './resolveInterpreterLocale';

/** Persists `locale` in the cookie and invalidates the cached storage read. */
const storeLocale = (locale: string) =>
  setLocaleInStorageClient(locale, {
    setCookieString: (name) => {
      // biome-ignore lint/suspicious/noDocumentCookie: seeds the stored locale
      document.cookie = `${name}=${locale}`;
    },
    setCookieStore: () => {
      // Forces the `setCookieString` fallback, jsdom has no `cookieStore`
      throw new Error('cookieStore is unavailable');
    },
  });

describe('resolveInterpreterLocale', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    storeLocale('en');
  });

  it('keeps the locale given by the call site', () => {
    storeLocale('fr');

    expect(resolveInterpreterLocale('es')).toBe('es');
  });

  it('falls back to the locale stored in the browser', () => {
    storeLocale('fr');

    expect(resolveInterpreterLocale()).toBe('fr');
  });

  it('prefers the ambient locale over the stored one', () => {
    storeLocale('fr');
    const unregister = registerAmbientLocaleResolver(() => 'es');

    try {
      expect(resolveInterpreterLocale()).toBe('es');
    } finally {
      unregister();
    }

    expect(resolveInterpreterLocale()).toBe('fr');
  });

  it('skips ambient resolvers that answer nothing or throw', () => {
    storeLocale('fr');
    const unregisterEmpty = registerAmbientLocaleResolver(() => undefined);
    const unregisterThrowing = registerAmbientLocaleResolver(() => {
      throw new Error('outside of a request');
    });

    try {
      expect(resolveInterpreterLocale()).toBe('fr');
    } finally {
      unregisterEmpty();
      unregisterThrowing();
    }
  });

  it('never reads browser storage off-browser', () => {
    storeLocale('fr');
    vi.stubGlobal('window', undefined);

    expect(resolveInterpreterLocale()).toBe('en');
  });
});

describe('getDictionary without a locale', () => {
  const dictionary = {
    key: 'resolve-interpreter-locale-test',
    content: {
      title: {
        nodeType: 'translation',
        translation: { en: 'Hello', fr: 'Bonjour', es: 'Hola' },
      },
    },
  } as unknown as Dictionary;

  afterEach(() => storeLocale('en'));

  it('reads the dictionary in the stored locale', () => {
    storeLocale('fr');

    expect(getDictionary(dictionary).title).toBe('Bonjour');
  });

  it('follows a locale switch', () => {
    storeLocale('fr');
    expect(getDictionary(dictionary).title).toBe('Bonjour');

    storeLocale('es');
    expect(getDictionary(dictionary).title).toBe('Hola');
  });
});

describe('resolveInterpreterLocaleAsync', () => {
  afterEach(() => storeLocale('en'));

  it('awaits the async resolvers before browser storage', async () => {
    storeLocale('fr');
    const unregister = registerAsyncAmbientLocaleResolver(async () => 'es');

    try {
      await expect(resolveInterpreterLocaleAsync()).resolves.toBe('es');
      // The synchronous read never awaits
      expect(resolveInterpreterLocale()).toBe('fr');
    } finally {
      unregister();
    }
  });

  it('keeps the call site and synchronous resolvers first', async () => {
    const unregisterAsync = registerAsyncAmbientLocaleResolver(
      async () => 'es'
    );
    const unregisterSync = registerAmbientLocaleResolver(() => 'fr');

    try {
      await expect(resolveInterpreterLocaleAsync('en')).resolves.toBe('en');
      await expect(resolveInterpreterLocaleAsync()).resolves.toBe('fr');
    } finally {
      unregisterAsync();
      unregisterSync();
    }
  });

  it('propagates async resolver errors', async () => {
    const unregister = registerAsyncAmbientLocaleResolver(async () => {
      throw new Error('dynamic usage');
    });

    try {
      await expect(resolveInterpreterLocaleAsync()).rejects.toThrow(
        'dynamic usage'
      );
    } finally {
      unregister();
    }
  });
});
