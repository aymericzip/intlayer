import type { Locale } from '@intlayer/types/allLocales';
import type { AiConfig, URLType } from '@intlayer/types/config';
import { z } from 'zod/mini';
import {
  dateTimeSchema,
  objectIdSchema,
  paginationQueryShape,
  repeatableQueryValueSchema,
  typedStringSchema,
  typedValueSchema,
} from './common';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBody,
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

/** Locale code (ex: `en`, `fr-CA`). */
export const localeSchema = typedStringSchema<Locale>();

/** Project AI settings: the Intlayer AI config plus the masked key state. */
export type ProjectConfigAI = Partial<AiConfig> & {
  /** Masked API key (`sk-proj-****abcd`), never the real one. */
  apiKey?: string;
  apiKeyConfigured?: boolean;
};

/**
 * Project-level overrides of the Intlayer configuration. Loose objects: the
 * CLI pushes whole config sections, unknown keys must reach the service.
 */
export const projectConfigurationSchema = z.looseObject({
  internationalization: z.optional(
    z.looseObject({
      locales: z.optional(z.array(localeSchema)),
      defaultLocale: z.optional(localeSchema),
    })
  ),
  editor: z.optional(
    z.looseObject({
      applicationURL: z.optional(typedStringSchema<URLType>()),
      cmsURL: z.optional(typedStringSchema<URLType>()),
    })
  ),
  ai: z.optional(typedValueSchema<ProjectConfigAI>()),
});

/** Generic build webhook (Vercel, Netlify, custom). */
export const webhookSchema = z.looseObject({
  id: z.optional(z.string()),
  name: z.string(),
  url: z.string(),
  enabled: z.optional(z.boolean()),
  /** Optional signature secret. */
  secret: z.optional(z.string()),
});

/** Build triggers: git provider pipeline + generic webhooks. */
export const projectCISchema = z.object({
  autoTriggerBuilds: z.optional(z.boolean()),
  /** Commit CMS edits of `hybrid` dictionaries back to their source file. */
  autoCommitDictionaries: z.optional(z.boolean()),
  webhooks: z.optional(z.array(webhookSchema)),
});

/** Git provider of a connected repository. */
export const repositoryProviderSchema = z.enum([
  'github',
  'gitlab',
  'bitbucket',
  'codeberg',
  'gitee',
]);

const baseRepositoryShape = {
  owner: z.string(),
  repository: z.string(),
  branch: z.string(),
  url: z.string(),
  configFilePath: z.string(),
};

/**
 * Git repository connected to a project. The repo-scoped token never leaves
 * the server.
 */
export const repositoryConnectionSchema = z.discriminatedUnion('provider', [
  z.looseObject({
    provider: z.literal('github'),
    ...baseRepositoryShape,
    installationId: z.optional(z.number()),
  }),
  z.looseObject({
    provider: z.literal('gitlab'),
    ...baseRepositoryShape,
    projectId: z.optional(z.number()),
    /** Custom GitLab instance URL (ex: https://gitlab.company.com). */
    instanceUrl: z.optional(z.string()),
  }),
  z.looseObject({
    provider: z.literal('bitbucket'),
    ...baseRepositoryShape,
    workspace: z.string(),
  }),
  z.looseObject({ provider: z.literal('codeberg'), ...baseRepositoryShape }),
  z.looseObject({ provider: z.literal('gitee'), ...baseRepositoryShape }),
]);

/** null = unrestricted, [] = no access, array = allowed ids (null = production). */
const allowedEnvironmentIdsSchema = z.nullable(z.array(z.nullable(z.string())));
/** null = unrestricted, [] = no access, array = allowed locales. */
const allowedLocalesSchema = z.nullable(z.array(localeSchema));

/** Project environment (production is injected when none is the default). */
export const environmentSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  isDefault: z.boolean(),
  configuration: z.optional(projectConfigurationSchema),
  createdAt: z.optional(dateTimeSchema),
  updatedAt: z.optional(dateTimeSchema),
});

/** Granular per-member access, overlaid on the member's role. */
export const projectMemberGranularAccessSchema = z.object({
  userId: z.string(),
  allowedEnvironmentIds: allowedEnvironmentIdsSchema,
  allowedLocales: allowedLocalesSchema,
});

/** Access key (OAuth2 client credentials). Live bearer tokens are never sent. */
export const accessKeySchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  clientId: z.string(),
  /** Shown to project members (dashboard copy, CLI login). */
  clientSecret: z.string(),
  grants: z.array(z.string()),
  userId: z.string(),
  expiresAt: z.optional(z.nullable(dateTimeSchema)),
  allowedEnvironmentIds: z.optional(allowedEnvironmentIdsSchema),
  allowedLocales: z.optional(allowedLocalesSchema),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

