import type {
  // @ts-ignore: @intlayer/backend is not built yet
  AddTagBody,
  // @ts-ignore: @intlayer/backend is not built yet
  AddTagResult,
  // @ts-ignore: @intlayer/backend is not built yet
  DeleteTagParams,
  // @ts-ignore: @intlayer/backend is not built yet
  DeleteTagResult,
  // @ts-ignore: @intlayer/backend is not built yet
  GetTagsParams,
  // @ts-ignore: @intlayer/backend is not built yet
  GetTagsResult,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdateTagBody,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdateTagParams,
  // @ts-ignore: @intlayer/backend is not built yet
  UpdateTagResult,
  // @ts-ignore @intlayer/backend is not build yet
} from '@intlayer/backend';
import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import { fetcher, type FetcherOptions } from '../fetcher';

export const getTagAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const { backendURL } = (intlayerConfig ?? getConfiguration()).editor;
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

export const tagAPI = getTagAPI();
