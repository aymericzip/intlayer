---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Server LSP di Intlayer
description: Scopri come il language server di Intlayer porta Go-to-Definition, ricerca dei riferimenti, anteprime al passaggio del mouse, autocompletamento delle chiavi e diagnostica nel tuo IDE e nel tuo agente IA.
keywords:
  - LSP
  - Language Server
  - Go to Definition
  - Autocompletamento
  - Diagnostica
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "Aggiunti ricerca dei riferimenti, hover, autocompletamento e diagnostica"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Server LSP di Intlayer

Il **language server di Intlayer** è un'implementazione del [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) che rende il tuo IDE — e il tuo agente IA — consapevole di Intlayer. Collega una chiamata come `useIntlayer("home")` al file `.content.ts` che la dichiara, in entrambe le direzioni.

---

## Funzionalità

| Funzionalità                  | Scorciatoia         | Descrizione                                                                                                                  |
| ----------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Vai alla definizione**      | `F12` / `Cmd+Clic`  | Passare da una chiave di dizionario o dall'uso di un campo alla sua dichiarazione nel file di contenuto                      |
| **Trova tutti i riferimenti** | `Maiusc+F12`        | Da un file di contenuto, elencare ogni punto di chiamata che usa quella chiave o quel campo                                  |
| **Hover**                     | passare il cursore  | Visualizzare i campi di un dizionario, o il valore tradotto di un campo, senza lasciare il file                              |
| **Autocompletamento**         | `"` `'` `` ` `` `.` | Suggerire le chiavi di dizionario dichiarate dentro un getter, e i campi di contenuto dopo `.` o durante la destrutturazione |
| **Diagnostica**               | automatico          | Avvisare quando una chiave non è dichiarata in nessun file di contenuto                                                      |

Vale la pena conoscere due comportamenti aggiuntivi:

- **Dizionari uniti** — una chiave suddivisa su più file di contenuto restituisce un risultato per file, così puoi navigare a ogni dichiarazione.
- **Compatibile con i monorepo** — il server risolve l'`intlayer.config.*` _più vicino_ a ciascun file, così più progetti in uno stesso workspace hanno ciascuno i propri dizionari.

### Chiamate supportate

La chiave viene letta da un argomento posizionale di tipo stringa oppure da un oggetto di opzioni (`{ namespace }`, `{ id }`).

| Libreria                    | Chiamate                                                 |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

Funziona per ogni pacchetto `*-intlayer` (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`) e per i pacchetti adattatori compat che ti permettono di mantenere la sintassi i18n esistente.

> I dizionari vengono letti dall'output di build: esegui `npx intlayer build` — o tieni attivo il server di sviluppo — per dare al server qualcosa da risolvere.

---

## Installazione

Il server è distribuito come binario `intlayer-lsp` in `@intlayer/lsp`:

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

Installalo invece globalmente (`npm install -g @intlayer/lsp`) se il tuo editor richiede `intlayer-lsp` nel `PATH` — è il caso del plugin per Claude Code e di qualsiasi configurazione qui sotto che invochi direttamente il binario.

---

## Configurazione

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Installa l'[estensione VS Code di Intlayer](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). Il language server è incluso dalla v8.12.0 e si avvia automaticamente — **nessuna configurazione richiesta**.

