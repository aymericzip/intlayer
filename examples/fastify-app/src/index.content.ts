import { type Dictionary, t } from 'intlayer';

const indexContent = {
  key: 'index',
  content: {
    exampleOfContent: t({
      en: 'Example of returned error content in English',
      'es-ES': 'Ejemplo de contenido de error devuelto en español (España)',
      'es-MX': 'Ejemplo de contenido de error devuelto en español (México)',
      fr: "Exemple de contenu d'erreur renvoyé en français",
    }),
  },
} satisfies Dictionary;

export default indexContent;
