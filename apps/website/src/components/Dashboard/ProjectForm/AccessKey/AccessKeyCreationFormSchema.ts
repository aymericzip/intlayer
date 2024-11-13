import { t } from 'next-intlayer';
import { z } from 'zod';

export const getAccessKeyCreationSchema = () => {
  const requiredErrorName = t({
    en: 'Please enter a name for your access key',
    fr: "Veuillez saisir un nom pour votre clé d'accès",
    es: 'Por favor, ingrese un nombre para su clave de acceso',
  });

  const invalidTypeErrorName = t({
    en: 'Please enter a valid name for your access key',
    fr: "Veuillez saisir un nom valide pour votre clé d'accès",
    es: 'Por favor, ingrese un nombre válido para su clave de acceso',
  });

  const invalidDateErrorName = t({
    en: 'Please enter a valid date for your access key expiration date',
    fr: "Veuillez saisir une date valide pour la date d'expiration de votre clé d'accès",
    es: 'Por favor, ingrese una fecha válida para la fecha de expiración de su clave de acceso',
  });

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
  ReturnType<typeof getAccessKeyCreationSchema>
>;
