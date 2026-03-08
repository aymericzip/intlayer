import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types';
import { type FetcherOptions, fetcher } from '../fetcher';

export type ShowcaseProjectsQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  selectedUseCases?: string[];
  isOpenSource?: boolean;
};

export type ToggleShowcaseLikeBody = { projectId: string };

export const getShowcaseProjectAPI = (
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

  const SHOWCASE_API_ROUTE = `${backendURL}/api/showcase-project`;

  const getShowcaseProjects = async (
    query?: ShowcaseProjectsQuery,
    otherOptions: FetcherOptions = {}
  ) => {
    const params: Record<string, string | string[]> = {};
    if (query?.page !== undefined) params.page = String(query.page);
    if (query?.pageSize !== undefined) params.pageSize = String(query.pageSize);
    if (query?.search !== undefined) params.search = query.search;
    if (query?.isOpenSource !== undefined)
      params.isOpenSource = String(query.isOpenSource);
    if (query?.selectedUseCases?.length)
      params.selectedUseCases = query.selectedUseCases;

    return await fetcher(SHOWCASE_API_ROUTE, authAPIOptions, otherOptions, {
      method: 'GET',
      params: params as any,
    });
  };

  const getShowcaseProjectById = async (
    projectId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher(
      `${SHOWCASE_API_ROUTE}/${projectId}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  const getOtherShowcaseProjects = async (
    excludeId: string,
    limit?: number,
    otherOptions: FetcherOptions = {}
  ) => {
    const params: Record<string, string> = { excludeId };
    if (limit !== undefined) params.limit = String(limit);
    return await fetcher(
      `${SHOWCASE_API_ROUTE}/others`,
      authAPIOptions,
      otherOptions,
      { method: 'GET', params: params as any }
    );
  };

  const toggleShowcaseLike = async (
    body: ToggleShowcaseLikeBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<{ data: { upvotes: number; isLiked: boolean } }>(
      `${SHOWCASE_API_ROUTE}/like`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  const deleteShowcaseProject = async (
    projectId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<{ data: { success: boolean } }>(
      `${SHOWCASE_API_ROUTE}/${projectId}`,
      authAPIOptions,
      otherOptions,
      { method: 'DELETE' }
    );

  return {
    getShowcaseProjects,
    getShowcaseProjectById,
    getOtherShowcaseProjects,
    toggleShowcaseLike,
    deleteShowcaseProject,
  };
};
