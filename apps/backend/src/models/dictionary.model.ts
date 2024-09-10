import { dictionarySchema } from '@schemas/dictionary.schema';
import { model } from 'mongoose';
import type { Dictionary } from '@/types/dictionary.types';

export const DictionaryModel = model<Dictionary>(
  'dictionary',
  dictionarySchema
);
