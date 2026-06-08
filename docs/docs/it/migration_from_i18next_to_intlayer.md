---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrazione da i18next a Intlayer | Internazionalizzazione (i18n)"
description: "Scopri come migrare la tua applicazione JavaScript/TypeScript da i18next a Intlayer — passo dopo passo, senza interrompere il tuo codice esistente. Utilizza l'adattatore di compatibilità @intlayer/i18next per una transizione fluida."
keywords:
  - i18next
  - intlayer
  - migrazione
  - internazionalizzazione
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
---

# Migrazione da i18next a Intlayer

## Perché migrare da i18next a Intlayer?

<AccordionGroup>

<Accordion header="Dimensione del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carica solo i contenuti necessari. Intlayer ti aiuta a **ridurre la dimensione del bundle e delle pagine fino al 50%**.

</Accordion>

<Accordion header="Manutenibilità">

Definire lo scope dei contenuti della tua applicazione **facilita la manutenzione** per applicazioni su larga scala. Puoi duplicare o eliminare un'intera cartella di funzionalità senza lo sforzo mentale di revisionare l'intero codice dei contenuti. Inoltre, Intlayer è **completamente tipizzato** per garantire la correttezza dei tuoi contenuti.

Intlayer è anche la soluzione con lo **sviluppo più attivo** nell'ecosistema i18n — i problemi vengono risolti rapidamente, nuovi adattatori per framework vengono aggiunti regolarmente e l'API principale viene continuamente affinata sulla base di feedback reali in produzione.

</Accordion>

<Accordion header="Agenti IA">

La co-localizzazione dei contenuti **riduce il contesto necessario** per i Modelli Linguistici di Grandi Dimensioni (LLM). Intlayer offre inoltre una suite di strumenti, come una **CLI** per testare le traduzioni mancanti, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)**, e **[Skill per Agenti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**, per rendere l'Esperienza Sviluppatore (DX) per gli agenti IA ancora più fluida.

</Accordion>

<Accordion header="Automazione">

Utilizza l'automazione per tradurre nella tua pipeline CI/CD impiegando l'LLM di tua scelta al costo del tuo provider IA. Intlayer offre inoltre un **compilatore** per automatizzare l'estrazione dei contenuti, così come una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per facilitare **la traduzione in background**.

</Accordion>

<Accordion header="Performance">

Collegare enormi file JSON ai componenti può portare a problemi di performance e reattività. Intlayer ottimizza il caricamento dei contenuti a tempo di build (build-time).

</Accordion>

<Accordion header="Scalabilità con i non-sviluppatori">

Molto più di una semplice soluzione i18n, Intlayer fornisce un **[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)** self-hosted e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)** per aiutarti a gestire i tuoi contenuti multilingue in **tempo reale**, rendendo fluida la collaborazione con traduttori, copywriter e altri membri del team. Il contenuto può essere archiviato localmente e/o in remoto.

</Accordion>

</AccordionGroup>

---

## Strategie di migrazione

Ci sono due strategie complementari per migrare da `i18next` a Intlayer:

1. **Adattatore di compatibilità (consigliato per app esistenti)** — Installa `@intlayer/i18next`. Questo pacchetto espone **esattamente la stessa API** di `i18next` ma delega tutto il lavoro di traduzione dietro le quinte a Intlayer. Mantieni intatte le chiamate esistenti a `i18next.t()`, `i18next.changeLanguage()` e `createInstance()` — l'unica cosa che cambia è il percorso di importazione e l'inizializzazione.

2. **Migrazione completa** — Sostituisci gradualmente le API di `i18next` con strumenti Intlayer nativi e co-localizza i contenuti nei file `.content.ts`.

Questa guida tratta prima la **Strategia 1** (adattatore di compatibilità drop-in), e poi esamina la migrazione completa opzionale.

---

## Indice

<TOC/>

---

## Migrazione rapida

I seguenti passaggi rappresentano il minimo indispensabile per far funzionare la tua app `i18next` esistente su Intlayer, senza modifiche al codice sorgente.

<Steps>

<Step number={1} title="Installare le Dipendenze">

Installa i pacchetti principali di Intlayer e l'adattatore di compatibilità:

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> Puoi mantenere installato `i18next` in modo sicuro — l'adattatore di compatibilità lo usa come `devDependency` / `peerDependency` per i tipi TypeScript.

</Step>

<Step number={2} title="Configurare Intlayer">

Il comando `intlayer init` crea un file iniziale `intlayer.config.ts`. Aggiornalo affinché corrisponda alle tue lingue esistenti e indirizza il plugin `syncJSON` verso i tuoi file di messaggi:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Aggiungi qui tutti i tuoi locale esistenti
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // corrisponde alla sintassi dei placeholder di i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** mappa un locale al percorso del suo file JSON. **`location`** dice al watcher di Intlayer quale cartella monitorare per le modifiche. L'opzione `format: 'i18next'` assicura che i placeholder come `{{name}}` vengano interpretati correttamente.

