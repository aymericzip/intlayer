import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { getDictionary, getIntlayer, intlayer, t } from 'hono-intlayer';
import dictionaryExample from './index.content';

const app = new Hono();

// Load internationalization request handler
app.use('*', intlayer());

// Routes
app.get('/', (c) => {
  return c.text(
    t({
      en: 'Example of returned content in English',
      fr: 'Exemple de contenu renvoyé en français',
      'es-ES': 'Ejemplo de contenido devuelto en español (España)',
      'es-MX': 'Ejemplo de contenido devuelto en español (México)',
    })
  );
});

app.get('/getIntlayer', (c) => {
  return c.json(getIntlayer('index').exampleOfContent);
});

app.get('/getDictionary', (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

app.get('/error', (c) => {
  return c.text(
    t({
      en: 'Example of returned error content in English',
      fr: "Exemple de contenu d'erreur renvoyé en français",
      'es-ES': 'Ejemplo de contenido de error devuelto en español (España)',
      'es-MX': 'Ejemplo de contenido de error devuelto en español (México)',
    }),
    500
  );
});

// Server
serve({
  fetch: app.fetch,
  port: 3000,
});

console.log('Listening on port 3000');
