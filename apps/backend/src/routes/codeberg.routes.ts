import { createForgeController } from '@controllers/forge.controller';
import { codebergContract } from '@intlayer/backend-contract/gitProviders';
import { codebergService } from '@services/codeberg.service';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const codebergRoute = codebergContract.prefix;

export const codebergRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(
    fastify,
    codebergContract,
    createForgeController(codebergService, 'CODEBERG')
  );
};
