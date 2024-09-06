// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore react-intlayer not build yet
import { t } from 'react-intlayer';
import { z } from 'zod';

export const getSignUpSchema = () => {
  const requiredErrorEmail = t({
    en: 'Please enter your email address',
    fr: 'Veuillez saisir votre adresse e-mail',
    es: 'Por favor, ingrese su dirección de correo electrónico',
  });

  const invalidTypeErrorEmail = t({
    en: 'Please enter a valid email address',
    fr: 'Veuillez saisir une adresse e-mail valide',
    es: 'Por favor, ingrese una dirección de correo electrónico válida',
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

  const requiredErrorPasswordConfirmation = t({
    en: 'Please enter your password again',
    fr: 'Veuillez saisir votre mot de passe à nouveau',
    es: 'Por favor, ingrese su contraseña nuevamente',
  });

  const invalidTypeErrorPasswordConfirmation = t({
    en: 'Please enter a valid password',
    fr: 'Veuillez saisir un mot de passe valide',
    es: 'Por favor, ingrese una contraseña válida',
  });

  const passwordNotMatchError = t({
    en: 'Password and password confirmation must match',
    fr: 'Le mot de passe et la confirmation de mot de passe doivent correspondre',
    es: 'La contraseña y la confirmación de la contraseña deben coincidir',
  });

  return z
    .object({
      email: z
        .string({
          required_error: requiredErrorEmail,
          invalid_type_error: invalidTypeErrorEmail,
        })
        .min(1, { message: invalidTypeErrorEmail })
        .email({ message: invalidTypeErrorEmail }),
      password: z
        .string({
          required_error: requiredErrorPassword,
          invalid_type_error: invalidTypeErrorPassword,
        })
        .min(8, { message: invalidTypeErrorPassword }),
      passwordConfirmation: z
        .string({
          required_error: requiredErrorPasswordConfirmation,
          invalid_type_error: invalidTypeErrorPasswordConfirmation,
        })
        .min(8, { message: invalidTypeErrorPasswordConfirmation }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: passwordNotMatchError,
      path: ['passwordConfirmation'], // This specifies which field the error should be associated with
    });
};

export type SignUp = z.infer<ReturnType<typeof getSignUpSchema>>;
