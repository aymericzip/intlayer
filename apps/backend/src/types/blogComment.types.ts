import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';

export type BlogCommentStatus = 'pending' | 'approved' | 'rejected';

export interface BlogComment extends Document {
  id: Types.ObjectId;
  blogSlug: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: BlogCommentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type BlogCommentAPI = ObjectIdToString<BlogComment>;

/**
 * Public-facing comment API — strips authorEmail for non-admin consumers.
 */
export type BlogCommentPublicAPI = Omit<BlogCommentAPI, 'authorEmail'>;

export type BlogCommentSchema = RenameId<BlogComment>;
export type BlogCommentModelType = Model<BlogComment>;
export type BlogCommentDocument = Document<unknown, {}, BlogComment> &
  BlogComment;
