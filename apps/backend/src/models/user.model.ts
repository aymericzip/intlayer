import type { User } from '@/types/user.types';
import { RenameId, userSchema } from '@schemas/user.schema';
import { Model, model } from 'mongoose';

export const UserModel = model<RenameId<User>, Model<User>>('user', userSchema);
