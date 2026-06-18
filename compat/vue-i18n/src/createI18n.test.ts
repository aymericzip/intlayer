import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

const mockLocale = ref('en');
const mockSetLocale = vi.fn((val) => {
  mockLocale.value = val;
});

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr'] },
}));

vi.mock('@intlayer/config/built', () => ({
  ...mockConfig,
  default: mockConfig,
  internationalization: mockConfig.internationalization,
  system: {},
}));

vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: vi.fn(() => ({
    translation: { key: 'translation' },
    home: { key: 'home' },
  })),
}));

vi.mock('vue-intlayer', () => ({
  useLocale: () => ({
    locale: mockLocale,
    setLocale: mockSetLocale,
    availableLocales: ['en', 'fr'],
  }),
  createIntlayerClient: () => ({
    locale: mockLocale,
    setLocale: mockSetLocale,
  }),
  installIntlayer: vi.fn(),
}));

vi.mock('@intlayer/core/interpreter', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@intlayer/core/interpreter')>()),
  getIntlayer: vi.fn((_ns: string, _lang: string) => ({
    greeting: 'Hello, world!',
    farewell: 'Goodbye!',
    welcome: 'Welcome {name}!',
    apples: 'no apples | one apple | {count} apples',
    car: 'car | cars',
    ranking: 'You are {0} of {1}',
  })),
}));

import { createI18n, useI18n } from './createI18n';

describe('vue-i18n compatibility layer', () => {
  it('should support createI18n options and expose global helper', () => {
    const i18n = createI18n({
      locale: 'en',
    });

    expect(i18n.global).toBeDefined();
    expect((i18n.global.locale as unknown as { value: string }).value).toBe(
      'en'
    );
    expect(i18n.mode).toBe('composition');
    expect(typeof i18n.install).toBe('function');
  });

  it('should translate keys correctly via global.t()', () => {
    const i18n = createI18n({
      locale: 'en',
    });

    expect(i18n.global.t('greeting')).toBe('Hello, world!');
  });

  it('should switch locale through the writable global.locale ref', () => {
    mockLocale.value = 'en';
    const i18n = createI18n({ locale: 'en' });

    (i18n.global.locale as unknown as { value: string }).value = 'fr';
    expect(mockSetLocale).toHaveBeenCalledWith('fr');
    mockLocale.value = 'en';
  });

  it('should expose availableLocales from the intlayer config', () => {
    const i18n = createI18n({ locale: 'en' });
    expect(i18n.global.availableLocales).toEqual(['en', 'fr']);
  });

  it('should support useI18n composable and its reactive features', () => {
    mockLocale.value = 'en';
    const { locale, t } = useI18n();
    expect(locale.value).toBe('en');
    expect(t('greeting')).toBe('Hello, world!');

    // Change locale
    locale.value = 'fr';
    expect(mockSetLocale).toHaveBeenCalledWith('fr');
    mockLocale.value = 'en';
  });

  it('should interpolate named params', () => {
    const { t } = useI18n();
    expect(t('welcome', { name: 'John' })).toBe('Welcome John!');
  });

  it('should interpolate list params', () => {
    const { t } = useI18n();
    expect(t('ranking', [3, 10])).toBe('You are 3 of 10');
  });

  it('should resolve pipe choice messages with the vue rule', () => {
    const { t } = useI18n();
    expect(t('apples', 0)).toBe('no apples');
    expect(t('apples', 1)).toBe('one apple');
    expect(t('apples', 5)).toBe('5 apples');

    expect(t('car', 1)).toBe('car');
    expect(t('car', 0)).toBe('cars');
    expect(t('car', 3)).toBe('cars');
  });

  it('should expose te/tm/rt', () => {
    const { te, tm, rt } = useI18n();
    expect(te('greeting')).toBe(true);
    expect(te('missing')).toBe(false);
    expect(tm('greeting')).toBe('Hello, world!');
    expect(rt('hi {name}', { name: 'Ana' })).toBe('hi Ana');
  });

  it('should format numbers and dates with Intl', () => {
    const { n, d } = useI18n();
    expect(n(1234.5)).toBe('1,234.5');
    expect(n(0.5, { style: 'percent' } as Intl.NumberFormatOptions)).toBe(
      '50%'
    );
    expect(typeof d(new Date('2026-01-15'), { dateStyle: 'medium' })).toBe(
      'string'
    );
  });
});
