import { auditContentDeclaration, auditTag } from '@controllers/ai.controller';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const aiRouter: Router = Router();

const baseURL = `${process.env.BACKEND_URL}/api/ai`;

export const aiRoutes = {
  auditContentDeclaration: {
    urlModel: '/audit/content-declaration',
    url: `${baseURL}/audit/content-declaration`,
    method: 'POST',
  },
  auditTag: {
    urlModel: '/audit/tag',
    url: `${baseURL}/audit/tag`,
    method: 'POST',
  },
} satisfies Routes;

aiRouter.post(
  aiRoutes.auditContentDeclaration.urlModel,
  auditContentDeclaration
);
aiRouter.post(aiRoutes.auditTag.urlModel, auditTag);
