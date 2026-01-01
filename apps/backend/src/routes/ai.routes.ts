import {
  askDocQuestion,
  auditContentDeclaration,
  auditContentDeclarationField,
  auditContentDeclarationMetadata,
  auditTag,
  autocomplete,
  customQuery,
  getDiscussions,
  translateJSON,
} from '@controllers/ai.controller';
import fastifyRateLimit from '@fastify/rate-limit';
import { unauthenticatedChatBotLimiter } from '@utils/rateLimiter';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const aiRoute = '/api/ai';

const baseURL = () => `${process.env.BACKEND_URL}${aiRoute}`;

export const getAiRoutes = () =>
  ({
    customQuery: {
      urlModel: '/',
      url: `${baseURL()}/`,
      method: 'POST',
    },
    translateJSON: {
      urlModel: '/translate/json',
      url: `${baseURL()}/translate/json`,
      method: 'POST',
    },
    auditContentDeclaration: {
      urlModel: '/audit/dictionary',
      url: `${baseURL()}/audit/dictionary`,
      method: 'POST',
    },
    auditContentDeclarationField: {
      urlModel: '/audit/dictionary/field',
      url: `${baseURL()}/audit/dictionary/field`,
      method: 'POST',
    },
    auditContentDeclarationMetadata: {
      urlModel: '/audit/dictionary/metadata',
      url: `${baseURL()}/audit/dictionary/metadata`,
      method: 'POST',
    },
    auditTag: {
      urlModel: '/audit/tag',
      url: `${baseURL()}/audit/tag`,
      method: 'POST',
    },
    ask: {
      urlModel: '/ask',
      url: `${baseURL()}/ask`,
      method: 'POST',
    },
    autocomplete: {
      urlModel: '/autocomplete',
      url: `${baseURL()}/autocomplete`,
      method: 'POST',
    },
    getDiscussions: {
      urlModel: '/discussions',
      url: `${baseURL()}/discussions`,
      method: 'GET',
    },
  }) satisfies Routes;

export const aiRouter = async (fastify: FastifyInstance) => {
  fastify.post(getAiRoutes().customQuery.urlModel, customQuery);
  fastify.post(getAiRoutes().translateJSON.urlModel, translateJSON);
  fastify.post(
    getAiRoutes().auditContentDeclaration.urlModel,
    auditContentDeclaration
  );
  fastify.post(
    getAiRoutes().auditContentDeclarationField.urlModel,
    auditContentDeclarationField
  );
  fastify.post(
    getAiRoutes().auditContentDeclarationMetadata.urlModel,
    auditContentDeclarationMetadata
  );
  fastify.post(getAiRoutes().auditTag.urlModel, auditTag);
  fastify.post(getAiRoutes().autocomplete.urlModel, autocomplete);
  fastify.get(getAiRoutes().getDiscussions.urlModel, getDiscussions);

  /**
   * This route number of requests is limited for unauthenticated users
   */
  await fastify.register(fastifyRateLimit, {
    ...unauthenticatedChatBotLimiter,
    // Apply only to the /ask route
    routeId: 'ai-ask-rate-limit',
  });
  fastify.post(getAiRoutes().ask.urlModel, askDocQuestion);
};
