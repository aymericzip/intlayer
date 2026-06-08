import { type Dictionary, md, t } from 'intlayer';

const homeContent = {
  key: 'home-content',
  importMode: 'fetch',
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
    markdownContent: md(
      'Simple paragraph. **Hello world**\n- **Bold text**\n- _Italic text_\n- ~~Strikethrough text~~\n- [Link](https://www.google.com)'
    ),
  },
} satisfies Dictionary;

export default homeContent;
