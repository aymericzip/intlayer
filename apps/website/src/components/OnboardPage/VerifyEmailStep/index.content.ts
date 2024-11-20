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
  },
} satisfies DeclarationContent;

export default verifyEmailStepContent;
