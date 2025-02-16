import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useSetUpOrganizationSchema = () => {
  const { requiredErrorOrganizationId } = useIntlayer(
    'set-up-organization-schema'
  );

  return z.object({
    organizationId: z.string({
      required_error: requiredErrorOrganizationId.value,
      invalid_type_error: requiredErrorOrganizationId.value,
    }),
  });
};

export type SetUpOrganization = z.infer<
  ReturnType<typeof useSetUpOrganizationSchema>
>;
