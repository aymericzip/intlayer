---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Intlayer LSP Server
description: Learn how the Intlayer Language Server brings Go-to-Definition, Find References, hover previews, key autocompletion, and diagnostics to your IDE and AI agent.
keywords:
  - LSP
  - Language Server
  - Go to Definition
  - Autocompletion
  - Diagnostics
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
    changes: "Add Find References, hover, autocompletion and diagnostics"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Intlayer LSP Server

The **Intlayer Language Server** is a [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) implementation that makes your IDE — and your AI agent — Intlayer-aware. It connects a call like `useIntlayer("home")` to the `.content.ts` file that declares it, in both directions.

## Features

| Feature                 | Shortcut            | What it does                                                                                       |
| ----------------------- | ------------------- | -------------------------------------------------------------------------------------------------- |
| **Go to Definition**    | `F12` / `Cmd+Click` | Jump from a dictionary key or a field usage to its declaration in the content file                 |
| **Find All References** | `Shift+F12`         | From a content file, list every call site that uses that key or field                              |
| **Hover**               | hover the cursor    | Preview a dictionary's fields, or a field's translated value, without leaving the file             |
| **Autocompletion**      | `"` `'` `` ` `` `.` | Suggest declared dictionary keys inside a getter, and content fields after `.` or in destructuring |
| **Diagnostics**         | automatic           | Warn when a key is not declared in any content file                                                |

Two extra behaviours are worth knowing:

- **Merged dictionaries** — a key split across several content files returns one result per file, so you can navigate to every declaration.
- **Monorepo-aware** — the server resolves the _closest_ `intlayer.config.*` to each file, so several projects in one workspace each get their own dictionaries.

### Supported calls

The key is read either from a positional string argument or from an options object (`{ namespace }`, `{ id }`).

| Library                     | Callers                                                  |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

This works for every `*-intlayer` package (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`), and for the compat adapter packages that let you keep your existing i18n syntax.

> Dictionaries are read from the build output, so run `npx intlayer build` — or keep your dev server running — to give the server something to resolve.

## Installation

The server ships as the `intlayer-lsp` binary in `@intlayer/lsp`:

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

Install it globally instead (`npm install -g @intlayer/lsp`) if your editor needs `intlayer-lsp` on the `PATH` — this is the case for the Claude Code plugin and for any configuration below that calls the binary directly.

## Setup

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

Install the [Intlayer VS Code extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension). The language server is bundled since v8.12.0 and starts automatically — **no configuration required**.

See the [VS Code extension documentation](https://intlayer.org/doc/vs-code-extension) for its other features.

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) and [Windsurf](https://windsurf.com/) are VS Code forks and use the same extension ecosystem. Install the [Intlayer VS Code extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) once and the server activates automatically — **no configuration required**.

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer ships a **Claude Code plugin** hosted in the Intlayer repository. It gives Claude Code real symbol resolution for your dictionary keys instead of falling back to `grep`.

Put the binary on your `PATH`, then register the marketplace and install the plugin:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` also enables the plugin. **Restart Claude Code** — language servers are loaded at startup, so the plugin has no effect until then.

Claude Code then starts the server on `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` and `.svelte` files, and uses `goToDefinition`, `findReferences` and `hover` when navigating your code.

If Go-to-Definition still does nothing, your Claude Code version may gate the LSP tool behind a flag:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed has native LSP support. Add the server to your user settings:

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

The `"..."` placeholder keeps Zed's default language servers alongside the Intlayer one.

  </Tab>
  <Tab label="Neovim" value="neovim">

Using [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), register a custom server configuration:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- Launch the server with npx so you don't need a global install
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

After restarting Neovim, `gd` over a dictionary key runs Go to Definition and `gr` runs Find References.

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
  <Tab label="Other editors" value="other">

Any LSP-capable editor can run `@intlayer/lsp`. Point it at:

- **Executable** — `npx @intlayer/lsp`, or the `intlayer-lsp` binary
- **Transport** — stdio (standard)
- **Capabilities** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (trigger characters `"` `'` `` ` `` `.`), push diagnostics, `textDocumentSync: Incremental`
- **Root patterns** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

Consult your editor's LSP documentation for the exact configuration format.

  </Tab>
</Tabs>

## Note on terminal AI agents

**Claude Code** acts as a real LSP client — see the tab above.

**OpenAI Codex** and most other terminal tools are not LSP clients: they read and write files directly. Running the server on its own does not help them; the value comes from having it active in a companion editor whose index the agent can query (Cursor Composer, Windsurf Cascade, Copilot Chat).

## How It Works

For each file, the server locates the closest `intlayer.config.*` and loads that project's configuration to find the compiled dictionaries. Configuration, dictionaries and the source-file list are cached with short TTLs, and invalidated whenever a watched content file changes.

On a request, the server parses the document (via [oxc](https://oxc.rs/)) and inspects the cursor position:

1. **On a key string** (`useIntlayer("home")`) → returns every content file declaring that key, positioned on its `key:` line.
2. **On a field usage** (`content.title`, a destructured property, `t('path.to.field')`, `<Trans>`, …) → resolves the variable back to its dictionary and returns the matching field inside the content files.
3. **From a content file** → runs the reverse lookup, scanning project sources for call sites of that key or field.

## Troubleshooting

| Symptom                                 | Likely cause                 | Fix                                                                      |
| --------------------------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| Nothing happens at all                  | Server not running           | Check `@intlayer/lsp` is installed and your editor is launching it       |
| Works in the editor, not in Claude Code | Plugin installed mid-session | Restart Claude Code — language servers load at startup                   |
| No definitions found for a key          | Dictionaries not built       | Run `npx intlayer build`, or start your dev server                       |
| Every key reported as undeclared        | Config not resolved          | Verify an `intlayer.config.ts` (or `.js`) exists at your project root    |
| Wrong project used in a monorepo        | Missing per-package config   | Add an `intlayer.config.*` to each package that declares its own content |
| Server crashes on start                 | Node.js version too old      | Requires Node.js ≥ 14.18                                                 |

In VS Code, the server logs to **View → Output → "Intlayer LSP"** — useful to confirm which config was resolved and how many dictionaries were found.
