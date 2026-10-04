import { z } from 'zod/mini';
import {
  dateTimeSchema,
  objectIdSchema,
  paginationQueryShape,
  repeatableQueryValueSchema,
} from './common';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
  type RouteParams,
  type RouteQuerystring,
} from './defineRoute';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
  type ResponseData,
  responseDataSchema,
} from './responseData';

/** Mailing lists a user can subscribe to. */
export const emailsListSchema = z.enum(['newsLetter']);

/** Mailing list names, usable as values (`EmailsList.NEWS_LETTER`). */
export const EmailsList = { NEWS_LETTER: 'newsLetter' } as const;
export type EmailsList = z.output<typeof emailsListSchema>;

/** User as returned by the API (auth provider and session internals stripped). */
export const userSchema = z.looseObject({
  id: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  name: z.string(),
  image: z.optional(z.nullable(z.string())),
  phone: z.optional(z.string()),
  dateOfBirth: z.optional(dateTimeSchema),
  emailsList: z.optional(z.partialRecord(emailsListSchema, z.boolean())),
  /** Stripe customer id. */
  customerId: z.optional(z.string()),
  role: z.optional(z.nullable(z.string())),
  lastLoginMethod: z.optional(z.enum(['email', 'google', 'github', 'passkey'])),
  lang: z.optional(z.string()),
  lastActiveOrganizationId: z.optional(z.nullable(z.string())),
  lastActiveProjectId: z.optional(z.nullable(z.string())),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

export type UserAPI = z.output<typeof userSchema>;

const userIdParamsSchema = z.object({ userId: objectIdSchema });

/** REST contract of the `/api/user` routes. */
export const userContract = defineRouteGroup({
  prefix: '/api/user',
  tag: 'User',
  routes: {
    getSetupStatus: defineRoute({
      method: 'GET',
      path: '/setup',
      summary: 'Whether the instance still needs its first admin (self-hosted)',
      schemas: {
        response: {
          200: responseDataSchema(z.object({ isSetupRequired: z.boolean() })),
        },
      },
    }),
    getUsers: defineRoute({
      method: 'GET',
      path: '/',
      summary: 'List users (organization members, or all for admins)',
      schemas: {
        querystring: z.looseObject({
          ...paginationQueryShape,
          ids: z.optional(repeatableQueryValueSchema),
          firstName: z.optional(z.string()),
          lastName: z.optional(z.string()),
          email: z.optional(z.string()),
          emailVerified: z.optional(z.string()),
          role: z.optional(z.string()),
          search: z.optional(z.string()),
          sortBy: z.optional(z.string()),
          sortOrder: z.optional(z.string()),
          /** Admin only: list every user. */
          fetchAll: z.optional(z.enum(['true', 'false'])),
        }),
        response: { 200: paginatedResponseSchema(userSchema) },
      },
    }),
    updateUser: defineRoute({
      method: 'PUT',
      path: '/',
      summary: 'Update a user profile',
      schemas: {
        /**
         * Allow-list. `role`, `emailVerified` and `email` are honoured for
         * admins only (users change their email through the verified auth
         * flow). A new `email` is unverified unless `emailVerified` is sent.
         */
        body: z.object({
          id: objectIdSchema,
          name: z.optional(z.string().check(z.minLength(1))),
          email: z.optional(z.string().check(z.email())),
          phone: z.optional(z.string()),
          image: z.optional(z.nullable(z.string())),
          lang: z.optional(z.string()),
          emailVerified: z.optional(z.boolean()),
          role: z.optional(z.nullable(z.string())),
        }),
        response: { 200: responseDataSchema(userSchema) },
      },
    }),
    createUser: defineRoute({
      method: 'POST',
      path: '/',
      summary: 'Admin only: create a user (sign-up goes through auth)',
      schemas: {
        body: z.object({
          email: z.string().check(z.minLength(1)),
          name: z.optional(z.string()),
        }),
        response: { 200: responseDataSchema(userSchema) },
      },
    }),
    getUserById: defineRoute({
      method: 'GET',
      path: '/:userId',
      summary: 'Get a user',
      schemas: {
        params: userIdParamsSchema,
        response: { 200: responseDataSchema(userSchema) },
      },
    }),
    getUserByEmail: defineRoute({
      method: 'GET',
      path: '/email/:email',
      summary: 'Get a user by email',
      schemas: {
        params: z.object({ email: z.string().check(z.minLength(1)) }),
        response: { 200: responseDataSchema(userSchema) },
      },
    }),
    deleteUser: defineRoute({
      method: 'DELETE',
      path: '/:userId',
      summary: 'Delete a user',
      schemas: {
        params: userIdParamsSchema,
        response: { 200: responseDataSchema(userSchema) },
      },
    }),
    verifyEmailStatusSSE: defineRoute({
      method: 'GET',
      path: '/verify-email-status/:userId',
      summary: 'Email verification status (server-sent events stream)',
      schemas: {
        params: userIdParamsSchema,
      },
    }),
    uploadAvatar: defineRoute({
      method: 'POST',
      path: '/avatar',
      summary: 'Upload the avatar of the signed-in user (raw image body)',
      schemas: {
        response: { 200: responseDataSchema(userSchema) },
      },
    }),
  },
});

/** Route definitions of the `/api/user` group, by name. */
export type UserRoutes = (typeof userContract)['routes'];

export type GetSetupStatusResult = ResponseData<{ isSetupRequired: boolean }>;
export type GetUsersParams = RouteQuerystring<UserRoutes['getUsers']>;
export type GetUsersResult = PaginatedResponse<UserAPI>;
export type UpdateUserBody = RouteBodyInput<UserRoutes['updateUser']>;
export type UpdateUserResult = ResponseData<UserAPI>;
export type CreateUserBody = RouteBodyInput<UserRoutes['createUser']>;
export type CreateUserResult = ResponseData<UserAPI>;
export type GetUserByIdParams = RouteParams<UserRoutes['getUserById']>;
export type GetUserByIdResult = ResponseData<UserAPI>;
export type GetUserByEmailParams = RouteParams<UserRoutes['getUserByEmail']>;
export type GetUserByEmailResult = ResponseData<UserAPI>;
export type DeleteUserParams = RouteParams<UserRoutes['deleteUser']>;
export type DeleteUserResult = ResponseData<UserAPI>;
export type UploadUserAvatarResult = ResponseData<UserAPI>;
