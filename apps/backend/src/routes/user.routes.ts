import {
  createUser,
  deleteUser,
  getSetupStatus,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
  uploadAvatar,
  verifyEmailStatusSSE,
} from '@controllers/user.controller';
import { userContract } from '@intlayer/backend-contract/user';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const userRoute = userContract.prefix;

export const userRouter = async (fastify: FastifyInstance) => {
  // Accept raw image buffers for avatar upload (regex matches any image/* MIME type)
  fastify.addContentTypeParser(
    /^image\//,
    { parseAs: 'buffer' },
    (_request, body, done) => done(null, body)
  );

  registerContractRoutes(fastify, userContract, {
    getSetupStatus,
    getUsers,
    updateUser,
    createUser,
    getUserById,
    getUserByEmail,
    deleteUser,
    verifyEmailStatusSSE,
    uploadAvatar,
  });
};
