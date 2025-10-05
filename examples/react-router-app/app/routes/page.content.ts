import { type Dictionary, t } from 'intlayer';

const appContent = {
  content: {
    greeting: t({
      en: 'Hello World',
      es: 'Hola Mundo',
      fr: 'Bonjour le monde',
    }),
  },
  key: 'page',
} satisfies Dictionary;

export default appContent;
