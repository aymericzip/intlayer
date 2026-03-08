import { auditGetHandler } from '@controllers/audit.controller';
import {
  cancelRecursiveAudit,
  discoverUrls,
  getRecursiveAuditStatus,
  pauseRecursiveAudit,
  resumeRecursiveAudit,
  startRecursiveAudit,
} from '@controllers/recursiveAudit.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const auditRoute = '/api/scan';

const baseURL = () => `${process.env.BACKEND_URL}${auditRoute}`;

export const getAuditRoutes = () =>
  ({
    scan: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
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
  fastify.get(getAuditRoutes().discoverUrls.urlModel, discoverUrls);
  fastify.post(getAuditRoutes().startRecursive.urlModel, startRecursiveAudit);
  fastify.get(
    getAuditRoutes().getRecursiveStatus.urlModel,
    getRecursiveAuditStatus
  );
  fastify.post(getAuditRoutes().cancelRecursive.urlModel, cancelRecursiveAudit);
  fastify.post(getAuditRoutes().pauseRecursive.urlModel, pauseRecursiveAudit);
  fastify.post(getAuditRoutes().resumeRecursive.urlModel, resumeRecursiveAudit);
};
