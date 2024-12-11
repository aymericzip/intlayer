import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useProfileFormSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'profile-form-schema',
    undefined,
    false
  );

  return z.object({
    name: z
      .string({
        required_error: requiredErrorName,
        invalid_type_error: invalidTypeErrorName,
      })
      .min(1, { message: invalidTypeErrorName })
      .default(''),
  });
};
export type ProfileFormData = z.infer<ReturnType<typeof useProfileFormSchema>>;
