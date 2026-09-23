---
name: intlayer-cli
description: Manages Intlayer dictionaries and configuration via the Command Line Interface. Use when the user asks to "audit translations", "build dictionaries", "sync content", or run "intlayer" commands.
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
