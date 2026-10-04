import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  BitbucketRoutes,
  bitbucketContract,
} from '@intlayer/backend-contract/gitProviders';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
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

/** Prefix of the routes, checked against the backend contract. */
const bitbucketGroup = {
  prefix: '/api/bitbucket',
} as const satisfies Pick<typeof bitbucketContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const bitbucketEndpoints = {
  getAuthUrl: { method: 'GET', path: '/auth-url' },
  authCallback: { method: 'POST', path: '/auth' },
  listRepos: { method: 'GET', path: '/repos' },
  checkConfig: { method: 'POST', path: '/check-config' },
  getConfigFile: { method: 'POST', path: '/get-config-file' },
} as const satisfies RouteEndpoints<BitbucketRoutes>;

export const getBitbucketAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Get Bitbucket OAuth authorization URL
   * @param redirectUri - Redirect URI after OAuth authorization
   */
  const getAuthUrl = async (
    redirectUri: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<BitbucketGetAuthUrlResult>(
      buildRouteURL(backendURL, bitbucketGroup, bitbucketEndpoints.getAuthUrl),
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
      buildRouteURL(
        backendURL,
        bitbucketGroup,
        bitbucketEndpoints.authCallback
      ),
      authAPIOptions,
      otherOptions,
      {
        method: bitbucketEndpoints.authCallback.method,
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
      buildRouteURL(backendURL, bitbucketGroup, bitbucketEndpoints.listRepos),
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
      buildRouteURL(backendURL, bitbucketGroup, bitbucketEndpoints.checkConfig),
      authAPIOptions,
      otherOptions,
      {
        method: bitbucketEndpoints.checkConfig.method,
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
      buildRouteURL(
        backendURL,
        bitbucketGroup,
        bitbucketEndpoints.getConfigFile
      ),
      authAPIOptions,
      otherOptions,
      {
        method: bitbucketEndpoints.getConfigFile.method,
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

/**
 * Authenticated `bitbucket` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const bitbucketEndpoint = createEndpoint(getBitbucketAPI);
