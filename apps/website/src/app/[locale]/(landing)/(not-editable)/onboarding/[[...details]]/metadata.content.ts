import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'onboarding-metadata',
  content: {
    title: t({
      en: 'Onboarding | Intlayer',
      fr: 'Intégration | Intlayer',
      es: 'Incorporación | Intlayer',
    }),
    description: t({
      en: 'Get started with Intlayer by completing the onboarding process. Follow each step to set up your account efficiently.',
      fr: "Commencez avec Intlayer en complétant le processus d'intégration. Suivez chaque étape pour configurer votre compte efficacement.",
      es: 'Comienza con Intlayer completando el proceso de incorporación. Sigue cada paso para configurar tu cuenta de manera eficiente.',
    }),

    keywords: t<string[]>({
      en: [
        'Onboarding',
        'Account setup',
        'Intlayer',
        'React',
        'JavaScript',
        'User guide',
      ],
      fr: [
        'Intégration',
        'Configuration de compte',
        'Intlayer',
        'React',
        'JavaScript',
        'Guide utilisateur',
      ],
      es: [
        'Incorporación',
        'Configuración de cuenta',
        'Intlayer',
        'React',
        'JavaScript',
        'Guía del usuario',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
