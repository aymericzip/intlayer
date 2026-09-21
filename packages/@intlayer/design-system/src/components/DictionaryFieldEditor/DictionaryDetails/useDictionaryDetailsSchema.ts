import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

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
    title: z.optional(
      z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? titleRequiredError.value
              : titleInvalidTypeError.value,
        })
        .check(
          z.refine((val) => val.length === 0 || val.length >= 4, {
            error: titleMinLengthError.value,
          })
        )
    ),
    key: z._default(
      z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? keyRequiredError.value
              : keyInvalidTypeError.value,
        })
        .check(
          z.minLength(4, { error: keyMinLengthError.value }),
          z.regex(/^[a-zA-Z0-9-_]+$/, { error: keySpaceError.value })
        ),
      ''
    ),
    description: z.optional(
      z.string({
        error: (issue) =>
          issue.input === undefined
            ? descriptionRequiredError.value
            : descriptionInvalidTypeError.value,
      })
    ),
    projectIds: z._default(
      z.array(
        z.string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorProjectId.value
              : invalidTypeErrorProjectId.value,
        })
      ),
      [projectId]
    ),
    tags: z._default(
      z.array(
        z.string({
          error: () => invalidTypeErrorTags.value,
        })
      ),
      []
    ),
    location: z.optional(
      z.enum(['local', 'remote', 'hybrid', 'plugin'], {
        error: (issue) =>
          issue.input === undefined
            ? locationRequiredError.value
            : locationInvalidTypeError.value,
      })
    ),
    importMode: z.optional(z.enum(['static', 'dynamic', 'fetch'])),
    filePath: z.optional(
      z.string({
        error: (issue) =>
          issue.input === undefined
            ? filePathRequiredError.value
            : filePathInvalidTypeError.value,
      })
    ),
  });
};

export type DictionaryDetailsFormData = z.infer<
  ReturnType<typeof useDictionaryDetailsSchema>
>;
