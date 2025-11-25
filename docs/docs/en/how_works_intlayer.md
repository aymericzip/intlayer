---
createdAt: 2024-08-12
updatedAt: 2025-06-29
title: How Intlayer Works
description: Learn how Intlayer operates internally. Understand the architecture and components that make Intlayer powerful.
keywords:
  - Intlayer
  - How it works
  - Architecture
  - Components
  - Internal workings
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# How Intlayer Works

## Table of Contents

<TOC/>

## Overview

The main idea behind Intlayer is to adopt a per-component content management. So the idea behind Intlayer is to allow you to declare your content anywhere in your codebase, as in the same directory as your component.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

To do that, the role of Intlayer is to find all your `content declaration files`, in all different formats present in your project, and then it will generate the `dictionaries` from them.

So there are two main steps:

- Build step
- Interpretation step

### Build of dictionaries step

The build step can be done in three ways:

- using the CLI with `npx intlayer build`
- using [vscode extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)
- using the app plugins such as [`vite-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md), or their equivalents for [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md). When you use one of those plugins, Intlayer will automatically build your dictionaries when you start (dev) or build (prod) your application.

1. Declaration of content files
   - Content files can be defined in various formats, such as TypeScript, ECMAScript, CommonJS, or JSON.
   - Content files can be defined everywhere in the project, which allows for better maintenance and scalability. It is important to respect the file extension conventions for content files. This extension is by default `*.content.{js|cjs|mjs|ts|tsx|json}`, but it can be modified in the [configuration file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

2. Generation of `dictionaries`
   - Dictionaries are generated from content files. By default, Intlayer dictionaries are generated in the `.intlayer/dictionaries` directory of the project.
   - Those dictionaries are generated in different formats to match all needs and optimize the performance of the application.

3. Generation of dictionary types

Based on your `dictionaries`, Intlayer will generate types to make them usable in your application.

- Dictionary types are generated from Intlayer `content declaration files`. By default, Intlayer dictionary types are generated in the `.intlayer/types` directory of the project.

- Intlayer [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) is a TypeScript feature that allows you to define additional types for Intlayer. This makes the development experience easier by suggesting available arguments or required arguments.
  Among the types generated, Intlayer dictionary types or even language configuration types are added to the `types/intlayer.d.ts` file, and used by other packages. To do this, it is necessary that the `tsconfig.json` file is configured to include the `types` directory of the project.

### Interpretation of dictionaries step

Using Intlayer, you will access your content in your application using the `useIntlayer` hook.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

This hook will manage the locale detection for you and will return the content for the current locale. Using this hook, you will also be able to interpret markdown, manage pluralization, and more.

> To see all the features of Intlayer, you can read the [dictionary documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

## Distant content

Intlayer allows you to declare content locally, and then export them to the CMS to make it editable by your non-technical team.

So you will be able to push and pull content from the CMS to your application, in a similar way to what you do with Git for your code.

For externalized dictionaries using the CMS, Intlayer performs a basic fetch operation to retrieve distant dictionaries and merges them with your local ones. If configured on your project, Intlayer will automatically manage the fetching of the content from the CMS when the application starts (dev) / builds (prod).

## Visual editor

Intlayer also provides a visual editor to allow you to edit your content in a visual way. This [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) is available in the external `intlayer-editor` package.

![visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- The server is a simple Express application that listens to requests from the client and retreives the content of your application, such as the `dictionaries` and the configuration to make it accessible on the client side.
- On the other hand, the client is a React application that is used to interact with your content using a visual interface.

When you call your content using `useIntlayer` and the editor is enabled, it automatically wraps your strings with an Proxy object named `IntlayerNode`. This node uses `window.postMessage` to communicate with a wrapped iframe containing the visual editor interface.
On the editor side, the editor listens to these messages and simulates real interaction with your content, allowing you to edit text directly in your application's context.

## App build optimization

To optimize the bundle size of your application, Intlayer provides two plugins to optimize the build of your application: `@intlayer/babel` and `@intlayer/swc` plugins.

The Babel and SWC plugins work by analyzing your application's Abstract Syntax Tree (AST) to replace calls of Intlayer functions with optimized code. This process makes your final bundle lighter in production by ensuring that only the dictionaries that are actually used are imported, optimizing chunking and reducing bundle size.

In development mode, Intlayer uses a centralized static import for dictionaries to simplify the development experience.

By activating the option `importMode = "dynamic"` in the [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md), Intlayer will use the dynamic import to load the dictionaries. This option is disabled by default to avoid async processing when rendering the application.

> `@intlayer/babel` is available by default on `vite-intlayer` package,

> `@intlayer/swc` is not installed by default on `next-intlayer` package as SWC plugins are still experimental on Next.js.

To see how to configure the build of your application, you can read the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

## Packages

Intlayer is composed of several packages, each with a specific role in the translation process. Here is a graphical representation of the structure of this package:

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

The `intlayer` package is used in applications to declare content in content files.

### react-intlayer

The `react-intlayer` package is used to interpret Intlayer dictionaries and make them usable in React applications.

### next-intlayer

The `next-intlayer` package is used as a layer on top of `react-intlayer` to make Intlayer dictionaries usable in Next.js applications. It integrates essential features to make Intlayer work in a Next.js environment, such as translation middleware, routing, or the `next.config.js` file configuration.

### vue-intlayer

The `vue-intlayer` package is used to interpret Intlayer dictionaries and make them usable in Vue applications.

### nuxt-intlayer

The `nuxt-intlayer` package is as Nuxt module to make Intlayer dictionaries usable in Nuxt applications. It integrates essential features to make Intlayer work in a Nuxt environment, such as translation middleware, routing, or the `nuxt.config.js` file configuration.

### svelte-intlayer

The `svelte-intlayer` package is used to interpret Intlayer dictionaries and make them usable in Svelte applications.

### solid-intlayer (WIP)

The `solid-intlayer` package is used to interpret Intlayer dictionaries and make them usable in Solid.js applications.

### preact-intlayer

The `preact-intlayer` package is used to interpret Intlayer dictionaries and make them usable in Preact applications.

### angular-intlayer (WIP)

The `angular-intlayer` package is used to interpret Intlayer dictionaries and make them usable in Angular applications.

### express-intlayer

The `express-intlayer` package is used to use Intlayer on an Express.js backend.

### react-native-intlayer

The `react-native-intlayer` package provides tools that integrate plugins for Intlayer to work with the Metro bundler.

### lynx-intlayer

The `lynx-intlayer` package provides tools that integrate plugins for Intlayer to work with the Lynx bundler.

### vite-intlayer

Includes the Vite plugin for integrating Intlayer with the [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), as well as middleware for detecting the user's preferred locale, managing cookies, and handling URL redirection.

### react-scripts-intlayer

Includes the `react-scripts-intlayer` commands and plugins for integrating Intlayer with the Create React App based application. These plugins are based on [craco](https://craco.js.org/) and include additional configuration for the [Webpack](https://webpack.js.org/) bundler.

### intlayer-editor

The `intlayer-editor` package is used to allow the use of the visual editor. This package, optional, can be installed in applications and will be used by the `react-intlayer` package.
It consists of two parts: the server and the client.

The client contains UI elements that will be used by `react-intlayer`.

The server, based on Express, is used to receive the visual editor requests and manage or modify content files.

### intlayer-cli

The `intlayer-cli` package can be used to generate dictionaries using the `npx intlayer dictionaries build` command. If `intlayer` is already installed, the CLI is automatically installed and this package is not necessary.

### @intlayer/core

The `@intlayer/core` package is the master Intlayer package. It contains translation and dictionary management functions. `@intlayer/core` is multiplatform and is used by other packages to perform interpretation of dictionaries.

### @intlayer/config

The `@intlayer/config` package is used to configure Intlayer settings, such as available languages, Next.js middleware parameters, or the integrated editor settings.

### @intlayer/webpack

The `@intlayer/webpack` package is used to provide a Webpack configuration to make a Webpack-based application work with Intlayer. The package also provides a plugin to add to an existing Webpack application.

### @intlayer/cli

The `@intlayer/cli` package is an NPM package that is used to declare the scripts related to the Intlayer command line interfaces. It ensures the uniformity of all Intlayer CLI commands. This package is notably consumed by the [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/en/packages/intlayer-cli/index.md), and the [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/en/packages/intlayer/index.md) packages.

### @intlayer/mcp

The `@intlayer/mcp` package provides an MCP (Model Context Protocol) server that delivers AI-powered IDE assistance tailored for the Intlayer ecosystem. It automatically loads documentation and integrates with the Intlayer CLI.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

The `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` and `@intlayer/dynamic-dictionaries-entry` packages return the entry path of the Intlayer dictionaries. Since searching the filesystem from the browser is impossible, using bundlers like Webpack or Rollup to retrieve the entry path of the dictionaries is not possible. These packages are designed to be aliased, allowing for bundling optimization across various bundlers such as Vite, Webpack, and Turbopack.

### @intlayer/chokidar

The `@intlayer/chokidar` package is used to monitor content files and regenerate the modified dictionary at each modification.

### @intlayer/editor

The `@intlayer/editor` package provides the utilities related to the dictionary editor. It notably includes the API to interface an application with the Intlayer editor, and utilities to manipulate dictionaries. This package is cross-platform.

### @intlayer/editor-react

The `@intlayer/editor-react` package provides states, contexts, hooks and components to interface a React application with the Intlayer editor.

### @intlayer/babel

The `@intlayer/babel` package provides tools that optimize bundling of dictionaries for Vite and Webpack based applications.

### @intlayer/swc

The `@intlayer/swc` package provides tools that optimize bundling of dictionaries for Next.js applications.

### @intlayer/api

The `@intlayer/api` package is an API SDK to interact with the backend.

### @intlayer/design-system

The `@intlayer/design-system` package is used to share design elements between the CMS and Visual editor.

### @intlayer/backend

The `@intlayer/backend` package exports backend types and will eventually offer the backend as a standalone package in the future.

## Chat with our smart documentation

- [Ask your questions to our smart documentation](https://intlayer.org/doc/chat)
