import { z } from 'zod';

export const getAccessKeySchema = () => {
  return z.object({});
};

export type AccessKeyFormData = z.infer<ReturnType<typeof getAccessKeySchema>>;
