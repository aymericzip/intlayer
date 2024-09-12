'use client';

import { useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthProvider';
import { getIntlayerAPI } from '../libs/intlayer-api';
import { useAsync } from './useAsync';

export const useIntlayerAPI = () => {
  const { csrfToken, setCsrfToken } = useAuth();

  useEffect(() => {
    if (csrfToken) return;

    getIntlayerAPI()
      .auth.getCSRFToken()
      .then(({ data }) => {
        setCsrfToken(data?.csrf_token ?? null);
      })
      .catch((err) => console.error(err));
  }, [csrfToken]);

  return getIntlayerAPI({
    body: { csrf_token: csrfToken },
  });
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
export const useCreateUser = () =>
  useAsync('createUser', useIntlayerAPI().user.createUser);
export const useUpdateUser = () =>
  useAsync('updateUser', useIntlayerAPI().user.updateUser);
export const useDeleteUser = () =>
  useAsync('deleteUser', useIntlayerAPI().user.deleteUser);

export const useGetOrganizations = () =>
  useAsync('getOrganizations', useIntlayerAPI().organization.getOrganizations);
export const useAddOrganization = () =>
  useAsync('addOrganization', useIntlayerAPI().organization.addOrganization);
export const useUpdateOrganization = () =>
  useAsync(
    'updateOrganization',
    useIntlayerAPI().organization.updateOrganization
  );
export const useDeleteOrganization = () =>
  useAsync(
    'deleteOrganization',
    useIntlayerAPI().organization.deleteOrganization
  );

export const useGetProjects = () =>
  useAsync('getProjects', useIntlayerAPI().project.getProjects);
export const useAddProject = () =>
  useAsync('addProject', useIntlayerAPI().project.addProject);
export const useUpdateProject = () =>
  useAsync('updateProject', useIntlayerAPI().project.updateProject);
export const useDeleteProject = () =>
  useAsync('deleteProject', useIntlayerAPI().project.deleteProject);

export const useGetDictionaries = () =>
  useAsync('getDictionaries', useIntlayerAPI().dictionary.getDictionaries);
export const useAddDictionary = () =>
  useAsync('addDictionary', useIntlayerAPI().dictionary.addDictionary);
export const useUpdateDictionary = () =>
  useAsync('updateDictionary', useIntlayerAPI().dictionary.updateDictionary);
export const useDeleteDictionary = () =>
  useAsync('deleteDictionary', useIntlayerAPI().dictionary.deleteDictionary);
