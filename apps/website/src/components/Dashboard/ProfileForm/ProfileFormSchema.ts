import { t } from 'next-intlayer';
import { z } from 'zod';

export const getSignInSchema = () => {
  const requiredErrorName = t({
    en: 'Please enter your name',
    fr: 'Veuillez saisir votre nom d’utilisateur',
    es: 'Por favor, ingrese su nombre de usuario',
  });

  const invalidTypeErrorName = t({
    en: 'Please enter a valid username',
    fr: 'Veuillez saisir un nom d’utilisateur valide',
    es: 'Por favor, ingrese un nombre de usuario válido',
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
export type ProfileFormData = z.infer<ReturnType<typeof getSignInSchema>>;
