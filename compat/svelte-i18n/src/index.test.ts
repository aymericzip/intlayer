// @vitest-environment node
import { get, writable } from 'svelte/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/config/built', () => ({
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr'] },
}));

const dictionaryContents = vi.hoisted(
  (): Record<string, Record<string, unknown>> => ({
    en: {
      home: {
        title: 'Welcome {name}',
        nav: { about: 'About' },
        items: (values: { count: number }) =>
          values.count === 1 ? '1 item' : `${values.count} items`,
      },
    },
    fr: {
      home: { title: 'Bienvenue {name}', nav: { about: 'À propos' } },
    },
  })
);

vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: () => ({ home: {} }),
}));

vi.mock('@intlayer/core/interpreter', () => ({
  getIntlayer: (key: string, locale: string) =>
    dictionaryContents[locale]?.[key],
  getDictionary: (dictionary: { key: string }, locale: string) =>
    dictionaryContents[locale]?.[dictionary.key],
}));

vi.mock('svelte-intlayer', () => {
  const store = writable({ locale: 'en' });
  return {
    intlayerStore: {
      subscribe: store.subscribe,
      setLocale: (locale: string) => store.set({ locale }),
    },
  };
});

const {
  _,
  addMessages,
  date,
  defineMessages,
  getMessageFormatter,
  getNumberFormatter,
  init,
  isLoading,
  json,
  locale,
  locales,
  number,
  register,
  t,
  time,
  unwrapFunctionStore,
  useDictionary,
  useDictionaryDynamic,
  waitLocale,
} = await import('./index');

describe('svelte-i18n compat adapter', () => {
  beforeEach(async () => {
    await init({ fallbackLocale: 'en', initialLocale: 'en' });
  });

  it('shares the active locale with svelte-intlayer', async () => {
    locale.set('fr');
    expect(get(locale)).toBe('fr');

    await init({ fallbackLocale: 'en', initialLocale: 'en' });
    expect(get(locale)).toBe('en');

    expect(get(locales)).toEqual(['en', 'fr']);
    expect(get(isLoading)).toBe(false);
  });

  it('resolves ids through the intlayer dictionaries', () => {
    expect(get(_)('home.title', { values: { name: 'Ada' } })).toBe(
      'Welcome Ada'
    );
    expect(get(t)({ id: 'home.items', values: { count: 3 } })).toBe('3 items');

    locale.set('fr');
    expect(get(_)('home.nav.about')).toBe('À propos');
  });

  it('falls back to the fallback locale, default message, then id', async () => {
    locale.set('fr');
    expect(get(_)('home.items', { values: { count: 1 } })).toBe('1 item');

    expect(get(_)('home.missing', { default: 'Hi {name}' })).toBe('Hi {name}');
    expect(
      get(_)('home.missing', { default: 'Hi {name}', values: { name: 'Bo' } })
    ).toBe('Hi Bo');
    expect(get(_)('home.missing')).toBe('home.missing');

    await init({
      fallbackLocale: 'en',
      handleMissingMessage: ({ id }) => `<${id}>`,
    });
    expect(get(_)('home.missing')).toBe('<home.missing>');
    await init({ fallbackLocale: 'en', handleMissingMessage: undefined });
  });

  it('resolves runtime ICU messages registered with addMessages', async () => {
    addMessages('en', {
      cart: { count: '{count, plural, one {# item} other {# items}}' },
    });
    expect(get(_)('cart.count', { values: { count: 1 } })).toBe('1 item');
    expect(get(_)('cart.count', { values: { count: 4 } })).toBe('4 items');

    register('en', async () => ({ default: { greeting: 'Hello' } }));
    await waitLocale();
    expect(get(_)('greeting')).toBe('Hello');
  });

  it('returns raw subtrees through $json', () => {
    expect(get(json)('home.nav')).toEqual({ about: 'About' });
    expect(get(json)('home.nav', 'fr')).toEqual({ about: 'À propos' });
    expect(get(json)('nope')).toBeUndefined();
  });

  it('formats numbers, dates and times with named formats', () => {
    expect(get(number)(1234.5)).toBe('1,234.5');
    expect(get(number)(1200, { format: 'compactShort' })).toBe('1.2K');

    const moment = new Date(2026, 0, 15, 9, 5);
    expect(get(date)(moment)).toBe('1/15/26');
    expect(get(date)(moment, { format: 'long' })).toBe('January 15, 2026');
    expect(get(time)(moment)).toBe('9:05 AM');

    expect(() => get(date)(moment, { format: 'unknown' })).toThrow();
    expect(getNumberFormatter({ locale: 'fr' }).format(1234.5)).toBe('1 234,5');
  });

  it('unwraps function stores outside components', () => {
    const translate = unwrapFunctionStore(_);
    expect(translate('home.nav.about')).toBe('About');

    locale.set('fr');
    expect(translate('home.nav.about')).toBe('À propos');

    translate.freeze();
    locale.set('en');
    expect(translate('home.nav.about')).toBe('À propos');
  });

  it('exposes the standalone helpers', () => {
    expect(defineMessages({ a: { id: 'a' } }).a.id).toBe('a');
    expect(
      getMessageFormatter('{n, plural, one {# cat} other {# cats}}').format({
        n: 2,
      })
    ).toBe('2 cats');
  });

  it('binds stores to one dictionary with useDictionary', async () => {
    const { t: translate, json: readJson } = useDictionary(
      { key: 'home', content: {} } as never,
      'nav'
    );
    expect(get(translate)('about')).toBe('About');
    expect(get(readJson)('about', 'fr')).toBe('À propos');

    const dynamic = useDictionaryDynamic(
      { en: async () => ({ key: 'home' }), fr: async () => ({ key: 'home' }) },
      'home' as never
    );
    const values: string[] = [];
    const unsubscribe = dynamic.t.subscribe((translateDynamic) => {
      values.push(translateDynamic('title', { values: { name: 'Ada' } }));
    });
    await Promise.resolve();
    await Promise.resolve();
    unsubscribe();

    expect(values[0]).toBe('title');
    expect(values.at(-1)).toBe('Welcome Ada');
  });
});
