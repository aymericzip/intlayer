import { Model, model } from 'mongoose';
import { type Token, accessTokenSchema } from '../schemas/oAuth2.schema';

export const OAuth2AccessTokenModel = model<Token, Model<Token>>(
  'oAuth2',
  accessTokenSchema
);