</Step>

<Step number={3} title="Aggiornare l'Alias del Bundler (Opzionale)">

Se stai utilizzando un bundler (Vite, Webpack, esbuild), puoi iniettare un alias di modulo in modo che `import ... from 'i18next'` venga risolto automaticamente in `@intlayer/i18next`. Ciò rimuove la necessità di modificare manualmente le importazioni nell'intera codebase.

**Per Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()` avvolge il plugin `intlayer()` da `vite-intlayer` e aggiunge automaticamente l'alias `i18next` → `@intlayer/i18next` per te. Usare il normale plugin `intlayer()` di `vite-intlayer` compila i dizionari ma **non** aggiunge l'alias — in tal caso dovrai rinominare manualmente le importazioni a `@intlayer/i18next` (vedi passaggio successivo).

</Step>

</Steps>

Questo è tutto per la migrazione rapida. La tua app ora è in esecuzione su Intlayer pur mantenendo intatte tutte le importazioni e le API di `i18next`.

---

## Migrazione completa

I passaggi seguenti sono opzionali e possono essere eseguiti in modo incrementale. Sbloccano l'intera gamma delle funzionalità di Intlayer: editor visivo, CMS, file di contenuto tipizzati, automazione della traduzione basata sull'IA e altro ancora.

<Steps>

<Step number={4} title="Rinominare Esplicitamente le Importazioni (Opzionale)" isOptional={true}>

Se preferisci rendere esplicita la dipendenza nei tuoi file sorgente o non usi un plugin di bundler per creare l'alias delle importazioni, puoi rinominare le importazioni manualmente:

| Prima                                      | Dopo                                                 |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

Si tratta di **sostituzioni dirette** — non ci sono modifiche necessarie alle firme delle chiamate, agli argomenti o ai tipi di ritorno.

</Step>

<Step number={5} title="Abilitare l'Automazione della Traduzione IA" isOptional={true}>

Una volta configurato Intlayer, usa la CLI per inserire automaticamente le traduzioni mancanti:

```bash packageManager="npm"
# Testa le traduzioni mancanti (aggiungi alla CI)
npx intlayer test

# Compila le traduzioni mancanti tramite IA
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Aggiungi la configurazione dell'IA in `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // default
    // model: "gpt-4o-mini",   // default
  },
};

export default config;
```

> Controlla la [Documentazione CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md) per esplorare tutte le opzioni disponibili.

</Step>

</Steps>

---

## Cosa si può cancellare post-migrazione

Una volta installato l'adattatore di compatibilità, il seguente boilerplate standard di `i18next` può essere cancellato:

| File / Modello                             | Perché non è più necessario                                                                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chiamate a `i18next.init()`                | Intlayer inizializza tutto automaticamente; non vi è alcun passaggio di caricamento a runtime.                                                                   |
| `i18next.use(...)`                         | Intlayer non utilizza plugin, backend o rilevatori di lingua di i18next.                                                                                         |
| Bundle linguistici JSON (`locales/*.json`) | I bundle JSON sono necessari solo se si continua a utilizzare il plugin `syncJSON`. Una volta migrati verso file `.content.ts`, puoi rimuovere la cartella JSON. |

Quando sei pronto per andare oltre, Intlayer **scopre automaticamente ogni file `.content.ts` e `.content.json` ovunque nella tua codebase** (per impostazione predefinita, in qualsiasi punto all'interno di `./src`). Puoi posizionare un file `my-component.content.ts` proprio accanto alla logica associata, ed Intlayer lo rileverà a tempo di build senza alcuna configurazione aggiuntiva — nessuna importazione, nessuna registrazione, nessun file index centrale necessario. Questo rende la co-localizzazione delle traduzioni completamente fluida.

---

## Setup TypeScript

Intlayer sfrutta l'estensione dei moduli (module augmentation) per offrire un completamento automatico (IntelliSense) TypeScript completo per le tue chiavi di traduzione. Assicurati che il tuo `tsconfig.json` includa i tipi generati automaticamente:

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  "include": [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi auto-generati
  ],
}
```

---

## Configurazione Git

Aggiungi la directory generata da Intlayer al tuo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

---

## Esplora oltre

- **Editor Visivo** — Gestisci le traduzioni in modo visivo nel tuo browser: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)
- **CMS** — Esternalizza e gestisci i contenuti da remoto: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)
- **Estensione VS Code** — Ottieni il completamento automatico delle traduzioni e il rilevamento degli errori in tempo reale: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)
- **Riferimento CLI** — Elenco completo dei comandi CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md)
