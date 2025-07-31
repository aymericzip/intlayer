---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione del pacchetto | express-intlayer
description: Scopri come usare il pacchetto express-intlayer
keywords:
  - Intlayer
  - express-intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
---

# express-intlayer: Pacchetto JavaScript per internazionalizzare (i18n) un'applicazione Express.js

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, Next.js e Express.js.

**Il pacchetto `express-intlayer`** ti permette di internazionalizzare la tua applicazione Express.js. Fornisce un middleware per rilevare la lingua preferita dall'utente e restituisce il dizionario appropriato per l'utente.

## Perché internazionalizzare il tuo backend?

Internazionalizzare il backend è essenziale per servire efficacemente un pubblico globale. Permette alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ogni utente. Questa capacità migliora l'esperienza utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone di diversi background linguistici.

### Casi d'uso pratici

- **Visualizzare gli errori del backend nella lingua dell'utente**: Quando si verifica un errore, mostrare i messaggi nella lingua madre dell'utente migliora la comprensione e riduce la frustrazione. Questo è particolarmente utile per messaggi di errore dinamici che potrebbero essere mostrati in componenti front-end come toast o modali.

- **Recuperare contenuti multilingue**: Per le applicazioni che estraggono contenuti da un database, l'internazionalizzazione garantisce che tu possa fornire questi contenuti in più lingue. Questo è fondamentale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che devono mostrare descrizioni di prodotti, articoli e altri contenuti nella lingua preferita dall'utente.

- **Invio di email multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, inviare email nella lingua del destinatario può aumentare significativamente l'engagement e l'efficacia.

- **Notifiche push multilingue**: Per le applicazioni mobili, inviare notifiche push nella lingua preferita dall'utente può migliorare l'interazione e la fidelizzazione. Questo tocco personale può rendere le notifiche più rilevanti e incisive.

- **Altre comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, avvisi di sistema o aggiornamenti dell'interfaccia utente, beneficia dell'essere nella lingua dell'utente, garantendo chiarezza e migliorando l'esperienza complessiva dell'utente.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali, ma si allinea anche meglio alle esigenze del mercato globale, rendendolo un passaggio chiave per scalare i tuoi servizi a livello mondiale.

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

### Configurare Intlayer

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

> Per un elenco completo dei parametri disponibili, fare riferimento alla [documentazione della configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

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
      fr: "Esempio di contenuto restituito in francese",
      "es-ES": "Esempio di contenuto restituito in spagnolo (Spagna)",
      "es-MX": "Esempio di contenuto restituito in spagnolo (Messico)",
    })
  );
});

// Avvia il server
app.listen(3000, () => console.log(`In ascolto sulla porta 3000`));
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
      fr: "Esempio di contenuto restituito in francese",
      "es-MX": "Esempio di contenuto restituito in spagnolo (Messico)",
      "es-ES": "Esempio di contenuto restituito in spagnolo (Spagna)",
    })
  );
});

// Avvia il server
app.listen(3000, () => console.log(`In ascolto sulla porta 3000`));
app.listen(3000, () => console.log(`In ascolto sulla porta 3000`));
```

### Compatibilità

`express-intlayer` è completamente compatibile con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md) per applicazioni React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/index.md) per applicazioni Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/index.md) per applicazioni Vite

Funziona inoltre perfettamente con qualsiasi soluzione di internazionalizzazione in diversi ambienti, inclusi browser e richieste API. Puoi personalizzare il middleware per rilevare la locale tramite header o cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Altre opzioni di configurazione
  middleware: {
    headerName: "my-locale-header", // nome dell'intestazione personalizzata per la localizzazione
    cookieName: "my-locale-cookie", // nome del cookie personalizzato per la localizzazione
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
    headerName: "my-locale-header", // nome dell'intestazione personalizzata per la localizzazione
    cookieName: "my-locale-cookie", // nome del cookie personalizzato per la localizzazione
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

Per impostazione predefinita, `express-intlayer` interpreterà l'intestazione `Accept-Language` per determinare la lingua preferita del client.

## Funzioni fornite dal pacchetto `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/express-intlayer/t.md)

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Cronologia iniziale
