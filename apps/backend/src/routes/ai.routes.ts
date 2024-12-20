import { auditFile } from '@controllers/ai.controller';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const aiRouter: Router = Router();

const baseURL = `${process.env.BACKEND_URL}/api/ai`;

export const aiRoutes = {
  auditFile: {
    urlModel: '/audit',
    url: `${baseURL}/audit`,
    method: 'POST',
  },
} satisfies Routes;

aiRouter.post(aiRoutes.auditFile.urlModel, auditFile);
