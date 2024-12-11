import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useAccessKeyCreationSchema = () => {
  const { requiredErrorName, invalidTypeErrorName, invalidDateErrorName } =
    useIntlayer('access-key-creation-form-schema', undefined, false);

  return z.object({
    name: z
      .string({
        required_error: requiredErrorName,
        invalid_type_error: invalidTypeErrorName,
      })
      .min(1, { message: invalidTypeErrorName })
      .default(''),
    expiresAt: z
      .string()
      .refine(
        (value) =>
          value
            ? new Date(value).toISOString() > new Date().toISOString()
            : true,
        {
          message: invalidDateErrorName,
        }
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
