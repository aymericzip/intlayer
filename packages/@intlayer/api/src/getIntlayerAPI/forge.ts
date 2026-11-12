import type {
  RouteEndpoints,
  RouteGroup,
} from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  ForgeCheckConfigResult,
  ForgeGetConfigFileResult,
  ForgeListReposResult,
  ForgeRoutes,
} from '@intlayer/backend-contract/gitProviders';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export type {
  ForgeCheckConfigResult,
  ForgeGetConfigFileResult,
  ForgeListReposResult,
  ForgeRepository,
} from '@intlayer/backend-contract/gitProviders';

/**
 * Method and path of every route of a Gitea-compatible forge, checked
 * against the backend contract at compile time.
 */
const forgeEndpoints = {
  listRepos: { method: 'GET', path: '/repos' },
  checkConfig: { method: 'POST', path: '/check-config' },
  getConfigFile: { method: 'POST', path: '/get-config-file' },
} as const satisfies RouteEndpoints<ForgeRoutes>;

/**
 * Client of a Gitea-compatible forge (Codeberg, Gitee). Omitting `token` makes
 * the backend use the account linked to the session.
 */
export const createForgeAPI =
  <Prefix extends string>(
    group: Pick<RouteGroup<Prefix, ForgeRoutes>, 'prefix'>
  ) =>
  (authAPIOptions: FetcherOptions = {}, intlayerConfig?: IntlayerConfig) => {
    const backendURL =
      intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

    /** Repositories of the linked account. */
    const getRepositories = async (
      token?: string | null,
      otherOptions: FetcherOptions = {}
    ) =>
      await fetcher<ForgeListReposResult>(
        buildRouteURL(backendURL, group, forgeEndpoints.listRepos),
        authAPIOptions,
        otherOptions,
        { params: token ? { token } : undefined }
      );

    /** Paths of the Intlayer configuration files of a repository branch. */
    const checkIntlayerConfig = async (
      token: string | null | undefined,
      owner: string,
      repository: string,
      branch: string = 'main',
      otherOptions: FetcherOptions = {}
    ) =>
      await fetcher<ForgeCheckConfigResult>(
        buildRouteURL(backendURL, group, forgeEndpoints.checkConfig),
        authAPIOptions,
        otherOptions,
        {
          method: forgeEndpoints.checkConfig.method,
          body: { token: token ?? undefined, owner, repository, branch },
        }
      );

    /** Content of an Intlayer configuration file of a repository. */
    const getConfigFile = async (
      token: string | null | undefined,
      owner: string,
      repository: string,
      branch: string = 'main',
      path: string = 'intlayer.config.ts',
      otherOptions: FetcherOptions = {}
    ) =>
      await fetcher<ForgeGetConfigFileResult>(
        buildRouteURL(backendURL, group, forgeEndpoints.getConfigFile),
        authAPIOptions,
        otherOptions,
        {
          method: forgeEndpoints.getConfigFile.method,
          body: { token: token ?? undefined, owner, repository, branch, path },
        }
      );

    return { getRepositories, checkIntlayerConfig, getConfigFile };
  };
