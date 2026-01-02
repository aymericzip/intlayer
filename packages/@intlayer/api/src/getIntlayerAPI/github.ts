import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types';
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

export const getGithubAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration?.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const GITHUB_API_ROUTE = `${backendURL}/api/github`;

  /**
   * Get GitHub OAuth authorization URL
   * @param redirectUri - Redirect URI after OAuth authorization
   */
  const getAuthUrl = async (
    redirectUri: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GitHubGetAuthUrlResult>(
      `${GITHUB_API_ROUTE}/auth-url`,
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
      `${GITHUB_API_ROUTE}/auth`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${GITHUB_API_ROUTE}/repos`,
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
      `${GITHUB_API_ROUTE}/check-config`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${GITHUB_API_ROUTE}/get-config-file`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: { token: token ?? undefined, owner, repository, branch, path },
      }
    );

  return {
    getAuthUrl,
    authenticate,
    getRepositories,
    checkIntlayerConfig,
    getConfigFile,
  };
};
