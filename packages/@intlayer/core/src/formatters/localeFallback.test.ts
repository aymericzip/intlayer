// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/config/built', () => {
  const config = {
    internationalization: { locales: ['en', 'fr', 'de'], defaultLocale: 'en' },
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

import { registerAmbientLocaleResolver } from '../interpreter/resolveInterpreterLocale';
import { bindIntl } from '../utils/intl';
import { setLocaleInStorageClient } from '../utils/localeStorage';
import { compact } from './compact';
import { currency } from './currency';
import { date } from './date';
import { list } from './list';
import { number } from './number';
import { percentage } from './percentage';
import { relativeTime } from './relativeTime';
import { units } from './units';

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

const sampleDate = new Date('2025-08-02T14:30:00Z');

describe('formatters locale fallback', () => {
  afterEach(() => {
    storeLocale('en');
  });

  it('formats in the stored locale when no locale is given', () => {
    storeLocale('fr');

    expect(number(1234.5)).toBe(new Intl.NumberFormat('fr').format(1234.5));
    expect(currency(1234.5, { currency: 'EUR' })).toBe(
      new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'EUR',
      }).format(1234.5)
    );
    expect(percentage(0.25)).toBe(
      new Intl.NumberFormat('fr', { style: 'percent' }).format(0.25)
    );
    expect(compact(1200)).toBe(
      new Intl.NumberFormat('fr', { notation: 'compact' }).format(1200)
    );
    expect(units(5, { unit: 'kilometer', unitDisplay: 'long' })).toBe(
      new Intl.NumberFormat('fr', {
        style: 'unit',
        unit: 'kilometer',
        unitDisplay: 'long',
      }).format(5)
    );
    expect(list(['a', 'b', 'c'])).toBe('a, b et c');
    expect(date(sampleDate, 'dateOnly')).toBe(
      new Intl.DateTimeFormat('fr', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(sampleDate)
    );
    expect(
      relativeTime(sampleDate, new Date('2025-08-02T16:30:00Z'), {
        unit: 'hour',
      })
    ).toBe(new Intl.RelativeTimeFormat('fr').format(2, 'hour'));
  });

  it('keeps the locale given by the call site', () => {
    storeLocale('fr');

    expect(list(['a', 'b'], { locale: 'de' })).toBe('a und b');
    expect(number(1234.5, { locale: 'en' })).toBe('1,234.5');
  });

  it('prefers the ambient locale over the stored one', () => {
    storeLocale('fr');
    const unregister = registerAmbientLocaleResolver(() => 'de');

    try {
      expect(list(['a', 'b'])).toBe('a und b');
    } finally {
      unregister();
    }
  });

  it('binds Intl to the stored locale when no locale is given', () => {
    storeLocale('fr');

    expect(new (bindIntl().ListFormat)().format(['a', 'b'])).toBe('a et b');
  });
});
