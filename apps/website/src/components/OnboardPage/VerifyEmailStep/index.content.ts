import { type DeclarationContent, t } from 'intlayer';

export const verifyEmailStepContent = {
  key: 'verify-email-step',
  content: {
    verifyEmail: {
      title: t({
        en: 'Verify your email',
        fr: 'Vérifiez votre adresse e-mail',
        es: 'Verifique su correo electrónico',
      }),
      description: t({
        en: 'We sent you an email to verify your email address. Please check your inbox and click on the link to verify your email.',
        fr: 'Nous vous avons envoyé un e-mail pour vérifier votre adresse e-mail. Veuillez vérifier votre boîte de réception et cliquez sur le lien pour vérifier votre adresse e-mail.',
        es: 'Te hemos enviado un correo electrónico para verificar tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu dirección de correo electrónico.',
      }),
    },
    successToast: {
      title: t({
        en: 'Email verified successfully',
        fr: 'E-mail vérifié avec succès',
        es: 'Correo electrónico verificado con éxito',
      }),
      description: t({
        en: 'You can now sign in to your account.',
        fr: 'Vous pouvez maintenant vous connecter à votre compte.',
        es: 'Ahora puedes iniciar sesión en su cuenta.',
      }),
    },
  },
} satisfies DeclarationContent;

export default verifyEmailStepContent;
