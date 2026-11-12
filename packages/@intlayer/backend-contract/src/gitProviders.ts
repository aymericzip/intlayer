import { z } from 'zod/mini';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
  type RouteQuerystring,
} from './defineRoute';
import { type ResponseData, responseDataSchema } from './responseData';

/**
 * Git provider OAuth + repository routes (repository linking in the
 * dashboard). Each provider gets its own group; the shapes below are shared.
 */

const authUrlResponseSchema = responseDataSchema(
  z.object({ authUrl: z.string() })
);
const tokenResponseSchema = responseDataSchema(z.object({ token: z.string() }));
const checkConfigResponseSchema = responseDataSchema(
  z.object({ hasConfig: z.boolean(), configPaths: z.array(z.string()) })
);
const configFileResponseSchema = responseDataSchema(
  z.object({ content: z.string() })
);

/** Optional provider token: defaults to the one linked to the user. */
const tokenShape = { token: z.optional(z.string()) };
const branchAndPathShape = {
  branch: z.optional(z.string()),
  path: z.optional(z.string()),
};

/** GitHub repository (subset of the REST API item the dashboard reads). */
export const gitHubRepositorySchema = z.looseObject({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  owner: z.looseObject({
    login: z.string(),
    avatar_url: z.optional(z.string()),
  }),
  private: z.boolean(),
  html_url: z.string(),
  default_branch: z.optional(z.string()),
  updated_at: z.optional(z.nullable(z.string())),
});

/** GitLab project (subset the dashboard reads). */
export const gitLabProjectSchema = z.looseObject({
  id: z.number(),
  name: z.string(),
  path_with_namespace: z.string(),
  web_url: z.string(),
  default_branch: z.string(),
  visibility: z.string(),
  last_activity_at: z.string(),
  namespace: z.looseObject({
    id: z.number(),
    name: z.string(),
    path: z.string(),
  }),
});

/** Bitbucket repository (subset the dashboard reads). */
export const bitbucketRepositorySchema = z.looseObject({
  uuid: z.string(),
  name: z.string(),
  full_name: z.string(),
  slug: z.string(),
  mainbranch: z.optional(z.looseObject({ name: z.string(), type: z.string() })),
  links: z.looseObject({ html: z.looseObject({ href: z.string() }) }),
  workspace: z.looseObject({
    slug: z.string(),
    name: z.string(),
    uuid: z.string(),
  }),
  is_private: z.optional(z.boolean()),
  updated_on: z.optional(z.string()),
});

/**
 * Repository of a Gitea-compatible forge (Codeberg/Forgejo, Gitee), normalized
 * by the backend. `name` is the URL slug used in API paths.
 */
export const forgeRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  /** Human-readable name (can differ from the slug on Gitee). */
  displayName: z.string(),
  full_name: z.string(),
  owner: z.object({
    login: z.string(),
    avatar_url: z.optional(z.string()),
  }),
  private: z.boolean(),
  html_url: z.string(),
  default_branch: z.optional(z.string()),
  updated_at: z.optional(z.nullable(z.string())),
});

const forgeRepositoryShape = {
  ...tokenShape,
  owner: z.string(),
  repository: z.string(),
};

/**
 * Builds the contract of a Gitea-compatible forge: repositories are listed and
 * read with the account linked through better-auth.
 */
const defineForgeContract = <Prefix extends string, Tag extends string>(
  prefix: Prefix,
  tag: Tag
) =>
  defineRouteGroup({
    prefix,
    tag,
    routes: {
      listRepos: defineRoute({
        method: 'GET',
        path: '/repos',
        summary: `Repositories of the ${tag} account`,
        schemas: {
          querystring: z.object(tokenShape),
          response: {
            200: responseDataSchema(z.array(forgeRepositorySchema)),
          },
        },
      }),
      checkConfig: defineRoute({
        method: 'POST',
        path: '/check-config',
        summary: 'Find Intlayer configuration files in a repository',
        schemas: {
          body: z.object({
            ...forgeRepositoryShape,
            branch: z.optional(z.string()),
          }),
          response: { 200: checkConfigResponseSchema },
        },
      }),
      getConfigFile: defineRoute({
        method: 'POST',
        path: '/get-config-file',
        summary: 'Read an Intlayer configuration file of a repository',
        schemas: {
          body: z.object({ ...forgeRepositoryShape, ...branchAndPathShape }),
          response: { 200: configFileResponseSchema },
        },
      }),
    },
  });

/** REST contract of the `/api/codeberg` routes (Codeberg / Forgejo). */
export const codebergContract = defineForgeContract(
  '/api/codeberg',
  'Codeberg'
);

/** REST contract of the `/api/gitee` routes. */
export const giteeContract = defineForgeContract('/api/gitee', 'Gitee');

