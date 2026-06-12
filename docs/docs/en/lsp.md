---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Intlayer LSP Server
description: Learn how the Intlayer Language Server provides Go-to-Definition and other IDE features for useIntlayer, getIntlayer, and related calls across all supported editors.
keywords:
  - LSP
  - Language Server
  - Go to Definition
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
author: aymericzip
---

# Intlayer LSP Server

The **Intlayer Language Server** is a [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) implementation that enhances your IDE with Intlayer-aware intelligence. It currently provides **Go to Definition** for dictionary key calls, letting you jump straight from `useIntlayer("my-key")` in your component to the `.content.ts` file that declares it.

---

## Why Use the LSP?

When you use Intlayer, the connection between a call like `useIntlayer("homepage")` and its declaration in `src/homepage.content.ts` is implicit. Without tooling, you must search for the file manually. The LSP makes that link explicit:

**AI agent awareness**

AI coding agents (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) rely on the language server to resolve symbols and understand cross-file relationships. With the Intlayer LSP running, agents can follow `useIntlayer("key")` back to its declaration, giving them accurate context about available content keys, the shape of each dictionary, and which files to read or edit.

**Jump to Definition**

Place your cursor on any dictionary key string inside a supported getter call and press `F12` (or `Cmd/Ctrl+Click`). The editor opens the content declaration file and positions the cursor on the `key:` line.

**Merged dictionary support**

A key can be split across multiple content files (Intlayer merges them). The server returns one `Location` per source file so you can navigate to every declaration.

**Works everywhere**

Supports all `*-intlayer` packages (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`).

### Supported getter calls

The server detects the following function calls and extracts the first string-literal argument as the dictionary key:

| Function        | Example                         |
| --------------- | ------------------------------- |
| `useIntlayer`   | `useIntlayer("hero")`           |
| `getIntlayer`   | `getIntlayer("hero", locale)`   |
| `useDictionary` | `useDictionary("hero")`         |
| `getDictionary` | `getDictionary("hero", locale)` |

TypeScript generics and extra arguments are ignored — only the first string-literal argument is used as the dictionary key.

---

## Installation

The LSP server is distributed as part of `@intlayer/lsp`:

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

The package exposes the `intlayer-lsp` binary, which editors use as the server executable.

---

## Setup as a Claude Code Plugin

The Intlayer LSP is available as a **Claude Code plugin** hosted directly in the Intlayer GitHub repository. Installing it gives Claude Code native Go-to-Definition awareness for all your `useIntlayer` / `getIntlayer` calls.

### 1. Install the language server binary

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

This puts the `intlayer-lsp` binary on your PATH, which is what the plugin's `lspServers` entry invokes.

### 2. Register the Intlayer marketplace and install the plugin

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code will add `"intlayer-lsp@intlayer": true` to your `enabledPlugins` and automatically start the language server on the supported file types (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`).

### 3. Enable the LSP tool (if not already active)

Some Claude Code versions require the LSP feature flag to be set. Add the following to your `~/.claude/settings.json` if Go-to-Definition isn't working after installation:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Restart Claude Code — it will now use `goToDefinition`, `findReferences`, and other LSP operations when navigating your Intlayer codebase instead of falling back to `grep`.

---

## Setup in VS Code (via extension — recommended)

If you have the [Intlayer VS Code extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) installed, the language server starts automatically. No additional configuration is required. The LSP is directly integrated into the VSCode extension since v8.12.0.

