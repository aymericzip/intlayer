<div align="center">
  <a href="https://www.npmjs.com/package/intlayer">
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
  </a>
</div>

# @intlayer/config: Retrieve Intlayer configuration

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

The **`@intlayer/config`** package is a NPM package that allows you to retrieve the configuration of Intlayer and define the environment variables related to the current environment.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## Usage

### Read the configuration of Intlayer using file system

Example:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> This function use `fs` packages and will only work on the server side.

### Read the configuration of Intlayer using environment variables

Example:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> This function will not return anything if the environment variables are not defined.

### Define the environment variables

1. Create a configuration file.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> See [Intlayer configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md) for more details.

2. Define the environment variables.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Format all configuration values as environment variables
const env = formatEnvVariable();

// Set each formatted environment variable in process.env
Object.assign(process.env, env);
```

3. Import the configuration file.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## Read about Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/docs)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Ask your questions to our smart documentation](https://intlayer.org/docs/chat)
