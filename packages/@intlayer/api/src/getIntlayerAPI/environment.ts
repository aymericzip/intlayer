import type {
  AddEnvironmentBody,
  AddEnvironmentResult,
  DeleteEnvironmentResult,
  MigrateEnvironmentBody,
  MigrateEnvironmentResult,
  ResetToProductionEnvironmentResult,
  SelectEnvironmentResult,
  UpdateEnvironmentBody,
  UpdateEnvironmentResult,
} from '@intlayer/backend';
import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getEnvironmentAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL = intlayerConfig?.editor?.backendURL ?? editor.backendURL;
  const ENVIRONMENT_API_ROUTE = `${backendURL}/api/project/environment`;

  const addEnvironment = async (
    body: AddEnvironmentBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AddEnvironmentResult>(
      ENVIRONMENT_API_ROUTE,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  const updateEnvironment = async (
    environmentId: string,
    body: UpdateEnvironmentBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateEnvironmentResult>(
      `${ENVIRONMENT_API_ROUTE}/${environmentId}`,
      authAPIOptions,
      otherOptions,
      { method: 'PUT', body }
    );

  const deleteEnvironment = async (
    environmentId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DeleteEnvironmentResult>(
      `${ENVIRONMENT_API_ROUTE}/${environmentId}`,
      authAPIOptions,
      otherOptions,
      { method: 'DELETE' }
    );

  const selectEnvironment = async (
    environmentId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<SelectEnvironmentResult>(
      `${ENVIRONMENT_API_ROUTE}/${environmentId}/select`,
      authAPIOptions,
      otherOptions,
      { method: 'PUT' }
    );

  const resetToProductionEnvironment = async (
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<ResetToProductionEnvironmentResult>(
      `${ENVIRONMENT_API_ROUTE}/production/select`,
      authAPIOptions,
      otherOptions,
      { method: 'PUT' }
    );

  const migrateEnvironment = async (
    body: MigrateEnvironmentBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<MigrateEnvironmentResult>(
      `${ENVIRONMENT_API_ROUTE}/migrate`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
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