/** REST contract of the `/api/github` routes. */
export const githubContract = defineRouteGroup({
  prefix: '/api/github',
  tag: 'GitHub',
  routes: {
    getAuthUrl: defineRoute({
      method: 'GET',
      path: '/auth-url',
      summary: 'GitHub OAuth authorization URL',
      schemas: {
        querystring: z.object({
          redirectUri: z.string(),
          login: z.optional(z.string()),
        }),
        response: { 200: authUrlResponseSchema },
      },
    }),
    authCallback: defineRoute({
      method: 'POST',
      path: '/auth',
      summary: 'Exchange the OAuth code for a GitHub token',
      schemas: {
        body: z.object({ code: z.string() }),
        response: { 200: tokenResponseSchema },
      },
    }),
    listRepos: defineRoute({
      method: 'GET',
      path: '/repos',
      summary: 'Repositories of the GitHub account',
      schemas: {
        querystring: z.object(tokenShape),
        response: {
          200: responseDataSchema(z.array(gitHubRepositorySchema)),
        },
      },
    }),
    checkConfig: defineRoute({
      method: 'POST',
      path: '/check-config',
      summary: 'Find Intlayer configuration files in a repository',
      schemas: {
        body: z.object({
          ...tokenShape,
          owner: z.string(),
          repository: z.string(),
          branch: z.optional(z.string()),
        }),
        response: { 200: checkConfigResponseSchema },
      },
    }),
    getConfigFile: defineRoute({
      method: 'POST',
      path: '/get-config-file',
      summary: 'Read an Intlayer configuration file of a repository',
      schemas: {
        body: z.object({
          ...tokenShape,
          ...branchAndPathShape,
          owner: z.string(),
          repository: z.string(),
        }),
        response: { 200: configFileResponseSchema },
      },
    }),
    getToken: defineRoute({
      method: 'GET',
      path: '/token',
      summary: "GitHub token linked to the signed-in user's account",
      schemas: {
        response: { 200: tokenResponseSchema },
      },
    }),
  },
});

/** REST contract of the `/api/gitlab` routes. */
export const gitlabContract = defineRouteGroup({
  prefix: '/api/gitlab',
  tag: 'GitLab',
  routes: {
    getAuthUrl: defineRoute({
      method: 'GET',
      path: '/auth-url',
      summary: 'GitLab OAuth authorization URL',
      schemas: {
        querystring: z.object({
          redirectUri: z.string(),
          /** Self-managed GitLab instance (ex: https://gitlab.company.com). */
          instanceUrl: z.optional(z.string()),
          login: z.optional(z.string()),
        }),
        response: { 200: authUrlResponseSchema },
      },
    }),
    authCallback: defineRoute({
      method: 'POST',
      path: '/auth',
      summary: 'Exchange the OAuth code for a GitLab token',
      schemas: {
        body: z.object({
          code: z.string(),
          redirectUri: z.string(),
          instanceUrl: z.optional(z.string()),
        }),
        response: { 200: tokenResponseSchema },
      },
    }),
    listProjects: defineRoute({
      method: 'GET',
      path: '/projects',
      summary: 'Projects of the GitLab account',
      schemas: {
        querystring: z.object({
          ...tokenShape,
          instanceUrl: z.optional(z.string()),
        }),
        response: { 200: responseDataSchema(z.array(gitLabProjectSchema)) },
      },
    }),
    checkConfig: defineRoute({
      method: 'POST',
      path: '/check-config',
      summary: 'Find Intlayer configuration files in a project',
      schemas: {
        body: z.object({
          ...tokenShape,
          projectId: z.number(),
          branch: z.optional(z.string()),
          instanceUrl: z.optional(z.string()),
        }),
        response: { 200: checkConfigResponseSchema },
      },
    }),
    getConfigFile: defineRoute({
      method: 'POST',
      path: '/get-config-file',
      summary: 'Read an Intlayer configuration file of a project',
      schemas: {
        body: z.object({
          ...tokenShape,
          ...branchAndPathShape,
          projectId: z.number(),
          instanceUrl: z.optional(z.string()),
        }),
        response: { 200: configFileResponseSchema },
      },
    }),
  },
});

/** REST contract of the `/api/bitbucket` routes. */
export const bitbucketContract = defineRouteGroup({
  prefix: '/api/bitbucket',
  tag: 'Bitbucket',
  routes: {
    getAuthUrl: defineRoute({
      method: 'GET',
      path: '/auth-url',
      summary: 'Bitbucket OAuth authorization URL',
      schemas: {
        querystring: z.object({ redirectUri: z.string() }),
        response: { 200: authUrlResponseSchema },
      },
    }),
    authCallback: defineRoute({
      method: 'POST',
      path: '/auth',
      summary: 'Exchange the OAuth code for a Bitbucket token',
      schemas: {
        body: z.object({ code: z.string() }),
        response: { 200: tokenResponseSchema },
      },
    }),
    listRepos: defineRoute({
      method: 'GET',
      path: '/repos',
      summary: 'Repositories of the Bitbucket account',
      schemas: {
        querystring: z.object(tokenShape),
        response: {
          200: responseDataSchema(z.array(bitbucketRepositorySchema)),
        },
      },
    }),
    checkConfig: defineRoute({
      method: 'POST',
      path: '/check-config',
      summary: 'Find Intlayer configuration files in a repository',
      schemas: {
        body: z.object({
          ...tokenShape,
          workspace: z.string(),
          repoSlug: z.string(),
          branch: z.optional(z.string()),
        }),
        response: { 200: checkConfigResponseSchema },
      },
    }),
    getConfigFile: defineRoute({
      method: 'POST',
      path: '/get-config-file',
      summary: 'Read an Intlayer configuration file of a repository',
      schemas: {
        body: z.object({
          ...tokenShape,
          ...branchAndPathShape,
          workspace: z.string(),
          repoSlug: z.string(),
        }),
        response: { 200: configFileResponseSchema },
      },
    }),
  },
});

