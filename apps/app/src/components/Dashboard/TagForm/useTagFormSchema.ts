import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

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
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorKey.value
            : invalidTypeErrorKey.value,
      })
      .min(1, { error: invalidTypeErrorKey.value })
      .max(20, { error: invalidTypeErrorKey.value }),

    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorName.value
            : invalidTypeErrorName.value,
      })
      .min(1, { error: invalidTypeErrorName.value })
      .max(50, { error: invalidTypeErrorName.value })
      .optional(),

    description: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorDescription.value
            : invalidTypeErrorDescription.value,
      })
      .min(1, { error: invalidTypeErrorDescription.value })
      .optional(),

    instructions: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorInstructions.value
            : invalidTypeErrorInstructions.value,
      })
      .min(1, { error: invalidTypeErrorInstructions.value })
      .optional(),
  });
};

export type TagFormData = z.infer<ReturnType<typeof useTagSchema>>;
