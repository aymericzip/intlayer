import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  GitHubRoutes,
  githubContract,
} from '@intlayer/backend-contract/gitProviders';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

export type GitHubRepository = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
  };
  html_url: string;
  default_branch: string;
  private: boolean;
};

export type GitHubAuthCallbackBody = {
  code: string;
};

export type GitHubAuthCallbackResult = {
  data: {
    token: string;
  };
};

export type GitHubListReposResult = {
  data: GitHubRepository[];
};

export type GitHubCheckConfigBody = {
  token?: string;
  owner: string;
  repository: string;
  branch?: string;
};

export type GitHubCheckConfigResult = {
  data: {
    hasConfig: boolean;
  };
};

export type GitHubGetConfigFileBody = {
  token?: string;
  owner: string;
  repository: string;
  branch?: string;
  path?: string;
};

export type GitHubGetConfigFileResult = {
  data: {
    content: string;
  };
};

export type GitHubGetAuthUrlResult = {
  data: {
    authUrl: string;
  };
};

export type GitHubGetTokenResult = {
  data: {
    token: string;
  };
};

/** Prefix of the routes, checked against the backend contract. */
const githubGroup = {
  prefix: '/api/github',
} as const satisfies Pick<typeof githubContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const githubEndpoints = {
  getAuthUrl: { method: 'GET', path: '/auth-url' },
  authCallback: { method: 'POST', path: '/auth' },
  listRepos: { method: 'GET', path: '/repos' },
  checkConfig: { method: 'POST', path: '/check-config' },
  getConfigFile: { method: 'POST', path: '/get-config-file' },
  getToken: { method: 'GET', path: '/token' },
} as const satisfies RouteEndpoints<GitHubRoutes>;

export const getGithubAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Get GitHub OAuth authorization URL
   * @param redirectUri - Redirect URI after OAuth authorization
   */
  const getAuthUrl = async (
    redirectUri: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitHubGetAuthUrlResult>(
      buildRouteURL(backendURL, githubGroup, githubEndpoints.getAuthUrl),
      authAPIOptions,
      otherOptions,
      {
        params: { redirectUri },
      }
    );

  /**
   * Exchange GitHub authorization code for access token
   * @param code - GitHub authorization code
   */
  const authenticate = async (
    code: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitHubAuthCallbackResult>(
      buildRouteURL(backendURL, githubGroup, githubEndpoints.authCallback),
      authAPIOptions,
      otherOptions,
      {
        method: githubEndpoints.authCallback.method,
        body: { code },
      }
    );

  /**
   * Get user's GitHub repositories
   * @param token - Optional GitHub access token. If not provided, backend will use session.
   */
  const getRepositories = async (
    token?: string | null,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitHubListReposResult>(
      buildRouteURL(backendURL, githubGroup, githubEndpoints.listRepos),
      authAPIOptions,
      otherOptions,
      {
        params: token ? { token } : undefined,
      }
    );

  /**
   * Check if intlayer.config.ts exists in a repository
   * @param token - Optional GitHub access token. If not provided, backend will use session.
   * @param owner - Repository owner
   * @param repository - Repository name
   * @param branch - Branch name (default: 'main')
   */
  const checkIntlayerConfig = async (
    token: string | null | undefined,
    owner: string,
    repository: string,
    branch: string = 'main',
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitHubCheckConfigResult>(
      buildRouteURL(backendURL, githubGroup, githubEndpoints.checkConfig),
      authAPIOptions,
      otherOptions,
      {
        method: githubEndpoints.checkConfig.method,
        body: { token: token ?? undefined, owner, repository, branch },
      }
    );

  /**
   * Get intlayer.config.ts file contents from a repository
   * @param token - Optional GitHub access token. If not provided, backend will use session.
   * @param owner - Repository owner
   * @param repository - Repository name
   * @param branch - Branch name (default: 'main')
   * @param path - File path (default: 'intlayer.config.ts')
   */
  const getConfigFile = async (
    token: string | null | undefined,
    owner: string,
    repository: string,
    branch: string = 'main',
    path: string = 'intlayer.config.ts',
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitHubGetConfigFileResult>(
      buildRouteURL(backendURL, githubGroup, githubEndpoints.getConfigFile),
      authAPIOptions,
      otherOptions,
      {
        method: githubEndpoints.getConfigFile.method,
        body: { token: token ?? undefined, owner, repository, branch, path },
      }
    );

  /**
   * Get user's GitHub token
   */
  const getToken = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GitHubGetTokenResult>(
      buildRouteURL(backendURL, githubGroup, githubEndpoints.getToken),
      authAPIOptions,
      otherOptions
    );

  return {
    getAuthUrl,
    authenticate,
    getRepositories,
    checkIntlayerConfig,
    getConfigFile,
    getToken,
  };
};

/**
 * Authenticated `github` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const githubEndpoint = createEndpoint(getGithubAPI);
