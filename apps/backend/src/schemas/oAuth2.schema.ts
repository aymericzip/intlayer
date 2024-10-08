import { ACCESS_TOKEN_EXPIRES_AT } from '@utils/oAuth';
import { Schema } from 'mongoose';
import { Token as TokenType, Client, User } from 'oauth2-server';

export type Token = Omit<TokenType, 'client' | 'user'> & {
  clientId: Client['id'];
  userId: User['_id'];
};

export const accessTokenSchema = new Schema<Token>(
  {
    accessToken: {
      type: String,
      required: true,
    },
    accessTokenExpiresAt: {
      type: Date,
      default: ACCESS_TOKEN_EXPIRES_AT,
    },
    clientId: {
      type: String,
      ref: 'Project',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    expireAfterSeconds: 60 * 60 * 24 * 10, // 10 Days
  }
);
