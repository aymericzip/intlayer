import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useOrganizationSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'organization-form-schema',
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

export type OrganizationFormData = z.infer<
  ReturnType<typeof useOrganizationSchema>
>;
