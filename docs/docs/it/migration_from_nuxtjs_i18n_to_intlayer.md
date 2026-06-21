---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrazione da @nuxtjs/i18n a Intlayer | Internazionalizzazione (i18n)"
description: "Scopri come migrare la tua applicazione Nuxt da @nuxtjs/i18n a Intlayer — passo dopo passo, senza interrompere il tuo codice esistente. Utilizza l'adattatore di compatibilità @intlayer/vue-i18n per una transizione fluida."
keywords:
  - "@nuxtjs/i18n"
  - vue-i18n
  - intlayer
  - migrazione
  - internazionalizzazione
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrazione da @nuxtjs/i18n a Intlayer

## Perché migrare da @nuxtjs/i18n a Intlayer?

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

Dato che `@nuxtjs/i18n` utilizza sotto il cofano `vue-i18n`, ci sono due strategie complementari per migrare a Intlayer:

1. **Adattatore di compatibilità (consigliato per app esistenti)** — Installa `@intlayer/vue-i18n` e `nuxt-intlayer`. Questi espongono **esattamente la stessa API** di `vue-i18n` ma delegano tutto il lavoro di traduzione a Intlayer. Mantieni intatte le chiamate esistenti a `$t`, `useI18n()` e il routing Nuxt — l'unica cosa che cambia è l'inizializzazione.

2. **Migrazione completa** — Sostituisci gradualmente le API di `@nuxtjs/i18n` con gli hook nativi Intlayer (`useIntlayer`) e co-localizza i contenuti nei file `.content.ts` accanto ai tuoi componenti.

Questa guida tratta prima la **Strategia 1** (adattatore di compatibilità drop-in), e poi esamina la migrazione completa opzionale.

---

## Indice

<TOC/>

---

## Migrazione rapida

I seguenti passaggi rappresentano il minimo indispensabile per far funzionare la tua app Nuxt esistente su Intlayer, senza modifiche al codice dei componenti.

<Steps>

<Step number={1} title="Installare le Dipendenze">

Installa i pacchetti principali di Intlayer e l'adattatore di compatibilità:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> Questo comando rileverà il tuo ambiente e installerà i pacchetti richiesti. Ad esempio:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Puoi mantenere in modo sicuro l'installazione di `@nuxtjs/i18n` durante la migrazione (lo rimuoveremo dalla configurazione di Nuxt a breve).

</Step>

<Step number={2} title="Configurare Intlayer">

Il comando `intlayer init` crea un file iniziale `intlayer.config.ts`. Aggiornalo affinché corrisponda alle tue lingue esistenti e indirizza il plugin `syncJSON` ai tuoi file di messaggi:

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
      // corrisponde alla sintassi dei placeholder di vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`** mappa un locale al percorso del file JSON. **`location`** dice al watcher di Intlayer quale cartella monitorare per le modifiche. L'opzione `format: 'icu'` assicura che i placeholder di `vue-i18n` vengano interpretati correttamente.

</Step>

<Step number={3} title="Aggiornare la Configurazione Nuxt">

Sostituisci il modulo `@nuxtjs/i18n` con `nuxt-intlayer` in `nuxt.config.ts`. Il plugin Intlayer inietta automaticamente alias di moduli in modo che le tue importazioni esistenti di `import { useI18n } from 'vue-i18n'` vengano reindirizzate fluidamente a `@intlayer/vue-i18n`.

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // Rimuovi '@nuxtjs/i18n'
  modules: ["nuxt-intlayer"],
});
```

> **Non hai più bisogno di definire un oggetto di configurazione i18n per Nuxt.** Intlayer compila tutti i dizionari **a tempo di build** (build-time), gestendo il rilevamento del locale, il routing e il caricamento dei dizionari senza soluzione di continuità.

</Step>

</Steps>

Questo è tutto per la migrazione rapida. La tua app Nuxt ora è in esecuzione su Intlayer pur mantenendo intatte tutte le chiamate a `$t` e `useI18n()`.

---

## Migrazione completa

I passaggi seguenti sono opzionali e possono essere eseguiti in modo incrementale. Sbloccano l'intera gamma delle funzionalità di Intlayer: editor visivo, CMS, file di contenuto tipizzati, automazione della traduzione basata sull'IA e altro ancora.

<Steps>

<Step number={4} title="Rinominare Esplicitamente le Importazioni (Opzionale)" isOptional={true}>

Il plugin di Intlayer gestisce già l'aliasing a livello di bundler. Se preferisci rendere esplicita la dipendenza nei tuoi file sorgente, puoi rinominare le importazioni manualmente:

| Prima                                | Dopo                                           |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

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
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
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

Una volta installato l'adattatore di compatibilità, il seguente boilerplate standard di `@nuxtjs/i18n` può essere cancellato:

| File / Modello                             | Perché non è più necessario                                                                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Configurazione `i18n` in `nuxt.config.ts`  | Intlayer gestisce internamente il routing, il caricamento dei dizionari e il locale di default.                                                                  |
| `@nuxtjs/i18n` nel `package.json`          | Sostituito completamente da `nuxt-intlayer`.                                                                                                                     |
| Bundle linguistici JSON (`locales/*.json`) | I bundle JSON sono necessari solo se si continua a utilizzare il plugin `syncJSON`. Una volta migrati verso file `.content.ts`, puoi rimuovere la cartella JSON. |

Quando sei pronto per andare oltre, Intlayer **scopre automaticamente ogni file `.content.ts` e `.content.json` ovunque nella tua codebase** (per impostazione predefinita, in qualsiasi punto all'interno di `./src`). Puoi posizionare un file `my-component.content.ts` proprio accanto al tuo `MyComponent.vue`, ed Intlayer lo rileverà a tempo di build senza alcuna configurazione aggiuntiva — nessuna importazione, nessuna registrazione, nessun file index centrale necessario. Questo rende la co-localizzazione delle traduzioni con pagine e componenti completamente fluida.

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
- **Intlayer con Nuxt** — Guida completa all'installazione per Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nuxt.md)
- **Intlayer con Vue** — Guida completa all'installazione per Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+vue.md)
