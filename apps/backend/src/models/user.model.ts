import type { UserModelType, UserSchema } from '@/types/user.types';
import { userSchema } from '@schemas/user.schema';
import { model } from 'mongoose';

export const UserModel = model<UserSchema, UserModelType>('user', userSchema);
