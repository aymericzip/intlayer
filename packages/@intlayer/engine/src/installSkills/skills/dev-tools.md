---
name: intlayer-dev-tools
description: Sets up Intlayer developer tooling - ESLint / oxlint rules, the Language Server (LSP), the VS Code extension, the MCP server, CI/CD automation, the Chrome extension and the Vue Devtools panel. Use when the user asks to "lint hardcoded strings", "setup Go-to-Definition for dictionary keys", "install the Intlayer MCP", or "automate translations in CI".
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n, eslint, lsp, mcp, ci, devtools]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer Dev Tools

## Lint (ESLint / oxlint)

`eslint-plugin-intlayer` catches hardcoded strings, dynamic calls the Intlayer compiler cannot optimize, and unused dictionary content.

```bash
npm install --save-dev eslint-plugin-intlayer
```

Then spread `intlayer.configs.recommended` in your `eslint.config.mjs` (oxlint is also supported). `npx intlayer init eslint` installs the plugin and wires the oxlint config for you (for an ESLint flat config, it prints the snippet to add).

| Config          | `no-raw-text` | `static-dictionary-key` | `no-dynamic-field-access` |
| --------------- | ------------- | ----------------------- | ------------------------- |
| `recommended`   | warn          | error                   | error                     |
| `strict`        | error         | error                   | error                     |
| `contract-only` | off           | error                   | error                     |

## Language Server (LSP)

`@intlayer/lsp` (binary `intlayer-lsp`) brings Go-to-Definition from a `useIntlayer("key")` call to its `.content` file, Find References, hover previews, key autocompletion and diagnostics.

```bash
npm install --save-dev @intlayer/lsp
```

`npx intlayer init lsp` writes the language server settings to `.vscode/settings.json`.

## VS Code Extension

Jump from a dictionary key to its content file, extract content from a component, and run build, fill, test, push and pull from the command palette. `npx intlayer init vscode-extension` recommends it in `.vscode/extensions.json`.

## MCP Server

Gives AI assistants access to the Intlayer documentation and CLI.

```bash
npx intlayer init mcp --platform Claude --transport stdio
```

This writes the MCP configuration inside the project for your IDE or agent (`.mcp.json` for Claude Code, `.cursor/mcp.json`, `.vscode/mcp.json`, …), using the local `@intlayer/mcp` over stdio or the hosted `https://mcp.intlayer.org` over SSE. Both flags are optional: without them the platform is detected and the transport is prompted for, or defaults to `stdio` when there is no terminal.

A WebMCP is also available for the main website and documentation at `https://intlayer.org`.

## CI/CD

Fill missing translations with AI on each change, and fail the build on missing ones. `npx intlayer init github-actions` scaffolds both workflows:

```bash
npx intlayer fill --git-diff --mode complete
npx intlayer test
```

## Chrome Extension

Inspect the i18n setup of any website: framework, i18n library, locales, hreflang and SEO tags. `npx intlayer init extension --browser chrome` opens its store page.

## Vue Devtools

`vue-intlayer` registers an **Intlayer** panel in [Vue Devtools](https://devtools.vuejs.org/) out of the box, nothing to configure. Open the **Vue** tab of the Chrome DevTools and select **Intlayer** to inspect dictionaries and their per-locale translations, or switch the app's current locale.

When the [visual editor](https://intlayer.org/doc/concept/editor.md) is set up, plain-text translations can also be edited from the panel: edits are written back to the content declaration files and hot-reloaded. Without it, the panel is read-only.

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Tools

- [ESLint Plugin](https://intlayer.org/doc/eslint.md)
- [Language Server (LSP)](https://intlayer.org/doc/lsp.md)
- [VS Code Extension](https://intlayer.org/doc/vs-code-extension.md)
- [MCP Server](https://intlayer.org/doc/mcp-server.md)
- [CI/CD](https://intlayer.org/doc/concept/ci-cd.md)
- [Chrome Extension](https://intlayer.org/doc/chrome-extension.md)
- [Vue Devtools](https://intlayer.org/doc/environment/vite-and-vue.md)
