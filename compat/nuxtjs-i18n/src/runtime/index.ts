export {
  STRATEGIES,
  STRATEGY_NO_PREFIX,
  STRATEGY_PREFIX,
  STRATEGY_PREFIX_AND_DEFAULT,
  STRATEGY_PREFIX_EXCEPT_DEFAULT,
} from '../constants';
export {
  type NuxtI18nComposerExtras,
  useDictionary,
  useDictionaryDynamic,
  useI18n,
} from './composer';
export {
  defineI18nConfig,
  defineI18nLocale,
  defineI18nLocaleDetector,
  defineI18nRoute,
  useI18nPreloadKeys,
  useSetI18nParams,
} from './define';
export { NuxtLinkLocale } from './NuxtLinkLocale';
export {
  useBrowserLocale,
  useCookieLocale,
  useLocaleHead,
  useLocalePath,
  useLocaleRoute,
  useRouteBaseName,
  useSwitchLocalePath,
} from './routing';
