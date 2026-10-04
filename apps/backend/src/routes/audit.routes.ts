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
import { scanContract } from '@intlayer/backend-contract/scan';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import { analyticsIngestLimiter } from '@utils/rateLimiter';
import type { FastifyInstance } from 'fastify';

export const auditRoute = scanContract.prefix;

export const auditRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, scanContract, {
    scan: auditGetHandler,
    getTechnologyUsage: getTechnologyUsageHandler,
    getScannedHosts: getScannedHostsHandler,
    getScannedHost: getScannedHostHandler,
    // Public (Chrome extension): rate limited per IP
    reportHostDetection: {
      handler: reportHostDetectionHandler,
      options: { config: { rateLimit: analyticsIngestLimiter } },
    },
    discoverUrls,
    startRecursive: startRecursiveAudit,
    getRecursiveStatus: getRecursiveAuditStatus,
    cancelRecursive: cancelRecursiveAudit,
    pauseRecursive: pauseRecursiveAudit,
    resumeRecursive: resumeRecursiveAudit,
  });
};
