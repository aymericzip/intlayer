---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: Introduzione
description: Scopri come funziona Intlayer. Guarda i passaggi che Intlayer utilizza nella tua applicazione. Scopri cosa fanno i diversi pacchetti.
keywords:
  - Introduzione
  - Iniziare
  - Intlayer
  - Applicazione
  - Pacchetti
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Documentazione di Intlayer

Benvenuto nella documentazione ufficiale di Intlayer! Qui troverai tutto il necessario per integrare, configurare e padroneggiare Intlayer per tutte le tue esigenze di internazionalizzazione (i18n), sia che tu stia lavorando con Next.js, React, Vite, Express o un altro ambiente JavaScript.

## Introduzione

### Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per gli sviluppatori JavaScript. Consente la dichiarazione del tuo contenuto ovunque nel tuo codice. Converte la dichiarazione di contenuti multilingue in dizionari strutturati da integrare facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più robusto ed efficiente.

Intlayer fornisce anche un editor visivo opzionale che ti consente di modificare e gestire facilmente i tuoi contenuti. Questo editor è particolarmente utile per gli sviluppatori che preferiscono un'interfaccia visiva per la gestione dei contenuti, o per i team che generano contenuti senza doversi preoccupare del codice.

### Esempio di utilizzo

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      it: "Ciao Mondo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "it": "Ciao Mondo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Perché Intlayer rispetto alle alternative?

Rispetto alle principali soluzioni come `next-intl` o `i18next`, Intlayer è una soluzione dotata di ottimizzazioni integrate come:

<AccordionGroup>

<Accordion header="Dimensioni del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carica solo il contenuto necessario. Intlayer aiuta a **ridurre le dimensioni del bundle e della pagina fino al 50%**.

</Accordion>

<Accordion header="Manutenibilità">

Dichiarare il contenuto vicino ai tuoi componenti **facilita la manutenzione** per le applicazioni su larga scala. Puoi duplicare o eliminare una singola cartella di funzionalità senza il carico mentale di dover rivedere tutta l'infrastruttura dei tuoi contenuti. Inoltre, Intlayer è **completamente tipizzato (fully typed)** per garantire l'esattezza dei tuoi contenuti.

</Accordion>

<Accordion header="Agente IA">

La co-locazione dei contenuti **riduce il contesto necessario** dai grandi modelli linguistici (LLM). Intlayer è inoltre fornito di una suite di strumenti, come una **CLI** per testare le traduzioni mancanti, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**, un **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**, per rendere l'esperienza dello sviluppatore (DX) ancora più fluida per gli agenti basati su IA.

</Accordion>

<Accordion header="Automazione">

Usa l'automazione per tradurre nella tua pipeline CI/CD usando l'LLM di tua scelta al costo del tuo provider di IA. Intlayer offre anche un **compilatore** per automatizzare l'estrazione dei contenuti, così come una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per aiutarti a **tradurre in background**.

</Accordion>

<Accordion header="Prestazioni">

Connettere enormi file JSON ai componenti può portare a problemi di prestazioni e reattività. Intlayer ottimizza il caricamento dei tuoi contenuti al momento della build.

</Accordion>

<Accordion header="Scalabilità con non-sviluppatori">

Molto più che una semplice soluzione i18n, Intlayer fornisce un **[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) self-hosted** e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)** per aiutarti a gestire i tuoi contenuti multilingue in **tempo reale**, rendendo perfetta la collaborazione con traduttori, copywriter e altri membri del team. I contenuti possono essere archiviati localmente e/o in remoto.

</Accordion>
</AccordionGroup>

## Caratteristiche principali

Intlayer offre una varietà di funzionalità su misura per soddisfare le esigenze dello sviluppo web moderno. Di seguito sono elencate le funzionalità chiave, con link alla documentazione dettagliata per ciascuna:

