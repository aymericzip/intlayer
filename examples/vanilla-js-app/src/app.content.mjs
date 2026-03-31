import { t } from 'intlayer';

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: 'app',
  content: {
    title: t({
      en: 'Hello from Vanilla JS + Intlayer!',
      fr: 'Bonjour depuis Vanilla JS + Intlayer !',
      es: '¡Hola desde Vanilla JS + Intlayer!',
    }),
    description: t({
      en: 'No bundler. Module resolution is handled entirely by the browser via an import map generated from the Intlayer configuration.',
      fr: 'Aucun bundler. La résolution des modules est entièrement gérée par le navigateur via une import map générée depuis la configuration Intlayer.',
      es: 'Sin empaquetador. La resolución de módulos es completamente manejada por el navegador mediante un mapa de importaciones generado desde la configuración de Intlayer.',
    }),
    langLabel: t({
      en: 'Language',
      fr: 'Langue',
      es: 'Idioma',
    }),
  },
};

export default appContent;
