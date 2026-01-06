import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types';
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

export const getGitlabAPI = (
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

  const GITLAB_API_ROUTE = `${backendURL}/api/gitlab`;

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
      `${GITLAB_API_ROUTE}/auth-url`,
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
      `${GITLAB_API_ROUTE}/auth`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${GITLAB_API_ROUTE}/projects`,
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
      `${GITLAB_API_ROUTE}/check-config`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${GITLAB_API_ROUTE}/get-config-file`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
