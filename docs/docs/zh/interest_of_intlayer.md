---
createdAt: 2024-08-14
updatedAt: 2026-05-31
title: Intlayer 的重要性
description: 探索在项目中使用 Intlayer 的好处和优势。了解为什么 Intlayer 在其他框架中脱颖而出。
keywords:
  - 好处
  - 优势
  - Intlayer
  - 框架
  - 对比
slugs:
  - doc
  - why
history:
  - version: 8.11.2
    date: 2026-05-31
    changes: "添加为什么选择 Intlayer 而不是其他替代方案的章节"
  - version: 7.3.1
    date: 2025-11-27
    changes: "发布编译器"
  - version: 5.8.0
    date: 2025-08-19
    changes: "更新对比表"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史记录"
---

# 为什么你应该考虑使用 Intlayer？

## 什么是 Intlayer？

**Intlayer** 是一个专门为 JavaScript 开发者设计的国际化（i18n）库。它允许你在代码中的任何地方声明你的内容。它将多语言内容的声明转换为结构化的字典，以便轻松集成到你的代码中。通过使用 TypeScript，**Intlayer** 让你的开发工作更加稳固和高效。

## 为什么选择 Intlayer 而不是其他替代方案？

与 `next-intl` 或 `i18next` 等主要解决方案相比，Intlayer 是一个自带集成优化的解决方案，例如：

**打包体积 (Bundle size)**

无需在页面中加载庞大的 JSON 文件，只需加载必要的特定内容。Intlayer 可以帮助你**将打包体积和页面大小减少多达 50%**。

**可维护性 (Maintainability)**

对应用程序的内容进行组件级的范围限制，**大大简化了大型应用程序的维护工作**。你可以复制或删除单个功能文件夹，而无需承担审查整个内容代码库的精神负担。此外，Intlayer 是**完全类型化**的，以确保你内容的准确性。

**AI 智能体支持 (AI Agent)**

将内容与组件共同放置（Co-location）**减少了大型语言模型（LLMs）所需的上下文**。Intlayer 还提供了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 以及 **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 智能体的开发体验（DX）更加流畅。

**功能丰富 (Feature)**

Intlayer 提供了其他 i18n 解决方案所没有的一系列附加功能，例如 [Markdown 支持](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)、[外部内容获取](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)、[文件内容加载](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/file.md)、[实时内容更新](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/live.md)、[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)等。

**自动化 (Automation)**

使用自动化在你的 CI/CD 流程中翻译，可以使用你选择的任何 LLM，成本完全取决于你的 AI 提供商。Intlayer 还提供了一个**编译器**来自动提取内容，以及一个 [网页平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 来帮助你**在后台进行翻译工作**。

**性能表现 (Performance)**

将庞大的 JSON 文件连接到组件上可能会导致性能和响应性问题。Intlayer 在构建时优化了你的内容加载方式。

**扩展至非开发团队 (Scaling with non-dev)**

不仅仅是一个 i18n 解决方案，Intlayer 还提供了一个**自主托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)**和一个**[功能完备的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)**，帮助你**实时**管理多语言内容，使与翻译人员、文案人员和其他团队成员的协作变得无缝衔接。内容可以存储在本地和/或远程。

**跨框架设计 (Cross framework design)**

如果你在应用程序的不同部分使用不同的框架（例如 React、React-native、Vue、Angular、Svelte 等），Intlayer 提供了一种**在所有主流前端框架中使用通用语法和实现**的方法。你还可以跨设计系统、应用、后端等共享你的内容声明。

## 为什么要创建 Intlayer？

创建 Intlayer 是为了解决一个普遍影响所有常见 i18n 库（如 `next-intl`、`react-i18next`、`react-intl`、`next-i18next`、`react-intl` 和 `vue-i18n`）的痛点。

所有这些解决方案都采用集中式方法来列出和管理你的内容。例如：

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

或者使用命名空间（namespaces）：

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

由于以下几个原因，这种架构会降低开发速度，并使代码库的维护变得更加复杂：

1. **对于创建的任何新组件，你都必须：**
   - 在 `locales` 文件夹中创建新的资源/命名空间
   - 记住在页面中导入新的命名空间
   - 翻译你的内容（通常是通过从 AI 提供商手动复制/粘贴来完成）

2. **对于对组件进行的任何更改，你都必须：**
   - 寻找相关的资源/命名空间（远离组件本身）
   - 翻译你的内容
   - 确保你的内容在所有语言（locales）中都是最新的
   - 验证你的命名空间不包含未使用的键/值
   - 确保你的 JSON 文件结构在所有语言中都是相同的

在采用这些解决方案的专业项目中，通常会使用定位管理平台来协助管理内容的翻译。然而，对于大型项目来说，这很快就会变得昂贵。

