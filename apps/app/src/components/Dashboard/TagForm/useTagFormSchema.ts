import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

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
      .check(
        z.minLength(1, { error: invalidTypeErrorKey.value }),
        z.maxLength(20, { error: invalidTypeErrorKey.value })
      ),

    name: z.optional(
      z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorName.value
              : invalidTypeErrorName.value,
        })
        .check(
          z.minLength(1, { error: invalidTypeErrorName.value }),
          z.maxLength(50, { error: invalidTypeErrorName.value })
        )
    ),

    description: z.optional(
      z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorDescription.value
              : invalidTypeErrorDescription.value,
        })
        .check(z.minLength(1, { error: invalidTypeErrorDescription.value }))
    ),

    instructions: z.optional(
      z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorInstructions.value
              : invalidTypeErrorInstructions.value,
        })
        .check(z.minLength(1, { error: invalidTypeErrorInstructions.value }))
    ),
  });
};

export type TagFormData = z.infer<ReturnType<typeof useTagSchema>>;
