'use client';

import type {} from '@better-fetch/fetch'; // Import for type inference
import type {
  AddDictionaryBody,
  AddNewAccessKeyBody,
  AddOrganizationBody,
  AddOrganizationMemberBody,
  AddProjectBody,
  AddTagBody,
  AskDocQuestionBody,
  AuditContentDeclarationBody,
  AuditContentDeclarationFieldBody,
  AuditContentDeclarationMetadataBody,
  AuditTagBody,
  AutocompleteBody,
  CreateUserBody,
  DeleteAccessKeyBody,
  DeleteDictionaryParam,
  DeleteTagParams,
  GetCheckoutSessionBody,
  GetDictionariesParams,
  GetDictionaryParams,
  GetDictionaryQuery,
  GetOrganizationsParams,
  GetPricingBody,
  GetPricingResult,
  GetProjectsParams,
  GetTagsParams,
  GetUsersParams,
  NewsletterSubscriptionBody,
  NewsletterUnsubscriptionBody,
  PushDictionariesBody,
  RefreshAccessKeyBody,
  SearchDocUtilParams,
  SelectOrganizationParam,
  SelectProjectParam,
  TranslateJSONBody,
  UpdateDictionaryBody,
  UpdateOrganizationBody,
  UpdateOrganizationMembersBody,
  UpdateProjectBody,
  UpdateProjectMembersBody,
  UpdateUserBody,
} from '@intlayer/backend';

import { useConfiguration } from '@intlayer/editor-react';
import {
  type UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type {} from 'better-auth'; // Import for type inference
// @ts-ignore
import type { WriteContentDeclarationBody } from 'intlayer-editor';
import type { AuthAPI } from '../libs/auth';
import { useAuth } from './useAuth';
import { useIntlayerAuth, useIntlayerOAuth } from './useIntlayerAPI';

export { useQueryClient };

type AuthEnableOptions = {
  requireUser?: boolean;
  requireProject?: boolean;
  requireOrganization?: boolean;
};

/**
 * Hook to enable authentication
 */
const useAuthEnable = ({
  requireUser,
  requireProject,
  requireOrganization,
}: AuthEnableOptions) => {
  const configuration = useConfiguration();
  const { oAuth2AccessToken, session } = useAuth({
    intlayerConfiguration: configuration,
  });

  const user = session ? session.user : oAuth2AccessToken?.user;

  const organization = session
    ? session.organization
    : oAuth2AccessToken?.organization;

  const project = session ? session.project : oAuth2AccessToken?.project;

  const isUserEnabled = requireUser ? Boolean(user) : true;

  const isProjectEnabled = requireProject ? Boolean(project) : true;

  const isOrganizationEnabled = requireOrganization
    ? Boolean(organization)
    : true;

  const isEnabled = isUserEnabled && isProjectEnabled && isOrganizationEnabled;

  return {
    enable: isEnabled,
  };
};

export const useAppQuery = (
  options: UseQueryOptions & {
    requireUser?: boolean;
    requireProject?: boolean;
    requireOrganization?: boolean;
  }
) => {
  const { requireUser, requireProject, requireOrganization, ...rest } = options;
  const { enable } = useAuthEnable({
    requireUser,
    requireProject,
    requireOrganization,
  });

  const result = useQuery({
    enabled: rest?.enabled === false ? false : enable,
    ...rest,
  });

  return result;
};

// Removed unused useEditorMutation

/**
 * Auth
 */

export const useLogin = () => {
  const intlayerAuth = useIntlayerAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (args: Parameters<AuthAPI['signInEmail']>[0]) =>
      intlayerAuth.signInEmail(args),
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);

      if (session && data.data?.user) {
        queryClient.setQueryData(['session'], {
          ...session,
          user: data.data.user,
        });
      }
    },
  });
};

