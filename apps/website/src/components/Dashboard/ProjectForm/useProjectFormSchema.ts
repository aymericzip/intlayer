import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useProjectSchema = () => {
  const { requiredErrorName, invalidTypeErrorName } = useIntlayer(
    'project-form-schema'
  );

  return z.object({
    name: z
      .string({
        required_error: requiredErrorName.value,
        invalid_type_error: invalidTypeErrorName.value,
      })
      .min(1, { message: invalidTypeErrorName.value }),
  });
};

export type ProjectFormData = z.infer<ReturnType<typeof useProjectSchema>>;
