---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: Intlayer 的优势
description: 了解在项目中使用 Intlayer 的好处和优势。明白为什么 Intlayer 在其他框架中脱颖而出。
keywords:
  - 好处
  - 优势
  - Intlayer
  - 框架
  - 比较
slugs:
  - doc
  - why
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: "编译器发布"
  - version: 5.8.0
    date: 2025-08-19
    changes: "更新比较表"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
---

# 为什么你应该考虑使用 Intlayer？

## 什么是 Intlayer？

**Intlayer** 是专门为 JavaScript 开发人员设计的国际化库。它允许在代码的任何地方声明你的内容。它将多语言内容的声明转换为结构化的字典，以便轻松集成到你的代码中。通过使用 TypeScript，**Intlayer** 使你的开发更加健壮和高效。

## 为什么要创建 Intlayer？

创建 Intlayer 是为了解决影响所有常用 i18n 库（如 `next-intl`、`react-i18next`、`react-intl`、`next-i18next` 和 `vue-i18n`）的共同问题。

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

或者使用命名空间：

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

由于以下几个原因，这种类型的架构会减慢开发过程并使代码库的维护变得更加复杂：

1. **对于创建的任何新组件，你应该：**
   - 在 `locales` 文件夹中创建新的资源/命名空间
   - 记住在页面中导入新的命名空间
   - 翻译你的内容（通常通过从 AI 提供商处复制/粘贴手动完成）

2. **对于对组件进行的任何更改，你应该：**
   - 搜索相关的资源/命名空间（远离组件）
   - 翻译你的内容
   - 确保你的内容对于任何语言环境都是最新的
   - 验证你的命名空间不包含未使用的键/值
   - 确保所有语言环境的 JSON 文件结构相同

在使用这些解决方案的专业项目中，通常会使用本地化平台来帮助管理内容的翻译。然而，对于大型项目，这可能会迅速变得昂贵。

为了解决这个问题，Intlayer 采用了一种将内容限定在每个组件范围内的方法，并将内容保持在组件附近，就像我们通常处理 CSS (`styled-components`)、类型、文档 (`storybook`) 或单元测试 (`jest`) 一样。

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
   - 可以使用 VSCode 扩展创建 `.content.{{ts|mjs|cjs|json}}` 文件
   - IDE 中的自动完成 AI 工具（如 GitHub Copilot）可以帮助你声明内容，减少复制/粘贴

2. **清理你的代码库**
   - 降低复杂性
   - 提高可维护性

3. **更轻松地复制组件及其相关内容（例如：登录/注册组件等）**
   - 通过限制影响其他组件内容的风险
   - 通过将内容从一个应用程序复制/粘贴到另一个应用程序，无需外部依赖项

4. **避免因未使用的组件而导致未使用的键/值污染代码库**
   - 如果你不使用某个组件，Intlayer 将不会导入其相关内容
   - 如果你删除一个组件，你将更容易记住删除其相关内容，因为它位于同一个文件夹中

5. **降低 AI 代理声明多语言内容的推理成本**
   - AI 代理无需扫描整个代码库就知道在哪里实现你的内容
   - 翻译可以通过 IDE 中的自动完成 AI 工具（如 GitHub Copilot）轻松完成

6. **优化加载性能**
   - 如果一个组件是懒加载的，其相关内容将同时加载

## Intlayer 的附加功能

