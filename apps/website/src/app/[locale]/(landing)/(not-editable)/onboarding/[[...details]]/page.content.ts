import { t, type DeclarationContent } from 'intlayer';

const resetPasswordContent = {
  key: 'onboard-page',
  content: {
    title: t({
      en: 'Onboarding',
      fr: 'Configurer votre compte',
      es: 'Configurar tu cuenta',
    }),

    description: t({
      en: 'Set up your Intlayer account by following the instructions.',
      fr: 'Suivez les instructions pour configurer votre compte Intlayer.',
      es: 'Sigue las instrucciones para configurar tu cuenta de Intlayer.',
    }),
  },
} satisfies DeclarationContent;

export default resetPasswordContent;