> See the [VS Code extension documentation](https://intlayer.org/doc/vs-code-extension) for installation and other features.

---

## Manual Setup in VS Code

If you are not using the Intlayer extension, you can wire up the language server manually using a generic LSP client extension such as [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) or by writing your own small extension. The recommended approach is to use the Intlayer extension.

For reference, the server launches via the `intlayer-lsp` binary over stdio:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

The Intlayer extension reads these settings to launch the server. If you rely solely on the extension, no manual settings are needed.

---

## Setup in Cursor

[Cursor](https://www.cursor.com/) is a VS Code fork with built-in AI features. It uses the same extension ecosystem, so the **Intlayer VS Code extension** works without any extra configuration — install it once and Cursor picks it up automatically.

If you prefer a manual configuration, Cursor also reads `.vscode/settings.json` from the workspace root, so the VS Code snippet above applies directly.

---

## Setup in Windsurf

[Windsurf](https://windsurf.com/) (by Codeium) is another VS Code-based editor. Install the Intlayer extension from the VS Code Marketplace and the language server activates automatically, exactly as it does in VS Code and Cursor.

For manual configuration, create `.vscode/settings.json` at the project root:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Setup in Zed

[Zed](https://zed.dev/) has native LSP support through its language settings. Add an entry in your Zed user settings (`~/.config/zed/settings.json`):

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

The `"..."` placeholder tells Zed to keep its default language servers alongside the Intlayer one.

---

## Setup for AI Agent CLIs (Claude Code, Codex, etc.)

**Claude Code** has first-class LSP plugin support — follow the [Claude Code Plugin setup](#setup-as-a-claude-code-plugin) above to get the full Go-to-Definition experience directly in your terminal sessions.

**OpenAI Codex** and other terminal-based tools do not yet act as LSP clients — they read and write files directly rather than maintaining a persistent language-server session. For those tools, the value of having the LSP running comes indirectly: when the server is active in a companion editor (VS Code, Cursor, Windsurf, …) the editor's live index is available to any AI agent that can query it through editor-provided context (e.g., Cursor Composer, Windsurf Cascade, GitHub Copilot Chat).

If you are working purely in a terminal without an editor open, you can start the language server in the background so it's ready for any editor that later connects to the same workspace:

```bash
# Keep the server alive in the background
npx @intlayer/lsp &
```

---

## Manual Setup in Neovim

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

After restarting Neovim, pressing `gd` over an Intlayer key will invoke Go to Definition.

---

## Manual Setup in Other Editors

Any editor that supports the Language Server Protocol can use `@intlayer/lsp`. The server:

- **Transport** – Node.js IPC / stdio (standard)
- **Executable** – `npx @intlayer/lsp` (or the locally installed `intlayer-lsp` binary)
- **Capabilities** – `definitionProvider: true`, `textDocumentSync: Incremental`

Consult your editor's LSP documentation for the exact configuration format (e.g., `languageserver.json` for [coc.nvim](https://github.com/neoclide/coc.nvim), or the LSP client settings in [Helix](https://helix-editor.com)).

### Example: coc.nvim

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

### Example: Helix

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

## How It Works

When the server starts, it resolves the Intlayer configuration from the workspace root using `getConfiguration()`. This gives it the `build` and `system` paths needed to find compiled dictionaries.

On each **Go to Definition** request:

1. The server reads the full text of the open document.
2. It scans for getter calls (`useIntlayer`, `getIntlayer`, etc.) using a regular expression.
3. It checks whether the cursor position falls inside one of those calls.
4. If it does, it extracts the dictionary key (capture group 3 of the regex) and calls `getUnmergedDictionaries()` to locate every content file that declares that key.
5. It reads each matching file and finds the exact line containing `key: "<key>"` to position the cursor precisely.
6. It returns an array of `Location` objects — one per source file.

Configuration is lazily resolved and cached per session; it resets on each `initialize` request (e.g., when you open a new workspace folder).

---

## Troubleshooting

| Symptom                         | Likely cause               | Fix                                                                             |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------- |
| Go to Definition does nothing   | Server not running         | Check that `@intlayer/lsp` is installed and the editor is launching it          |
| Wrong workspace root detected   | Multiple workspace folders | Ensure the folder containing `intlayer.config.ts` is the first workspace folder |
| Definitions not found for a key | Config not resolved        | Verify `intlayer.config.ts` (or `.js`) exists at the workspace root             |
| Server crashes on start         | Node.js version too old    | Requires Node.js ≥ 14.18                                                        |
