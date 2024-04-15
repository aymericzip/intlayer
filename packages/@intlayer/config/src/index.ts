export { getConfiguration } from './configFile/getConfiguration';

export type {
  InternationalizationConfig,
  ServerSetCookieRule,
  MiddlewareConfig,
  CustomIntlayerConfig,
  BaseContentConfig,
  BaseDerivedConfig,
  ResultDirDerivedConfig,
  PatternsContentConfig,
  ContentConfig,
  IntlayerConfig,
} from './types';
export { Locales } from './defaultValues/locales';
export {
  formatEnvVariable,
  intlayerIntlConfiguration,
  intlayerMiddlewareConfiguration,
  intlayerContentConfiguration,
  intlayerConfiguration,
  getConfiguration as getClientConfiguration,
} from './envVariables/index';
