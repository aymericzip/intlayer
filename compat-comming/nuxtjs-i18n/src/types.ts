import type {
  DefineLocaleMessage,
  I18nOptions,
  Locale,
  LocaleMessages,
} from 'vue-i18n';

export type Strategies =
  | 'prefix'
  | 'prefix_except_default'
  | 'prefix_and_default'
  | 'no_prefix';

export type Directions = 'ltr' | 'rtl' | 'auto';

export interface LocaleObject<T = string> {
  code: T;
  name?: string;
  dir?: Directions;
  domain?: string;
  file?: string;
  files?: string[];
  isCatchallLocale?: boolean;
  iso?: string;
}

export type LocaleType = string | LocaleObject;

export interface I18nRoute {
  paths?: Partial<Record<string, `/${string}`>>;
  locales?: string[];
}

export interface I18nHeadOptions {
  dir?: boolean;
  lang?: boolean;
  seo?: boolean;
}

export interface MetaAttrs {
  [key: string]: any;
}

export interface I18nHeadMetaInfo {
  htmlAttrs?: MetaAttrs;
  link?: MetaAttrs[];
  meta?: MetaAttrs[];
}

export type RouteLocationGeneric =
  | string
  | {
      name?: string;
      path?: string;
      query?: Record<string, any>;
      hash?: string;
      params?: Record<string, any>;
    };

export type LocalePathFunction = (
  route: RouteLocationGeneric,
  locale?: string
) => string;

export type SwitchLocalePathFunction = (locale: string) => string;

export type LocaleRouteFunction = (
  route: RouteLocationGeneric,
  locale?: string
) => any;

export type RouteBaseNameFunction = (
  route?: RouteLocationGeneric
) => string | undefined;

export type LocaleHeadFunction = (
  options?: I18nHeadOptions
) => I18nHeadMetaInfo;

export type SetI18nParamsFunction = (params: Record<string, any>) => void;

export type LocaleLoader<
  Messages = LocaleMessages<DefineLocaleMessage>,
  Locales = Locale,
> = (locale: Locales) => Messages | Promise<Messages>;

export type ConfigLoader<Config extends I18nOptions = I18nOptions> = () =>
  | Config
  | Promise<Config>;

export interface NuxtI18nOptions {
  defaultLocale?: string;
  locales?: (string | LocaleObject)[];
  strategy?: Strategies;
  lazy?: boolean;
  langDir?: string;
  rootRedirect?: string | null;
  routesNameSeparator?: string;
  defaultLocaleRouteNameSuffix?: string;
  skipSettingLocaleOnNavigate?: boolean;
  differentDomains?: boolean;
  baseUrl?: string | ((...args: any[]) => string);
  vueI18n?: string;
  detectBrowserLanguage?:
    | {
        alwaysRedirect?: boolean;
        cookieCrossOrigin?: boolean;
        cookieDomain?: string | null;
        cookieKey?: string;
        cookieSecure?: boolean;
        fallbackLocale?: string | null;
        redirectOn?: 'all' | 'root' | 'no prefix';
        useCookie?: boolean;
      }
    | false;
}
