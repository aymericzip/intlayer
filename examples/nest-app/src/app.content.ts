import { type Dictionary, t } from 'intlayer';

const appContent: Dictionary = {
  key: 'app',
  content: {
    greet: t({
      en: 'Hello World!',
      fr: 'Bonjour le monde !',
      es: '¡Hola Mundo!',
    }),
  },
};

export default appContent;
