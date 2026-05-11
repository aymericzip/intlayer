import type { Account as BetterAuthAccount } from 'better-auth';
import type { Document, Model } from 'mongoose';

export type Account = BetterAuthAccount & {
  accessToken?: string;
  access_token?: string;
  refreshToken?: string;
  refresh_token?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  scope?: string;
  idToken?: string;
  password?: string;
  expiresAt?: Date;
};

export type AccountSchema = Account;
export type AccountModelType = Model<Account>;
export type AccountDocument = Document<unknown, {}, Account> & Account;