为了解决这个问题，Intlayer 采用了一种将内容按组件作用域划分的方法，并将你的内容保持在组件附近，就像我们通常对 CSS (`styled-components`)、类型、文档 (`storybook`) 或单元测试 (`jest`) 所做的那样。

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

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

这种方法允许你：

1. **提高开发速度**
   - 可以使用 VSCode 插件创建 `.content.{{ts|mjs|cjs|json}}` 文件
   - IDE 中的 AI 自动补全工具（例如 GitHub Copilot）可以帮助你声明内容，减少复制/粘贴

2. **保持代码库的整洁**
   - 降低复杂度
   - 提高可维护性

3. **更容易地复制组件及其相关内容（例如：登录/注册组件等）**
   - 限制影响其他组件内容的风险
   - 将你的内容从一个应用复制到另一个应用，而无需任何外部依赖

4. **避免在未使用的组件中残留未使用的键/值以污染代码库**
   - 如果你不使用某个组件，Intlayer 将不会导入其相关内容
   - 如果你删除了一个组件，你更容易记得移除其相关内容，因为它就存在于同一个文件夹中

5. **减少 AI 智能体声明多语言内容的推断成本**
   - AI 智能体无需扫描你整个代码库来了解在哪里实现你的内容
   - 翻译可以通过 IDE 中的 AI 自动补全工具（例如 GitHub Copilot）轻松完成

6. **优化加载性能**
   - 如果一个组件是懒加载的，其相关内容将在同一时间被加载

## Intlayer 附加功能

