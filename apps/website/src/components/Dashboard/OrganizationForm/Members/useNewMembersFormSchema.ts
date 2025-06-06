import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useOrganizationNewMembersSchema = () => {
  const { emailError } = useIntlayer('new-members-form-schema');

  return z.object({
    userEmail: z.string().email({ error: emailError.value }),
  });
};

export type OrganizationNewMembersFormData = z.infer<
  ReturnType<typeof useOrganizationNewMembersSchema>
>;
