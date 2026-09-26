export * from '@intlayer/vue-i18n';
export { NuxtLinkLocale } from './components/NuxtLinkLocale';
export {
  STRATEGIES,
  STRATEGY_NO_PREFIX,
  STRATEGY_PREFIX,
  STRATEGY_PREFIX_AND_DEFAULT,
  STRATEGY_PREFIX_EXCEPT_DEFAULT,
} from './constants';
export { nuxtjsI18nModule as default, nuxtjsI18nModule } from './module';
export {
  defineI18nConfig,
  defineI18nLocale,
  defineI18nRoute,
  useBrowserLocale,
  useCookieLocale,
  useI18nPreloadKeys,
  useLocaleHead,
  useLocalePath,
  useLocaleRoute,
  useRouteBaseName,
  useSetI18nParams,
  useSwitchLocalePath,
} from './routing';
export type {
  ConfigLoader,
  Directions,
  I18nHeadMetaInfo,
  I18nHeadOptions,
  I18nRoute,
  LocaleHeadFunction,
  LocaleLoader,
  LocaleObject,
  LocalePathFunction,
  LocaleRouteFunction,
  LocaleType,
  MetaAttrs,
  NuxtI18nOptions,
  RouteBaseNameFunction,
  RouteLocationGeneric,
  SetI18nParamsFunction,
  Strategies,
  SwitchLocalePathFunction,
} from './types';
