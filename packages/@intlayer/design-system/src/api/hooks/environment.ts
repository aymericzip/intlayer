'use client';

import type {
  AddEnvironmentBody,
  MigrateEnvironmentBody,
  UpdateEnvironmentBody,
} from '@intlayer/backend';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEnvironmentAPI } from '../useIntlayerAPI';

export const useAddEnvironment = () => {
  const environmentAPI = useEnvironmentAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['projects', 'environments'],
    mutationFn: (args: AddEnvironmentBody) =>
      environmentAPI.addEnvironment(args),
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);
      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        project: {
          ...((session as any)?.project ?? {}),
          environments: data.data,
        },
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useUpdateEnvironment = () => {
  const environmentAPI = useEnvironmentAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['projects', 'environments'],
    mutationFn: ({
      environmentId,
      ...body
    }: UpdateEnvironmentBody & { environmentId: string }) =>
      environmentAPI.updateEnvironment(environmentId, body),
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);
      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        project: {
          ...((session as any)?.project ?? {}),
          environments: data.data,
        },
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useDeleteEnvironment = () => {
  const environmentAPI = useEnvironmentAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['projects', 'environments'],
    mutationFn: (environmentId: string) =>
      environmentAPI.deleteEnvironment(environmentId),
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);
      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        project: {
          ...((session as any)?.project ?? {}),
          environments: data.data,
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['projects', 'dictionaries'],
      });
    },
  });
};

export const useSelectEnvironment = () => {
  const environmentAPI = useEnvironmentAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session-environment'],
    mutationFn: (environmentId: string) =>
      environmentAPI.selectEnvironment(environmentId),
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);
      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        environment: data.data,
      });
      queryClient.invalidateQueries({ queryKey: ['dictionaries'] });
    },
  });
};

export const useResetToProductionEnvironment = () => {
  const environmentAPI = useEnvironmentAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session-environment'],
    mutationFn: () => environmentAPI.resetToProductionEnvironment(),
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);
      queryClient.setQueryData(['session'], {
        ...(session ?? {}),
        environment: data.data,
      });
      queryClient.invalidateQueries({ queryKey: ['dictionaries'] });
    },
  });
};

export const useMigrateEnvironment = () => {
  const environmentAPI = useEnvironmentAPI();

  return useMutation({
    mutationKey: ['projects', 'environments', 'migrate'],
    mutationFn: (args: MigrateEnvironmentBody) =>
      environmentAPI.migrateEnvironment(args),
    meta: {
      invalidateQueries: [['dictionaries']],
    },
  });
};
