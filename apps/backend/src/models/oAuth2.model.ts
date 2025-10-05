import { type Model, model } from 'mongoose';
import { accessTokenSchema, type Token } from '../schemas/oAuth2.schema';

export const OAuth2AccessTokenModel = model<Token, Model<Token>>(
  'oAuth2',
  accessTokenSchema
);
