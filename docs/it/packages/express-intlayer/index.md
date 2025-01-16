# express-intlayer: Pacchetto JavaScript per internazionalizzare (i18n) un'applicazione Express.js

**Intlayer** è una suite di pacchetti progettati specificamente per sviluppatori JavaScript. È compatibile con framework come React, Next.js e Express.js.

**Il pacchetto `express-intlayer`** ti consente di internazionalizzare la tua applicazione Express.js. Fornisce un middleware per rilevare la lingua preferita dell'utente e restituisce il dizionario appropriato per l'utente.

## Perché internazionalizzare il tuo backend?

Internazionalizzare il tuo backend è essenziale per servire efficacemente un pubblico globale. Consente alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ciascun utente. Questa capacità migliora l'esperienza dell'utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone di diverse origini linguistiche.

### Casi d'uso pratici

- **Visualizzazione degli errori Backend nella lingua dell'utente**: Quando si verifica un errore, mostrare i messaggi nella lingua nativa dell'utente migliora la comprensione e riduce la frustrazione. Questo è particolarmente utile per messaggi di errore dinamici che potrebbero essere mostrati in componenti front-end come toast o modali.

- **Recupero di contenuti multilingue**: Per le applicazioni che estraggono contenuti da un database, l'internazionalizzazione garantisce di poter servire questo contenuto in più lingue. Questo è cruciale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che devono visualizzare descrizioni di prodotti, articoli e altri contenuti nella lingua preferita dall'utente.

- **Invio di email multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, inviare email nella lingua del destinatario può aumentare significativamente il coinvolgimento e l'efficacia.

- **Notifiche push multilingue**: Per le applicazioni mobili, inviare notifiche push nella lingua preferita dell'utente può migliorare l'interazione e la fidelizzazione. Questo tocco personale può rendere le notifiche più rilevanti e fattibili.

- **Altre comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, allerta di sistema o aggiornamenti dell'interfaccia utente, beneficia di essere nella lingua dell'utente, garantendo chiarezza e migliorando l'esperienza dell'utente complessiva.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali, ma si allinea anche meglio alle esigenze del mercato globale, rendendola un passo chiave per espandere i tuoi servizi in tutto il mondo.

## Perché integrare Intlayer?

- **Ambiente Type-Safe**: Sfrutta TypeScript per garantire che tutte le tue definizioni di contenuto siano precise e senza errori.

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

> Per un elenco completo dei parametri disponibili, fare riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Esempio di utilizzo

Imposta la tua applicazione Express per utilizzare `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Carica il gestore della richiesta di internazionalizzazione
app.use(intlayer());

// Rotte
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Esempio di contenuto restituito in inglese",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// Avvia il server
app.listen(3000, () => console.log(`Ascoltando sulla porta 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Carica il gestore della richiesta di internazionalizzazione
app.use(intlayer());

// Rotte
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Esempio di contenuto restituito in inglese",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Avvia il server
app.listen(3000, () => console.log(`Ascoltando sulla porta 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Carica il gestore della richiesta di internazionalizzazione
app.use(intlayer());

// Rotte
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Esempio di contenuto restituito in inglese",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Avvia il server
app.listen(3000, () => console.log(`Ascoltando sulla porta 3000`));
```

### Compatibilità

`express-intlayer` è completamente compatibile con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/index.md) per applicazioni React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/next-intlayer/index.md) per applicazioni Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/vite-intlayer/index.md) per applicazioni Vite

Funziona anche senza problemi con qualsiasi soluzione di internazionalizzazione in vari ambienti, inclusi browser e richieste API. Puoi personalizzare il middleware per rilevare la lingua tramite intestazioni o cookie:

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

Per impostazione predefinita, `express-intlayer` interpreterà l'intestazione `Accept-Language` per determinare la lingua preferita del client.

## Funzioni fornite dal pacchetto `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/express-intlayer/t.md)
