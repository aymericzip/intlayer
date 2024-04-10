import { getConfiguration } from './getConfiguration';

export type {
  CustomIntlayerConfig,
  FixedIntlayerConfig,
  IntlayerConfig,
  NotDerivedConfiguration,
  BaseDirDerivedConfiguration,
  ResultDirDerivedConfiguration,
} from './types';
export { Locales } from './defaultValues/locales';

export { getConfiguration };

export default {
  getConfiguration,
};
