import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useCreatePromoCodeFormSchema = () => {
  const content = useIntlayer('admin-promo-codes');

  return z.object({
    code: z
      .string()
      .check(
        z.minLength(1, content.codeRequiredError.value),
        z.regex(/^[a-zA-Z0-9_-]+$/, content.codeRegexError.value)
      ),
    discountType: z.enum(['amount', 'percentage']),
    discountValue: z.coerce
      .number()
      .check(z.minimum(1, content.discountValueMinError.value)),
    expiresAt: z.optional(z.string()),
  });
};

export type CreatePromoCodeFormData = z.infer<
  ReturnType<typeof useCreatePromoCodeFormSchema>
>;
