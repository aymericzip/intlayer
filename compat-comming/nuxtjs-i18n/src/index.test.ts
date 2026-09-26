// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  createI18n,
  defineI18nConfig,
  defineI18nLocale,
  NuxtLinkLocale,
  STRATEGIES,
  STRATEGY_NO_PREFIX,
  STRATEGY_PREFIX,
  useI18n,
  useLocaleHead,
  useLocalePath,
  useLocaleRoute,
  useRouteBaseName,
} from './index';

describe('nuxtjs-i18n compat adapter', () => {
  it('exports strategies and constants', () => {
    expect(STRATEGY_PREFIX).toBe('prefix');
    expect(STRATEGY_NO_PREFIX).toBe('no_prefix');
    expect(STRATEGIES.PREFIX).toBe('prefix');
    expect(STRATEGIES.NO_PREFIX).toBe('no_prefix');
  });

  it('provides useLocalePath with query and hash handling', () => {
    const localePath = useLocalePath();

    const path1 = localePath('/about', 'fr');
    expect(path1).toContain('/fr/about');

    const path2 = localePath(
      { path: '/dashboard', query: { tab: 'settings' }, hash: 'profile' },
      'es'
    );
    expect(path2).toContain('/es/dashboard');
    expect(path2).toContain('tab=settings');
    expect(path2).toContain('#profile');
  });

  it('provides useLocaleRoute', () => {
    const localeRoute = useLocaleRoute();
    const route = localeRoute('/contact', 'fr');

    expect(route.path).toBeDefined();
    expect(route.fullPath).toBeDefined();
    expect(route.path).toContain('/fr/contact');
  });

  it('provides useRouteBaseName', () => {
    const routeBaseName = useRouteBaseName();

    expect(routeBaseName('about___fr')).toBe('about');
    expect(routeBaseName({ name: 'dashboard___en' })).toBe('dashboard');
    expect(routeBaseName('/fr/settings')).toBe('settings');
  });

  it('provides useLocaleHead with hreflangs and dir', () => {
    const head = useLocaleHead({ dir: true, lang: true, seo: true });

    expect(head.value).toBeDefined();
    expect(head.value.htmlAttrs).toBeDefined();
    expect(head.value.htmlAttrs?.dir).toBeDefined();
    expect(head.value.link).toBeDefined();
    expect(Array.isArray(head.value.link)).toBe(true);
    expect(head.value.link?.some((l) => l.hreflang === 'x-default')).toBe(true);
  });

  it('provides config and locale helper definitions', () => {
    const loader = defineI18nLocale(() => ({ hello: 'world' }));
    expect(typeof loader).toBe('function');

    const config = defineI18nConfig(() => ({ legacy: false }));
    expect(typeof config).toBe('function');
  });

  it('re-exports vue-i18n functions', () => {
    expect(typeof createI18n).toBe('function');
    expect(typeof useI18n).toBe('function');
  });

  it('exports NuxtLinkLocale component', () => {
    expect(NuxtLinkLocale).toBeDefined();
    expect(NuxtLinkLocale.name).toBe('NuxtLinkLocale');
  });
});
