import type { User } from './user.type';

export type Organization = {
  _id: string;
  name: string;
  members: User['_id'][];
  creatorId: User['_id'];
  createdAt: number;
};
