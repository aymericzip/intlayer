---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - Come tradurre un'app Fastify nel 2026
description: Scopri come rendere multilingue il tuo backend Fastify. Segui la documentazione per l'internazionalizzazione (i18n) e la traduzione.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "Aggiunto comando init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Inizializzata cronologia"
---

# Traduci il sito web del tuo backend Fastify usando Intlayer | Internazionalizzazione (i18n)

`fastify-intlayer` è un potente plugin di internazionalizzazione (i18n) per applicazioni Fastify, progettato per rendere i tuoi servizi backend accessibili a livello globale fornendo risposte localizzate in base alle preferenze del client.

> Vedi l'implementazione del pacchetto su GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### Casi d'uso pratici

- **Visualizzazione degli errori del backend nella lingua dell'utente**: Quando si verifica un errore, mostrare i messaggi nella lingua madre dell'utente migliora la comprensione e riduce la frustrazione. Questo è particolarmente utile per messaggi di errore dinamici che potrebbero essere visualizzati in componenti front-end come toast o modali.
- **Recupero di contenuti multilingue**: Per le applicazioni che recuperano contenuti da un database, l'internazionalizzazione garantisce che sia possibile servire tali contenuti in più lingue. Questo è fondamentale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che devono visualizzare descrizioni di prodotti, articoli e altri contenuti nella lingua preferita dall'utente.
- **Invio di email multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, l'invio di email nella lingua del destinatario può aumentare significativamente il coinvolgimento e l'efficacia.
- **Notifiche push multilingue**: Per le applicazioni mobili, l'invio di notifiche push nella lingua preferita dell'utente può migliorare l'interazione e la fidelizzazione. Questo tocco personale può rendere le notifiche più pertinenti e azionabili.
- **Altre comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, avvisi di sistema o aggiornamenti dell'interfaccia utente, beneficia dell'uso della lingua dell'utente, garantendo chiarezza e migliorando l'esperienza utente complessiva.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali, ma si allinea anche meglio alle esigenze del mercato globale, rendendolo un passaggio chiave per scalare i tuoi servizi in tutto il mondo.

## Per iniziare

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Vedi il [Template dell'applicazione](https://github.com/aymericzip/intlayer-fastify-template) su GitHub.

### Installazione

Per iniziare a usare `fastify-intlayer`, installa il pacchetto usando npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### Configurazione

Configura le impostazioni di internazionalizzazione creando un file `intlayer.config.ts` nella root del tuo progetto:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

### Dichiara i tuoi contenuti

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenuto devuelto en español (España)",
      "es-MX": "Ejemplo de contenuto devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenuto devuelto en español (España)",
      "es-MX": "Ejemplo de contenuto devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenuto devuelto en español (España)",
      "es-MX": "Ejemplo de contenuto devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenuto devuelto en español (España)",
        "es-MX": "Ejemplo de contenuto devuelto en español (México)"
      }
    }
  }
}
```

> Le dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione, purché siano incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E devono corrispondere all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Configurazione dell'applicazione Fastify

Configura la tua applicazione Fastify per usare `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Carica il plugin di internazionalizzazione
await fastify.register(intlayer);

// Rotte
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenuto renvoyé en français",
    "es-ES": "Ejemplo de contenuto devuelto en español (España)",
    "es-MX": "Ejemplo de contenuto devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Avvia il server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Carica il plugin di internazionalizzazione
await fastify.register(intlayer);

// Rotte
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenuto renvoyé en français",
    "es-ES": "Ejemplo de contenuto devuelto en español (España)",
    "es-MX": "Ejemplo de contenuto devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Avvia il server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Wrapper per l'avvio del server per async/await
const start = async () => {
  try {
    // Carica il plugin di internazionalizzazione
    await fastify.register(intlayer);

    // Rotte
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        en: "Example of returned content in English",
        fr: "Exemple de contenuto renvoyé en français",
        "es-ES": "Ejemplo de contenuto devuelto en español (España)",
        "es-MX": "Ejemplo de contenuto devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Compatibilità

`fastify-intlayer` è completamente compatibile con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md) per applicazioni React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/index.md) per applicazioni Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/index.md) per applicazioni Vite

Funziona perfettamente anche con qualsiasi soluzione di internazionalizzazione in vari ambienti, inclusi browser e richieste API. Puoi personalizzare il middleware per rilevare la locale tramite header o cookie:

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

Per impostazione predefinita, `fastify-intlayer` interpreterà l'header `Accept-Language` per determinare la lingua preferita del client.

> Per ulteriori informazioni sulla configurazione e su argomenti avanzati, visita la nostra [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Configura TypeScript

`fastify-intlayer` sfrutta le potenti capacità di TypeScript per migliorare il processo di internazionalizzazione. La tipizzazione statica di TypeScript garantisce che ogni chiave di traduzione sia considerata, riducendo il rischio di traduzioni mancanti e migliorando la manutenibilità.

Assicurati che i tipi autogenerati (per impostazione predefinita in ./types/intlayer.d.ts) siano inclusi nel tuo file tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi autogenerati
  ],
}
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'estensione ufficiale **Intlayer VS Code Extension**.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli sull'uso dell'estensione, consulta la [documentazione dell'estensione Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti consente di evitare di inserirli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer

```
