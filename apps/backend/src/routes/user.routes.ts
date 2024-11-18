import {
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  createUser,
  getUserByAccount,
} from '@controllers/user.controller';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const userRouter: Router = Router();

const baseURL = `${process.env.BACKEND_URL}/api/user`;

export const userRoutes = {
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
} satisfies Routes;

userRouter.get(userRoutes.getUsers.urlModel, getUsers);
userRouter.put(userRoutes.updateUser.urlModel, updateUser);
userRouter.post(userRoutes.createUser.urlModel, createUser);
userRouter.get(userRoutes.getUserById.urlModel, getUserById);
userRouter.get(userRoutes.getUserByEmail.urlModel, getUserByEmail);
userRouter.get(userRoutes.getUserByAccount.urlModel, getUserByAccount);
