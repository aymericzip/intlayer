import {
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  createUser,
  getUserByAccount,
} from '@controllers/user.controller';
import { accessControlMiddleWare, AccessRule } from '@utils/accessControl';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const userRouter: Router = Router();

export const userRoutes = {
  getUsers: {
    urlModel: '/',
    url: '/',
    method: 'GET',
  },
  updateUser: {
    urlModel: '/',
    url: '/',
    method: 'PUT',
  },
  createUser: {
    urlModel: '/',
    url: '/',
    method: 'POST',
  },
  getUserById: {
    urlModel: '/:userId',
    url: ({ userId }: { userId: string }) => `/${userId}`,
    method: 'GET',
  },
  getUserByEmail: {
    urlModel: '/email/:email',
    url: ({ email }: { email: string }) => `/email/${email}`,
    method: 'GET',
  },
  getUserByAccount: {
    urlModel: '/account/:provider/:providerAccountId',
    url: ({
      provider,
      providerAccountId,
    }: {
      provider: string;
      providerAccountId: string;
    }) => `/account/${provider}/${providerAccountId}`,
    method: 'GET',
  },
} satisfies Routes;

userRouter.get(
  userRoutes.getUsers.urlModel,
  accessControlMiddleWare(AccessRule.admin),
  getUsers
);
userRouter.put(
  userRoutes.updateUser.urlModel,
  accessControlMiddleWare(AccessRule.none),
  updateUser
);
userRouter.post(
  userRoutes.createUser.urlModel,
  accessControlMiddleWare(AccessRule.admin),
  createUser
);
userRouter.get(
  userRoutes.getUserById.urlModel,
  accessControlMiddleWare(AccessRule.authenticated),
  getUserById
);
userRouter.get(
  userRoutes.getUserByEmail.urlModel,
  accessControlMiddleWare(AccessRule.authenticated),
  getUserByEmail
);
userRouter.get(userRoutes.getUserByAccount.urlModel, getUserByAccount);
