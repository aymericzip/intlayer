import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useSetUpOrganizationSchema = () => {
  const { requiredErrorOrganizationId } = useIntlayer(
    'set-up-organization-schema',
    undefined,
    false
  );

  return z.object({
    organizationId: z.string({
      required_error: requiredErrorOrganizationId,
      invalid_type_error: requiredErrorOrganizationId,
    }),
  });
};

export type SetUpOrganization = z.infer<
  ReturnType<typeof useSetUpOrganizationSchema>
>;
