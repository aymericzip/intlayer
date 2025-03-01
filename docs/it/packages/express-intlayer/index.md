# express-intlayer: Pacchetto JavaScript per internazionalizzare (i18n) un'applicazione Express.js

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, Next.js ed Express.js.

**Il pacchetto `express-intlayer`** consente di internazionalizzare la tua applicazione Express.js. Fornisce un middleware per rilevare la lingua preferita dell'utente e restituisce il dizionario appropriato per l'utente.

## Perché internazionalizzare il tuo backend?

Internazionalizzare il tuo backend è essenziale per servire efficacemente un pubblico globale. Permette alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ogni utente. Questa capacità migliora l'esperienza utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone di diversi background linguistici.

### Casi d'uso pratici

- **Visualizzare errori del backend nella lingua dell'utente**: Quando si verifica un errore, visualizzare i messaggi nella lingua madre dell'utente migliora la comprensione e riduce la frustrazione. Questo è particolarmente utile per messaggi di errore dinamici che potrebbero essere mostrati in componenti front-end come toast o modali.

- **Recuperare contenuti multilingue**: Per applicazioni che estraggono contenuti da un database, l'internazionalizzazione garantisce che tu possa fornire questi contenuti in più lingue. Questo è cruciale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che devono mostrare descrizioni di prodotti, articoli e altri contenuti nella lingua preferita dall'utente.

- **Inviare email multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, inviare email nella lingua del destinatario può aumentare significativamente il coinvolgimento e l'efficacia.

- **Notifiche push multilingue**: Per applicazioni mobili, inviare notifiche push nella lingua preferita dell'utente può migliorare l'interazione e la fidelizzazione. Questo tocco personale può rendere le notifiche più rilevanti e utili.

- **Altre comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, avvisi di sistema o aggiornamenti dell'interfaccia utente, beneficia dell'essere nella lingua dell'utente, garantendo chiarezza e migliorando l'esperienza utente complessiva.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali, ma si allinea meglio con le esigenze del mercato globale, rendendolo un passaggio chiave per scalare i tuoi servizi a livello mondiale.

## Perché integrare Intlayer?

- **Ambiente Type-Safe**: Sfrutta TypeScript per garantire che tutte le definizioni dei tuoi contenuti siano precise e prive di errori.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Configura Intlayer

Intlayer fornisce un file di configurazione per impostare il tuo progetto. Posiziona questo file nella radice del tuo progetto.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Esempio di utilizzo

Configura la tua applicazione Express per utilizzare `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Carica il gestore delle richieste di internazionalizzazione
app.use(intlayer());

// Rotte
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// Avvia il server
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Carica il gestore delle richieste di internazionalizzazione
app.use(intlayer());

// Rotte
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Avvia il server
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Carica il gestore delle richieste di internazionalizzazione
app.use(intlayer());

// Rotte
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Avvia il server
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Compatibilità

`express-intlayer` è completamente compatibile con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/index.md) per applicazioni React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/index.md) per applicazioni Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/vite-intlayer/index.md) per applicazioni Vite

Funziona anche perfettamente con qualsiasi soluzione di internazionalizzazione in vari ambienti, inclusi browser e richieste API. Puoi personalizzare il middleware per rilevare la lingua tramite header o cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Altre opzioni di configurazione
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Altre opzioni di configurazione
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Altre opzioni di configurazione
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Per impostazione predefinita, `express-intlayer` interpreterà l'header `Accept-Language` per determinare la lingua preferita del client.

## Funzioni fornite dal pacchetto `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/it-IT/packages/express-intlayer/t.md)
