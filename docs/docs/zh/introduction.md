---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: 简介
description: 了解 Intlayer 的工作原理。查看 Intlayer 在您的应用程序中使用的步骤。了解不同的包各自的功能。
keywords:
  - 简介
  - 入门
  - Intlayer
  - 应用程序
  - 软件包
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Intlayer 文档

欢迎来到官方的 Intlayer 文档！在这里，您将找到整合、配置和掌握 Intlayer 以满足所有国际化 (i18n) 需求所需的全部内容，无论您是使用 Next.js、React、Vite、Express 还是其他 JavaScript 环境。

## 简介

### 什么是 Intlayer？

**Intlayer** 是一个专门为 JavaScript 开发者设计的国际化库。它允许在代码的任何位置声明您的内容。它将多语言内容的声明转换为结构化的字典，以便轻松集成到您的代码中。通过使用 TypeScript，**Intlayer** 使您的开发更加强大和高效。

Intlayer 还提供了一个可选的可视化编辑器，允许您轻松编辑和管理您的内容。该编辑器对于那些更喜欢使用可视化界面进行内容管理的开发者，或者对于在生成内容时不需要关注代码的团队来说特别有用。

### 使用示例

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      zh: "你好，世界",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "zh": "你好，世界"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### 为什么选择 Intlayer 而不是其他替代方案？

与 `next-intl` 或 `i18next` 等主流解决方案相比，Intlayer 是一个自带多项集成的优化方案，例如：

<AccordionGroup>
<Accordion header="捆绑体积 (Bundle Size)">

您无需在页面中加载庞大的 JSON 文件，而是只加载所需的内容。Intlayer 可以帮助 **将您的捆绑包和页面大小减小多达 50%**。

</Accordion>

<Accordion header="可维护性">

将您的应用程序内容局限在相应范围内，**有助于维护**大规模的应用程序。您可以复制或删除单个功能文件夹，而不会有审查整个内容代码库的心理负担。此外，Intlayer 是 **完全类型化 (fully typed)** 的，这能够确保您的内容的准确性。

</Accordion>

<Accordion header="AI Agent 支持">

将内容同位放置 **减少了所需的上下文**，这非常适合大型语言模型 (LLM)。Intlayer 还附带一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 以及 **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，旨在让 AI 代理的开发者体验 (DX) 变得更加顺畅。

</Accordion>

<Accordion header="自动化">

使用您选择的 LLM 并在由您的 AI 提供商承担费用的情况下，通过自动化在您的 CI/CD 管道中进行翻译。Intlayer 还提供了一个 **编译器**，可自动提取内容；并配备了一个 [Web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 以帮助您 **在后台执行翻译**。

</Accordion>

<Accordion header="性能表现 (Performance)">

将庞大的 JSON 文件连接到组件，可能会导致性能与响应式问题。Intlayer 会在构建时优化您的内容加载。

</Accordion>

<Accordion header="无需开发人员的规模化运作 (Scaling with non-dev)">

Intlayer 不仅仅是一个简单的 i18n 解决方案。它还提供了一个 **支持自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)** 以及一个 **[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)**。借此，您可以 **实时** 管理多语言内容，并让译者、文案及其他团队成员之间的协作变得无缝。内容可以存储在本地和/或远程服务器上。

</Accordion>
</AccordionGroup>

## 主要特性

Intlayer 提供了多种功能，旨在满足现代 Web 开发的需求。以下是主要功能，以及每个功能的详细文档链接：

