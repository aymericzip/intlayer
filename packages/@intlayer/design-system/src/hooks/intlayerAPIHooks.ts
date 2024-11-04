'use client';

import { useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthProvider/index';
import { useAsync, UseAsyncResult } from './useAsync/useAsync';
import { useIntlayerAPI } from './useIntlayerAPI';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useRevalidateWithSession = <T extends UseAsyncResult<string, any>>(
  asyncHook: T
): T => {
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      asyncHook.revalidate();
    }
  }, [session?.organization?._id, session?.project?._id, session?.user?._id]);

  return asyncHook;
};

export const useLogin = () =>
  useAsync('login', useIntlayerAPI().auth.login, {
    invalidateQueries: ['getSession'],
  });
export const useRegister = () =>
  useAsync('register', useIntlayerAPI().auth.register, {
    invalidateQueries: ['getSession'],
  });
export const useLogout = () =>
  useAsync('logout', useIntlayerAPI().auth.logout, {
    invalidateQueries: ['getSession'],
  });
export const useChangePassword = () =>
  useAsync('changePassword', useIntlayerAPI().auth.changePassword);
export const useAskResetPassword = () =>
  useAsync('askResetPassword', useIntlayerAPI().auth.askResetPassword);
export const useResetPassword = () =>
  useAsync('resetPassword', useIntlayerAPI().auth.resetPassword);
export const useVerifyEmail = () =>
  useAsync('verifyEmail', useIntlayerAPI().auth.verifyEmail);

export const useGetUserByAccount = () =>
  useAsync('getUserByAccount', useIntlayerAPI().user.getUserByAccount);

export const useGetUsers = () =>
  useRevalidateWithSession(
    useAsync('getUsers', useIntlayerAPI().user.getUsers, {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
    })
  );
export const useCreateUser = () =>
  useAsync('createUser', useIntlayerAPI().user.createUser, {
    invalidateQueries: ['getUsers'],
  });
export const useUpdateUser = () =>
  useAsync('updateUser', useIntlayerAPI().user.updateUser, {
    invalidateQueries: ['getSession'],
  });
export const useDeleteUser = () =>
  useAsync('deleteUser', useIntlayerAPI().user.deleteUser, {
    invalidateQueries: ['getUsers'],
  });

export const useGetOrganizations = () =>
  useRevalidateWithSession(
    useAsync(
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
    )
  );

export const useAddOrganization = () =>
  useAsync('addOrganization', useIntlayerAPI().organization.addOrganization, {
    invalidateQueries: ['getOrganizations'],
  });
export const useUpdateOrganization = () =>
  useAsync(
    'updateOrganization',
    useIntlayerAPI().organization.updateOrganization,
    {
      invalidateQueries: ['getSession'],
    }
  );
export const useUpdateOrganizationMembers = () =>
  useAsync(
    'updateOrganizationMembers',
    useIntlayerAPI().organization.updateOrganizationMembers,
    {
      invalidateQueries: ['getOrganizations'],
    }
  );
export const useAddOrganizationMember = () =>
  useAsync(
    'addOrganizationMember',
    useIntlayerAPI().organization.addOrganizationMember,
    {
      invalidateQueries: ['getOrganizations'],
    }
  );
export const useDeleteOrganization = () =>
  useAsync(
    'deleteOrganization',
    useIntlayerAPI().organization.deleteOrganization,
    {
      invalidateQueries: ['getOrganizations'],
    }
  );
export const useSelectOrganization = () =>
  useAsync(
    'selectOrganization',
    useIntlayerAPI().organization.selectOrganization,
    {
      invalidateQueries: ['getSession'],
    }
  );
export const useUnselectOrganization = () =>
  useAsync(
    'unselectOrganization',
    useIntlayerAPI().organization.unselectOrganization,
    {
      invalidateQueries: ['getSession'],
    }
  );

export const useGetProjects = () =>
  useRevalidateWithSession(
    useAsync('getProjects', useIntlayerAPI().project.getProjects, {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
    })
  );
export const useAddProject = () =>
  useAsync('addProject', useIntlayerAPI().project.addProject, {
    invalidateQueries: ['getProjects'],
  });
export const useUpdateProject = () =>
  useAsync('updateProject', useIntlayerAPI().project.updateProject, {
    invalidateQueries: ['getSession'],
  });
export const useUpdateProjectMembers = () =>
  useAsync(
    'updateProjectMembers',
    useIntlayerAPI().project.updateProjectMembers,
    {
      invalidateQueries: ['getSession'],
    }
  );
export const useDeleteProject = () =>
  useAsync('deleteProject', useIntlayerAPI().project.deleteProject, {
    invalidateQueries: ['getProjects'],
  });
export const useSelectProject = () =>
  useAsync('selectProject', useIntlayerAPI().project.selectProject, {
    invalidateQueries: ['getSession'],
  });
export const useUnselectProject = () =>
  useAsync('unselectProject', useIntlayerAPI().project.unselectProject, {
    invalidateQueries: ['getSession'],
  });
export const useAddNewAccessKey = () =>
  useAsync('addNewAccessKey', useIntlayerAPI().project.addNewAccessKey);
export const useDeleteAccessKey = () =>
  useAsync('deleteAccessKey', useIntlayerAPI().project.deleteAccessKey);
export const useRefreshAccessKey = () =>
  useAsync('refreshAccessKey', useIntlayerAPI().project.refreshAccessKey);

export const useGetDictionaries = () =>
  useRevalidateWithSession(
    useAsync('getDictionaries', useIntlayerAPI().dictionary.getDictionaries, {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
    })
  );
export const useAddDictionary = () =>
  useAsync('addDictionary', useIntlayerAPI().dictionary.addDictionary, {
    invalidateQueries: ['getDictionaries'],
  });

export const usePushDictionaries = () =>
  useAsync('pushDictionaries', useIntlayerAPI().dictionary.pushDictionaries, {
    invalidateQueries: ['getDictionaries'],
  });
export const useUpdateDictionary = () =>
  useAsync('updateDictionary', useIntlayerAPI().dictionary.updateDictionary, {
    invalidateQueries: ['getDictionaries'],
  });
export const useDeleteDictionary = () =>
  useAsync('deleteDictionary', useIntlayerAPI().dictionary.deleteDictionary, {
    invalidateQueries: ['getDictionaries'],
  });
