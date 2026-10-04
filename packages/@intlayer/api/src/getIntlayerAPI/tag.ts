import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  AddTagBody,
  AddTagResult,
  DeleteTagParams,
  DeleteTagResult,
  GetTagsParams,
  GetTagsResult,
  TagRoutes,
  tagContract,
  UpdateTagBody,
  UpdateTagParams,
  UpdateTagResult,
} from '@intlayer/backend-contract/tag';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Prefix of the routes, checked against the backend contract. */
const tagGroup = {
  prefix: '/api/tag',
} as const satisfies Pick<typeof tagContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const tagEndpoints = {
  getTags: { method: 'GET', path: '/' },
  addTag: { method: 'POST', path: '/' },
  updateTag: { method: 'PUT', path: '/:tagId' },
  deleteTag: { method: 'DELETE', path: '/:tagId' },
} as const satisfies RouteEndpoints<TagRoutes>;

export const getTagAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Retrieves a list of tags based on filters and pagination.
   * @param filters - Filters and pagination options.
   */
  const getTags = async (
    filters?: GetTagsParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetTagsResult>(
      buildRouteURL(backendURL, tagGroup, tagEndpoints.getTags),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        // @ts-ignore Number of parameter will be stringified by the fetcher
        params: filters,
      }
    );

  /**
   * Adds a new tag to the database.
   * @param tag - Tag data.
   */
  const addTag = async (tag: AddTagBody, otherOptions: FetcherOptions = {}) =>
    await fetcher<AddTagResult>(
      buildRouteURL(backendURL, tagGroup, tagEndpoints.addTag),
      authAPIOptions,
      otherOptions,
      {
        method: tagEndpoints.addTag.method,
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
      buildRouteURL(backendURL, tagGroup, tagEndpoints.updateTag, {
        tagId: String(tagId),
      }),
      authAPIOptions,
      otherOptions,
      {
        method: tagEndpoints.updateTag.method,
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
      buildRouteURL(backendURL, tagGroup, tagEndpoints.deleteTag, {
        tagId: String(tagId),
      }),
      authAPIOptions,
      otherOptions,
      {
        method: tagEndpoints.deleteTag.method,
      }
    );

  return {
    getTags,
    addTag,
    updateTag,
    deleteTag,
  };
};

/**
 * Authenticated `tag` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const tagEndpoint = createEndpoint(getTagAPI);
