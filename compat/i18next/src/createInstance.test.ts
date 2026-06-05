import { describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr'] },
}));

vi.mock('@intlayer/config/built', () => ({
  ...mockConfig,
  default: mockConfig,
  internationalization: mockConfig.internationalization,
}));

vi.mock('@intlayer/core/interpreter', () => ({
  getIntlayer: vi.fn((ns: string, _lang: string) => {
    if (ns === 'translation') {
      return {
        welcome: 'Welcome to our site, {{name}}!',
        goodbye: 'Goodbye!',
      };
    }
    if (ns === 'custom') {
      return {
        hello: 'Hello!',
      };
    }
    throw new Error('Namespace not found');
  }),
}));

import { createInstance } from './createInstance';

describe('i18next createInstance compatibility layer', () => {
  it('should initialize and return default language and locales', () => {
    const i18n = createInstance({ lng: 'en' });
    expect(i18n.language).toBe('en');
    expect(i18n.languages).toEqual(['en', 'fr']);
    expect(i18n.isInitialized).toBe(false);
  });

  it('should support init() and update initialization status', async () => {
    const i18n = createInstance({ lng: 'en' });
    const t = await i18n.init();
    expect(i18n.isInitialized).toBe(true);
    expect(typeof t).toBe('function');
  });

  it('should translate keys correctly via t() using the mock dictionary', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();

    // Translate from default namespace
    expect(i18n.t('welcome', { name: 'John' })).toBe(
      'Welcome to our site, John!'
    );
    expect(i18n.t('goodbye')).toBe('Goodbye!');

    // Translate from custom namespace
    expect(i18n.t('custom:hello')).toBe('Hello!');
  });

  it('should fallback to key if not found in dictionary', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();
    expect(i18n.t('nonexistent_key')).toBe('nonexistent_key');
  });

  it('should support changeLanguage()', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();
    expect(i18n.language).toBe('en');

    await i18n.changeLanguage('fr');
    expect(i18n.language).toBe('fr');
  });

  it('should support getFixedT()', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();

    const t = i18n.getFixedT('en', 'custom');
    expect(t('hello')).toBe('Hello!');
  });
});
