import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Organization } from './organization.types';
import type { Project } from './project.types';
import type { User } from './user.types';

export type TagCreationData = {
  key: string;
  name?: string;
  description?: string;
  instructions?: string;
};

export type TagData = {
  key: string;
  name?: string;
  description?: string;
  instructions?: string;
  creatorId: User['id'];
  projectId: Project['id'];
  organizationId: Organization['id'];
};

export type Tag = TagData & {
  id: Types.ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type TagAPI = ObjectIdToString<Tag>;

export type TagSchema = RenameId<Tag>;
export type TagModelType = Model<Tag>;
export type TagDocument = Document<unknown, {}, Tag> & Tag;
