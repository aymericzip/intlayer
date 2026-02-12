---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer-cli Package Documentation
description: CLI utility for Intlayer, providing commands for building and auditing dictionaries.
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# intlayer-cli Package

The `intlayer-cli` package provides a set of commands to manage Intlayer dictionaries and configuration.

## Installation

```bash
npm install intlayer-cli
```

## Exports

### CLI Commands (Functions)

The package exports functions that power the CLI commands.

| Function   | Description                                       |
| ---------- | ------------------------------------------------- |
| `build`    | Builds the Intlayer dictionaries.                 |
| `audit`    | Audits the dictionaries for missing translations. |
| `liveSync` | Synchronises dictionaries in real-time.           |
| `pull`     | Pulls dictionaries from a remote source.          |
| `push`     | Pushes dictionaries to a remote source.           |
| `test`     | Runs tests on dictionaries.                       |
| `extract`  | Transforms dictionaries between formats.          |
