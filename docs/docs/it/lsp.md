---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Server LSP Intlayer
description: Scopri come il server di linguaggio Intlayer fornisce la funzionalità "Vai alla definizione" e altre funzionalità IDE per useIntlayer, getIntlayer e chiamate correlate in tutti gli editor supportati.
keywords:
  - LSP
  - Server di linguaggio
  - Vai alla definizione
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
---

# Server LSP Intlayer

Il **Server di linguaggio Intlayer (LSP)** è un'implementazione del [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) che arricchisce il tuo IDE con un'intelligenza consapevole di Intlayer. Attualmente fornisce la funzionalità **Vai alla definizione (Go to Definition)** per le chiamate alle chiavi del dizionario, consentendoti di saltare direttamente da `useIntlayer("my-key")` nel tuo componente al file `.content.ts` che lo dichiara.

---

## Perché usare l'LSP?

Quando usi Intlayer, la connessione tra una chiamata come `useIntlayer("homepage")` e la sua dichiarazione in `src/homepage.content.ts` è implicita. Senza strumenti dedicati, dovresti cercare il file manualmente. L'LSP rende questo collegamento esplicito:

**Consapevolezza dell'agente AI**

Gli agenti di programmazione AI (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) si affidano al server di linguaggio per risolvere i simboli e comprendere le relazioni tra i file. Con l'LSP di Intlayer in esecuzione, gli agenti possono seguire `useIntlayer("key")` fino alla sua dichiarazione, ottenendo un contesto accurato sulle chiavi di contenuto disponibili, la struttura di ciascun dizionario e quali file leggere o modificare.

**Vai alla definizione**

Posiziona il cursore su qualsiasi stringa chiave del dizionario all'interno di una chiamata getter supportata e premi `F12` (o `Cmd/Ctrl+Click`). L'editor apre il file di dichiarazione del contenuto e posiziona il cursore sulla riga `key:`.

**Supporto per dizionari uniti**

Una chiave può essere suddivisa in più file di contenuto (Intlayer li unisce). Il server restituisce una posizione (`Location`) per file sorgente, consentendoti di navigare in ogni dichiarazione.

**Funziona ovunque**

