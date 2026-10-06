import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import { z } from 'zod/mini';
import {
  isJSONObject,
  objectIdSchema,
  paginationQueryShape,
  repeatableQueryValueSchema,
  typedValueSchema,
} from './common';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
  type RouteParams,
  type RouteQuerystring,
} from './defineRoute';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
  type ResponseData,
  responseDataSchema,
} from './responseData';

/** Outcome of the last commit of a CMS edit to the source `.content` file. */
export type DictionarySourceSync = {
  status:
    | 'committed'
    | 'pull-request'
    | 'up-to-date'
    | 'file-not-found'
    | 'unsupported'
    | 'error';
  /** Commit (or pull request) link on the git provider. */
  url?: string;
  commitSha?: string;
  message?: string;
  syncedAt: string;
};

/** Fields the server adds to a stored dictionary. */
type DictionaryServerFields = {
  id: string;
  projectIds: string[];
  creatorId: string;
  /** Content versions, oldest first. */
  versionList: string[];
  /** Environment the dictionary belongs to; null = shared by all. */
  environmentId?: string | null;
  sourceSync?: DictionarySourceSync;
  createdAt: string;
  updatedAt: string;
};

/**
 * Dictionary as returned by the API: the `@intlayer/types` dictionary (the
 * framework-wide source of truth for content) plus the server fields.
 */
export type DictionaryAPI = Omit<Dictionary, keyof DictionaryServerFields> &
  DictionaryServerFields;

/** Whether a value looks like a dictionary (object with a string `key`). */
const isDictionaryLike = (value: unknown): boolean =>
  isJSONObject(value) && typeof value.key === 'string';

/** Dictionary as returned by the API (content documented as any JSON). */
export const dictionarySchema =
  typedValueSchema<DictionaryAPI>(isDictionaryLike);

/** Dictionary pushed by the CLI / editor (`@intlayer/types` shape). */
export const localDictionarySchema =
  typedValueSchema<Dictionary>(isDictionaryLike);

/** Content node of a dictionary (`@intlayer/types`). */
export const contentNodeSchema = typedValueSchema<ContentNode>();

/** Result of a push, per dictionary. */
const pushedDictionarySchema = z.object({
  key: z.string(),
  localId: z.string(),
  id: z.optional(z.string()),
});

export const pushDictionariesResultSchema = z.object({
  newDictionaries: z.array(pushedDictionarySchema),
  updatedDictionaries: z.array(pushedDictionarySchema),
  upToDateDictionaries: z.array(pushedDictionarySchema),
  error: z.array(
    z.object({
      id: z.optional(z.string()),
      key: z.string(),
      localId: z.optional(z.string()),
      message: z.string(),
    })
  ),
});

const dictionaryIdParamsSchema = z.object({ dictionaryId: objectIdSchema });

