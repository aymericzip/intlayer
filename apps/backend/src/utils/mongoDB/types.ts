import type { Types } from 'mongoose';

export type RenameId<T extends { id: Types.ObjectId }> = Omit<T, 'id'> & {
  _id: T['id'];
};

export type OmitId<T extends { id?: any; _id?: any }> = Omit<T, 'id | _id'>;
