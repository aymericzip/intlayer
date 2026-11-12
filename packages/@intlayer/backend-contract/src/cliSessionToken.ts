import { z } from 'zod/mini';
import { dateTimeSchema } from './common';
import { defineRoute, defineRouteGroup } from './defineRoute';
import { type OrganizationAPI, organizationSchema } from './organization';
import { type ProjectAPI, projectSchema } from './project';
import { type ResponseData, responseDataSchema } from './responseData';
import { type UserAPI, userSchema } from './user';

/** REST contract of the CLI session routes (`intlayer login`). */
export const cliSessionTokenContract = defineRouteGroup({
  prefix: '/api/cli-session',
  tag: 'CLI session',
  routes: {
    createCliSessionToken: defineRoute({
      method: 'POST',
      path: '/',
      summary: 'Issue a short-lived token for the CLI login handoff',
      schemas: {
        response: {
          200: responseDataSchema(
            z.object({ token: z.string(), expiresAt: dateTimeSchema })
          ),
        },
      },
    }),
    getCliSessionMe: defineRoute({
      method: 'GET',
      path: '/me',
      summary: 'User, organization and project bound to the CLI session token',
      schemas: {
        response: {
          200: responseDataSchema(
            z.object({
              project: projectSchema,
              // Optional: backends before 9.6 only return the project
              user: z.optional(z.nullable(userSchema)),
              organization: z.optional(z.nullable(organizationSchema)),
            })
          ),
        },
      },
    }),
  },
});

/** Route definitions of the CLI session group, by name. */
export type CliSessionTokenRoutes = (typeof cliSessionTokenContract)['routes'];

export type CreateCliSessionTokenResult = ResponseData<{
  token: string;
  expiresAt: string;
}>;
export type GetCliSessionMeResult = ResponseData<{
  project: ProjectAPI;
  user?: UserAPI | null;
  organization?: OrganizationAPI | null;
}>;
