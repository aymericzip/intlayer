import {
  askDocQuestion,
  auditContentDeclaration,
  auditContentDeclarationField,
  auditContentDeclarationMetadata,
  auditTag,
  autocomplete,
} from '@controllers/ai.controller';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const aiRouter: Router = Router();

const baseURL = `${process.env.BACKEND_URL}/api/ai`;

export const aiRoutes = {
  auditContentDeclaration: {
    urlModel: '/audit/dictionary',
    url: `${baseURL}/audit/dictionary`,
    method: 'POST',
  },
  auditContentDeclarationField: {
    urlModel: '/audit/dictionary/field',
    url: `${baseURL}/audit/dictionary/field`,
    method: 'POST',
  },
  auditContentDeclarationMetadata: {
    urlModel: '/audit/dictionary/metadata',
    url: `${baseURL}/audit/dictionary/metadata`,
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
  autocomplete: {
    urlModel: '/autocomplete',
    url: `${baseURL}/autocomplete`,
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

aiRouter.post(aiRoutes.autocomplete.urlModel, autocomplete);
