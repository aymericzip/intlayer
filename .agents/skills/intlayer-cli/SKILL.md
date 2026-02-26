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

## References

### Concepts

- [Build](references/concept_cli_build.md)
- [CI](references/concept_cli_ci.md)
- [CLI Overview](references/concept_cli.md)
- [Configuration](references/concept_cli_configuration.md)
- [Debug](references/concept_cli_debug.md)
- [Doc Review](references/concept_cli_doc-review.md)
- [Doc Translate](references/concept_cli_doc-translate.md)
- [Editor](references/concept_cli_editor.md)
- [Fill](references/concept_cli_fill.md)
- [Init](references/concept_cli_init.md)
- [List](references/concept_cli_list.md)
- [List Projects](references/concept_cli_list-projects.md)
- [Live](references/concept_cli_live.md)
- [Login](references/concept_cli_login.md)
- [Pull](references/concept_cli_pull.md)
- [Push](references/concept_cli_push.md)
- [SDK](references/concept_cli_sdk.md)
- [Test](references/concept_cli_test.md)
- [Extract](references/concept_cli_extract.md)
- [Version](references/concept_cli_version.md)
- [Watch](references/concept_cli_watch.md)

### Packages

- [Website](https://intlayer.org)
- [Doc](references/concept_cli.md)

- [Intlayer CLI](references/packages_intlayer-cli_exports.md)
- [Intlayer CLI Exports](references/packages_intlayer-cli_exports.md)
