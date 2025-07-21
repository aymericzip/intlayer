import type { Dictionary } from '@/types/dictionary.types';
import { dictionarySchema } from '@schemas/dictionary.schema';
import { RenameId } from '@schemas/user.schema';
import { Model, model } from 'mongoose';

export const DictionaryModel = model<RenameId<Dictionary>, Model<Dictionary>>(
  'dictionary',
  dictionarySchema
);
