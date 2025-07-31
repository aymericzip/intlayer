'use client';

import type { IntlayerAPI } from '@intlayer/api';
import { useConfiguration } from '@intlayer/editor-react';
import { useToast } from '../components/Toaster';
import { getAuthAPI } from './auth';
import { type UseAsyncOptions, useAsync } from './useAsync/useAsync';
import { useAuth } from './useAuth';
import { useIntlayerAuth, useIntlayerOAuth } from './useIntlayerAPI';

const formatErrorCode = (errorCode: string) => errorCode.split('_').join(' ');

/**
 *  Hook to handle error logging and toast notifications
 */
const useErrorHandling = <T extends UseAsyncOptions<any>>(options: T): T => {
  const { toast } = useToast();

  return {
    ...options,
    onError: (errorMessage) => {
      let error;

      // If json is valid, parse it
      try {
        if (typeof errorMessage === 'undefined') return;

        error = JSON.parse(errorMessage);
      } catch (e) {
        // If json is not valid, set error to the original errorMessage

        error = errorMessage;
      }

      // render toast for each error if there is more than one
      // otherwise render the toast with the error message
      [error]
        .flatMap((error) => error)
        .forEach((error) =>
          toast({
            title: formatErrorCode(
              (process.env.NODE_ENV === 'production'
                ? error.title
                : error.code) ?? 'Error'
            ),
            description: error.message ?? errorMessage ?? 'An error occurred',
            variant: 'error',
          })
        );
      options.onError?.(errorMessage);
    },
    onSuccess: (data) => {
      if (data?.error) {
        toast({
          title: formatErrorCode(
            data.error.title ?? data.error.code ?? 'Error'
          ),
          description:
            data.error.message ?? data.error.code ?? 'An error occurred',
          variant: 'error',
        });
      }

      if (data?.message)
        toast({
          title: data.message,
          description: data.description,
          variant: 'success',
        });
      options.onSuccess?.(data);
    },
  };
};

type AuthEnableOptions = {
  requireUser?: boolean;
  requireProject?: boolean;
  requireOrganization?: boolean;
};

/**
 * Hook to enable authentication
 */
const useAuthEnable = <T extends UseAsyncOptions<any>>(
  options: T,
  { requireUser, requireProject, requireOrganization }: AuthEnableOptions = {}
): T => {
  const configuration = useConfiguration();
  const { oAuth2AccessToken, session } = useAuth({
    intlayerConfiguration: configuration,
  });

  const isEnabledOption = options?.enable ?? true;
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

  const isEnabled =
    isEnabledOption &&
    isUserEnabled &&
    isProjectEnabled &&
    isOrganizationEnabled;

  return {
    ...options,
    enable: isEnabled,
  };
};

const useAppAsync = <
  U extends string,
  T extends (...args: any[]) => Promise<any>,
>(
  key: U,
  asyncFunction: T,
  options?: UseAsyncOptions<T>,
  authOptions?: AuthEnableOptions
) => {
  // Enhance options using custom hooks
  const optionsWithAuth = useAuthEnable(options ?? {}, authOptions);

  const optionsWithErrorHandling = useErrorHandling(optionsWithAuth);

  // Call the main useAsync hook with enhanced options
  return useAsync(key, asyncFunction, optionsWithErrorHandling);
};

const useEditorAsync = <
  U extends string,
  T extends (...args: any[]) => Promise<any>,
>(
  key: U,
  asyncFunction: T,
  options?: UseAsyncOptions<T>
) => {
  const optionsWithErrorHandling = useErrorHandling(options ?? {});

  // Call the main useAsync hook with enhanced options
  return useAsync(key, asyncFunction, optionsWithErrorHandling);
};

/**
 * Auth
 */

export const useLogin = (
  args?: UseAsyncOptions<ReturnType<typeof getAuthAPI>['signInEmail']>
) =>
  useAppAsync('login', useIntlayerAuth().signInEmail, {
    invalidateQueries: ['getSession'],
    ...args,
  });

export const useGetVerifyEmailStatus = (
  args?: UseAsyncOptions<ReturnType<typeof getAuthAPI>['verifyEmailSession']>
) =>
  useAppAsync(
    'getVerifyEmailStatus',
    useIntlayerAuth().verifyEmailSession,
    args
  );

