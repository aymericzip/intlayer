import type {
  ContentNode,
  Dictionary as DictionaryCore,
} from '@intlayer/types/dictionary';
import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Project } from './project.types';
import type { User } from './user.types';

/**
 * Qualifier coordinates of a dictionary (collections / variants).
 *
 * Pushed dictionaries are unmerged: sibling declarations sharing a `key` are
 * distinguished by these coordinates. Persisting them lets the build re-merge
 * remote dictionaries into a `QualifiedDictionaryGroup` on pull. A plain
 * dictionary leaves all of them undefined.
 */
export type DictionaryQualifiers = {
  /**
   * Variant discriminator — a named string (A/B testing, seasonal banners…) or
   * a structured object (CMS records, user-specific copy…).
   */
  variant?: string | Record<string, string | number>;
  /** Ordered collection item index. */
  item?: number;
};

export type DictionaryCreationData = DictionaryQualifiers & {
  projectIds: (Project['id'] | string)[];
  key: string;
  content?: ContentNode;
  title?: string;
  description?: string;
  priority?: number;
  importMode?: 'static' | 'dynamic' | 'fetch';
  tags?: string[];
  environmentId?: string;
};

export type VersionedContentEl = {
  name?: string;
  description?: string;
  content: ContentNode;
};

export type ContentVersion = string;
export type VersionedContent = Map<string, VersionedContentEl>;

export type DictionaryData = DictionaryQualifiers & {
  key: string;
  content: VersionedContent;
  projectIds: (Project['id'] | string)[];
  creatorId: User['id'];
  title?: string;
  description?: string;
  priority?: number;
  importMode?: 'static' | 'dynamic' | 'fetch';
  tags?: string[];
  /** If set, this dictionary belongs to a specific project environment. Null means shared (visible in all envs). */
  environmentId?: Types.ObjectId | string | null;
};

export type Dictionary = DictionaryData & {
  id: Types.ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type DictionaryAPI = ObjectIdToString<
  DictionaryCore & {
    projectIds: (Project['id'] | string)[];
    updatedAt: number;
    createdAt: number;
  }
>;

export type DictionarySchema = RenameId<Dictionary>;
export type DictionaryModelType = Model<Dictionary>;
export type DictionaryDocument = Document<unknown, {}, Dictionary> & Dictionary;
