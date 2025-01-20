import type { Locales } from '@intlayer/config';
import type { DeclarationContent, DictionaryValue } from '@intlayer/core';
import { processDictionary } from './processDictionary/index';
import {
  DeepTransformContent,
  recursiveTransformContent,
} from './recursiveTransformContent';

type DataFromDictionary<
  T extends DeclarationContent,
  K extends Locales,
  R extends boolean = false,
> = DeepTransformContent<T['content'], K, R>;

export type UseDictionary = <
  T extends DeclarationContent,
  L extends Locales,
  R extends boolean = false,
>(
  dictionary: T,
  locale?: L,
  isRenderEditor?: R,
  isContentSelectable?: boolean
) => DataFromDictionary<T, L, R>;

/**
 * Hook that picks one dictionary by its id and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const getDictionary: UseDictionary = <
  T extends DeclarationContent,
  L extends Locales,
  R extends boolean = false,
>(
  dictionary: T,
  locale?: L,
  isRenderEditor: R = false as R
) => {
  const result = processDictionary(
    dictionary.content as DictionaryValue,
    dictionary.key,
    dictionary.filePath,
    [],
    locale
  );

  return recursiveTransformContent(
    result,
    isRenderEditor
  ) as DataFromDictionary<T, L, R>;
};
