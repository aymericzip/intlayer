import {
  askDocQuestion,
  auditContentDeclaration,
  auditContentDeclarationField,
  auditContentDeclarationMetadata,
  auditTag,
  autocomplete,
  chat,
  customQuery,
  getAIStats,
  getDiscussions,
  translateJSON,
} from '@controllers/ai.controller';
import fastifyRateLimit from '@fastify/rate-limit';
import { aiContract } from '@intlayer/backend-contract/ai';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import { isSelfHosted } from '@utils/isSelfHosted';
import { unauthenticatedChatBotLimiter } from '@utils/rateLimiter';
import type { FastifyInstance } from 'fastify';

export const aiRoute = aiContract.prefix;

export const aiRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, aiContract, {
    customQuery,
    translateJSON,
    auditContentDeclaration,
    auditContentDeclarationField,
    auditContentDeclarationMetadata,
    auditTag,
    autocomplete,
    getDiscussions,
    getAIStats,
    // Registered below, behind the chatbot rate limiter
    ask: null,
    chat: null,
  });

  /**
   * This route number of requests is limited for unauthenticated users
   */
  await fastify.register(fastifyRateLimit, {
    ...unauthenticatedChatBotLimiter,
  });

  registerContractRoutes(fastify, aiContract, {
    customQuery: null,
    translateJSON: null,
    auditContentDeclaration: null,
    auditContentDeclarationField: null,
    auditContentDeclarationMetadata: null,
    auditTag: null,
    autocomplete: null,
    getDiscussions: null,
    getAIStats: null,
    // The doc assistant relies on the doc embeddings, which self-hosted
    // deployments do not ship (see utils/AI/askDocQuestion).
    ask: isSelfHosted() ? null : askDocQuestion,
    chat,
  });
};
