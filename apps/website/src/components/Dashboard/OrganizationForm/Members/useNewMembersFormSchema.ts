import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useOrganizationNewMembersSchema = () => {
  const { emailError } = useIntlayer(
    'new-members-form-schema',
    undefined,
    false
  );

  return z.object({
    userEmail: z.string().email({ message: emailError }),
  });
};

export type OrganizationNewMembersFormData = z.infer<
  ReturnType<typeof useOrganizationNewMembersSchema>
>;
