import { type Dictionary, insert, t } from 'intlayer';

const frameworkPageContent = {
  key: 'framework-page',
  content: {
    backHome: t({
      en: '← Back to home',
      fr: "← Retour à l'accueil",
      es: '← Volver al inicio',
    }),
    switchLocale: t({
      en: 'Switch locale:',
      fr: 'Changer de langue :',
      es: 'Cambiar idioma:',
    }),
    currentLocale: t({
      en: 'Current locale',
      fr: 'Langue actuelle',
      es: 'Idioma actual',
    }),
    demoTitle: t({
      en: 'Live demo',
      fr: 'Démonstration en direct',
      es: 'Demostración en vivo',
    }),
    greeting: t({
      en: 'Hello, World!',
      fr: 'Bonjour, le monde !',
      es: '¡Hola, Mundo!',
    }),
    counterLabel: t({
      en: 'Count: {{count}}',
      fr: 'Compteur : {{count}}',
      es: 'Contador: {{count}}',
    }),
    increment: t({
      en: 'Increment',
      fr: 'Incrémenter',
      es: 'Incrementar',
    }),
    metadata: {
      title: insert(
        t({
          en: '{{framework}} Demo | Astro + Intlayer',
          fr: 'Démo {{framework}} | Astro + Intlayer',
          es: 'Demo de {{framework}} | Astro + Intlayer',
        })
      ),
      description: insert(
        t({
          en: 'See how Intlayer works with {{framework}} in an Astro island.',
          fr: 'Découvrez comment Intlayer fonctionne avec {{framework}} dans une île Astro.',
          es: 'Mira cómo Intlayer funciona con {{framework}} en una isla de Astro.',
        })
      ),
      keywords: t({
        en: ['Astro', 'Intlayer', 'i18n', 'Framework', 'Demo'],
        fr: ['Astro', 'Intlayer', 'i18n', 'Framework', 'Démo'],
        es: ['Astro', 'Intlayer', 'i18n', 'Framework', 'Demo'],
      }),
    },
  },
} satisfies Dictionary;

export default frameworkPageContent;
