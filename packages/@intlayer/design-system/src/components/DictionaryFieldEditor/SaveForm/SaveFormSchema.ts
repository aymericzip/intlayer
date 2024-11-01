import { z } from 'zod';

export const getSaveFormSchema = () => {
  return z.object({});
};

export type SaveFormData = z.infer<ReturnType<typeof getSaveFormSchema>>;
