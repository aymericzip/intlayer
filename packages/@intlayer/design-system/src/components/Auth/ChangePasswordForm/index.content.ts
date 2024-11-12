// @ts-ignore react-intlayer not build yet
// @ts-ignore react-intlayer not build yet
import { t } from 'react-intlayer';

export const getChangePasswordContent = () => ({
  currentPasswordInput: {
    label: t({
      en: 'Current password',
      fr: 'Mot de passe actuel',
      es: 'Contraseña actual',
    }),
    placeholder: t({
      en: 'Enter actual password',
      fr: 'Entrez votre mot de passe actuel',
      es: 'Ingresa tu contraseña actual',
    }),
  },
  newPasswordInput: {
    label: t({
      en: 'New password',
      fr: 'Nouveau mot de passe',
      es: 'Nueva contraseña',
    }),
    placeholder: t({
      en: 'Enter new password',
      fr: 'Entrez votre nouveau mot de passe',
      es: 'Ingresa tu nueva contraseña',
    }),
  },
  confirmPasswordInput: {
    label: t({
      en: 'Confirm new password',
      fr: 'Confirmez le nouveau mot de passe',
      es: 'Confirma tu nueva contraseña',
    }),
    placeholder: t({
      en: 'Confirm new password',
      fr: 'Confirmez votre nouveau mot de passe',
      es: 'Confirma tu nueva contraseña',
    }),
  },
  changePasswordButton: {
    text: t({
      en: 'Change password',
      fr: 'Changer le mot de passe',
      es: 'Cambiar la contraseña',
    }),
    ariaLabel: t({
      en: 'Click to change password',
      fr: 'Cliquez pour changer le mot de passe',
      es: 'Haz clic para cambiar la contraseña',
    }),
  },
  backToHomeButton: {
    text: t({
      en: 'Back to home page',
      fr: 'Retour à la page d’accueil',
      es: 'Volver a la página de inicio',
    }),
    ariaLabel: t({
      en: 'Click to go back to the home page',
      fr: 'Cliquez pour revenir à la page d’accueil',
      es: 'Haz clic para volver a la página de inicio',
    }),
  },
});
