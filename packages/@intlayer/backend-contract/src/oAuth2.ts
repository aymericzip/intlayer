import { z } from 'zod/mini';
import { dateTimeSchema } from './common';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
} from './defineRoute';
import { organizationSchema } from './organization';
import { projectSchema } from './project';
import { type ResponseData, responseDataSchema } from './responseData';
import { userSchema } from './user';

/** Access token issued for an access key (client credentials). */
export const oAuth2TokenSchema = z.looseObject({
  accessToken: z.string(),
  /** `null` for a token without expiry. */
  accessTokenExpiresAt: z.optional(z.nullable(dateTimeSchema)),
  grants: z.optional(z.array(z.string())),
  client: z.looseObject({ id: z.string(), grants: z.array(z.string()) }),
  user: userSchema,
  organization: organizationSchema,
  project: projectSchema,
});

/** REST contract of the OAuth2 client-credentials routes. */
export const oAuth2Contract = defineRouteGroup({
  prefix: '/oauth2',
  tag: 'OAuth2',
  routes: {
    getOAuth2AccessToken: defineRoute({
      method: 'POST',
      path: '/token',
      summary: 'Exchange access key credentials for an access token',
      schemas: {
        /**
         * Documented only: the OAuth2 server validates it (credentials may
         * also come from a Basic auth header) and answers spec errors.
         */
        body: z.looseObject({
          grant_type: z.optional(z.string()),
          client_id: z.optional(z.string()),
          client_secret: z.optional(z.string()),
        }),
        response: { 200: responseDataSchema(oAuth2TokenSchema) },
      },
    }),
    extendOAuth2Token: defineRoute({
      method: 'POST',
      path: '/token/extend',
      summary: 'Extend the lifetime of the current access token',
      schemas: {
        response: {
          200: responseDataSchema(
            z.object({
              accessToken: z.string(),
              accessTokenExpiresAt: dateTimeSchema,
            })
          ),
        },
      },
    }),
  },
});

/** Route definitions of the OAuth2 group, by name. */
export type OAuth2Routes = (typeof oAuth2Contract)['routes'];

export type OAuth2Token = z.output<typeof oAuth2TokenSchema>;
export type GetOAuth2TokenBody = RouteBodyInput<
  OAuth2Routes['getOAuth2AccessToken']
>;
export type GetOAuth2TokenResult = ResponseData<OAuth2Token>;
export type ExtendOAuth2TokenResult = ResponseData<{
  accessToken: string;
  accessTokenExpiresAt: string;
}>;
