import type {
  GetOtherShowcaseProjectsResult,
  GetShowcaseProjectByIdParams,
  GetShowcaseProjectByIdResult,
  GetShowcaseProjectsResult,
  SubmitShowcaseProjectBody,
  SubmitShowcaseProjectResult,
  ToggleShowcaseDownvoteBody,
  ToggleShowcaseDownvoteResult,
  ToggleShowcaseUpvoteBody,
  ToggleShowcaseUpvoteResult,
  UpdateShowcaseProjectBody,
  UpdateShowcaseProjectResult,
} from '@intlayer/backend';
import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types';
import { type FetcherOptions, fetcher } from '../fetcher';

// Client-side query types use proper JS types (numbers/booleans) rather than
// the backend querystring types which are always strings.
export type ShowcaseProjectsQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  selectedUseCases?: string[];
  isOpenSource?: boolean;
};

export type OtherShowcaseProjectsQuery = {
  excludeId: string;
  limit?: number;
};

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

    return await fetcher<GetShowcaseProjectsResult>(
      SHOWCASE_API_ROUTE,
      authAPIOptions,
      otherOptions,
      { method: 'GET', params: params as any }
    );
  };

  const getShowcaseProjectById = async (
    projectId: GetShowcaseProjectByIdParams['projectId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetShowcaseProjectByIdResult>(
      `${SHOWCASE_API_ROUTE}/${projectId}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  const getOtherShowcaseProjects = async (
    query: OtherShowcaseProjectsQuery,
    otherOptions: FetcherOptions = {}
  ) => {
    const params: Record<string, string> = { excludeId: query.excludeId };
    if (query.limit !== undefined) params.limit = String(query.limit);
    return await fetcher<GetOtherShowcaseProjectsResult>(
      `${SHOWCASE_API_ROUTE}/others`,
      authAPIOptions,
      otherOptions,
      { method: 'GET', params: params as any }
    );
  };

  const submitShowcaseProject = async (
    body: SubmitShowcaseProjectBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<SubmitShowcaseProjectResult>(
      `${SHOWCASE_API_ROUTE}/submit`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  const toggleShowcaseUpvote = async (
    body: ToggleShowcaseUpvoteBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<ToggleShowcaseUpvoteResult>(
      `${SHOWCASE_API_ROUTE}/upvote`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  const toggleShowcaseDownvote = async (
    body: ToggleShowcaseDownvoteBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<ToggleShowcaseDownvoteResult>(
      `${SHOWCASE_API_ROUTE}/downvote`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  const deleteShowcaseProject = async (
    projectId: GetShowcaseProjectByIdParams['projectId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<{ data: { success: boolean } }>(
      `${SHOWCASE_API_ROUTE}/${projectId}`,
      authAPIOptions,
      otherOptions,
      { method: 'DELETE' }
    );

  const updateShowcaseProject = async (
    projectId: GetShowcaseProjectByIdParams['projectId'],
    body: UpdateShowcaseProjectBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateShowcaseProjectResult>(
      `${SHOWCASE_API_ROUTE}/${projectId}`,
      authAPIOptions,
      otherOptions,
      { method: 'PATCH', body }
    );

  return {
    getShowcaseProjects,
    getShowcaseProjectById,
    getOtherShowcaseProjects,
    submitShowcaseProject,
    toggleShowcaseUpvote,
    toggleShowcaseDownvote,
    deleteShowcaseProject,
    updateShowcaseProject,
  };
};
