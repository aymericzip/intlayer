import router from '@adonisjs/core/services/router';
import { getDictionary, getIntlayer, t } from 'adonis-intlayer';
import indexContent from '../app/index.content.js';

router.get('/t_example', async () => {
  return t({
    en: 'Example of returned content in English',
    fr: 'Exemple de contenu renvoyé en français',
    'es-ES': 'Ejemplo de contenido devuelto en español (España)',
    'es-MX': 'Ejemplo de contenido devuelto en español (México)',
  });
});

router.get('/getIntlayer_example', async () => {
  return getIntlayer('index').exampleOfContent;
});

router.get('/getDictionary_example', async () => {
  return getDictionary(indexContent).exampleOfContent;
});

router.get('/welcome', async () => {
  return getIntlayer('index').welcome;
});

router.get('/info', async () => {
  const content = getIntlayer('index');
  return {
    description: content.description,
    functions: {
      title: content.functionsTitle,
      description: content.functionsDescription,
    },
  };
});
