---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ESBuild Error
description: Learn how to fix ESBuild errors.
keywords:
  - esbuild
  - error
  - intlayer
  - plugin
  - framework
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - frequent-questions
  - esbuild-error
---

# ESBuild Error

If you encounter an ESBuild error during the build process, it is likely that the Intlayer plugin has not been configured correctly.

ESBuild is responsible for reading the content declaration files (`.content.{ts,js,mjs,cjs,json}`) and generating the corresponding dictionaries in the `.intlayer/dictionary` folder, as well as reading the configuration file (`intlayer.config.ts`).

Intlayer provides plugins to integrate with your bundlers. It is designed to alias components that are intended to run on the server side only.

If you are using a framework such as Next.js (Webpack / Turbopack), Vite, React Native, Lynx, etc., Intlayer provides a plugin that you can use to integrate Intlayer into your application. Therefore, refer to the specific documentation of your framework to learn how to integrate the plugin.
