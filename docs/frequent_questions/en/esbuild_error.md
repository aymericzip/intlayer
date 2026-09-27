---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: "Fix ESBuild Errors with Intlayer"
description: "Fix ESBuild errors during an Intlayer build, usually caused by a missing or misconfigured bundler plugin for your framework."
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
author: aymericzip
---

# ESBuild Error

If you encounter an ESBuild error during the build process, it's likely that the Intlayer plugin has not been configured correctly.

ESBuild is responsible for reading the content declaration files (`.content.{ts,js,mjs,cjs,json}`) and generating the corresponding dictionaries in the `.intlayer/dictionary` folder. As well as reading the configuration file (`intlayer.config.ts`).

Intlayer provides plugins to integrate with your bundlers. It is designed to alias components that are meant to run on the server side only.

If you are using a framework like Next.js (Webpack / Turbopack), Vite, or React Native, Lynx etc. Intlayer provides a plugin that you can use to integrate Intlayer into your application. So refer to the specific documentation of your framework to learn how to integrate the plugin.
