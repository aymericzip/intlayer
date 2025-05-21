<div align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/572ae9c9acafb74307b81530c1931a8e98990aef/docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/intlayer-cli">
    <img alt="npm" src="https://img.shields.io/npm/v/intlayer.svg?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer-cli">
    <img alt="downloads" src="https://badgen.net/npm/dm/intlayer?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer-cli">
    <img alt="types included" src="https://badgen.net/npm/types/intlayer?labelColor=49516F&color=8994BC" 
  />
</div>

# intlayer-cli: Use the Intlayer CLI

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

The **`intlayer-cli`** package is a NPM package that consume the `@intlayer/cli` package and make it available to the `intlayer` commands line interfaces.

> Note that this package is not needed if the [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/en/packages/intlayer/index.md) package is installed. In comparison to the `intlayer` package, the `intlayer-cli` package is a lighter package that only contains the CLI tool, without `@intlayer/core` dependencies.

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

Here an example of how to use the `intlayer-cli` package:

```bash
npx intlayer dictionaries build
```

## CLI commands

Intlayer provides a CLI tool to:

- audit your content declarations and complete missing translations
- build dictionaries from your content declarations
- push and pull distant dictionaries from your CMS to your locale project

Consult [intlayer-cli](https://intlayer.org/doc/concept/cli) for more information.

## Read about Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/docs)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Ask your questions to our smart documentation](https://intlayer.org/docs/chat)
