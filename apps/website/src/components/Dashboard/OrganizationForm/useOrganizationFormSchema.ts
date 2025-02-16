import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useOrganizationSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'organization-form-schema'
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

export type OrganizationFormData = z.infer<
  ReturnType<typeof useOrganizationSchema>
>;
