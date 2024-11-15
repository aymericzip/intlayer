/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { intlayerAPI } from 'src/libs';
import { useAuth } from '../components/Auth/AuthProvider/index';
import { useToast } from '../components/Toaster';
import { useAsync, UseAsyncOptions } from './useAsync/useAsync';
import { useIntlayerAuth } from './useIntlayerAPI';

/**
 *  Hook to handle error logging and toast notifications
 */
const useErrorHandling = <T extends UseAsyncOptions<any>>(options: T): T => {
  const { toast } = useToast();

  return {
    ...options,
    onError: (errorMessage) => {
      const error = JSON.parse(errorMessage);
      toast({
        title: error.code ?? 'Error',
        description: error.message ?? 'An error occurred',
        variant: 'error',
      });
      options.onError?.(errorMessage);
    },
  };
};

/**
 * Hook to enable authentication
 */
const useAuthEnable = <T extends UseAsyncOptions<any>>(options: T): T => {
  const { csrfToken, oAuth2AccessToken } = useAuth();

  return {
    ...options,
    enable: Boolean(csrfToken || oAuth2AccessToken),
  };
};

const useAppAsync = <
  U extends string,
  T extends (...args: any[]) => Promise<any>,
>(
  key: U,
  asyncFunction: T,
  options?: UseAsyncOptions<T>
) => {
  // Enhance options using custom hooks
  const optionsWithAuth = useAuthEnable(options ?? {});
  const optionsWithErrorHandling = useErrorHandling(optionsWithAuth);

  // Call the main useAsync hook with enhanced options
  return useAsync(key, asyncFunction, optionsWithErrorHandling);
};

/**
 * Auth
 */

export const useLogin = (
  args?: UseAsyncOptions<typeof intlayerAPI.auth.login>
) => {
  return useAppAsync('login', useIntlayerAuth().auth.login, {
    invalidateQueries: ['getSession'],
    ...args,
  });
};
export const useRegister = (
  args?: UseAsyncOptions<typeof intlayerAPI.auth.register>
) =>
  useAppAsync('register', useIntlayerAuth().auth.register, {
    invalidateQueries: ['getSession'],
    ...args,
  });
export const useLogout = (
  args?: UseAsyncOptions<typeof intlayerAPI.auth.logout>
) =>
  useAppAsync('logout', useIntlayerAuth().auth.logout, {
    invalidateQueries: ['getSession'],
    ...args,
  });
export const useChangePassword = (
  args?: UseAsyncOptions<typeof intlayerAPI.auth.changePassword>
) => useAppAsync('changePassword', useIntlayerAuth().auth.changePassword, args);
export const useAskResetPassword = (
  args?: UseAsyncOptions<typeof intlayerAPI.auth.askResetPassword>
) =>
  useAppAsync(
    'askResetPassword',
    useIntlayerAuth().auth.askResetPassword,
    args
  );
export const useResetPassword = (
  args?: UseAsyncOptions<typeof intlayerAPI.auth.resetPassword>
) => useAppAsync('resetPassword', useIntlayerAuth().auth.resetPassword, args);
export const useVerifyEmail = (
  args?: UseAsyncOptions<typeof intlayerAPI.auth.verifyEmail>
) => useAppAsync('verifyEmail', useIntlayerAuth().auth.verifyEmail, args);

export const useGetUserByAccount = (
  args?: UseAsyncOptions<typeof intlayerAPI.user.getUserByAccount>
) =>
  useAppAsync(
    'getUserByAccount',
    useIntlayerAuth().user.getUserByAccount,
    args
  );

/**
 * User
 */

export const useGetUsers = (
  args?: UseAsyncOptions<typeof intlayerAPI.user.getUsers>
) =>
  useAppAsync('getUsers', useIntlayerAuth().user.getUsers, {
    cache: true,
    store: true,
    retryLimit: 3,
    autoFetch: true,
    revalidateTime: 5 * 60 * 1000, // 5 minutes
    ...args,
  });
export const useCreateUser = (
  args?: UseAsyncOptions<typeof intlayerAPI.user.createUser>
) =>
  useAppAsync('createUser', useIntlayerAuth().user.createUser, {
    invalidateQueries: ['getUsers'],
    ...args,
  });
export const useUpdateUser = (
  args?: UseAsyncOptions<typeof intlayerAPI.user.updateUser>
) =>
  useAppAsync('updateUser', useIntlayerAuth().user.updateUser, {
    invalidateQueries: ['getSession'],
    ...args,
  });
