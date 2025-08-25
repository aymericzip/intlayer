import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/v4';

export const useDictionarySchema = (projectId: string) => {
  const {
    requiredErrorName,
    invalidTypeErrorName,
    requiredErrorProjectId,
    invalidTypeErrorProjectId,
  } = useIntlayer('dictionary-form-schema');

  return z.object({
    key: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorName.value
            : invalidTypeErrorName.value,
      })
      .min(1, { error: invalidTypeErrorName.value })
      .default(''),
    projectIds: z
      .array(
        z.string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorProjectId.value
              : invalidTypeErrorProjectId.value,
        })
      )
      .default([projectId]),
  });
};

export type DictionaryFormData = z.infer<
  ReturnType<typeof useDictionarySchema>
>;
