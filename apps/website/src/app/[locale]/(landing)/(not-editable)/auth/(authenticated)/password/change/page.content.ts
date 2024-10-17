import { t, type DeclarationContent } from 'intlayer';

const changePasswordContent = {
  key: 'change-password-page',
  content: {
    title: t({
      en: 'Change password',
      fr: 'Changer de mot de passe',
      es: 'Cambiar contraseña',
    }),
    title2: t({
      en: 'Change your password',
      fr: 'Changer votre mot de passe',
      es: 'Cambiar su contraseña',
    }),
    description: t({
      en: 'Change your password to access your account.',
      fr: 'Changez votre mot de passe pour accéder à votre compte.',
      es: 'Cambie su contraseña para acceder a su cuenta.',
    }),
  },
} satisfies DeclarationContent;

export default changePasswordContent;
