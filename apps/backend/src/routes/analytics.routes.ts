import {
  getAnalyticsAudience,
  getAnalyticsOverview,
  getContentStats,
  getExperimentResults,
  getPageMetadata,
  ingestAnalyticsEvents,
} from '@controllers/analytics.controller';
import { analyticsContract } from '@intlayer/backend-contract/analytics';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import { analyticsIngestLimiter } from '@utils/rateLimiter';
import type { FastifyInstance } from 'fastify';

export const analyticsRoute = analyticsContract.prefix;

export const analyticsRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, analyticsContract, {
    // Public ingestion — attributed by the SDK's public browser token
    // (`analytics:ingest` scope), obtained from `POST /api/public/token`. Rate
    // limited per IP: the endpoint is unauthenticated, so it must not be a
    // write amplifier.
    ingestAnalyticsEvents: {
      handler: ingestAnalyticsEvents,
      options: { config: { rateLimit: analyticsIngestLimiter } },
    },
    // Authenticated dashboard reads.
    getAnalyticsOverview,
    getAnalyticsAudience,
    getContentStats,
    getExperimentResults,
    getPageMetadata,
  });
};
