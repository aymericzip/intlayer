import { z } from 'zod/mini';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
} from './defineRoute';
import { type DictionaryAPI, dictionarySchema } from './dictionary';
import { type ResponseData, responseDataSchema } from './responseData';

/** Capabilities a public browser token may carry (deliberately narrow). */
export const publicBrowserScopeSchema = z.enum([
  /** Submit analytics events for the project (append-only). */
  'analytics:ingest',
  /** Read the project's published dictionary content (already public). */
  'dictionary:read',
]);

const publicBrowserTokenSchema = z.object({
  /** `null` when the key is unknown or the origin is not allowed. */
  token: z.nullable(z.string()),
  /** Capabilities granted; empty when no token was issued. */
  scopes: z.array(publicBrowserScopeSchema),
  /** Token lifetime in seconds; `0` when no token was issued. */
  expiresIn: z.number(),
});

/**
 * REST contract of the credential-free routes a browser SDK reaches on its
 * own (rate limited per IP).
 */
export const publicContract = defineRouteGroup({
  prefix: '/api/public',
  tag: 'Public',
  routes: {
    createPublicBrowserToken: defineRoute({
      method: 'POST',
      path: '/token',
      summary: 'Exchange a project public key for a scoped browser token',
      schemas: {
        body: z.optional(
          z.object({
            /** The project's public key (`editor.clientId`). */
            clientId: z.optional(z.string()),
          })
        ),
        response: { 200: responseDataSchema(publicBrowserTokenSchema) },
      },
    }),
    getPublicDictionaryKeys: defineRoute({
      method: 'GET',
      path: '/dictionaries/keys',
      summary: 'Keys of the published dictionaries (browser token)',
      schemas: {
        response: { 200: responseDataSchema(z.array(z.string())) },
      },
    }),
    getPublicDictionaries: defineRoute({
      method: 'GET',
      path: '/dictionaries',
      summary: 'Published dictionaries (browser token)',
      schemas: {
        querystring: z.object({
          /** Comma-separated dictionary keys to fetch. */
          keys: z.optional(z.string()),
        }),
        response: { 200: responseDataSchema(z.array(dictionarySchema)) },
      },
    }),
  },
});

/** Route definitions of the public group, by name. */
export type PublicRoutes = (typeof publicContract)['routes'];

export type PublicBrowserScope = z.output<typeof publicBrowserScopeSchema>;
export type CreatePublicBrowserTokenBody = NonNullable<
  RouteBodyInput<PublicRoutes['createPublicBrowserToken']>
>;
export type CreatePublicBrowserTokenResult = ResponseData<
  z.output<typeof publicBrowserTokenSchema>
>;
export type GetPublicDictionariesQuery = { keys?: string };
export type GetPublicDictionariesResult = ResponseData<DictionaryAPI[]>;
export type GetPublicDictionaryKeysResult = ResponseData<string[]>;
