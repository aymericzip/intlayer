import type { Provider } from '@angular/core';

export type Language = string;

/** A compiled translation: a string, or a function of the parameters. */
export type InterpolateFunction = (params?: InterpolationParameters) => string;

export type InterpolationParameters = Record<string, unknown>;

export type TranslationObject = {
  [key: string]: Translation;
};

export type Translation =
  | string
  | number
  | boolean
  | null
  | TranslationObject
  | Translation[];

export type StrictTranslation = Exclude<Translation, null>;

export type InterpolatableTranslation =
  | string
  | InterpolateFunction
  | InterpolatableTranslationObject
  | InterpolatableTranslation[];

export type InterpolatableTranslationObject = {
  [key: string]: InterpolatableTranslation;
};

export type DeepReadonly<T> = T extends (infer R)[]
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends (...args: never[]) => unknown
    ? T
    : T extends object
      ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
      : T;

export type LangChangeEvent = {
  lang: Language;
  translations: InterpolatableTranslationObject;
};

export type TranslationChangeEvent = LangChangeEvent;

export type FallbackLangChangeEvent = {
  lang: Language;
  translations: InterpolatableTranslationObject;
};

/** @deprecated Use {@link FallbackLangChangeEvent}. */
export type DefaultLangChangeEvent = FallbackLangChangeEvent;

export type MissingTranslationHandlerParams = {
  key: string;
  translateService: unknown;
  interpolateParams?: InterpolationParameters;
};

export type TranslateProvider = Provider;

export type TranslateProviders = {
  loader?: TranslateProvider;
  compiler?: TranslateProvider;
  parser?: TranslateProvider;
  missingTranslationHandler?: TranslateProvider;
};

export type ChildTranslateServiceConfig = TranslateProviders & {
  /** Kept for API parity: every service shares intlayer's locale. */
  extend?: boolean;
};

export type RootTranslateServiceConfig = TranslateProviders & {
  /** Language activated when the service is created. */
  lang?: Language;
  /** Language whose translations fill the gaps of the active one. */
  fallbackLang?: Language;
  /** @deprecated Use `fallbackLang`. */
  defaultLanguage?: Language;
  /** @deprecated Use `lang`. */
  useDefaultLang?: boolean;
};

export type TranslateServiceConfig = RootTranslateServiceConfig;
