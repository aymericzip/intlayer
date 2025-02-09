import { useDictionary } from 'react-intlayer';
import { z } from 'zod';
import { useDictionaryDetailsSchemaContent } from './useDictionaryDetailsSchema.content';

export const useDictionaryDetailsSchema = (projectId: string) => {
  const {
    titleRequiredError,
    titleInvalidTypeError,
    titleMinLengthError,
    keyRequiredError,
    keyInvalidTypeError,
    keySpaceError,
    keyMinLengthError,
    descriptionRequiredError,
    descriptionInvalidTypeError,
    requiredErrorProjectId,
    invalidTypeErrorProjectId,
    invalidTypeErrorTags,
  } = useDictionary(useDictionaryDetailsSchemaContent);

  return z.object({
    title: z
      .string({
        required_error: titleRequiredError.value,
        invalid_type_error: titleInvalidTypeError.value,
      })
      // Can be length of 0 or > 4
      .refine((val) => val.length === 0 || val.length >= 4, {
        message: titleMinLengthError.value,
      })
      .optional(),
    key: z
      .string({
        required_error: keyRequiredError.value,
        invalid_type_error: keyInvalidTypeError.value,
      })
      .min(4, { message: keyMinLengthError.value })
      /**
       * Valid :
       * my-key
       * my_key
       *
       * Invalid :
       * my key
       * my.key
       */
      .regex(/^[a-zA-Z0-9-_]+$/, { message: keySpaceError.value })
      .default(''),
    description: z
      .string({
        required_error: descriptionRequiredError.value,
        invalid_type_error: descriptionInvalidTypeError.value,
      })
      .optional(),
    projectIds: z
      .array(
        z.string({
          required_error: requiredErrorProjectId.value,
          invalid_type_error: invalidTypeErrorProjectId.value,
        })
      )
      .default([projectId]),
    tags: z
      .array(
        z.string({
          invalid_type_error: invalidTypeErrorTags.value,
        })
      )
      .default([]),
    publishedVersion: z.string().default('-1'),
  });
};

export type DictionaryDetailsFormData = z.infer<
  ReturnType<typeof useDictionaryDetailsSchema>
>;
