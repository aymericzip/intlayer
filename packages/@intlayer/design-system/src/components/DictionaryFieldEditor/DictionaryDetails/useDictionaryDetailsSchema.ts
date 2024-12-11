// @ts-ignore react-intlayer not build yet
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
  } = useDictionary(useDictionaryDetailsSchemaContent);

  return z.object({
    title: z
      .string({
        required_error: titleRequiredError,
        invalid_type_error: titleInvalidTypeError,
      })
      // Can be length of 0 or > 4
      .refine((val) => val.length === 0 || val.length >= 4, {
        message: titleMinLengthError,
      })
      .optional(),
    key: z
      .string({
        required_error: keyRequiredError,
        invalid_type_error: keyInvalidTypeError,
      })
      .min(4, { message: keyMinLengthError })
      /**
       * Valid :
       * my-key
       * my_key
       *
       * Invalid :
       * my key
       * my.key
       */
      .regex(/^[a-zA-Z0-9-_]+$/, { message: keySpaceError })
      .default(''),
    description: z
      .string({
        required_error: descriptionRequiredError,
        invalid_type_error: descriptionInvalidTypeError,
      })
      .optional(),
    projectIds: z
      .array(
        z.string({
          required_error: requiredErrorProjectId,
          invalid_type_error: invalidTypeErrorProjectId,
        })
      )
      .default([projectId]),
  });
};

export type DictionaryDetailsFormData = z.infer<
  ReturnType<typeof useDictionaryDetailsSchema>
>;
