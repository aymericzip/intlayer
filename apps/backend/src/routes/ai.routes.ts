import {
  askDocQuestion,
  auditContentDeclaration,
  auditContentDeclarationField,
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
  auditContentDeclarationField: {
    urlModel: '/audit/content-declaration/field',
    url: `${baseURL}/audit/content-declaration/field`,
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
  ask: {
    urlModel: '/ask',
    url: `${baseURL}/ask`,
    method: 'POST',
  },
} satisfies Routes;

aiRouter.post(
  aiRoutes.auditContentDeclaration.urlModel,
  auditContentDeclaration
);
aiRouter.post(
  aiRoutes.auditContentDeclarationField.urlModel,
  auditContentDeclarationField
);
aiRouter.post(
  aiRoutes.auditContentDeclarationMetadata.urlModel,
  auditContentDeclarationMetadata
);
aiRouter.post(aiRoutes.ask.urlModel, askDocQuestion);

aiRouter.post(aiRoutes.auditTag.urlModel, auditTag);
