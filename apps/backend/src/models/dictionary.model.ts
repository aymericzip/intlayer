import { dictionarySchema } from '@schemas/dictionary.schema';
import type { RenameId } from '@utils/mongoDB/types';
import { type Model, model } from 'mongoose';
import type { Dictionary } from '@/types/dictionary.types';

export const DictionaryModel = model<RenameId<Dictionary>, Model<Dictionary>>(
  'dictionary',
  dictionarySchema
);
