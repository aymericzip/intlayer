---
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: Intlayer 的优势
description: 了解在项目中使用 Intlayer 的好处和优势。理解为什么 Intlayer 在众多框架中脱颖而出。
keywords:
  - 好处
  - 优势
  - Intlayer
  - 框架
  - 比较
slugs:
  - doc
  - why
---

# 为什么你应该考虑使用 Intlayer？

## 什么是 Intlayer？

**Intlayer** 是一个专为 JavaScript 开发者设计的国际化库。它允许你在代码的任何地方声明内容。它将多语言内容的声明转换为结构化的字典，方便集成到你的代码中。通过使用 TypeScript，**Intlayer** 使你的开发更加稳健和高效。

## 为什么创建 Intlayer？

Intlayer 的创建是为了解决所有常见国际化库（如 `next-intl`、`react-i18next`、`react-intl`、`next-i18next`、`react-intl` 和 `vue-i18n`）普遍存在的一个问题。

所有这些解决方案都采用集中式的方法来列出和管理你的内容。例如：

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

或者这里使用命名空间：

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

这种架构会减慢开发进度，并使代码库更难维护，原因有以下几点：

1. **对于创建的任何新组件，您需要：**
   - 在 `locales` 文件夹中创建新的资源/命名空间
   - 记得在页面中导入新的命名空间
   - 翻译您的内容（通常通过从 AI 提供者手动复制/粘贴完成）

2. **对于组件的任何更改，您需要：**
   - 查找相关的资源/命名空间（通常远离组件）
   - 翻译您的内容
   - 确保您的内容在所有语言环境中都是最新的
   - 验证您的命名空间中不包含未使用的键/值
   - 确保所有语言环境的 JSON 文件结构一致

在专业项目中使用这些解决方案时，通常会使用本地化平台来帮助管理内容的翻译。然而，对于大型项目来说，这可能很快变得昂贵。

为了解决这个问题，Intlayer 采用了一种按组件范围划分内容的方法，并将内容保持在组件附近，就像我们经常对 CSS（`styled-components`）、类型、文档（`storybook`）或单元测试（`jest`）所做的那样。

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// 组件示例内容的字典定义
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

这种方法允许您：

1. **提高开发速度**
   - 可以使用 VSCode 扩展创建 `.content.{{ts|mjs|cjs|json}}` 文件
   - IDE 中的自动补全 AI 工具（如 GitHub Copilot）可以帮助你声明内容，减少复制/粘贴

2. **降低代码库的复杂性**

3. **提高代码库的可维护性**

4. **更轻松地复制组件及其相关内容（例如：登录/注册组件等）**
   - 限制影响其他组件内容的风险
   - 通过复制/粘贴内容从一个应用到另一个应用，无需外部依赖

5. **避免因未使用的组件而污染代码库，产生未使用的键/值**
   - 如果不使用某个组件，则无需导入其内容
   - 如果你删除一个组件，你会更容易记得删除其相关内容，因为它们会存在于同一个文件夹中

6. **降低 AI 代理声明多语言内容的推理成本**
   - AI 代理无需扫描整个代码库来确定内容的实现位置
   - 翻译可以通过 IDE 中的自动补全 AI 工具（如 GitHub Copilot）轻松完成

7. **优化加载性能**
   - 如果组件是懒加载的，其相关内容也会同时加载

## Intlayer 的附加功能

