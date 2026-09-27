---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 8
title: "Intlayer CLI: All Commands for Multilingual Apps"
description: Discover how to use the Intlayer CLI to manage your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.
keywords:
  - CLI
  - Command Line Interface
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Add upgrade command"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Add init infra command"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Replace the `ci` command by the `--ci` flag"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Add scan command"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Add standalone command"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Add CI command"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Add projects list command"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Add init command"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Add extract command"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Add skipIfExists option to translate command"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Add aliases for CLI arguments and commands"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Add build option to commands"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Add version command"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Set verbose option to default to true using CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Add watch command and with option"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Add editor command"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Add content test and list command"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Update CLI command parameters documentation"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Intlayer CLI - All Intlayer CLI commands for your multilingual website

## Table of Contents

<TOC/>

## Install Package

Install the necessary packages using npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> If `intlayer` package is already installed, the cli is automatically installed. You can skip this step.

## intlayer-cli package

`intlayer-cli` package intend to transpile your [intlayer declarations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) into dictionaries.

- [intlayer declarations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)

This package will transpile all intlayer files, such as `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

To interpret intlayer dictionaries you can interpreters, such as [react-intlayer](https://www.npmjs.com/package/react-intlayer), or [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Configuration File Support

Intlayer accepts multiple configuration file formats:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

To see how to configure available locales, or other parameters, refer to the [configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

- [configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

## Run intlayer commands

### Authentication

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/login.md)** - Authenticate with the Intlayer CMS and get access credentials

> `intlayer login` issues an **access key** (`clientId` / `clientSecret`) that every credentialed command uses. The secret is a server-side credential and never reaches your client bundle. See [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/login.md#keeping-the-access-key-safe).

- [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/login.md#keeping-the-access-key-safe)

### Core Commands

- [Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/build.md)
- [Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/watch.md)
- [Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/standalone.md)
- [Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/version.md)
- [List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/list_projects.md)

### Dictionary Management

- [Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/push.md)
- [Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/pull.md)
- [Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md)
- [Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/test.md)
- [List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/list.md)

### Component Management

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md)** - Extract strings from components into a .content file close to the component

### Configuration

- [Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/init.md)
- [Set Up Infrastructure](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/infra.md)
- [Upgrade Intlayer Packages](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/upgrade.md)
- [Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/configuration.md)

### Documentation Management

- [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/doc-translate.md)
- [Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/doc-review.md)

### Editor & Live Sync

- [Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/editor.md)
- [Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/live.md)

### Auditing & Diagnostics

- **[Scan Website](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/scan.md)** - Measure page size and audit i18n/SEO health of any public URL

### Development Tools

- [CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/sdk.md)
- [Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/debug.md)

## Use intlayer commands in your `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Note**: You can also use the shorter aliases:
>
> - `npx intlayer list` instead of `npx intlayer content list`
> - `npx intlayer test` instead of `npx intlayer content test`
> - `npx intlayer projects-list` or `npx intlayer pl` instead of `npx intlayer projects list`
