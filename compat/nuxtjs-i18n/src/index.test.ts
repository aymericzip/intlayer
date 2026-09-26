// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

const builtConfig = vi.hoisted(() => ({
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr', 'ar'] },
  routing: { mode: 'prefix-no-default', storage: [] },
  editor: { enabled: false },
  system: {},
}));

vi.mock('@intlayer/config/built', () => ({
  ...builtConfig,
  default: builtConfig,
}));

const activeLocale = vi.hoisted(() => ({ current: null as never }));

vi.mock('vue-intlayer', () => {
  const locale = ref('en');
  activeLocale.current = locale as never;
  const setLocale = (value: string) => {
    locale.value = value;
  };
  return {
    createIntlayerClient: () => ({ locale, setLocale }),
    useLocale: () => ({ locale, setLocale, availableLocales: ['en', 'fr'] }),
    useDictionary: () => ({}),
    useDictionaryDynamic: () => ({}),
    installIntlayer: () => {},
  };
});

vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: () => ({}),
}));

const runtime = await import('./runtime/index');
const constants = await import('./constants');

const setActiveLocale = (locale: string): void => {
  (activeLocale.current as { value: string }).value = locale;
};

describe('nuxtjs-i18n compat runtime', () => {
  beforeEach(() => setActiveLocale('en'));

  it('maps intlayer routing to @nuxtjs/i18n strategies', () => {
    expect(constants.STRATEGIES.PREFIX_EXCEPT_DEFAULT).toBe(
      'prefix_except_default'
    );
  });

  it('localizes paths for the active or given locale', () => {
    const localePath = runtime.useLocalePath();

    expect(localePath('/about')).toBe('/about');
    expect(localePath('/about', 'fr')).toBe('/fr/about');
    expect(
      localePath(
        { path: '/dashboard', query: { tab: 'settings' }, hash: 'profile' },
        'fr'
      )
    ).toBe('/fr/dashboard?tab=settings#profile');

    setActiveLocale('fr');
    expect(localePath('/fr/about', 'en')).toBe('/about');
  });

  it('builds localized route objects', () => {
    const localeRoute = runtime.useLocaleRoute();

    expect(localeRoute({ path: '/contact', query: { a: '1' } }, 'fr')).toEqual({
      path: '/fr/contact',
      fullPath: '/fr/contact?a=1',
      query: { a: '1' },
    });
  });

  it('strips locales from route names and paths', () => {
    const getRouteBaseName = runtime.useRouteBaseName();

    expect(getRouteBaseName('about___fr')).toBe('about');
    expect(getRouteBaseName({ name: 'dashboard___i18n' })).toBe('dashboard');
    expect(getRouteBaseName('/fr/settings')).toBe('settings');
    expect(getRouteBaseName('/fr')).toBe('index');
  });

  it('computes head attributes and alternate links', () => {
    setActiveLocale('ar');
    const head = runtime.useLocaleHead().value;

    expect(head.htmlAttrs).toEqual({ lang: 'ar', dir: 'rtl' });
    expect(head.link?.map((link) => link.hreflang ?? link.rel)).toEqual([
      'en',
      'fr',
      'ar',
      'x-default',
      'canonical',
    ]);
    expect(head.meta?.[0]).toEqual({ property: 'og:locale', content: 'ar' });
  });

  it('adds the Nuxt helpers to the vue-i18n composer', async () => {
    const composer = runtime.useI18n();

    expect(composer.localeCodes.value).toEqual(['en', 'fr', 'ar']);
    expect(composer.defaultLocale).toBe('en');
    expect(composer.strategy).toBe('prefix_except_default');
    expect(composer.locales.value[1]).toMatchObject({ code: 'fr', dir: 'ltr' });
    expect(typeof composer.t).toBe('function');

    await composer.setLocale('fr');
    expect(composer.localeProperties.value.code).toBe('fr');

    await composer.setLocale('xx');
    expect(composer.localeProperties.value.code).toBe('fr');
  });

  it('keeps the migration helpers as identities / no-ops', () => {
    const loader = () => ({ hello: 'world' });
    expect(runtime.defineI18nLocale(loader)).toBe(loader);
    expect(runtime.defineI18nRoute(false)).toBeUndefined();
    expect(runtime.NuxtLinkLocale.name).toBe('NuxtLinkLocale');
  });
});
