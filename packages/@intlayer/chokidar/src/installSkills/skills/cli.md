---
name: CLI
description: Intlayer CLI commands and usage
---

# Intlayer CLI

The `intlayer-cli` package provides a set of commands to manage Intlayer dictionaries and configuration.

## Installation

```bash
npm install intlayer-cli
```

## CLI Commands

| Command                  | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `npx intlayer build`     | Builds the Intlayer dictionaries.                             |
| `npx intlayer audit`     | Audits the dictionaries for missing translations.             |
| `npx intlayer live-sync` | Synchronizes dictionaries in real-time.                       |
| `npx intlayer pull`      | Pulls dictionaries from a remote source (e.g., Intlayer CMS). |
| `npx intlayer push`      | Pushes dictionaries to a remote source.                       |
| `npx intlayer test`      | Runs tests on dictionaries.                                   |
| `npx intlayer transform` | Transforms dictionaries between formats.                      |

[CLI Documentation](https://intlayer.org/doc/packages/intlayer-cli)
