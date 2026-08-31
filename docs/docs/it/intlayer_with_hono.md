---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: "Hono i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione Hono multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Aggiungi comando init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizializzazione cronologia"
author: aymericzip
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

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-hono-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-hono-template) on GitHub.

### Installazione

Per iniziare a usare `hono-intlayer`, installa il pacchetto usando npm:

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

> il flag `--interactive` è opzionale. Usa `intlayer-cli init` se sei un agente IA.

> Questo comando rileverà il tuo ambiente e installerà i pacchetti richiesti. Ad esempio:

```bash packageManager="npm"
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
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

```typescript fileName="src/index.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione, purché siano incluse nella directory `contentDir` (per impostazione predefinita, `./src`) e corrispondano all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## Domande frequenti

<FAQ>

<Question title="Quali sono le diverse soluzioni disponibili per internazionalizzare un backend Hono?">

Hono non ha un proprio livello i18n, quindi le opzioni sono una libreria generica come `i18next` collegata manualmente in un middleware, oppure `Intlayer` tramite `hono-intlayer`, che registra il middleware per te, risolve la locale per richiesta e condivide lo stesso contenuto dichiarato del tuo frontend.

Il motivo per cui internazionalizzare il backend è che gran parte del testo che un utente legge non passa mai per il frontend: messaggi di errore delle API, email transazionali, notifiche push, SMS ed esportazioni PDF. Questi hanno bisogno della lingua del destinatario, risolta per richiesta invece che per sessione.

Vedi [perché Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md).

</Question>

<Question title="Quanto aggiunge l'i18n alla dimensione del bundle del mio server Hono?">

Molto poco. I dizionari sono compilati in anticipo e vengono inclusi solo i locale che dichiari, quindi non c'è caricamento di cataloghi all'avvio né letture di file sul percorso della richiesta. Questo conta di più sui deployment serverless ed edge, dove la dimensione del bundle determina il tempo di cold start. Vedi [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md).

</Question>

<Question title="Posso migrare da `i18next` senza riscrivere i miei handler?">

Sì, e ci sono due percorsi. Puoi migrare il contenuto progressivamente con la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md). Oppure puoi mantenere interamente la tua API attuale: gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) espongono esattamente la stessa API di `i18next`, ma servita dai dizionari Intlayer, quindi cambiano gli import e il codice degli handler no.

</Question>

<Question title="Posso mantenere i miei file di traduzione JSON esistenti?">

Sì. Il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi file `/messages/{locale}/{namespace}.json` come fonte di verità e genera dizionari Intlayer da essi, in entrambe le direzioni. Un [plugin di sincronizzazione PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md) fa lo stesso per i cataloghi gettext, e i [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) ti permettono di dividere il contenuto per lingua invece di raggruppare i locale in un unico file.

</Question>

<Question title="Devo spostare il mio contenuto chiave per chiave?">

No. Esegui `npx intlayer extract` e Intlayer legge i tuoi file sorgente, estrae le stringhe visibili all'utente e scrive un file `.content` accanto a ciascuno, così puoi rivedere un diff invece di copiare le stringhe in un catalogo una alla volta. Vedi il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md).

Sul lato frontend dello stesso progetto, il [Compilatore Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) va oltre e genera i dizionari in fase di build dal tuo codice sorgente JSX, TSX, Vue o Svelte, così le due metà dell'app condividono un unico livello di contenuto senza chiavi mantenute a mano.

</Question>

<Question title="Quali strumenti di editor e agenti AI sono disponibili?">

Cinque componenti, tutti opzionali:

- **[Estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)**: salta da una chiave `useIntlayer` al file di contenuto che la dichiara, estrai il contenuto da un componente ed esegui build, fill, test, push e pull dalla palette dei comandi o da una scheda Intlayer dedicata.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**: la stessa consapevolezza in qualsiasi editor che parla LSP, con vai alla definizione, trova tutti i riferimenti, anteprime al passaggio del mouse di un valore tradotto, autocompletamento di chiavi e campi, e un avviso quando una chiave non è dichiarata da nessuna parte. Risolve anche le chiamate `i18next`, `react-i18next`, `next-intl` e `use-intl`, il che aiuta durante la migrazione.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)**: espone la documentazione di Intlayer e la CLI a Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, così un assistente risponde in base alla documentazione aggiornata invece di tirare a indovinare, e può eseguire da solo comandi come `intlayer fill`.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**: competenze mirate come `intlayer-config`, `intlayer-cli` e `intlayer-content`, più una per framework, che insegnano a un agente la tua configurazione di routing e i tipi di nodo dei contenuti.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md)**: `no-raw-text` segnala le stringhe hardcoded, con ulteriori regole per le chiavi statiche dei dizionari e i contenuti non utilizzati.

