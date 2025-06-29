# @intlayer/api: NPM Package to interact with Intlayer API

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

The **`@intlayer/api`** package is a SDK (Software Development Kit) to interact with the Intlayer API. It provides a set of functions to audit content declaration, interact with organizations, projects, and user, etc.

## Usage

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## Doc History

- 5.5.10 - 2025-06-29: Init history
