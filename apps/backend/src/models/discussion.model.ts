import type { Discussion } from '@/types/discussion.types';
import { discussionSchema } from '@schemas/discussion.schema';
import { RenameId } from '@schemas/user.schema';
import { Model, model } from 'mongoose';

export const DiscussionModel = model<RenameId<Discussion>, Model<Discussion>>(
  'discussion',
  discussionSchema
);
