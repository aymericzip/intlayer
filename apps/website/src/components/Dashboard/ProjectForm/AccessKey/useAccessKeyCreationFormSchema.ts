import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useAccessKeyCreationSchema = () => {
  const { requiredErrorName, invalidTypeErrorName, invalidDateErrorName } =
    useIntlayer('access-key-creation-form-schema');

  return z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorName.value
            : invalidTypeErrorName.value,
      })
      .min(1, invalidTypeErrorName.value)
      .default(''),
    expiresAt: z
      .string()
      .refine(
        (value) =>
          value
            ? new Date(value).toISOString() > new Date().toISOString()
            : true,
        invalidDateErrorName.value
      )
      .optional(),
    rights: z.object({
      organization: z.object({
        read: z.boolean().default(true),
        write: z.boolean().default(false),
        admin: z.boolean().default(false),
      }),
      project: z.object({
        read: z.boolean().default(true),
        write: z.boolean().default(false),
        admin: z.boolean().default(false),
      }),
      dictionary: z.object({
        read: z.boolean().default(true),
        write: z.boolean().default(false),
        admin: z.boolean().default(false),
      }),
    }),
  });
};

export type AccessKeyFormCreationData = z.infer<
  ReturnType<typeof useAccessKeyCreationSchema>
>;
