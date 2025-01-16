# How Intlayer Works

## Overview

Intlayer 的角色是将 JavaScript 内容声明文件解释为字典。

为此，Intlayer 经过几个步骤：

1. 内容文件的声明

   - 内容文件可以以各种格式定义，例如 TypeScript、ECMAScript、CommonJS 或 JSON。
   - 内容文件可以在项目的任何地方定义，这有助于更好的维护和扩展性。重要的是要遵循内容文件的文件扩展名约定。默认情况下，该扩展名为 `*.content.{js|cjs|mjs|ts|tsx|json}`，但可以在 [配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md) 中修改。

2. 字典的生成

   - 字典是从内容文件生成的。默认情况下，intlayer 字典生成在项目的 `.intlayer/dictionary` 目录中。
   - 可以生成两种类型的字典：intlayer 字典和 i18n 字典（beta）。

3. 字典类型的生成

   - 字典类型是从 intlayer 字典生成的。默认情况下，intlayer 字典类型生成在项目的 `types` 目录中。

4. Intlayer 模块扩展的生成

   - Intlayer [模块扩展](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) 是一个 TypeScript 特性，允许您为 Intlayer 定义额外的类型。这使开发经验更容易，通过建议可用的参数或必需的参数。
     在生成的类型中，intlayer 字典类型甚至语言配置类型被添加到 `types/intlayer.d.ts` 文件中，并被其他包使用。为此，必须将 `tsconfig.json` 文件配置为包括项目的 `types` 目录。

5. 内容文件监控

   - 内容文件被监控，以在每次修改时重新生成。

6. 字典解释
   - 字典最终被解释以在应用中使用。

## Packages

Intlayer 由多个包组成，每个包在翻译过程中具有特定的角色。以下是该包结构的图形表示：

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer` 包用于在应用程序中声明内容文件中的内容。

### react-intlayer

`react-intlayer` 包用于解释 intlayer 字典并使其可在 React 应用程序中使用。

### next-intlayer

`next-intlayer` 包用于在 `react-intlayer` 之上作为一层，使 intlayer 字典可在 Next.js 应用程序中使用。它集成了使 Intlayer 在 Next.js 环境中工作的重要功能，例如翻译中间件、路由或 `next.config.js` 文件配置。

### vite-intlayer

包括用于将 Intlayer 与 [Vite 打包工具](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及用于检测用户的首选区域设置、管理 cookie 和处理 URL 重定向的中间件。

### react-scripts-intlayer

包括 `react-scripts-intlayer` 命令和插件，用于将 Intlayer 与基于 Create React App 的应用程序集成。这些插件基于 [craco](https://craco.js.org/) 并包含对 [Webpack](https://webpack.js.org/) 打包工具的附加配置。

### intlayer-editor

`intlayer-editor` 包用于允许使用可视化编辑器。该包是可选的，可以在应用程序中安装，并将由 `react-intlayer` 包使用。
它包括两个部分：服务器和客户端。

客户端包含将由 `react-intlayer` 使用的 UI 元素。

服务器基于 Express，用于接收编辑器的可视请求并管理或修改内容文件。

### intlayer-cli

`intlayer-cli` 包可用于使用 `npx intlayer build` 命令生成字典。如果已经安装了 `intlayer`，则 cli 会自动安装，而此包不是必需的。

### @intlayer/core

`@intlayer/core` 包是主 Intlayer 包。它包含翻译和字典管理功能。`@intlayer/core` 是跨平台的，并由其他包使用来执行字典的解释。

### @intlayer/config

`@intlayer/config` 包用于配置 Intlayer 设置，例如可用语言、Next.js 中间件参数或集成编辑器设置。

### @intlayer/webpack

`@intlayer/webpack` 包用于提供 Webpack 配置，以使基于 Webpack 的应用程序与 Intlayer 一起工作。该包还提供一个插件，以添加到现有的 Webpack 应用程序中。

### @intlayer/cli

`@intlayer/cli` 包是一个 NPM 包，用于声明与 intlayer 命令行接口相关的脚本。它确保所有 intlayer CLI 命令的统一性。该包特别被 [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/zh/packages/intlayer-cli/index.md) 和 [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/zh/packages/intlayer/index.md) 包消费。

### @intlayer/dictionaries-entry

`@intlayer/dictionaries-entry` 包是一个仅返回 intlayer 字典的入口路径的包。由于无法从浏览器进行文件系统搜索，因此使用像 Webpack 或 Rollup 这样的打包工具来检索字典的入口路径是不可能的。该包的目标是被重命名。

### @intlayer/chokidar

`@intlayer/chokidar` 包用于监控内容文件，并在每次修改时重新生成修改后的字典。

## Chat with our smart documentation

- [向我们的智能文档提出您的问题](https://intlayer.org/docs/chat)