export const useRegister = (
  args?: UseAsyncOptions<ReturnType<typeof getAuthAPI>['signUpEmail']>
) =>
  useAppAsync('register', useIntlayerAuth().signUpEmail, {
    invalidateQueries: ['getSession'],
    ...args,
  });

export const useLogout = (
  args?: UseAsyncOptions<ReturnType<typeof getAuthAPI>['signOut']>
) =>
  useAppAsync('logout', useIntlayerAuth().signOut, {
    ...args,
  });

export const useChangePassword = (
  args?: UseAsyncOptions<ReturnType<typeof getAuthAPI>['changePasswordSession']>
) =>
  useAppAsync('changePassword', useIntlayerAuth().changePasswordSession, args);

export const useAskResetPassword = (
  args?: UseAsyncOptions<
    ReturnType<typeof getAuthAPI>['requestPasswordResetSession']
  >
) =>
  useAppAsync(
    'askResetPassword',
    useIntlayerAuth().requestPasswordResetSession,
    args
  );

export const useResetPassword = (
  args?: UseAsyncOptions<ReturnType<typeof getAuthAPI>['resetPassword']>
) => useAppAsync('resetPassword', useIntlayerAuth().resetPassword, args);

export const useVerifyEmail = (
  args?: UseAsyncOptions<ReturnType<typeof getAuthAPI>['verifyEmailSession']>
) => useAppAsync('verifyEmail', useIntlayerAuth().verifyEmailSession, args);

export const useGetUserByAccount = (
  args?: UseAsyncOptions<ReturnType<typeof getAuthAPI>['accountInfo']>
) => useAppAsync('getUserByAccount', useIntlayerAuth().accountInfo, args);

/**
 * User
 */

export const useGetUsers = (
  args?: UseAsyncOptions<IntlayerAPI['user']['getUsers']>
) =>
  useAppAsync(
    'getUsers',
    useIntlayerOAuth().user.getUsers,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
      ...args,
    },
    {
      requireUser: true,
    }
  );

export const useCreateUser = (
  args?: UseAsyncOptions<ReturnType<typeof getAuthAPI>['updateUser']>
) =>
  useAppAsync('createUser', useIntlayerAuth().updateUser, {
    invalidateQueries: ['getUsers'],
    ...args,
  });

export const useUpdateUser = (
  args?: UseAsyncOptions<IntlayerAPI['user']['updateUser']>
) =>
  useAppAsync('updateUser', useIntlayerOAuth().user.updateUser, {
    invalidateQueries: ['getSession'],
    ...args,
  });

export const useDeleteUser = (
  args?: UseAsyncOptions<IntlayerAPI['user']['deleteUser']>
) =>
  useAppAsync('deleteUser', useIntlayerOAuth().user.deleteUser, {
    invalidateQueries: ['getUsers'],
    ...args,
  });

/**
 * Organization
 */

export const useGetOrganizations = (
  args?: UseAsyncOptions<IntlayerAPI['organization']['getOrganizations']>
) =>
  useAppAsync(
    'getOrganizations',
    useIntlayerOAuth().organization.getOrganizations,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
      ...args,
    },
    {
      requireUser: true,
    }
  );

export const useAddOrganization = (
  args?: UseAsyncOptions<IntlayerAPI['organization']['addOrganization']>
) =>
  useAppAsync(
    'addOrganization',
    useIntlayerOAuth().organization.addOrganization,
    {
      invalidateQueries: ['getOrganizations'],
      ...args,
    }
  );

export const useUpdateOrganization = (
  args?: UseAsyncOptions<IntlayerAPI['organization']['updateOrganization']>
) =>
  useAppAsync(
    'updateOrganization',
    useIntlayerOAuth().organization.updateOrganization,
    {
      invalidateQueries: ['getSession'],
      ...args,
    }
  );

export const useUpdateOrganizationMembers = (
  args?: UseAsyncOptions<
    IntlayerAPI['organization']['updateOrganizationMembers']
  >
) =>
  useAppAsync(
    'updateOrganizationMembers',
    useIntlayerOAuth().organization.updateOrganizationMembers,
    {
      invalidateQueries: ['getOrganizations', 'getSession'],
      ...args,
    }
  );

export const useAddOrganizationMember = (
  args?: UseAsyncOptions<IntlayerAPI['organization']['addOrganizationMember']>
) =>
  useAppAsync(
    'addOrganizationMember',
    useIntlayerOAuth().organization.addOrganizationMember,
    {
      invalidateQueries: ['getOrganizations', 'getSession'],
      ...args,
    }
  );

