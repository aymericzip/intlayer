import { model } from 'mongoose';
import { accessTokenSchema, Token } from '../schemas/oAuth2.schema';

export const OAuth2AccessTokenModel = model<Token>('oAuth2', accessTokenSchema);