- **Supporto all'internazionalizzazione**: Migliora la portata globale della tua applicazione con il supporto integrato per l'internazionalizzazione.
- **Editor Visivo**: Migliora il tuo flusso di lavoro di sviluppo con i plugin dell'editor progettati per Intlayer. Dai un'occhiata alla [Guida all'Editor Visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).
- **Flessibilità di configurazione**: Personalizza la tua configurazione con ampie opzioni dettagliate nella [Guida alla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).
- **Strumenti CLI avanzati**: Gestisci i tuoi progetti in modo efficiente utilizzando l'interfaccia a riga di comando di Intlayer. Esplora le capacità nella [Documentazione degli strumenti CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

## Concetti Base

### Dizionario

Organizza i tuoi contenuti multilingue vicino al tuo codice per mantenere tutto coerente e manutenibile.

- **[Iniziare](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)**  
  Impara le basi per dichiarare i tuoi contenuti in Intlayer.

- **[Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md)**  
  Comprendi come le traduzioni vengono generate, memorizzate e utilizzate nella tua applicazione.

- **[Enumerazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/enumeration.md)**  
  Gestisci facilmente set di dati ripetuti o fissi in varie lingue.

- **[Condizione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/condition.md)**  
  Impara come utilizzare la logica condizionale in Intlayer per creare contenuti dinamici.

- **[Inserimento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md)**
  Scopri come inserire valori in una stringa utilizzando i segnaposto di inserimento.

- **[Recupero tramite Funzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/function_fetching.md)**  
  Scopri come recuperare dinamicamente contenuti con logica personalizzata per adattarli al flusso di lavoro del tuo progetto.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md)**  
  Impara a utilizzare Markdown in Intlayer per creare contenuti arricchiti.

- **[File incorporati](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/file.md)**  
  Scopri come incorporare file esterni in Intlayer per utilizzarli nell'editor dei contenuti.

- **[Annidamento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/nesting.md)**  
  Comprendi come annidare contenuti in Intlayer per creare strutture complesse.

### Ambienti e Integrazioni

Abbiamo costruito Intlayer pensando alla flessibilità, offrendo un'integrazione fluida con i framework e gli strumenti di build più popolari:

- **[Intlayer con Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)**
- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)**
- **[Intlayer con React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_react_router_v7.md)**
- **[Intlayer con Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md)**
- **[Intlayer con React Native ed Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_react_native+expo.md)**
- **[Intlayer con Lynx e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_lynx+react.md)**
- **[Intlayer con Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+preact.md)**
- **[Intlayer con Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+vue.md)**
- **[Intlayer con Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nuxt.md)**
- **[Intlayer con Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+svelte.md)**
- **[Intlayer con SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_svelte_kit.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_express.md)**
- **[Intlayer con NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nestjs.md)**
- **[Intlayer con Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_hono.md)**
- **[Intlayer con Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_angular_21.md)**

Ogni guida all'integrazione include le best practice per utilizzare le funzionalità di Intlayer, come il **server-side rendering**, il **dynamic routing** o il **client-side rendering**, così puoi mantenere un'applicazione veloce, SEO-friendly e altamente scalabile.

## Contribuire e Feedback

Apprezziamo il potere dell'open source e dello sviluppo guidato dalla comunità. Se desideri proporre miglioramenti, aggiungere una nuova guida o correggere eventuali problemi nella nostra documentazione, sentiti libero di inviare una Pull Request o di aprire una issue sul nostro [repository GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Pronto a tradurre la tua applicazione in modo più rapido ed efficiente?** Immergiti nella nostra documentazione per iniziare a usare Intlayer oggi. Scopri un approccio robusto e semplificato all'internazionalizzazione che mantiene i tuoi contenuti organizzati e il tuo team più produttivo.

## Domande frequenti

<FAQ>

<Question title="A cosa serve Intlayer?">

Intlayer è una libreria di internazionalizzazione (i18n) per applicazioni JavaScript e TypeScript. Dichiari il contenuto di un componente accanto a quel componente in un file `.content.ts`, Intlayer compila quelle dichiarazioni in dizionari tipizzati in fase di build, e i tuoi componenti li leggono attraverso un hook come `useIntlayer`. Copre traduzione, regole di plurale, genere, Markdown, routing consapevole delle locale, metadati SEO, traduzione assistita dall'AI e un editor visivo per i non sviluppatori.

