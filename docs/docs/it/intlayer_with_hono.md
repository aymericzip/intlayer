---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: i18n Hono - Come tradurre la tua app Hono – guida 2026
description: Scopri come rendere multilingue il tuo backend Hono. Segui la documentazione per internazionalizzarlo (i18n) e tradurlo.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Aggiungi comando init
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizializzazione cronologia
---

# Traduci il tuo sito web backend Hono usando Intlayer | Internazionalizzazione (i18n)

`hono-intlayer` è un potente middleware di internazionalizzazione (i18n) per applicazioni Hono, progettato per rendere i tuoi servizi backend accessibili a livello globale fornendo risposte localizzate in base alle preferenze del client.

### Casi d'Uso Pratici

- **Visualizzazione degli Errori Backend nella Lingua dell'Utente**: Quando si verifica un errore, visualizzare i messaggi nella lingua nativa dell'utente migliora la comprensione e riduce la frustrazione. Ciò è particolarmente utile per i messaggi di errore dinamici che potrebbero essere mostrati in componenti front-end come toast o modali.

- **Recupero di Contenuti Multilingue**: Per le applicazioni che estraggono contenuti da un database, l'internazionalizzazione garantisce la possibilità di servire tali contenuti in più lingue. Questo è fondamentale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che devono visualizzare descrizioni di prodotti, articoli e altri contenuti nella lingua preferita dall'utente.

- **Invio di Email Multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, l'invio di email nella lingua del destinatario può aumentare significativamente il coinvolgimento e l'efficacia.

- **Notifiche Push Multilingue**: Per le applicazioni mobili, l'invio di notifiche push nella lingua preferita dell'utente può migliorare l'interazione e la fidelizzazione. Questo tocco personale può rendere le notifiche più pertinenti e stimolanti.

- **Altre Comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, avvisi di sistema o aggiornamenti dell'interfaccia utente, trae vantaggio dall'essere nella lingua dell'utente, garantendo chiarezza e migliorando l'esperienza utente complessiva.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali, ma si allinea meglio alle esigenze del mercato globale, rappresentando un passo fondamentale per scalare i tuoi servizi in tutto il mondo.

## Iniziare

### Installazione

Per iniziare a usare `hono-intlayer`, installa il pacchetto usando npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
```

### Configurazione

Configura le impostazioni di internazionalizzazione creando un file `intlayer.config.ts` nella radice del tuo progetto:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
      Locales.ITALIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Dichiarare i Tuoi Contenuti

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      it: "Esempio di contenuto restituito in italiano",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione, purché siano incluse nella directory `contentDir` (per impostazione predefinita, `./src`) e corrispondano all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Configurazione dell'Applicazione Hono

Configura la tua applicazione Hono per usare `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Carica il gestore delle richieste di internazionalizzazione
app.use("*", intlayer());

// Rotte
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      it: "Esempio di contenuto restituito in italiano",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Compatibilità

`hono-intlayer` è completamente compatibile con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md) per applicazioni React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/index.md) per applicazioni Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/index.md) per applicazioni Vite

Funziona inoltre perfettamente con qualsiasi soluzione di internazionalizzazione in vari ambienti, inclusi browser e richieste API. Puoi personalizzare il middleware per rilevare la locale tramite intestazioni o cookie:

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

Per impostazione predefinita, `hono-intlayer` interpreterà l'intestazione `Accept-Language` per determinare la lingua preferita del client.

> Per ulteriori informazioni sulla configurazione e argomenti avanzati, visita la nostra [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Configurare TypeScript

`hono-intlayer` sfrutta le robuste capacità di TypeScript per migliorare il processo di internazionalizzazione. La tipizzazione statica di TypeScript garantisce che ogni chiave di traduzione sia considerata, riducendo il rischio di traduzioni mancanti e migliorando la manutenibilità.

![Autocompletamento](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Errore di traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assicurati che i tipi autogenerati (per impostazione predefinita in ./types/intlayer.d.ts) siano inclusi nel tuo file tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi auto-generati
  ],
}
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'estensione ufficiale **Intlayer VS Code Extension**.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprime inline** dei contenuti tradotti.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come usare l'estensione, consulta la [documentazione dell'estensione Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Ciò consente di evitare di includerli nel repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```
