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
} from './types/config';
export type { LocalesValues } from './types/locales';
export { Locales } from './types/locales';
export {
  formatEnvVariable,
  intlayerIntlConfiguration,
  intlayerMiddlewareConfiguration,
  intlayerContentConfiguration,
  intlayerConfiguration,
  getConfiguration as getClientConfiguration,
} from './envVariables/index';
