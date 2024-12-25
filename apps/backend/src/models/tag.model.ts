import { tagSchema } from '@schemas/tag.schema';
import { model } from 'mongoose';
import type { Tag, TagModelType } from '@/types/tag.types';

export const TagModel = model<Tag, TagModelType>('tag', tagSchema);
