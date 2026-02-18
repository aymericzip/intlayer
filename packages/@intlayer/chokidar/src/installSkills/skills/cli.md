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
| `npx intlayer transform` | Transforms dictionaries between formats.                      |

## References

### Concepts

- [Build](https://intlayer.org/doc/concept/cli/build.md)
- [CI](https://intlayer.org/doc/concept/cli/ci.md)
- [Configuration](https://intlayer.org/doc/concept/cli/configuration.md)
- [Debug](https://intlayer.org/doc/concept/cli/debug.md)
- [Doc Review](https://intlayer.org/doc/concept/cli/doc-review.md)
- [Doc Translate](https://intlayer.org/doc/concept/cli/doc-translate.md)
- [Editor](https://intlayer.org/doc/concept/cli/editor.md)
- [Fill](https://intlayer.org/doc/concept/cli/fill.md)
- [Overview](https://intlayer.org/doc/concept/cli/overview.md)
- [Init](https://intlayer.org/doc/concept/cli/init.md)
- [List](https://intlayer.org/doc/concept/cli/list.md)
- [List Projects](https://intlayer.org/doc/concept/cli/list-projects.md)
- [Live](https://intlayer.org/doc/concept/cli/live.md)
- [Login](https://intlayer.org/doc/concept/cli/login.md)
- [Pull](https://intlayer.org/doc/concept/cli/pull.md)
- [Push](https://intlayer.org/doc/concept/cli/push.md)
- [SDK](https://intlayer.org/doc/concept/cli/sdk.md)
- [Test](https://intlayer.org/doc/concept/cli/test.md)
- [Transform](https://intlayer.org/doc/concept/cli/transform.md)
- [Version](https://intlayer.org/doc/concept/cli/version.md)
- [Watch](https://intlayer.org/doc/concept/cli/watch.md)

### Packages

- [Intlayer CLI](https://intlayer.org/doc/packages/intlayer-cli.md)
- [Intlayer CLI Exports](https://intlayer.org/doc/packages/intlayer-cli/exports.md)
