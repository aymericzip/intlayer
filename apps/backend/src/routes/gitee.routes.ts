import { createForgeController } from '@controllers/forge.controller';
import { giteeContract } from '@intlayer/backend-contract/gitProviders';
import { giteeService } from '@services/gitee.service';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const giteeRoute = giteeContract.prefix;

export const giteeRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(
    fastify,
    giteeContract,
    createForgeController(giteeService, 'GITEE')
  );
};
