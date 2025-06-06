import type { Routes } from '@/types/Routes';
import {
  askDocQuestion,
  auditContentDeclaration,
  auditContentDeclarationField,
  auditContentDeclarationMetadata,
  auditTag,
  autocomplete,
  translateJSON,
} from '@controllers/ai.controller';
import { Router } from 'express';

export const aiRouter: Router = Router();

export const aiRoute = '/api/ai';

const baseURL = () => `${process.env.BACKEND_URL}${aiRoute}`;

export const getAiRoutes = () =>
  ({
    translateJSON: {
      urlModel: '/translate/json',
      url: `${baseURL()}/translate/json`,
      method: 'POST',
    },
    auditContentDeclaration: {
      urlModel: '/audit/dictionary',
      url: `${baseURL()}/audit/dictionary`,
      method: 'POST',
    },
    auditContentDeclarationField: {
      urlModel: '/audit/dictionary/field',
      url: `${baseURL()}/audit/dictionary/field`,
      method: 'POST',
    },
    auditContentDeclarationMetadata: {
      urlModel: '/audit/dictionary/metadata',
      url: `${baseURL()}/audit/dictionary/metadata`,
      method: 'POST',
    },
    auditTag: {
      urlModel: '/audit/tag',
      url: `${baseURL()}/audit/tag`,
      method: 'POST',
    },
    ask: {
      urlModel: '/ask',
      url: `${baseURL()}/ask`,
      method: 'POST',
    },
    autocomplete: {
      urlModel: '/autocomplete',
      url: `${baseURL()}/autocomplete`,
      method: 'POST',
    },
  }) satisfies Routes;

aiRouter.post(getAiRoutes().translateJSON.urlModel, translateJSON);

aiRouter.post(
  getAiRoutes().auditContentDeclaration.urlModel,
  auditContentDeclaration
);
aiRouter.post(
  getAiRoutes().auditContentDeclarationField.urlModel,
  auditContentDeclarationField
);
aiRouter.post(
  getAiRoutes().auditContentDeclarationMetadata.urlModel,
  auditContentDeclarationMetadata
);
aiRouter.post(getAiRoutes().ask.urlModel, askDocQuestion);

aiRouter.post(getAiRoutes().auditTag.urlModel, auditTag);

aiRouter.post(getAiRoutes().autocomplete.urlModel, autocomplete);
