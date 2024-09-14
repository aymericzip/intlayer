import { t, type DeclarationContent } from 'intlayer';

const resetPasswordContent: DeclarationContent = {
  id: 'reset-password-page',
  title: t({
    en: 'Reset password',
    fr: 'Réinitialiser le mot de passe',
    es: 'Restablecer contraseña',
  }),
  title2: t({
    en: 'Reset your password',
    fr: 'Réinitialisez votre mot de passe',
    es: 'Restablezca su contraseña',
  }),
  description: t({
    en: 'Enter your email to reset your password.',
    fr: 'Entrez votre adresse e-mail pour réinitialiser votre mot de passe.',
    es: 'Ingrese su correo electrónico para restablecer su contraseña.',
  }),
};

export default resetPasswordContent;
