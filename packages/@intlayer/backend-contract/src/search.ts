import { z } from 'zod/mini';
import {
  defineRoute,
  defineRouteGroup,
  type RouteQuerystring,
} from './defineRoute';
import { type ResponseData, responseDataSchema } from './responseData';

/** One documentation chunk matching a search. */
export const searchDocResultSchema = z.object({
  fileKey: z.string(),
  chunkNumber: z.number(),
  content: z.optional(z.string()),
  docUrl: z.string(),
  docName: z.string(),
  /** Front matter `priority` of the source file, from 1 to 10. */
  priority: z.optional(z.number()),
});

/** REST contract of the `/api/search` routes. */
export const searchContract = defineRouteGroup({
  prefix: '/api/search',
  tag: 'Search',
  routes: {
    doc: defineRoute({
      method: 'GET',
      path: '/doc',
      summary: 'Semantic search in the Intlayer documentation',
      schemas: {
        querystring: z.object({
          input: z.string(),
          limit: z.optional(z.string()),
          /** `true` to return the chunks content instead of their URLs. */
          returnContent: z.optional(z.string()),
        }),
        response: {
          200: responseDataSchema(
            z.union([z.array(z.string()), z.array(searchDocResultSchema)])
          ),
        },
      },
    }),
  },
});

/** Route definitions of the `/api/search` group, by name. */
export type SearchRoutes = (typeof searchContract)['routes'];

export type SearchDocResult = z.output<typeof searchDocResultSchema>;
export type SearchDocUtilParams = RouteQuerystring<SearchRoutes['doc']>;
export type SearchDocUtilResult = ResponseData<string[] | SearchDocResult[]>;
