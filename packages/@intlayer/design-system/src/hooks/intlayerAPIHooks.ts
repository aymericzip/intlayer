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

export const useLogin = () => useAsync('login', useIntlayerAPI().auth.login);
export const useRegister = () =>
  useAsync('register', useIntlayerAPI().auth.register);
export const useLogout = () => useAsync('logout', useIntlayerAPI().auth.logout);
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
  useAsync('createUser', useIntlayerAPI().user.createUser);
export const useUpdateUser = () =>
  useAsync('updateUser', useIntlayerAPI().user.updateUser);
export const useDeleteUser = () =>
  useAsync('deleteUser', useIntlayerAPI().user.deleteUser);

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
  useAsync('addOrganization', useIntlayerAPI().organization.addOrganization);
export const useUpdateOrganization = () =>
  useAsync(
    'updateOrganization',
    useIntlayerAPI().organization.updateOrganization
  );
export const useUpdateOrganizationMembers = () =>
  useAsync(
    'updateOrganizationMembers',
    useIntlayerAPI().organization.updateOrganizationMembers
  );
export const useAddOrganizationMember = () =>
  useAsync(
    'addOrganizationMember',
    useIntlayerAPI().organization.addOrganizationMember
  );
export const useDeleteOrganization = () =>
  useAsync(
    'deleteOrganization',
    useIntlayerAPI().organization.deleteOrganization
  );
export const useSelectOrganization = () =>
  useAsync(
    'selectOrganization',
    useIntlayerAPI().organization.selectOrganization
  );
export const useUnselectOrganization = () =>
  useAsync(
    'unselectOrganization',
    useIntlayerAPI().organization.unselectOrganization
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
  useAsync('addProject', useIntlayerAPI().project.addProject);
export const useUpdateProject = () =>
  useAsync('updateProject', useIntlayerAPI().project.updateProject);
export const useUpdateProjectMembers = () =>
  useAsync(
    'updateProjectMembers',
    useIntlayerAPI().project.updateProjectMembers
  );
export const useDeleteProject = () =>
  useAsync('deleteProject', useIntlayerAPI().project.deleteProject);
export const useSelectProject = () =>
  useAsync('selectProject', useIntlayerAPI().project.selectProject);
export const useUnselectProject = () =>
  useAsync('unselectProject', useIntlayerAPI().project.unselectProject);
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
  useAsync('addDictionary', useIntlayerAPI().dictionary.addDictionary);

export const usePushDictionaries = () =>
  useAsync('pushDictionaries', useIntlayerAPI().dictionary.pushDictionaries);
export const useUpdateDictionary = () =>
  useAsync('updateDictionary', useIntlayerAPI().dictionary.updateDictionary);
export const useDeleteDictionary = () =>
  useAsync('deleteDictionary', useIntlayerAPI().dictionary.deleteDictionary);