/** Project as returned by the API. */
export const projectSchema = z.looseObject({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  membersIds: z.array(z.string()),
  adminsIds: z.array(z.string()),
  viewersIds: z.optional(z.array(z.string())),
  memberAccess: z.optional(z.array(projectMemberGranularAccessSchema)),
  creatorId: z.string(),
  configuration: z.optional(projectConfigurationSchema),
  repository: z.optional(z.nullable(repositoryConnectionSchema)),
  webhooks: z.optional(projectCISchema),
  autoFill: z.optional(z.boolean()),
  /** Screenshot of the application URL, generated automatically. */
  imageUrl: z.optional(z.string()),
  environments: z.optional(z.array(environmentSchema)),
  oAuth2Access: z.array(accessKeySchema),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

/** Translation health of one locale of a project. */
export const localeInsightSchema = z.object({
  locale: localeSchema,
  isDefault: z.boolean(),
  translatedKeys: z.number(),
  totalKeys: z.number(),
  missingKeys: z.number(),
  /** Ratio in the `[0, 1]` range. */
  completionRate: z.number(),
});

/** Project-wide localization insights shown on the dashboard overview. */
export const projectInsightsSchema = z.object({
  projectId: z.string(),
  /** Unix epoch (ms) at which the snapshot was computed. */
  generatedAt: z.number(),
  defaultLocale: z.nullable(localeSchema),
  localeCount: z.number(),
  dictionaryCount: z.number(),
  keyCount: z.number(),
  translationUnitCount: z.number(),
  translatedUnitCount: z.number(),
  overallCompletionRate: z.number(),
  fullyTranslatedLocaleCount: z.number(),
  dictionariesWithMissingTranslations: z.number(),
  missingTranslationCount: z.number(),
  localeInsights: z.array(localeInsightSchema),
  recentlyUpdated: z.array(
    z.object({ key: z.string(), updatedAt: z.number() })
  ),
  lastUpdatedAt: z.nullable(z.number()),
  memberCount: z.number(),
  adminCount: z.number(),
  environmentCount: z.number(),
  autoFill: z.boolean(),
  aiConfigured: z.boolean(),
  repositoryProvider: z.nullable(repositoryProviderSchema),
  applicationURL: z.nullable(z.string()),
});

/** CI configuration file status of the connected repository. */
export const ciStatusSchema = z.object({
  exists: z.boolean(),
  content: z.string(),
  path: z.string(),
  fileUrl: z.optional(z.string()),
  allowAutoPush: z.boolean(),
});

const projectIdParamsSchema = z.object({ projectId: objectIdSchema });
const clientIdBodySchema = z.object({ clientId: z.string() });

const ciTargetResultSchema = z.object({
  target: z.string(),
  success: z.boolean(),
  message: z.optional(z.string()),
});

/** REST contract of the `/api/project` routes. */
export const projectContract = defineRouteGroup({
  prefix: '/api/project',
  tag: 'Project',
  routes: {
    getProjects: defineRoute({
      method: 'GET',
      path: '/',
      summary: 'List the projects visible to the session',
      schemas: {
        querystring: z.looseObject({
          ...paginationQueryShape,
          ids: z.optional(repeatableQueryValueSchema),
          name: z.optional(z.string()),
          search: z.optional(z.string()),
          organizationId: z.optional(z.string()),
          membersIds: z.optional(repeatableQueryValueSchema),
          sortBy: z.optional(z.string()),
          sortOrder: z.optional(z.string()),
          /** Admin only: list projects of every organization. */
          fetchAll: z.optional(z.enum(['true', 'false'])),
        }),
        response: { 200: paginatedResponseSchema(projectSchema) },
      },
    }),
    getProjectInsights: defineRoute({
      method: 'GET',
      path: '/insights',
      summary: 'Localization insights of the selected project',
      schemas: {
        response: { 200: responseDataSchema(projectInsightsSchema) },
      },
    }),
    addProject: defineRoute({
      method: 'POST',
      path: '/',
      summary: 'Create a project in the selected organization',
      schemas: {
        body: z.looseObject({ name: z.string().check(z.minLength(1)) }),
        response: { 200: responseDataSchema(projectSchema) },
      },
    }),
    updateProject: defineRoute({
      method: 'PUT',
      path: '/',
      summary: 'Update the selected project',
      schemas: {
        /**
         * Allow-list: membership and ownership fields (`adminsIds`,
         * `membersIds`, `viewersIds`, `creatorId`, `memberAccess`,
         * `environments`) are stripped, they only change through their
         * dedicated endpoints and the invariants those enforce.
         */
        body: z.object({
          name: z.optional(z.string().check(z.minLength(1))),
          configuration: z.optional(projectConfigurationSchema),
          autoFill: z.optional(z.boolean()),
          webhooks: z.optional(projectCISchema),
          /** `null` disconnects the repository. */
          repository: z.optional(z.nullable(repositoryConnectionSchema)),
        }),
        response: { 200: responseDataSchema(projectSchema) },
      },
    }),
    updateProjectMembers: defineRoute({
      method: 'PUT',
      path: '/members',
      summary: 'Replace the members of the selected project',
      schemas: {
        body: z.object({
          membersIds: z.optional(
            z.array(
              z.object({
                userId: objectIdSchema,
                isAdmin: z.optional(z.boolean()),
              })
            )
          ),
        }),
        response: { 200: responseDataSchema(projectSchema) },
      },
    }),
    pushProjectConfiguration: defineRoute({
      method: 'PUT',
      path: '/configuration',
      summary: 'Push the local Intlayer configuration to the project',
      schemas: {
        body: projectConfigurationSchema,
        response: { 200: responseDataSchema(projectConfigurationSchema) },
      },
    }),
    deleteProject: defineRoute({
      method: 'DELETE',
      path: '/',
      summary: 'Delete the selected project',
      schemas: {
        response: { 200: responseDataSchema(projectSchema) },
      },
    }),
    selectProject: defineRoute({
      method: 'PUT',
      path: '/:projectId',
      summary: 'Select a project for the current session',
      schemas: {
        params: projectIdParamsSchema,
        response: { 200: responseDataSchema(projectSchema) },
      },
    }),
    unselectProject: defineRoute({
      method: 'POST',
      path: '/logout',
      summary: 'Unselect the project of the current session',
      schemas: {
        response: { 200: responseDataSchema(z.null()) },
      },
    }),
    addNewAccessKey: defineRoute({
      method: 'POST',
      path: '/access_key',
      summary: 'Create an access key for the selected project',
      schemas: {
        body: z.object({
          name: z.string().check(z.minLength(1)),
          grants: z.array(z.string()),
          /** ISO date-time, parsed to a `Date`; omitted for a key that never expires. */
          expiresAt: z.optional(
            z.pipe(
              z.iso.datetime(),
              z.transform((value) => new Date(value))
            )
          ),
          allowedEnvironmentIds: z.optional(allowedEnvironmentIdsSchema),
          allowedLocales: z.optional(allowedLocalesSchema),
        }),
        response: { 200: responseDataSchema(accessKeySchema) },
      },
    }),
    refreshAccessKey: defineRoute({
      method: 'PATCH',
      path: '/access_key',
      summary: 'Regenerate the secret of an access key',
      schemas: {
        body: clientIdBodySchema,
        response: { 200: responseDataSchema(accessKeySchema) },
      },
    }),
    deleteAccessKey: defineRoute({
      method: 'DELETE',
      path: '/access_key',
      summary: 'Delete an access key',
      schemas: {
        body: clientIdBodySchema,
        response: { 200: responseDataSchema(z.null()) },
      },
    }),
    triggerBuild: defineRoute({
      method: 'POST',
      path: '/build',
      summary: 'Trigger the CI pipelines and webhooks of the project',
      schemas: {
        response: {
          200: responseDataSchema(
            z.object({ results: z.array(ciTargetResultSchema) })
          ),
        },
      },
    }),
    triggerWebhook: defineRoute({
      method: 'POST',
      path: '/webhook',
      summary: 'Trigger a single project webhook',
      schemas: {
        body: z.object({ webhookIndex: z.int().check(z.gte(0)) }),
        response: { 200: responseDataSchema(ciTargetResultSchema) },
      },
    }),
    getCIConfiguration: defineRoute({
      method: 'GET',
      path: '/ci',
      summary: 'CI configuration status of the connected repository',
      schemas: {
        response: { 200: responseDataSchema(ciStatusSchema) },
      },
    }),
    pushCIConfiguration: defineRoute({
      method: 'POST',
      path: '/ci',
      summary: 'Commit the CI configuration file to the repository',
      schemas: {
        response: {
          200: responseDataSchema(z.object({ success: z.boolean() })),
        },
      },
    }),
    deleteProjectByIdAdmin: defineRoute({
      method: 'DELETE',
      path: '/:projectId/admin',
      summary: 'Admin only: delete any project',
      schemas: {
        params: projectIdParamsSchema,
        response: { 200: responseDataSchema(projectSchema) },
      },
    }),
    updateMemberAccess: defineRoute({
      method: 'PUT',
      path: '/member/:userId/access',
      summary: 'Restrict the environments and locales of a project member',
      schemas: {
        params: z.object({ userId: objectIdSchema }),
        body: z.object({
          allowedEnvironmentIds: allowedEnvironmentIdsSchema,
          allowedLocales: allowedLocalesSchema,
        }),
        response: {
          200: responseDataSchema(projectMemberGranularAccessSchema),
        },
      },
    }),
  },
});

/** Route definitions of the `/api/project` group, by name. */
export type ProjectRoutes = (typeof projectContract)['routes'];

// Entity types
export type ProjectConfiguration = z.output<typeof projectConfigurationSchema>;
export type Webhook = z.output<typeof webhookSchema>;
export type ProjectConfigCI = z.output<typeof projectCISchema>;
export type RepositoryProvider = z.output<typeof repositoryProviderSchema>;
export type RepositoryConnection = z.output<typeof repositoryConnectionSchema>;
export type EnvironmentAPI = z.output<typeof environmentSchema>;
export type ProjectMemberGranularAccessAPI = z.output<
  typeof projectMemberGranularAccessSchema
>;
export type OAuth2AccessAPI = z.output<typeof accessKeySchema>;
export type ProjectAPI = z.output<typeof projectSchema>;
export type ProjectInsights = z.output<typeof projectInsightsSchema>;
export type CIStatus = z.output<typeof ciStatusSchema>;

// Request / response types
export type GetProjectsParams = RouteQuerystring<ProjectRoutes['getProjects']>;
export type GetProjectsResult = PaginatedResponse<ProjectAPI>;
export type GetProjectInsightsResult = ResponseData<ProjectInsights>;
export type AddProjectBody = RouteBodyInput<ProjectRoutes['addProject']>;
export type AddProjectResult = ResponseData<ProjectAPI>;
export type UpdateProjectBody = RouteBodyInput<ProjectRoutes['updateProject']>;
export type UpdateProjectResult = ResponseData<ProjectAPI>;
export type UpdateProjectMembersBody = RouteBodyInput<
  ProjectRoutes['updateProjectMembers']
>;
export type UpdateProjectMembersResult = ResponseData<ProjectAPI>;
export type PushProjectConfigurationBody = RouteBodyInput<
  ProjectRoutes['pushProjectConfiguration']
>;
export type PushProjectConfigurationResult = ResponseData<ProjectConfiguration>;
export type DeleteProjectResult = ResponseData<ProjectAPI>;
export type SelectProjectParam = RouteParams<ProjectRoutes['selectProject']>;
export type SelectProjectResult = ResponseData<ProjectAPI>;
export type UnselectProjectResult = ResponseData<null>;
/** `expiresAt` also accepts a `Date`: JSON serializes it to an ISO string. */
export type AddNewAccessKeyBody = Omit<
  RouteBodyInput<ProjectRoutes['addNewAccessKey']>,
  'expiresAt'
> & { expiresAt?: Date | string };
export type AddNewAccessKeyResponse = ResponseData<OAuth2AccessAPI>;
export type RefreshAccessKeyBody = RouteBody<ProjectRoutes['refreshAccessKey']>;
export type RefreshAccessKeyResponse = ResponseData<OAuth2AccessAPI>;
export type DeleteAccessKeyBody = RouteBody<ProjectRoutes['deleteAccessKey']>;
export type DeleteAccessKeyResponse = ResponseData<null>;
export type TriggerBuildResult = ResponseData<{
  results: z.output<typeof ciTargetResultSchema>[];
}>;
export type TriggerWebhookBody = RouteBody<ProjectRoutes['triggerWebhook']>;
export type TriggerWebhookResult = ResponseData<
  z.output<typeof ciTargetResultSchema>
>;
export type GetCIConfigurationResult = ResponseData<CIStatus>;
export type PushCIConfigurationResult = ResponseData<{ success: boolean }>;
export type DeleteProjectByIdAdminResult = ResponseData<ProjectAPI>;
export type UpdateMemberAccessParams = RouteParams<
  ProjectRoutes['updateMemberAccess']
>;
export type UpdateMemberAccessBody = RouteBodyInput<
  ProjectRoutes['updateMemberAccess']
>;
export type UpdateMemberAccessResult =
  ResponseData<ProjectMemberGranularAccessAPI>;
