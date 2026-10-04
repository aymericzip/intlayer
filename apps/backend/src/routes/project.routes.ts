import {
  addProject,
  deleteProject,
  deleteProjectByIdAdmin,
  getCIConfiguration,
  getProjectInsights,
  getProjects,
  pushCIConfiguration,
  pushProjectConfiguration,
  selectProject,
  triggerBuild,
  triggerWebhook,
  unselectProject,
  updateProject,
  updateProjectMembers,
} from '@controllers/project.controller';
import {
  addNewAccessKey,
  deleteAccessKey,
  refreshAccessKey,
} from '@controllers/projectAccessKey.controller';
import { updateMemberAccess } from '@controllers/projectMemberAccess.controller';
import { projectContract } from '@intlayer/backend-contract/project';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const projectRoute = projectContract.prefix;

export const projectRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, projectContract, {
    getProjects,
    getProjectInsights,
    addProject,
    updateProject,
    updateProjectMembers,
    pushProjectConfiguration,
    deleteProject,
    selectProject,
    unselectProject,
    addNewAccessKey,
    refreshAccessKey,
    deleteAccessKey,
    triggerBuild,
    triggerWebhook,
    getCIConfiguration,
    pushCIConfiguration,
    deleteProjectByIdAdmin,
    updateMemberAccess,
  });
};
