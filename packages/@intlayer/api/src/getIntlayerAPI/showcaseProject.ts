import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  GetOtherShowcaseProjectsResult,
  GetShowcaseProjectByIdParams,
  GetShowcaseProjectByIdResult,
  GetShowcaseProjectsResult,
  ShowcaseProjectRoutes,
  SubmitShowcaseProjectBody,
  SubmitShowcaseProjectResult,
  showcaseProjectContract,
  ToggleShowcaseDownvoteBody,
  ToggleShowcaseDownvoteResult,
  ToggleShowcaseUpvoteBody,
  ToggleShowcaseUpvoteResult,
  UpdateShowcaseProjectBody,
  UpdateShowcaseProjectResult,
} from '@intlayer/backend-contract/showcaseProject';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
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

/** Prefix of the routes, checked against the backend contract. */
const showcaseProjectGroup = {
  prefix: '/api/showcase-project',
} as const satisfies Pick<typeof showcaseProjectContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const showcaseProjectEndpoints = {
  getShowcaseProjects: { method: 'GET', path: '/' },
  submitShowcaseProject: { method: 'POST', path: '/submit' },
  getOtherShowcaseProjects: { method: 'GET', path: '/others' },
  toggleShowcaseUpvote: { method: 'POST', path: '/upvote' },
  toggleShowcaseDownvote: { method: 'POST', path: '/downvote' },
  getShowcaseProjectById: { method: 'GET', path: '/:projectId' },
  scanShowcaseProject: { method: 'GET', path: '/:projectId/scan' },
  deleteShowcaseProject: { method: 'DELETE', path: '/:projectId' },
  updateShowcaseProject: { method: 'PATCH', path: '/:projectId' },
} as const satisfies RouteEndpoints<ShowcaseProjectRoutes>;

export const getShowcaseProjectAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

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
      buildRouteURL(
        backendURL,
        showcaseProjectGroup,
        showcaseProjectEndpoints.getShowcaseProjects
      ),
      authAPIOptions,
      otherOptions,
      {
        method: showcaseProjectEndpoints.getShowcaseProjects.method,
        params: params as any,
      }
    );
  };

  const getShowcaseProjectById = async (
    projectId: GetShowcaseProjectByIdParams['projectId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetShowcaseProjectByIdResult>(
      buildRouteURL(
        backendURL,
        showcaseProjectGroup,
        showcaseProjectEndpoints.getShowcaseProjectById,
        { projectId }
      ),
      authAPIOptions,
      otherOptions,
      { method: showcaseProjectEndpoints.getShowcaseProjectById.method }
    );

  const getOtherShowcaseProjects = async (
    query: OtherShowcaseProjectsQuery,
    otherOptions: FetcherOptions = {}
  ) => {
    const params: Record<string, string> = { excludeId: query.excludeId };
    if (query.limit !== undefined) params.limit = String(query.limit);
    return await fetcher<GetOtherShowcaseProjectsResult>(
      buildRouteURL(
        backendURL,
        showcaseProjectGroup,
        showcaseProjectEndpoints.getOtherShowcaseProjects
      ),
      authAPIOptions,
      otherOptions,
      {
        method: showcaseProjectEndpoints.getOtherShowcaseProjects.method,
        params: params as any,
      }
    );
  };

  const submitShowcaseProject = async (
    body: SubmitShowcaseProjectBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<SubmitShowcaseProjectResult>(
      buildRouteURL(
        backendURL,
        showcaseProjectGroup,
        showcaseProjectEndpoints.submitShowcaseProject
      ),
      authAPIOptions,
      otherOptions,
      { method: showcaseProjectEndpoints.submitShowcaseProject.method, body }
    );

  const toggleShowcaseUpvote = async (
    body: ToggleShowcaseUpvoteBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<ToggleShowcaseUpvoteResult>(
      buildRouteURL(
        backendURL,
        showcaseProjectGroup,
        showcaseProjectEndpoints.toggleShowcaseUpvote
      ),
      authAPIOptions,
      otherOptions,
      { method: showcaseProjectEndpoints.toggleShowcaseUpvote.method, body }
    );

  const toggleShowcaseDownvote = async (
    body: ToggleShowcaseDownvoteBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<ToggleShowcaseDownvoteResult>(
      buildRouteURL(
        backendURL,
        showcaseProjectGroup,
        showcaseProjectEndpoints.toggleShowcaseDownvote
      ),
      authAPIOptions,
      otherOptions,
      { method: showcaseProjectEndpoints.toggleShowcaseDownvote.method, body }
    );

  const deleteShowcaseProject = async (
    projectId: GetShowcaseProjectByIdParams['projectId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<{ data: { success: boolean } }>(
      buildRouteURL(
        backendURL,
        showcaseProjectGroup,
        showcaseProjectEndpoints.deleteShowcaseProject,
        { projectId }
      ),
      authAPIOptions,
      otherOptions,
      { method: showcaseProjectEndpoints.deleteShowcaseProject.method }
    );

  const updateShowcaseProject = async (
    projectId: GetShowcaseProjectByIdParams['projectId'],
    body: UpdateShowcaseProjectBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateShowcaseProjectResult>(
      buildRouteURL(
        backendURL,
        showcaseProjectGroup,
        showcaseProjectEndpoints.updateShowcaseProject,
        { projectId }
      ),
      authAPIOptions,
      otherOptions,
      { method: showcaseProjectEndpoints.updateShowcaseProject.method, body }
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

/**
 * Authenticated `showcaseProject` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const showcaseProjectEndpoint = createEndpoint(getShowcaseProjectAPI);
