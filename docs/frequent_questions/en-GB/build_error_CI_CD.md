---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Build Error in CI/CD
description: Learn how to fix build errors that occur in CI/CD environments.
keywords:
  - build
  - error
  - ci
  - cd
  - pipeline
  - intlayer
  - dictionaries
  - next.js
  - prebuild
  - automation
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# Error on build on CI/CD

If you get an error like this on Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Here are some solutions:

## 1. Missing dictionaries

Ensure that the dictionaries are built at the stage of the build.

It's frequent that the build works locally but not on CI/CD. The reason is that locally, the `.intlayer` directory is present, but on CI/CD, it is not as it is excluded from the build.

You can fix this by adding a prebuild script in the `package.json` of your project.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Will run before the build
    "build": "next build",
  },
}
```

> Note that if you use the `withIntlayer` function, or the equivalent bundler plugin for your framework, the prebuild script will be run before the build.

## 2. Missing environment variables at build / run time

In a container, or auto-deployed platform, it is recommended to exclude the `.env` file from the build.

```text fileName=".gitignore or .dockerignore"
# Environment variables
.env
**/.env
.env.*
**/.env.*
```

If your environment variables are not available at build time, an error will be thrown.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

It is probably not related to Intlayer. Therefore, check your environment variables at build time on your CI/CD platform.