/** REST contract of the `/api/dictionary` routes. */
export const dictionaryContract = defineRouteGroup({
  prefix: '/api/dictionary',
  tag: 'Dictionary',
  routes: {
    getDictionaries: defineRoute({
      method: 'GET',
      path: '/',
      summary: 'List the dictionaries of the selected project',
      schemas: {
        querystring: z.looseObject({
          ...paginationQueryShape,
          ids: z.optional(repeatableQueryValueSchema),
          projectId: z.optional(z.string()),
          projectIds: z.optional(repeatableQueryValueSchema),
          organizationId: z.optional(z.string()),
          organizationIds: z.optional(repeatableQueryValueSchema),
          userId: z.optional(z.string()),
          userIds: z.optional(repeatableQueryValueSchema),
          creatorId: z.optional(z.string()),
          creatorIds: z.optional(repeatableQueryValueSchema),
          title: z.optional(z.string()),
          description: z.optional(z.string()),
          key: z.optional(z.string()),
          keys: z.optional(repeatableQueryValueSchema),
          tags: z.optional(repeatableQueryValueSchema),
          location: z.optional(z.enum(['remote', 'local', 'both', 'none'])),
        }),
        response: { 200: paginatedResponseSchema(dictionarySchema) },
      },
    }),
    getDictionariesKeys: defineRoute({
      method: 'GET',
      path: '/keys',
      summary: 'Keys of every dictionary of the selected project',
      schemas: {
        response: { 200: responseDataSchema(z.array(z.string())) },
      },
    }),
    getDictionariesUpdateTimestamp: defineRoute({
      method: 'GET',
      path: '/update',
      summary: 'Last update time (epoch ms) of each dictionary, by id',
      schemas: {
        response: {
          200: responseDataSchema(
            z.record(
              z.string(),
              z.object({ key: z.string(), updatedAt: z.number() })
            )
          ),
        },
      },
    }),
    getDictionariesByKeys: defineRoute({
      method: 'GET',
      path: '/by-keys',
      summary: 'Get several dictionaries by key',
      schemas: {
        querystring: z.object({
          /** Comma-separated string or repeated parameter. */
          keys: repeatableQueryValueSchema,
          version: z.optional(z.string()),
        }),
        response: { 200: responseDataSchema(z.array(dictionarySchema)) },
      },
    }),
    getDictionary: defineRoute({
      method: 'GET',
      path: '/:dictionaryKey',
      summary: 'Get a dictionary by key',
      schemas: {
        params: z.object({
          dictionaryKey: z.string().check(z.minLength(1), z.maxLength(255)),
        }),
        querystring: z.object({ version: z.optional(z.string()) }),
        response: { 200: responseDataSchema(dictionarySchema) },
      },
    }),
    addDictionary: defineRoute({
      method: 'POST',
      path: '/',
      summary: 'Create a dictionary in the selected project',
      schemas: {
        body: z.object({
          dictionary: z.looseObject({
            key: z.string().check(z.minLength(1)),
            projectIds: z.array(z.string()),
            content: z.optional(contentNodeSchema),
            title: z.optional(z.string()),
            description: z.optional(z.string()),
            priority: z.optional(z.number()),
            importMode: z.optional(z.enum(['static', 'dynamic', 'fetch'])),
            tags: z.optional(z.array(z.string())),
            environmentId: z.optional(z.string()),
          }),
        }),
        response: { 200: responseDataSchema(dictionarySchema) },
      },
    }),
    pushDictionaries: defineRoute({
      method: 'PATCH',
      path: '/',
      summary: 'Push local dictionaries (CLI): create or version them',
      schemas: {
        body: z.object({ dictionaries: z.array(localDictionarySchema) }),
        response: { 200: responseDataSchema(pushDictionariesResultSchema) },
      },
    }),
    updateDictionary: defineRoute({
      method: 'PUT',
      path: '/:dictionaryId',
      summary: 'Update a dictionary of the selected project',
      schemas: {
        params: dictionaryIdParamsSchema,
        body: typedValueSchema<Partial<DictionaryAPI>>(isJSONObject),
        response: { 200: responseDataSchema(dictionarySchema) },
      },
    }),
    deleteDictionary: defineRoute({
      method: 'DELETE',
      path: '/:dictionaryId',
      summary: 'Delete a dictionary of the selected project',
      schemas: {
        params: dictionaryIdParamsSchema,
        response: { 200: responseDataSchema(dictionarySchema) },
      },
    }),
  },
});

/** Route definitions of the `/api/dictionary` group, by name. */
export type DictionaryRoutes = (typeof dictionaryContract)['routes'];

export type PushDictionariesResultData = z.output<
  typeof pushDictionariesResultSchema
>;
export type GetDictionariesParams = RouteQuerystring<
  DictionaryRoutes['getDictionaries']
>;
export type GetDictionariesResult = PaginatedResponse<DictionaryAPI>;
export type GetDictionariesKeysResult = ResponseData<string[]>;
export type GetDictionariesUpdateTimestampResult = ResponseData<
  Record<string, { key: string; updatedAt: number }>
>;
export type GetDictionaryParams = RouteParams<
  DictionaryRoutes['getDictionary']
>;
export type GetDictionaryQuery = RouteQuerystring<
  DictionaryRoutes['getDictionary']
>;
export type GetDictionaryResult = ResponseData<DictionaryAPI>;
export type GetDictionariesByKeysQuery = RouteQuerystring<
  DictionaryRoutes['getDictionariesByKeys']
>;
export type GetDictionariesByKeysResult = ResponseData<DictionaryAPI[]>;
export type AddDictionaryBody = RouteBodyInput<
  DictionaryRoutes['addDictionary']
>;
export type AddDictionaryResult = ResponseData<DictionaryAPI>;
export type PushDictionariesBody = RouteBodyInput<
  DictionaryRoutes['pushDictionaries']
>;
export type PushDictionariesResult = ResponseData<PushDictionariesResultData>;
export type UpdateDictionaryParam = RouteParams<
  DictionaryRoutes['updateDictionary']
>;
export type UpdateDictionaryBody = RouteBodyInput<
  DictionaryRoutes['updateDictionary']
>;
export type UpdateDictionaryResult = ResponseData<DictionaryAPI>;
export type DeleteDictionaryParam = RouteParams<
  DictionaryRoutes['deleteDictionary']
>;
export type DeleteDictionaryResult = ResponseData<DictionaryAPI>;
