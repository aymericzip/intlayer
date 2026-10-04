import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  AddEnvironmentBody,
  AddEnvironmentResult,
  DeleteEnvironmentResult,
  EnvironmentRoutes,
  environmentContract,
  MigrateEnvironmentBody,
  MigrateEnvironmentResult,
  ResetToProductionEnvironmentResult,
  SelectEnvironmentResult,
  UpdateEnvironmentBody,
  UpdateEnvironmentResult,
} from '@intlayer/backend-contract/environment';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Prefix of the routes, checked against the backend contract. */
const environmentGroup = {
  prefix: '/api/project/environment',
} as const satisfies Pick<typeof environmentContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const environmentEndpoints = {
  addEnvironment: { method: 'POST', path: '/' },
  updateEnvironment: { method: 'PUT', path: '/:environmentId' },
  deleteEnvironment: { method: 'DELETE', path: '/:environmentId' },
  resetToProductionEnvironment: { method: 'PUT', path: '/production/select' },
  selectEnvironment: { method: 'PUT', path: '/:environmentId/select' },
  migrateEnvironment: { method: 'POST', path: '/migrate' },
} as const satisfies RouteEndpoints<EnvironmentRoutes>;

export const getEnvironmentAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  const addEnvironment = async (
    body: AddEnvironmentBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AddEnvironmentResult>(
      buildRouteURL(
        backendURL,
        environmentGroup,
        environmentEndpoints.addEnvironment
      ),
      authAPIOptions,
      otherOptions,
      { method: environmentEndpoints.addEnvironment.method, body }
    );

  const updateEnvironment = async (
    environmentId: string,
    body: UpdateEnvironmentBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateEnvironmentResult>(
      buildRouteURL(
        backendURL,
        environmentGroup,
        environmentEndpoints.updateEnvironment,
        { environmentId }
      ),
      authAPIOptions,
      otherOptions,
      { method: environmentEndpoints.updateEnvironment.method, body }
    );

  const deleteEnvironment = async (
    environmentId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DeleteEnvironmentResult>(
      buildRouteURL(
        backendURL,
        environmentGroup,
        environmentEndpoints.deleteEnvironment,
        { environmentId }
      ),
      authAPIOptions,
      otherOptions,
      { method: environmentEndpoints.deleteEnvironment.method }
    );

  const selectEnvironment = async (
    environmentId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<SelectEnvironmentResult>(
      buildRouteURL(
        backendURL,
        environmentGroup,
        environmentEndpoints.selectEnvironment,
        { environmentId }
      ),
      authAPIOptions,
      otherOptions,
      { method: environmentEndpoints.selectEnvironment.method }
    );

  const resetToProductionEnvironment = async (
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<ResetToProductionEnvironmentResult>(
      buildRouteURL(
        backendURL,
        environmentGroup,
        environmentEndpoints.resetToProductionEnvironment
      ),
      authAPIOptions,
      otherOptions,
      { method: environmentEndpoints.resetToProductionEnvironment.method }
    );

  const migrateEnvironment = async (
    body: MigrateEnvironmentBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<MigrateEnvironmentResult>(
      buildRouteURL(
        backendURL,
        environmentGroup,
        environmentEndpoints.migrateEnvironment
      ),
      authAPIOptions,
      otherOptions,
      { method: environmentEndpoints.migrateEnvironment.method, body }
    );

  return {
    addEnvironment,
    updateEnvironment,
    deleteEnvironment,
    selectEnvironment,
    resetToProductionEnvironment,
    migrateEnvironment,
  };
};

/**
 * Authenticated `environment` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const environmentEndpoint = createEndpoint(getEnvironmentAPI);
