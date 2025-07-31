import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useAccessKeyCreationSchema = (permissions: string[] = []) => {
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
    grants: z.object(
      Object.fromEntries(
        permissions.map((permission) => [
          permission,
          z.boolean().default(false),
        ])
      )
    ),
  });
};

export type AccessKeyFormCreationData = z.infer<
  ReturnType<typeof useAccessKeyCreationSchema>
>;
