import { z } from 'zod/mini';

export const getVerifyEmailSchema = () => {
  return z.object({});
};

export type VerifyEmail = z.infer<ReturnType<typeof getVerifyEmailSchema>>;
