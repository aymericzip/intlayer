---
name: intlayer-dev-tools
description: Sets up Intlayer developer tooling - ESLint / oxlint rules, the Language Server (LSP), the VS Code extension, the MCP server, CI/CD automation and the Chrome extension. Use when the user asks to "lint hardcoded strings", "setup Go-to-Definition for dictionary keys", "install the Intlayer MCP", or "automate translations in CI".
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

Then spread `intlayer.configs.recommended` in your `eslint.config.mjs` (oxlint is also supported).

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

## VS Code Extension

Jump from a dictionary key to its content file, extract content from a component, and run build, fill, test, push and pull from the command palette.

## MCP Server

Gives AI assistants access to the Intlayer documentation and CLI.

```bash
npx intlayer init mcp
```

This writes the MCP configuration for your IDE (local `@intlayer/mcp` over stdio, or the hosted `https://mcp.intlayer.org`).

A WebMCP is also available for the main website and documentation at `https://intlayer.org`.

## CI/CD

Fill missing translations with AI on each change, and fail the build on missing ones:

```bash
npx intlayer fill --git-diff --mode complete
npx intlayer test
```

## Chrome Extension

Inspect the i18n setup of any website: framework, i18n library, locales, hreflang and SEO tags.

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
