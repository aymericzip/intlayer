import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useOrganizationMembersSchema = () => {
  const { requiredErrorMember, requiredErrorAdmin } = useIntlayer(
    'members-form-schema'
  );

  return z.object({
    membersIds: z
      .array(z.string())
      .min(1, { error: requiredErrorMember.value }),
    adminsIds: z.array(z.string()).min(1, { error: requiredErrorAdmin.value }),
  });
};

export type OrganizationMembersFormData = z.infer<
  ReturnType<typeof useOrganizationMembersSchema>
>;
