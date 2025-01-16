# Iniziare a internazionalizzare (i18n) con Intlayer e Express

`express-intlayer` è un potente middleware per l'internazionalizzazione (i18n) per applicazioni Express, progettato per rendere i tuoi servizi backend globalmente accessibili fornendo risposte localizzate in base alle preferenze del cliente.

## Perché internazionalizzare il tuo backend?

Internazionalizzare il tuo backend è essenziale per servire efficacemente un pubblico globale. Consente alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ciascun utente. Questa capacità migliora l'esperienza dell'utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone provenienti da diversi contesti linguistici.

### Casi d'uso pratici

- **Visualizzazione degli errori del backend nella lingua dell'utente**: Quando si verifica un errore, visualizzare i messaggi nella lingua nativa dell'utente migliora la comprensione e riduce la frustrazione. Questo è particolarmente utile per i messaggi di errore dinamici che potrebbero essere mostrati in componenti frontend come toast o modali.

- **Recupero di contenuti multilingue**: Per le applicazioni che prelevano contenuti da un database, l'internazionalizzazione garantisce che tu possa servire questi contenuti in più lingue. Questo è cruciale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che devono visualizzare descrizioni dei prodotti, articoli e altri contenuti nella lingua preferita dall'utente.

- **Invio di email multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, inviare email nella lingua del destinatario può aumentare significativamente il coinvolgimento e l'efficacia.

- **Notifiche push multilingue**: Per le applicazioni mobili, inviare notifiche push nella lingua preferita dell'utente può migliorare l'interazione e la retention. Questo tocco personale può far sentire le notifiche più rilevanti e attuabili.

- **Altre comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, avvisi di sistema o aggiornamenti dell'interfaccia utente, beneficia del fatto di essere nella lingua dell'utente, garantendo chiarezza e migliorando l'esperienza complessiva dell'utente.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali, ma si allinea anche meglio con le esigenze del mercato globale, rendendola un passo chiave per espandere i tuoi servizi a livello mondiale.

## Iniziare

### Installazione

Per iniziare a utilizzare `express-intlayer`, installa il pacchetto utilizzando npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Configurazione

Configura le impostazioni di internazionalizzazione creando un `intlayer.config.ts` nella radice del tuo progetto:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Configurazione dell'applicazione Express

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

Funziona anche senza problemi con qualsiasi soluzione di internazionalizzazione attraverso vari ambienti, inclusi browser e richieste API. Puoi personalizzare il middleware per rilevare la lingua attraverso intestazioni o cookie:

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

Per impostazione predefinita, `express-intlayer` interpreterà l'intestazione `Accept-Language` per determinare la lingua preferita del cliente.

> Per ulteriori informazioni sulla configurazione e argomenti avanzati, visita la nostra [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Alimentato da TypeScript

`express-intlayer` sfrutta le robuste capacità di TypeScript per migliorare il processo di internazionalizzazione. La tipizzazione statica di TypeScript garantisce che ogni chiave di traduzione venga presa in considerazione, riducendo il rischio di traduzioni mancanti e migliorando la manutenibilità.

> Assicurati che i tipi generati (per impostazione predefinita in ./types/intlayer.d.ts) siano inclusi nel tuo file tsconfig.json.
