import type { Organization } from './organization.type';
import type { User } from './user.type';

export type ProjectData = {
  organizationId: Organization['_id'];
  name: string;
  members: User['_id'][];
};

export type Project = ProjectData & {
  _id: string;
  creatorId: User['_id'];
  createdAt: number;
};
