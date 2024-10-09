import { t } from 'next-intlayer';
import { z } from 'zod';

export const getOrganizationSchema = () => {
  const requiredErrorName = t({
    en: 'Please enter a name for your organization',
    fr: 'Veuillez saisir un nom pour votre organisation',
    es: 'Por favor, ingrese un nombre para su organización',
  });

  const invalidTypeErrorName = t({
    en: 'Please enter a valid name for your organization',
    fr: 'Veuillez saisir un nom valide pour votre organisation',
    es: 'Por favor, ingrese un nombre válido para su organización',
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

export type OrganizationFormData = z.infer<
  ReturnType<typeof getOrganizationSchema>
>;