Supporta tutti i pacchetti `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Chiamate getter supportate

Il server rileva le seguenti chiamate di funzione ed estrae il primo argomento stringa letterale come chiave del dizionario:

| Funzione      | Esempio                       |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

I generici TypeScript e gli argomenti extra vengono ignorati: conta solo la stringa della chiave.

> `useDictionary` e `getDictionary` accettano un oggetto `Dictionary` già importato come primo argomento anziché una chiave stringa, pertanto non beneficiano della funzionalità Vai alla definizione e non sono tracciati dal server.

---

## Installazione

Il server LSP è distribuito come parte di `@intlayer/lsp`:

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

Il pacchetto espone il binario `intlayer-lsp`, che gli editor utilizzano come eseguibile del server.

---

## Configurazione come plugin di Claude Code

L'LSP Intlayer è disponibile come **plugin di Claude Code** ospitato direttamente nel repository GitHub di Intlayer. Installarlo fornisce a Claude Code una consapevolezza nativa di Vai alla definizione per tutte le tue chiamate `useIntlayer` / `getIntlayer`.

### 1. Installa il binario del server di linguaggio

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

Questo inserisce il binario `intlayer-lsp` nel tuo PATH, che è ciò che richiama la voce `lspServers` del plugin.

### 2. Registra il marketplace di Intlayer e installa il plugin

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code aggiungerà `"intlayer-lsp@intlayer": true` ai tuoi `enabledPlugins` e avvierà automaticamente il server di linguaggio sui tipi di file supportati (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Abilita lo strumento LSP (se non è già attivo)

Alcune versioni di Claude Code richiedono l'impostazione del flag di funzionalità LSP. Aggiungi quanto segue al tuo file `~/.claude/settings.json` se Vai alla definizione non funziona dopo l'installazione:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Riavvia Claude Code: ora utilizzerà `goToDefinition`, `findReferences` e altre operazioni LSP durante la navigazione nella base di codice Intlayer anziché ripiegare su `grep`.

---

## Configurazione in VS Code (tramite estensione — consigliato)

Se hai installato l'**estensione Intlayer per VS Code**, il server di linguaggio si avvia automaticamente. Non è richiesta alcuna configurazione aggiuntiva.

> Consulta la [documentazione dell'estensione VS Code](https://intlayer.org/doc/vs-code-extension) per l'installazione e altre funzionalità.

---

## Configurazione manuale in VS Code

Se non utilizzi l'estensione Intlayer, puoi configurare il server di linguaggio manualmente utilizzando un'estensione client LSP generica come [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) o scrivendo una tua piccola estensione. L'approccio consigliato consiste nell'utilizzare l'estensione Intlayer.

Per riferimento, il server viene avviato tramite il binario `intlayer-lsp` su stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

L'estensione Intlayer legge queste impostazioni per avviare il server. Se ti affidi esclusivamente all'estensione, non sono necessarie impostazioni manuali.

---

## Configurazione in Cursor

[Cursor](https://www.cursor.com/) è un fork di VS Code con funzionalità AI integrate. Utilizza lo stesso ecosistema di estensioni, quindi l'**estensione Intlayer per VS Code** funziona senza alcuna configurazione aggiuntiva: installala una volta e Cursor la rileverà automaticamente.

Se preferisci una configurazione manuale, Cursor legge anche `.vscode/settings.json` dalla radice dell'area di lavoro, quindi lo snippet di VS Code sopra si applica direttamente.

---

## Configurazione in Windsurf

[Windsurf](https://windsurf.com/) (di Codeium) è un altro editor basato su VS Code. Installa l'estensione Intlayer dal VS Code Marketplace e il server di linguaggio si attiverà automaticamente, esattamente come accade in VS Code e Cursor.

Per la configurazione manuale, crea `.vscode/settings.json` nella radice del progetto:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Configurazione in Zed

[Zed](https://zed.dev/) offre un supporto LSP nativo tramite le sue impostazioni di lingua. Aggiungi una voce nelle tue impostazioni utente di Zed (`~/.config/zed/settings.json`):

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

Il segnaposto `"..."` indica a Zed di mantenere i suoi server di linguaggio predefiniti insieme a quello di Intlayer.

---

## Configurazione per CLI di agenti AI (Claude Code, Codex, ecc.)

**Claude Code** offre un supporto di prim'ordine per i plugin LSP: segui la [configurazione del plugin Claude Code](#configurazione-come-plugin-di-claude-code) sopra per ottenere l'esperienza completa di Vai alla definizione direttamente nelle tue sessioni di terminale.

**OpenAI Codex** e altri strumenti basati su terminale non fungono ancora da client LSP: leggono e scrivono i file direttamente anziché mantenere una sessione di server di linguaggio persistente. Per tali strumenti, il valore di avere l'LSP in esecuzione deriva indirettamente: quando il server è attivo in un editor complementare (VS Code, Cursor, Windsurf, ...), l'indice in tempo reale dell'editor è disponibile per qualsiasi agente AI in grado di interrogarlo tramite il contesto fornito dall'editor (ad esempio, Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

Se lavori esclusivamente in un terminale senza un editor aperto, puoi avviare il server di linguaggio in background in modo che sia pronto per qualsiasi editor che si collegherà successivamente alla stessa area di lavoro:

```bash
# Mantieni il server attivo in background
npx @intlayer/lsp &
```

---

## Configurazione manuale in Neovim

Utilizzando [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), registra una configurazione del server personalizzata:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Avvia il server con npx per evitare un'installazione globale
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

Dopo aver riavviato Neovim, premendo `gd` su una chiave Intlayer verrà avviata la funzionalità Vai alla definizione.

---

## Configurazione manuale in altri editor

Qualsiasi editor che supporti il Language Server Protocol può utilizzare `@intlayer/lsp`. Il server fornisce:

- **Trasporto** – Node.js IPC / stdio (standard)
- **Eseguibile** – `npx @intlayer/lsp` (o il binario `intlayer-lsp` installato localmente)
- **Funzionalità** – `definitionProvider: true`, `textDocumentSync: Incremental`

Consulta la documentazione LSP del tuo editor per il formato di configurazione esatto (ad esempio, `languageserver.json` per [coc.nvim](https://github.com/neoclide/coc.nvim) o le impostazioni del client LSP in [Helix](https://helix-editor.com)).

### Esempio: coc.nvim

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

### Esempio: Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## Come funziona

Quando il server si avvia, risolve la configurazione di Intlayer dalla radice dell'area di lavoro utilizzando `getConfiguration()`. Questo gli fornisce i percorsi `build` e `system` necessari per trovare i dizionari compilati.

Su ogni richiesta di **Vai alla definizione**:

1. Il server legge il testo completo del documento aperto.
2. Esegue una scansione per trovare le chiamate getter (`useIntlayer`, `getIntlayer`, ecc.) utilizzando una espressione regolare.
3. Verifica se la posizione del cursore rientra all'interno di una di quelle chiamate.
4. In caso affermativo, estrae la chiave del dizionario (gruppo di cattura 3 dell'espressione regolare) e chiama `getUnmergedDictionaries()` per individuare ogni file di contenuto che dichiara quella chiave.
5. Legge ciascun file corrispondente e trova la riga esatta contenente `key: "<key>"` per posizionare il cursore in modo preciso.
6. Restituisce un array di oggetti `Location` — uno per file sorgente.

La configurazione viene risolta in modo lazy e memorizzata nella cache per sessione; si reimposta su ciascuna richiesta `initialize` (ad esempio, quando si apre una nuova cartella dell'area di lavoro).

---

## Risoluzione dei problemi

| Sintomo                                    | Causa probabile                    | Soluzione                                                                                            |
| ------------------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Vai alla definizione non fa nulla          | Il server non è in esecuzione      | Verifica che `@intlayer/lsp` sia installato e che l'editor lo stia avviando                          |
| Rilevata radice dell'area di lavoro errata | Più cartelle dell'area di lavoro   | Assicurati che la cartella contenente `intlayer.config.ts` sia la prima cartella dell'area di lavoro |
| Definizioni non trovate per una chiave     | Configurazione non risolta         | Verifica che `intlayer.config.ts` (o `.js`) esista nella radice dell'area di lavoro                  |
| Il server si blocca all'avvio              | Versione di Node.js troppo vecchia | Richiede Node.js ≥ 14.18                                                                             |
