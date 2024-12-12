# Intlayer 的工作原理

## 概述

Intlayer 的角色是将 JavaScript 内容声明文件解释为字典。

为此，Intlayer 经过几个步骤：

1. 内容文件的声明

   - 内容文件可以用各种格式定义，如 TypeScript、ECMAScript、CommonJS 或 JSON。
   - 内容文件可以在项目的任何地方定义，从而实现更好的维护性和可扩展性。重要的是要遵循内容文件的文件扩展名约定。默认扩展名为 `*.content.{js|cjs|mjs|ts|tsx|json}`，但可以在 [配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md) 中进行修改。

2. 字典的生成

   - 字典由内容文件生成。默认情况下，intlayer 字典生成在项目的 `.intlayer/dictionary` 目录中。
   - 可以生成两种类型的字典：intlayer 字典和 i18n 字典（测试版）。

3. 字典类型的生成

   - 字典类型由 intlayer 字典生成。默认情况下，intlayer 字典类型在项目的 `.intlayer/types` 目录中生成。

4. Intlayer 模块增强的生成

   - Intlayer [模块增强](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) 是一种 TypeScript 特性，允许您为 Intlayer 定义额外的类型。这使开发体验更轻松，通过建议可用的参数或必需的参数来实现。
     在生成的类型中，intlayer 字典类型或甚至语言配置类型会被添加到 `types/intlayer.d.ts` 文件，并由其他包使用。为此，需要配置 `tsconfig.json` 文件以包含项目的 `.intlayer/types` 目录。

5. 内容文件监控

   - 内容文件会被监视，以便在每次修改时重新生成。

6. 字典解释
   - 最后，字典被解释为在应用中使用。

## 包

Intlayer 由几个包组成，每个包在翻译过程中都有特定的角色。以下是该包结构的图形表示：

![intlayer 的包](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer` 包用于在应用中声明内容文件中的内容。

### react-intlayer

`react-intlayer` 包用于解释 intlayer 字典并使其可在 React 应用中使用。

### next-intlayer

`next-intlayer` 包作为 `react-intlayer` 的一个层，用于使 intlayer 字典可在 Next.js 应用中使用。它集成了在 Next.js 环境中使 Intlayer 工作的基本功能，如翻译中间件、路由或 `next.config.js` 文件配置。

### intlayer-editor

`intlayer-editor` 包用于允许使用可视化编辑器。该包是可选的，可以在应用中安装，并将被 `react-intlayer` 包使用。
它由两部分组成：服务器和客户端。

客户端包含将由 `react-intlayer` 使用的用户界面元素。

服务器基于 Express，用于接收编辑器的可视化请求并管理或修改内容文件。

### intlayer-cli

`intlayer-cli` 包可用于使用 `npx intlayer build` 命令生成字典。如果已经安装了 `intlayer`，则 cli 会自动安装，此包则不再需要。

### @intlayer/core

`@intlayer/core` 包是主 Intlayer 包。它包含翻译和字典管理函数。`@intlayer/core` 是多平台的，并被其他包用来执行字典的解释。

### @intlayer/config

`@intlayer/config` 包用于配置 Intlayer 设置，如可用语言、Next.js 中间件参数或集成编辑器设置。

### @intlayer/webpack

`@intlayer/webpack` 包用于向 Next.js 和 React 添加编译插件。

### @intlayer/cli

`@intlayer/cli` 包用于确保所有 intlayer CLI 命令的一致性。

### @intlayer/dictionaries-entry

`@intlayer/dictionaries-entry` 包仅返回 intlayer 字典的入口路径。由于浏览器无法进行文件系统搜索，因此无法使用像 Webpack 或 Rollup 这样的捆绑工具来检索字典的入口路径。此包旨在被别名。

### @intlayer/chokidar

`@intlayer/chokidar` 包用于监控内容文件，并在每次修改时重新生成修改过的字典。
