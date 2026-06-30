import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import type {
  GetConfigurationResult,
  GetEditorDictionariesResult,
  WriteContentDeclarationBody,
  WriteContentDeclarationResult,
} from 'intlayer-editor';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getEditorAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const editorURL = intlayerConfig?.editor?.editorURL ?? editor.editorURL;

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

    return response.data as unknown as GetConfigurationResult;
  };

  /**
   * Get the Intlayer configuration
   */
  const getDictionaries = async (
    otherOptions: FetcherOptions = {}
  ): Promise<GetEditorDictionariesResult> => {
    const response = await fetcher<GetEditorDictionariesResult>(
      `${EDITOR_API_ROUTE}/dictionary`,
      authAPIOptions,
      otherOptions
    );

    return response.data as unknown as GetEditorDictionariesResult;
  };

  /**
   * Adds a new dictionary to the database.
   * @param dictionary - Dictionary data.
   */
  const writeDictionary = async (
    body: WriteContentDeclarationBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<WriteContentDeclarationResult>(
      `${EDITOR_API_ROUTE}/dictionary`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body,
      }
    );

  return {
    getDictionaries,
    getConfiguration,
    writeDictionary,
  };
};

/**
 * Authenticated `editor` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const editorEndpoint = createEndpoint(getEditorAPI);
