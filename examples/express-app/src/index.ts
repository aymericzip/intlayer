import express, { type Express } from 'express';
import { intlayer, t } from 'express-intlayer';

const app: Express = express();

// Load internationalization request handler
app.use(intlayer());

// Liveness check
app.get('/', (_req, res) => {
  res.send(
    t({
      en: 'Example of returned content in English',
      fr: 'Exemple de contenu renvoyé en français',
      'es-ES': 'Ejemplo de contenido devuelto en español (España)',
      'es-MX': 'Ejemplo de contenido devuelto en español (México)',
    })
  );
});

// Liveness check
app.get('/error', (_req, res) => {
  res.status(500).send(
    t({
      en: 'Example of returned error content in English',
      fr: "Exemple de contenu d'erreur renvoyé en français",
      'es-ES': 'Ejemplo de contenido de error devuelto en español (España)',
      'es-MX': 'Ejemplo de contenido de error devuelto en español (México)',
    })
  );
});

// Server
app.listen(3000, () => console.log(`Listening on port ${3000}`));
