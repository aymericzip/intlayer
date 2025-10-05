import { Schema } from 'mongoose';
import type { Client, Token as TokenType } from 'oauth2-server';
import type { User } from '@/types/user.types';

export type Token = Omit<TokenType, 'client' | 'user'> & {
  clientId: Client['id'];
  userId: User['id'];
};

export const accessTokenSchema = new Schema<Token>(
  {
    accessToken: {
      type: String,
      required: true,
    },
    accessTokenExpiresAt: {
      type: Date,
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

    toJSON: {
      virtuals: true, // keep the automatic `id` getter
      versionKey: false, // drop __v
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id.toString(),
        };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id.toString(),
        };
      },
    },
  }
);

accessTokenSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 10, // 10 Days
  }
);
