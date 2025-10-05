import { userSchema } from '@schemas/user.schema';
import { model } from 'mongoose';
import type { UserModelType, UserSchema } from '@/types/user.types';

export const UserModel = model<UserSchema, UserModelType>('user', userSchema);
