---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "NestJS i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione NestJS multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Aggiungi comando init"
  - version: 5.8.0
    date: 2025-09-09
    changes: "Documentazione iniziale"
---

# Traduci il tuo sito backend Nest usando Intlayer | Internazionalizzazione (i18n)

`express-intlayer` è un potente middleware di internazionalizzazione (i18n) per applicazioni Express, progettato per rendere i tuoi servizi backend accessibili a livello globale fornendo risposte localizzate in base alle preferenze del client. Poiché NestJS è costruito su Express, puoi integrare perfettamente `express-intlayer` nelle tue applicazioni NestJS per gestire efficacemente contenuti multilingue.

Casi d'uso pratici

- **Visualizzazione degli errori del backend nella lingua dell'utente**: Quando si verifica un errore, visualizzare i messaggi nella lingua nativa dell'utente migliora la comprensione e riduce la frustrazione. Questo è particolarmente utile per i messaggi di errore dinamici che potrebbero essere visualizzati in componenti front-end come toast o modali.

- **Recupero di contenuti multilingue**: Per le applicazioni che estraggono contenuti da un database, l'internazionalizzazione garantisce che tu possa servire questo contenuto in più lingue. Questo è fondamentale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che devono visualizzare descrizioni di prodotti, articoli e altri contenuti nella lingua preferita dall'utente.

- **Invio di email multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, inviare email nella lingua del destinatario può aumentare significativamente il coinvolgimento e l'efficacia.

- **Notifiche push multilingue**: Per le applicazioni mobili, inviare notifiche push nella lingua preferita dall'utente può migliorare l'interazione e la fidelizzazione. Questo tocco personale può rendere le notifiche più rilevanti e attuabili.

- **Altre comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, avvisi di sistema o aggiornamenti dell'interfaccia utente, beneficia dall'essere nella lingua dell'utente, garantendo chiarezza e migliorando l'esperienza utente complessiva.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali ma si allinea anche meglio alle esigenze del mercato globale, rendendola un passo chiave nel ridimensionamento dei tuoi servizi a livello mondiale.

## Iniziare

### Creare un nuovo progetto NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Installazione

Per iniziare a usare `express-intlayer`, installa il pacchetto usando npm:

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
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
```

### Configurare tsconfig.json

Per utilizzare Intlayer con TypeScript, assicurati che il tuo `tsconfig.json` sia configurato per supportare i moduli ES. Puoi farlo impostando le opzioni `module` e `moduleResolution` su `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... altre opzioni
  },
}
```

### Configurazione

Configura le impostazioni di internazionalizzazione creando un file `intlayer.config.ts` nella radice del tuo progetto:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Dichiara il tuo contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (di default, `./src`). E corrispondano all'estensione del file di dichiarazione del contenuto (di default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](/doc/concept/content).

### Configurazione del Middleware Express

Integra il middleware `express-intlayer` nella tua applicazione NestJS per gestire l'internazionalizzazione:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Applica a tutte le rotte
  }
}
```

### Usa le Traduzioni nei Tuoi Servizi o Controller

Ora puoi usare la funzione `getIntlayer` per accedere alle traduzioni nei tuoi servizi o controller:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet;
  }
}
```

### Compatibilità

`express-intlayer` è completamente compatibile con:

- [`react-intlayer`](/doc/packages/react-intlayer) per applicazioni React
- [`next-intlayer`](/doc/packages/next-intlayer) per applicazioni Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) per applicazioni Vite

Funziona inoltre perfettamente con qualsiasi soluzione di internazionalizzazione in diversi ambienti, inclusi browser e richieste API. Puoi personalizzare il middleware per rilevare la locale tramite header o cookie:

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

Per impostazione predefinita, `express-intlayer` interpreterà l'intestazione `Accept-Language` per determinare la lingua preferita del client.

> Per maggiori informazioni sulla configurazione e argomenti avanzati, visita la nostra [documentazione](/doc/concept/configuration).

### Configurare TypeScript

`express-intlayer` sfrutta le potenti capacità di TypeScript per migliorare il processo di internazionalizzazione. Il typing statico di TypeScript garantisce che ogni chiave di traduzione sia considerata, riducendo il rischio di traduzioni mancanti e migliorando la manutenibilità.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assicurati che i tipi generati automaticamente (di default in ./types/intlayer.d.ts) siano inclusi nel tuo file tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  include: [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare la **Estensione ufficiale Intlayer per VS Code**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** dei contenuti tradotti.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'Estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di committarli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

## Domande frequenti

<FAQ>

<Question title="Quali sono le diverse soluzioni disponibili per internazionalizzare un backend NestJS?">

NestJS ha `nestjs-i18n`, che è la scelta comune e copre cataloghi JSON o YAML con un servizio con ambito di richiesta. L'alternativa è `Intlayer` tramite `express-intlayer`, che usa lo stesso contenuto dichiarato del tuo frontend, è tipizzato contro i tuoi dizionari e viene con la traduzione AI e un CMS.

Il motivo per cui internazionalizzare il backend è che gran parte del testo che un utente legge non passa mai per il frontend: messaggi di errore delle API, email transazionali, notifiche push, SMS ed esportazioni PDF. Questi hanno bisogno della lingua del destinatario, risolta per richiesta invece che per sessione.

Vedi [perché Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md).

</Question>

<Question title="Quanto aggiunge l'i18n alla dimensione del bundle del mio server NestJS?">

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

Per impostazione predefinita `express-intlayer` legge l'header `Accept-Language` della richiesta in arrivo e sceglie la locale dichiarata più vicina, ricadendo sulla tua locale predefinita. Puoi cambiare la fonte con `routing.storage`, per esempio un header personalizzato o un cookie impostato dal tuo frontend, così l'API risponde nella lingua che l'utente ha effettivamente selezionato invece di quella che il suo browser dichiara. Vedi il [riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

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

<Question title="Posso iniettare le traduzioni in un servizio o controller NestJS?">

Sì. Chiama `getIntlayer("app")` all'interno del servizio o del controller, come mostrato sopra. Non c'è alcun modulo da registrare per feature e nessun token da iniettare, perché la locale attiva proviene dal contesto della richiesta che il middleware ha installato.

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

Sì, ed è la configurazione abituale. `express-intlayer` funziona insieme a `react-intlayer`, `next-intlayer` e `vite-intlayer` sullo stesso contenuto dichiarato, così un'etichetta usata sia in una risposta API sia in una pagina è dichiarata una sola volta. Vedi [come funziona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/how_works_intlayer.md).

</Question>

<Question title="Intlayer è gratuito e open source?">

Sì, sotto licenza Apache 2.0, uso commerciale incluso. Il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) ospitato è un servizio a pagamento opzionale che può anche essere [auto-ospitato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

</Question>

</FAQ>
