import type { Routes } from '@/types/Routes';
import {
  createUser,
  getUserByAccount,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
} from '@controllers/user.controller';
import { Router } from 'express';

export const userRouter: Router = Router();

export const userRoute = '/api/user';

const baseURL = () => `${process.env.BACKEND_URL}${userRoute}`;

export const getUserRoutes = () =>
  ({
    getUsers: {
      urlModel: '/',
      url: baseURL,
      method: 'GET',
    },
    updateUser: {
      urlModel: '/',
      url: baseURL,
      method: 'PUT',
    },
    createUser: {
      urlModel: '/',
      url: baseURL,
      method: 'POST',
    },
    getUserById: {
      urlModel: '/:userId',
      url: ({ userId }: { userId: string }) => `${baseURL}/${userId}`,
      method: 'GET',
    },
    getUserByEmail: {
      urlModel: '/email/:email',
      url: ({ email }: { email: string }) => `${baseURL}/email/${email}`,
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
      }) => `${baseURL}/account/${provider}/${providerAccountId}`,
      method: 'GET',
    },
  }) satisfies Routes;

userRouter.get(getUserRoutes().getUsers.urlModel, getUsers);
userRouter.put(getUserRoutes().updateUser.urlModel, updateUser);
userRouter.post(getUserRoutes().createUser.urlModel, createUser);
userRouter.get(getUserRoutes().getUserById.urlModel, getUserById);
userRouter.get(getUserRoutes().getUserByEmail.urlModel, getUserByEmail);
userRouter.get(getUserRoutes().getUserByAccount.urlModel, getUserByAccount);
