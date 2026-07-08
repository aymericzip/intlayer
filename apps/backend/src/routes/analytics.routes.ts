import {
  getAnalyticsAudience,
  getAnalyticsOverview,
  getContentStats,
  getExperimentResults,
  ingestAnalyticsEvents,
} from '@controllers/analytics.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const analyticsRoute = '/api/analytics';

const baseURL = () => `${process.env.BACKEND_URL}${analyticsRoute}`;

export const getAnalyticsRoutes = () =>
  ({
    ingestAnalyticsEvents: {
      urlModel: '/events',
      url: `${baseURL()}/events`,
      method: 'POST',
    },
    getAnalyticsOverview: {
      urlModel: '/overview',
      url: `${baseURL()}/overview`,
      method: 'GET',
    },
    getAnalyticsAudience: {
      urlModel: '/audience',
      url: `${baseURL()}/audience`,
      method: 'GET',
    },
    getContentStats: {
      urlModel: '/content-stats',
      url: `${baseURL()}/content-stats`,
      method: 'GET',
    },
    getExperimentResults: {
      urlModel: '/experiments/:experimentKey',
      url: `${baseURL()}/experiments/:experimentKey`,
      method: 'GET',
    },
  }) satisfies Routes;

export const analyticsRouter = async (fastify: FastifyInstance) => {
  // Public ingestion — attributed by the SDK's `clientId`.
  fastify.post(
    getAnalyticsRoutes().ingestAnalyticsEvents.urlModel,
    ingestAnalyticsEvents
  );

  // Authenticated dashboard reads.
  fastify.get(
    getAnalyticsRoutes().getAnalyticsOverview.urlModel,
    getAnalyticsOverview
  );
  fastify.get(
    getAnalyticsRoutes().getAnalyticsAudience.urlModel,
    getAnalyticsAudience
  );
  fastify.get(getAnalyticsRoutes().getContentStats.urlModel, getContentStats);
  fastify.get(
    getAnalyticsRoutes().getExperimentResults.urlModel,
    getExperimentResults
  );
};
