---
name: intlayer-cli
description: Sets up Intlayer and manages its dictionaries and configuration via the Command Line Interface. Use when the user asks to "set up Intlayer", "audit translations", "build dictionaries", "sync content", or run "intlayer" commands.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  mcp-server: "@intlayer/mcp"
  category: productivity
  tags: [i18n]
  documentation: https://intlayer.org/doc
  support: contact@intlayer.org
---

# Intlayer CLI

The `intlayer-cli` package provides a set of commands to manage Intlayer dictionaries and configuration.

## Installation

```bash
npm install intlayer-cli
```

## Set Up Intlayer

`npx intlayer init` installs the Intlayer packages and sets up the framework (config file, tsconfig, bundler plugin, middleware/proxy, providers). Every other setup step is opt-in, through its own sub-command:

| Command                                                   | Sets up                                                   |
| --------------------------------------------------------- | --------------------------------------------------------- |
| `npx intlayer init packages`                              | Missing Intlayer packages, and upgrades the outdated ones |
| `npx intlayer init project --routing <routing>`           | The framework only (no install)                           |
| `npx intlayer init github-actions`                        | The `fill` and `test` GitHub Actions workflows            |
| `npx intlayer init vscode-extension`                      | The VS Code extension recommendation                      |
| `npx intlayer init lsp`                                   | The language server settings                              |
| `npx intlayer init eslint`                                | The lint rules, when the project already lints            |
| `npx intlayer init skills --platform <p> --skills <s…>`   | The Intlayer skills for an AI agent                       |
| `npx intlayer init mcp --platform <p> --transport stdio`  | The Intlayer MCP server, inside the project               |
| `npx intlayer init extension --browser chrome`            | Opens the browser extension store page                    |
| `npx intlayer init cms`                                   | CMS login through the browser (needs a person)            |
| `npx intlayer init infra --mode <desktop/docker/compose>` | Desktop app or self-hosted stack                          |

`--routing` accepts `prefix-no-default` (default), `prefix-all`, `no-prefix`, `search-params` or `none`.

### As an AI agent

- Never run `npx intlayer init --interactive`: its checklist needs a terminal. Without one it exits with code 1 and lists the sub-commands above.
- Run `npx intlayer init`, then only the sub-commands the user asked for.
- Pass the values as flags so nothing is prompted. When omitted without a terminal: `--skills` defaults to the project stack, `--platform` to the detected agent (e.g. `Claude` for Claude Code), `--transport` to `stdio`; `init infra` requires `--mode`.
- Leave `init cms` and `init extension` to the user: both finish in their browser.

## Main CLI Commands

| Command                  | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `npx intlayer build`     | Builds the Intlayer dictionaries.                             |
| `npx intlayer audit`     | Audits the dictionaries for missing translations.             |
| `npx intlayer live-sync` | Synchronizes dictionaries in real-time.                       |
| `npx intlayer pull`      | Pulls dictionaries from a remote source (e.g., Intlayer CMS). |
| `npx intlayer push`      | Pushes dictionaries to a remote source.                       |
| `npx intlayer test`      | Runs tests on dictionaries.                                   |
| `npx intlayer extract`   | Extract content from component to create dictionary.          |
| `npx intlayer upgrade`   | Upgrades every Intlayer package of the repo to latest.        |

## References

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Commands

- [Build Dictionaries](https://intlayer.org/doc/concept/cli/build.md)
- [Manage Configuration](https://intlayer.org/doc/concept/cli/configuration.md)
- [Debug Intlayer Command](https://intlayer.org/doc/concept/cli/debug.md)
- [Review Document](https://intlayer.org/doc/concept/cli/doc-review.md)
- [Translate Document](https://intlayer.org/doc/concept/cli/doc-translate.md)
- [Editor Commands](https://intlayer.org/doc/concept/cli/editor.md)
- [Extract strings](https://intlayer.org/doc/concept/cli/extract.md)
- [Fill Dictionaries](https://intlayer.org/doc/concept/cli/fill.md)
- [CLI Overview](https://intlayer.org/doc/concept/cli.md)
- [Init Infra](https://intlayer.org/doc/concept/cli/infra.md)
- [Initialize Intlayer](https://intlayer.org/doc/concept/cli/init.md)
- [List Content Declaration Files](https://intlayer.org/doc/concept/cli/list.md)
- [List Intlayer Projects](https://intlayer.org/doc/concept/cli/list-projects.md)
- [Live Sync Commands](https://intlayer.org/doc/concept/cli/live.md)
- [Login](https://intlayer.org/doc/concept/cli/login.md)
- [Pull Dictionaries](https://intlayer.org/doc/concept/cli/pull.md)
- [Push Dictionaries](https://intlayer.org/doc/concept/cli/push.md)
- [Scan Website](https://intlayer.org/doc/concept/cli/scan.md)
- [CLI SDK](https://intlayer.org/doc/concept/cli/sdk.md)
- [Standalone Bundle](https://intlayer.org/doc/concept/cli/standalone.md)
- [Test Missing Translations](https://intlayer.org/doc/concept/cli/test.md)
- [Upgrade Intlayer Packages](https://intlayer.org/doc/concept/cli/upgrade.md)
- [Check CLI Version](https://intlayer.org/doc/concept/cli/version.md)
- [Watch Dictionaries](https://intlayer.org/doc/concept/cli/watch.md)

### Packages

- [intlayer-cli Exports](https://intlayer.org/doc/packages/intlayer-cli/exports.md)
