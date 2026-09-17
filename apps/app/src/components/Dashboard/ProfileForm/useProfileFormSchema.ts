import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useProfileFormSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'profile-form-schema'
  );

  return z.object({
    name: z._default(
      z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorName.value
              : invalidTypeErrorName.value,
        })
        .check(z.minLength(1, invalidTypeErrorName.value)),
      ''
    ),
  });
};
export type ProfileFormData = z.infer<ReturnType<typeof useProfileFormSchema>>;
