import { renderHook } from '@testing-library/react';
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
  getLocaleInStorage,
  setLocaleInStorage,
  useLocaleStorage,
} from './useLocaleStorage';

describe('getLocaleInStorage', () => {
  it('reads the stored locale, and sees every write made through intlayer', () => {
    // biome-ignore lint/suspicious/noDocumentCookie: seeds the stored locale
    document.cookie = 'INTLAYER_LOCALE=fr';

    expect(getLocaleInStorage()).toBe('fr');

    setLocaleInStorage('es');
    expect(getLocaleInStorage()).toBe('es');

    const { result } = renderHook(() => useLocaleStorage());

    result.current.setLocale('fr');
    expect(getLocaleInStorage()).toBe('fr');
  });
});
