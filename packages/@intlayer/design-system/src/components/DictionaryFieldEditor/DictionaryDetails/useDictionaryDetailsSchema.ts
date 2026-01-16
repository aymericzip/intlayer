import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/v4';

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
    locationRequiredError,
    locationInvalidTypeError,
    filePathRequiredError,
    filePathInvalidTypeError,
  } = useIntlayer('dictionary-detail-schema');

  return z.object({
    title: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? titleRequiredError.value
            : titleInvalidTypeError.value,
      })
      // Can be length of 0 or > 4
      .refine((val) => val.length === 0 || val.length >= 4, {
        error: titleMinLengthError.value,
      })
      .optional(),
    key: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? keyRequiredError.value
            : keyInvalidTypeError.value,
      })
      .min(4, { error: keyMinLengthError.value })
      /**
       * Valid :
       * my-key
       * my_key
       *
       * Invalid :
       * my key
       * my.key
       */
      .regex(/^[a-zA-Z0-9-_]+$/, { error: keySpaceError.value })
      .default(''),
    description: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? descriptionRequiredError.value
            : descriptionInvalidTypeError.value,
      })
      .optional(),
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
    tags: z
      .array(
        z.string({
          error: () => invalidTypeErrorTags.value,
        })
      )
      .default([]),
    location: z
      .enum(['local', 'remote', 'local&remote', 'plugin'], {
        error: (issue) =>
          issue.input === undefined
            ? locationRequiredError.value
            : locationInvalidTypeError.value,
      })
      .optional(),
    filePath: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? filePathRequiredError.value
            : filePathInvalidTypeError.value,
      })
      .optional(),
  });
};

export type DictionaryDetailsFormData = z.infer<
  ReturnType<typeof useDictionaryDetailsSchema>
>;
