import { type DeclarationContent, t } from 'intlayer';

const definePasswordStepContent = {
  key: 'define-password-step',
  content: {
    title: t({
      en: 'Define a password',
      fr: 'Définissez un mot de passe',
      es: 'Defina una contraseña',
    }),
    currentPasswordInput: {
      label: t({
        en: 'Current password',
        fr: 'Mot de passe actuel',
        es: 'Contraseña actual',
      }),
      placeholder: t({
        en: 'Enter current password',
        fr: 'Entrez votre mot de passe actuel',
        es: 'Ingresa tu contraseña actual',
      }),
    },
    newPasswordInput: {
      label: t({
        en: 'Password',
        fr: 'Mot de passe',
        es: 'Contraseña',
      }),
      placeholder: t({
        en: 'Enter password',
        fr: 'Entrez un mot de passe',
        es: 'Ingresa una contraseña',
      }),
    },
    confirmPasswordInput: {
      label: t({
        en: 'Confirm password',
        fr: 'Confirmez le mot de passe',
        es: 'Confirma tu contraseña',
      }),
      placeholder: t({
        en: 'Confirm password',
        fr: 'Confirmez votre mot de passe',
        es: 'Confirma tu contraseña',
      }),
    },
    successToast: {
      title: t({
        en: 'Password defined successfully',
        fr: 'Mot de passe défini avec succès',
        es: 'Contraseña definida con éxito',
      }),
      description: t({
        en: 'You can now sign using this password.',
        fr: 'Vous pouvez maintenant vous connecter avec ce mot de passe.',
        es: 'Ahora puedes iniciar sesión con esta contraseña.',
      }),
    },
  },
} satisfies DeclarationContent;

export default definePasswordStepContent;
