/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from 'path';
import type { IntLayerDictionaryTypesConnector } from 'intlayer';
import { getConfiguration } from 'intlayer-config';
import { interpretContent } from './interpretJSON';

const { mainDir } = getConfiguration();

type DictionaryKeys = keyof IntLayerDictionaryTypesConnector;

type UseIntlayer = <T extends DictionaryKeys>(
  id: T
) => IntLayerDictionaryTypesConnector[T];

export const useIntlayer: UseIntlayer = <T extends DictionaryKeys>(id: T) => {
  const dictionaries = require(resolve(mainDir, 'dictionaries.cjs'));
  const dictionaryContent = dictionaries[id];

  return interpretContent(
    dictionaryContent
  ) as IntLayerDictionaryTypesConnector[T];
};
