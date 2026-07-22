---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrazione da next-intl a Intlayer | Internazionalizzazione (i18n)"
description: "Scopri come migrare la tua applicazione Next.js da next-intl a Intlayer — passo dopo passo, senza interrompere il tuo codice esistente. Utilizza l'adattatore di compatibilità @intlayer/next-intl per una transizione fluida."
keywords:
  - next-intl
  - intlayer
  - migrazione
  - internazionalizzazione
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrazione da next-intl a Intlayer

## Perché migrare da next-intl a Intlayer?

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

## Strategia di Migrazione

L'approccio raccomandato per le applicazioni esistenti è l'**adattatore di compatibilità**: Installa `@intlayer/next-intl`. Questo adattatore espone **esattamente la stessa API** di `next-intl`, ma delega tutto il lavoro di traduzione dietro le quinte a Intlayer.

Mantenere intatti i tuoi file esistenti `useTranslations`, `getTranslations`, `NextIntlClientProvider` e altri — **l'unico cambiamento necessario è il percorso di importazione**. Nessuna necessità di refactoring delle firme di chiamata, delle props o della struttura dei componenti.

Nel tempo, potrai opzionalmente migrare singoli file verso il formato più ricco `.content.ts` di Intlayer per sbloccare l'editor visivo, il CMS e lo scoping a livello di componente — ma questo passaggio è completamente opzionale e può essere fatto in modo incrementale.

---

## Indice

<TOC/>

---

## Migrazione rapida

I seguenti passaggi rappresentano il minimo indispensabile per far funzionare la tua app `next-intl` esistente su Intlayer, senza modifiche al codice sorgente.

<Steps>

<Step number={1} title="Installare le Dipendenze">

Installa i pacchetti principali di Intlayer e l'adattatore di compatibilità `@intlayer/next-intl`:

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
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

> Tieni installato `next-intl` — è ancora richiesto per il **routing degli URL** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). L'adattatore di compatibilità **non** sostituisce il layer di routing.

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
      // 'icu' corrisponde alla sintassi dei placeholder ICU di next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** mappa un locale al percorso del suo file JSON. **`location`** dice al watcher di Intlayer quale cartella monitorare per le modifiche. L'opzione `format: 'icu'` assicura che i placeholder ICU come `{name}` e `{count, plural, one {# item} other {# items}}` vengano analizzati correttamente.

