import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import type {
  // @ts-ignore: intlayer-editor is not built yet
  WriteContentDeclarationBody,
  // @ts-ignore: intlayer-editor is not built yet
  WriteContentDeclarationResult,
  // @ts-ignore: intlayer-editor is not built yet
} from 'intlayer-editor';
import { fetcher, type FetcherOptions } from '../fetcher';

export const getEditorAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const { editorURL } = (intlayerConfig ?? getConfiguration()).editor;
  const EDITOR_API_ROUTE = `${editorURL}/api`;

  /**
   * Adds a new dictionary to the database.
   * @param dictionary - Dictionary data.
   */
  const writeDictionary = async (
    dictionary: WriteContentDeclarationBody,
    otherOptions: FetcherOptions = {}
  ) => {
    await fetcher<WriteContentDeclarationResult>(
      `${EDITOR_API_ROUTE}/dictionary`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: dictionary,
      }
    );
  };

  return {
    writeDictionary,
  };
};

export const editorAPI = getEditorAPI();
