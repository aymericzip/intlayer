import { t, type Dictionary } from 'intlayer';

const exampleContent = {
  key: 'example',
  autoFill: {
    es: '/messages/{{locale}}/{{key}}.content.cjs',
  },
  content: {
    new: t({
      en: 'This is an example of a new field--',
      fr: 'Voici un exemple de nouveau champ--',
      es: 'Este es un ejemplo de un nuevo campo--',
    }),
  },
} satisfies Dictionary;

export default exampleContent;
