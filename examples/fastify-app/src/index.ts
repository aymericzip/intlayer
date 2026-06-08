import Fastify from 'fastify';
import { getDictionary, getIntlayer, intlayer, t } from 'fastify-intlayer';
import dictionaryExample from './index.content';

const fastify = Fastify({ logger: true });

// Load internationalization plugin
await fastify.register(intlayer);

// Liveness check
fastify.get('/', async (_req, _reply) => {
  return t({
    en: 'Example of returned content in English',
    fr: 'Exemple de contenu renvoyé en français',
    'es-ES': 'Ejemplo de contenido devuelto en español (España)',
    'es-MX': 'Ejemplo de contenido devuelto en español (México)',
  });
});

fastify.get('/getIntlayer', async (_req, _reply) => {
  return getIntlayer('index').exampleOfContent;
});

fastify.get('/getDictionary', async (_req, _reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Error example
fastify.get('/error', async (_req, reply) => {
  reply.status(500);
  return t({
    en: 'Example of returned error content in English',
    fr: "Exemple de contenu d'erreur renvoyé en français",
    'es-ES': 'Ejemplo de contenido de error devuelto en español (España)',
    'es-MX': 'Ejemplo de contenido de error devuelto en español (México)',
  });
});

// Server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Listening on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
