import { z } from 'zod/v4';

export const getVerifyEmailSchema = () => {
  return z.object({});
};

export type VerifyEmail = z.infer<ReturnType<typeof getVerifyEmailSchema>>;
