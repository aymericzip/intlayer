import type { Provider } from '@angular/core';

export type Language = string;
export type Translation =
  | string
  | number
  | boolean
  | Record<string, any>
  | any[];
export type TranslationObject = Record<string, any>;
export type InterpolatableTranslation = any;
export type InterpolatableTranslationObject = Record<string, any>;
export type InterpolateFunction = (params?: any) => string;
export type InterpolationParameters = Record<string, any>;
export type StrictTranslation =
  | string
  | number
  | boolean
  | Record<string, any>
  | any[];

export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
    ? T
    : T extends object
      ? DeepReadonlyObject<T>
      : T;

export interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export interface LangChangeEvent {
  lang: string;
  translations: any;
}

export interface TranslationChangeEvent {
  lang: string;
  translations: any;
}

export interface FallbackLangChangeEvent {
  lang: string;
  fallbackLang: string;
}

export interface DefaultLangChangeEvent {
  lang: string;
  defaultLang: string;
}

export interface MissingTranslationHandlerParams {
  key: string;
  translateService: any;
  interpolateParams?: object;
}

export type TranslateProvider = Provider | (() => unknown);

export interface TranslateProviders {
  loader?: TranslateProvider;
  compiler?: TranslateProvider;
  parser?: TranslateProvider;
  missingTranslationHandler?: TranslateProvider;
}

export type ChildTranslateServiceConfig = Partial<TranslateProviders>;

export interface RootTranslateServiceConfig
  extends ChildTranslateServiceConfig {
  fallbackLang?: Language;
  lang?: Language;
}

export type TranslateServiceConfig = RootTranslateServiceConfig;
