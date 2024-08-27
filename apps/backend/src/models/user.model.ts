import { userSchema } from '@schemas/user.schema';
import { model } from 'mongoose';
import type { User, UserModelType } from '@/types/user.types';

export const UserModel = model<User, UserModelType>('user', userSchema);