export const useDeleteUser = (
  args?: UseAsyncOptions<typeof intlayerAPI.user.deleteUser>
) =>
  useAppAsync('deleteUser', useIntlayerAuth().user.deleteUser, {
    invalidateQueries: ['getUsers'],
    ...args,
  });

/**
 * Organization
 */

export const useGetOrganizations = (
  args?: UseAsyncOptions<typeof intlayerAPI.organization.getOrganizations>
) =>
  useAppAsync(
    'getOrganizations',
    useIntlayerAuth().organization.getOrganizations,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
      ...args,
    }
  );

export const useAddOrganization = (
  args?: UseAsyncOptions<typeof intlayerAPI.organization.addOrganization>
) =>
  useAppAsync(
    'addOrganization',
    useIntlayerAuth().organization.addOrganization,
    {
      invalidateQueries: ['getOrganizations'],
      ...args,
    }
  );
export const useUpdateOrganization = (
  args?: UseAsyncOptions<typeof intlayerAPI.organization.updateOrganization>
) =>
  useAppAsync(
    'updateOrganization',
    useIntlayerAuth().organization.updateOrganization,
    {
      invalidateQueries: ['getSession'],
      ...args,
    }
  );
export const useUpdateOrganizationMembers = (
  args?: UseAsyncOptions<
    typeof intlayerAPI.organization.updateOrganizationMembers
  >
) =>
  useAppAsync(
    'updateOrganizationMembers',
    useIntlayerAuth().organization.updateOrganizationMembers,
    {
      invalidateQueries: ['getOrganizations'],
      ...args,
    }
  );
export const useAddOrganizationMember = (
  args?: UseAsyncOptions<typeof intlayerAPI.organization.addOrganizationMember>
) =>
  useAppAsync(
    'addOrganizationMember',
    useIntlayerAuth().organization.addOrganizationMember,
    {
      invalidateQueries: ['getOrganizations'],
      ...args,
    }
  );
export const useDeleteOrganization = (
  args?: UseAsyncOptions<typeof intlayerAPI.organization.deleteOrganization>
) =>
  useAppAsync(
    'deleteOrganization',
    useIntlayerAuth().organization.deleteOrganization,
    {
      invalidateQueries: ['getOrganizations'],
      ...args,
    }
  );
export const useSelectOrganization = (
  args?: UseAsyncOptions<typeof intlayerAPI.organization.selectOrganization>
) =>
  useAppAsync(
    'selectOrganization',
    useIntlayerAuth().organization.selectOrganization,
    {
      invalidateQueries: ['getSession'],
      ...args,
    }
  );
export const useUnselectOrganization = (
  args?: UseAsyncOptions<typeof intlayerAPI.organization.unselectOrganization>
) =>
  useAppAsync(
    'unselectOrganization',
    useIntlayerAuth().organization.unselectOrganization,
    {
      invalidateQueries: ['getSession'],
      ...args,
    }
  );

/**
 * Project
 */

export const useGetProjects = (
  args?: UseAsyncOptions<typeof intlayerAPI.project.getProjects>
) =>
  useAppAsync('getProjects', useIntlayerAuth().project.getProjects, {
    cache: true,
    store: true,
    retryLimit: 3,
    autoFetch: true,
    revalidation: true,
    revalidateTime: 5 * 60 * 1000, // 5 minutes
    ...args,
  });
export const useAddProject = (
  args?: UseAsyncOptions<typeof intlayerAPI.project.addProject>
) =>
  useAppAsync('addProject', useIntlayerAuth().project.addProject, {
    invalidateQueries: ['getProjects'],
    ...args,
  });
export const useUpdateProject = (
  args?: UseAsyncOptions<typeof intlayerAPI.project.updateProject>
) =>
  useAppAsync('updateProject', useIntlayerAuth().project.updateProject, {
    invalidateQueries: ['getSession'],
    ...args,
  });
export const useUpdateProjectMembers = (
  args?: UseAsyncOptions<typeof intlayerAPI.project.updateProjectMembers>
) =>
  useAppAsync(
    'updateProjectMembers',
    useIntlayerAuth().project.updateProjectMembers,
    {
      invalidateQueries: ['getSession'],
      ...args,
    }
  );
