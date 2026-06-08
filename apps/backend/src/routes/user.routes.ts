import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
  uploadAvatar,
  verifyEmailStatusSSE,
} from '@controllers/user.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';
import { emailParamsSchema, userIdParamsSchema } from './paramsSchemas';

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
    uploadAvatar: {
      urlModel: '/avatar',
      url: `${baseURL()}/avatar`,
      method: 'POST',
    },
  }) satisfies Routes;

export const userRouter = async (fastify: FastifyInstance) => {
  // Accept raw image buffers for avatar upload (regex matches any image/* MIME type)
  fastify.addContentTypeParser(
    /^image\//,
    { parseAs: 'buffer' },
    (_req, body, done) => done(null, body)
  );

  fastify.get(getUserRoutes().getUsers.urlModel, getUsers);
  fastify.put(getUserRoutes().updateUser.urlModel, updateUser);
  fastify.post(getUserRoutes().createUser.urlModel, createUser);
  fastify.get(
    getUserRoutes().getUserById.urlModel,
    { schema: { params: userIdParamsSchema } },
    getUserById
  );
  fastify.get(
    getUserRoutes().getUserByEmail.urlModel,
    { schema: { params: emailParamsSchema } },
    getUserByEmail
  );
  fastify.delete(
    getUserRoutes().deleteUser.urlModel,
    { schema: { params: userIdParamsSchema } },
    deleteUser
  );
  fastify.get(
    getUserRoutes().verifyEmailStatusSSE.urlModel,
    { schema: { params: userIdParamsSchema } },
    verifyEmailStatusSSE
  );
  fastify.post(getUserRoutes().uploadAvatar.urlModel, uploadAvatar);
};
