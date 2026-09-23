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

- [Website](https://intlayer.org)
- [Doc](https://intlayer.org/doc)

### Commands

- [Build Dictionaries](references/concept_cli_build.md)
- [Manage Configuration](references/concept_cli_configuration.md)
- [Debug Intlayer Command](references/concept_cli_debug.md)
- [Review Document](references/concept_cli_doc-review.md)
- [Translate Document](references/concept_cli_doc-translate.md)
- [Editor Commands](references/concept_cli_editor.md)
- [Extract strings](references/concept_cli_extract.md)
- [Fill Dictionaries](references/concept_cli_fill.md)
- [CLI Overview](references/concept_cli.md)
- [Init Infra](references/concept_cli_infra.md)
- [Initialize Intlayer](references/concept_cli_init.md)
- [List Content Declaration Files](references/concept_cli_list.md)
- [List Intlayer Projects](references/concept_cli_list-projects.md)
- [Live Sync Commands](references/concept_cli_live.md)
- [Login](references/concept_cli_login.md)
- [Pull Dictionaries](references/concept_cli_pull.md)
- [Push Dictionaries](references/concept_cli_push.md)
- [Scan Website](references/concept_cli_scan.md)
- [CLI SDK](references/concept_cli_sdk.md)
- [Standalone Bundle](references/concept_cli_standalone.md)
- [Test Missing Translations](references/concept_cli_test.md)
- [Check CLI Version](references/concept_cli_version.md)
- [Watch Dictionaries](references/concept_cli_watch.md)

### Packages

- [intlayer-cli Exports](references/packages_intlayer-cli_exports.md)