export const useDeleteProject = (
  args?: UseAsyncOptions<typeof intlayerAPI.project.deleteProject>
) =>
  useAppAsync('deleteProject', useIntlayerAuth().project.deleteProject, {
    invalidateQueries: ['getProjects'],
    ...args,
  });
export const useSelectProject = (
  args?: UseAsyncOptions<typeof intlayerAPI.project.selectProject>
) =>
  useAppAsync('selectProject', useIntlayerAuth().project.selectProject, {
    invalidateQueries: ['getSession'],
    ...args,
  });
export const useUnselectProject = (
  args?: UseAsyncOptions<typeof intlayerAPI.project.unselectProject>
) =>
  useAppAsync('unselectProject', useIntlayerAuth().project.unselectProject, {
    invalidateQueries: ['getSession'],
    ...args,
  });
export const useAddNewAccessKey = (
  args?: UseAsyncOptions<typeof intlayerAPI.project.addNewAccessKey>
) =>
  useAppAsync('addNewAccessKey', useIntlayerAuth().project.addNewAccessKey, {
    invalidateQueries: ['getProjects', 'getSession'],
    ...args,
  });
export const useDeleteAccessKey = (
  args?: UseAsyncOptions<typeof intlayerAPI.project.deleteAccessKey>
) =>
  useAppAsync('deleteAccessKey', useIntlayerAuth().project.deleteAccessKey, {
    invalidateQueries: ['getProjects', 'getSession'],
    ...args,
  });
export const useRefreshAccessKey = (
  args?: UseAsyncOptions<typeof intlayerAPI.project.refreshAccessKey>
) =>
  useAppAsync('refreshAccessKey', useIntlayerAuth().project.refreshAccessKey, {
    invalidateQueries: ['getProjects', 'getSession'],
    ...args,
  });

/**
 * Dictionary
 */

export const useGetDictionaries = (
  args?: UseAsyncOptions<typeof intlayerAPI.dictionary.getDictionaries>
) =>
  useAppAsync('getDictionaries', useIntlayerAuth().dictionary.getDictionaries, {
    cache: true,
    store: true,
    retryLimit: 3,
    autoFetch: true,
    revalidation: true,
    revalidateTime: 5 * 60 * 1000, // 5 minutes
    ...args,
  });

export const useGetDictionariesKeys = (
  args?: UseAsyncOptions<typeof intlayerAPI.dictionary.getDictionariesKeys>
) =>
  useAppAsync(
    'getDictionariesKeys',
    useIntlayerAuth().dictionary.getDictionariesKeys,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
      ...args,
    }
  );

export const useGetDictionary = (
  args?: UseAsyncOptions<typeof intlayerAPI.dictionary.getDictionary>
) =>
  useAppAsync('getDictionary', useIntlayerAuth().dictionary.getDictionary, {
    cache: true,
    store: true,
    retryLimit: 3,
    revalidation: true,
    revalidateTime: 5 * 60 * 1000, // 5 minutes
    ...args,
  });
export const useAddDictionary = (
  args?: UseAsyncOptions<typeof intlayerAPI.dictionary.addDictionary>
) =>
  useAppAsync('addDictionary', useIntlayerAuth().dictionary.addDictionary, {
    invalidateQueries: ['getDictionaries', 'getDictionariesKeys'],
    ...args,
  });

export const usePushDictionaries = (
  args?: UseAsyncOptions<typeof intlayerAPI.dictionary.pushDictionaries>
) =>
  useAppAsync(
    'pushDictionaries',
    useIntlayerAuth().dictionary.pushDictionaries,
    {
      invalidateQueries: ['getDictionaries', 'getDictionariesKeys'],
      ...args,
    }
  );
export const useUpdateDictionary = (
  args?: UseAsyncOptions<typeof intlayerAPI.dictionary.updateDictionary>
) =>
  useAppAsync(
    'updateDictionary',
    useIntlayerAuth().dictionary.updateDictionary,
    {
      invalidateQueries: ['getDictionaries'],
      ...args,
    }
  );
export const useDeleteDictionary = (
  args?: UseAsyncOptions<typeof intlayerAPI.dictionary.deleteDictionary>
) =>
  useAppAsync(
    'deleteDictionary',
    useIntlayerAuth().dictionary.deleteDictionary,
    {
      invalidateQueries: ['getDictionaries', 'getDictionariesKeys'],
      ...args,
    }
  );
