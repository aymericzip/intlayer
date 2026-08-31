---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: "AdonisJS i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione AdonisJS multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonis-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Inizializzazione della cronologia"
author: aymericzip
---

# Traduci il tuo backend AdonisJS usando Intlayer | Internazionalizzazione (i18n)

`adonis-intlayer` è un potente pacchetto di internazionalizzazione (i18n) per applicazioni AdonisJS, progettato per rendere i tuoi servizi backend accessibili a livello globale fornendo risposte localizzate basate sulle preferenze del cliente.

### Casi d'Uso Pratici

- **Visualizzazione degli Errori Backend nella Lingua dell'Utente**: Quando si verifica un errore, mostrare i messaggi nella lingua madre dell'utente migliora la comprensione e riduce la frustrazione. Questo è particolarmente utile per messaggi di errore dinamici che potrebbero essere visualizzati in componenti front-end come toast o modali.

- **Recupero di Contenuti Multilingue**: Per le applicazioni che estraggono contenuti da un database, l'internazionalizzazione garantisce che sia possibile servire tali contenuti in più lingue. Questo è fondamentale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che devono visualizzare descrizioni di prodotti, articoli e altri contenuti nella lingua preferita dall'utente.

- **Invio di Email Multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, l'invio di email nella lingua del destinatario può aumentare significativamente il coinvolgimento e l'efficacia.

- **Notifiche Push Multilingue**: Per le applicazioni mobili, l'invio di notifiche push nella lingua preferita di un utente può migliorare l'interazione e la fidelizzazione. Questo tocco personale può rendere le notifiche più pertinenti e stimolanti.

- **Altre Comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, avvisi di sistema o aggiornamenti dell'interfaccia utente, trae vantaggio dall'essere nella lingua dell'utente, garantendo chiarezza e migliorando l'esperienza utente complessiva.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali, ma si allinea anche meglio alle esigenze del mercato globale, rendendolo un passo fondamentale per scalare i tuoi servizi in tutto il mondo.

## Iniziare

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-adonis-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonis-template) on GitHub.

### Installazione

Per iniziare a usare `adonis-intlayer`, installa il pacchetto usando npm:

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
npm install intlayer adonis-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
```

### Configurazione

Configura le impostazioni di internazionalizzazione creando un file `intlayer.config.ts` nella root del tuo progetto:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Dichiarazione del Contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```typescript fileName="app/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      it: "Esempio di contenuto restituito in italiano",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "it": "Esempio di contenuto restituito in italiano",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenuto devuelto en español (México)"
      }
    }
  }
}
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione, purché siano incluse nella directory `contentDir` (per impostazione predefinita, `./src` o `./app`) e corrispondano all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Configurazione dell'Applicazione AdonisJS

Configura la tua applicazione AdonisJS per usare `adonis-intlayer`.

#### Registrare il middleware

Innanzitutto, devi registrare il middleware `intlayer` nella tua applicazione.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Definire le tue rotte

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    it: "Esempio di contenuto restituito in italiano",
    "es-ES": "Ejemplo de contenuto devuelto en español (España)",
    "es-MX": "Ejemplo de contenuto devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Funzioni

`adonis-intlayer` esporta diverse funzioni per gestire l'internazionalizzazione nella tua applicazione:

- `t(content, locale?)`: Funzione di traduzione di base.
- `getIntlayer(key, locale?)`: Recupera il contenuto tramite chiave dai tuoi dizionari.
- `getDictionary(dictionary, locale?)`: Recupera il contenuto da uno specifico oggetto dizionario.
- `getLocale()`: Recupera la locale corrente dal contesto della richiesta.

#### Uso nei Controller

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        it: "Ciao dal controller",
      })
    );
  }
}
```

### Compatibilità

`adonis-intlayer` è completamente compatibile con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/index.md) per applicazioni React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/index.md) per applicazioni Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vite-intlayer/index.md) per applicazioni Vite

Funziona anche perfettamente con qualsiasi soluzione di internazionalizzazione in vari ambienti, inclusi browser e richieste API. Puoi personalizzare il middleware per rilevare la locale tramite header o cookie:

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

Per impostazione predefinita, `adonis-intlayer` interpreterà l'header `Accept-Language` per determinare la lingua preferita del cliente.

> Per ulteriori informazioni sulla configurazione e argomenti avanzati, visita la nostra [documentazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Configura TypeScript

`adonis-intlayer` sfrutta le robuste capacità di TypeScript per migliorare il processo di internazionalizzazione. La tipizzazione statica di TypeScript garantisce che ogni chiave di traduzione sia considerata, riducendo il rischio di traduzioni mancanti e migliorando la manutenibilità.

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

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**estensione ufficiale Intlayer per VS Code**.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprime in linea** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/it/doc/vs-code-extension).

### Configurazione Git

Si raccomanda di ignorare i file generati da Intlayer. Questo ti permette di evitare di commetterli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

## Domande frequenti

<FAQ>

<Question title="Quali sono le diverse soluzioni disponibili per internazionalizzare un backend AdonisJS?">

AdonisJS include `@adonisjs/i18n`, che copre i messaggi ICU nei file `resources/lang` con un servizio con ambito di richiesta. L'alternativa è `Intlayer` tramite `adonis-intlayer`, che dichiara il contenuto in file tipizzati condivisi con il tuo frontend, risolve la locale per richiesta e aggiunge la traduzione AI, i controlli delle traduzioni mancanti e un CMS.

Il motivo per cui internazionalizzare il backend è che gran parte del testo che un utente legge non passa mai per il frontend: messaggi di errore delle API, email transazionali, notifiche push, SMS ed esportazioni PDF. Questi hanno bisogno della lingua del destinatario, risolta per richiesta invece che per sessione.

Vedi [perché Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md).

</Question>

<Question title="Quanto aggiunge l'i18n alla dimensione del bundle del mio server AdonisJS?">

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

Per impostazione predefinita `adonis-intlayer` legge l'header `Accept-Language` della richiesta in arrivo e sceglie la locale dichiarata più vicina, ricadendo sulla tua locale predefinita. Puoi cambiare la fonte con `routing.storage`, per esempio un header personalizzato o un cookie impostato dal tuo frontend, così l'API risponde nella lingua che l'utente ha effettivamente selezionato invece di quella che il suo browser dichiara. Vedi il [riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

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

<Question title="Come uso le traduzioni all'interno di un controller o di un servizio?">

Chiama `getIntlayer` con la tua chiave di dizionario, o avvolgi un messaggio in `t()`. La locale attiva proviene dal contesto della richiesta installato dal middleware, quindi non c'è alcun servizio da iniettare e nessun argomento di locale da passare in basso.

</Question>

<Question title="Funziona con i template Edge?">

Sì. Risolvi il contenuto nel controller e passalo alla vista, così il template renderizza valori già tradotti invece di risolvere le chiavi da solo.

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

Sì, ed è la configurazione abituale. `adonis-intlayer` funziona insieme a `react-intlayer`, `next-intlayer` e `vite-intlayer` sullo stesso contenuto dichiarato, così un'etichetta usata sia in una risposta API sia in una pagina è dichiarata una sola volta. Vedi [come funziona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/how_works_intlayer.md).

</Question>

<Question title="Intlayer è gratuito e open source?">

Sì, sotto licenza Apache 2.0, uso commerciale incluso. Il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) ospitato è un servizio a pagamento opzionale che può anche essere [auto-ospitato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

</Question>

</FAQ>