| 功能                                                                                                                   | 描述                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **跨框架支持**<br><br>Intlayer 兼容所有主流框架和库，包括 Next.js、React、Vite、Vue.js、Nuxt、Preact、Express 等。                                                                                                                                                                                                                                           |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true)       | **基于JavaScript的内容管理**<br><br>利用JavaScript的灵活性，高效地定义和管理您的内容。<br><br> - [内容声明](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                        |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **每语言内容声明文件**<br><br>通过在自动生成之前只声明一次内容，加快您的开发速度。<br><br> - [每语言内容声明文件](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                   | **类型安全环境**<br><br>利用 TypeScript 确保您的内容定义和代码无错误，同时享受 IDE 自动补全的便利。<br><br> - [TypeScript 配置](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                      | **简化设置**<br><br>通过最少的配置快速启动运行。轻松调整国际化、路由、AI、构建和内容处理的设置。<br><br> - [探索 Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                  |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **简化的内容获取**<br><br>无需为每一条内容调用你的 `t` 函数。使用单个钩子直接获取所有内容。<br><br> - [React 集成](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                 | **一致的服务器组件实现**<br><br>完美适用于 Next.js 服务器组件，客户端和服务器组件使用相同的实现，无需在每个服务器组件之间传递你的 `t` 函数。<br><br> - [服务器组件](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                         |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **有序的代码库**<br><br>保持代码库更有条理：1 个组件 = 同一文件夹中的 1 个字典。将翻译内容放置在各自组件附近，有助于提升可维护性和清晰度。<br><br> - [Intlayer 的工作原理](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                              |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **增强路由**<br><br>全面支持应用路由，能够无缝适应复杂的应用结构，适用于 Next.js、React、Vite、Vue.js 等框架。<br><br> - [探索 Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                    |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown 支持**<br><br>导入并解析本地化文件和远程 Markdown，用于多语言内容，如隐私政策、文档等。解析并使 Markdown 元数据在代码中可访问。<br><br> - [内容文件](https://intlayer.org/doc/concept/content/file)                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                    | **免费可视化编辑器和CMS**<br><br>为内容创作者提供免费的可视化编辑器和CMS，无需使用本地化平台。通过Git保持内容同步，或使用CMS将内容完全或部分外部化。<br><br> - [Intlayer 编辑器](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                           | **可摇树内容**<br><br>可摇树内容，减少最终包的大小。按组件加载内容，排除任何未使用的内容。支持懒加载以提升应用加载效率。<br><br> - [应用构建优化](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                                                |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **静态渲染**<br><br>不会阻塞静态渲染。<br><br> - [Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                   | **AI 驱动的翻译**<br><br>使用 Intlayer 的先进 AI 驱动翻译工具，结合您自己的 AI 提供商/API 密钥，只需一键即可将您的网站转换为 231 种语言。<br><br> - [CI/CD 集成](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [自动填充](https://intlayer.org/doc/concept/auto-fill)                           |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP 服务器集成**<br><br>提供一个 MCP（模型上下文协议）服务器，用于 IDE 自动化，实现内容管理和国际化工作流在您的开发环境中无缝进行。<br><br> - [MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)                                                                                                                    |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode 扩展**<br><br>Intlayer 提供了一个 VSCode 扩展，帮助您管理内容和翻译，构建词典，翻译内容等。<br><br> - [VSCode 扩展](https://intlayer.org/doc/zh/vs-code-extension)                                                                                                                                                                                  |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **互操作性**<br><br>支持与 react-i18next、next-i18next、next-intl 和 react-intl 的互操作。 <br><br> - [Intlayer 与 react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer 与 next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer 与 next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) |

## Intlayer 与其他解决方案的比较

| 功能                                   | Intlayer                                                                        | React-i18next / i18next                           | React-Intl (FormatJS)         | LinguiJS                      | next-intl                     | next-i18next                  | vue-i18n                                        |
| -------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------- | ----------------------------- | ----------------------------- | ----------------------------- | ----------------------------------------------- |
| **组件附近的翻译**                     | 是，内容与每个组件共置                                                          | 否                                                | 否                            | 否                            | 否                            | 否                            | 是 - 使用 `单文件组件`（SFCs）                  |
| **TypeScript 集成**                    | 高级，自动生成严格类型                                                          | 基础；额外配置以确保安全                          | 良好，但不够严格              | 类型定义，需要配置            | 良好                          | 基础                          | 良好（提供类型；键安全需要设置）                |
| **缺失翻译检测**                       | 构建时错误/警告                                                                 | 运行时大多回退字符串                              | 回退字符串                    | 需要额外配置                  | 运行时回退                    | 运行时回退                    | 运行时回退/警告（可配置）                       |
| **丰富内容（JSX/Markdown/组件）**      | 直接支持，甚至包括 React 节点                                                   | 有限 / 仅插值                                     | ICU 语法，不是真正的 JSX      | 有限                          | 不支持丰富节点                | 有限                          | 有限（通过 `<i18n-t>` 组件，Markdown 通过插件） |
| **AI驱动的翻译**                       | 是，支持多个AI提供商。可使用您自己的API密钥。考虑您的应用程序和内容范围的上下文 | 否                                                | 否                            | 否                            | 否                            | 否                            | 否                                              |
| **可视化编辑器**                       | 是，本地可视化编辑器 + 可选 CMS；可外部化代码库内容；可嵌入                     | 否 / 可通过外部本地化平台获得                     | 否 / 可通过外部本地化平台获得 | 否 / 可通过外部本地化平台获得 | 否 / 可通过外部本地化平台获得 | 否 / 可通过外部本地化平台获得 | 否 / 可通过外部本地化平台获得                   |
| **本地化路由**                         | 内置，支持中间件                                                                | 插件或手动配置                                    | 非内置                        | 插件/手动配置                 | 内置                          | 内置                          | 通过 Vue Router 手动配置（由 Nuxt i18n 处理）   |
| **动态路由生成**                       | 是                                                                              | 插件/生态系统或手动设置                           | 未提供                        | 插件/手动                     | 是                            | 是                            | 未提供（Nuxt i18n 提供）                        |
| **复数形式**                           | 基于枚举的模式；详见文档                                                        | 可配置（如 i18next-icu 插件）                     | 高级（ICU）                   | 高级（ICU/messageformat）     | 良好                          | 良好                          | 高级（内置复数规则）                            |
| **格式化（日期、数字、货币）**         | 优化的格式化器（底层使用 Intl）                                                 | 通过插件或自定义 Intl 使用                        | 高级 ICU 格式化器             | ICU/CLI 辅助工具              | 良好（Intl 辅助工具）         | 良好（Intl 辅助工具）         | 内置日期/数字格式化器（Intl）                   |
| **内容格式**                           | .tsx, .ts, .js, .json, .md, .txt                                                | .json                                             | .json, .js                    | .po, .json                    | .json, .js, .ts               | .json                         | .json, .js                                      |
| **ICU 支持**                           | 进行中（原生 ICU）                                                              | 通过插件（i18next-icu）                           | 是                            | 是                            | 是                            | 通过插件（i18next-icu）       | 通过自定义格式化器/编译器                       |
| **SEO 辅助工具（hreflang，网站地图）** | 内置工具：网站地图、**robots.txt**、元数据的辅助工具                            | 社区插件/手动配置                                 | 非核心功能                    | 非核心功能                    | 良好                          | 良好                          | 非核心功能（Nuxt i18n 提供辅助工具）            |
| **生态系统 / 社区**                    | 较小但增长迅速且反应灵敏                                                        | 最大且最成熟                                      | 大型，企业级                  | 发展中，规模较小              | 中型，专注于 Next.js          | 中型，专注于 Next.js          | Vue 生态系统中规模较大                          |
| **服务器端渲染与服务器组件**           | 是，针对 SSR / React 服务器组件进行了优化                                       | 支持，但需要一些配置                              | 在 Next.js 中支持             | 支持                          | 完全支持                      | 完全支持                      | 通过 Nuxt/Vue SSR 支持 SSR（无 RSC）            |
| **Tree-shaking（仅加载使用的内容）**   | 是的，通过 Babel/SWC 插件在构建时按组件进行                                     | 通常加载全部（可以通过命名空间/代码拆分进行改进） | 通常加载全部                  | 非默认                        | 部分支持                      | 部分支持                      | 部分支持（通过代码拆分/手动设置）               |
| **懒加载**                             | 是的，按语言环境/按组件加载                                                     | 是的（例如，按需加载后端/命名空间）               | 是的（拆分语言环境包）        | 是的（动态目录导入）          | 是的（按路由/按语言环境）     | 是的（按路由/按语言环境）     | 是的（异步语言环境消息）                        |
| **大型项目管理**                       | 鼓励模块化，适合设计系统                                                        | 需要良好的文件管理                                | 中央目录可能变得庞大          | 可能变得复杂                  | 通过配置实现模块化            | 通过配置实现模块化            | 通过 Vue Router/Nuxt i18n 配置实现模块化        |

## 文档历史

| 版本   | 日期       | 变更内容       |
| ------ | ---------- | -------------- |
| 5.8.0  | 2025-08-19 | 更新对比表     |
| 5.5.10 | 2025-06-29 | 初始化历史记录 |
