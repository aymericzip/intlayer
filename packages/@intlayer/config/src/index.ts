import { getConfiguration } from './getConfiguration';

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
  getConfiguration as getClientConfiguration,
  intlayerConfiguration,
} from './envConfiguration';

export { getConfiguration };

export default {
  getConfiguration,
};
