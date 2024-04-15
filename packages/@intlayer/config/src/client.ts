export type {
  CustomIntlayerConfig,
  PatternsContentConfig as FixedIntlayerConfig,
  IntlayerConfig,
  BaseContentConfig as NotDerivedConfiguration,
  BaseDerivedConfig as BaseDirDerivedConfiguration,
  ResultDirDerivedConfig as ResultDirDerivedConfiguration,
} from './types';
export { Locales } from './defaultValues/locales';
export {
  getConfiguration,
  intlayerConfiguration,
  intlayerContentConfiguration,
  intlayerIntlConfiguration,
  intlayerMiddlewareConfiguration,
} from './envVariables/getConfiguration';