export const useGetVerifyEmailStatus = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['getVerifyEmailStatus'],
    mutationFn: (args: Parameters<AuthAPI['verifyEmailSession']>) =>
      intlayerAuth.verifyEmailSession(...args),
  });
};

export const useRegister = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (args: Parameters<AuthAPI['signUpEmail']>[0]) =>
      intlayerAuth.signUpEmail(args),
    meta: {
      resetQueries: [['session']],
    },
  });
};

export const useLogout = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => intlayerAuth.signOut(),
    meta: {
      resetQueries: [
        ['session'],
        ['users'],
        ['organizations'],
        ['projects'],
        ['dictionaries'],
        ['tags'],
      ],
    },
  });
};

export const useChangePassword = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (args: Parameters<AuthAPI['changePasswordSession']>) =>
      intlayerAuth.changePasswordSession(...args),
  });
};

export const useAskResetPassword = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['askResetPassword'],
    mutationFn: (args: Parameters<AuthAPI['requestPasswordResetSession']>[0]) =>
      intlayerAuth.requestPasswordResetSession(args),
  });
};

export const useResetPassword = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: (args: Parameters<AuthAPI['resetPassword']>[0]) =>
      intlayerAuth.resetPassword(args),
  });
};

export const useVerifyEmail = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['verifyEmail'],
    mutationFn: (args: Parameters<AuthAPI['verifyEmailSession']>[0]) =>
      intlayerAuth.verifyEmailSession(args),
  });
};

export const useGetUserByAccount = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['user'],
    mutationFn: (args: Parameters<AuthAPI['accountInfo']>[0]) =>
      intlayerAuth.accountInfo(args),
  });
};

export const useEnableTwoFactor = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['enableTwoFactor'],
    mutationFn: (args: Parameters<AuthAPI['enableTwoFactor']>[0]) =>
      intlayerAuth.enableTwoFactor(args),
  });
};

export const useDisableTwoFactor = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['disableTwoFactor'],
    mutationFn: (args: Parameters<AuthAPI['disableTwoFactor']>[0]) =>
      intlayerAuth.disableTwoFactor(args),
  });
};

export const useVerifyTotp = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['verifyTotp'],
    mutationFn: (args: Parameters<AuthAPI['verifyTotp']>[0]) =>
      intlayerAuth.verifyTotp(args),
  });
};

export const useVerifyBackupCode = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['verifyBackupCode'],
    mutationFn: (args: Parameters<AuthAPI['verifyBackupCode']>[0]) =>
      intlayerAuth.verifyBackupCode(args),
  });
};

export const useAddPasskey = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['addPasskey'],
    mutationFn: (args: Parameters<AuthAPI['addPasskey']>[0]) =>
      intlayerAuth.addPasskey(args),
  });
};

export const useSignInPasskey = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['signInPasskey'],
    mutationFn: (args?: Parameters<AuthAPI['signInPasskey']>[0]) =>
      intlayerAuth.signInPasskey(args),
  });
};

export const useDeletePasskey = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['deletePasskey'],
    mutationFn: (args: Parameters<AuthAPI['deletePasskey']>[0]) =>
      intlayerAuth.deletePasskey(args),
  });
};

export const useListPasskeys = () => {
  const intlayerAuth = useIntlayerAuth();
  return useQuery({
    queryKey: ['listPasskeys'],
    queryFn: () => intlayerAuth.listPasskeys(),
  });
};

export const useSignInMagicLink = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['signInMagicLink'],
    mutationFn: (args?: any) => intlayerAuth.signInMagicLink(args),
  });
};

export const useRegisterSSO = () => {
  const intlayerAuth = useIntlayerAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['registerSSO'],
    mutationFn: (args: Parameters<AuthAPI['registerSSO']>[0]) =>
      intlayerAuth.registerSSO(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ssoProviders'] });
    },
  });
};

