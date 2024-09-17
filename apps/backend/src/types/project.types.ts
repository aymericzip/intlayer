import type { Model, ObjectId } from 'mongoose';
import type { Organization } from './organization.types';
import type { User } from './user.types';

export type ProjectCreationData = {
  name: Project['name'];
};

export type ProjectData = {
  organizationId: Organization['_id'];
  name: string;
  members: User['_id'][];
  creatorId: User['_id'];
};

export type Project = ProjectData & {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
};

export type ProjectModelType = Model<Project>;
