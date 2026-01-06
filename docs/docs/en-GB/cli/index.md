---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: CLI
description: Discover how to use the Intlayer CLI to manage your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.
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
  - version: 7.5.11
    date: 2026-01-06
    changes: Add projects list command
  - version: 7.5.9
    date: 2025-12-30
    changes: Add init command
  - version: 7.2.3
    date: 2025-11-22
    changes: Add transform command
  - version: 7.1.0
    date: 2025-11-05
    changes: Add skipIfExists option to translate command
  - version: 6.1.4
    date: 2025-01-27
    changes: Add aliases for CLI arguments and commands
  - version: 6.1.3
    date: 2025-10-05
    changes: Add build option to commands
  - version: 6.1.2
    date: 2025-09-26
    changes: Add version command
  - version: 6.1.0
    date: 2025-09-26
    changes: Set verbose option to default to true using CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Add watch command and with option
  - version: 6.0.1
    date: 2025-09-23
    changes: Add editor command
  - version: 6.0.0
    date: 2025-09-17
    changes: Add content test and list command
  - version: 5.5.11
    date: 2025-07-11
    changes: Update CLI command parameters documentation
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Intlayer CLI

---

## Table of Contents

<TOC/>

---

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

> If the `intlayer` package is already installed, the CLI is automatically installed. You can skip this step.

## intlayer-cli package

The `intlayer-cli` package is intended to transpile your [intlayer declarations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md) into dictionaries.

This package will transpile all intlayer files, such as `src/**/*.content.{ts|js|mjs|cjs|json}`. [See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

To interpret intlayer dictionaries you can use interpreters, such as [react-intlayer](https://www.npmjs.com/package/react-intlayer), or [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Configuration File Support

Intlayer accepts multiple configuration file formats:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

To see how to configure available locales, or other parameters, refer to the [configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

## Run intlayer commands

### Authentication

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/login.md)** - Authenticate with the Intlayer CMS and get access credentials

### Core Commands

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/build.md)** - Build your dictionaries from content declaration files
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/watch.md)** - Watch for changes and automatically build dictionaries
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/version.md)** - Check the installed Intlayer CLI version
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/list_projects.md)** - List all Intlayer projects in a directory or git repository

### Dictionary Management

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/push.md)** - Push dictionaries to the Intlayer editor and CMS
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/pull.md)** - Pull dictionaries from the Intlayer editor and CMS
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/fill.md)** - Fill, audit, and translate dictionaries using AI
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/test.md)** - Test and identify missing translations
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/list.md)** - List all content declaration files in your project

### Component Management

- **[Transform Components](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/transform.md)** - Transform existing components to use Intlayer

### Configuration

- **[Initialise Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/init.md)** - Set up Intlayer in your project with automatic configuration
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/configuration.md)** - Get and push your Intlayer configuration to the CMS

### Documentation Management

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/doc-translate.md)** - Automatically translate documentation files using AI
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/doc-review.md)** - Review documentation files for quality and consistency

### Editor & Live Sync

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/editor.md)** - Use the Intlayer editor commands
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/live.md)** - Use Live Sync to reflect CMS content changes at runtime

### Development Tools

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/sdk.md)** - Use the Intlayer CLI SDK in your own code
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/debug.md)** - Debug and troubleshoot Intlayer CLI issues

## Use intlayer commands in your `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Note**: You can also use the shorter aliases:
>
> - `npx intlayer list` instead of `npx intlayer content list`
> - `npx intlayer test` instead of `npx intlayer content test`
> - `npx intlayer projects-list` or `npx intlayer pl` instead of `npx intlayer projects list`