export const useSignInSSO = () => {
  const intlayerAuth = useIntlayerAuth();
  return useMutation({
    mutationKey: ['signInSSO'],
    mutationFn: (args: Parameters<AuthAPI['signInSSO']>[0]) =>
      intlayerAuth.signInSSO(args),
  });
};

export const useListSSOProviders = () => {
  const intlayerAuth = useIntlayerAuth();
  return useQuery({
    queryKey: ['ssoProviders'],
    queryFn: () => intlayerAuth.listSSOProviders(),
  });
};

export const useDeleteSSOProvider = () => {
  const intlayerAuth = useIntlayerAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteSSOProvider'],
    mutationFn: (args: Parameters<AuthAPI['deleteSSOProvider']>[0]) =>
      intlayerAuth.deleteSSOProvider(args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ssoProviders'] });
    },
  });
};

/**
 * User
 */

export const useGetUsers = (
  filters?: GetUsersParams,
  options?: Partial<UseQueryOptions>
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['users', filters],
    queryFn: () => intlayerOAuth.user.getUsers(filters),
    requireUser: true,
    // placeholderData: keepPreviousData,
    ...options,
  });
};

export const useGetUserById = (userId: string) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['users', userId],
    queryFn: () => intlayerOAuth.user.getUserById(userId),
    requireUser: true,
  });
};

export const useCreateUser = () => {
  const intlayerAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['users'],
    mutationFn: (args: CreateUserBody) => intlayerAuth.user.createUser(args),
  });
};

export const useUpdateUser = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['users'],
    mutationFn: (args: UpdateUserBody) => intlayerOAuth.user.updateUser(args),
  });
};

export const useDeleteUser = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['users'],
    mutationFn: (args: string) => intlayerOAuth.user.deleteUser(args),
    meta: {
      invalidateQueries: [['users']],
    },
  });
};

/**
 * Organization
 */

export const useGetOrganizations = (filters?: GetOrganizationsParams) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['organizations', filters],
    queryFn: ({ signal }) =>
      intlayerOAuth.organization.getOrganizations(filters, { signal }),
    // placeholderData: keepPreviousData,
    requireUser: true,
  });
};

export const useAddOrganization = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: (args: AddOrganizationBody) =>
      intlayerOAuth.organization.addOrganization(args),
  });
};

export const useUpdateOrganization = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: (args: UpdateOrganizationBody) =>
      intlayerOAuth.organization.updateOrganization(args),
  });
};

export const useUpdateOrganizationMembers = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: (args: UpdateOrganizationMembersBody) =>
      intlayerOAuth.organization.updateOrganizationMembers(args),
    meta: {
      invalidateQueries: [['organizations'], ['users']],
    },
  });
};

export const useUpdateOrganizationMembersById = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: ({
      organizationId,
      ...body
    }: {
      organizationId: string;
      membersIds: string[];
      adminsIds?: string[];
    }) =>
      intlayerOAuth.organization.updateOrganizationMembersById(
        organizationId,
        body
      ),
    meta: {
      invalidateQueries: [['organizations'], ['users']],
    },
  });
};

export const useAddOrganizationMember = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: (args: AddOrganizationMemberBody) =>
      intlayerOAuth.organization.addOrganizationMember(args),
    meta: {
      invalidateQueries: [['organizations']],
    },
  });
};

export const useDeleteOrganization = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: () => intlayerOAuth.organization.deleteOrganization(),
    meta: {
      invalidateQueries: [['organizations']],
    },
  });
};

export const useSelectOrganization = () => {
  const intlayerOAuth = useIntlayerOAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session-organizations'],
    mutationFn: (args: SelectOrganizationParam) =>
      intlayerOAuth.organization.selectOrganization(args),
    meta: {
      invalidateQueries: [
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

      if (session) {
        queryClient.setQueryData(['session'], {
          ...session,
          organization: data.data,
        });
      }
    },
  });
};