</Question>

<Question title="Come fa Intlayer a sapere in quale lingua rispondere?">

Per impostazione predefinita `hono-intlayer` legge l'header `Accept-Language` della richiesta in arrivo e sceglie la locale dichiarata più vicina, ricadendo sulla tua locale predefinita. Puoi cambiare la fonte con `routing.storage`, per esempio un header personalizzato o un cookie impostato dal tuo frontend, così l'API risponde nella lingua che l'utente ha effettivamente selezionato invece di quella che il suo browser dichiara. Vedi il [riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Question>

<Question title="La locale è isolata per richiesta?">

Sì. Il middleware limita la locale attiva alla richiesta, così due richieste concorrenti in lingue diverse non leggono mai la locale l'una dell'altra. È questo che rende `t()` e `getIntlayer()` sicuri da chiamare da un servizio senza passare un argomento di locale attraverso ogni funzione.

</Question>

<Question title="Come invio email transazionali nella lingua del destinatario?">

Dichiara il contenuto dell'email in un file di contenuto come qualsiasi altro contenuto, poi risolvilo con `getIntlayer` per la locale memorizzata del destinatario invece che per la locale della richiesta. Questo conta per i job e le code, dove la lingua appartiene al record dell'utente e non c'è una richiesta in arrivo da cui leggere un header.

</Question>

<Question title="Come localizzo i messaggi di errore delle API?">

Avvolgi il messaggio in `t()` nel punto in cui l'errore viene costruito. La locale attiva della richiesta lo risolve, così il client riceve un messaggio che può mostrare direttamente, e il tuo frontend non ha bisogno di un catalogo parallelo di codici di errore.

</Question>

<Question title="Funziona sui runtime edge come Cloudflare Workers, Deno o Bun?">

Hono punta a tutti loro, e Intlayer risolve il contenuto da dizionari compilati in fase di build invece di leggere file di catalogo dal disco a runtime, cosa che di solito si rompe sui runtime edge. Mantieni `dictionary.importMode` al suo valore predefinito `"static"` così il contenuto viene incluso nel bundle con il worker.

</Question>

<Question title="Come traduco il contenuto del backend automaticamente con l'AI?">

Esegui `npx intlayer fill`, che riempie le traduzioni mancanti con l'LLM di tua scelta usando il tuo provider e la tua API key. Aggiungi `--git-diff` per tradurre solo i contenuti modificati nel branch. Vedi il [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md) e l'[integrazione CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/CI_CD.md).

</Question>

<Question title="Intlayer supporta plurali, genere e valori interpolati sul server?">

Sì: [forme plurali](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/plurial.md), [contenuto basato sul genere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/gender.md), condizioni, [inserimenti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md) per valori interpolati, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md) per i corpi delle email e [formattatori](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md) per numeri, date e valute.

</Question>

<Question title="Ottengo l'autocompletamento TypeScript sul server?">

Sì. Intlayer genera i tipi dei tuoi dizionari in `./types/intlayer.d.ts`, così una chiave che non esiste è un errore di compilazione invece di una stringa vuota a runtime. Esegui `npx intlayer test` in CI per far fallire la build quando a una locale dichiarata manca del contenuto.

</Question>

<Question title="Il frontend e il backend possono condividere lo stesso contenuto?">

Sì, ed è la configurazione abituale. `hono-intlayer` funziona insieme a `react-intlayer`, `next-intlayer` e `vite-intlayer` sullo stesso contenuto dichiarato, così un'etichetta usata sia in una risposta API sia in una pagina è dichiarata una sola volta. Vedi [come funziona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/how_works_intlayer.md).

</Question>

<Question title="Intlayer è gratuito e open source?">

Sì, sotto licenza Apache 2.0, uso commerciale incluso. Il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) ospitato è un servizio a pagamento opzionale che può anche essere [auto-ospitato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

</Question>

</FAQ>
