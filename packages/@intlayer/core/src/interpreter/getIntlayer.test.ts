import { describe, expect, it, vi } from 'vitest';
import { getIntlayer } from './getIntlayer';

vi.mock('@intlayer/config/built', () => {
  const config = {
    log: { mode: 'disabled' },
    internationalization: {
      defaultLocale: 'en',
      locales: ['en', 'fr'],
      requiredLocales: ['en'],
    },
  };
  return { ...config, default: config };
});

/** No dictionary is registered, so every key resolves to the safe fallback. */
vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: () => ({}),
}));

vi.mock('@intlayer/config/logger', () => ({
  colorizeKey: (key: string) => key,
  getAppLogger: () => () => undefined,
}));

/**
 * `getIntlayer` hands back a recursive path proxy in development when a
 * dictionary is missing. Consumers keep inspecting and calling what they get,
 * so the proxy has to survive both without throwing something unrelated to the
 * missing dictionary.
 */
describe('getIntlayer safe fallback', () => {
  const previousNodeEnv = process.env.NODE_ENV;

  const getFallback = () => {
    process.env.NODE_ENV = 'development';
    try {
      return getIntlayer('missing-dictionary' as never) as any;
    } finally {
      process.env.NODE_ENV = previousNodeEnv;
    }
  };

  it('stringifies to the accessed key path', () => {
    expect(String(getFallback().metadata.title)).toBe(
      'missing-dictionary.metadata.title'
    );
  });

  it('answers Object.prototype methods with real functions', () => {
    const content = getFallback();

    // Reaching for the builtins on the value itself is exactly what consumers
    // do — TanStack Router's `isPlainObject` calls `hasOwnProperty` while
    // deep-comparing the router state a route `head` feeds it — so the checks
    // below must not be rewritten to the `Object.*` static forms.

    // biome-ignore lint/suspicious/noPrototypeBuiltins: under test
    expect(content.hasOwnProperty('metadata')).toBe(false);
    // biome-ignore lint/suspicious/noPrototypeBuiltins: under test
    expect(content.propertyIsEnumerable('metadata')).toBe(false);
    // biome-ignore lint/suspicious/noPrototypeBuiltins: under test
    expect(content.isPrototypeOf({})).toBe(false);
  });

  it('is not mistaken for a plain object by structural checks', () => {
    expect(Object.prototype.toString.call(getFallback())).not.toBe(
      '[object Object]'
    );
  });

  it('resolves calls on leaves to the key path', () => {
    // `keywords.join(', ')` in a route `head` must degrade, not throw.
    expect(getFallback().metadata.keywords.join(', ')).toBe(
      'missing-dictionary.metadata.keywords.join'
    );
  });

  it('is not treated as a promise', async () => {
    await expect(Promise.resolve(getFallback())).resolves.toBeDefined();
  });
});
