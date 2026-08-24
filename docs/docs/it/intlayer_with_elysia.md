---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - Guida completa per tradurre la tua app"
description: "Niente più i18next. La guida 2026 per costruire un'app Elysia multilingue (i18n). Traduci con agenti AI e ottimizza dimensione del bundle, SEO e performance."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Traduci il tuo sito backend Elysia utilizzando Intlayer | Internazionalizzazione (i18n)

`elysia-intlayer` è un potente plugin di internazionalizzazione (i18n) per applicazioni Elysia, progettato per rendere i tuoi servizi backend accessibili a livello globale fornendo risposte localizzate in base alle preferenze del client.

> Vedi l'implementazione del package su GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### Casi d'uso pratici

- **Visualizzazione degli errori del backend nella lingua dell'utente**: Quando si verifica un errore, visualizzare i messaggi nella lingua nativa dell'utente migliora la comprensione e riduce la frustrazione. Questo è particolarmente utile per i messaggi di errore dinamici che potrebbero essere mostrati in componenti front-end come toast o modal.
- **Recupero di contenuti multilingue**: Per le applicazioni che recuperano contenuti da un database, l'internazionalizzazione garantisce che tu possa servire questo contenuto in più lingue. Questo è cruciale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che hanno bisogno di visualizzare descrizioni di prodotti, articoli e altri contenuti nella lingua preferita dall'utente.
- **Invio di email multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, l'invio di email nella lingua del destinatario può aumentare significativamente l'engagement e l'efficacia.
- **Notifiche push multilingue**: Per le applicazioni mobili, l'invio di notifiche push nella lingua preferita dall'utente può migliorare l'interazione e la retention. Questo tocco personale può rendere le notifiche più rilevanti e azionabili.
- **Altre comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, avvisi di sistema o aggiornamenti dell'interfaccia utente, beneficia di essere nella lingua dell'utente, garantendo chiarezza e migliorando l'esperienza utente complessiva.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali, ma si allinea anche meglio alle esigenze del mercato globale, rendendola un passo fondamentale nel ridimensionamento dei tuoi servizi a livello mondiale.

## Iniziare

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Consulta il [Template dell'Applicazione](https://github.com/aymericzip/intlayer-elysia-template) su GitHub.

### Installazione

Per iniziare a utilizzare `elysia-intlayer`, installa il pacchetto usando npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> il flag `--interactive` è opzionale. Usa `intlayer-cli init` se sei un agente AI.

> Questo comando rileverà il tuo ambiente e installerà i pacchetti necessari. Per esempio:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### Configurazione

Configura le impostazioni di internazionalizzazione creando un file `intlayer.config.ts` nella radice del tuo progetto:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### Dichiara il Tuo Contenuto

Crea e gestisci le tue dichiarazioni di contenuto per archiviare le traduzioni:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      it: "Esempio di contenuto restituito in italiano",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "it": "Esempio di contenuto restituito in italiano",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E corrispondano all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Per ulteriori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Configurazione dell'Applicazione Elysia

Configura la tua applicazione Elysia per utilizzare `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Carica il plugin di internazionalizzazione
  .use(intlayer())
  // Route
  .get("/t_example", () =>
    t({
      it: "Esempio di contenuto restituito in italiano",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

Il plugin inoltre inietta un oggetto `intlayer` nel contesto della route. Preferisci questo quando desideri una dipendenza esplicita invece degli helper standalone:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // Locale utilizzato per questa richiesta, negoziato da `Accept-Language` o letto dall'archiviazione
  locale: intlayer.locale,
  greeting: intlayer.t({
    it: "Ciao",
    en: "Hello",
    fr: "Bonjour",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> Il contesto della route espone `locale`, `defaultLocale`, `locale_storage` (locale impostato esplicitamente dal client), `locale_detected` (locale negoziato dagli header), `t`, `getIntlayer` e `getDictionary`.

### Compatibilità

`elysia-intlayer` è completamente compatibile con:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md)>) per applicazioni React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/index.md)>) per applicazioni Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/index.md)>) per applicazioni Vite

Funziona inoltre in modo fluido con qualsiasi soluzione di internazionalizzazione in vari ambienti, inclusi browser e richieste API. È possibile personalizzare il middleware per rilevare la locale tramite header o cookie:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

Per impostazione predefinita, `elysia-intlayer` interpreterà l'header `Accept-Language` per determinare la lingua preferita del client.

> Per ulteriori informazioni sulla configurazione e argomenti avanzati, visita la nostra [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Configura TypeScript

`elysia-intlayer` sfrutta le solide capacità di TypeScript per migliorare il processo di internazionalizzazione. La tipizzazione statica di TypeScript garantisce che ogni chiave di traduzione sia contabilizzata, riducendo il rischio di traduzioni mancanti e migliorando la manutenibilità.

Assicurati che i tipi generati automaticamente (per impostazione predefinita in ./types/intlayer.d.ts) siano inclusi nel tuo file tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**Estensione Intlayer per VS Code**.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** dei contenuti tradotti.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'Estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo consente di evitare di eseguirne il commit nel repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```
