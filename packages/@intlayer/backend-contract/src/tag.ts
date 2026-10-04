import { z } from 'zod/mini';
import {
  dateTimeSchema,
  objectIdSchema,
  paginationQueryShape,
  repeatableQueryValueSchema,
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

/** Tag editable fields: ownership (project, organization, creator) is set by the server. */
const tagFieldsShape = {
  key: z.string().check(z.minLength(1)),
  name: z.optional(z.string()),
  description: z.optional(z.string()),
  instructions: z.optional(z.string()),
};

/** Tag as returned by the API. */
export const tagSchema = z.looseObject({
  id: z.string(),
  ...tagFieldsShape,
  creatorId: z.string(),
  projectId: z.string(),
  organizationId: z.string(),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

const tagIdParamsSchema = z.object({ tagId: objectIdSchema });

/** REST contract of the `/api/tag` routes. */
export const tagContract = defineRouteGroup({
  prefix: '/api/tag',
  tag: 'Tag',
  routes: {
    getTags: defineRoute({
      method: 'GET',
      path: '/',
      summary: 'List the tags of the selected project',
      schemas: {
        querystring: z.looseObject({
          ...paginationQueryShape,
          ids: z.optional(repeatableQueryValueSchema),
          keys: z.optional(repeatableQueryValueSchema),
          name: z.optional(z.string()),
          search: z.optional(z.string()),
          organizationId: z.optional(z.string()),
          /** Admin only: list tags of every organization. */
          fetchAll: z.optional(z.enum(['true', 'false'])),
        }),
        response: { 200: paginatedResponseSchema(tagSchema) },
      },
    }),
    addTag: defineRoute({
      method: 'POST',
      path: '/',
      summary: 'Create a tag in the selected project',
      schemas: {
        body: z.object(tagFieldsShape),
        response: { 200: responseDataSchema(tagSchema) },
      },
    }),
    updateTag: defineRoute({
      method: 'PUT',
      path: '/:tagId',
      summary: 'Update a tag',
      schemas: {
        params: tagIdParamsSchema,
        body: z.partial(z.object(tagFieldsShape)),
        response: { 200: responseDataSchema(tagSchema) },
      },
    }),
    deleteTag: defineRoute({
      method: 'DELETE',
      path: '/:tagId',
      summary: 'Delete a tag',
      schemas: {
        params: tagIdParamsSchema,
        response: { 200: responseDataSchema(tagSchema) },
      },
    }),
  },
});

/** Route definitions of the `/api/tag` group, by name. */
export type TagRoutes = (typeof tagContract)['routes'];

export type TagAPI = z.output<typeof tagSchema>;
export type GetTagsParams = RouteQuerystring<TagRoutes['getTags']>;
export type GetTagsResult = PaginatedResponse<TagAPI>;
export type AddTagBody = RouteBodyInput<TagRoutes['addTag']>;
export type AddTagResult = ResponseData<TagAPI>;
export type UpdateTagParams = RouteParams<TagRoutes['updateTag']>;
export type UpdateTagBody = RouteBodyInput<TagRoutes['updateTag']>;
export type UpdateTagResult = ResponseData<TagAPI>;
export type DeleteTagParams = RouteParams<TagRoutes['deleteTag']>;
export type DeleteTagResult = ResponseData<TagAPI>;
