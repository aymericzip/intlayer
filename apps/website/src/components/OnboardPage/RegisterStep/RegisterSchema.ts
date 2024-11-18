import { t } from 'next-intlayer';
import { z } from 'zod';

export const getRegisterSchema = () => {
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

  return z.object({
    email: z
      .string({
        required_error: requiredErrorEmail,
        invalid_type_error: invalidTypeErrorEmail,
      })
      .min(1, { message: invalidTypeErrorEmail })
      .email({ message: invalidTypeErrorEmail }),
  });
};

export type Register = z.infer<ReturnType<typeof getRegisterSchema>>;
