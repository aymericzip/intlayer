import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useSetUpOrganizationSchema = () => {
  const { requiredErrorOrganizationId } = useIntlayer(
    'set-up-organization-schema'
  );

  return z.object({
    organizationId: z.string({
      error: (issue) =>
        issue.input === undefined
          ? requiredErrorOrganizationId.value
          : requiredErrorOrganizationId.value,
    }),
  });
};

export type SetUpOrganization = z.infer<
  ReturnType<typeof useSetUpOrganizationSchema>
>;
