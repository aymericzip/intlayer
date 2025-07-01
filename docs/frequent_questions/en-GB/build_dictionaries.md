---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: How to build dictionaries?
description: Learn how to build dictionaries.
keywords:
  - build
  - dictionaries
  - intlayer
  - command
  - watch
  - vscode
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - doc
  - faq
  - build-dictionaries
---

# Build Dictionaries

## How to Build Dictionaries

Intlayer provides a command-line tool to build dictionaries.

```bash
npx intlayer dictionaries build
```

This command:

- Scans all content declaration files (`.content.{ts,tsx,js,mjs,cjs,json,...}`) in your project.
- Generates dictionaries and stores them in the `.intlayer/dictionary` folder.

### Watch Mode

If you want to automatically update dictionaries when changes are made to content declaration files, run the following command:

```bash
npx intlayer dictionaries build --watch
```

In this mode, Intlayer will scan and build dictionaries whenever changes are made to content declaration files and automatically update the `.intlayer/dictionary` folder.

### Using the VSCode extension

You can also use the [Intlayer VSCode extension](https://github.com/aymericzip/intlayer/tree/main/docs/{{locale}}/vs_code_extension.md) to enhance your Intlayer experience in VSCode.

### Using the plugin for your favourite application framework

If you are using a framework like Next.js (Webpack / Turbopack), Vite, or React Native, Lynx etc., Intlayer provides a plugin that you can use to integrate Intlayer into your application.

Intlayer will build dictionaries before the build of your application.
Similarly, in development mode, Intlayer will watch for changes in your content declaration files and rebuild dictionaries automatically.

So refer to the specific documentation of your framework to learn how to integrate the plugin.
