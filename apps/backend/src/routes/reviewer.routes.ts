import {
  chatSSE,
  confirmPayment,
  contactReviewer,
  createMission,
  createPaymentIntent,
  deleteMyReviewerProfile,
  estimateMission,
  getAdminReviewers,
  getChatHistory,
  getMarketplace,
  getMissionById,
  getMyMissions,
  getMyReviewerProfile,
  getPriceDistribution,
  getReviewerById,
  getReviewerReviews,
  registerAsReviewer,
  requestPayout,
  sendMessage,
  submitReview,
  updateMissionStatus,
  updateReviewerProfile,
  uploadReviewerCoverPicture,
  uploadReviewerMainPicture,
  validateReviewerProfile,
} from '@controllers/reviewer.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const reviewerRoute = '/api/reviewer';

const baseURL = () => `${process.env.BACKEND_URL}${reviewerRoute}`;

export const getReviewerRoutes = () =>
  ({
    // Public marketplace
    getMarketplace: {
      urlModel: '/marketplace',
      url: `${baseURL()}/marketplace`,
      method: 'GET',
    },
    getPriceDistribution: {
      urlModel: '/marketplace/price-distribution',
      url: `${baseURL()}/marketplace/price-distribution`,
      method: 'GET',
    },
    getReviewerById: {
      urlModel: '/:reviewerId',
      url: ({ reviewerId }: { reviewerId: string }) =>
        `${baseURL()}/${reviewerId}`,
      method: 'GET',
    },
    getReviewerReviews: {
      urlModel: '/:reviewerId/reviews',
      url: ({ reviewerId }: { reviewerId: string }) =>
        `${baseURL()}/${reviewerId}/reviews`,
      method: 'GET',
    },
    // Authenticated profile
    getMyReviewerProfile: {
      urlModel: '/me',
      url: `${baseURL()}/me`,
      method: 'GET',
    },
    registerAsReviewer: {
      urlModel: '/register',
      url: `${baseURL()}/register`,
      method: 'POST',
    },
    updateReviewerProfile: {
      urlModel: '/',
      url: `${baseURL()}/`,
      method: 'PUT',
    },
    deleteReviewerProfile: {
      urlModel: '/',
      url: `${baseURL()}/`,
      method: 'DELETE',
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
    // Contact
    contactReviewer: {
      urlModel: '/:reviewerId/contact',
      url: ({ reviewerId }: { reviewerId: string }) =>
        `${baseURL()}/${reviewerId}/contact`,
      method: 'POST',
    },
    // Admin
    getAdminReviewers: {
      urlModel: '/admin/reviewers',
      url: `${baseURL()}/admin/reviewers`,
      method: 'GET',
    },
    validateReviewerProfile: {
      urlModel: '/:reviewerId/validate',
      url: ({ reviewerId }: { reviewerId: string }) =>
        `${baseURL()}/${reviewerId}/validate`,
      method: 'PUT',
    },
  }) satisfies Routes;

export const reviewerRouter = async (fastify: FastifyInstance) => {
  const routes = getReviewerRoutes();

  // Accept raw image buffers for picture uploads
  fastify.addContentTypeParser(
    /^image\//,
    { parseAs: 'buffer' },
    (_req, body, done) => done(null, body)
  );

  // Public
  fastify.get(routes.getMarketplace.urlModel, getMarketplace);
  fastify.get(routes.getPriceDistribution.urlModel, getPriceDistribution);
  fastify.get(routes.getMyReviewerProfile.urlModel, getMyReviewerProfile);
  fastify.get(routes.getReviewerReviews.urlModel, getReviewerReviews);
  fastify.get(routes.getReviewerById.urlModel, getReviewerById);

  // Authenticated profile
  fastify.post(routes.registerAsReviewer.urlModel, registerAsReviewer);
  fastify.put(routes.updateReviewerProfile.urlModel, updateReviewerProfile);
  fastify.delete(routes.deleteReviewerProfile.urlModel, deleteMyReviewerProfile);
  const pictureRouteOpts = { bodyLimit: 20 * 1024 * 1024 };
  fastify.post(routes.uploadMainPicture.urlModel, pictureRouteOpts, uploadReviewerMainPicture);
  fastify.post(routes.uploadCoverPicture.urlModel, pictureRouteOpts, uploadReviewerCoverPicture);

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

  // Contact
  fastify.post(routes.contactReviewer.urlModel, contactReviewer);

  // Admin
  fastify.get(routes.getAdminReviewers.urlModel, getAdminReviewers);
  fastify.put(
    routes.validateReviewerProfile.urlModel,
    validateReviewerProfile
  );
};
