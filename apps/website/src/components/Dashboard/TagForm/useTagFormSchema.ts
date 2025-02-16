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
  } = useIntlayer('tag-form-schema');

  return z.object({
    key: z
      .string({
        required_error: requiredErrorKey.value,
        invalid_type_error: invalidTypeErrorKey.value,
      })
      .min(1, { message: invalidTypeErrorKey.value })
      .max(20, { message: invalidTypeErrorKey.value }),

    name: z
      .string({
        required_error: requiredErrorName.value,
        invalid_type_error: invalidTypeErrorName.value,
      })
      .min(1, { message: invalidTypeErrorName.value })
      .max(50, { message: invalidTypeErrorName.value })
      .optional(),

    description: z
      .string({
        required_error: requiredErrorDescription.value,
        invalid_type_error: invalidTypeErrorDescription.value,
      })
      .min(1, { message: invalidTypeErrorDescription.value })
      .optional(),

    instructions: z
      .string({
        required_error: requiredErrorInstructions.value,
        invalid_type_error: invalidTypeErrorInstructions.value,
      })
      .min(1, { message: invalidTypeErrorInstructions.value })
      .optional(),
  });
};

export type TagFormData = z.infer<ReturnType<typeof useTagSchema>>;
