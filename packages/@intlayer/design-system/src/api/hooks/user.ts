'use client';

import type {
  CreateUserBody,
  GetUsersParams,
  UpdateUserBody,
} from '@intlayer/backend';
import { type UseQueryOptions, useMutation } from '@tanstack/react-query';
import { useUserAPI } from '../useIntlayerAPI';
import { useAppQuery } from './utils';

export const useGetUsers = (
  filters?: GetUsersParams,
  options?: Partial<UseQueryOptions>
) => {
  const userAPI = useUserAPI();

  return useAppQuery({
    queryKey: ['users', filters],
    queryFn: () => userAPI.getUsers(filters),
    requireUser: true,
    // placeholderData: keepPreviousData,
    ...options,
  });
};

export const useGetUserById = (userId: string) => {
  const userAPI = useUserAPI();

  return useAppQuery({
    queryKey: ['users', userId],
    queryFn: () => userAPI.getUserById(userId),
    requireUser: true,
  });
};

export const useCreateUser = () => {
  const userAPI = useUserAPI();

  return useMutation({
    mutationKey: ['users'],
    mutationFn: (args: CreateUserBody) => userAPI.createUser(args),
  });
};

export const useUpdateUser = () => {
  const userAPI = useUserAPI();

  return useMutation({
    mutationKey: ['users'],
    mutationFn: (args: UpdateUserBody) => userAPI.updateUser(args),
  });
};

export const useDeleteUser = () => {
  const userAPI = useUserAPI();

  return useMutation({
    mutationKey: ['users'],
    mutationFn: (args: string) => userAPI.deleteUser(args),
    meta: {
      invalidateQueries: [['users']],
    },
  });
};

export const useUploadUserAvatar = () => {
  const userAPI = useUserAPI();

  return useMutation({
    mutationKey: ['users', 'avatar'],
    mutationFn: (file: File) => userAPI.uploadAvatar(file),
    meta: {
      invalidateQueries: [['session']],
    },
  });
};
