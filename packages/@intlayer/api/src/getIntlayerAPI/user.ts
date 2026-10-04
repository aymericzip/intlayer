import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type { ResponseData } from '@intlayer/backend-contract/responseData';
import type {
  CreateUserBody,
  CreateUserResult,
  GetUserByEmailParams,
  GetUserByEmailResult,
  GetUserByIdParams,
  GetUserByIdResult,
  GetUsersParams,
  GetUsersResult,
  UpdateUserBody,
  UpdateUserResult,
  UploadUserAvatarResult,
  UserAPI,
  UserRoutes,
  userContract,
} from '@intlayer/backend-contract/user';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

export type GetUserByAccountParams = {
  providerAccountId: string;
  provider: string;
};
export type GetUserByAccountResult = ResponseData<UserAPI>;

/** Prefix of the routes, checked against the backend contract. */
const userGroup = {
  prefix: '/api/user',
} as const satisfies Pick<typeof userContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const userEndpoints = {
  getSetupStatus: { method: 'GET', path: '/setup' },
  getUsers: { method: 'GET', path: '/' },
  updateUser: { method: 'PUT', path: '/' },
  createUser: { method: 'POST', path: '/' },
  getUserById: { method: 'GET', path: '/:userId' },
  getUserByEmail: { method: 'GET', path: '/email/:email' },
  deleteUser: { method: 'DELETE', path: '/:userId' },
  verifyEmailStatusSSE: { method: 'GET', path: '/verify-email-status/:userId' },
  uploadAvatar: { method: 'POST', path: '/avatar' },
} as const satisfies RouteEndpoints<UserRoutes>;

export const getUserAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Retrieves a list of users based on filters and pagination.
   * @param filters - Filters and pagination options.
   * @returns List of users.
   */
  const getUsers = async (
    filters?: GetUsersParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetUsersResult>(
      buildRouteURL(backendURL, userGroup, userEndpoints.getUsers),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        // @ts-ignore Number of parameter will be stringified by the fetcher
        params: filters,
      }
    );

  /**
   * Retrieves a user by ID.
   * @param userId - User ID.
   * @returns User object.
   */
  const getUserById = async (
    userId: GetUserByIdParams['userId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetUserByIdResult>(
      buildRouteURL(backendURL, userGroup, userEndpoints.getUserById, {
        userId: String(userId),
      }),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
      }
    );

  /**
   * Retrieves a user by email.
   * @param email - User email.
   * @returns User object.
   */
  const getUserByEmail = async (
    email: GetUserByEmailParams['email'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetUserByEmailResult>(
      buildRouteURL(backendURL, userGroup, userEndpoints.getUserByEmail, {
        email,
      }),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
      }
    );

  /**
   * Retrieves a user by account.
   * @param providerAccountId - The provider account ID.
   * @param provider - The provider of the account.
   */
  /**
   * Creates a new user.
   * @param user - User credentials.
   * @returns User object.
   */
  const createUser = async (
    user: CreateUserBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<CreateUserResult>(
      buildRouteURL(backendURL, userGroup, userEndpoints.createUser),
      authAPIOptions,
      otherOptions,
      {
        method: userEndpoints.createUser.method,
        body: user,
      }
    );

  /**
   * Updates the user with the provided data.
   * @param user - Updated user data.
   * @returns User object.
   */
  const updateUser = async (
    user: UpdateUserBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateUserResult>(
      buildRouteURL(backendURL, userGroup, userEndpoints.updateUser),
      authAPIOptions,
      otherOptions,
      {
        method: userEndpoints.updateUser.method,
        body: user,
      }
    );

  /**
   * Deletes a user with the provided ID.
   * @param userId - User ID.
   * @returns User object.
   */
  const deleteUser = async (
    userId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateUserResult>(
      buildRouteURL(backendURL, userGroup, userEndpoints.deleteUser, {
        userId: String(userId),
      }),
      authAPIOptions,
      otherOptions,
      {
        method: userEndpoints.deleteUser.method,
      }
    );

  /**
   * Uploads a new avatar for the authenticated user.
   * @param file - The image File object to upload.
   * @returns Updated user object.
   */
  const uploadAvatar = async (
    file: File,
    otherOptions: FetcherOptions = {}
  ) => {
    const buffer = await file.arrayBuffer();

    const baseHeaders: Record<string, string> = {
      'Content-Type': file.type || 'image/jpeg',
    };

    // Forward auth cookies / credentials from authAPIOptions headers
    const authHeaders =
      (authAPIOptions.headers as Record<string, string> | undefined) ?? {};

    const response = await fetch(
      buildRouteURL(backendURL, userGroup, userEndpoints.uploadAvatar),
      {
        method: userEndpoints.uploadAvatar.method,
        credentials: 'include',
        headers: { ...authHeaders, ...baseHeaders },
        body: buffer,
        signal: otherOptions.signal as AbortSignal | undefined,
      }
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(JSON.stringify(result.error) ?? 'Avatar upload failed');
    }

    return (await response.json()) as UploadUserAvatarResult;
  };

  /**
   * Gets the verify email status URL to use in the SSE.
   * @param userId - User ID.
   * @returns The verify email status URL.
   */
  const getVerifyEmailStatusURL = (userId: string | UserAPI['id']) =>
    buildRouteURL(backendURL, userGroup, userEndpoints.verifyEmailStatusSSE, {
      userId: String(userId),
    });

  return {
    createUser,
    getUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    uploadAvatar,
    getVerifyEmailStatusURL,
  };
};

/**
 * Authenticated `user` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const userEndpoint = createEndpoint(getUserAPI);
