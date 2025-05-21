import { IntlayerEventListener } from '@intlayer/api';
// @ts-ignore: @intlayer/backend is not built yet
import type { DictionaryAPI } from '@intlayer/backend';
import {
  getAppLogger,
  getConfiguration,
  IntlayerConfig,
} from '@intlayer/config';
import { buildIntlayerDictionary } from './transpiler/declaration_file_to_dictionary/intlayer_dictionary/buildIntlayerDictionary';

const writeDictionary = async (
  dictionary: DictionaryAPI,
  configuration: IntlayerConfig
) => {
  const appLogger = getAppLogger(configuration);
  appLogger(`Writing dictionary ${dictionary.key}`);
  await buildIntlayerDictionary([dictionary]);
};

export const checkDictionaryChanges = async () => {
  const configuration = getConfiguration();
  const appLogger = getAppLogger(configuration);

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

  eventSource.onDictionaryAdded = (dictionary) =>
    writeDictionary(dictionary, configuration);
  eventSource.onDictionaryChange = (dictionary) =>
    writeDictionary(dictionary, configuration);
  eventSource.onDictionaryDeleted = (dictionary) =>
    writeDictionary(dictionary, configuration);

  return eventSource;
};
