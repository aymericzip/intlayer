import {
  addEnvironment,
  deleteEnvironment,
  migrateEnvironment,
  resetToProductionEnvironment,
  selectEnvironment,
  updateEnvironment,
} from '@controllers/environment.controller';
import { environmentContract } from '@intlayer/backend-contract/environment';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const environmentRoute = environmentContract.prefix;

export const environmentRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, environmentContract, {
    addEnvironment,
    updateEnvironment,
    deleteEnvironment,
    resetToProductionEnvironment,
    selectEnvironment,
    migrateEnvironment,
  });
};
