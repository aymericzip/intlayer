---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - Command Line Tool for Internationalisation
description: Command line interface package for Intlayer providing tools to manage translations, build dictionaries, and automate internationalisation workflows.
keywords:
  - intlayer
  - CLI
  - command line
  - internationalisation
  - i18n
  - tools
  - NPM
  - automation
slugs:
  - doc
  - package
  - intlayer-cli
---

# intlayer-cli: NPM Package to use the Intlayer CLI

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

The **`intlayer-cli`** package is an NPM package that consumes the `@intlayer/cli` package and makes it available to the `intlayer` command line interfaces.

> Note that this package is not required if the [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/docs/en-GB/packages/intlayer/index.md) package is installed. Compared to the `intlayer` package, the `intlayer-cli` package is a lighter package that only contains the CLI tool, without `@intlayer/core` dependencies.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## Usage

Here is an example of how to use the `intlayer-cli` package:

```bash
npx intlayer dictionaries build
```

## CLI commands

Intlayer provides a CLI tool to:

- audit your content declarations and complete missing translations
- build dictionaries from your content declarations
- push and pull remote dictionaries from your CMS to your locale project

Consult [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_cli.md) for more information.

## Doc History

- 5.5.10 - 2025-06-29: Initial history