</Question>

<Question title="Quanto aggiunge l'i18n alla dimensione del mio bundle?">

Molto meno di una configurazione basata su namespace, perché una pagina non scarica mai un catalogo che non renderizza. Il markup renderizzato lato server risolve i suoi contenuti sul server, e il compilatore in fase di build sostituisce le chiamate `useIntlayer` con le esatte voci del dizionario che un componente utilizza, quindi le chiavi e le lingue non utilizzate vengono eliminate. I [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md) suddividono il resto per locale. Misurato rispetto alle alternative abituali, Intlayer riduce la dimensione del bundle e delle pagine fino al 50%. Vedi [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md).

</Question>

<Question title="Posso migrare da `i18next`, `next-intl` o `react-i18next` senza riscrivere i miei componenti?">

Sì, e ci sono due percorsi. Puoi migrare il contenuto progressivamente con la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md) o la [guida alla migrazione da next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-intl_to_intlayer.md). Oppure puoi mantenere interamente la tua API attuale: gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) espongono esattamente la stessa API di `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` e `Lingui`, ma servita dai dizionari Intlayer, quindi cambiano gli import e il codice dei componenti no.

</Question>

<Question title="Posso mantenere i miei file di traduzione JSON esistenti?">

Sì. Il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi file `/messages/{locale}/{namespace}.json` come fonte di verità e genera dizionari Intlayer da essi, in entrambe le direzioni. Un [plugin di sincronizzazione PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md) fa lo stesso per i cataloghi gettext, e i [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) ti permettono di dividere il contenuto per lingua invece di raggruppare i locale in un unico file.

</Question>

<Question title="Devo spostare il mio contenuto chiave per chiave?">

No. Esegui `npx intlayer extract` e Intlayer legge i tuoi file sorgente, estrae le stringhe visibili all'utente e scrive un file `.content` accanto a ciascuno, così puoi rivedere un diff invece di copiare le stringhe in un catalogo una alla volta. Vedi il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md).

Per una pipeline completamente automatizzata, il [Compilatore Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) fa lo stesso in fase di build sul codice sorgente JSX, TSX, Vue e Svelte, generando i dizionari ad ogni modifica così non ci sono chiavi da mantenere a mano. Funziona per analisi statica, quindi le stringhe che esistono solo a runtime restano fuori portata, e ha bisogno di alcune annotazioni per distinguere il testo visibile all'utente dalla logica applicativa.

</Question>

<Question title="Quali strumenti di editor e agenti AI sono disponibili?">

Cinque componenti, tutti opzionali:

- **[Estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)**: salta da una chiave `useIntlayer` al file di contenuto che la dichiara, estrai il contenuto da un componente ed esegui build, fill, test, push e pull dalla palette dei comandi o da una scheda Intlayer dedicata.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**: la stessa consapevolezza in qualsiasi editor che parla LSP, con vai alla definizione, trova tutti i riferimenti, anteprime al passaggio del mouse di un valore tradotto, autocompletamento di chiavi e campi, e un avviso quando una chiave non è dichiarata da nessuna parte. Risolve anche le chiamate `i18next`, `react-i18next`, `next-intl` e `use-intl`, il che aiuta durante la migrazione.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)**: espone la documentazione di Intlayer e la CLI a Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, così un assistente risponde in base alla documentazione aggiornata invece di tirare a indovinare, e può eseguire da solo comandi come `intlayer fill`.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**: competenze mirate come `intlayer-config`, `intlayer-cli` e `intlayer-content`, più una per framework, che insegnano a un agente la tua configurazione di routing e i tipi di nodo dei contenuti.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md)**: `no-raw-text` segnala le stringhe hardcoded, con ulteriori regole per le chiavi statiche dei dizionari e i contenuti non utilizzati.

</Question>

