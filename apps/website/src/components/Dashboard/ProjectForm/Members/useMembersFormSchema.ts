import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useProjectMembersSchema = () => {
  const { schema } = useIntlayer('project-members-form', undefined, false);

  return z.object({
    membersIds: z
      .array(z.string())
      .min(1, { message: schema.requiredErrorMember }),
    adminsIds: z
      .array(z.string())
      .min(1, { message: schema.requiredErrorAdmin }),
  });
};

export type ProjectMembersFormData = z.infer<
  ReturnType<typeof useProjectMembersSchema>
>;
