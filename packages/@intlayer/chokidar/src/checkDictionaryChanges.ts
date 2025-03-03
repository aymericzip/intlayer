import { IntlayerEventListener } from '@intlayer/api';
// @ts-ignore: @intlayer/backend is not built yet
import type { DictionaryAPI } from '@intlayer/backend';
import { buildIntlayerDictionary } from './transpiler/declaration_file_to_dictionary/intlayer_dictionary/buildIntlayerDictionary';
import { getConfiguration, appLogger } from '@intlayer/config';

const writeDictionary = async (dictionary: DictionaryAPI) => {
  appLogger(`Writing dictionary ${dictionary.key}`);
  await buildIntlayerDictionary([dictionary]);
};

export const checkDictionaryChanges = async () => {
  const configuration = getConfiguration();

  const { editor } = configuration;

  if (!editor.hotReload) return;
  if (!editor.clientId) return;
  if (!editor.clientSecret) return;

  const eventSource = new IntlayerEventListener(configuration);

  try {
    await eventSource.initialize().then(() => {
      appLogger('Connected to Intlayer. Hot reload enabled');
    });
  } catch (error) {
    appLogger('Error initializing IntlayerEventListener:', {
      level: 'error',
    });
  }

  eventSource.onDictionaryAdded = writeDictionary;
  eventSource.onDictionaryChange = writeDictionary;
  eventSource.onDictionaryDeleted = writeDictionary;

  return eventSource;
};
