import {
  addDictionary,
  deleteDictionary,
  getDictionaries,
  getDictionariesByKeys,
  getDictionariesKeys,
  getDictionariesUpdateTimestamp,
  getDictionaryByKey,
  pushDictionaries,
  updateDictionary,
} from '@controllers/dictionary.controller';
import { dictionaryContract } from '@intlayer/backend-contract/dictionary';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const dictionaryRoute = dictionaryContract.prefix;

export const dictionaryRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, dictionaryContract, {
    getDictionaries,
    getDictionariesKeys,
    getDictionariesUpdateTimestamp,
    getDictionariesByKeys,
    getDictionary: getDictionaryByKey,
    addDictionary,
    pushDictionaries,
    updateDictionary,
    deleteDictionary,
  });
};
