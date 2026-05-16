import { type Model, model } from 'mongoose';
import {
  type CliSessionToken,
  cliSessionTokenSchema,
} from '../schemas/cliSessionToken.schema';

export const CliSessionTokenModel = model<
  CliSessionToken,
  Model<CliSessionToken>
>('cliSessionToken', cliSessionTokenSchema);
