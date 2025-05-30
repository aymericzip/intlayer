import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { fetcher, type FetcherOptions } from '../fetcher';
import type {
  GetConfigurationResult,
  WriteContentDeclarationBody,
  WriteContentDeclarationResult,
} from '../types';

export const getEditorAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const editorURL =
    intlayerConfig?.editor?.editorURL ?? configuration.editor?.editorURL;

  if (!editorURL) {
    throw new Error('Editor URL is not defined in the Intlayer configuration.');
  }

  const EDITOR_API_ROUTE = `${editorURL}/api`;

  /**
   * Get the Intlayer configuration
   */
  const getConfiguration = async (
    otherOptions: FetcherOptions = {}
  ): Promise<GetConfigurationResult> => {
    const response = await fetcher<GetConfigurationResult>(
      `${EDITOR_API_ROUTE}/config`,
      authAPIOptions,
      otherOptions
    );

    return response.data;
  };

  /**
   * Get the Intlayer configuration
   */
  const getDictionaries = async (
    otherOptions: FetcherOptions = {}
  ): Promise<Record<string, any>> => {
    const response = await fetcher<Record<string, any>>(
      `${EDITOR_API_ROUTE}/dictionary`,
      authAPIOptions,
      otherOptions
    );

    return response.data;
  };

  /**
   * Adds a new dictionary to the database.
   * @param dictionary - Dictionary data.
   */
  const writeDictionary = async (
    dictionary: WriteContentDeclarationBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<WriteContentDeclarationResult>(
      `${EDITOR_API_ROUTE}/dictionary`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: { dictionary },
      }
    );

  return {
    getDictionaries,
    getConfiguration,
    writeDictionary,
  };
};
