import { accountSchema } from '@schemas/account.schema';
import { model } from 'mongoose';
import type { AccountModelType, AccountSchema } from '@/types/account.types';

export const AccountModel = model<AccountSchema, AccountModelType>(
  'account',
  accountSchema
);
