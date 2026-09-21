import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useProjectMembersSchema = () => {
  const { schema } = useIntlayer('project-members-form');

  return z.object({
    membersIds: z
      .array(z.string())
      .check(z.minLength(1, { error: schema.requiredErrorMember.value })),
    adminsIds: z
      .array(z.string())
      .check(z.minLength(1, { error: schema.requiredErrorAdmin.value })),
  });
};

export type ProjectMembersFormData = z.infer<
  ReturnType<typeof useProjectMembersSchema>
>;
