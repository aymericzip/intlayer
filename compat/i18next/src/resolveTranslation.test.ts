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

/**
 * Single-file JSON layout (source pattern without a `{{key}}` segment, e.g.
 * `./src/i18n/{{locale}}.json`): intlayer loads the whole file as the root
 * `index` dictionary. i18next's default namespace is `translation`, so the
 * resolver must fall back to `index` for the whole-file convention to work.
 */
const registry = vi.hoisted(
  () =>
    ({
      index: {
        login: {
          heroSubtitle: 'Intelligent data exploration',
          signIn: 'Sign In',
        },
      },
      about: { title: 'About us' },
    }) as Record<string, unknown>
);

// Mirrors the app runtime: a single-file JSON source is registered as the root
// `index` dictionary; there is no `translation` dictionary.
vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: vi.fn(() => registry),
}));

// `getIntlayer` never throws for a missing key — it returns a stringifying
// fallback proxy — so the mock mirrors that instead of throwing.
vi.mock('@intlayer/core/interpreter', () => ({
  getIntlayer: vi.fn((ns: string, _lang: string) => registry[ns]),
}));

import { resolveTranslation } from './resolveTranslation';

describe('resolveTranslation single-file (`index`) fallback', () => {
  it('resolves a default-namespace dot-path against the `index` dictionary', () => {
    expect(
      resolveTranslation({
        locale: 'en',
        namespace: 'translation',
        key: 'login.heroSubtitle',
      })
    ).toBe('Intelligent data exploration');
  });

  it('does not fall back for an explicit `ns:` prefix that is missing', () => {
    expect(
      resolveTranslation({
        locale: 'en',
        namespace: 'translation',
        key: 'missing:login.heroSubtitle',
      })
    ).toBeUndefined();
  });

  it('does not fall back for a missing `ns` option', () => {
    expect(
      resolveTranslation({
        locale: 'en',
        namespace: 'translation',
        key: 'login.heroSubtitle',
        options: { ns: 'missing' },
      })
    ).toBeUndefined();
  });

  it('still prefers a registered namespace over the `index` fallback', () => {
    expect(
      resolveTranslation({
        locale: 'en',
        namespace: 'about',
        key: 'title',
      })
    ).toBe('About us');
  });

  it('returns undefined when neither the namespace nor `index` has the key', () => {
    expect(
      resolveTranslation({
        locale: 'en',
        namespace: 'translation',
        key: 'login.unknownKey',
      })
    ).toBeUndefined();
  });
});
