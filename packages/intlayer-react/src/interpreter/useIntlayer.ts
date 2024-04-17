// disable ts error
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as dictionaries from '@intlayer/dictionariesEntryPoint';
import type { IntLayerDictionaryTypesConnector } from 'intlayer';
import { interpretContent } from './interpretJSON';

type DictionaryKeys = keyof IntLayerDictionaryTypesConnector;

type UseIntlayer = <T extends DictionaryKeys>(
  id: T
) => IntLayerDictionaryTypesConnector[T];

/**
 * @intlayer/dictionariesEntryPoint should match with an alias
 */
// const dictionaries = require('@intlayer/dictionariesEntryPoint');

export const useIntlayer: UseIntlayer = <T extends DictionaryKeys>(id: T) => {
  const dictionaryContent = dictionaries[id];

  return interpretContent(
    dictionaryContent
  ) as IntLayerDictionaryTypesConnector[T];
};
