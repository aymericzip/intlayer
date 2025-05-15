import { type Dictionary } from 'intlayer';

const exampleContent = {
  key: 'example',
  locale: 'es',
  autoFill: '/messages/{{locale}}/{{key}}.content.cjs',
  content: {
    new: 'Aquí un ejemplo de nuevo campo',
  },
} satisfies Dictionary;

export default exampleContent;
