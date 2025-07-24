import type { Routes } from '@/types/Routes';
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
  verifyEmailStatusSSE,
} from '@controllers/user.controller';
import { Router } from 'express';

export const userRouter: Router = Router();

export const userRoute = '/api/user';

const baseURL = () => `${process.env.BACKEND_URL}${userRoute}`;

export const getUserRoutes = () =>
  ({
    getUsers: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
    },
    updateUser: {
      urlModel: '/',
      url: baseURL(),
      method: 'PUT',
    },
    createUser: {
      urlModel: '/',
      url: baseURL(),
      method: 'POST',
    },
    getUserById: {
      urlModel: '/:userId',
      url: ({ userId }: { userId: string }) => `${baseURL()}/${userId}`,
      method: 'GET',
    },
    getUserByEmail: {
      urlModel: '/email/:email',
      url: ({ email }: { email: string }) => `${baseURL()}/email/${email}`,
      method: 'GET',
    },
    verifyEmailStatusSSE: {
      urlModel: '/verify-email-status/:userId',
      url: ({ userId }: { userId: string }) =>
        `${baseURL()}/verify-email-status/${userId}`,
      method: 'GET',
    },
  }) satisfies Routes;

userRouter.get(getUserRoutes().getUsers.urlModel, getUsers as any);
userRouter.put(getUserRoutes().updateUser.urlModel, updateUser as any);
userRouter.post(getUserRoutes().createUser.urlModel, createUser as any);
userRouter.get(getUserRoutes().getUserById.urlModel, getUserById as any);
userRouter.get(getUserRoutes().getUserByEmail.urlModel, getUserByEmail as any);
userRouter.get(
  getUserRoutes().verifyEmailStatusSSE.urlModel,
  verifyEmailStatusSSE as any
);
