import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useProjectSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'project-form-schema'
  );

  return z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorName.value
            : invalidTypeErrorName.value,
      })
      .min(1, { error: invalidTypeErrorName.value }),
  });
};

export type ProjectFormData = z.infer<ReturnType<typeof useProjectSchema>>;
