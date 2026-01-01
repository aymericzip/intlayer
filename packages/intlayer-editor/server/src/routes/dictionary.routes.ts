import {
  getDictionaries,
  writeContentDeclaration,
} from '@controllers/dictionary.controller';
import { getConfiguration } from '@intlayer/config';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

const { editor } = getConfiguration();

const getBaseURL = () => `${editor.editorURL}/api/dictionary`;

export const getDictionaryRoutes = () =>
  ({
    getDictionaries: {
      urlModel: '/',
      url: getBaseURL(),
      method: 'GET',
    },
    writeContentDeclaration: {
      urlModel: '/',
      url: getBaseURL(),
      method: 'POST',
    },
  }) satisfies Routes;

export const dictionaryRouter = async (fastify: FastifyInstance) => {
  fastify.get(getDictionaryRoutes().getDictionaries.urlModel, getDictionaries);
  fastify.post(
    getDictionaryRoutes().writeContentDeclaration.urlModel,
    writeContentDeclaration
  );
};
