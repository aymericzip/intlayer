import {
  addDictionary,
  deleteDictionary,
  getDictionaries,
  updateDictionary,
} from '@controllers/dictionary.controller';
import { Router } from 'express';

export const dictionaryRouter: Router = Router();

dictionaryRouter.get('/', getDictionaries);

dictionaryRouter.post('/', addDictionary);
dictionaryRouter.put('/', updateDictionary);
dictionaryRouter.delete('/', deleteDictionary);
