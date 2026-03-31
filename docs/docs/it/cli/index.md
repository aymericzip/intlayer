---
createdAt: 2024-08-11
updatedAt: 2026-03-31
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
---

# CLI di Intlayer - Tutti i comandi della CLI di Intlayer per il tuo sito web multilingue

---

## Sommario

<TOC/>

---

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

Questo pacchetto transpilerà tutti i file intlayer, come `src/**/*.content.{ts|js|mjs|cjs|json}`. [Scopri come dichiarare i tuoi file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/login.md)** - Autenticati con l'Intlayer CMS e ottieni le credenziali di accesso

### Comandi principali

- **[Costruisci Dizionari](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/build.md)** - Costruisci i tuoi dizionari dai file di dichiarazione dei contenuti
- **[Monitora Dizionari](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/watch.md)** - Monitora i cambiamenti e costruisci automaticamente i dizionari
- **[Crea Bundle Standalone](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/standalone.md)** - Crea un bundle JavaScript standalone contenente Intlayer e i pacchetti specificati
- **[Controlla Versione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/version.md)** - Controlla la versione installata della CLI di Intlayer
- **[Elenca Progetti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/list_projects.md)** - Elenca tutti i progetti Intlayer in una directory o in un repository Git

### Gestione dei dizionari

- **[Invia Dizionari (Push)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/push.md)** - Invia i dizionari all'editor di Intlayer e al CMS
- **[Recupera Dizionari (Pull)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/pull.md)** - Recupera i dizionari dall'editor di Intlayer e dal CMS
- **[Riempi Dizionari](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md)** - Riempi, esamina e traduci i dizionari utilizzando l'IA
- **[Testa Traduzioni Mancanti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/test.md)** - Testa e identifica le traduzioni mancanti
- **[Elenca File di Dichiarazione dei Contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/list.md)** - Elenca tutti i file di dichiarazione dei contenuti nel tuo progetto

### Gestione dei componenti

- **[Estrai Stringhe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md)** - Estrai le stringhe dai componenti in un file .content vicino al componente

### Configurazione

- **[Inizializza Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/init.md)** - Configura Intlayer nel tuo progetto con la configurazione automatica
- **[Gestisci Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/configuration.md)** - Ottieni e invia la tua configurazione Intlayer al CMS

### Gestione della documentazione

- **[Traduci Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-translate.md)** - Traduci automaticamente i file di documentazione utilizzando l'IA
- **[Esamina Documento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/doc-review.md)** - Esamina i file di documentazione per qualità e coerenza

### Editor e Live Sync

- **[Comandi Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/editor.md)** - Usa i comandi dell'editor di Intlayer
- **[Comandi Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/live.md)** - Usa Live Sync per riflettere le modifiche ai contenuti del CMS in fase di esecuzione

### CI/CD e Automazione

- **[Comando CI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/ci.md)** - Esegui i comandi di Intlayer con credenziali auto-iniettate per le pipeline CI/CD

### Strumenti di sviluppo

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/sdk.md)** - Usa l'SDK della CLI di Intlayer nel tuo codice
- **[Comando di Debug Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/debug.md)** - Esegui il debug e risolvi i problemi della CLI di Intlayer

## Usa i comandi intlayer nel tuo `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
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
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Nota**: Puoi anche usare gli alias più brevi:
>
> - `npx intlayer list` invece di `npx intlayer content list`
> - `npx intlayer test` invece di `npx intlayer content test`
> - `npx intlayer projects-list` o `npx intlayer pl` invece di `npx intlayer projects list`
