---
createdAt: 2024-08-12
updatedAt: 2025-06-29
title: Intlayer 的工作原理
description: 了解Intlayer的内部运作方式。理解使Intlayer强大的架构和组件。
keywords:
  - Intlayer
  - 如何运作
  - 架构
  - 组成部分
  - 内部运作
slugs:
  - doc
  - concept
  - how-works-intlayer
---

# Intlayer 的工作原理

## 概述

Intlayer 的核心理念是采用每个组件的内容管理。因此，Intlayer 的理念是允许您在代码库中的任何地方声明内容，例如与组件位于同一目录中。

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

为此，Intlayer 的作用是找到项目中所有的 `内容声明文件`，无论格式如何，然后从中生成 `字典`。

因此，主要有两个步骤：

- 构建步骤
- 解释步骤

### 字典的构建步骤

构建步骤可以通过以下三种方式完成：

- 使用 CLI 命令 `npx intlayer build`
- 使用 [vscode 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)
- 使用应用插件，例如 [`vite-intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/index.md)，或其在 [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md) 中的等价插件。当您使用这些插件之一时，Intlayer 会在启动（开发模式）或构建（生产模式）应用时自动构建您的字典。

1. 内容文件的声明
   - 内容文件可以以多种格式定义，例如 TypeScript、ECMAScript、CommonJS 或 JSON。
   - 内容文件可以在项目中的任何地方定义，这有助于更好的维护和扩展性。重要的是要遵守内容文件的文件扩展名约定。默认扩展名为 `*.content.{js|cjs|mjs|ts|tsx|json}`，但可以在 [配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 中修改。

2. `字典` 的生成
   - 字典是从内容文件生成的。默认情况下，Intlayer 字典生成在项目的 `.intlayer/dictionaries` 目录中。
   - 这些字典以不同格式生成，以满足所有需求并优化应用性能。

3. 字典类型的生成

基于您的 `字典`，Intlayer 将生成类型以便在您的应用中使用。

- 字典类型是从 Intlayer 的 `内容声明文件` 生成的。默认情况下，Intlayer 字典类型生成在项目的 `.intlayer/types` 目录中。

- Intlayer [模块增强](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) 是 TypeScript 的一个功能，允许您为 Intlayer 定义额外的类型。这使得开发体验更加轻松，通过建议可用参数或必需参数。
  在生成的类型中，Intlayer 字典类型甚至语言配置类型会被添加到 `types/intlayer.d.ts` 文件中，并被其他包使用。为此，`tsconfig.json` 文件需要配置以包含项目的 `types` 目录。

### 字典的解释步骤

使用 Intlayer，您可以通过 `useIntlayer` 钩子在应用中访问您的内容。

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

此钩子将为您管理语言环境检测，并返回当前语言环境的内容。通过此钩子，您还可以解释 markdown、管理复数化等。

> 要查看 Intlayer 的所有功能，您可以阅读 [字典文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

## 远程内容

Intlayer 允许您在本地声明内容，然后将其导出到 CMS，以便您的非技术团队可以编辑它。

因此，您可以像使用 Git 管理代码一样，从 CMS 推送和拉取内容到您的应用。

对于使用 CMS 外部化的字典，Intlayer 会执行基本的获取操作以检索远程字典，并将其与本地字典合并。如果在您的项目中进行了配置，Intlayer 会在应用启动（开发环境）或构建（生产环境）时自动管理从 CMS 获取内容的过程。

## 可视化编辑器

Intlayer 还提供了一个可视化编辑器，允许您以可视化的方式编辑内容。此 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 可在外部 `intlayer-editor` 包中使用。

![可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- 服务器是一个简单的 Express 应用程序，监听来自客户端的请求并检索您的应用内容，例如 `dictionaries` 和配置，以便在客户端访问。
- 另一方面，客户端是一个 React 应用程序，用于通过可视化界面与您的内容交互。
  当您使用 `useIntlayer` 调用内容且编辑器已启用时，它会自动使用名为 `IntlayerNode` 的 Proxy 对象包装您的字符串。该节点使用 `window.postMessage` 与包含可视化编辑器界面的嵌套 iframe 通信。  
  在编辑器端，编辑器监听这些消息并模拟与您的内容的真实交互，允许您直接在应用程序的上下文中编辑文本。

## 应用构建优化

为了优化应用的包大小，Intlayer 提供了两个插件来优化应用的构建：`@intlayer/babel` 和 `@intlayer/swc` 插件。
Babel 和 SWC 插件通过分析应用程序的抽象语法树（AST）来替换 Intlayer 函数的调用为优化后的代码。此过程确保只导入实际使用的字典，优化分块，从而减小生产环境中的最终包体积。

在开发模式下，Intlayer 使用集中式静态导入字典以简化开发体验。

通过在[配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)中激活选项 `importMode = "dynamic"`，Intlayer 将使用动态导入来加载字典。此选项默认禁用，以避免在渲染应用时进行异步处理。

> `@intlayer/babel` 默认包含在 `vite-intlayer` 包中，

> `@intlayer/swc` 默认未安装在 `next-intlayer` 包中，因为 SWC 插件在 Next.js 中仍然是实验性的。

要了解如何配置应用的构建，您可以阅读 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 包

Intlayer 由多个包组成，每个包在翻译过程中都有特定的角色。以下是此包结构的图形表示：

![intlayer 的包](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer` 包用于在应用中声明内容文件中的内容。

### react-intlayer

### react-intlayer

`react-intlayer` 包用于解释 Intlayer 字典并使其在 React 应用中可用。

### next-intlayer

`next-intlayer` 包作为 `react-intlayer` 的扩展层，用于使 Intlayer 字典在 Next.js 应用中可用。它集成了使 Intlayer 在 Next.js 环境中工作的基本功能，例如翻译中间件、路由或 `next.config.js` 文件配置。

### vue-intlayer

`vue-intlayer` 包用于解释 Intlayer 字典并使其在 Vue 应用中可用。

### nuxt-intlayer

`nuxt-intlayer` 包作为 Nuxt 模块，用于使 Intlayer 字典在 Nuxt 应用中可用。它集成了使 Intlayer 能够在 Nuxt 环境中工作的关键功能，例如翻译中间件、路由以及 `nuxt.config.js` 文件配置。

### svelte-intlayer (开发中)

`svelte-intlayer` 包用于解释 Intlayer 字典并使其在 Svelte 应用中可用。

### solid-intlayer (开发中)

`solid-intlayer` 包用于解释 Intlayer 字典并使其在 Solid.js 应用中可用。

### preact-intlayer

`preact-intlayer` 包用于解释 Intlayer 字典并使其在 Preact 应用中可用。

### angular-intlayer (开发中)

### angular-intlayer (开发中)

`angular-intlayer` 包用于解释 Intlayer 字典并使其在 Angular 应用中可用。

### express-intlayer

`express-intlayer` 包用于在 Express.js 后端中使用 Intlayer。

### react-native-intlayer

`react-native-intlayer` 包提供了集成插件的工具，使 Intlayer 能够与 Metro 打包器一起工作。

### lynx-intlayer

`lynx-intlayer` 包提供了集成插件的工具，使 Intlayer 能够与 Lynx 打包器一起工作。

### vite-intlayer

包括用于将 Intlayer 集成到 [Vite 打包器](https://vite.dev/guide/why.html#why-bundle-for-production) 的 Vite 插件，以及用于检测用户首选语言环境、管理 Cookie 和处理 URL 重定向的中间件。

### react-scripts-intlayer

包括用于将 Intlayer 集成到基于 Create React App 的应用程序中的 `react-scripts-intlayer` 命令和插件。这些插件基于 [craco](https://craco.js.org/)，并包含针对 [Webpack](https://webpack.js.org/) 打包器的额外配置。

### intlayer-editor

`intlayer-editor` 包用于支持可视化编辑器的使用。这个包是可选的，可以安装到应用程序中，并由 `react-intlayer` 包使用。
它由两部分组成：服务器和客户端。

客户端包含由 `react-intlayer` 使用的 UI 元素。

基于 Express 的服务器用于接收可视化编辑器的请求并管理或修改内容文件。

### intlayer-cli

`intlayer-cli` 包可以通过 `npx intlayer dictionaries build` 命令生成字典。如果已经安装了 `intlayer`，CLI 会自动安装，因此不需要单独安装此包。

### @intlayer/core

`@intlayer/core` 包是 Intlayer 的核心包。它包含翻译和字典管理功能。`@intlayer/core` 是跨平台的，并被其他包用来执行字典的解析。

### @intlayer/config

`@intlayer/config` 包用于配置 Intlayer 的设置，例如可用语言、Next.js 中间件参数或集成编辑器的设置。

### @intlayer/webpack

`@intlayer/webpack` 包用于提供 Webpack 配置，使基于 Webpack 的应用程序能够与 Intlayer 一起工作。该包还提供了一个插件，可以添加到现有的 Webpack 应用程序中。

### @intlayer/cli

`@intlayer/cli` 包是一个 NPM 包，用于声明与 Intlayer 命令行接口相关的脚本。它确保了所有 Intlayer CLI 命令的一致性。此包主要被 [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/zh/packages/intlayer-cli/index.md) 和 [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/zh/packages/intlayer/index.md) 包所使用。

### @intlayer/mcp

`@intlayer/mcp` 包提供一个 MCP（模型上下文协议）服务器，提供针对 Intlayer 生态系统的 AI 驱动的 IDE 辅助。它会自动加载文档并与 Intlayer CLI 集成。
`@intlayer/mcp` 包提供一个 MCP（模型上下文协议）服务器，提供针对 Intlayer 生态系统定制的 AI 驱动的 IDE 辅助。它会自动加载文档并与 Intlayer CLI 集成。

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

`@intlayer/dictionaries-entry`、`@intlayer/unmerged-dictionaries-entry` 和 `@intlayer/dynamic-dictionaries-entry` 包返回 Intlayer 字典的入口路径。由于浏览器无法搜索文件系统，因此无法使用像 Webpack 或 Rollup 这样的打包工具来获取字典的入口路径。这些包设计为别名，以便在 Vite、Webpack 和 Turbopack 等各种打包工具中进行打包优化。

### @intlayer/chokidar

`@intlayer/chokidar` 包用于监视内容文件，并在每次修改时重新生成被修改的字典。

### @intlayer/editor

`@intlayer/editor` 包提供与字典编辑器相关的实用工具。它特别包括用于使应用程序与 Intlayer 编辑器接口的 API 以及操作字典的实用工具。该包是跨平台的。

### @intlayer/editor-react

`@intlayer/editor-react` 包提供状态、上下文、钩子和组件，以便使 React 应用程序与 Intlayer 编辑器接口。

### @intlayer/babel

`@intlayer/babel` 包提供工具，用于优化基于 Vite 和 Webpack 的应用程序的字典打包。

### @intlayer/swc (开发中)

`@intlayer/swc` 包提供工具，用于优化基于 Next.js 应用程序的字典打包。

### @intlayer/api

`@intlayer/api` 包是一个 API SDK，用于与后端交互。

### @intlayer/design-system

`@intlayer/design-system` 包用于在 CMS 和可视化编辑器之间共享设计元素。

### @intlayer/backend

`@intlayer/backend` 包导出后端类型，并将在未来作为独立包提供后端功能。

## 与我们的智能文档聊天

- [向我们的智能文档提问](https://intlayer.org/doc/chat)

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
