import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useUserEditSchema = () => {
  const { formValidation } = useIntlayer('user-edit-form');

  return z.object({
    name: z
      .string({
        error: () => formValidation.nameRequired.value,
      })
      .min(1, { error: formValidation.nameRequired.value })
      .max(100, { error: formValidation.nameTooLong.value })
      .default(''),
    email: z
      .email({
        error: () => formValidation.emailInvalid.value,
      })
      .min(1, { error: formValidation.emailRequired.value })
      .default(''),
    role: z
      .string({
        error: () => formValidation.roleRequired.value,
      })
      .min(1, { error: formValidation.roleRequired.value })
      .default('user'),
    lang: z
      .string({
        error: () => formValidation.langRequired.value,
      })
      .min(1, { error: formValidation.langRequired.value })
      .default('en'),
    organizationIds: z.array(z.string()).default([]),
  });
};

export type UserEditFormData = z.infer<ReturnType<typeof useUserEditSchema>>;
