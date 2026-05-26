'use client';

import type {
  GetShowcaseProjectByIdParams,
  GetShowcaseProjectsResult,
  OtherShowcaseProjectsQuery,
  ShowcaseProjectsQuery,
  SubmitShowcaseProjectBody,
} from '@intlayer/backend';
import {
  type UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  type UseIntlayerAuthProps,
  useShowcaseProjectAPI,
} from '../useIntlayerAPI';

export const useGetShowcaseProjects = (
  query?: ShowcaseProjectsQuery,
  options?: Partial<UseQueryOptions<GetShowcaseProjectsResult>>
) => {
  const showcaseProjectAPI = useShowcaseProjectAPI();

  return useQuery({
    queryKey: ['showcase', 'projects', query],
    queryFn: ({ signal }) =>
      showcaseProjectAPI.getShowcaseProjects(query, { signal }),
    ...options,
  });
};

export const useGetShowcaseProjectById = (
  projectId: GetShowcaseProjectByIdParams['projectId'],
  options?: Partial<UseQueryOptions>
) => {
  const showcaseProjectAPI = useShowcaseProjectAPI();

  return useQuery({
    queryKey: ['showcase', 'project', projectId],
    queryFn: ({ signal }) =>
      showcaseProjectAPI.getShowcaseProjectById(projectId, {
        signal,
      }),
    enabled: Boolean(projectId),
    ...options,
  });
};

export const useGetOtherShowcaseProjects = (
  query: OtherShowcaseProjectsQuery,
  options?: Partial<UseQueryOptions>
) => {
  const showcaseProjectAPI = useShowcaseProjectAPI();

  return useQuery({
    queryKey: ['showcase', 'other-projects', query],
    queryFn: ({ signal }) =>
      showcaseProjectAPI.getOtherShowcaseProjects(query, {
        signal,
      }),
    enabled: Boolean(query.excludeId),
    ...options,
  });
};

export const useSubmitShowcaseProject = (props?: UseIntlayerAuthProps) => {
  const showcaseProjectAPI = useShowcaseProjectAPI(props);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['showcase', 'submit'],
    mutationFn: (body: SubmitShowcaseProjectBody) =>
      showcaseProjectAPI.submitShowcaseProject(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showcase'] });
    },
  });
};

export const useDeleteShowcaseProject = (props?: UseIntlayerAuthProps) => {
  const showcaseProjectAPI = useShowcaseProjectAPI(props);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['showcase', 'delete'],
    mutationFn: (projectId: string) =>
      showcaseProjectAPI.deleteShowcaseProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showcase'] });
    },
  });
};

export const useToggleShowcaseUpvote = (props?: UseIntlayerAuthProps) => {
  const showcaseProjectAPI = useShowcaseProjectAPI(props);

  return useMutation({
    mutationKey: ['showcase', 'upvote'],
    mutationFn: (projectId: string) =>
      showcaseProjectAPI.toggleShowcaseUpvote({ projectId }),
  });
};

export const useToggleShowcaseDownvote = (props?: UseIntlayerAuthProps) => {
  const showcaseProjectAPI = useShowcaseProjectAPI(props);

  return useMutation({
    mutationKey: ['showcase', 'downvote'],
    mutationFn: (projectId: string) =>
      showcaseProjectAPI.toggleShowcaseDownvote({ projectId }),
  });
};

export const useUpdateShowcaseProject = (props?: UseIntlayerAuthProps) => {
  const showcaseProjectAPI = useShowcaseProjectAPI(props);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['showcase', 'update'],
    mutationFn: ({
      projectId,
      ...body
    }: {
      projectId: string;
      name?: string;
      url?: string;
      githubUrl?: string;
      tagline?: string;
      description?: string;
      useCases?: string[];
    }) => showcaseProjectAPI.updateShowcaseProject(projectId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['showcase'] });
    },
  });
};
