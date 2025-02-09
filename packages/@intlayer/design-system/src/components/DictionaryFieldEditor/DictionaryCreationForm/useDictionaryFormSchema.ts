import { useDictionary } from 'react-intlayer';
import { z } from 'zod';
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
        required_error: requiredErrorName.value,
        invalid_type_error: invalidTypeErrorName.value,
      })
      .min(1, { message: invalidTypeErrorName.value })
      .default(''),
    projectIds: z
      .array(
        z.string({
          required_error: requiredErrorProjectId.value,
          invalid_type_error: invalidTypeErrorProjectId.value,
        })
      )
      .default([projectId]),
  });
};

export type DictionaryFormData = z.infer<
  ReturnType<typeof useDictionarySchema>
>;
