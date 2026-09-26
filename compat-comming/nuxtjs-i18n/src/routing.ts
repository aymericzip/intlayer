import { internationalization, routing } from '@intlayer/config/built';
import {
  getBrowserLocale as getBrowserLocaleBase,
  getHTMLTextDir,
  getLocalizedUrl,
  getPathWithoutLocale,
} from '@intlayer/core/localization';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { computed, getCurrentInstance, type Ref, ref } from 'vue';
import { useLocale } from 'vue-intlayer';
import type {
  ConfigLoader,
  I18nHeadMetaInfo,
  I18nHeadOptions,
  I18nRoute,
  LocaleLoader,
  LocalePathFunction,
  LocaleRouteFunction,
  RouteBaseNameFunction,
  RouteLocationGeneric,
  SetI18nParamsFunction,
  SwitchLocalePathFunction,
} from './types';

const defaultLocale = (internationalization?.defaultLocale ?? 'en') as string;
const locales = (internationalization?.locales ?? [defaultLocale]) as string[];
const mode = routing?.mode ?? 'prefix-no-default';

const getActiveLocale = (): string => {
  if (getCurrentInstance()) {
    try {
      const { locale } = useLocale();
      return locale.value ?? defaultLocale;
    } catch {}
  }
  return defaultLocale;
};

/**
 * Resolves the raw path string and query/hash from a route argument.
 */
const parseRouteArg = (
  route: RouteLocationGeneric
): { pathname: string; search: string; hash: string; name?: string } => {
  if (typeof route === 'string') {
    const hashIndex = route.indexOf('#');
    let hash = '';
    let remainder = route;
    if (hashIndex !== -1) {
      hash = route.slice(hashIndex);
      remainder = route.slice(0, hashIndex);
    }
    const searchIndex = remainder.indexOf('?');
    let search = '';
    let pathname = remainder;
    if (searchIndex !== -1) {
      search = remainder.slice(searchIndex);
      pathname = remainder.slice(0, searchIndex);
    }
    return {
      pathname: pathname.startsWith('/') ? pathname : `/${pathname}`,
      search,
      hash,
    };
  }

  const pathname = route.path
    ? route.path.startsWith('/')
      ? route.path
      : `/${route.path}`
    : `/${route.name ?? ''}`;
  const search = route.query
    ? `?${new URLSearchParams(
        Object.entries(route.query).map(([k, v]) => [k, String(v)])
      ).toString()}`
    : '';
  const hash = route.hash
    ? route.hash.startsWith('#')
      ? route.hash
      : `#${route.hash}`
    : '';

  return { pathname, search, hash, name: route.name };
};

/**
 * Returns a function to resolve localized path for a route.
 */
export const useLocalePath = (): LocalePathFunction => {
  return (route: RouteLocationGeneric, targetLocale?: string): string => {
    const activeLocale = (targetLocale ??
      getActiveLocale() ??
      defaultLocale) as LocalesValues;
    const { pathname, search, hash } = parseRouteArg(route);

    const cleanPath = getPathWithoutLocale(pathname);

    const configuredLocales = locales as LocalesValues[];
    const effectiveLocales = configuredLocales.includes(activeLocale)
      ? configuredLocales
      : [...configuredLocales, activeLocale];

    const localized = getLocalizedUrl(cleanPath, activeLocale, {
      defaultLocale: defaultLocale as LocalesValues,
      locales: effectiveLocales,
      mode,
    });

    return `${localized}${search}${hash}`;
  };
};

/**
 * Returns a function to switch the current route's locale.
 */
export const useSwitchLocalePath = (): SwitchLocalePathFunction => {
  const localePath = useLocalePath();

  return (targetLocale: string): string => {
    const currentPath =
      typeof window !== 'undefined'
        ? `${window.location.pathname}${window.location.search}${window.location.hash}`
        : '/';
    return localePath(currentPath, targetLocale);
  };
};

/**
 * Returns a function to resolve a localized route object.
 */
