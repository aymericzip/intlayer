import { tagSchema } from '@schemas/tag.schema';
import { model } from 'mongoose';
import type { TagModelType, TagSchema } from '@/types/tag.types';

export const TagModel = model<TagSchema, TagModelType>('tag', tagSchema);
