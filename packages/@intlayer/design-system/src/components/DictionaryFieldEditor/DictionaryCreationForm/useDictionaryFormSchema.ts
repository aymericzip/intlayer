import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/v4';

export const QUALIFIER_TYPES = ['none', 'item', 'variant', 'meta'] as const;
export type QualifierType = (typeof QUALIFIER_TYPES)[number];

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
    qualifierType: z.enum(QUALIFIER_TYPES).default('none'),
    item: z.coerce.number().int().positive().optional(),
    variant: z.string().optional(),
    metaId: z.string().optional(),
  });
};

export type DictionaryFormData = z.infer<
  ReturnType<typeof useDictionarySchema>
>;
