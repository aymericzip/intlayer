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

vi.mock('@intlayer/core/interpreter', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@intlayer/core/interpreter')>()),
  getIntlayer: vi.fn((ns: string, _lang: string) => {
    if (ns === 'translation') {
      return {
        welcome: 'Welcome to our site, {{name}}!',
        goodbye: 'Goodbye!',
        item_one: '{{count}} item',
        item_other: '{{count}} items',
        friend_male: 'A boyfriend',
        friend_female: 'A girlfriend',
        friend: 'A friend',
        nested: 'go to $t(goodbye)',
        list: ['a', 'b'],
      };
    }
    if (ns === 'custom') {
      return {
        hello: 'Hello!',
      };
    }
    if (ns === 'flatKeys') {
      return {
        'resultsTable.sampleResults': 'Sample Results',
        'resultsTable.bundleSize': 'Bundle Size',
        'hero.viewResults': 'View Results',
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

  it('should resolve plural suffixes from count', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();

    expect(i18n.t('item', { count: 1 })).toBe('1 item');
    expect(i18n.t('item', { count: 4 })).toBe('4 items');
  });

  it('should resolve context suffixes', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();

    expect(i18n.t('friend', { context: 'male' })).toBe('A boyfriend');
    expect(i18n.t('friend', { context: 'female' })).toBe('A girlfriend');
    expect(i18n.t('friend')).toBe('A friend');
  });

  it('should switch namespace via the ns option', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();

    expect(i18n.t('hello', { ns: 'custom' })).toBe('Hello!');
  });

  it('should interpolate the defaultValue when the key is missing', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();

    expect(
      i18n.t('missing', { defaultValue: 'Hi {{name}}', name: 'John' })
    ).toBe('Hi John');
  });

  it('should resolve $t() nesting', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();

    expect(i18n.t('nested')).toBe('go to Goodbye!');
  });

  it('should return raw objects with returnObjects', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();

    expect(i18n.t('list', { returnObjects: true })).toEqual(['a', 'b']);
  });

  it('should report key existence including plural forms', async () => {
    const i18n = createInstance({ lng: 'en' });
    await i18n.init();

    expect(i18n.exists('item', { count: 2 })).toBe(true);
    expect(i18n.exists('missing')).toBe(false);
  });

  it('should resolve flat dot-separated keys (i18next flat JSON format)', async () => {
    const i18n = createInstance({ lng: 'en', ns: ['flatKeys'] });
    await i18n.init();

    expect(i18n.t('flatKeys:resultsTable.sampleResults')).toBe(
      'Sample Results'
    );
    expect(i18n.t('flatKeys:resultsTable.bundleSize')).toBe('Bundle Size');
    expect(i18n.t('flatKeys:hero.viewResults')).toBe('View Results');
  });
});