<Question title="Quali sono le diverse soluzioni disponibili per internazionalizzare un'app JavaScript?">

Il campo si divide in tre generazioni:

- **Librerie con cataloghi a runtime**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. I messaggi vivono in namespace JSON caricati a runtime. Mature e indipendenti dal framework, ma non tipizzate e inviate per intero.
- **Librerie di messaggi in fase di compilazione**: `Lingui`, `Paraglide`, `react-intl` e `next-intl` con un passaggio di estrazione. Migliore comportamento del bundle e qualche tipizzazione, ma sempre cataloghi centralizzati.
- **Librerie a livello di contenuto**: `Intlayer`. Il contenuto è dichiarato per componente e compilato per componente, così tipizzazione, tree shaking, strumenti e modifica provengono dalla stessa fonte.

Vedi [perché Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md) per il confronto dettagliato, e il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md) per i numeri misurati di bundle e prestazioni.

</Question>

<Question title="Quali framework supporta Intlayer?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro con ogni framework di island, React Native con Expo, Lynx, e sul server Express, Fastify, NestJS, Hono, Elysia e AdonisJS. Ognuno ha la propria guida sotto [ambienti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/introduction.md).

</Question>

<Question title="Perché dichiarare il contenuto accanto al componente invece che in un file JSON centrale?">

Tre motivi. Una pagina invia solo le voci che i suoi componenti renderizzano, invece di un intero namespace, il che è ciò che riduce la dimensione del bundle. Una cartella di feature può essere copiata o eliminata in un pezzo unico, senza cercare attraverso un catalogo condiviso chiavi orfane. E un LLM o un agente che modifica un componente vede il suo contenuto nella stessa cartella, motivo per cui la co-locazione rende affidabile il lavoro assistito dall'AI. Vedi [come funziona Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/how_works_intlayer.md).

</Question>

<Question title="Come traduco la mia app automaticamente con l'AI?">

Esegui `npx intlayer fill`. La CLI rileva le traduzioni mancanti e le riempie con l'LLM di tua scelta, usando il tuo provider e la tua API key, così paghi il provider AI direttamente. `--git-diff` limita l'esecuzione ai contenuti modificati nel branch, il che la mantiene economica in CI. Vedi il [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md) e l'[integrazione CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/CI_CD.md).

</Question>

<Question title="Come trovo le traduzioni mancanti?">

Esegui `npx intlayer test`. Fallisce quando a una locale dichiarata manca del contenuto, così una stringa non tradotta non raggiunge mai la produzione. L'[estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md) mostra gli stessi errori inline, e il [plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md) segnala le stringhe hardcoded con la sua regola `no-raw-text`. Vedi [testare i tuoi contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/testing.md).

</Question>

<Question title="Devo mettere la locale nell'URL?">

No. `routing.mode` accetta `"prefix-no-default"` (il predefinito, `/about` e `/fr/about`), `"prefix-all"`, `"no-prefix"` e `"search-params"`, e `routing.domains` associa ogni locale al proprio dominio. Qualunque sia lo schema, `getMultilingualUrls` costruisce gli alternate `hreflang` per i tuoi metadati e la sitemap. Vedi il [riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Question>

<Question title="Come possono i traduttori e gli editor di contenuti lavorare senza toccare il codice?">

L'[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) gira sulla tua infrastruttura e permette a chiunque di cliccare sul testo della tua app in esecuzione per modificarlo, riscrivendo la modifica nel codice. Il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) esternalizza il contenuto così può cambiare senza un deployment, con la [sincronizzazione live](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/live.md) che applica gli aggiornamenti a runtime.

</Question>

<Question title="Intlayer è gratuito e open source?">

Sì. Intlayer è open source sotto licenza Apache 2.0, e la libreria, la CLI, il compilatore e l'editor visivo sono gratuiti da usare, progetti commerciali inclusi. Il CMS ospitato è un servizio a pagamento opzionale, e può anche essere [auto-ospitato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

</Question>

</FAQ>