export const useDeleteOrganization = (
  args?: UseAsyncOptions<IntlayerAPI['organization']['deleteOrganization']>
) =>
  useAppAsync(
    'deleteOrganization',
    useIntlayerOAuth().organization.deleteOrganization,
    {
      invalidateQueries: ['getOrganizations', 'getSession'],
      ...args,
    }
  );

export const useSelectOrganization = (
  args?: UseAsyncOptions<IntlayerAPI['organization']['selectOrganization']>
) =>
  useAppAsync(
    'selectOrganization',
    useIntlayerOAuth().organization.selectOrganization,
    {
      invalidateQueries: ['getSession'],
      ...args,
    }
  );

export const useUnselectOrganization = (
  args?: UseAsyncOptions<IntlayerAPI['organization']['unselectOrganization']>
) =>
  useAppAsync(
    'unselectOrganization',
    useIntlayerOAuth().organization.unselectOrganization,
    {
      invalidateQueries: ['getSession'],
      ...args,
    }
  );

/**
 * Project
 */

export const useGetProjects = (
  args?: UseAsyncOptions<IntlayerAPI['project']['getProjects']>
) =>
  useAppAsync(
    'getProjects',
    useIntlayerOAuth().project.getProjects,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
      ...args,
    },
    {
      requireUser: true,
      requireOrganization: true,
    }
  );

export const useAddProject = (
  args?: UseAsyncOptions<IntlayerAPI['project']['addProject']>
) =>
  useAppAsync('addProject', useIntlayerOAuth().project.addProject, {
    invalidateQueries: ['getProjects'],
    ...args,
  });

export const useUpdateProject = (
  args?: UseAsyncOptions<IntlayerAPI['project']['updateProject']>
) =>
  useAppAsync('updateProject', useIntlayerOAuth().project.updateProject, {
    invalidateQueries: ['getSession'],
    ...args,
  });

export const useUpdateProjectMembers = (
  args?: UseAsyncOptions<IntlayerAPI['project']['updateProjectMembers']>
) =>
  useAppAsync(
    'updateProjectMembers',
    useIntlayerOAuth().project.updateProjectMembers,
    {
      invalidateQueries: ['getSession'],
      ...args,
    }
  );

export const useDeleteProject = (
  args?: UseAsyncOptions<IntlayerAPI['project']['deleteProject']>
) =>
  useAppAsync('deleteProject', useIntlayerOAuth().project.deleteProject, {
    invalidateQueries: ['getProjects', 'getSession'],
    ...args,
  });

export const useSelectProject = (
  args?: UseAsyncOptions<IntlayerAPI['project']['selectProject']>
) =>
  useAppAsync('selectProject', useIntlayerOAuth().project.selectProject, {
    invalidateQueries: ['getSession'],
    ...args,
  });

export const useUnselectProject = (
  args?: UseAsyncOptions<IntlayerAPI['project']['unselectProject']>
) =>
  useAppAsync('unselectProject', useIntlayerOAuth().project.unselectProject, {
    invalidateQueries: ['getSession'],
    ...args,
  });

export const useAddNewAccessKey = (
  args?: UseAsyncOptions<IntlayerAPI['project']['addNewAccessKey']>
) =>
  useAppAsync('addNewAccessKey', useIntlayerOAuth().project.addNewAccessKey, {
    invalidateQueries: ['getSession'],
    ...args,
  });

export const useDeleteAccessKey = (
  args?: UseAsyncOptions<IntlayerAPI['project']['deleteAccessKey']>
) =>
  useAppAsync('deleteAccessKey', useIntlayerOAuth().project.deleteAccessKey, {
    invalidateQueries: ['getSession'],
    ...args,
  });

export const useRefreshAccessKey = (
  args?: UseAsyncOptions<IntlayerAPI['project']['refreshAccessKey']>
) =>
  useAppAsync('refreshAccessKey', useIntlayerOAuth().project.refreshAccessKey, {
    invalidateQueries: ['getSession'],
    ...args,
  });

/**
 * Dictionary
 */

export const useGetDictionaries = (
  args?: UseAsyncOptions<IntlayerAPI['dictionary']['getDictionaries']>
) =>
  useAppAsync(
    'getDictionaries',
    useIntlayerOAuth().dictionary.getDictionaries,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
      ...args,
    },
    {
      requireUser: true,
      requireOrganization: true,
      requireProject: true,
    }
  );

