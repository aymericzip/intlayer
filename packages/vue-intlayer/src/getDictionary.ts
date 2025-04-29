import type { Locales, LocalesValues } from '@intlayer/config/client';
import {
  DeepTransformContent,
  Dictionary,
  Plugins,
  getDictionary as getDictionaryCore,
} from '@intlayer/core';

export const getDictionary = <
  T extends Dictionary,
  L extends LocalesValues = Locales,
>(
  dictionary: T,
  locale?: L,
  additionalPlugins?: Plugins[]
) => {
  const plugins: Plugins[] = [...(additionalPlugins ?? [])];

  return getDictionaryCore(
    dictionary,
    locale,
    plugins
  ) as any as DeepTransformContent<T['content']>;
};
