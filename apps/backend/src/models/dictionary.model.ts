import type { Dictionary } from '@/types/dictionary.types';
import { dictionarySchema } from '@schemas/dictionary.schema';
import type { RenameId } from '@utils/mongoDB/types';
import { Model, model } from 'mongoose';

export const DictionaryModel = model<RenameId<Dictionary>, Model<Dictionary>>(
  'dictionary',
  dictionarySchema
);
