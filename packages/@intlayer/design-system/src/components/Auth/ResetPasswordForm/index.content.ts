import { t } from 'react-intlayer';

export const getResetPasswordContent = () => ({
  emailInput: {
    label: t({
      en: 'Email address',
      fr: 'Adresse e-mail',
      es: 'Dirección de correo electrónico',
    }),
    placeholder: t({
      en: 'Enter e-mail address',
      fr: 'Entrez votre adresse e-mail',
      es: 'Ingrese su dirección de correo electrónico',
    }),
  },
  sendRecoveryEmailButton: {
    text: t({
      en: 'Send recovery email',
      fr: 'Envoyer un e-mail de récupération',
      es: 'Enviar correo de recuperación',
    }),
    ariaLabel: t({
      en: 'Click to send recovery email',
      fr: 'Cliquez pour envoyer un e-mail de récupération',
      es: 'Haz clic para enviar correo de recuperación',
    }),
  },
  resendRecoveryEmailButton: {
    text: t({
      en: 'Resend recovery email',
      fr: 'Renvoyer l’e-mail de récupération',
      es: 'Reenviar correo de recuperación',
    }),
  },
  resendInText: t({
    en: 'Resend in',
    fr: 'Renvoyer dans',
    es: 'Reenviar en',
  }),
  backToLoginButton: {
    text: t({
      en: 'Back to login',
      fr: 'Retour à la connexion',
      es: 'Volver al inicio de sesión',
    }),
  },
});