export const useUnselectOrganization = () => {
  const intlayerOAuth = useIntlayerOAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session-organizations'],
    mutationFn: () => intlayerOAuth.organization.unselectOrganization(),
    meta: {
      resetQueries: [
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

      if (session) {
        queryClient.setQueryData(['session'], {
          ...session,
          organization: null,
          project: null,
        });
      }
    },
  });
};

/**
 * Project
 */

export const useGetProjects = (
  filters?: GetProjectsParams,
  options?: Partial<UseQueryOptions>
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['projects', filters],
    queryFn: ({ signal }) =>
      intlayerOAuth.project.getProjects(filters, { signal }),
    // placeholderData: keepPreviousData,
    requireUser: true,
    requireOrganization: true,
    ...options,
  });
};

export const useAddProject = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (args: AddProjectBody) =>
      intlayerOAuth.project.addProject(args),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useUpdateProject = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (args: UpdateProjectBody) =>
      intlayerOAuth.project.updateProject(args),
    meta: {
      invalidateQueries: [['projects'], ['session']],
    },
  });
};

export const useUpdateProjectMembers = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (args: UpdateProjectMembersBody) =>
      intlayerOAuth.project.updateProjectMembers(args),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useDeleteProject = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: () => intlayerOAuth.project.deleteProject(),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useSelectProject = () => {
  const intlayerOAuth = useIntlayerOAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session-projects'],
    mutationFn: (args: SelectProjectParam) =>
      intlayerOAuth.project.selectProject(args),
    meta: {
      invalidateQueries: [
        ['projects'],
        ['dictionaries'],
        ['tags'],
        ['subscription'],
        ['users'],
      ],
    },
    onSuccess: (data) => {
      const session = queryClient.getQueryData(['session']);

      if (session) {
        queryClient.setQueryData(['session'], {
          ...session,
          project: data.data,
        });
      }
    },
  });
};

export const useUnselectProject = () => {
  const intlayerOAuth = useIntlayerOAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['session-projects'],
    mutationFn: () => intlayerOAuth.project.unselectProject(),
    meta: {
      resetQueries: [
        ['projects'],
        ['dictionaries'],
        ['tags'],
        ['subscription'],
        ['users'],
      ],
    },
    onSuccess: () => {
      const session = queryClient.getQueryData(['session']);

      if (session) {
        queryClient.setQueryData(['session'], {
          ...session,
          project: null,
        });
      }
    },
  });
};

export const useGetCIConfig = (options?: Partial<UseQueryOptions>) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['ci-config'],
    queryFn: ({ signal }) => intlayerOAuth.project.getCIConfig({ signal }),
    requireProject: true,
    ...options,
  });
};

export const usePushCIConfig = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ci-config'],
    mutationFn: () => intlayerOAuth.project.pushCIConfig(),
    meta: {
      invalidateQueries: [['ci-config']],
    },
  });
};

export const useTriggerBuild = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects', 'build'],
    mutationFn: () => intlayerOAuth.project.triggerBuild(),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useTriggerWebhook = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects', 'webhook'],
    mutationFn: (webhookIndex: number) =>
      intlayerOAuth.project.triggerWebhook(webhookIndex),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useAddNewAccessKey = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (args: AddNewAccessKeyBody) =>
      intlayerOAuth.project.addNewAccessKey(args),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useDeleteAccessKey = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (args: DeleteAccessKeyBody) =>
      intlayerOAuth.project.deleteAccessKey(args),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useRefreshAccessKey = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: (args: RefreshAccessKeyBody) =>
      intlayerOAuth.project.refreshAccessKey(args),
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

/**
 * Dictionary
 */

