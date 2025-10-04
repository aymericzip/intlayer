import { discussionSchema } from '@schemas/discussion.schema';
import type { RenameId } from '@utils/mongoDB/types';
import { type Model, model } from 'mongoose';
import type { Discussion } from '@/types/discussion.types';

export const DiscussionModel = model<RenameId<Discussion>, Model<Discussion>>(
  'discussion',
  discussionSchema
);
