---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - Configuration Management for Intlayer
description: NPM package to retrieve Intlayer configuration and define environment variables for internationalisation settings across different environments.
keywords:
  - intlayer
  - configuration
  - environment
  - settings
  - i18n
  - JavaScript
  - NPM
  - variables
slugs:
  - doc
  - package
  - @intlayer_config
---

# @intlayer/config: NPM Package to retrieve Intlayer configuration

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks such as React, React, and Express.js.

The **`@intlayer/config`** package is an NPM package that allows you to retrieve the configuration of Intlayer and define the environment variables related to the current environment.

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

### Read the configuration of Intlayer using the file system

Example:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// Output:
// {
//   internationalisation: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> This function uses the `fs` package and will only work on the server side.

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
//   internationalisation: { ... },
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
  internationalisation: {
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

> See [Intlayer configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md) for more details.

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

## Doc History

- 5.5.10 - 2025-06-29: Initial history
