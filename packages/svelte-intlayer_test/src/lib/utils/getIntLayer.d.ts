import { type DictionaryKeys, type Plugins } from '@intlayer/core';
import type { LocalesValues } from 'intlayer';
export declare const getIntlayer: <
  T extends DictionaryKeys,
  L extends LocalesValues,
>(
  key: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => any;
