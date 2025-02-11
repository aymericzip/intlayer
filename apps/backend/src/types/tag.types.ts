import type { ObjectId, Document, Model } from 'mongoose';
import type { Organization } from './organization.types';
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
  creatorId: User['_id'];
  organizationId: Organization['_id'];
};

export type Tag = TagData & {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type TagAPI = Tag;

export type TagDocument = Document<unknown, {}, Tag> & Tag;

export type TagModelType = Model<Tag>;
