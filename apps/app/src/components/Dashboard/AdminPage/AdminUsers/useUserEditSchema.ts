import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useUserEditSchema = () => {
  const { formValidation } = useIntlayer('user-edit-form');

  return z.object({
    name: z._default(
      z
        .string({
          error: () => formValidation.nameRequired.value,
        })
        .check(
          z.minLength(1, { error: formValidation.nameRequired.value }),
          z.maxLength(100, { error: formValidation.nameTooLong.value })
        ),
      ''
    ),
    email: z._default(
      z
        .email({
          error: () => formValidation.emailInvalid.value,
        })
        .check(z.minLength(1, { error: formValidation.emailRequired.value })),
      ''
    ),
    role: z._default(
      z
        .string({
          error: () => formValidation.roleRequired.value,
        })
        .check(z.minLength(1, { error: formValidation.roleRequired.value })),
      'user'
    ),
    lang: z._default(
      z
        .string({
          error: () => formValidation.langRequired.value,
        })
        .check(z.minLength(1, { error: formValidation.langRequired.value })),
      'en'
    ),
    organizationIds: z._default(z.array(z.string()), []),
  });
};

export type UserEditFormData = z.infer<ReturnType<typeof useUserEditSchema>>;
