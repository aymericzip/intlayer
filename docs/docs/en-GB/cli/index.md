---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - All Intlayer CLI commands for your multilingual website
description: Discover how to use the Intlayer CLI to manage your multilingual website. Follow the steps in this online documentation to set up your project in minutes.
keywords:
  - CLI
  - Command Line Interface
  - Internationalisation
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Added standalone command content"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Added CI command content"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Added list projects command content"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Added init command content"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Added extract command content"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Added skipIfExists option to translate command"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Added aliases for CLI arguments and commands"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Added build option to commands"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Added version command content"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Set verbose option to true by default via CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Added watch command and with option"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Added editor command content"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Added content test and list commands"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Updated documentation for CLI command parameters"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
---

# Intlayer CLI - All Intlayer CLI commands for your multilingual website

---

## Table of Contents

<TOC/>

---

## Installing the package

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

> If the `intlayer` package is already installed, the CLI is automatically installed. You can skip this step.

## The intlayer-cli package

The `intlayer-cli` package is designed to transpile your [Intlayer declarations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md) into dictionaries.

This package transpiles all Intlayer files, such as `src/**/*.content.{ts|js|mjs|cjs|json}`. [See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

To interpret the Intlayer dictionaries, you can use interpreters, such as [react-intlayer](https://www.npmjs.com/package/react-intlayer) or [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Config file support

Intlayer accepts several configuration file formats:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

To learn how to configure the available languages or other parameters, take a look at the [configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

## Executing Intlayer commands

### Authentication

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/login.md)** - Authenticate with the Intlayer CMS and get the access credentials

### Core Commands

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/build.md)** - Build your dictionaries from your content declaration files
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/watch.md)** - Watch for changes and automatically rebuild dictionaries
- **[Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/standalone.md)** - Create a standalone JavaScript bundle containing Intlayer and specified packages.
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/version.md)** - Check the installed Intlayer CLI version
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/list_projects.md)** - List all Intlayer projects in a directory or git repository

### Dictionary Management

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/push.md)** - Push the dictionaries to the Intlayer Editor and CMS
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/pull.md)** - Pull the dictionaries from the Intlayer Editor and CMS
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/fill.md)** - Fill, audit, and translate dictionaries using AI
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/test.md)** - Test and identify missing translations
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/list.md)** - List all content declaration files in your project

### Component Management

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md)** - Extract strings from components into a .content file near the component

### Configuration

- **[Initialise Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/init.md)** - Set up Intlayer in your project with automatic configuration
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/configuration.md)** - Get your Intlayer configuration and push it to the CMS

### Doc Management

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/doc-translate.md)** - Automatically translate document files using AI
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/doc-review.md)** - Review document files for quality and consistency

### Editor and Live Sync

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/editor.md)** - Use the Intlayer Editor commands
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/live.md)** - Use Live Sync to apply content changes from CMS in real time

### CI/CD and Automation

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/ci.md)** - Execute Intlayer commands with automatically injected credentials for CI/CD flows

### Developer Tools

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/sdk.md)** - Use the Intlayer CLI SDK in your own code
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/debug.md)** - Debug and resolve issues with the Intlayer CLI

## Use the intlayer commands in your `package.json` file

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
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
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Note**: You can also use the shorter aliases:
>
> - `npx intlayer list`: replaces `npx intlayer content list`
> - `npx intlayer test`: replaces `npx intlayer content test`
> - `npx intlayer projects-list` or `npx intlayer pl`: replaces `npx intlayer projects list`