export const useGetDictionaries = (
  filters?: GetDictionariesParams,
  options?: Partial<UseQueryOptions>
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['dictionaries', filters],
    queryFn: ({ signal }) =>
      intlayerOAuth.dictionary.getDictionaries(filters, { signal }),
    // placeholderData: keepPreviousData,
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

export const useInfiniteGetDictionaries = (
  filters?: Omit<GetDictionariesParams, 'page'>,
  options?: Partial<UseQueryOptions>
) => {
  const intlayerOAuth = useIntlayerOAuth();
  const { enable } = useAuthEnable({
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
  });

  return useInfiniteQuery({
    queryKey: ['dictionaries', 'infinite', filters],
    queryFn: async ({ pageParam = 1, signal }) => {
      const res = await intlayerOAuth.dictionary.getDictionaries(
        { ...filters, page: pageParam },
        { signal }
      );
      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length === 0) return undefined;
      const currentPage = lastPage.page ?? 1;
      const totalPages = lastPage.total_pages ?? 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: options?.enabled === false ? false : enable,
    ...options,
  });
};

export const useGetDictionariesKeys = (options?: Partial<UseQueryOptions>) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['dictionariesKeys'],
    queryFn: () => intlayerOAuth.dictionary.getDictionariesKeys(),
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

export const useGetDictionary = (
  dictionaryKey: GetDictionaryParams['dictionaryKey'],
  version?: GetDictionaryQuery['version'],
  options?: Partial<UseQueryOptions>
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['dictionary', dictionaryKey],
    queryFn: ({ signal }) =>
      intlayerOAuth.dictionary.getDictionary(dictionaryKey, version, {
        signal,
      }),
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

export const useAddDictionary = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: (args: AddDictionaryBody) =>
      intlayerOAuth.dictionary.addDictionary(args),
    meta: {
      invalidateQueries: [['dictionaries'], ['dictionariesKeys']],
    },
  });
};

export const usePushDictionaries = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: (args: PushDictionariesBody) =>
      intlayerOAuth.dictionary.pushDictionaries(args.dictionaries),
    meta: {
      invalidateQueries: [['dictionaries'], ['dictionariesKeys']],
    },
  });
};

export const useUpdateDictionary = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: (args: UpdateDictionaryBody) =>
      intlayerOAuth.dictionary.updateDictionary(args),
    meta: {
      invalidateQueries: [['dictionaries'], ['dictionariesKeys']],
    },
  });
};

export const useDeleteDictionary = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: (args: DeleteDictionaryParam) =>
      intlayerOAuth.dictionary.deleteDictionary(args.dictionaryId),
    meta: {
      invalidateQueries: [['dictionaries'], ['dictionariesKeys']],
    },
  });
};

/**
 * Tag
 */

export const useGetTags = (
  filters?: GetTagsParams,
  options?: Partial<UseQueryOptions>
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['tags', filters],
    queryFn: ({ signal }) => intlayerOAuth.tag.getTags(filters, { signal }),
    // placeholderData: keepPreviousData,
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

export const useAddTag = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['tags'],
    mutationFn: (args: AddTagBody) => intlayerOAuth.tag.addTag(args),
    meta: {
      invalidateQueries: [['tags']],
    },
  });
};

export const useUpdateTag = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['tags'],
    mutationFn: (v: { tagId: string; tag: any }) =>
      intlayerOAuth.tag.updateTag(v.tagId, v.tag),
    meta: {
      invalidateQueries: [['tags']],
    },
  });
};

export const useDeleteTag = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['tags'],
    mutationFn: (args: DeleteTagParams) => intlayerOAuth.tag.deleteTag(args),
    meta: {
      invalidateQueries: [['tags']],
    },
  });
};

/**
 * Stripe
 */

export const useGetPricing = (
  body: GetPricingBody,
  options?: Partial<UseQueryOptions<GetPricingResult>>
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useQuery({
    queryKey: ['pricing', body],
    queryFn: ({ signal }) => intlayerOAuth.stripe.getPricing(body, { signal }),
    ...options,
  });
};

export const useGetSubscription = (
  body: GetCheckoutSessionBody,
  options?: Partial<UseQueryOptions>
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['subscription', body],
    queryFn: ({ signal }) =>
      intlayerOAuth.stripe.getSubscription(body, { signal }),
    requireUser: true,
    requireOrganization: true,
    ...options,
  });
};