export type GitHubRoutes = (typeof githubContract)['routes'];
export type GitLabRoutes = (typeof gitlabContract)['routes'];
export type BitbucketRoutes = (typeof bitbucketContract)['routes'];
/** Routes shared by every Gitea-compatible forge (Codeberg, Gitee). */
export type ForgeRoutes = (typeof codebergContract)['routes'];
export type CodebergRoutes = ForgeRoutes;
export type GiteeRoutes = (typeof giteeContract)['routes'];

type AuthUrlResult = ResponseData<{ authUrl: string }>;
type TokenResult = ResponseData<{ token: string }>;
type CheckConfigResult = ResponseData<{
  hasConfig: boolean;
  configPaths: string[];
}>;
type ConfigFileResult = ResponseData<{ content: string }>;

export type GitHubRepository = z.output<typeof gitHubRepositorySchema>;
export type GitLabProject = z.output<typeof gitLabProjectSchema>;
export type BitbucketRepository = z.output<typeof bitbucketRepositorySchema>;
export type ForgeRepository = z.output<typeof forgeRepositorySchema>;

export type GitHubGetAuthUrlQuerystring = RouteQuerystring<
  GitHubRoutes['getAuthUrl']
>;
export type GitHubGetAuthUrlResult = AuthUrlResult;
export type GitHubAuthCallbackBody = RouteBodyInput<
  GitHubRoutes['authCallback']
>;
export type GitHubAuthCallbackResult = TokenResult;
export type GitHubListReposQuerystring = RouteQuerystring<
  GitHubRoutes['listRepos']
>;
export type GitHubListReposResult = ResponseData<GitHubRepository[]>;
export type GitHubCheckConfigBody = RouteBodyInput<GitHubRoutes['checkConfig']>;
export type GitHubCheckConfigResult = CheckConfigResult;
export type GitHubGetConfigFileBody = RouteBodyInput<
  GitHubRoutes['getConfigFile']
>;
export type GitHubGetConfigFileResult = ConfigFileResult;
export type GitHubGetTokenResult = TokenResult;

export type GitLabGetAuthUrlQuerystring = RouteQuerystring<
  GitLabRoutes['getAuthUrl']
>;
export type GitLabGetAuthUrlResult = AuthUrlResult;
export type GitLabAuthCallbackBody = RouteBodyInput<
  GitLabRoutes['authCallback']
>;
export type GitLabAuthCallbackResult = TokenResult;
export type GitLabListProjectsQuerystring = RouteQuerystring<
  GitLabRoutes['listProjects']
>;
export type GitLabListProjectsResult = ResponseData<GitLabProject[]>;
export type GitLabCheckConfigBody = RouteBodyInput<GitLabRoutes['checkConfig']>;
export type GitLabCheckConfigResult = CheckConfigResult;
export type GitLabGetConfigFileBody = RouteBodyInput<
  GitLabRoutes['getConfigFile']
>;
export type GitLabGetConfigFileResult = ConfigFileResult;

export type BitbucketGetAuthUrlQuerystring = RouteQuerystring<
  BitbucketRoutes['getAuthUrl']
>;
export type BitbucketGetAuthUrlResult = AuthUrlResult;
export type BitbucketAuthCallbackBody = RouteBodyInput<
  BitbucketRoutes['authCallback']
>;
export type BitbucketAuthCallbackResult = TokenResult;
export type BitbucketListReposQuerystring = RouteQuerystring<
  BitbucketRoutes['listRepos']
>;
export type BitbucketListReposResult = ResponseData<BitbucketRepository[]>;
export type BitbucketCheckConfigBody = RouteBodyInput<
  BitbucketRoutes['checkConfig']
>;
export type BitbucketCheckConfigResult = CheckConfigResult;
export type BitbucketGetConfigFileBody = RouteBodyInput<
  BitbucketRoutes['getConfigFile']
>;
export type BitbucketGetConfigFileResult = ConfigFileResult;

export type ForgeListReposQuerystring = RouteQuerystring<
  ForgeRoutes['listRepos']
>;
export type ForgeListReposResult = ResponseData<ForgeRepository[]>;
export type ForgeCheckConfigBody = RouteBodyInput<ForgeRoutes['checkConfig']>;
export type ForgeCheckConfigResult = CheckConfigResult;
export type ForgeGetConfigFileBody = RouteBodyInput<
  ForgeRoutes['getConfigFile']
>;
export type ForgeGetConfigFileResult = ConfigFileResult;
