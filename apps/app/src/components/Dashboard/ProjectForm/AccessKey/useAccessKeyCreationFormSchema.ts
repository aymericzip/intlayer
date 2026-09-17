import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useAccessKeyCreationSchema = (permissions: string[] = []) => {
  const { requiredErrorName, invalidTypeErrorName, invalidDateErrorName } =
    useIntlayer('access-key-creation-form-schema');

  return z.object({
    name: z._default(
      z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorName.value
              : invalidTypeErrorName.value,
        })
        .check(z.minLength(1, invalidTypeErrorName.value)),
      ''
    ),
    expiresAt: z.optional(
      z
        .string()
        .check(
          z.refine(
            (value) =>
              value
                ? new Date(value).toISOString() > new Date().toISOString()
                : true,
            invalidDateErrorName.value
          )
        )
    ),
    grants: z.object(
      Object.fromEntries(
        permissions.map((permission) => [
          permission,
          z._default(z.boolean(), false),
        ])
      )
    ),
  });
};

export type AccessKeyFormCreationData = z.infer<
  ReturnType<typeof useAccessKeyCreationSchema>
>;
