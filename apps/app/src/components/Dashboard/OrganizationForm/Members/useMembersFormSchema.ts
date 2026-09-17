import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useOrganizationMembersSchema = () => {
  const { requiredErrorMember, requiredErrorAdmin } = useIntlayer(
    'members-form-schema'
  );

  return z.object({
    membersIds: z
      .array(z.string())
      .check(z.minLength(1, { error: requiredErrorMember.value })),
    adminsIds: z
      .array(z.string())
      .check(z.minLength(1, { error: requiredErrorAdmin.value })),
  });
};

export type OrganizationMembersFormData = z.infer<
  ReturnType<typeof useOrganizationMembersSchema>
>;
