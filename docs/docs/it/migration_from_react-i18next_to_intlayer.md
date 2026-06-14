---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrazione da react-i18next / i18next a Intlayer | Internazionalizzazione (i18n)"
description: "Scopri come migrare la tua applicazione React o Next.js da react-i18next o i18next a Intlayer — passo dopo passo, senza interrompere il tuo codice esistente. Utilizza gli adattatori di compatibilità @intlayer/react-i18next e @intlayer/i18next per una transizione fluida."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migrazione
  - internazionalizzazione
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrazione da react-i18next / i18next a Intlayer

## Perché migrare da react-i18next / i18next a Intlayer?

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

Ci sono due strategie complementari per migrare da `react-i18next` / `i18next` a Intlayer:

1. **Adattatore di compatibilità (consigliato per app esistenti)** — Installa `@intlayer/react-i18next` (per componenti React) e/o `@intlayer/i18next` (per l'istanza `i18n` principale). Questi pacchetti espongono **esattamente la stessa API** di `react-i18next` / `i18next` ma delegano tutto il lavoro di traduzione a Intlayer. Mantieni intatte le chiamate esistenti a `useTranslation`, `Trans`, `withTranslation`, `i18next.t()` — l'unica cosa che cambia è il percorso di importazione.

2. **Migrazione completa** — Sostituisci gradualmente le API di `react-i18next` con gli hook nativi Intlayer (`useIntlayer`, `IntlayerProvider`) e co-localizza i contenuti nei file `.content.ts` accanto ai tuoi componenti.

Questa guida tratta prima la **Strategia 1** (adattatore di compatibilità drop-in), e poi esamina la migrazione completa opzionale.

---

## Indice

<TOC/>

---

## Migrazione rapida

I seguenti passaggi rappresentano il minimo indispensabile per far funzionare la tua app `react-i18next` esistente su Intlayer, senza modifiche al codice dei componenti.

<Steps>

<Step number={1} title="Installare le Dipendenze">

Installa i pacchetti principali di Intlayer e l'adattatore di compatibilità:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> Puoi mantenere installato in modo sicuro `react-i18next` e `i18next` — l'adattatore di compatibilità li usa come `devDependencies` / `peerDependencies` opzionali per i tipi TypeScript. Non devi modificare alcuna dipendenza peer nel tuo `package.json`.

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
      // corrisponde alla sintassi dei placeholder di react-i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** mappa un locale al percorso del file JSON. **`location`** dice al watcher di Intlayer quale cartella monitorare per le modifiche. L'opzione `format: 'i18next'` assicura che i placeholder come `{{name}}` vengano interpretati correttamente.

</Step>

<Step number={3} title="Aggiungere i plugin Intlayer al tuo bundler">

Avvolgi la configurazione del tuo bundler esistente con il plugin di compatibilità. Questo aggrega il plugin base di Intlayer, abilita l'osservazione dei contenuti e, soprattutto, **inietta alias per moduli**, così che le chiamate esistenti a `import … from 'react-i18next'` (e `'i18next'`) vengano reindirizzate trasparentemente a `@intlayer/react-i18next` / `@intlayer/i18next` a tempo di build. Non sono necessarie modifiche ai file sorgente.

**Per Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` avvolge il plugin `intlayer()` da `vite-intlayer` e aggiunge automaticamente gli alias per `react-i18next` / `i18next`. Usare il normale plugin `intlayer()` di `vite-intlayer` compila i dizionari ma **non** aggiunge gli alias — in tal caso dovrai rinominare manualmente le importazioni a `@intlayer/*` (vedi passaggio 4).

**Per Next.js:**

Se usi `next-i18next` (integrazione Pages Router), installa `@intlayer/next-i18next` e `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Poi, aggiungi il plugin di compatibilità a `next.config.ts` (questo inietta gli alias per `next-i18next` / `react-i18next` / `i18next`):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  /* le tue opzioni di configurazione */
};

export default withIntlayer(nextConfig);
```

> **`i18next.init()` o il bootstrap manuale dei provider non è più necessario.** Intlayer compila tutti i dizionari **a tempo di build** (build-time), eliminando il passaggio di caricamento a runtime. L'alias sul Provider gestisce l'inizializzazione.

</Step>

</Steps>

Questo è tutto per la migrazione rapida. La tua app ora è in esecuzione su Intlayer pur mantenendo intatte tutte le importazioni e le API di `react-i18next`.

> **Chiavi di traduzione tipizzate — automaticamente.** Una volta che Intlayer ha compilato i tuoi dizionari, `useTranslation` e `getFixedT` sono tipizzati in base ai tuoi contenuti reali. Le chiavi si autocompleteranno nel tuo IDE e percorsi invalidi produrranno errori TypeScript a tempo di compilazione — nessuna configurazione aggiuntiva necessaria.
>
> ```tsx
> // 'about' è una chiave registrata nel dizionario → t() accetta solo percorsi validi
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autocompletato
> t("does.not.exist"); // ✗ Errore TypeScript
>
> // Lato Server (istanza i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ tipizzato
> ```

---

## Migrazione completa

I passaggi seguenti sono opzionali e possono essere eseguiti in modo incrementale. Sbloccano l'intera gamma delle funzionalità di Intlayer: editor visivo, CMS, file di contenuto tipizzati, automazione della traduzione basata sull'IA e altro ancora.

<Steps>

<Step number={4} title="Rinominare Esplicitamente le Importazioni (Opzionale)" isOptional={true}>

Il plugin di Intlayer gestisce già l'aliasing a livello di bundler. Se preferisci rendere esplicita la dipendenza nei tuoi file sorgente, puoi rinominare le importazioni manualmente:

| Prima                                              | Dopo                                                         |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Per Next.js (`next-i18next`):

| Prima                                                                          | Dopo                                                              |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

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

Una volta installato l'adattatore di compatibilità, il seguente boilerplate standard di `react-i18next` / `i18next` può essere cancellato:

| File / Modello                             | Perché non è più necessario                                                                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chiamate a `i18next.init()`                | Intlayer Provider inizializza tutto automaticamente; non vi è alcun passaggio di caricamento a runtime.                                                          |
| `I18nextProvider` / `initReactI18next`     | Il plugin di Intlayer si occupa dell'iniezione e del bootstrapping sotto il cofano.                                                                              |
| Bundle linguistici JSON (`locales/*.json`) | I bundle JSON sono necessari solo se si continua a utilizzare il plugin `syncJSON`. Una volta migrati verso file `.content.ts`, puoi rimuovere la cartella JSON. |

Quando sei pronto per andare oltre, Intlayer **scopre automaticamente ogni file `.content.ts` e `.content.json` ovunque nella tua codebase** (per impostazione predefinita, in qualsiasi punto all'interno di `./src`). Puoi posizionare un file `my-component.content.ts` proprio accanto al tuo `MyComponent.tsx`, ed Intlayer lo rileverà a tempo di build senza alcuna configurazione aggiuntiva — nessuna importazione, nessuna registrazione, nessun file index centrale necessario. Questo rende la co-localizzazione delle traduzioni con pagine e componenti completamente fluida.

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
- **Intlayer con React** — Guida completa all'installazione per React: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)
- **Intlayer con Next.js** — Guida completa all'installazione per Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)
