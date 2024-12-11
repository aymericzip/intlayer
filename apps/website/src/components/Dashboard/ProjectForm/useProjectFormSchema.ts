import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useProjectSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'project-form-schema',
    undefined,
    false
  );

  return z.object({
    name: z
      .string({
        required_error: requiredErrorName,
        invalid_type_error: invalidTypeErrorName,
      })
      .min(1, { message: invalidTypeErrorName })
      .default(''),
  });
};

export type ProjectFormData = z.infer<ReturnType<typeof useProjectSchema>>;
