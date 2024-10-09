import { useAsync } from './useAsync/useAsync';
import { useIntlayerAPI } from './useIntlayerAPI';

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
  useAsync('getProjects', useIntlayerAPI().project.getProjects);
export const useAddProject = () =>
  useAsync('addProject', useIntlayerAPI().project.addProject);
export const useUpdateProject = () =>
  useAsync('updateProject', useIntlayerAPI().project.updateProject);
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
  useAsync('getDictionaries', useIntlayerAPI().dictionary.getDictionaries);
export const useAddDictionary = () =>
  useAsync('addDictionary', useIntlayerAPI().dictionary.addDictionary);
export const useUpdateDictionary = () =>
  useAsync('updateDictionary', useIntlayerAPI().dictionary.updateDictionary);
export const useDeleteDictionary = () =>
  useAsync('deleteDictionary', useIntlayerAPI().dictionary.deleteDictionary);
