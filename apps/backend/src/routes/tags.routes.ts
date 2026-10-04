import {
  addTag,
  deleteTag,
  getTags,
  updateTag,
} from '@controllers/tag.controller';
import { tagContract } from '@intlayer/backend-contract/tag';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const tagRoute = tagContract.prefix;

export const tagRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, tagContract, {
    getTags,
    addTag,
    updateTag,
    deleteTag,
  });
};
