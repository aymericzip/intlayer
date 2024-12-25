import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useTagSchema = () => {
  const {
    requiredErrorKey,
    invalidTypeErrorKey,
    requiredErrorName,
    invalidTypeErrorName,
    requiredErrorDescription,
    invalidTypeErrorDescription,
    requiredErrorInstructions,
    invalidTypeErrorInstructions,
  } = useIntlayer('tag-form-schema', undefined, false);

  return z.object({
    key: z
      .string({
        required_error: requiredErrorKey,
        invalid_type_error: invalidTypeErrorKey,
      })
      .min(1, { message: invalidTypeErrorKey })
      .max(20, { message: invalidTypeErrorKey }),

    name: z
      .string({
        required_error: requiredErrorName,
        invalid_type_error: invalidTypeErrorName,
      })
      .min(1, { message: invalidTypeErrorName })
      .max(50, { message: invalidTypeErrorName })
      .optional(),

    description: z
      .string({
        required_error: requiredErrorDescription,
        invalid_type_error: invalidTypeErrorDescription,
      })
      .min(1, { message: invalidTypeErrorDescription })
      .max(500, { message: invalidTypeErrorDescription })
      .optional(),

    instructions: z
      .string({
        required_error: requiredErrorInstructions,
        invalid_type_error: invalidTypeErrorInstructions,
      })
      .min(1, { message: invalidTypeErrorInstructions })
      .max(500, { message: invalidTypeErrorInstructions })
      .optional(),
  });
};

export type TagFormData = z.infer<ReturnType<typeof useTagSchema>>;
