import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const QUALIFIER_TYPES = ['none', 'item', 'variant'] as const;
export type QualifierType = (typeof QUALIFIER_TYPES)[number];

export const useDictionarySchema = (projectId: string) => {
  const {
    requiredErrorName,
    invalidTypeErrorName,
    requiredErrorProjectId,
    invalidTypeErrorProjectId,
  } = useIntlayer('dictionary-form-schema');

  return z.object({
    key: z._default(
      z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorName.value
              : invalidTypeErrorName.value,
        })
        .check(z.minLength(1, { error: invalidTypeErrorName.value })),
      ''
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
    qualifierType: z._default(z.enum(QUALIFIER_TYPES), 'none'),
    item: z.optional(z.coerce.number().check(z.int(), z.positive())),
    variant: z.optional(z.string()),
  });
};

export type DictionaryFormData = z.infer<
  ReturnType<typeof useDictionarySchema>
>;
