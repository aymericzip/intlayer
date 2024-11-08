/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useAuth } from '../components/Auth/AuthProvider/index';
import { useAsync, UseAsyncOptions } from './useAsync/useAsync';
import { useIntlayerAPI } from './useIntlayerAPI';

export const useAsyncWithAuth = <
  U extends string,
  T extends (...args: any[]) => Promise<any>,
>(
  key: U,
  asyncFunction: T,
  options?: UseAsyncOptions<T>
) => {
  const { csrfToken, oAuth2AccessToken } = useAuth();

  return useAsync(key, asyncFunction, {
    ...options,
    enable: Boolean(csrfToken || oAuth2AccessToken),
  });
};

export const useLogin = () =>
  useAsyncWithAuth('login', useIntlayerAPI().auth.login, {
    invalidateQueries: ['getSession'],
  });

export const useRegister = () =>
  useAsyncWithAuth('register', useIntlayerAPI().auth.register, {
    invalidateQueries: ['getSession'],
  });
export const useLogout = () =>
  useAsyncWithAuth('logout', useIntlayerAPI().auth.logout, {
    invalidateQueries: ['getSession'],
  });
export const useChangePassword = () =>
  useAsyncWithAuth('changePassword', useIntlayerAPI().auth.changePassword);
export const useAskResetPassword = () =>
  useAsyncWithAuth('askResetPassword', useIntlayerAPI().auth.askResetPassword);
export const useResetPassword = () =>
  useAsyncWithAuth('resetPassword', useIntlayerAPI().auth.resetPassword);
export const useVerifyEmail = () =>
  useAsyncWithAuth('verifyEmail', useIntlayerAPI().auth.verifyEmail);

export const useGetUserByAccount = () =>
  useAsyncWithAuth('getUserByAccount', useIntlayerAPI().user.getUserByAccount);

export const useGetUsers = () =>
  useAsyncWithAuth('getUsers', useIntlayerAPI().user.getUsers, {
    cache: true,
    store: true,
    retryLimit: 3,
    autoFetch: true,
    revalidateTime: 5 * 60 * 1000, // 5 minutes
  });
export const useCreateUser = () =>
  useAsyncWithAuth('createUser', useIntlayerAPI().user.createUser, {
    invalidateQueries: ['getUsers'],
  });
export const useUpdateUser = () =>
  useAsyncWithAuth('updateUser', useIntlayerAPI().user.updateUser, {
    invalidateQueries: ['getSession'],
  });
export const useDeleteUser = () =>
  useAsyncWithAuth('deleteUser', useIntlayerAPI().user.deleteUser, {
    invalidateQueries: ['getUsers'],
  });

export const useGetOrganizations = () =>
  useAsyncWithAuth(
    'getOrganizations',
    useIntlayerAPI().organization.getOrganizations,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
    }
  );

export const useAddOrganization = () =>
  useAsyncWithAuth(
    'addOrganization',
    useIntlayerAPI().organization.addOrganization,
    {
      invalidateQueries: ['getOrganizations'],
    }
  );
export const useUpdateOrganization = () =>
  useAsyncWithAuth(
    'updateOrganization',
    useIntlayerAPI().organization.updateOrganization,
    {
      invalidateQueries: ['getSession'],
    }
  );
export const useUpdateOrganizationMembers = () =>
  useAsyncWithAuth(
    'updateOrganizationMembers',
    useIntlayerAPI().organization.updateOrganizationMembers,
    {
      invalidateQueries: ['getOrganizations'],
    }
  );
export const useAddOrganizationMember = () =>
  useAsyncWithAuth(
    'addOrganizationMember',
    useIntlayerAPI().organization.addOrganizationMember,
    {
      invalidateQueries: ['getOrganizations'],
    }
  );
export const useDeleteOrganization = () =>
  useAsyncWithAuth(
    'deleteOrganization',
    useIntlayerAPI().organization.deleteOrganization,
    {
      invalidateQueries: ['getOrganizations'],
    }
  );
export const useSelectOrganization = () =>
  useAsyncWithAuth(
    'selectOrganization',
    useIntlayerAPI().organization.selectOrganization,
    {
      invalidateQueries: ['getSession'],
    }
  );
export const useUnselectOrganization = () =>
  useAsyncWithAuth(
    'unselectOrganization',
    useIntlayerAPI().organization.unselectOrganization,
    {
      invalidateQueries: ['getSession'],
    }
  );

export const useGetProjects = () =>
  useAsyncWithAuth('getProjects', useIntlayerAPI().project.getProjects, {
    cache: true,
    store: true,
    retryLimit: 3,
    autoFetch: true,
    revalidation: true,
    revalidateTime: 5 * 60 * 1000, // 5 minutes
  });
export const useAddProject = () =>
  useAsyncWithAuth('addProject', useIntlayerAPI().project.addProject, {
    invalidateQueries: ['getProjects'],
  });
export const useUpdateProject = () =>
  useAsyncWithAuth('updateProject', useIntlayerAPI().project.updateProject, {
    invalidateQueries: ['getSession'],
  });
export const useUpdateProjectMembers = () =>
  useAsyncWithAuth(
    'updateProjectMembers',
    useIntlayerAPI().project.updateProjectMembers,
    {
      invalidateQueries: ['getSession'],
    }
  );
export const useDeleteProject = () =>
  useAsyncWithAuth('deleteProject', useIntlayerAPI().project.deleteProject, {
    invalidateQueries: ['getProjects'],
  });
export const useSelectProject = () =>
  useAsyncWithAuth('selectProject', useIntlayerAPI().project.selectProject, {
    invalidateQueries: ['getSession'],
  });
export const useUnselectProject = () =>
  useAsyncWithAuth(
    'unselectProject',
    useIntlayerAPI().project.unselectProject,
    {
      invalidateQueries: ['getSession'],
    }
  );
export const useAddNewAccessKey = () =>
  useAsyncWithAuth('addNewAccessKey', useIntlayerAPI().project.addNewAccessKey);
export const useDeleteAccessKey = () =>
  useAsyncWithAuth('deleteAccessKey', useIntlayerAPI().project.deleteAccessKey);
export const useRefreshAccessKey = () =>
  useAsyncWithAuth(
    'refreshAccessKey',
    useIntlayerAPI().project.refreshAccessKey
  );

export const useGetDictionaries = () =>
  useAsyncWithAuth(
    'getDictionaries',
    useIntlayerAPI().dictionary.getDictionaries,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
    }
  );
export const useGetDictionary = () =>
  useAsyncWithAuth('getDictionary', useIntlayerAPI().dictionary.getDictionary, {
    cache: true,
    store: true,
    retryLimit: 3,
    revalidation: true,
    revalidateTime: 5 * 60 * 1000, // 5 minutes
  });
export const useAddDictionary = () =>
  useAsyncWithAuth('addDictionary', useIntlayerAPI().dictionary.addDictionary, {
    invalidateQueries: ['getDictionaries'],
  });

export const usePushDictionaries = () =>
  useAsyncWithAuth(
    'pushDictionaries',
    useIntlayerAPI().dictionary.pushDictionaries,
    {
      invalidateQueries: ['getDictionaries'],
    }
  );
export const useUpdateDictionary = () =>
  useAsyncWithAuth(
    'updateDictionary',
    useIntlayerAPI().dictionary.updateDictionary,
    {
      invalidateQueries: ['getDictionaries'],
    }
  );
export const useDeleteDictionary = () =>
  useAsyncWithAuth(
    'deleteDictionary',
    useIntlayerAPI().dictionary.deleteDictionary,
    {
      invalidateQueries: ['getDictionaries'],
    }
  );
