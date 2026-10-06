import type {
  ContentNode,
  Dictionary as DictionaryCore,
  DictionaryVariantValue,
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
  variant?: DictionaryVariantValue | DictionaryVariantValue[];
  /** Ordered collection item index. */
  item?: number;
};

/** Outcome of the last attempt to commit a CMS edit to the source file. */
export type DictionarySourceSyncStatus =
  | 'committed'
  | 'pull-request'
  | 'up-to-date'
  | 'file-not-found'
  | 'unsupported'
  | 'error';

export type DictionarySourceSync = {
  status: DictionarySourceSyncStatus;
  /** Commit (or pull request) link on the git provider */
  url?: string;
  commitSha?: string;
  message?: string;
  syncedAt: Date;
};

/**
 * Where the dictionary is declared in the codebase, as pushed by the CLI.
 * Used to write CMS edits back to the `.content` file.
 */
export type DictionarySource = {
  /** `hybrid`, `remote`, `local`, or a plugin location */
  location?: string;
  /** Path of the `.content` file, relative to the intlayer config directory */
  filePath?: string;
  sourceSync?: DictionarySourceSync;
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

export type DictionaryData = DictionaryQualifiers &
  DictionarySource & {
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
  createdAt: Date;
  updatedAt: Date;
};

export type DictionaryAPI = ObjectIdToString<
  DictionaryCore & {
    id: Types.ObjectId | string;
    projectIds: (Project['id'] | string)[];
    creatorId: User['id'];
    /** Content versions, oldest first (added by `mapDictionaryToAPI`). */
    versionList: string[];
    environmentId?: Types.ObjectId | string | null;
    sourceSync?: DictionarySourceSync;
    updatedAt: Date;
    createdAt: Date;
  }
>;

export type DictionarySchema = RenameId<Dictionary>;
export type DictionaryModelType = Model<Dictionary>;
export type DictionaryDocument = Document<unknown, {}, Dictionary> & Dictionary;
