'use client';

import type {
  AddNewAccessKeyBody,
  AddProjectBody,
  DeleteAccessKeyBody,
  GetProjectsParams,
  PushProjectConfigurationBody,
  RefreshAccessKeyBody,
  SelectProjectParam,
  UpdateMemberAccessBody,
  UpdateProjectBody,
  UpdateProjectMembersBody,
} from '@intlayer/backend';
import {
  type UseQueryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useProjectAPI } from '../useIntlayerAPI';
import { useAppQuery } from './utils';

export const useGetProjects = (
  filters?: GetProjectsParams,
  options?: Partial<UseQueryOptions>
) => {
  const projectAPI = useProjectAPI();

  return useAppQuery({
    queryKey: ['projects', filters],
    queryFn: ({ signal }) => projectAPI.getProjects(filters, { signal }),
    // placeholderData: keepPreviousData,
    requireUser: true,
    requireOrganization: true,
    ...options,
  });
};

export const useGetProjectInsights = (options?: Partial<UseQueryOptions>) => {
  const projectAPI = useProjectAPI();

  return useAppQuery({
    queryKey: ['project', 'insights'],
    queryFn: ({ signal }) => projectAPI.getProjectInsights({ signal }),
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

export const useAddProject = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (args: AddProjectBody) => projectAPI.addProject(args),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useUpdateProject = () => {
  const projectAPI = useProjectAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (args: UpdateProjectBody) => projectAPI.updateProject(args),
    meta: {
      invalidateQueries: [['projects']],
    },
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);

      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        project: data.data,
      });
    },
  });
};

export const usePushProjectConfiguration = () => {
  const projectAPI = useProjectAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['project', 'push-configuration'],
    mutationFn: (args: PushProjectConfigurationBody) =>
      projectAPI.pushProjectConfiguration(args),
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);

      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        project: data.data,
      });
    },
  });
};

export const useUpdateProjectMembers = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (args: UpdateProjectMembersBody) =>
      projectAPI.updateProjectMembers(args),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useDeleteProject = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: () => projectAPI.deleteProject(),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useDeleteProjectById = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (projectId: string) =>
      projectAPI.deleteProjectByIdAdmin(projectId),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useSelectProject = () => {
  const projectAPI = useProjectAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session-projects'],
    mutationFn: (args: SelectProjectParam) => projectAPI.selectProject(args),
    meta: {
      invalidateQueries: [
        ['session'],
        ['projects'],
        ['dictionaries'],
        ['tags'],
        ['subscription'],
        ['users'],
      ],
    },
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);

      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        project: data.data,
      });
    },
  });
};

export const useUnselectProject = () => {
  const projectAPI = useProjectAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session-projects'],
    mutationFn: () => projectAPI.unselectProject(),
    meta: {
      resetQueries: [
        ['session'],
        ['projects'],
        ['dictionaries'],
        ['tags'],
        ['subscription'],
        ['users'],
      ],
    },
    onSuccess: () => {
      const session = queryClient.getQueryData(['session']);

      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        project: null,
      });
    },
  });
};

export const useGetCIConfig = (options?: Partial<UseQueryOptions>) => {
  const projectAPI = useProjectAPI();

  return useAppQuery({
    queryKey: ['ci-config'],
    queryFn: ({ signal }) => projectAPI.getCIConfig({ signal }),
    requireProject: true,
    ...options,
  });
};

export const usePushCIConfig = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['ci-config'],
    mutationFn: () => projectAPI.pushCIConfig(),
    meta: {
      invalidateQueries: [['ci-config']],
    },
  });
};

export const useTriggerBuild = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['projects', 'build'],
    mutationFn: () => projectAPI.triggerBuild(),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useTriggerWebhook = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['projects', 'webhook'],
    mutationFn: (webhookIndex: number) =>
      projectAPI.triggerWebhook(webhookIndex),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useAddNewAccessKey = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['session', 'access-keys'],
    mutationFn: (args: AddNewAccessKeyBody) => projectAPI.addNewAccessKey(args),
    meta: {
      invalidateQueries: [['session']],
    },
  });
};

export const useDeleteAccessKey = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['session', 'access-keys'],
    mutationFn: (args: DeleteAccessKeyBody) => projectAPI.deleteAccessKey(args),
    meta: {
      invalidateQueries: [['session']],
    },
  });
};

export const useRefreshAccessKey = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['session', 'access-keys'],
    mutationFn: (args: RefreshAccessKeyBody) =>
      projectAPI.refreshAccessKey(args),
    meta: {
      invalidateQueries: [['session']],
    },
  });
};

export const useUpdateMemberAccess = () => {
  const projectAPI = useProjectAPI();

  return useMutation({
    mutationKey: ['projects', 'member-access'],
    mutationFn: ({
      userId,
      ...body
    }: UpdateMemberAccessBody & { userId: string }) =>
      projectAPI.updateMemberAccess(userId, body),
    meta: {
      invalidateQueries: [['projects'], ['session']],
    },
  });
};
