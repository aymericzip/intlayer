import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useProfileFormSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'profile-form-schema'
  );

  return z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorName.value
            : invalidTypeErrorName.value,
      })
      .min(1, invalidTypeErrorName.value)
      .default(''),
  });
};
export type ProfileFormData = z.infer<ReturnType<typeof useProfileFormSchema>>;
