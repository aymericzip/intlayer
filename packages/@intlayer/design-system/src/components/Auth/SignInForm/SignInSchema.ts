// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore react-intlayer not build yet
import { t } from 'react-intlayer';
import { z } from 'zod';

export const getSignInSchema = () => {
  const requiredErrorEmail = t({
    en: 'Please enter your username',
    fr: 'Veuillez saisir votre nom d’utilisateur',
    es: 'Por favor, ingrese su nombre de usuario',
  });

  const invalidTypeErrorEmail = t({
    en: 'Please enter a valid username',
    fr: 'Veuillez saisir un nom d’utilisateur valide',
    es: 'Por favor, ingrese un nombre de usuario válido',
  });

  const requiredErrorPassword = t({
    en: 'Please enter your password',
    fr: 'Veuillez saisir votre mot de passe',
    es: 'Por favor, ingrese su contraseña',
  });

  const invalidTypeErrorPassword = t({
    en: 'Please enter a valid password',
    fr: 'Veuillez saisir un mot de passe valide',
    es: 'Por favor, ingrese una contraseña válida',
  });

  return z.object({
    email: z
      .string({
        required_error: requiredErrorEmail,
        invalid_type_error: invalidTypeErrorEmail,
      })
      .min(1, { message: invalidTypeErrorEmail })
      .default(''),
    password: z
      .string({
        required_error: requiredErrorPassword,
        invalid_type_error: invalidTypeErrorPassword,
      })
      .min(1, { message: invalidTypeErrorPassword })
      .default(''),
  });
};
export type SignIn = z.infer<ReturnType<typeof getSignInSchema>>;