export const useLocaleRoute = (): LocaleRouteFunction => {
  const localePath = useLocalePath();

  return (route: RouteLocationGeneric, targetLocale?: string) => {
    const resolvedPath = localePath(route, targetLocale);
    if (typeof route === 'object') {
      return {
        ...route,
        path: resolvedPath,
        fullPath: resolvedPath,
      };
    }
    return {
      path: resolvedPath,
      fullPath: resolvedPath,
    };
  };
};

/**
 * Returns a function to get the base name of a route without locale prefix/suffix.
 */
export const useRouteBaseName = (): RouteBaseNameFunction => {
  return (route?: RouteLocationGeneric): string | undefined => {
    const stripLocale = (p: string) =>
      p
        .replace(/^\/[a-z]{2,3}(-[a-zA-Z]{2,4})?(?=\/|$)/i, '')
        .replace(/^\//, '') || 'index';

    if (!route) {
      if (typeof window !== 'undefined') {
        return stripLocale(window.location.pathname);
      }
      return undefined;
    }

    if (typeof route === 'string') {
      if (route.includes('___')) {
        return route.replace(/___[a-zA-Z0-9_-]+$/, '');
      }
      const raw = route.startsWith('/') ? route : `/${route}`;
      return stripLocale(raw);
    }

    if (route.name) {
      return route.name.replace(/___[a-zA-Z0-9_-]+$/, '');
    }

    const { pathname } = parseRouteArg(route);
    return stripLocale(pathname);
  };
};

/**
 * Returns localized head properties for SEO and direction.
 */
export const useLocaleHead = ({
  dir = true,
  lang = true,
  seo = true,
}: I18nHeadOptions = {}): Ref<I18nHeadMetaInfo> => {
  return computed<I18nHeadMetaInfo>(() => {
    const activeLocale = (getActiveLocale() ?? defaultLocale) as LocalesValues;
    const currentDir = getHTMLTextDir(activeLocale);

    const head: I18nHeadMetaInfo = {};

    if (lang || dir) {
      head.htmlAttrs = {
        ...(lang ? { lang: activeLocale } : {}),
        ...(dir ? { dir: currentDir } : {}),
      };
    }

    if (seo) {
      const currentPath =
        typeof window !== 'undefined' ? window.location.pathname : '/';
      const cleanPath = getPathWithoutLocale(currentPath);

      head.link = locales.map((loc) => ({
        rel: 'alternate',
        hreflang: loc,
        href: getLocalizedUrl(cleanPath, loc as LocalesValues, {
          defaultLocale: defaultLocale as LocalesValues,
          locales: locales as LocalesValues[],
          mode,
        }),
      }));

      head.link.push({
        rel: 'alternate',
        hreflang: 'x-default',
        href: getLocalizedUrl(cleanPath, defaultLocale as LocalesValues, {
          defaultLocale: defaultLocale as LocalesValues,
          locales: locales as LocalesValues[],
          mode,
        }),
      });

      head.meta = [
        {
          property: 'og:locale',
          content: activeLocale,
        },
      ];
    }

    return head;
  });
};

/**
 * Detect browser locale.
 */
export const useBrowserLocale = (): string | null => {
  return getBrowserLocaleBase() ?? null;
};

/**
 * Cookie locale ref.
 */
export const useCookieLocale = (): Ref<string> => {
  if (getCurrentInstance()) {
    try {
      const { locale } = useLocale();
      return locale;
    } catch {}
  }
  return ref(defaultLocale);
};

/**
 * Sets i18n params for current route.
 */
export const useSetI18nParams = (): SetI18nParamsFunction => {
  return (_params: Record<string, any>) => {};
};

/**
 * Define custom route configuration for page components.
 */
export const defineI18nRoute = (_route: I18nRoute | false): void => {};

/**
 * Register translation keys for preloading.
 */
export const useI18nPreloadKeys = (_keys: string[]): void => {};

/**
 * Define locale loader for dynamic messages.
 */
export const defineI18nLocale = <Messages = any, Locales = string>(
  loader: LocaleLoader<Messages, Locales>
): LocaleLoader<Messages, Locales> => loader;

/**
 * Define configuration for vue-i18n.
 */
export const defineI18nConfig = <Config extends Record<string, any>>(
  config: ConfigLoader<Config>
): ConfigLoader<Config> => config;
