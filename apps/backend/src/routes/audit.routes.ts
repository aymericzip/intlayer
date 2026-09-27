import { auditGetHandler } from '@controllers/audit.controller';
import {
  cancelRecursiveAudit,
  discoverUrls,
  getRecursiveAuditStatus,
  pauseRecursiveAudit,
  resumeRecursiveAudit,
  startRecursiveAudit,
} from '@controllers/recursiveAudit.controller';
import {
  getScannedHostHandler,
  getScannedHostsHandler,
  getTechnologyUsageHandler,
  reportHostDetectionHandler,
} from '@controllers/scannedHost.controller';
import { analyticsIngestLimiter } from '@utils/rateLimiter';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';
import { jobIdParamsSchema } from './paramsSchemas';

export const auditRoute = '/api/scan';

/** `:host` of the scanned host routes: a lower-case hostname. */
const scannedHostParamsSchema = {
  type: 'object',
  required: ['host'],
  properties: {
    host: { type: 'string', maxLength: 253, pattern: '^[a-zA-Z0-9.-]+$' },
  },
} as const;

/**
 * Public detection report of the Chrome extension: every field is bounded,
 * technology names and categories are resolved server-side.
 */
const reportHostDetectionBodySchema = {
  type: 'object',
  required: ['url', 'technologies'],
  additionalProperties: false,
  properties: {
    url: { type: 'string', maxLength: 2048, pattern: '^https?://' },
    technologies: {
      type: 'array',
      maxItems: 50,
      items: {
        type: 'object',
        required: ['id'],
        additionalProperties: false,
        properties: {
          id: { type: 'string', maxLength: 64, pattern: '^[a-z0-9-]+$' },
          version: { type: 'string', maxLength: 64 },
        },
      },
    },
    routingStrategy: {
      type: 'string',
      enum: [
        'prefix-all',
        'prefix-no-default',
        'search-params',
        'subdomain',
        'domain',
        'no-prefix',
        'unknown',
      ],
    },
    locales: {
      type: 'array',
      maxItems: 100,
      items: {
        type: 'string',
        maxLength: 35,
        pattern: '^[a-zA-Z]{2,3}([_-][a-zA-Z0-9]{2,8})*$',
      },
    },
    title: { type: 'string', maxLength: 300 },
  },
} as const;

const baseURL = () => `${process.env.BACKEND_URL}${auditRoute}`;

export const getAuditRoutes = () =>
  ({
    scan: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
    },
    getTechnologyUsage: {
      urlModel: '/technologies',
      url: `${baseURL()}/technologies`,
      method: 'GET',
    },
    getScannedHosts: {
      urlModel: '/hosts',
      url: `${baseURL()}/hosts`,
      method: 'GET',
    },
    getScannedHost: {
      urlModel: '/hosts/:host',
      url: ({ host }: { host: string }) =>
        `${baseURL()}/hosts/${encodeURIComponent(host)}`,
      method: 'GET',
    },
    reportHostDetection: {
      urlModel: '/hosts/detections',
      url: `${baseURL()}/hosts/detections`,
      method: 'POST',
    },
    discoverUrls: {
      urlModel: '/recursive/discover',
      url: `${baseURL()}/recursive/discover`,
      method: 'GET',
    },
    startRecursive: {
      urlModel: '/recursive/start',
      url: `${baseURL()}/recursive/start`,
      method: 'POST',
    },
    getRecursiveStatus: {
      urlModel: '/recursive/:jobId',
      url: ({ jobId }: { jobId: string }) => `${baseURL()}/recursive/${jobId}`,
      method: 'GET',
    },
    cancelRecursive: {
      urlModel: '/recursive/:jobId/cancel',
      url: ({ jobId }: { jobId: string }) =>
        `${baseURL()}/recursive/${jobId}/cancel`,
      method: 'POST',
    },
    pauseRecursive: {
      urlModel: '/recursive/:jobId/pause',
      url: ({ jobId }: { jobId: string }) =>
        `${baseURL()}/recursive/${jobId}/pause`,
      method: 'POST',
    },
    resumeRecursive: {
      urlModel: '/recursive/:jobId/resume',
      url: ({ jobId }: { jobId: string }) =>
        `${baseURL()}/recursive/${jobId}/resume`,
      method: 'POST',
    },
  }) satisfies Routes;

export const auditRouter = async (fastify: FastifyInstance) => {
  fastify.get(getAuditRoutes().scan.urlModel, auditGetHandler);
  fastify.get(
    getAuditRoutes().getTechnologyUsage.urlModel,
    getTechnologyUsageHandler
  );
  fastify.get(
    getAuditRoutes().getScannedHosts.urlModel,
    getScannedHostsHandler
  );
  fastify.get(
    getAuditRoutes().getScannedHost.urlModel,
    { schema: { params: scannedHostParamsSchema } },
    getScannedHostHandler
  );
  fastify.post(
    getAuditRoutes().reportHostDetection.urlModel,
    {
      schema: { body: reportHostDetectionBodySchema },
      config: { rateLimit: analyticsIngestLimiter },
    },
    reportHostDetectionHandler
  );
  fastify.get(getAuditRoutes().discoverUrls.urlModel, discoverUrls);
  fastify.post(getAuditRoutes().startRecursive.urlModel, startRecursiveAudit);
  fastify.get(
    getAuditRoutes().getRecursiveStatus.urlModel,
    { schema: { params: jobIdParamsSchema } },
    getRecursiveAuditStatus
  );
  fastify.post(
    getAuditRoutes().cancelRecursive.urlModel,
    { schema: { params: jobIdParamsSchema } },
    cancelRecursiveAudit
  );
  fastify.post(
    getAuditRoutes().pauseRecursive.urlModel,
    { schema: { params: jobIdParamsSchema } },
    pauseRecursiveAudit
  );
  fastify.post(
    getAuditRoutes().resumeRecursive.urlModel,
    { schema: { params: jobIdParamsSchema } },
    resumeRecursiveAudit
  );
};
