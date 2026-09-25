---
createdAt: 2024-08-11
updatedAt: 2026-09-23
title: CLI - Tutti i comandi della CLI di Intlayer per il tuo sito web multilingue
description: Scopri come utilizzare la CLI di Intlayer per gestire il tuo sito web multilingue. Segui i passaggi in questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - CLI
  - Interfaccia della linea di comando
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Aggiungi il comando upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Aggiungi il comando init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Sostituzione del comando `ci` con il flag `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Aggiunto comando scan"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Aggiunto comando standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Aggiunto comando CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Aggiunto comando list projects"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Aggiunto comando init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Aggiunto comando extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Aggiunta opzione skipIfExists al comando translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Aggiunti alias per argomenti e comandi della CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Aggiunta opzione build ai comandi"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Aggiunto comando version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Impostata opzione verbose su true di default usando la CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Aggiunto comando watch e opzione with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Aggiunto comando editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Aggiunti comandi content test e list"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Aggiornata documentazione dei parametri dei comandi CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizializzazione cronologia"
author: aymericzip
---

# CLI di Intlayer - Tutti i comandi della CLI di Intlayer per il tuo sito web multilingue

## Sommario

<TOC/>

## Installazione del pacchetto

Installa i pacchetti necessari utilizzando npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Se il pacchetto `intlayer` è già installato, la CLI viene installata automaticamente. Puoi saltare questo passaggio.

## pacchetto intlayer-cli

Il pacchetto `intlayer-cli` è destinato a transpilare le tue [dichiarazioni intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md) in dizionari.

Questo pacchetto transpilerà tutti i file intlayer, come `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Scopri come dichiarare i tuoi file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Per interpretare i dizionari intlayer puoi utilizzare interpreti, come [react-intlayer](https://www.npmjs.com/package/react-intlayer) o [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Supporto dei file di configurazione

Intlayer accetta più formati di file di configurazione:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Per vedere come configurare le lingue disponibili o altri parametri, fai riferimento alla [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Eseguire i comandi intlayer

### Autenticazione

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/login" />
</TechGrid>

> `intlayer login` rilascia una **chiave di accesso** (`clientId` / `clientSecret`) che ogni comando autenticato utilizza. Il secret è una credenziale lato server e non raggiunge mai il tuo client bundle — vedi [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/login.md#keeping-the-access-key-safe).

### Comandi principali

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/list_projects" />
</TechGrid>

### Gestione dei dizionari

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/list" />
</TechGrid>

### Gestione dei componenti

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract" />
</TechGrid>

### Configurazione

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/configuration" />
</TechGrid>

### Gestione della documentazione

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-review" />
</TechGrid>

### Editor e Live Sync

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/live" />
</TechGrid>

### Controllo & Diagnostica

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/scan" />
</TechGrid>

### Strumenti di sviluppo

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/debug" />
</TechGrid>

## Usa i comandi intlayer nel tuo `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Nota**: Puoi anche usare gli alias più brevi:
>
> - `npx intlayer list` invece di `npx intlayer content list`
> - `npx intlayer test` invece di `npx intlayer content test`
> - `npx intlayer projects-list` o `npx intlayer pl` invece di `npx intlayer projects list`
