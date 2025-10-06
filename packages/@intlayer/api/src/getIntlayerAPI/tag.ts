import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { type FetcherOptions, fetcher } from '../fetcher';
import type {
  AddTagBody,
  AddTagResult,
  DeleteTagParams,
  DeleteTagResult,
  GetTagsParams,
  GetTagsResult,
  UpdateTagBody,
  UpdateTagParams,
  UpdateTagResult,
} from '../types';

export const getTagAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const PROJECT_API_ROUTE = `${backendURL}/api/tag`;

  /**
   * Retrieves a list of tags based on filters and pagination.
   * @param filters - Filters and pagination options.
   */
  const getTags = async (
    filters?: GetTagsParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetTagsResult>(
      PROJECT_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        params: filters,
      }
    );

  /**
   * Adds a new tag to the database.
   * @param tag - Tag data.
   */
  const addTag = async (tag: AddTagBody, otherOptions: FetcherOptions = {}) =>
    await fetcher<AddTagResult>(
      `${PROJECT_API_ROUTE}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: tag,
      }
    );

  /**
   * Updates an existing tag in the database.
   * @param tag - Updated tag data.
   */
  const updateTag = async (
    tagId: UpdateTagParams['tagId'],
    tag: UpdateTagBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateTagResult>(
      `${PROJECT_API_ROUTE}/${tagId}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'PUT',
        body: tag,
      }
    );

  /**
   * Deletes a tag from the database by its ID.
   * @param tagId - Tag ID.
   */
  const deleteTag = async (
    tagId: DeleteTagParams['tagId'],

    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DeleteTagResult>(
      `${PROJECT_API_ROUTE}/${tagId}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'DELETE',
      }
    );

  return {
    getTags,
    addTag,
    updateTag,
    deleteTag,
  };
};