export const useCancelSubscription = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['subscription'],
    mutationFn: () => intlayerOAuth.stripe.cancelSubscription(),
    meta: {
      invalidateQueries: [['session'], ['subscription']],
    },
  });
};

/**
 * AI
 */

export const useTranslateJSONDeclaration = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-translateJSON'],
    mutationFn: (args: TranslateJSONBody) =>
      intlayerOAuth.ai.translateJSON(args),
  });
};

export const useAuditContentDeclaration = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-auditContentDeclaration'],
    mutationFn: (args: AuditContentDeclarationBody) =>
      intlayerOAuth.ai.auditContentDeclaration(args),
  });
};

export const useAuditContentDeclarationMetadata = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-auditContentDeclarationMetadata'],
    mutationFn: (args: AuditContentDeclarationMetadataBody) =>
      intlayerOAuth.ai.auditContentDeclarationMetadata(args),
  });
};

export const useAuditContentDeclarationField = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-auditContentDeclarationField'],
    mutationFn: (args: AuditContentDeclarationFieldBody) =>
      intlayerOAuth.ai.auditContentDeclarationField(args),
  });
};

export const useAuditTag = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-auditTag'],
    mutationFn: (args: AuditTagBody) => intlayerOAuth.ai.auditTag(args),
  });
};

export const useAskDocQuestion = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: [],
    mutationFn: (args?: AskDocQuestionBody) =>
      intlayerOAuth.ai.askDocQuestion(args),
  });
};

export const useAutocomplete = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-autocomplete'],
    mutationFn: (args?: AutocompleteBody) =>
      intlayerOAuth.ai.autocomplete(args),
  });
};

/**
 * Discussions
 */

export const useGetDiscussions = (
  params?: Record<string, string | string[] | undefined>,
  options?: Partial<UseQueryOptions>
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['discussions', params],
    queryFn: ({ signal }) =>
      intlayerOAuth.ai.getDiscussions(params, { signal, cache: 'no-store' }),
    requireUser: true,
    ...options,
  });
};

export const useGetDiscussionsData = (
  params?: Record<string, string | string[] | undefined>,
  options?: Partial<UseQueryOptions>
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['discussions-data', params],
    queryFn: ({ signal }) =>
      intlayerOAuth.ai.getDiscussions(
        { includeMessages: 'false', ...(params ?? {}) } as any,
        { signal, cache: 'no-store' }
      ),
    requireUser: true,
    ...options,
  });
};

/**
 * Search
 */

export const useSearchDoc = (params: SearchDocUtilParams) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useQuery({
    queryKey: ['search', params],
    queryFn: () => intlayerOAuth.search.searchDoc(params),
    enabled: (params?.input?.length ?? 0) > 3,
  });
};

/**
 * Newsletter
 */

export const useSubscribeToNewsletter = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['newsletter'],
    mutationFn: (args: NewsletterSubscriptionBody) =>
      intlayerOAuth.newsletter.subscribeToNewsletter(args),
  });
};

export const useUnsubscribeFromNewsletter = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['newsletter'],
    mutationFn: (args: NewsletterUnsubscriptionBody) =>
      intlayerOAuth.newsletter.unsubscribeFromNewsletter(args),
  });
};

export const useGetNewsletterStatus = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['newsletter'],
    mutationFn: () => intlayerOAuth.newsletter.getNewsletterStatus(),
  });
};

/**
 * GitHub
 */

export const useGithubGetAuthUrl = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['github', 'auth-url'],
    mutationFn: (redirectUri: string) =>
      intlayerOAuth.github.getAuthUrl(redirectUri),
  });
};

export const useGithubAuth = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['github', 'auth'],
    mutationFn: (code: string) => intlayerOAuth.github.authenticate(code),
  });
};

