import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  GitLabRoutes,
  gitlabContract,
} from '@intlayer/backend-contract/gitProviders';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

export type GitLabProject = {
  id: number;
  name: string;
  path_with_namespace: string;
  web_url: string;
  default_branch: string;
  visibility: string;
  last_activity_at: string;
  namespace: {
    id: number;
    name: string;
    path: string;
  };
};

export type GitLabAuthCallbackBody = {
  code: string;
  redirectUri: string;
  instanceUrl?: string;
};

export type GitLabAuthCallbackResult = {
  data: {
    token: string;
  };
};

export type GitLabListProjectsResult = {
  data: GitLabProject[];
};

export type GitLabCheckConfigBody = {
  token?: string;
  projectId: number;
  branch?: string;
  instanceUrl?: string;
};

export type GitLabCheckConfigResult = {
  data: {
    hasConfig: boolean;
    configPaths: string[];
  };
};

export type GitLabGetConfigFileBody = {
  token?: string;
  projectId: number;
  branch?: string;
  path?: string;
  instanceUrl?: string;
};

export type GitLabGetConfigFileResult = {
  data: {
    content: string;
  };
};

export type GitLabGetAuthUrlResult = {
  data: {
    authUrl: string;
  };
};

/** Prefix of the routes, checked against the backend contract. */
const gitlabGroup = {
  prefix: '/api/gitlab',
} as const satisfies Pick<typeof gitlabContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const gitlabEndpoints = {
  getAuthUrl: { method: 'GET', path: '/auth-url' },
  authCallback: { method: 'POST', path: '/auth' },
  listProjects: { method: 'GET', path: '/projects' },
  checkConfig: { method: 'POST', path: '/check-config' },
  getConfigFile: { method: 'POST', path: '/get-config-file' },
} as const satisfies RouteEndpoints<GitLabRoutes>;

export const getGitlabAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Get GitLab OAuth authorization URL
   * @param redirectUri - Redirect URI after OAuth authorization
   * @param instanceUrl - Custom GitLab instance URL (optional, for self-hosted)
   */
  const getAuthUrl = async (
    redirectUri: string,
    instanceUrl?: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitLabGetAuthUrlResult>(
      buildRouteURL(backendURL, gitlabGroup, gitlabEndpoints.getAuthUrl),
      authAPIOptions,
      otherOptions,
      {
        params: { redirectUri, ...(instanceUrl && { instanceUrl }) },
      }
    );

  /**
   * Exchange GitLab authorization code for access token
   * @param code - GitLab authorization code
   * @param redirectUri - Redirect URI used in the authorization request
   * @param instanceUrl - Custom GitLab instance URL (optional)
   */
  const authenticate = async (
    code: string,
    redirectUri: string,
    instanceUrl?: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitLabAuthCallbackResult>(
      buildRouteURL(backendURL, gitlabGroup, gitlabEndpoints.authCallback),
      authAPIOptions,
      otherOptions,
      {
        method: gitlabEndpoints.authCallback.method,
        body: { code, redirectUri, instanceUrl },
      }
    );

  /**
   * Get user's GitLab projects
   * @param token - Optional GitLab access token. If not provided, backend will use session.
   * @param instanceUrl - Custom GitLab instance URL (optional)
   */
  const getProjects = async (
    token?: string | null,
    instanceUrl?: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitLabListProjectsResult>(
      buildRouteURL(backendURL, gitlabGroup, gitlabEndpoints.listProjects),
      authAPIOptions,
      otherOptions,
      {
        params: {
          ...(token && { token }),
          ...(instanceUrl && { instanceUrl }),
        },
      }
    );

  /**
   * Check if intlayer.config.ts exists in a GitLab repository
   * @param token - Optional GitLab access token. If not provided, backend will use session.
   * @param projectId - GitLab project ID
   * @param branch - Branch name (default: 'main')
   * @param instanceUrl - Custom GitLab instance URL (optional)
   */
  const checkIntlayerConfig = async (
    token: string | null | undefined,
    projectId: number,
    branch: string = 'main',
    instanceUrl?: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitLabCheckConfigResult>(
      buildRouteURL(backendURL, gitlabGroup, gitlabEndpoints.checkConfig),
      authAPIOptions,
      otherOptions,
      {
        method: gitlabEndpoints.checkConfig.method,
        body: {
          token: token ?? undefined,
          projectId,
          branch,
          ...(instanceUrl && { instanceUrl }),
        },
      }
    );

  /**
   * Get intlayer.config.ts file contents from a GitLab repository
   * @param token - Optional GitLab access token. If not provided, backend will use session.
   * @param projectId - GitLab project ID
   * @param branch - Branch name (default: 'main')
   * @param path - File path (default: 'intlayer.config.ts')
   * @param instanceUrl - Custom GitLab instance URL (optional)
   */
  const getConfigFile = async (
    token: string | null | undefined,
    projectId: number,
    branch: string = 'main',
    path: string = 'intlayer.config.ts',
    instanceUrl?: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitLabGetConfigFileResult>(
      buildRouteURL(backendURL, gitlabGroup, gitlabEndpoints.getConfigFile),
      authAPIOptions,
      otherOptions,
      {
        method: gitlabEndpoints.getConfigFile.method,
        body: {
          token: token ?? undefined,
          projectId,
          branch,
          path,
          ...(instanceUrl && { instanceUrl }),
        },
      }
    );

  return {
    getAuthUrl,
    authenticate,
    getProjects,
    checkIntlayerConfig,
    getConfigFile,
  };
};

/**
 * Authenticated `gitlab` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const gitlabEndpoint = createEndpoint(getGitlabAPI);
