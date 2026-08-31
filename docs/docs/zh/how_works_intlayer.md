---
createdAt: 2024-08-12
updatedAt: 2026-08-30
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
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
author: aymericzip
---

# Intlayer 的工作原理

## 目录

<TOC/>

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

> 要查看 Intlayer 的所有功能，您可以阅读 [字典文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

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

当你使用 `useIntlayer` 调用内容且编辑器已启用时，它会自动用一个名为 `IntlayerNode` 的 Proxy 对象包装你的字符串。这个节点使用 `window.postMessage` 与包含可视化编辑器界面的 iframe 进行通信。
在编辑器端，编辑器监听这些消息并模拟与你的内容的真实交互，允许你在应用程序的上下文中直接编辑文本。

## 应用构建优化

为了优化应用的Bundle 大小，Intlayer 提供了两个插件来优化应用的构建：`@intlayer/babel` 和 `@intlayer/swc` 插件。
Babel 和 SWC 插件通过分析应用程序的抽象语法树（AST）来替换 Intlayer 函数的调用为优化后的代码。此过程确保只导入实际使用的字典，优化分块，从而减小生产环境中的最终包体积。

Babel 和 SWC 插件通过分析你的应用程序的抽象语法树 (AST) 来工作，用优化的代码替换 Intlayer 函数的调用。这个过程通过确保只导入实际使用的字典，优化分块并减少 bundle 大小，使你的最终 bundle 在生产环境中更轻。

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

### @intlayer/engine

`@intlayer/engine` 包用于监视内容文件，并在每次修改时重新生成被修改的字典。

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

## 常见问题

<FAQ>

<Question title="字典是在构建时构建还是在运行时构建？">

在构建时构建。打包器插件或 `npx intlayer build` 会扫描您的 `.content.ts` 文件，将它们解析为 `.intlayer` 文件夹中的字典，并生成匹配的 TypeScript 类型。在运行时，您的组件仅读取生成的结果，因此在请求处理路径上不会发生任何文件读取或解析操作。

</Question>

<Question title="i18n 会给我的 bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。服务端渲染的标记在服务端直接解析内容，而构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃。[动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)。

</Question>

<Question title="我可以从 i18next、next-intl 或 react-i18next 迁移而无需重写组件吗？">

可以，有两条迁移路径。您可以使用 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md) 或 [next-intl 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_next-intl_to_intlayer.md) 逐步迁移内容。或者，您可以完全保留当前的 API：[兼容性适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 公开与 `i18next`、`react-i18next`、`next-intl`、`next-i18next`、`react-intl`、`use-intl`、`vue-i18n` 和 `Lingui` 完全相同的 API，但底层由 Intlayer 字典驱动，因此只需更改导入语句，组件代码无需修改。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的源码文件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。请参阅 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)。

如需全自动流程，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 可以在构建时对 JSX、TSX、Vue 和 Svelte 源码执行相同操作，在每次更改时自动生成字典，完全无需手动维护键名。它通过静态分析工作，因此仅在运行时存在的字符串无法被捕获，并且需要少量注解以区分用户文本和应用程序逻辑。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="什么是 .intlayer 文件夹，我应该提交它吗？">

它是构建生成的产物目录：包含编译后的字典和生成的类型。它是从您的内容文件中派生生成的，因此应将其列入 `.gitignore` 中，并像对待 `dist` 目录一样在构建步骤中重新生成，不建议提交到版本控制中。

</Question>

<Question title="活动语言环境是如何确定的？">

通过 `routing.storage` 中列出的来源按顺序解析：当 `routing.mode` 启用前缀时首先读取 URL 前缀，其次是 Cookie，然后是 `Accept-Language` 请求头，最后回退到您的默认语言环境。用户明确选择的语言环境会被持久化，因此在下次访问时依然有效。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Question>

<Question title="本地字典和远程字典有什么区别？">

本地字典在您的代码库中声明，并随应用程序一起编译打包。远程字典在 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 中管理并在运行时进行解析，因此可以在无需重新部署的情况下随时修改。两者通过相同的 Hook 进行读取，并且当远程内容不可用时，会自动回退到本地声明的内容。

</Question>

<Question title="Intlayer 是否可以在不使用 TypeScript 的情况下运行？">

可以。内容文件可以使用 TypeScript、JavaScript、ESM、CommonJS 或 JSON 编写。TypeScript 能够为您带来自动类型生成和完整的自动补全体验，因此是我们推荐的配置方式，但它并非强制要求。

</Question>

<Question title="服务端渲染和客户端渲染如何共享相同的内容？">

服务端会直接解析服务端渲染组件的内容，因此无需为这部分 HTML 向客户端发送字典。客户端组件通过 Provider 读取相同的字典，Provider 接收在服务端解析出的语言环境，因此客户端的首次渲染与服务端 HTML 完全匹配，不会出现语言闪烁。

</Question>

<Question title="Intlayer 如何避免语言环境的水合不匹配 (hydration mismatch)？">

语言环境在服务端仅解析一次并传递给 Provider，而不是在浏览器中重新检测。因为客户端以服务端渲染所用的相同语言环境作为初始状态，所以生成的标记完全匹配，从而避免了客户端单独检测语言时常出现的水合不匹配问题。

</Question>

<Question title="添加翻译后需要重新构建吗？">

在开发环境下不需要：插件会监视您的内容文件并在保存时自动重新构建受影响的字典。在生产环境中，字典是构建产物的一部分；除非内容配置为远程管理，此时通过 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 和 [实时同步 (live sync)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/live.md) 即可无需重新部署直接应用最新更新。

</Question>

</FAQ>
