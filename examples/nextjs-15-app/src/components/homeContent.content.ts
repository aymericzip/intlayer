import { t, type Dictionary } from 'intlayer';

const homeContent = {
  key: 'home-content',
  live: true,
  content: {
    getStartedByEditing: t({
      en: 'Get started by editing',
      fr: 'Commencez par éditer',
      es: 'Comience por editar',
    }),
    saveAndSeeChanges: t({
      en: 'Save and see your changes.',
      fr: 'Enregistrez et voyez vos modifications.',
      es: 'Guarde y vea sus cambios.',
    }),
    deployNow: t({
      en: 'Deploy Now',
      fr: 'Déployez maintenant',
      es: 'Desplegar ahora',
    }),
    readOurDocs: t({
      en: 'Read our Docs',
      fr: 'Lisez notre documentation',
      es: 'Lea nuestra documentación',
    }),
    learn: t({ en: 'Learn', fr: 'En savoir plus', es: 'Aprender' }),
    examples: t({ en: 'Examples', fr: 'Exemples', es: 'Ejemplos' }),
    goToNextjs: t({
      en: 'Go to Next.js',
      fr: 'Accéder à Next.js',
      es: 'Ir a Next.js',
    }),
  },
} satisfies Dictionary;

export default homeContent;
