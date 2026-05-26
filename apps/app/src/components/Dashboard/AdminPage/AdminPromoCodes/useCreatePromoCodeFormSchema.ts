import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/v4';

export const useCreatePromoCodeFormSchema = () => {
  const content = useIntlayer('admin-promo-codes');

  return z.object({
    code: z
      .string()
      .min(1, content.codeRequiredError.value)
      .regex(/^[a-zA-Z0-9_-]+$/, content.codeRegexError.value),
    discountType: z.enum(['amount', 'percentage']),
    discountValue: z.coerce
      .number()
      .min(1, content.discountValueMinError.value),
    expiresAt: z.string().optional(),
  });
};

export type CreatePromoCodeFormData = z.infer<
  ReturnType<typeof useCreatePromoCodeFormSchema>
>;