export const useGithubRepos = (enabled: boolean = true) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useQuery({
    queryKey: ['github', 'repos'],
    queryFn: () => intlayerOAuth.github.getRepositories(),
    enabled,
  });
};

export const useGithubCheckConfig = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['github', 'check-config'],
    mutationFn: (args: {
      owner: string;
      repository: string;
      branch?: string;
    }) =>
      intlayerOAuth.github.checkIntlayerConfig(
        undefined,
        args.owner,
        args.repository,
        args.branch
      ),
  });
};

export const useGithubGetConfigFile = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['github', 'get-config-file'],
    mutationFn: (args: {
      owner: string;
      repository: string;
      branch?: string;
      path?: string;
    }) =>
      intlayerOAuth.github.getConfigFile(
        undefined,
        args.owner,
        args.repository,
        args.branch,
        args.path
      ),
  });
};

/**
 * GitLab
 */

export const useGitlabAuth = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['gitlab', 'auth'],
    mutationFn: (args: {
      code: string;
      redirectUri: string;
      instanceUrl?: string;
    }) =>
      intlayerOAuth.gitlab.authenticate(
        args.code,
        args.redirectUri,
        args.instanceUrl
      ),
  });
};

export const useGitlabProjects = (
  enabled: boolean = true,
  instanceUrl?: string
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useQuery({
    queryKey: ['gitlab', 'projects', instanceUrl],
    queryFn: () => intlayerOAuth.gitlab.getProjects(undefined, instanceUrl),
    enabled,
  });
};

export const useGitlabCheckConfig = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['gitlab', 'check-config'],
    mutationFn: (args: {
      projectId: number;
      branch?: string;
      instanceUrl?: string;
    }) =>
      intlayerOAuth.gitlab.checkIntlayerConfig(
        undefined,
        args.projectId,
        args.branch,
        args.instanceUrl
      ),
  });
};

export const useGitlabGetConfigFile = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['gitlab', 'get-config-file'],
    mutationFn: (args: {
      projectId: number;
      branch?: string;
      path?: string;
      instanceUrl?: string;
    }) =>
      intlayerOAuth.gitlab.getConfigFile(
        undefined,
        args.projectId,
        args.branch,
        args.path,
        args.instanceUrl
      ),
  });
};

/**
 * Bitbucket
 */

export const useBitbucketAuth = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['bitbucket', 'auth'],
    mutationFn: (code: string) => intlayerOAuth.bitbucket.authenticate(code),
  });
};

export const useBitbucketRepos = (enabled: boolean = true) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useQuery({
    queryKey: ['bitbucket', 'repos'],
    queryFn: () => intlayerOAuth.bitbucket.getRepositories(),
    enabled,
  });
};

export const useBitbucketCheckConfig = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['bitbucket', 'check-config'],
    mutationFn: (args: {
      workspace: string;
      repoSlug: string;
      branch?: string;
    }) =>
      intlayerOAuth.bitbucket.checkIntlayerConfig(
        undefined,
        args.workspace,
        args.repoSlug,
        args.branch
      ),
  });
};

export const useBitbucketGetConfigFile = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['bitbucket', 'get-config-file'],
    mutationFn: (args: {
      workspace: string;
      repoSlug: string;
      branch?: string;
      path?: string;
    }) =>
      intlayerOAuth.bitbucket.getConfigFile(
        undefined,
        args.workspace,
        args.repoSlug,
        args.branch,
        args.path
      ),
  });
};

/**
 * Editor
 */

export const useGetEditorDictionaries = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useQuery({
    queryKey: ['editor', 'dictionaries'],
    queryFn: () => intlayerOAuth.editor.getDictionaries(),
  });
};

export const useWriteDictionary = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['editor', 'dictionaries'],
    mutationFn: (args: WriteContentDeclarationBody) =>
      intlayerOAuth.editor.writeDictionary(args),
  });
};
