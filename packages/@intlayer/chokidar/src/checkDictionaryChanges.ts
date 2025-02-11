import { IntlayerEventListener } from '@intlayer/api';
// @ts-ignore: @intlayer/backend is not built yet
import type { DictionaryAPI } from '@intlayer/backend';
import { buildIntlayerDictionary } from './transpiler/declaration_file_to_dictionary/intlayer_dictionary/buildIntlayerDictionary';

const writeDictionary = async (dictionary: DictionaryAPI) => {
  await buildIntlayerDictionary([dictionary]);
};

export const checkDictionaryChanges = () => {
  const eventSource = new IntlayerEventListener();

  eventSource.initialize();

  eventSource.onDictionaryAdded = writeDictionary;
  eventSource.onDictionaryChange = writeDictionary;
  eventSource.onDictionaryDeleted = writeDictionary;

  return eventSource;
};
