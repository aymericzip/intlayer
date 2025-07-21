import type { Tag } from '@/types/tag.types';
import { tagSchema } from '@schemas/tag.schema';
import { RenameId } from '@schemas/user.schema';
import { Model, model } from 'mongoose';

export const TagModel = model<RenameId<Tag>, Model<Tag>>('tag', tagSchema);
