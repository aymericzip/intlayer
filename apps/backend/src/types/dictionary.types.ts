import type { DictionaryValue } from '@intlayer/core';
import type { Model, ObjectId, Document } from 'mongoose';
import type { Project } from './project.types';
import type { User } from './user.types';

export type DictionaryCreationData = {
  projectIds: (Project['_id'] | string)[];
  key: string;
  content?: DictionaryValue;
  title?: string;
  description?: string;
  tags?: string[];
  version?: number;
  filePath?: string;
};

export type DictionaryData = {
  key: string;
  content: DictionaryValue[];
  projectIds: (Project['_id'] | string)[];
  creatorId: User['_id'];
  title?: string;
  description?: string;
  tags?: string[];
  version?: number;
  filePath?: Record<string, string>;
};

export type Dictionary = DictionaryData & {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type DictionaryAPI = Omit<Dictionary, 'filePath' | 'content'> & {
  content: DictionaryValue;
  filePath?: string;
};

export type DictionaryDocument = Document<unknown, {}, Dictionary> & Dictionary;
export type DictionaryModelType = Model<Dictionary>;