export const useGetDictionariesKeys = (
  args?: UseAsyncOptions<IntlayerAPI['dictionary']['getDictionariesKeys']>
) =>
  useAppAsync(
    'getDictionariesKeys',
    useIntlayerOAuth().dictionary.getDictionariesKeys,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
      ...args,
    },
    {
      requireUser: true,
      requireOrganization: true,
      requireProject: true,
    }
  );

export const useGetDictionary = (
  args?: UseAsyncOptions<IntlayerAPI['dictionary']['getDictionary']>
) =>
  useAppAsync(
    'getDictionary',
    useIntlayerOAuth().dictionary.getDictionary,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
      ...args,
    },
    {
      requireUser: true,
      requireOrganization: true,
      requireProject: true,
    }
  );

export const useAddDictionary = (
  args?: UseAsyncOptions<IntlayerAPI['dictionary']['addDictionary']>
) =>
  useAppAsync('addDictionary', useIntlayerOAuth().dictionary.addDictionary, {
    invalidateQueries: ['getDictionaries', 'getDictionariesKeys'],
    ...args,
  });

export const usePushDictionaries = (
  args?: UseAsyncOptions<IntlayerAPI['dictionary']['pushDictionaries']>
) =>
  useAppAsync(
    'pushDictionaries',
    useIntlayerOAuth().dictionary.pushDictionaries,
    {
      invalidateQueries: [
        'getDictionaries',
        'getDictionary',
        'getDictionariesKeys',
      ],
      ...args,
    }
  );

export const useUpdateDictionary = (
  args?: UseAsyncOptions<IntlayerAPI['dictionary']['updateDictionary']>
) =>
  useAppAsync(
    'updateDictionary',
    useIntlayerOAuth().dictionary.updateDictionary,
    {
      invalidateQueries: ['getDictionaries', 'getDictionary'],
      ...args,
    }
  );

export const useDeleteDictionary = (
  args?: UseAsyncOptions<IntlayerAPI['dictionary']['deleteDictionary']>
) =>
  useAppAsync(
    'deleteDictionary',
    useIntlayerOAuth().dictionary.deleteDictionary,
    {
      invalidateQueries: [
        'getDictionaries',
        'getDictionary',
        'getDictionariesKeys',
      ],
      ...args,
    }
  );

/**
 * Tag
 */

export const useGetTags = (
  args?: UseAsyncOptions<IntlayerAPI['tag']['getTags']>
) =>
  useAppAsync(
    'getTags',
    useIntlayerOAuth().tag.getTags,
    {
      cache: true,
      store: true,
      retryLimit: 3,
      autoFetch: true,
      revalidation: true,
      revalidateTime: 5 * 60 * 1000, // 5 minutes
      ...args,
    },
    {
      requireUser: true,
      requireOrganization: true,
    }
  );

export const useAddTag = (
  args?: UseAsyncOptions<IntlayerAPI['tag']['addTag']>
) =>
  useAppAsync('addTag', useIntlayerOAuth().tag.addTag, {
    invalidateQueries: ['getTags'],
    ...args,
  });

export const useUpdateTag = (
  args?: UseAsyncOptions<IntlayerAPI['tag']['updateTag']>
) =>
  useAppAsync('updateTag', useIntlayerOAuth().tag.updateTag, {
    invalidateQueries: ['getTags'],
    ...args,
  });

export const useDeleteTag = (
  args?: UseAsyncOptions<IntlayerAPI['tag']['deleteTag']>
) =>
  useAppAsync('deleteTag', useIntlayerOAuth().tag.deleteTag, {
    invalidateQueries: ['getTags'],
    ...args,
  });

/**
 * Stripe
 */

export const useGetPricing = (
  args?: UseAsyncOptions<IntlayerAPI['stripe']['getPricing']>
) =>
  useAppAsync('getPricing', useIntlayerOAuth().stripe.getPricing, {
    store: true,
    cache: true,
    ...args,
  });

export const useGetSubscription = (
  args?: UseAsyncOptions<IntlayerAPI['stripe']['getSubscription']>
) =>
  useAppAsync(
    'getSubscription',
    useIntlayerOAuth().stripe.getSubscription,
    args,
    {
      requireUser: true,
      requireOrganization: true,
    }
  );

