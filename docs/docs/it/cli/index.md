---
createdAt: 2024-08-11
updatedAt: 2025-12-30
title: CLI
description: Scopri come utilizzare la CLI di Intlayer per gestire il tuo sito web multilingue. Segui i passaggi in questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - CLI
  - Interfaccia a Riga di Comando
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
  - version: 7.5.9
    date: 2025-12-30
    changes: Aggiunto comando init
  - version: 7.2.3
    date: 2025-11-22
    changes: Aggiunto comando transform
  - version: 7.1.0
    date: 2025-11-05
    changes: Aggiunta opzione skipIfExists al comando translate
  - version: 6.1.4
    date: 2025-01-27
    changes: Aggiunti alias per argomenti e comandi CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Aggiunta opzione build ai comandi
  - version: 6.1.2
    date: 2025-09-26
    changes: Aggiunto comando version
  - version: 6.1.0
    date: 2025-09-26
    changes: Impostata l'opzione verbose su true di default tramite CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Aggiunto comando watch e opzione with
  - version: 6.0.1
    date: 2025-09-23
    changes: Aggiunto comando editor
  - version: 6.0.0
    date: 2025-09-17
    changes: Aggiunti comandi content test e list
  - version: 5.5.11
    date: 2025-07-11
    changes: Aggiornata documentazione dei parametri dei comandi CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Inizializzata la cronologia
---

# CLI di Intlayer

---

## Indice

<TOC/>

---

## Installare il Pacchetto

Installa i pacchetti necessari usando npm:

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

> Se il pacchetto `intlayer` è già installato, il CLI viene installato automaticamente. Puoi saltare questo passaggio.

## Pacchetto intlayer-cli

Il pacchetto `intlayer-cli` ha lo scopo di transpile le tue [dichiarazioni intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md) in dizionari.

Questo pacchetto transpilerà tutti i file intlayer, come `src/**/*.content.{ts|js|mjs|cjs|json}`. [Vedi come dichiarare i tuoi file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Per interpretare i dizionari intlayer puoi utilizzare interpreter, come [react-intlayer](https://www.npmjs.com/package/react-intlayer), o [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Supporto per i file di configurazione

Intlayer accetta diversi formati di file di configurazione:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Per vedere come configurare le localizzazioni disponibili o altri parametri, consulta la [documentazione sulla configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Esegui i comandi di intlayer

### Autenticazione

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/login.md)** - Autenticati con il CMS di Intlayer e ottieni le credenziali di accesso

### Comandi principali

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/build.md)** - Costruisci i tuoi dizionari dai file di dichiarazione dei contenuti
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/watch.md)** - Monitora le modifiche e costruisci automaticamente i dizionari
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/version.md)** - Controlla la versione installata della CLI di Intlayer

### Gestione dei Dizionari

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/push.md)** - Invia i dizionari all'editor e CMS di Intlayer
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/pull.md)** - Scarica i dizionari dall'editor e CMS di Intlayer
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md)** - Compila, verifica e traduci i dizionari usando l'AI
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/test.md)** - Testa e identifica le traduzioni mancanti
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/list.md)** - Elenca tutti i file di dichiarazione dei contenuti nel tuo progetto

### Gestione Componenti

- **[Trasforma Componenti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/transform.md)** - Trasforma i componenti esistenti per utilizzare Intlayer

### Configurazione

- **[Inizializza Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/init.md)** - Configura Intlayer nel tuo progetto con configurazione automatica
- **[Gestisci Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/configuration.md)** - Ottieni e invia la tua configurazione Intlayer al CMS

### Gestione Documentazione

- **[Traduci Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-translate.md)** - Traduce automaticamente i file di documentazione usando l'AI
- **[Revisiona Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-review.md)** - Revisiona i file di documentazione per qualità e coerenza

### Editor & Live Sync

- **[Comandi Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/editor.md)** - Usa i comandi dell'editor Intlayer
- **[Comandi Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/live.md)** - Usa Live Sync per riflettere le modifiche dei contenuti CMS in tempo reale

## Usa i comandi intlayer nel tuo `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Nota**: Puoi anche usare gli alias più brevi:
>
> - `npx intlayer list` invece di `npx intlayer content list`
> - `npx intlayer test` invece di `npx intlayer content test`
