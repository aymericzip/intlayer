---
docName: introduction
url: https://intlayer.org/doc/get-started
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/introduction.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: 介绍
description: 了解Intlayer的工作原理。查看Intlayer在您的应用程序中使用的步骤。查看不同包的功能。
keywords:
  - 介绍
  - 开始
  - Intlayer
  - 应用程序
  - 包
---

# Intlayer 文档

欢迎来到官方 Intlayer 文档！在这里，您将找到集成、配置和掌握 Intlayer 所需的一切，无论您是使用 Next.js、React、Vite、Express 还是其他 JavaScript 环境。

## 介绍

### 什么是 Intlayer？

**Intlayer** 是专为 JavaScript 开发者设计的国际化库。它允许您在代码中的任何地方声明内容，并将多语言内容的声明转换为结构化字典，以便轻松集成到您的代码中。通过使用 TypeScript，**Intlayer** 使您的开发更强大、更高效。

Intlayer 还提供了一个可选的可视化编辑器，允许您轻松编辑和管理内容。对于喜欢使用可视化界面进行内容管理的开发者，或者无需担心代码的内容生成团队来说，这个编辑器特别有用。

### 使用示例

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
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
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## 主要功能

Intlayer 提供了多种功能，以满足现代 Web 开发的需求。以下是关键功能，并附有详细文档的链接：

- **国际化支持**：通过内置的国际化支持，增强您的应用程序的全球影响力。
- **可视化编辑器**：通过为 Intlayer 设计的编辑器插件改进您的开发工作流。查看 [可视化编辑器指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。
- **配置灵活性**：通过广泛的配置选项自定义您的设置，详细信息请参阅 [配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。
- **高级 CLI 工具**：使用 Intlayer 的命令行界面高效管理您的项目。探索 [CLI 工具文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md) 中的功能。

## 核心概念

### 字典

将您的多语言内容组织在代码附近，以保持一致性和可维护性。

- **[快速开始](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)**  
  学习在 Intlayer 中声明内容的基础知识。

- **[翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)**  
  了解翻译是如何生成、存储和在您的应用程序中使用的。

- **[枚举](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md)**  
  轻松管理跨多种语言的重复或固定数据集。

- **[函数获取](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)**  
  了解如何使用自定义逻辑动态获取内容，以匹配您的项目工作流。

### 环境与集成

我们设计了 Intlayer 的灵活性，提供了与流行框架和构建工具的无缝集成：

- **[Intlayer 与 Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)**
- **[Intlayer 与 Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_14.md)**
- **[Intlayer 与 Next.js 页面路由](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_page_router.md)**
- **[Intlayer 与 React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)**
- **[Intlayer 与 Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)**
- **[Intlayer 与 Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_express.md)**

每个集成指南都包括使用 Intlayer 功能的最佳实践，例如 **服务器端渲染**、**动态路由** 或 **客户端渲染**，以便您可以维护快速、SEO 友好且高度可扩展的应用程序。

## 贡献与反馈

我们重视开源和社区驱动的开发。如果您想提出改进建议、添加新指南或纠正文档中的任何问题，请随时在我们的 [GitHub 仓库](https://github.com/aymericzip/intlayer/blob/main/docs/docs) 提交拉取请求或打开问题。

**准备好更快、更高效地翻译您的应用程序了吗？** 浏览我们的文档，立即开始使用 Intlayer。体验一种强大、简化的国际化方法，让您的内容井然有序，让您的团队更高效。

祝翻译愉快！