export const useCancelSubscription = (
  args?: UseAsyncOptions<IntlayerAPI['stripe']['cancelSubscription']>
) =>
  useAppAsync(
    'cancelSubscription',
    useIntlayerOAuth().stripe.cancelSubscription,
    { invalidateQueries: ['getSession'], ...args },
    {
      requireUser: true,
      requireOrganization: true,
    }
  );

/**
 * AI
 */

export const useTranslateJSONDeclaration = (
  args?: UseAsyncOptions<IntlayerAPI['ai']['translateJSON']>
) =>
  useAppAsync('translateJSON', useIntlayerOAuth().ai.translateJSON, args, {
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
  });

export const useAuditContentDeclaration = (
  args?: UseAsyncOptions<IntlayerAPI['ai']['auditContentDeclaration']>
) =>
  useAppAsync(
    'auditContentDeclaration',
    useIntlayerOAuth().ai.auditContentDeclaration,
    args,
    {
      requireUser: true,
      requireOrganization: true,
      requireProject: true,
    }
  );

export const useAuditContentDeclarationMetadata = (
  args?: UseAsyncOptions<IntlayerAPI['ai']['auditContentDeclarationMetadata']>
) =>
  useAppAsync(
    'auditContentDeclaration',
    useIntlayerOAuth().ai.auditContentDeclarationMetadata,
    args,
    {
      requireUser: true,
      requireOrganization: true,
      requireProject: true,
    }
  );

export const useAuditContentDeclarationField = (
  args?: UseAsyncOptions<IntlayerAPI['ai']['auditContentDeclarationField']>
) =>
  useAppAsync(
    'auditContentDeclarationField',
    useIntlayerOAuth().ai.auditContentDeclarationField,
    args,
    {
      requireUser: true,
      requireOrganization: true,
      requireProject: true,
    }
  );

export const useAuditTag = (
  args?: UseAsyncOptions<IntlayerAPI['ai']['auditTag']>
) =>
  useAppAsync('auditTag', useIntlayerOAuth().ai.auditTag, args, {
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
  });

export const useAskDocQuestion = (
  args?: UseAsyncOptions<IntlayerAPI['ai']['askDocQuestion']>
) => useAppAsync('askDocQuestion', useIntlayerOAuth().ai.askDocQuestion, args);

export const useAutocomplete = (
  args?: UseAsyncOptions<IntlayerAPI['ai']['autocomplete']>
) => useAppAsync('autocomplete', useIntlayerOAuth().ai.autocomplete, args);

/**
 * Search
 */

export const useSearchDoc = (
  args?: UseAsyncOptions<IntlayerAPI['search']['searchDoc']>
) => useAppAsync('searchDoc', useIntlayerOAuth().search.searchDoc, args);

/**
 * Newsletter
 */

export const useSubscribeToNewsletter = (
  args?: UseAsyncOptions<IntlayerAPI['newsletter']['subscribeToNewsletter']>
) =>
  useAppAsync(
    'subscribeToNewsletter',
    useIntlayerOAuth().newsletter.subscribeToNewsletter,
    args
  );

export const useUnsubscribeFromNewsletter = (
  args?: UseAsyncOptions<IntlayerAPI['newsletter']['unsubscribeFromNewsletter']>
) =>
  useAppAsync(
    'unsubscribeFromNewsletter',
    useIntlayerOAuth().newsletter.unsubscribeFromNewsletter,
    args
  );

export const useGetNewsletterStatus = (
  args?: UseAsyncOptions<IntlayerAPI['newsletter']['getNewsletterStatus']>
) =>
  useAppAsync(
    'getNewsletterStatus',
    useIntlayerOAuth().newsletter.getNewsletterStatus,
    args
  );

/**
 * Editor
 */

export const useWriteDictionary = (
  args?: UseAsyncOptions<IntlayerAPI['editor']['writeDictionary']>
) =>
  useEditorAsync(
    'writeDictionary',
    useIntlayerOAuth().editor.writeDictionary,
    args
  );

export const useGetEditorDictionaries = (
  args?: UseAsyncOptions<IntlayerAPI['editor']['getDictionaries']>
) =>
  useEditorAsync('getDictionaries', useIntlayerOAuth().editor.getDictionaries, {
    store: true,
    cache: true,
    ...args,
  });