Consulta la [documentazione dell'estensione VS Code](https://intlayer.org/doc/vs-code-extension) per le altre funzionalità.

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) e [Windsurf](https://windsurf.com/) sono fork di VS Code e usano lo stesso ecosistema di estensioni. Installa una volta l'[estensione VS Code di Intlayer](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) e il server si attiva automaticamente — **nessuna configurazione richiesta**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer fornisce un **plugin per Claude Code** ospitato nel repository di Intlayer. Dà a Claude Code una vera risoluzione dei simboli per le tue chiavi di dizionario, invece di ripiegare su `grep`.

Metti il binario nel tuo `PATH`, poi registra il marketplace e installa il plugin:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` abilita anche il plugin. **Riavvia Claude Code** — i language server vengono caricati all'avvio, quindi il plugin non ha effetto prima di allora.

Claude Code avvia poi il server sui file `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` e `.svelte`, e usa `goToDefinition`, `findReferences` e `hover` durante la navigazione del codice.

Se Go-to-Definition continua a non fare nulla, la tua versione di Claude Code potrebbe vincolare lo strumento LSP a un flag:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed ha supporto LSP nativo. Aggiungi il server alle tue impostazioni utente:

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
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

Il segnaposto `"..."` mantiene i language server predefiniti di Zed insieme a quello di Intlayer.

  </Tab>
  <Tab label="Neovim" value="neovim">

Con [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), registra una configurazione di server personalizzata:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Avvia il server con npx per non richiedere un'installazione globale
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

Dopo aver riavviato Neovim, `gd` su una chiave di dizionario esegue Vai alla definizione e `gr` esegue Trova riferimenti.

  </Tab>
  <Tab label="coc.nvim" value="coc">

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

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="Altri editor" value="other">

Qualsiasi editor compatibile con LSP può eseguire `@intlayer/lsp`. Configuralo con:

- **Eseguibile** — `npx @intlayer/lsp`, o il binario `intlayer-lsp`
- **Trasporto** — stdio (standard)
- **Capacità** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (caratteri di attivazione `"` `'` `` ` `` `.`), diagnostica push, `textDocumentSync: Incremental`
- **Pattern di root** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Consulta la documentazione LSP del tuo editor per il formato di configurazione esatto.

  </Tab>
</Tabs>

---

## Nota sugli agenti IA da terminale

**Claude Code** agisce come un vero client LSP — vedi la scheda sopra.

**OpenAI Codex** e la maggior parte degli altri strumenti da terminale non sono client LSP: leggono e scrivono i file direttamente. Eseguire il server da solo non li aiuta; il valore deriva dall'averlo attivo in un editor complementare il cui indice l'agente può interrogare (Cursor Composer, Windsurf Cascade, Copilot Chat).

---

## Come funziona

Per ogni file, il server individua l'`intlayer.config.*` più vicino e carica la configurazione di quel progetto per trovare i dizionari compilati. Configurazione, dizionari ed elenco dei file sorgente sono memorizzati in cache con TTL brevi e invalidati ogni volta che cambia un file di contenuto monitorato.

A ogni richiesta, il server analizza il documento (tramite [oxc](https://oxc.rs/)) ed esamina la posizione del cursore:

1. **Su una stringa chiave** (`useIntlayer("home")`) → restituisce ogni file di contenuto che dichiara quella chiave, posizionato sulla sua riga `key:`.
2. **Sull'uso di un campo** (`content.title`, una proprietà destrutturata, `t('path.to.field')`, `<Trans>`, …) → risale dalla variabile al suo dizionario e restituisce il campo corrispondente all'interno dei file di contenuto.
3. **Da un file di contenuto** → esegue la ricerca inversa, scandendo i sorgenti del progetto alla ricerca dei punti di chiamata di quella chiave o di quel campo.

---

## Risoluzione dei problemi

| Sintomo                                    | Causa probabile                       | Soluzione                                                                      |
| ------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------ |
| Non succede assolutamente nulla            | Server non in esecuzione              | Verifica che `@intlayer/lsp` sia installato e che il tuo editor lo avvii       |
| Funziona nell'editor, non in Claude Code   | Plugin installato a sessione avviata  | Riavvia Claude Code — i language server si caricano all'avvio                  |
| Nessuna definizione trovata per una chiave | Dizionari non compilati               | Esegui `npx intlayer build`, oppure avvia il server di sviluppo                |
| Ogni chiave segnalata come non dichiarata  | Configurazione non risolta            | Verifica che esista un `intlayer.config.ts` (o `.js`) alla radice del progetto |
| Progetto sbagliato usato in un monorepo    | Manca la configurazione per pacchetto | Aggiungi un `intlayer.config.*` a ogni pacchetto che dichiara contenuti propri |
| Il server va in crash all'avvio            | Versione di Node.js troppo vecchia    | Richiede Node.js ≥ 14.18                                                       |

In VS Code il server scrive i log in **Visualizza → Output → «Intlayer LSP»** — utile per confermare quale configurazione è stata risolta e quanti dizionari sono stati trovati.
