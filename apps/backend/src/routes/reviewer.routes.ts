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
import { reviewerContract } from '@intlayer/backend-contract/reviewer';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const reviewerRoute = reviewerContract.prefix;

/** Pictures are sent as raw images: allow up to 20 MB. */
const pictureRouteOptions = { bodyLimit: 20 * 1024 * 1024 };

export const reviewerRouter = async (fastify: FastifyInstance) => {
  // Accept raw image buffers for picture uploads
  fastify.addContentTypeParser(
    /^image\//,
    { parseAs: 'buffer' },
    (_request, body, done) => done(null, body)
  );

  registerContractRoutes(fastify, reviewerContract, {
    // Public
    getMarketplace,
    getPriceDistribution,
    getMyReviewerProfile,
    getReviewerReviews,
    getReviewerById,
    // Authenticated profile
    registerAsReviewer,
    updateReviewerProfile,
    deleteReviewerProfile: deleteMyReviewerProfile,
    uploadMainPicture: {
      handler: uploadReviewerMainPicture,
      options: pictureRouteOptions,
    },
    uploadCoverPicture: {
      handler: uploadReviewerCoverPicture,
      options: pictureRouteOptions,
    },
    // Missions
    estimateMission,
    createMission,
    getMyMissions,
    getMissionById,
    updateMissionStatus,
    submitReview,
    // Chat
    getChatHistory,
    sendMessage,
    chatSSE,
    // Payment (not available yet)
    createPaymentIntent,
    confirmPayment,
    requestPayout,
    contactReviewer,
    // Admin
    getAdminReviewers,
    validateReviewerProfile,
  });
};
