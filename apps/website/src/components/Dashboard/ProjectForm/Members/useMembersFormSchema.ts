import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useProjectMembersSchema = () => {
  const { schema } = useIntlayer('project-members-form');

  return z.object({
    membersIds: z
      .array(z.string())
      .min(1, { error: schema.requiredErrorMember.value }),
    adminsIds: z
      .array(z.string())
      .min(1, { error: schema.requiredErrorAdmin.value }),
  });
};

export type ProjectMembersFormData = z.infer<
  ReturnType<typeof useProjectMembersSchema>
>;
