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
  LogConfig,
  StrictMode,
  IntlayerConfig,
} from './types/config';
export type { LocalesValues } from './types/locales';
export { Locales } from './types/locales';
export {
  formatEnvVariable,
  getConfiguration as getClientConfiguration,
  loadEnvFile,
  getPlatform,
} from './envVariables/index';
export { ESMxCJSRequire } from './utils/ESMxCJSRequire';
export { logger } from './logger';
export { appLogger } from './appLoggerServer';
