import { describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr'] },
  routing: { prefixDefault: false },
}));

vi.mock('@intlayer/config/built', () => ({
  internationalization: mockConfig.internationalization,
  routing: mockConfig.routing,
}));

import { defineRouting } from './routing';

describe('next-intl defineRouting config resolver', () => {
  it('should fall back to intlayer config properties', () => {
    const r = defineRouting({});
    expect(r.locales).toEqual(['en', 'fr']);
    expect(r.defaultLocale).toBe('en');
    expect(r.localePrefix).toBe('as-needed');
  });

  it('should merge explicitly passed routing parameters', () => {
    const r = defineRouting({
      locales: ['de'],
      defaultLocale: 'de',
      localePrefix: 'always',
    });
    expect(r.locales).toEqual(['de']);
    expect(r.defaultLocale).toBe('de');
    expect(r.localePrefix).toBe('always');
  });
});
