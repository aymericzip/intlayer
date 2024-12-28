import {
  auditContentDeclaration,
  auditContentDeclarationMetadata,
  auditTag,
} from '@controllers/ai.controller';
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
  auditContentDeclarationMetadata: {
    urlModel: '/audit/content-declaration/metadata',
    url: `${baseURL}/audit/content-declaration/metadata`,
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
aiRouter.post(
  aiRoutes.auditContentDeclarationMetadata.urlModel,
  auditContentDeclarationMetadata
);
aiRouter.post(aiRoutes.auditTag.urlModel, auditTag);
