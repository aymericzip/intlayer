import { userSchema } from '@schemas/user.schema';
import type { User, UserModelType } from '@types/user.type';
import { model } from 'mongoose';

export const UserModel = model<User, UserModelType>('user', userSchema);
