import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

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
      .check(z.minLength(1, { error: invalidTypeErrorName.value })),
  });
};

export type ProjectFormData = z.infer<ReturnType<typeof useProjectSchema>>;
