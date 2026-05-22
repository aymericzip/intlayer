import {
  chatSSE,
  confirmPayment,
  createMission,
  createPaymentIntent,
  estimateMission,
  getChatHistory,
  getMarketplace,
  getMissionById,
  getMyMissions,
  getMyTranslatorProfile,
  getTranslatorById,
  getTranslatorReviews,
  registerAsTranslator,
  requestPayout,
  sendMessage,
  submitReview,
  updateMissionStatus,
  updateTranslatorProfile,
  uploadTranslatorCoverPicture,
  uploadTranslatorMainPicture,
  validateTranslatorProfile,
} from '@controllers/translator.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const translatorRoute = '/api/translator';

const baseURL = () => `${process.env.BACKEND_URL}${translatorRoute}`;

export const getTranslatorRoutes = () =>
  ({
    // Public marketplace
    getMarketplace: {
      urlModel: '/marketplace',
      url: `${baseURL()}/marketplace`,
      method: 'GET',
    },
    getTranslatorById: {
      urlModel: '/:translatorId',
      url: ({ translatorId }: { translatorId: string }) =>
        `${baseURL()}/${translatorId}`,
      method: 'GET',
    },
    getTranslatorReviews: {
      urlModel: '/:translatorId/reviews',
      url: ({ translatorId }: { translatorId: string }) =>
        `${baseURL()}/${translatorId}/reviews`,
      method: 'GET',
    },
    // Authenticated profile
    getMyTranslatorProfile: {
      urlModel: '/me',
      url: `${baseURL()}/me`,
      method: 'GET',
    },
    registerAsTranslator: {
      urlModel: '/register',
      url: `${baseURL()}/register`,
      method: 'POST',
    },
    updateTranslatorProfile: {
      urlModel: '/',
      url: `${baseURL()}/`,
      method: 'PUT',
    },
    uploadMainPicture: {
      urlModel: '/me/picture/main',
      url: `${baseURL()}/me/picture/main`,
      method: 'POST',
    },
    uploadCoverPicture: {
      urlModel: '/me/picture/cover',
      url: `${baseURL()}/me/picture/cover`,
      method: 'POST',
    },
    // Missions
    estimateMission: {
      urlModel: '/mission/estimate',
      url: `${baseURL()}/mission/estimate`,
      method: 'POST',
    },
    createMission: {
      urlModel: '/mission',
      url: `${baseURL()}/mission`,
      method: 'POST',
    },
    getMyMissions: {
      urlModel: '/mission',
      url: `${baseURL()}/mission`,
      method: 'GET',
    },
    getMissionById: {
      urlModel: '/mission/:missionId',
      url: ({ missionId }: { missionId: string }) =>
        `${baseURL()}/mission/${missionId}`,
      method: 'GET',
    },
    updateMissionStatus: {
      urlModel: '/mission/:missionId/status',
      url: ({ missionId }: { missionId: string }) =>
        `${baseURL()}/mission/${missionId}/status`,
      method: 'PUT',
    },
    // Reviews
    submitReview: {
      urlModel: '/mission/:missionId/review',
      url: ({ missionId }: { missionId: string }) =>
        `${baseURL()}/mission/${missionId}/review`,
      method: 'POST',
    },
    // Chat
    getChatHistory: {
      urlModel: '/mission/:missionId/chat/history',
      url: ({ missionId }: { missionId: string }) =>
        `${baseURL()}/mission/${missionId}/chat/history`,
      method: 'GET',
    },
    sendMessage: {
      urlModel: '/mission/:missionId/chat',
      url: ({ missionId }: { missionId: string }) =>
        `${baseURL()}/mission/${missionId}/chat`,
      method: 'POST',
    },
    chatSSE: {
      urlModel: '/mission/:missionId/chat/stream',
      url: ({ missionId }: { missionId: string }) =>
        `${baseURL()}/mission/${missionId}/chat/stream`,
      method: 'GET',
    },
    // Payment stubs
    createPaymentIntent: {
      urlModel: '/mission/:missionId/payment/intent',
      url: ({ missionId }: { missionId: string }) =>
        `${baseURL()}/mission/${missionId}/payment/intent`,
      method: 'POST',
    },
    confirmPayment: {
      urlModel: '/mission/:missionId/payment/confirm',
      url: ({ missionId }: { missionId: string }) =>
        `${baseURL()}/mission/${missionId}/payment/confirm`,
      method: 'POST',
    },
    requestPayout: {
      urlModel: '/payout',
      url: `${baseURL()}/payout`,
      method: 'POST',
    },
    // Admin
    validateTranslatorProfile: {
      urlModel: '/:translatorId/validate',
      url: ({ translatorId }: { translatorId: string }) =>
        `${baseURL()}/${translatorId}/validate`,
      method: 'PUT',
    },
  }) satisfies Routes;

export const translatorRouter = async (fastify: FastifyInstance) => {
  const routes = getTranslatorRoutes();

  // Accept raw image buffers for picture uploads
  fastify.addContentTypeParser(
    /^image\//,
    { parseAs: 'buffer' },
    (_req, body, done) => done(null, body)
  );

  // Public
  fastify.get(routes.getMarketplace.urlModel, getMarketplace);
  fastify.get(routes.getMyTranslatorProfile.urlModel, getMyTranslatorProfile);
  fastify.get(routes.getTranslatorReviews.urlModel, getTranslatorReviews);
  fastify.get(routes.getTranslatorById.urlModel, getTranslatorById);

  // Authenticated profile
  fastify.post(routes.registerAsTranslator.urlModel, registerAsTranslator);
  fastify.put(routes.updateTranslatorProfile.urlModel, updateTranslatorProfile);
  fastify.post(routes.uploadMainPicture.urlModel, uploadTranslatorMainPicture);
  fastify.post(
    routes.uploadCoverPicture.urlModel,
    uploadTranslatorCoverPicture
  );

  // Missions — specific routes before parameterized ones
  fastify.post(routes.estimateMission.urlModel, estimateMission);
  fastify.post(routes.createMission.urlModel, createMission);
  fastify.get(routes.getMyMissions.urlModel, getMyMissions);
  fastify.get(routes.getMissionById.urlModel, getMissionById);
  fastify.put(routes.updateMissionStatus.urlModel, updateMissionStatus);

  // Reviews
  fastify.post(routes.submitReview.urlModel, submitReview);

  // Chat
  fastify.get(routes.getChatHistory.urlModel, getChatHistory);
  fastify.post(routes.sendMessage.urlModel, sendMessage);
  fastify.get(routes.chatSSE.urlModel, chatSSE);

  // Payment stubs
  fastify.post(routes.createPaymentIntent.urlModel, createPaymentIntent);
  fastify.post(routes.confirmPayment.urlModel, confirmPayment);
  fastify.post(routes.requestPayout.urlModel, requestPayout);

  // Admin
  fastify.put(
    routes.validateTranslatorProfile.urlModel,
    validateTranslatorProfile
  );
};