| 功能                                                                                                                      | 描述                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![功能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                             | **跨框架支持**<br><br>Intlayer 与所有主要框架和库兼容，包括 Next.js、React、Vite、Vue.js、Nuxt、Preact、Express 等。                                                                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript 驱动的内容管理**<br><br>利用 JavaScript 的灵活性高效地定义和管理内容。<br><br> - [内容声明](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="功能" width="700">     | **编译器**<br><br>Intlayer 编译器自动从组件中提取内容并生成字典文件。<br><br> - [编译器](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **按语言环境的内容声明文件**<br><br>在自动生成之前，通过一次性声明内容来加速开发。<br><br> - [按语言环境的内容声明文件](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **类型安全环境**<br><br>利用 TypeScript 确保内容定义和代码无错误，同时受益于 IDE 自动完成。<br><br> - [TypeScript 配置](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **简化设置**<br><br>通过最少的配置快速启动并运行。轻松调整国际化、路由、AI、构建和内容处理设置。<br><br> - [探索 Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **简化内容检索**<br><br>无需为每条内容调用 `t` 函数。使用单个 hook 直接检索所有内容。<br><br> - [React 集成](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **一致的服务器组件实现**<br><br>非常适合 Next.js 服务器组件，客户端和服务器组件使用相同的实现，无需在每个服务器组件中传递 `t` 函数。<br><br> - [服务器组件](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **有组织的代码库**<br><br>保持代码库更有组织性：1 个组件 = 1 个位于同一文件夹中的字典。靠近其各自组件的翻译增强了可维护性和清晰度。<br><br> - [Intlayer 工作原理](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **增强型路由**<br><br>全面支持应用路由，无缝适应复杂的应用结构，适用于 Next.js、React、Vite、Vue.js 等。<br><br> - [探索 Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown 支持**<br><br>导入和解释本地文件和远程 Markdown 以获取多语言内容，如隐私政策、文档等。在代码中解释并使 Markdown 元数据可访问。<br><br> - [内容文件](https://intlayer.org/doc/concept/content/file)                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **免费视觉编辑器和 CMS**<br><br>为内容作者提供免费的视觉编辑器和 CMS，无需本地化平台。使用 Git 保持内容同步，或者使用 CMS 完全或部分外部化内容。<br><br> - [Intlayer 编辑器](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable 内容**<br><br>Tree-shakable 内容，减小最终包的大小。按组件加载内容，从包中排除任何未使用的内容。支持懒加载以提高应用加载效率。<br><br> - [应用构建优化](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **静态渲染**<br><br>不阻塞静态渲染。<br><br> - [Next.js 集成](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI 驱动翻译**<br><br>只需单击一下，即可使用 Intlayer 先进的 AI 驱动翻译工具和自己的 AI 提供商/API 密钥，将网站转换为 231 种语言。<br><br> - [CI/CD 集成](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [自动填充](https://intlayer.org/doc/concept/auto-fill)                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP 服务器集成**<br><br>为 IDE 自动化提供 MCP (Model Context Protocol) 服务器，实现在开发环境中无缝的内容管理和 i18n 工作流。<br><br> - [MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/mcp_server.md)                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode 扩展**<br><br>Intlayer 提供 VSCode 扩展来帮助你管理内容和翻译、构建字典、翻译内容等。<br><br> - [VSCode 扩展](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **互操作性**<br><br>允许与 react-i18next、next-i18next、next-intl 和 react-intl 进行互操作。<br><br> - [Intlayer 和 react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer 和 next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer 和 next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) |
| 测试缺失的翻译 (CLI/CI)                                                                                                   | ✅ CLI: npx intlayer content test (CI 友好型审计)                                                                                                                                                                                                                                                                                                             |

## Intlayer 与其他解决方案的比较

| 功能                                 | `intlayer`                                                                         | `react-i18next`                                              | `react-intl` (FormatJS)                                                    | `lingui`                            | `next-intl`                                                  | `next-i18next`                                               | `vue-i18n`                                            |
| ------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------- |
| **组件附近的翻译**                   | ✅ 是，内容与每个组件并存                                                          | ❌ 否                                                        | ❌ 否                                                                      | ❌ 否                               | ❌ 否                                                        | ❌ 否                                                        | ✅ 是 - 使用 `Single File Components` (SFCs)          |
| **TypeScript 集成**                  | ✅ 高级，自动生成严格类型                                                          | ⚠️ 基础；为安全需额外配置                                    | ✅ 良好，但不够严格                                                        | ⚠️ 类型，需要配置                   | ✅ 良好                                                      | ⚠️ 基础                                                      | ✅ 良好 (提供类型；键安全需设置)                      |
| **缺失翻译检测**                     | ✅ TypeScript 错误高亮和构建时错误/警告                                            | ⚠️ 运行时主要是回退字符串                                    | ⚠️ 回退字符串                                                              | ⚠️ 需要额外配置                     | ⚠️ 运行时回退                                                | ⚠️ 运行时回退                                                | ⚠️ 运行时回退/警告 (可配置)                           |
| **丰富内容 (JSX/Markdown/组件)**     | ✅ 直接支持                                                                        | ⚠️ 受限 / 仅插值                                             | ⚠️ ICU 语法，非真实 JSX                                                    | ⚠️ 受限                             | ❌ 不为丰富节点设计                                          | ⚠️ 受限                                                      | ⚠️ 受限 (通过 `<i18n-t>` 使用组件，Markdown 通过插件) |
| **AI 驱动翻译**                      | ✅ 是，支持多个 AI 提供商。可使用你自己的 API 密钥。考虑应用程序的上下文和内容范围 | ❌ 否                                                        | ❌ 否                                                                      | ❌ 否                               | ❌ 否                                                        | ❌ 否                                                        | ❌ 否                                                 |
| **视觉编辑器**                       | ✅ 是，本地视觉编辑器 + 可选 CMS；可以外部化代码库内容；可嵌入                     | ❌ 否 / 可通过外部本地化平台获取                             | ❌ 否 / 可通过外部本地化平台获取                                           | ❌ 否 / 可通过外部本地化平台获取    | ❌ 否 / 可通过外部本地化平台获取                             | ❌ 否 / 可通过外部本地化平台获取                             | ❌ 否 / 可通过外部本地化平台获取                      |
| **本地化路由**                       | ✅ 是，开箱即用支持本地化路径 (适用于 Next.js 和 Vite)                             | ⚠️ 无内置，需要插件 (例如 `next-i18next`) 或自定义路由配置   | ❌ 否，仅消息格式化，路由必须手动处理                                      | ⚠️ 无内置，需要插件或手动配置       | ✅ 内置，App Router 支持 `[locale]` 分段                     | ✅ 内置                                                      | ✅ 内置                                               |
| **动态路由生成**                     | ✅ 是                                                                              | ⚠️ 插件/生态系统或手动设置                                   | ❌ 不提供                                                                  | ⚠️ 插件/手动                        | ✅ 是                                                        | ✅ 是                                                        | ❌ 不提供 (Nuxt i18n 提供)                            |
| **复数形式**                         | ✅ 基于枚举的模式                                                                  | ✅ 可配置 (插件如 i18next-icu)                               | ✅ (ICU)                                                                   | ✅ (ICU/messageformat)              | ✅ 良好                                                      | ✅ 良好                                                      | ✅ 内置复数规则                                       |
| **格式化 (日期、数字、货币)**        | ✅ 优化的格式化程序 (底层为 Intl)                                                  | ⚠️ 通过插件或自定义 Intl 使用                                | ✅ ICU 格式化程序                                                          | ✅ ICU/CLI 辅助程序                 | ✅ 良好 (Intl 辅助程序)                                      | ✅ 良好 (Intl 辅助程序)                                      | ✅ 内置日期/数字格式化程序 (Intl)                     |
| **内容格式**                         | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml 正在开发)                              | ⚠️ .json                                                     | ✅ .json, .js                                                              | ⚠️ .po, .json                       | ✅ .json, .js, .ts                                           | ⚠️ .json                                                     | ✅ .json, .js                                         |
| **ICU 支持**                         | ⚠️ 正在开发                                                                        | ⚠️ 通过插件 (i18next-icu)                                    | ✅ 是                                                                      | ✅ 是                               | ✅ 是                                                        | ⚠️ 通过插件 (`i18next-icu`)                                  | ⚠️ 通过自定义格式化程序/编译器                        |
| **SEO 辅助程序 (hreflang, sitemap)** | ✅ 内置工具：sitemap、robots.txt、元数据的辅助程序                                 | ⚠️ 社区插件/手动                                             | ❌ 非核心                                                                  | ❌ 非核心                           | ✅ 良好                                                      | ✅ 良好                                                      | ❌ 非核心 (Nuxt i18n 提供辅助程序)                    |
| **生态系统 / 社区**                  | ⚠️ 较小但增长迅速且反应灵敏                                                        | ✅ 最大且成熟                                                | ✅ 大                                                                      | ⚠️ 较小                             | ✅ 中等规模，专注于 Next.js                                  | ✅ 中等规模，专注于 Next.js                                  | ✅ Vue 生态系统中的大规模                             |
| **服务器端渲染和服务器组件**         | ✅ 是，针对 SSR / React 服务器组件进行了流程化                                     | ⚠️ 在页面级别支持，但需要在组件树上为子服务器组件传递 t 函数 | ⚠️ 在页面级别支持，需要额外设置，但需要在组件树上为子服务器组件传递 t 函数 | ✅ 支持，需要设置                   | ⚠️ 在页面级别支持，但需要在组件树上为子服务器组件传递 t 函数 | ⚠️ 在页面级别支持，但需要在组件树上为子服务器组件传递 t 函数 | ✅ 通过 Nuxt/Vue SSR (无 RSC) 提供 SSR                |
| **Tree-shaking (仅加载使用的内容)**  | ✅ 是，构建时通过 Babel/SWC 插件按组件进行                                         | ⚠️ 通常全部加载 (可以通过命名空间/代码拆分进行改进)          | ⚠️ 通常全部加载                                                            | ❌ 非默认                           | ⚠️ 部分                                                      | ⚠️ 部分                                                      | ⚠️ 部分 (通过代码拆分/手动设置)                       |
| **懒加载**                           | ✅ 是，按语言环境 / 按字典                                                         | ✅ 是 (例如，按需后端/命名空间)                              | ✅ 是 (拆分语言环境包)                                                     | ✅ 是 (动态目录导入)                | ✅ 是 (按路由/按语言环境)，需要命名空间管理                  | ✅ 是 (按路由/按语言环境)，需要命名空间管理                  | ✅ 是 (异步语言环境消息)                              |
| **清除未使用的内容**                 | ✅ 是，构建时按字典进行                                                            | ❌ 否，仅通过手动命名空间细分                                | ❌ 否，所有声明的消息都被打包                                              | ✅ 是，在构建时检测并删除未使用的键 | ❌ 否，可以通过命名空间管理进行手动管理                      | ❌ 否，可以通过命名空间管理进行手动管理                      | ❌ 否，仅可通过手动懒加载实现                         |
| **大型项目管理**                     | ✅ 鼓励模块化，适用于设计系统                                                      | ⚠️ 需要良好的文件纪律                                        | ⚠️ 中央目录可能会变得很大                                                  | ⚠️ 可能会变得复杂                   | ✅ 模块化及设置                                              | ✅ 模块化及设置                                              | ✅ 模块化及 Vue Router/Nuxt i18n 设置                 |

---

## GitHub 星数

GitHub 星数是项目受欢迎程度、社区信任和长期相关性的有力指标。虽然星数不是技术质量的直接衡量标准，但它们反映了有多少开发人员发现该项目有用、关注其进展并可能采用它。在评估项目价值时，星数有助于比较不同方案的吸引力，并提供对生态系统增长的见解。

[![Star History Chart](https://api.star-history.com/chart?repos=formatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Caymericzip/intlayer%2Copral/inlang&type=date&legend=top-left)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&opral/paraglide-js&aymericzip/intlayer)

---

## 互操作性

`intlayer` 还可以帮助管理 `react-intl`、`react-i18next`、`next-intl`、`next-i18next` 和 `vue-i18n` 命名空间。

使用 `intlayer`，你可以按照你喜欢的 i18n 库格式声明内容，intlayer 将在你选择的位置生成命名空间（例如：`/messages/{{locale}}/{{namespace}}.json`）。
