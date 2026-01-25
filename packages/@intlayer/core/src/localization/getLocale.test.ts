import { Locales } from '@intlayer/types';
import { describe, expect, it, vi } from 'vitest';
import { getLocale } from './getLocale';

vi.mock('@intlayer/config/built', () => ({
  default: {
    internationalization: {
      locales: [Locales.ENGLISH, Locales.FRENCH],
      defaultLocale: Locales.ENGLISH,
    },
    routing: {
      storage: ['cookie'],
    },
  },
}));

describe('getLocale', () => {
  it('should return locale from cookie if present', async () => {
    const ctx = {
      getCookie: vi.fn((name: string) =>
        name === 'INTLAYER_LOCALE' ? Locales.FRENCH : undefined
      ),
      getHeader: vi.fn(),
    };

    const locale = await getLocale(ctx);
    expect(locale).toBe(Locales.FRENCH);
  });

  it('should return locale from accept-language header if no cookie', async () => {
    const ctx = {
      getCookie: vi.fn(),
      getHeader: vi.fn((name: string) =>
        name === 'accept-language' ? 'fr-FR,fr;q=0.9,en;q=0.8' : undefined
      ),
    };

    const locale = await getLocale(ctx);
    expect(locale).toBe(Locales.FRENCH);
  });

  it('should return default locale if no cookie and no accept-language header', async () => {
    const ctx = {
      getCookie: vi.fn(),
      getHeader: vi.fn(),
    };

    const locale = await getLocale(ctx);
    expect(locale).toBe(Locales.ENGLISH);
  });

  it('should return default locale if ctx is empty', async () => {
    const locale = await getLocale();
    expect(locale).toBe(Locales.ENGLISH);
  });
});
