import type { TagModelType, TagSchema } from '@/types/tag.types';
import { tagSchema } from '@schemas/tag.schema';
import { model } from 'mongoose';

export const TagModel = model<TagSchema, TagModelType>('tag', tagSchema);
