import { type Dictionary, insert, t } from 'intlayer';

const frameworkPageContent = {
  key: 'framework-page',
  content: {
    backHome: t({
      en: '← Back to home',
      es: '← Volver al inicio',
      fr: "← Retour à l'accueil",
    }),
    counterLabel: t({
      en: 'Count: {{count}}',
      es: 'Contador: {{count}}',
      fr: 'Compteur : {{count}}',
    }),
    currentLocale: t({
      en: 'Current locale',
      es: 'Idioma actual',
      fr: 'Langue actuelle',
    }),
    demoTitle: t({
      en: 'Live demo',
      es: 'Demostración en vivo',
      fr: 'Démonstration en direct',
    }),
    greeting: t({
      en: 'Hello, World!',
      es: '¡Hola, Mundo!',
      fr: 'Bonjour, le monde !',
    }),
    increment: t({
      en: 'Increment',
      es: 'Incrementar',
      fr: 'Incrémenter',
    }),
    metadata: {
      description: insert(
        t({
          en: 'See how Intlayer works with {{framework}} in an Astro island.',
          es: 'Mira cómo Intlayer funciona con {{framework}} en una isla de Astro.',
          fr: 'Découvrez comment Intlayer fonctionne avec {{framework}} dans une île Astro.',
        })
      ),
      keywords: t({
        en: ['Astro', 'Intlayer', 'i18n', 'Framework', 'Demo'],
        es: ['Astro', 'Intlayer', 'i18n', 'Framework', 'Demo'],
        fr: ['Astro', 'Intlayer', 'i18n', 'Framework', 'Démo'],
      }),
      title: insert(
        t({
          en: '{{framework}} Demo | Astro + Intlayer',
          es: 'Demo de {{framework}} | Astro + Intlayer',
          fr: 'Démo {{framework}} | Astro + Intlayer',
        })
      ),
    },
    switchLocale: t({
      en: 'Switch locale:',
      es: 'Cambiar idioma:',
      fr: 'Changer de langue :',
    }),
  },
} satisfies Dictionary;

export default frameworkPageContent;
