import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useOrganizationSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'organization-form-schema'
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
        .check(z.minLength(1, { error: invalidTypeErrorName.value })),
      ''
    ),
  });
};

export type OrganizationFormData = z.infer<
  ReturnType<typeof useOrganizationSchema>
>;
