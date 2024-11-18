// import { t } from 'next-intlayer';
import { z } from 'zod';

export const getPaymentSchema = () => {
  return z.object({});
};

export type Payment = z.infer<ReturnType<typeof getPaymentSchema>>;
