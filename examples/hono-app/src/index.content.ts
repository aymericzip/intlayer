import { type Dictionary, t } from 'intlayer';

const indexContent = {
  key: 'index',
  content: {
    exampleOfContent: t({
      en: 'Example of returned content in English',
      'es-ES': 'Ejemplo de contenido devuelto en español (España)',
      'es-MX': 'Ejemplo de contenido devuelto en español (México)',
      fr: 'Exemple de contenu renvoyé en français',
    }),
  },
} satisfies Dictionary;

export default indexContent;