> Vedi la [Documentazione di Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per un elenco completo delle opzioni disponibili.

</Step>

<Step number={3} title="Integrare il plugin Intlayer in Next.js">

Avvolgi la tua configurazione esistente in Next.js usando `createNextIntlPlugin` da `@intlayer/next-intl/plugin`. Questo wrapper applica `withIntlayer` **e** registra automaticamente l'alias `next-intl` → `@intlayer/next-intl`:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* Le tue opzioni di configurazione esistenti */
};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` avvolge `withIntlayer`, rileva automaticamente **Webpack** o **Turbopack**, si collega al watch dei contenuti, compila i dizionari e, soprattutto, **inietta alias per moduli**, così che le chiamate esistenti a `import … from 'next-intl'` vengano reindirizzate trasparentemente a `@intlayer/next-intl` a tempo di build. L'entry point di routing `next-intl/routing` continuerà a puntare al pacchetto reale. Non sono necessarie modifiche ai file sorgente.
>
> Preferisci usare il puro plugin `withIntlayer` da `next-intlayer/server`? Questo compila i dizionari ma **non** aggiunge gli alias di `next-intl` — in tal caso dovresti rinominare manualmente le importazioni a `@intlayer/next-intl` (vedi Passaggio 4).

> **`getRequestConfig` o `loadMessages` non sono più necessari.** Con `next-intl` era necessario scrivere un file `src/i18n.ts` che caricasse i messaggi JSON per ogni richiesta usando `getRequestConfig`. Intlayer compila tutti i dizionari **a tempo di build** (build-time), eliminando il passaggio di caricamento a runtime. Puoi eliminare tranquillamente questo file (oppure mantenere solo le parti di routing se continui a usare `createNavigation`).

</Step>

</Steps>

Questo è tutto per la migrazione rapida. La tua app ora è in esecuzione su Intlayer pur mantenendo intatte tutte le importazioni e le API di `next-intl`.

> **Chiavi di traduzione tipizzate — automaticamente.** Una volta che Intlayer compila i tuoi dizionari, `useTranslations` e `getTranslations` sono tipizzati sul tuo contenuto effettivo. Le chiavi si autocompleteranno nel tuo IDE e i percorsi non validi restituiranno errori TypeScript al momento della build, senza alcuna configurazione extra richiesta.
>
> ```tsx
> // Componente Client — 'about' è una chiave registrata nel dizionario
> const t = useTranslations("about");
> t("counter.label"); // ✓ autocompletato
> t("does.not.exist"); // ✗ Errore TypeScript
>
> // Componente Server
> const t = await getTranslations("about");
> t("counter.label"); // ✓ tipizzato
> ```

---

## Migrazione completa

I passaggi seguenti sono opzionali e possono essere eseguiti in modo incrementale. Sbloccano l'intera gamma delle funzionalità di Intlayer: editor visivo, CMS, file di contenuto tipizzati, automazione della traduzione basata sull'IA e altro ancora.

<Steps>

<Step number={4} title="Rinominare Esplicitamente le Importazioni (Opzionale)" isOptional={true}>

Il wrapper `createNextIntlPlugin()` gestisce già l'aliasing di `next-intl` → `@intlayer/next-intl` a livello di bundler. Se preferisci rendere la dipendenza esplicita nei tuoi file di codice (e usare invece il puro plugin `withIntlayer`), puoi rinominare le importazioni manualmente:

| Prima                                                | Dopo                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Mantieni sempre le importazioni di routing dal vero `next-intl` — l'adattatore di compatibilità **non** sostituisce il layer di routing URL:
>
> ```ts
> // ✅ Mantieni queste dal vero 'next-intl'
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> In alternativa, usare `defineRouting` da `@intlayer/next-intl/routing` permetterà l'unione automatica delle tue impostazioni locali in `intlayer.config.ts`.

</Step>

<Step number={5} title="Abilitare l'Automazione della Traduzione IA" isOptional={true}>

Una volta configurato Intlayer, usa la CLI per inserire automaticamente le traduzioni mancanti usando l'LLM di tua scelta:

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

Aggiungi `OPENAI_API_KEY` (o la chiave del tuo fornitore preferito) al tuo file `.env` ed estendi il tuo `intlayer.config.ts`:

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
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

Una volta configurato `@intlayer/next-intl`, il seguente boilerplate standard di `next-intl` può essere cancellato:

| File / Modello                                            | Perché non è più necessario                                                                                                                                                      |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L'export di `getRequestConfig` in `src/i18n.ts`           | Intlayer compila i dizionari a tempo di build; nessun caricamento di messaggi per-richiesta. Mantieni il file solo se esporta anche gli helper di routing di `createNavigation`. |
| La chiamata `loadMessages()` / `getMessages()` nel layout | `NextIntlClientProvider` da `@intlayer/next-intl` legge dall'output compilato; la prop `messages` non è richiesta.                                                               |
| Le importazioni di `locales/{locale}/*.json` nel layout   | I bundle JSON sono necessari solo se si continua a utilizzare il plugin `syncJSON`. Una volta migrati verso file `.content.ts`, puoi rimuovere la cartella JSON.                 |

Quando sei pronto per andare oltre, Intlayer **scopre automaticamente ogni file `.content.ts` e `.content.json` ovunque nella tua codebase** (per impostazione predefinita, in qualsiasi punto all'interno di `./src`). Puoi posizionare un file `about.content.ts` proprio accanto al tuo `about/page.tsx`, ed Intlayer lo rileverà a tempo di build senza alcuna configurazione aggiuntiva — nessuna importazione, nessuna registrazione, nessun file index centrale necessario. Questo rende la co-localizzazione delle traduzioni con pagine e componenti completamente fluida.

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
- **Intlayer con Next.js** — Guida completa all'installazione per Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)
