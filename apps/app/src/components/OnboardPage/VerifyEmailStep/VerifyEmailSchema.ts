import { z } from 'zod';

export const getVerifyEmailSchema = () => {
  return z.object({});
};

export type VerifyEmail = z.infer<ReturnType<typeof getVerifyEmailSchema>>;
