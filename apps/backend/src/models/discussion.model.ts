import type { Discussion, DiscussionModelType } from '@/types/discussion.types';
import { discussionSchema } from '@schemas/discussion.schema';
import { model } from 'mongoose';

export const DiscussionModel = model<Discussion, DiscussionModelType>(
  'discussion',
  discussionSchema
);
