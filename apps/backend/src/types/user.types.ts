import type { ObjectId, Model, Document } from 'mongoose';
import type { Session, SessionProviders } from './session.types';

export interface UserData {
  email: string;
  name: string;
  phone?: string;
  dateOfBirth?: Date;
}

export interface User extends UserData {
  _id: ObjectId;
  provider?: SessionProviders[];
  customerId?: string;
  session?: Session;
  createdAt: number;
  updatedAt: number;
}

export interface UserAPI
  extends Omit<User, 'provider' | 'session' | 'createdAt'> {
  role: string;
}

export type UserDocument = Document<unknown, {}, User> & User;

export type UserWithPasswordNotHashed = Partial<User> &
  Pick<User, 'email'> & {
    password?: string;
  };

export type UserModelType = Model<User> & {
  login: (email: string, password: string) => Promise<User>;
  changePassword: (
    userId: ObjectId | string,
    oldPassword: string,
    newPassword: string
  ) => Promise<User>;
  resetPassword: (userId: User['_id'], password: string) => Promise<User>;
};
