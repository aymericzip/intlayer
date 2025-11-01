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
      invalidateQueries: [['projects']],
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
      intlayerOAuth.dictionary.pushDictionaries(args),
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
      intlayerOAuth.dictionary.deleteDictionary(args),
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
