import { internationalization } from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  conditionPlugin,
  enumerationPlugin,
  filePlugin,
  genderPlugin,
  insertionPlugin,
  nestedPlugin,
  type Plugins,
  translationPlugin,
} from './plugins';

export const getBasePlugins = (
  locale?: LocalesValues,
  fallback: boolean = true
): Plugins[] =>
  [
    translationPlugin(
      locale ?? internationalization.defaultLocale,
      fallback ? internationalization.defaultLocale : undefined
    ),
    enumerationPlugin,
    conditionPlugin,
    insertionPlugin,
    nestedPlugin(locale ?? internationalization.defaultLocale),
    filePlugin,
    genderPlugin,
  ] as Plugins[];
