'use client';

import type {
  AddOrganizationBody,
  AddOrganizationMemberBody,
  GetOrganizationsParams,
  SelectOrganizationParam,
  UpdateOrganizationBody,
  UpdateOrganizationMailerConfigBody,
  UpdateOrganizationMembersBody,
} from '@intlayer/backend';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useOrganizationAPI } from '../useIntlayerAPI';
import { useAppQuery } from './utils';

export const useGetOrganizations = (filters?: GetOrganizationsParams) => {
  const organizationAPI = useOrganizationAPI();

  return useAppQuery({
    queryKey: ['organizations', filters],
    queryFn: ({ signal }) =>
      organizationAPI.getOrganizations(filters, { signal }),
    // placeholderData: keepPreviousData,
    requireUser: true,
  });
};

export const useAddOrganization = () => {
  const organizationAPI = useOrganizationAPI();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: (args: AddOrganizationBody) =>
      organizationAPI.addOrganization(args),
    meta: {
      invalidateQueries: [['organizations']],
    },
  });
};

export const useUpdateOrganization = () => {
  const organizationAPI = useOrganizationAPI();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: (args: UpdateOrganizationBody) =>
      organizationAPI.updateOrganization(args),
  });
};

export const useUpdateOrganizationMailerConfig = () => {
  const organizationAPI = useOrganizationAPI();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: (args: UpdateOrganizationMailerConfigBody) =>
      organizationAPI.updateOrganizationMailerConfig(args),
    meta: {
      invalidateQueries: [['organizations'], ['session']],
    },
  });
};

export const useUpdateOrganizationMembers = () => {
  const organizationAPI = useOrganizationAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: (args: UpdateOrganizationMembersBody) =>
      organizationAPI.updateOrganizationMembers(args),
    meta: {
      invalidateQueries: [['organizations'], ['users'], ['session']],
    },
    onSuccess: (data) => {
      // Patch the session cache immediately so member lists derived from
      // `session.organization` update without waiting for a refetch
      const session = queryClient.getQueryData(['session']);

      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        organization: data.data,
      });
    },
  });
};

export const useUpdateOrganizationMembersById = () => {
  const organizationAPI = useOrganizationAPI();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: ({
      organizationId,
      ...body
    }: {
      organizationId: string;
      membersIds: string[];
      adminsIds?: string[];
    }) => organizationAPI.updateOrganizationMembersById(organizationId, body),
    meta: {
      invalidateQueries: [['organizations'], ['users']],
    },
  });
};

export const useAddOrganizationMember = () => {
  const organizationAPI = useOrganizationAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: (args: AddOrganizationMemberBody) =>
      organizationAPI.addOrganizationMember(args),
    meta: {
      invalidateQueries: [['organizations'], ['users'], ['session']],
    },
    onSuccess: (data) => {
      // Patch the session cache immediately so member lists derived from
      // `session.organization` update without waiting for a refetch
      const session = queryClient.getQueryData(['session']);

      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        organization: data.data,
      });
    },
  });
};

export const useDeleteOrganization = () => {
  const organizationAPI = useOrganizationAPI();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: () => organizationAPI.deleteOrganization(),
    meta: {
      invalidateQueries: [['organizations'], ['session']],
    },
  });
};

export const useDeleteOrganizationById = () => {
  const organizationAPI = useOrganizationAPI();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: (organizationId: string) =>
      organizationAPI.deleteOrganizationByIdAdmin(organizationId),
    meta: {
      invalidateQueries: [['organizations']],
    },
  });
};

export const useSelectOrganization = () => {
  const organizationAPI = useOrganizationAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session-organizations'],
    mutationFn: (args: SelectOrganizationParam) =>
      organizationAPI.selectOrganization(args),
    meta: {
      invalidateQueries: [
        ['session'],
        ['organizations'],
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
        organization: data.data,
      });
    },
  });
};

export const useUnselectOrganization = () => {
  const organizationAPI = useOrganizationAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session-organizations'],
    mutationFn: () => organizationAPI.unselectOrganization(),
    meta: {
      resetQueries: [
        ['session'],
        ['organizations'],
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
        organization: null,
        project: null,
      });
    },
  });
};
