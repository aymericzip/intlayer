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

  return z.object({
    name: z
      .string({
        required_error: requiredErrorName,
        invalid_type_error: invalidTypeErrorName,
      })
      .min(1, { message: invalidTypeErrorName })
      .default(''),
  });
};

export type AccessKeyFormCreationData = z.infer<
  ReturnType<typeof getAccessKeyCreationSchema>
>;
