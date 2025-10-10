'use client';

import type {
  GetCheckoutSessionBody,
  GetDictionariesKeysResult,
  GetDictionariesParams,
  GetDictionaryParams,
  GetDictionaryQuery,
  GetOrganizationsParams,
  GetPricingBody,
  GetPricingResult,
  GetProjectsParams,
  GetTagsParams,
  GetUsersParams,
  SearchDocUtilParams,
} from '@intlayer/backend';
import { useConfiguration } from '@intlayer/editor-react';
import {
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { getAuthAPI } from '../libs/auth';
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

export const useAppQuery = <
  TQueryFnData,
  TError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
    requireUser?: boolean;
    requireProject?: boolean;
    requireOrganization?: boolean;
  }
): UseQueryResult<TData, TError> => {
  const { requireUser, requireProject, requireOrganization, ...rest } = options;
  const { enable } = useAuthEnable({
    requireUser,
    requireProject,
    requireOrganization,
  });

  const result = useQuery({
    enabled: (rest as any).enabled === false ? false : enable,
    ...rest,
  } as any);

  return result as unknown as UseQueryResult<TData, TError>;
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
    mutationFn: (
      ...args: Parameters<ReturnType<typeof getAuthAPI>['signInEmail']>
    ) => intlayerAuth.signInEmail(...args),
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
    mutationFn: (
      args: Parameters<ReturnType<typeof getAuthAPI>['verifyEmailSession']>
    ) => intlayerAuth.verifyEmailSession(...args),
  });
};

export const useRegister = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (
      ...args: Parameters<ReturnType<typeof getAuthAPI>['signUpEmail']>
    ) => intlayerAuth.signUpEmail(...args),
    meta: {
      resetQueries: [['session']],
    },
  });
};

export const useLogout = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: (
      ...args: Parameters<ReturnType<typeof getAuthAPI>['signOut']>
    ) => intlayerAuth.signOut(...args),
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
    mutationFn: (
      ...args: Parameters<
        ReturnType<typeof getAuthAPI>['changePasswordSession']
      >
    ) => intlayerAuth.changePasswordSession(...args),
  });
};

export const useAskResetPassword = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['askResetPassword'],
    mutationFn: (
      ...args: Parameters<
        ReturnType<typeof getAuthAPI>['requestPasswordResetSession']
      >
    ) => intlayerAuth.requestPasswordResetSession(...args),
  });
};

export const useResetPassword = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: (
      ...args: Parameters<ReturnType<typeof getAuthAPI>['resetPassword']>
    ) => intlayerAuth.resetPassword(...args),
  });
};

export const useVerifyEmail = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['verifyEmail'],
    mutationFn: (
      ...args: Parameters<ReturnType<typeof getAuthAPI>['verifyEmailSession']>
    ) => intlayerAuth.verifyEmailSession(...args),
  });
};

export const useGetUserByAccount = () => {
  const intlayerAuth = useIntlayerAuth();

  return useMutation({
    mutationKey: ['user'],
    mutationFn: (
      ...args: Parameters<ReturnType<typeof getAuthAPI>['accountInfo']>
    ) => intlayerAuth.accountInfo(...args),
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
    mutationFn: intlayerAuth.user.updateUser,
  });
};

export const useUpdateUser = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['users'],
    mutationFn: intlayerOAuth.user.updateUser,
  });
};

export const useDeleteUser = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['users'],
    mutationFn: intlayerOAuth.user.deleteUser,
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
    requireUser: true,
  });
};

export const useAddOrganization = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: intlayerOAuth.organization.addOrganization,
  });
};

export const useUpdateOrganization = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: intlayerOAuth.organization.updateOrganization,
  });
};

export const useUpdateOrganizationMembers = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: intlayerOAuth.organization.updateOrganizationMembers,
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
    mutationFn: intlayerOAuth.organization.addOrganizationMember,
    meta: {
      invalidateQueries: [['organizations']],
    },
  });
};

export const useDeleteOrganization = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['organizations'],
    mutationFn: intlayerOAuth.organization.deleteOrganization,
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
    mutationFn: intlayerOAuth.organization.selectOrganization,
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
    mutationFn: intlayerOAuth.organization.unselectOrganization,
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
    requireUser: true,
    requireOrganization: true,
    ...options,
  });
};

