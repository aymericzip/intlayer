import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

const mockLocale = ref('en');
const mockSetLocale = vi.fn((val) => {
  mockLocale.value = val;
});

vi.mock('vue-intlayer', () => ({
  useLocale: () => ({
    locale: mockLocale,
    setLocale: mockSetLocale,
    availableLocales: ['en', 'fr'],
  }),
  installIntlayer: vi.fn(),
}));

vi.mock('@intlayer/core/interpreter', () => ({
  getIntlayer: vi.fn((_ns: string, _lang: string) => ({
    greeting: 'Hello, world!',
    farewell: 'Goodbye!',
  })),
}));

import { createI18n, useI18n } from './createI18n';

describe('vue-i18n compatibility layer', () => {
  it('should support createI18n options and expose global helper', () => {
    const i18n = createI18n({
      locale: 'en',
    });

    expect(i18n.global).toBeDefined();
    expect(i18n.global.locale).toBe('en');
    expect(i18n.mode).toBe('composition');
    expect(typeof i18n.install).toBe('function');
  });

  it('should translate keys correctly via global.t()', () => {
    const i18n = createI18n({
      locale: 'en',
    });

    expect(i18n.global.t('greeting')).toBe('Hello, world!');
  });

  it('should support useI18n composable and its reactive features', () => {
    mockLocale.value = 'en';
    const { locale, t } = useI18n();

    expect(locale.value).toBe('en');
    expect(t('greeting')).toBe('Hello, world!');

    // Change locale
    locale.value = 'fr';
    expect(mockSetLocale).toHaveBeenCalledWith('fr');
  });
});
