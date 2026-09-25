---
createdAt: 2024-08-11
updatedAt: 2026-09-23
title: CLI - All Intlayer CLI commands for your multilingual website
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

## Run intlayer commands

### Authentication

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/login" />
</TechGrid>

> `intlayer login` issues an **access key** (`clientId` / `clientSecret`) that every credentialed command uses. The secret is a server-side credential and never reaches your client bundle — see [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/login.md#keeping-the-access-key-safe).

### Core Commands

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/list_projects" />
</TechGrid>

### Dictionary Management

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/list" />
</TechGrid>

### Component Management

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract" />
</TechGrid>

### Configuration

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/configuration" />
</TechGrid>

### Documentation Management

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/doc-review" />
</TechGrid>

### Editor & Live Sync

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/live" />
</TechGrid>

### Auditing & Diagnostics

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/scan" />
</TechGrid>

### Development Tools

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/debug" />
</TechGrid>

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