export const useAddProject = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: intlayerOAuth.project.addProject,
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useUpdateProject = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: intlayerOAuth.project.updateProject,
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useUpdateProjectMembers = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: intlayerOAuth.project.updateProjectMembers,
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useDeleteProject = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: intlayerOAuth.project.deleteProject,
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
    mutationFn: intlayerOAuth.project.selectProject,
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
    mutationFn: intlayerOAuth.project.unselectProject,
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

export const useAddNewAccessKey = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: intlayerOAuth.project.addNewAccessKey,
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useDeleteAccessKey = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: intlayerOAuth.project.deleteAccessKey,
    meta: {
      invalidateQueries: [['projects']],
    },
  });
};

export const useRefreshAccessKey = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['projects'],
    mutationFn: intlayerOAuth.project.refreshAccessKey,
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
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

export const useGetDictionariesKeys = (
  options?: Partial<UseQueryOptions<GetDictionariesKeysResult>>
) => {
  const intlayerOAuth = useIntlayerOAuth();

  return useAppQuery({
    queryKey: ['dictionariesKeys', options],
    queryFn: intlayerOAuth.dictionary.getDictionariesKeys,
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
    mutationFn: intlayerOAuth.dictionary.addDictionary,
    meta: {
      invalidateQueries: [['dictionaries'], ['dictionariesKeys']],
    },
  });
};

export const usePushDictionaries = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: intlayerOAuth.dictionary.pushDictionaries,
    meta: {
      invalidateQueries: [['dictionaries'], ['dictionariesKeys']],
    },
  });
};

export const useUpdateDictionary = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: intlayerOAuth.dictionary.updateDictionary,
    meta: {
      invalidateQueries: [['dictionaries'], ['dictionariesKeys']],
    },
  });
};

export const useDeleteDictionary = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['dictionaries'],
    mutationFn: intlayerOAuth.dictionary.deleteDictionary,
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
    mutationFn: intlayerOAuth.tag.addTag,
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
    mutationFn: intlayerOAuth.tag.deleteTag,
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
    mutationFn: intlayerOAuth.stripe.cancelSubscription,
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
    mutationFn: intlayerOAuth.ai.translateJSON,
  });
};

export const useAuditContentDeclaration = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-auditContentDeclaration'],
    mutationFn: intlayerOAuth.ai.auditContentDeclaration,
  });
};

export const useAuditContentDeclarationMetadata = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-auditContentDeclarationMetadata'],
    mutationFn: intlayerOAuth.ai.auditContentDeclarationMetadata,
  });
};

export const useAuditContentDeclarationField = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-auditContentDeclarationField'],
    mutationFn: intlayerOAuth.ai.auditContentDeclarationField,
  });
};

export const useAuditTag = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-auditTag'],
    mutationFn: intlayerOAuth.ai.auditTag,
  });
};

export const useAskDocQuestion = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: [],
    mutationFn: intlayerOAuth.ai.askDocQuestion,
  });
};

export const useAutocomplete = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['ai-autocomplete'],
    mutationFn: intlayerOAuth.ai.autocomplete,
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
    mutationFn: intlayerOAuth.newsletter.subscribeToNewsletter,
  });
};

export const useUnsubscribeFromNewsletter = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['newsletter'],
    mutationFn: intlayerOAuth.newsletter.unsubscribeFromNewsletter,
  });
};

export const useGetNewsletterStatus = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['newsletter'],
    mutationFn: intlayerOAuth.newsletter.getNewsletterStatus,
  });
};

/**
 * Editor
 */

export const useGetEditorDictionaries = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useQuery({
    queryKey: ['editor', 'dictionaries'],
    queryFn: intlayerOAuth.editor.getDictionaries,
  });
};

export const useWriteDictionary = () => {
  const intlayerOAuth = useIntlayerOAuth();

  return useMutation({
    mutationKey: ['editor', 'dictionaries'],
    mutationFn: intlayerOAuth.editor.writeDictionary,
  });
};
