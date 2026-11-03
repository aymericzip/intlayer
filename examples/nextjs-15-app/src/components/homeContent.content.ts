import { type Dictionary, md, t } from 'intlayer';

const homeContent = {
  key: 'home-content',
  importMode: 'fetch',
  content: {
    deployNow: t({
      en: 'Deploy Now',
      es: 'Desplegar ahora',
      fr: 'Déployez maintenant',
    }),
    examples: t({ en: 'Examples', es: 'Ejemplos', fr: 'Exemples' }),
    getStartedByEditing: t({
      en: 'Get started by editing',
      es: 'Comience por editar',
      fr: 'Commencez par éditer',
    }),
    goToNextjs: t({
      en: 'Go to Next.js',
      es: 'Ir a Next.js',
      fr: 'Accéder à Next.js',
    }),
    learn: t({ en: 'Learn', es: 'Aprender', fr: 'En savoir plus' }),
    markdownContent: md(
      'Simple paragraph. **Hello world**\n- **Bold text**\n- _Italic text_\n- ~~Strikethrough text~~\n- [Link](https://www.google.com)'
    ),
    readOurDocs: t({
      en: 'Read our Docs',
      es: 'Lea nuestra documentación',
      fr: 'Lisez notre documentation',
    }),
    saveAndSeeChanges: t({
      en: 'Save and see your changes.',
      es: 'Guarde y vea sus cambios.',
      fr: 'Enregistrez et voyez vos modifications.',
    }),
  },
} satisfies Dictionary;

export default homeContent;