- **国际化支持**：通过内置的国际化支持，增强应用程序的全球覆盖范围。
- **可视化编辑器**：使用专为 Intlayer 设计的编辑器插件，改进您的开发工作流。请查看 [可视化编辑器指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。
- **配置灵活性**：通过 [配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 中详细说明的广泛配置选项，自定义您的设置。
- **高级 CLI 工具**：使用 Intlayer 的命令行界面高效管理您的项目。在 [CLI 工具文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 中探索相关功能。

## 核心概念

### 字典

将多语言内容整理到离代码较近的位置，以保持所有内容的一致性和可维护性。

- **[快速入门](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)**  
  学习在 Intlayer 中声明内容的基础知识。

- **[翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)**  
  了解在应用程序中如何生成、存储和利用翻译。

- **[枚举](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md)**  
  轻松管理各种语言中重复或固定的数据集。

- **[条件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/condition.md)**  
  了解如何在 Intlayer 中使用条件逻辑来创建动态内容。

- **[插入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)**
  探索如何使用插入占位符将值插入字符串中。

- **[函数获取](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)**  
  查看如何使用自定义逻辑动态获取内容，以符合您的项目工作流。

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)**  
  了解如何在 Intlayer 中使用 Markdown 来创建富文本内容。

- **[文件嵌入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/file.md)**  
  发现如何在 Intlayer 中嵌入外部文件，以便在内容编辑器中使用。

- **[嵌套](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/nesting.md)**  
  了解如何在 Intlayer 中嵌套内容以创建复杂的结构。

### 环境与集成

我们在构建 Intlayer 时考虑到了灵活性，提供了在主流框架和构建工具中的无缝集成：

- **[Intlayer 与 Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)**
- **[Intlayer 与 Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)**
- **[Intlayer 与 Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_14.md)**
- **[Intlayer 与 Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_page_router.md)**
- **[Intlayer 与 React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)**
- **[Intlayer 与 Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)**
- **[Intlayer 与 React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_react_router_v7.md)**
- **[Intlayer 与 Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)**
- **[Intlayer 与 React Native 及 Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_react_native+expo.md)**
- **[Intlayer 与 Lynx 及 React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_lynx+react.md)**
- **[Intlayer 与 Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+preact.md)**
- **[Intlayer 与 Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+vue.md)**
- **[Intlayer 与 Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nuxt.md)**
- **[Intlayer 与 Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+svelte.md)**
- **[Intlayer 与 SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_svelte_kit.md)**
- **[Intlayer 与 Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_express.md)**
- **[Intlayer 与 NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nestjs.md)**
- **[Intlayer 与 Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_hono.md)**
- **[Intlayer 与 Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_angular_21.md)**

每篇集成指南都包含了使用 Intlayer 功能的最佳实践，例如 **服务端渲染**、**动态路由** 或 **客户端渲染**，以便您可以维护一个快速、SEO 友好且高度可扩展的应用程序。

## 贡献与反馈

我们非常重视开源和社区驱动开发的力量。如果您想提出改进建议、添加新指南或纠正我们文档中的任何问题，请随时提交 Pull Request 或在我们的 [GitHub 仓库](https://github.com/aymericzip/intlayer/blob/main/docs/docs) 中提出 Issue。

**准备好更快速、更高效地翻译您的应用程序了吗？** 立即深入我们的文档，开始使用 Intlayer。体验一个强大且精简的国际化方法，让您的内容井井有条，并提高您的团队工作效率。

## 常见问题

<FAQ>

<Question title="Intlayer 的用途是什么？">

Intlayer 是面向 JavaScript 和 TypeScript 应用程序的国际化 (i18n) 库。您在每个组件旁边的 `.content.ts` 文件中声明组件的内容，Intlayer 在构建时将这些声明编译为全类型安全的字典，组件通过类似 `useIntlayer` 的 Hook 读取它们。它涵盖了翻译、复数规则、性别判断、Markdown、支持语言环境的路由、SEO 元数据、AI 辅助翻译以及面向非开发人员的可视化编辑器。

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

<Question title="国际化 JavaScript 应用有哪些不同的解决方案？">

该领域大致分为三代：

- **运行时目录库**：`i18next`、`react-i18next`、`next-i18next`、`vue-i18n`、`ngx-translate`。消息存储在运行时加载的 JSON 命名空间中。成熟且与框架无关，但没有强类型定义且全量分发。
- **编译时消息库**：`Lingui`、`Paraglide`、带有提取步骤的 `react-intl` 和 `next-intl`。具有更好的 bundle 行为和部分类型支持，但仍采用集中式目录。
- **内容层库**：`Intlayer`。内容按组件声明并按组件编译，因此类型安全、代码摇树优化 (tree-shaking)、工具链和文案编辑均源自同一个单一来源。

请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md) 了解详细对比，并参阅 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md) 了解测得的包体积和性能数据。

</Question>

<Question title="Intlayer 支持哪些框架？">

React、Next.js、Vite、TanStack Start、React Router、Vue、Nuxt、Svelte、SvelteKit、Angular、Solid、Preact、Lit、支持各类孤岛框架的 Astro、包含 Expo 的 React Native、Lynx，以及在服务端的 Express、Fastify、NestJS、Hono、Elysia 和 AdonisJS。每个框架在 [环境指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/introduction.md) 下都有其专属文档。

</Question>

<Question title="为什么要在组件旁边声明内容而不是放在一个集中的 JSON 文件中？">

有三个关键原因：页面仅分发其组件渲染的条目，而不是整个命名空间，从而显著缩减 bundle 体积；功能文件夹可以作为一个整体完整复制或删除，无需在共享目录中费力寻找孤立的残留键；最后，编辑组件的 LLM 或 AI 代理可以在同一个文件夹中看到对应的内容，这也是就近放置 (co-location) 能让 AI 辅助开发高度可靠的原因。请参阅 [Intlayer 工作原理](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/how_works_intlayer.md)。

</Question>

<Question title="如何使用 AI 自动翻译我的应用？">

运行 `npx intlayer fill`。CLI 会检测缺失的翻译，并使用您选择的 LLM、您自己的提供商和 API 密钥进行填充，因此您可以直接向 AI 提供商结算费用。`--git-diff` 参数可将处理范围限制在当前分支修改的内容，从而在 CI 中保持极低的成本。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="如何查找缺失的翻译？">

运行 `npx intlayer test`。当声明的语言环境存在缺失内容时，它将直接报错退出，确保未翻译的字符串永远不会进入生产环境。[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md) 会在行内实时显示相同的错误，而 [ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md) 会通过 `no-raw-text` 规则标记硬编码的明文字符串。请参阅 [测试您的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)。

</Question>

<Question title="我必须在 URL 中包含语言环境吗？">

不需要。`routing.mode` 支持 `"prefix-no-default"`（默认值，例如 `/about` 和 `/zh/about`）、`"prefix-all"`、`"no-prefix"` 以及 `"search-params"`，而 `routing.domains` 可以将每个语言环境映射到其独立的域名。无论采用哪种方案，`getMultilingualUrls` 都会自动为您构建元数据和站点地图所需的 `hreflang` 备用链接。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Question>

<Question title="翻译人员和内容编辑如何在不触及代码的情况下开展工作？">

[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 运行在您自己的基础设施上，允许任何人直接在运行中的应用上点击文本进行修改，并将更改写回代码库。[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 则将内容外部化，使其无需重新部署即可更新，并通过 [实时同步 (live sync)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/live.md) 在运行时应用最新更改。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的。Intlayer 在 Apache 2.0 许可证下开源，其核心库、CLI、编译器和可视化编辑器均可免费使用，包括商业项目。托管版 CMS 是一项可选的付费服务，同时完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
