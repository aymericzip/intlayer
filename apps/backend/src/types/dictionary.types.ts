import type { Model, ObjectId } from 'mongoose';
import type { Project } from './project.types';
import type { User } from './user.types';

export type DictionaryData = {
  projectIds: Project['_id'][];
  key: string;
  content: JSON;
  creatorId: User['_id'];
};

export type Dictionary = DictionaryData & {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type DictionaryModelType = Model<Dictionary>;
