import { type Dictionary, t } from 'intlayer';

const indexContent = {
  key: 'index',
  content: {
    exampleOfContent: t({
      en: 'Example of returned content in English',
      fr: 'Exemple de contenu renvoyé en français',
      'es-ES': 'Ejemplo de contenido devuelto en español (España)',
      'es-MX': 'Ejemplo de contenido devuelto en español (México)',
    }),
  },
} satisfies Dictionary;

export default indexContent;
