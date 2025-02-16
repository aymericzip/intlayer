import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useProfileFormSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'profile-form-schema'
  );

  return z.object({
    name: z
      .string({
        required_error: requiredErrorName.value,
        invalid_type_error: invalidTypeErrorName.value,
      })
      .min(1, { message: invalidTypeErrorName.value })
      .default(''),
  });
};
export type ProfileFormData = z.infer<ReturnType<typeof useProfileFormSchema>>;
