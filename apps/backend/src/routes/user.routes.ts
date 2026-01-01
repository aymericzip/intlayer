import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
  verifyEmailStatusSSE,
} from '@controllers/user.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

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
    deleteUser: {
      urlModel: '/:userId',
      url: ({ userId }: { userId: string }) => `${baseURL()}/${userId}`,
      method: 'DELETE',
    },
    verifyEmailStatusSSE: {
      urlModel: '/verify-email-status/:userId',
      url: ({ userId }: { userId: string }) =>
        `${baseURL()}/verify-email-status/${userId}`,
      method: 'GET',
    },
  }) satisfies Routes;

export const userRouter = async (fastify: FastifyInstance) => {
  fastify.get(getUserRoutes().getUsers.urlModel, getUsers);
  fastify.put(getUserRoutes().updateUser.urlModel, updateUser);
  fastify.post(getUserRoutes().createUser.urlModel, createUser);
  fastify.get(getUserRoutes().getUserById.urlModel, getUserById);
  fastify.get(getUserRoutes().getUserByEmail.urlModel, getUserByEmail);
  fastify.delete(getUserRoutes().deleteUser.urlModel, deleteUser);
  fastify.get(
    getUserRoutes().verifyEmailStatusSSE.urlModel,
    verifyEmailStatusSSE
  );
};
