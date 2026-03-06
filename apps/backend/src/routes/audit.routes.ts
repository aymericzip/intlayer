import { auditGetHandler } from '@controllers/audit.controller';
import {
  getRecursiveAuditStatus,
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
  }) satisfies Routes;

export const auditRouter = async (fastify: FastifyInstance) => {
  fastify.get(getAuditRoutes().scan.urlModel, auditGetHandler);
  fastify.post(getAuditRoutes().startRecursive.urlModel, startRecursiveAudit);
  fastify.get(
    getAuditRoutes().getRecursiveStatus.urlModel,
    getRecursiveAuditStatus
  );
};
