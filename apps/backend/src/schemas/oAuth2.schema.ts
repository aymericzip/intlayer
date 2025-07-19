import { Schema } from 'mongoose';

type Client = {
  id: string;
};

type User = {
  _id: string;
};

type TokenType = {
  accessToken: string;
  accessTokenExpiresAt: Date;
  client: Client;
  user: User;
};

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
    },
    clientId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

accessTokenSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 10, // 10 Days
  }
);
