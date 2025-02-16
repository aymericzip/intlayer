import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useOrganizationMembersSchema = () => {
  const { requiredErrorMember, requiredErrorAdmin } = useIntlayer(
    'members-form-schema'
  );

  return z.object({
    membersIds: z.array(z.string()).min(1, { message: requiredErrorMember }),
    adminsIds: z.array(z.string()).min(1, { message: requiredErrorAdmin }),
  });
};

export type OrganizationMembersFormData = z.infer<
  ReturnType<typeof useOrganizationMembersSchema>
>;
