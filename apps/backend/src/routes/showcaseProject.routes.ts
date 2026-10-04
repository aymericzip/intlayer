import {
  deleteShowcaseProjectHandler,
  getOtherShowcaseProjects,
  getShowcaseProjectById,
  getShowcaseProjects,
  scanShowcaseProject,
  submitShowcaseProject,
  toggleShowcaseDownvote,
  toggleShowcaseUpvote,
  updateShowcaseProjectHandler,
} from '@controllers/showcaseProject.controller';
import { showcaseProjectContract } from '@intlayer/backend-contract/showcaseProject';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const showcaseProjectRoute = showcaseProjectContract.prefix;

export const showcaseProjectRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, showcaseProjectContract, {
    getShowcaseProjects,
    submitShowcaseProject,
    getOtherShowcaseProjects,
    toggleShowcaseUpvote,
    toggleShowcaseDownvote,
    getShowcaseProjectById,
    scanShowcaseProject,
    deleteShowcaseProject: deleteShowcaseProjectHandler,
    updateShowcaseProject: updateShowcaseProjectHandler,
  });
};
