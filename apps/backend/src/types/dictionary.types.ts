import {
  type ContentNode,
  type Dictionary as DictionaryCore,
} from '@intlayer/core';
import type { Model, ObjectId, Document } from 'mongoose';
import type { Project } from './project.types';
import type { User } from './user.types';

export type DictionaryCreationData = {
  projectIds: (Project['_id'] | string)[];
  key: string;
  content?: ContentNode;
  title?: string;
  description?: string;
  tags?: string[];
  filePath?: string;
};

export type VersionedContentEl = {
  name?: string;
  description?: string;
  content: ContentNode;
};

export type ContentVersion = string;
export type VersionedContent = Map<string, VersionedContentEl>;

export type DictionaryData = {
  key: string;
  content: VersionedContent;
  projectIds: (Project['_id'] | string)[];
  creatorId: User['_id'];
  title?: string;
  description?: string;
  tags?: string[];
  filePath?: Record<string, string>;
};

export type Dictionary = DictionaryData & {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
  availableVersions?: string[];
};

export type DictionaryAPI = DictionaryCore & {
  projectIds: (Project['_id'] | string)[];
};

export type DictionaryDocument = Document<unknown, {}, Dictionary> & Dictionary;
export type DictionaryModelType = Model<Dictionary>;
