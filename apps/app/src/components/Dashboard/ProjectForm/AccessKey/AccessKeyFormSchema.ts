import { z } from 'zod/mini';

export const getAccessKeySchema = () => {
  return z.object({});
};

export type AccessKeyFormData = z.infer<ReturnType<typeof getAccessKeySchema>>;
