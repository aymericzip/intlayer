---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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

### 为什么选择 Intlayer 而不是其他替代方案？

与 `next-intl` 或 `i18next` 等主流解决方案相比，Intlayer 是一个自带多项集成的优化方案，例如：

**捆绑体积 (Bundle Size)**

您无需在页面中加载庞大的 JSON 文件，而是只加载所需的内容。Intlayer 可以帮助 **将您的捆绑包和页面大小减小多达 50%**。

**可维护性**

将您的应用程序内容局限在相应范围内，**有助于维护**大规模的应用程序。您可以复制或删除单个功能文件夹，而不会有审查整个内容代码库的心理负担。此外，Intlayer 是 **完全类型化 (fully typed)** 的，这能够确保您的内容的准确性。

**AI Agent 支持**

将内容同位放置 **减少了所需的上下文**，这非常适合大型语言模型 (LLM)。Intlayer 还附带一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)** 以及 **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，旨在让 AI 代理的开发者体验 (DX) 变得更加顺畅。

**自动化**

使用您选择的 LLM 并在由您的 AI 提供商承担费用的情况下，通过自动化在您的 CI/CD 管道中进行翻译。Intlayer 还提供了一个 **编译器**，可自动提取内容；并配备了一个 [Web 平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 以帮助您 **在后台执行翻译**。

**性能表现 (Performance)**

将庞大的 JSON 文件连接到组件，可能会导致性能与响应式问题。Intlayer 会在构建时优化您的内容加载。

**无需开发人员的规模化运作 (Scaling with non-dev)**

Intlayer 不仅仅是一个简单的 i18n 解决方案。它还提供了一个 **支持自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)** 以及一个 **[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)**。借此，您可以 **实时** 管理多语言内容，并让译者、文案及其他团队成员之间的协作变得无缝。内容可以存储在本地和/或远程服务器上。
