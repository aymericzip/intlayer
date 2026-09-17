import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useOrganizationNewMembersSchema = () => {
  const { emailError } = useIntlayer('new-members-form-schema');

  return z.object({
    userEmail: z.email({ error: emailError.value }),
  });
};

export type OrganizationNewMembersFormData = z.infer<
  ReturnType<typeof useOrganizationNewMembersSchema>
>;
