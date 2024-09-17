// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore react-intlayer not build yet
import { t } from 'react-intlayer';
import { z } from 'zod';

export const getProjectSchema = () => {
  const requiredErrorName = t({
    en: 'Please enter a name for your project',
    fr: 'Veuillez saisir un nom pour votre organisation',
    es: 'Por favor, ingrese un nombre para su organización',
  });

  const invalidTypeErrorName = t({
    en: 'Please enter a valid name for your project',
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

export type ProjectFormData = z.infer<ReturnType<typeof getProjectSchema>>;
