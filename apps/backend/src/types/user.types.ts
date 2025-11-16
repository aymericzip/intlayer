import type { RenameId } from '@utils/mongoDB/types';
import type { User as BetterAuthUser, OmitId } from 'better-auth';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';

export interface UserData {
  email: string;
  name: string;
  phone?: string;
  dateOfBirth?: Date;
}

export enum EmailsList {
  NEWS_LETTER = 'newsLetter',
}

export type User = OmitId<UserData & BetterAuthUser> & {
  id: Types.ObjectId;
  emailsList?: {
    [key in EmailsList]: boolean;
  };
  customerId?: string; // Stripe customer ID
  role?: string;
  lastLoginMethod?: 'email' | 'google' | 'github' | 'passkey';
  lang?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAPI = ObjectIdToString<Omit<User, 'provider' | 'session'>>;

export type UserSchema = RenameId<User>;
export type UserModelType = Model<User>;
export type UserDocument = Document<unknown, {}, User> & User;
