---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/api - SDK for Intlayer API Integration
description: NPM package providing Software Development Kit (SDK) to interact with Intlayer API for content auditing, organisations, projects, and user management.
keywords:
  - intlayer
  - API
  - SDK
  - integration
  - content audit
  - organisations
  - projects
  - JavaScript
slugs:
  - doc
  - packages
  - intlayer
  - api
---

# @intlayer/api: NPM Package to interact with Intlayer API

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

The **`@intlayer/api`** package is an SDK (Software Development Kit) to interact with the Intlayer API. It provides a set of functions to audit content declaration, interact with organisations, projects, and users, etc.

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
