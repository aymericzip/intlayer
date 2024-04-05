/* eslint-disable @typescript-eslint/no-var-requires */
import { relative, resolve } from 'path';
import type { IntLayerDictionaryTypesConnector } from 'intlayer';
import { getConfiguration } from 'intlayer-config';
import { interpretContent } from './interpretJSON';

const { mainDir } = getConfiguration();

type DictionaryKeys = keyof IntLayerDictionaryTypesConnector;

type UseIntlayer = <T extends DictionaryKeys>(
  id: T
) => IntLayerDictionaryTypesConnector[T];

// const dictionaries = require(resolve(mainDir, 'dictionaries.cjs'));

const dictionariesAbsolutePath = resolve(mainDir, 'dictionaries.cjs');
const dictionariesRelativePath = relative(__dirname, dictionariesAbsolutePath);
const dictionaries = require(`${dictionariesRelativePath}`);

export const useIntlayer: UseIntlayer = <T extends DictionaryKeys>(id: T) => {
  const dictionaryContent = dictionaries[id];

  return interpretContent(
    dictionaryContent
  ) as IntLayerDictionaryTypesConnector[T];
};
