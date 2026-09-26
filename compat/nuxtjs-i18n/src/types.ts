import type { I18nOptions } from 'vue-i18n';

export type Strategies =
  | 'prefix'
  | 'prefix_except_default'
  | 'prefix_and_default'
  | 'no_prefix';

export type Directions = 'ltr' | 'rtl' | 'auto';

export type LocaleObject<T extends string = string> = {
  code: T;
  name?: string;
  dir?: Directions;
  domain?: string;
  file?: string;
  files?: string[];
  isCatchallLocale?: boolean;
  language?: string;
  /** @deprecated Use `language`. */
  iso?: string;
};

export type LocaleType = string | LocaleObject;

/** Page-level route options of `defineI18nRoute()`. */
export type I18nRoute = {
  paths?: Partial<Record<string, `/${string}`>>;
  locales?: string[];
};

export type I18nHeadOptions = {
  dir?: boolean;
  lang?: boolean;
  seo?: boolean | { canonicalQueries?: string[] };
};

export type MetaAttrs = Record<string, string | undefined>;

export type I18nHeadMetaInfo = {
  htmlAttrs?: MetaAttrs;
  link?: MetaAttrs[];
  meta?: MetaAttrs[];
};

/** A route as accepted by the localization helpers. */
export type RouteLocationGeneric =
  | string
  | {
      name?: string;
      path?: string;
      query?: Record<string, string | number | (string | number)[]>;
      hash?: string;
      params?: Record<string, string | string[]>;
    };

/** A route object returned by `localeRoute()`. */
export type LocalizedRoute = {
  path: string;
  fullPath: string;
  name?: string;
  query?: Record<string, string | number | (string | number)[]>;
  hash?: string;
  params?: Record<string, string | string[]>;
};

export type LocalePathFunction = (
  route: RouteLocationGeneric,
  locale?: string
) => string;

export type SwitchLocalePathFunction = (locale: string) => string;

export type LocaleRouteFunction = (
  route: RouteLocationGeneric,
  locale?: string
) => LocalizedRoute;

export type RouteBaseNameFunction = (
  route?: RouteLocationGeneric
) => string | undefined;

export type LocaleHeadFunction = (
  options?: I18nHeadOptions
) => I18nHeadMetaInfo;

export type SetI18nParamsFunction = (
  params: Record<string, Record<string, string | string[]>>
) => void;

export type LocaleLoader<Messages = Record<string, unknown>> = (
  locale: string
) => Messages | Promise<Messages>;

export type ConfigLoader<Config extends I18nOptions = I18nOptions> = () =>
  | Config
  | Promise<Config>;

/**
 * `i18n` options of `nuxt.config`. Intlayer's configuration owns locales,
 * default locale and routing; these are accepted for migration and ignored.
 */
export type NuxtI18nOptions = {
  defaultLocale?: string;
  locales?: LocaleType[];
  strategy?: Strategies;
  lazy?: boolean;
  langDir?: string;
  rootRedirect?: string | null;
  vueI18n?: string;
  detectBrowserLanguage?:
    | {
        alwaysRedirect?: boolean;
        cookieKey?: string;
        fallbackLocale?: string | null;
        redirectOn?: 'all' | 'root' | 'no prefix';
        useCookie?: boolean;
      }
    | false;
};
