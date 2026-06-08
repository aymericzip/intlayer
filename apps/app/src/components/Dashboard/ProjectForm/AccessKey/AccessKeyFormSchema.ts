import { z } from 'zod/v4';

export const getAccessKeySchema = () => {
  return z.object({});
};

export type AccessKeyFormData = z.infer<ReturnType<typeof getAccessKeySchema>>;