| 功能                                                                                                                      | 描述                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **跨框架支持**<br><br>Intlayer 兼容所有主流框架和库，包括 Next.js、React、Vite、Vue.js、Nuxt、Preact、Express 等。                                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript 驱动的内容管理**<br><br>利用 JavaScript 的灵活性来高效地定义和管理你的内容。<br><br> - [内容声明](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **编译器**<br><br>Intlayer 编译器可自动从组件中提取内容并生成字典文件。<br><br> - [编译器](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **单语言内容声明文件**<br><br>在自动生成前，通过仅声明一次你的内容来加速开发。<br><br> - [单语言内容声明文件](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **类型安全环境**<br><br>利用 TypeScript 确保你的内容定义和代码没有错误，同时还能享受 IDE 的自动补全功能。<br><br> - [TypeScript 配置](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **简易配置**<br><br>仅需极简的配置即可快速启动并运行。轻松调整国际化、路由、AI、构建以及内容处理的设置。<br><br> - [探索 Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **简化内容检索**<br><br>无需为每一小段内容调用 `t` 函数。使用单一的 hook 即可直接检索你的所有内容。<br><br> - [React 集成](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **一致的服务器组件实现**<br><br>完美适合 Next.js 服务器组件，客户端和服务器组件使用相同的实现，无需跨每个服务器组件传递你的 `t` 函数。<br><br> - [服务器组件](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **有条理的代码库**<br><br>保持代码库更有条理：1 组件 = 在同一文件夹下的 1 个字典。靠近其各自组件的翻译有助于提高可维护性和清晰度。<br><br> - [Intlayer 运行机制](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **增强的路由功能**<br><br>完全支持应用路由，无缝适应复杂的应用结构，适用于 Next.js、React、Vite、Vue.js 等。<br><br> - [探索 Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown 支持**<br><br>导入并解译本地文件以及远程 Markdown，以获得隐私政策、文档等多语言内容。解译并在你的代码中使 Markdown 元数据可被访问。<br><br> - [内容文件](https://intlayer.org/doc/concept/content/file)                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **免费的可视化编辑器与 CMS**<br><br>可视化编辑器和 CMS 免费向内容创作者开放，消除了对第三方本地化平台的依赖。使用 Git 保持内容同步，或使用 CMS 彻底或部分外置管理它。<br><br> - [Intlayer 编辑器](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **构建时摇树优化 (Tree-shakable) 内容**<br><br>构建时摇树优化内容，减小最终包的体积。按组件加载内容，并从打包体积中排除任何未使用的内容。支持懒加载以提高应用加载效率。<br><br> - [应用构建优化](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **静态渲染**<br><br>不阻碍静态渲染（Static Rendering）。<br><br> - [Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI 驱动翻译**<br><br>使用您自己的 AI 提供商/API 密钥，点击一下即可将您的网站翻译成 231 种语言，得益于 Intlayer 先进的 AI 翻译工具。<br><br> - [CI/CD 集成](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [自动填充](https://intlayer.org/doc/concept/auto-fill)                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP 服务器集成**<br><br>提供用于 IDE 自动化的 MCP（Model Context Protocol）服务器，能够直接在你的开发环境中实现无缝的内容管理和 i18n 工作流。<br><br> - [MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/mcp_server.md)                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode 插件**<br><br>Intlayer 提供 VSCode 插件协助管理你的内容和翻译，构建你的字典，翻译你的内容等。<br><br> - [VSCode 插件](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **互操作性**<br><br>允许与 react-i18next、next-i18next、next-intl 和 react-intl 互操作。<br><br> - [Intlayer 与 react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer 与 next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer 与 next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) |
| 测试缺失翻译 (CLI/CI)                                                                                                     | ✅ CLI: npx intlayer content test (对 CI 友好的审计)                                                                                                                                                                                                                                                                                                      |

## Intlayer 与其他解决方案的比较

| 功能                                          | `intlayer`                                                                       | `react-i18next`                                                | `react-intl` (FormatJS)                                                    | `lingui`                            | `next-intl`                                                    | `next-i18next`                                                 | `vue-i18n`                                        |
| --------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------- |
| **翻译就近组件**                              | ✅ 是，内容与每个组件协同定位                                                    | ❌ 否                                                          | ❌ 否                                                                      | ❌ 否                               | ❌ 否                                                          | ❌ 否                                                          | ✅ 是 - 使用 `Single File Components` (SFCs)      |
| **TypeScript 集成**                           | ✅ 高级，自动生成严格类型                                                        | ⚠️ 基础；为确保安全需额外配置                                  | ✅ 良好，但不够严格                                                        | ⚠️ 类型定义，需要配置               | ✅ 良好                                                        | ⚠️ 基础                                                        | ✅ 良好（类型可用；键安全需要设置）               |
| **缺失翻译检测**                              | ✅ TypeScript 错误高亮及构建时错误/警告                                          | ⚠️ 运行时多为回退字符串                                        | ⚠️ 回退字符串                                                              | ⚠️ 需要额外配置                     | ⚠️ 运行时回退                                                  | ⚠️ 运行时回退                                                  | ⚠️ 运行时回退/警告（可配置）                      |
| **富内容 (JSX/Markdown/组件)**                | ✅ 直接支持                                                                      | ⚠️ 受限 / 仅插值                                               | ⚠️ ICU 语法，非真实 JSX                                                    | ⚠️ 受限                             | ❌ 非针对富节点设计                                            | ⚠️ 受限                                                        | ⚠️ 受限（组件通过 `<i18n-t>`，Markdown 通过插件） |
| **AI 驱动翻译**                               | ✅ 是，支持多个 AI 提供商。可使用您自己的 API 密钥。考虑您的应用上下文和内容范围 | ❌ 否                                                          | ❌ 否                                                                      | ❌ 否                               | ❌ 否                                                          | ❌ 否                                                          | ❌ 否                                             |
| **可视化编辑器**                              | ✅ 是，本地可视化编辑器 + 可选 CMS；能外置代码库内容；可嵌入                     | ❌ 否 / 只能通过外部定位平台获取                               | ❌ 否 / 只能通过外部定位平台获取                                           | ❌ 否 / 只能通过外部定位平台获取    | ❌ 否 / 只能通过外部定位平台获取                               | ❌ 否 / 只能通过外部定位平台获取                               | ❌ 否 / 只能通过外部定位平台获取                  |
| **路由本地化**                                | ✅ 是，原生支持本地化路径（兼容 Next.js & Vite）                                 | ⚠️ 没内置，需要插件（例如 `next-i18next`）或自定义路由配置     | ❌ 否，只有消息格式化，路由需手动                                          | ⚠️ 没内置，需要插件或手动配置       | ✅ 内置，App Router 支持 `[locale]` 分段                       | ✅ 内置                                                        | ✅ 内置                                           |
| **动态路由生成**                              | ✅ 是                                                                            | ⚠️ 插件/生态系统或手动设置                                     | ❌ 未提供                                                                  | ⚠️ 插件/手动                        | ✅ 是                                                          | ✅ 是                                                          | ❌ 未提供 (Nuxt i18n 提供)                        |
| **复数形式**                                  | ✅ 基于枚举的模式                                                                | ✅ 可配置（像 i18next-icu 插件）                               | ✅ (ICU)                                                                   | ✅ (ICU/messageformat)              | ✅ 良好                                                        | ✅ 良好                                                        | ✅ 内置复数规则                                   |
| **格式化 (日期、数字、货币)**                 | ✅ 优化格式化程序 (底层使用 Intl)                                                | ⚠️ 通过插件或自定义使用 Intl                                   | ✅ ICU 格式化程序                                                          | ✅ ICU/CLI 助手                     | ✅ 良好 (Intl 助手)                                            | ✅ 良好 (Intl 助手)                                            | ✅ 内置日期/数字格式化程序 (Intl)                 |
| **内容格式**                                  | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml 研发中)                              | ⚠️ .json                                                       | ✅ .json, .js                                                              | ⚠️ .po, .json                       | ✅ .json, .js, .ts                                             | ⚠️ .json                                                       | ✅ .json, .js                                     |
| **ICU 支持**                                  | ⚠️ 研发中                                                                        | ⚠️ 通过插件 (i18next-icu)                                      | ✅ 是                                                                      | ✅ 是                               | ✅ 是                                                          | ⚠️ 通过插件 (`i18next-icu`)                                    | ⚠️ 通过自定义格式化程序/编译器                    |
| **SEO 助手 (hreflang, sitemap)**              | ✅ 内置工具：sitemap、robots.txt、metadata 助手                                  | ⚠️ 社区插件/手动                                               | ❌ 非核心功能                                                              | ❌ 非核心功能                       | ✅ 良好                                                        | ✅ 良好                                                        | ❌ 非核心功能 (Nuxt i18n 提供助手)                |
| **生态系统 / 社区**                           | ⚠️ 较小但增长迅速且响应迅速                                                      | ✅ 最大且最成熟                                                | ✅ 大                                                                      | ⚠️ 较小                             | ✅ 中等规模，专注于 Next.js                                    | ✅ 中等规模，专注于 Next.js                                    | ✅ 在 Vue 生态系统中巨大                          |
| **服务端渲染与服务端组件**                    | ✅ 是，为 SSR / React 服务器组件而优化                                           | ⚠️ 页面层级支持，但需要沿组件树传递 t 函数以供子服务端组件使用 | ⚠️ 页面层级在额外设置下支持，但需要沿组件树传递 t 函数以供子服务端组件使用 | ✅ 支持，需要配置                   | ⚠️ 页面层级支持，但需要沿组件树传递 t 函数以供子服务端组件使用 | ⚠️ 页面层级支持，但需要沿组件树传递 t 函数以供子服务端组件使用 | ✅ 通过 Nuxt/Vue SSR 实现 SSR (无 RSC)            |
| **摇树优化 (Tree-shaking)（仅加载所用内容）** | ✅ 是，构建时通过 Babel/SWC 插件按组件进行                                       | ⚠️ 通常加载全部（可利用命名空间/代码分拆改善）                 | ⚠️ 通常加载全部                                                            | ❌ 非默认                           | ⚠️ 部分                                                        | ⚠️ 部分                                                        | ⚠️ 部分（使用代码分拆/手动配置）                  |
| **延迟加载 (Lazy loading)**                   | ✅ 是，按语言 / 按字典                                                           | ✅ 是（例如，按需的服务端/命名空间）                           | ✅ 是（分拆语言包）                                                        | ✅ 是（动态目录导入）               | ✅ 是（按路由/按语言），需要命名空间管理                       | ✅ 是（按路由/按语言），需要命名空间管理                       | ✅ 是（异步语言消息）                             |
| **清除未使用的内容**                          | ✅ 是，构建时按字典进行                                                          | ❌ 否，仅可通过手动命名空间分段完成                            | ❌ 否，打包了所有声明的消息                                                | ✅ 是，在构建时检测并丢弃未使用的键 | ❌ 否，可通过命名空间管理进行手动处理                          | ❌ 否，可通过命名空间管理进行手动处理                          | ❌ 否，仅可通过手动延迟加载实现                   |
| **大型项目管理**                              | ✅ 鼓励模块化，适合设计系统                                                      | ⚠️ 需要良好的文件规范                                          | ⚠️ 中央目录可能会变得庞大                                                  | ⚠️ 可能会变得复杂                   | ✅ 配合配置实现模块化                                          | ✅ 配合配置实现模块化                                          | ✅ 配合 Vue Router/Nuxt i18n 配置实现模块化       |

## GitHub Star 历史

GitHub Star 数是衡量项目受欢迎程度、社区信任度以及长期相关性的一个强有力指标。虽然它们不是技术质量的直接度量标准，但它们反映了有多少开发者发现该项目有用，关注其进展并有可能采用它。对于评估项目的价值来说，Star 能够帮助对比替代方案之间的吸引力，并提供有关生态系统增长的见解。

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## 互操作性

`intlayer` 还可以帮助管理你的 `react-intl`、`react-i18next`、`next-intl`、`next-i18next` 以及 `vue-i18n` 命名空间。

使用 `intlayer`，你可以声明你喜欢的 i18n 库格式的内容，并且 intlayer 将在你想指定的路径下生成命名空间（例如：`/messages/{{locale}}/{{namespace}}.json`）。
