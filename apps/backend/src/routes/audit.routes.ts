import {
  createAudit,
  getAuditById,
  getAudits,
} from '@controllers/audit.controller';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const auditRouter: Router = Router();

export const auditRoute = '/api/audit';

const baseURL = () => `${process.env.BACKEND_URL}${auditRoute}`;

export const getAuditRoutes = () =>
  ({
    createAudit: {
      urlModel: '/',
      url: baseURL(),
      method: 'POST',
    },
    getAudits: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
    },
    getAuditById: {
      urlModel: '/:auditId',
      url: ({ auditId }: { auditId: string }) => `${baseURL()}/${auditId}`,
      method: 'GET',
    },
  }) satisfies Routes;

auditRouter.post(getAuditRoutes().createAudit.urlModel, createAudit);
auditRouter.get(getAuditRoutes().getAudits.urlModel, getAudits);
auditRouter.get(getAuditRoutes().getAuditById.urlModel, getAuditById);
