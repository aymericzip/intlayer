import { Elysia } from 'elysia';
import { getDictionary, getIntlayer, intlayer, t } from 'elysia-intlayer';
import dictionaryExample from './index.content';

const waitFor = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

/**
 * Example Elysia app exercising every `elysia-intlayer` entry point.
 */
export const app = new Elysia()
  // Load internationalization plugin
  .use(intlayer())
  // Localized error messages, rendered by an app-level error handler
  .onError(({ error }) => ({
    message: t({
      en: 'Something went wrong',
      fr: "Une erreur s'est produite",
      'es-ES': 'Algo salió mal (España)',
      'es-MX': 'Algo salió mal (México)',
    }),
    cause: error instanceof Error ? error.message : String(error),
  }))
  // Liveness check, standalone `t`
  .get('/', () =>
    t({
      en: 'Example of returned content in English',
      fr: 'Exemple de contenu renvoyé en français',
      'es-ES': 'Ejemplo de contenido devuelto en español (España)',
      'es-MX': 'Ejemplo de contenido devuelto en español (México)',
    })
  )
  // Context-bound helpers
  .get('/context', ({ intlayer }) => ({
    locale: intlayer.locale,
    localeStorage: intlayer.locale_storage ?? null,
    localeDetected: intlayer.locale_detected,
    greeting: intlayer.t({
      en: 'Hello',
      fr: 'Bonjour',
      'es-ES': 'Hola (España)',
      'es-MX': 'Hola (México)',
    }),
  }))
  // Standalone `t` after awaits, as in real controllers hitting a database
  .get('/after-await', async ({ query }) => {
    await waitFor(Number(query.delay ?? 10));
    await Promise.resolve();

    return t({
      en: 'Translated after await',
      fr: 'Traduit après await',
      'es-ES': 'Traducido después de await (España)',
      'es-MX': 'Traducido después de await (México)',
    });
  })
  // Streamed response, each chunk translated after an await
  .get('/stream', async function* () {
    for (let chunk = 0; chunk < 3; chunk++) {
      await waitFor(5);

      yield t({
        en: 'Chunk ',
        fr: 'Morceau ',
        'es-ES': 'Fragmento ',
        'es-MX': 'Fragmento ',
      });
    }
  })
  .get('/getIntlayer', () => getIntlayer('index').exampleOfContent)
  .get(
    '/getDictionary',
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  // Error example
  .get('/error', () => {
    throw new Error('Route failure');
  });
