import { z } from 'zod/mini';
import { objectIdSchema } from './common';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
  type RouteParams,
} from './defineRoute';
import {
  type EnvironmentAPI,
  environmentSchema,
  projectConfigurationSchema,
} from './project';
import { type ResponseData, responseDataSchema } from './responseData';

const environmentIdParamsSchema = z.object({ environmentId: objectIdSchema });

/** Every environment of the project, production first when virtual. */
const environmentsResponseSchema = responseDataSchema(
  z.array(environmentSchema)
);

/** REST contract of the `/api/project/environment` routes. */
export const environmentContract = defineRouteGroup({
  prefix: '/api/project/environment',
  tag: 'Environment',
  routes: {
    addEnvironment: defineRoute({
      method: 'POST',
      path: '/',
      summary: 'Create an environment in the selected project',
      schemas: {
        body: z.object({
          name: z.string(),
          configuration: z.optional(projectConfigurationSchema),
        }),
        response: { 200: environmentsResponseSchema },
      },
    }),
    updateEnvironment: defineRoute({
      method: 'PUT',
      path: '/:environmentId',
      summary: 'Rename or reconfigure an environment',
      schemas: {
        params: environmentIdParamsSchema,
        body: z.object({
          name: z.optional(z.string()),
          configuration: z.optional(projectConfigurationSchema),
        }),
        response: { 200: environmentsResponseSchema },
      },
    }),
    deleteEnvironment: defineRoute({
      method: 'DELETE',
      path: '/:environmentId',
      summary: 'Delete an environment',
      schemas: {
        params: environmentIdParamsSchema,
        response: { 200: environmentsResponseSchema },
      },
    }),
    resetToProductionEnvironment: defineRoute({
      method: 'PUT',
      path: '/production/select',
      summary: 'Select the production environment for the session',
      schemas: {
        response: { 200: responseDataSchema(z.nullable(environmentSchema)) },
      },
    }),
    selectEnvironment: defineRoute({
      method: 'PUT',
      path: '/:environmentId/select',
      summary: 'Select an environment for the session',
      schemas: {
        params: environmentIdParamsSchema,
        response: { 200: responseDataSchema(environmentSchema) },
      },
    }),
    migrateEnvironment: defineRoute({
      method: 'POST',
      path: '/migrate',
      summary: 'Copy dictionaries and configuration between environments',
      schemas: {
        body: z.object({
          /** Environment id, or `production` for the default environment. */
          sourceEnvironmentId: z.string(),
          targetEnvironmentId: z.string(),
          strategy: z.enum(['overwrite', 'fill-missing']),
          migrateContent: z.optional(z.boolean()),
          migrateConfiguration: z.optional(z.boolean()),
        }),
        response: {
          200: responseDataSchema(
            z.object({
              migratedDictionaries: z.number(),
              skippedDictionaries: z.number(),
              configurationMigrated: z.boolean(),
            })
          ),
        },
      },
    }),
  },
});

/** Route definitions of the `/api/project/environment` group, by name. */
export type EnvironmentRoutes = (typeof environmentContract)['routes'];

export type AddEnvironmentBody = RouteBodyInput<
  EnvironmentRoutes['addEnvironment']
>;
export type AddEnvironmentResult = ResponseData<EnvironmentAPI[]>;
export type UpdateEnvironmentParams = RouteParams<
  EnvironmentRoutes['updateEnvironment']
>;
export type UpdateEnvironmentBody = RouteBodyInput<
  EnvironmentRoutes['updateEnvironment']
>;
export type UpdateEnvironmentResult = ResponseData<EnvironmentAPI[]>;
export type DeleteEnvironmentParams = RouteParams<
  EnvironmentRoutes['deleteEnvironment']
>;
export type DeleteEnvironmentResult = ResponseData<EnvironmentAPI[]>;
export type SelectEnvironmentParams = RouteParams<
  EnvironmentRoutes['selectEnvironment']
>;
export type SelectEnvironmentResult = ResponseData<EnvironmentAPI>;
export type ResetToProductionEnvironmentResult =
  ResponseData<EnvironmentAPI | null>;
export type MigrateEnvironmentBody = RouteBodyInput<
  EnvironmentRoutes['migrateEnvironment']
>;
export type MigrateEnvironmentResult = ResponseData<{
  migratedDictionaries: number;
  skippedDictionaries: number;
  configurationMigrated: boolean;
}>;
