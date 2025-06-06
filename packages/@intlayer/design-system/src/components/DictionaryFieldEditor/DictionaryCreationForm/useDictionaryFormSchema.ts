import { useDictionary } from 'react-intlayer';
import { z } from 'zod/v4';
import { dictionaryFormSchemaContent } from './useDictionaryFormSchema.content';

export const useDictionarySchema = (projectId: string) => {
  const {
    requiredErrorName,
    invalidTypeErrorName,
    requiredErrorProjectId,
    invalidTypeErrorProjectId,
  } = useDictionary(dictionaryFormSchemaContent);

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
