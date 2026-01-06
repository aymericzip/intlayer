import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types';
import { type FetcherOptions, fetcher } from '../fetcher';

export type BitbucketRepository = {
  uuid: string;
  name: string;
  full_name: string;
  slug: string;
  mainbranch?: {
    name: string;
    type: string;
  };
  links: {
    html: {
      href: string;
    };
  };
  workspace: {
    slug: string;
    name: string;
    uuid: string;
  };
  owner: {
    display_name: string;
    username?: string;
    uuid: string;
  };
  updated_on: string;
  is_private: boolean;
};

export type BitbucketAuthCallbackBody = {
  code: string;
};

export type BitbucketAuthCallbackResult = {
  data: {
    token: string;
  };
};

export type BitbucketListReposResult = {
  data: BitbucketRepository[];
};

export type BitbucketCheckConfigBody = {
  token?: string;
  workspace: string;
  repoSlug: string;
  branch?: string;
};

export type BitbucketCheckConfigResult = {
  data: {
    hasConfig: boolean;
    configPaths: string[];
  };
};

export type BitbucketGetConfigFileBody = {
  token?: string;
  workspace: string;
  repoSlug: string;
  branch?: string;
  path?: string;
};

export type BitbucketGetConfigFileResult = {
  data: {
    content: string;
  };
};

export type BitbucketGetAuthUrlResult = {
  data: {
    authUrl: string;
  };
};

export const getBitbucketAPI = (
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

  const BITBUCKET_API_ROUTE = `${backendURL}/api/bitbucket`;

  /**
   * Get Bitbucket OAuth authorization URL
   * @param redirectUri - Redirect URI after OAuth authorization
   */
  const getAuthUrl = async (
    redirectUri: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<BitbucketGetAuthUrlResult>(
      `${BITBUCKET_API_ROUTE}/auth-url`,
      authAPIOptions,
      otherOptions,
      {
        params: { redirectUri },
      }
    );

  /**
   * Exchange Bitbucket authorization code for access token
   * @param code - Bitbucket authorization code
   */
  const authenticate = async (
    code: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<BitbucketAuthCallbackResult>(
      `${BITBUCKET_API_ROUTE}/auth`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: { code },
      }
    );

  /**
   * Get user's Bitbucket repositories
   * @param token - Optional Bitbucket access token. If not provided, backend will use session.
   */
  const getRepositories = async (
    token?: string | null,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<BitbucketListReposResult>(
      `${BITBUCKET_API_ROUTE}/repos`,
      authAPIOptions,
      otherOptions,
      {
        params: token ? { token } : undefined,
      }
    );

  /**
   * Check if intlayer.config.ts exists in a Bitbucket repository
   * @param token - Optional Bitbucket access token. If not provided, backend will use session.
   * @param workspace - Bitbucket workspace slug
   * @param repoSlug - Repository slug
   * @param branch - Branch name (default: 'main')
   */
  const checkIntlayerConfig = async (
    token: string | null | undefined,
    workspace: string,
    repoSlug: string,
    branch: string = 'main',
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<BitbucketCheckConfigResult>(
      `${BITBUCKET_API_ROUTE}/check-config`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: { token: token ?? undefined, workspace, repoSlug, branch },
      }
    );

  /**
   * Get intlayer.config.ts file contents from a Bitbucket repository
   * @param token - Optional Bitbucket access token. If not provided, backend will use session.
   * @param workspace - Bitbucket workspace slug
   * @param repoSlug - Repository slug
   * @param branch - Branch name (default: 'main')
   * @param path - File path (default: 'intlayer.config.ts')
   */
  const getConfigFile = async (
    token: string | null | undefined,
    workspace: string,
    repoSlug: string,
    branch: string = 'main',
    path: string = 'intlayer.config.ts',
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<BitbucketGetConfigFileResult>(
      `${BITBUCKET_API_ROUTE}/get-config-file`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: {
          token: token ?? undefined,
          workspace,
          repoSlug,
          branch,
          path,
        },
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
