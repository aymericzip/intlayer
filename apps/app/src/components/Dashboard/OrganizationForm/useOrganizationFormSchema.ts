import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useOrganizationSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'organization-form-schema'
  );

  return z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorName.value
            : invalidTypeErrorName.value,
      })
      .min(1, { error: invalidTypeErrorName.value })
      .default(''),
  });
};

export type OrganizationFormData = z.infer<
  ReturnType<typeof useOrganizationSchema>
>;
