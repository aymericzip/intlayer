<div align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/572ae9c9acafb74307b81530c1931a8e98990aef/docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/intlayer">
    <img alt="npm" src="https://img.shields.io/npm/v/intlayer.svg?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer">
    <img alt="downloads" src="https://badgen.net/npm/dm/intlayer?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer">
    <img alt="types included" src="https://badgen.net/npm/types/intlayer?labelColor=49516F&color=8994BC" 
  />
</div>

# @intlayer/babel: Babel plugin for Intlayer internationalization

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, Next.js, and Express.js.

The **`@intlayer/babel`** package is a Babel plugin that transforms Intlayer declaration files and provides internationalization features during the build process according to the [Intlayer configuration](https://intlayer.org/doc/concept/configuration).

## Usage

Add the plugin to your Babel configuration:

```json
{
  "plugins": ["@intlayer/babel"]
}
```

Or with options:

```json
{
  "plugins": [
    [
      "@intlayer/babel",
      {
        "configPath": "./intlayer.config.js"
      }
    ]
  ]
}
```

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel
```

```bash packageManager="yarn"
yarn add @intlayer/babel
```

## Read about Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/docs)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Ask your questions to our smart documentation](https://intlayer.org/docs/chat)
