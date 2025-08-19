---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 介绍
description: 了解 Intlayer 的工作原理。查看 Intlayer 在您的应用程序中使用的步骤。了解不同包的功能。
keywords:
  - 介绍
  - 入门
  - Intlayer
  - 应用程序
  - 包
slugs:
  - doc
  - get-started
---

# Intlayer 文档

欢迎来到官方 Intlayer 文档！在这里，您将找到集成、配置和掌握 Intlayer 所需的一切，无论您使用的是 Next.js、React、Vite、Express 还是其他 JavaScript 环境，满足您所有的国际化（i18n）需求。

## 介绍

### 什么是 Intlayer？

**Intlayer** 是一个专为 JavaScript 开发者设计的国际化库。它允许您在代码中的任何地方声明内容。它将多语言内容的声明转换为结构化的字典，方便您轻松地集成到代码中。通过使用 TypeScript，**Intlayer** 使您的开发更加稳健和高效。

Intlayer 还提供了一个可选的可视化编辑器，允许您轻松编辑和管理内容。这个编辑器对于喜欢使用可视化界面进行内容管理的开发者，或者不想担心代码的团队来说尤其有用。

### 使用示例

```bash
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary; // 满足 Dictionary 类型

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
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// 组件内容的字典定义
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
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

Intlayer 提供了多种功能，专为满足现代网页开发的需求而设计。以下是主要功能，并附有详细文档链接：

- **国际化支持**：通过内置的国际化支持，提升您的应用程序的全球影响力。
- **可视化编辑器**：使用为 Intlayer 设计的编辑器插件，优化您的开发工作流程。请查看 [可视化编辑器指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。
- **配置灵活性**：通过详尽的配置选项自定义您的设置，详见[配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。
- **高级命令行工具**：使用 Intlayer 的命令行界面高效管理您的项目。探索其功能请参阅[命令行工具文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

## 核心概念

### 字典

将您的多语言内容组织在代码附近，保持内容一致且易于维护。

- **[入门指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)**  
  学习在 Intlayer 中声明内容的基础知识。

- **[翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)**  
  了解翻译内容如何在您的应用中生成、存储和使用。

- **[枚举](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md)**  
  轻松管理跨多语言的重复或固定数据集。

- **[条件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/conditional.md)**  
  学习如何在 Intlayer 中使用条件逻辑来创建动态内容。

- **[插入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)**  
  了解如何使用插入占位符在字符串中插入值。

- **[函数获取](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)**  
  了解如何使用自定义逻辑动态获取内容，以匹配您的项目工作流程。

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)**  
  学习如何在 Intlayer 中使用 Markdown 创建丰富的内容。

- **[文件嵌入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/file_embeddings.md)**  
  发现如何在 Intlayer 中嵌入外部文件，以便在内容编辑器中使用它们。

- **[嵌套](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/nesting.md)**  
  理解如何在 Intlayer 中嵌套内容，以创建复杂的结构。

### 环境与集成

我们在设计 Intlayer 时充分考虑了灵活性，提供了与流行框架和构建工具的无缝集成：

- **[Intlayer 与 Next.js 15 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)**
- **[Intlayer 与 Next.js 14（App Router）集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_14.md)**
- **[Intlayer 与 Next.js 页面路由集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_page_router.md)**
- **[Intlayer 与 React CRA 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)**
- **[Intlayer 与 Vite + React 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)**
- **[Intlayer 与 React Native 和 Expo 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_react_native+expo.md)**
- **[Intlayer 与 Lynx 和 React 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_lynx+react.md)**
- **[Intlayer 与 Express 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_express.md)**

每个集成指南都包含使用 Intlayer 功能的最佳实践，如 **服务器端渲染**、**动态路由** 或 **客户端渲染**，帮助您保持应用的高速、SEO 友好且高度可扩展。

## 贡献与反馈

我们重视开源和社区驱动开发的力量。如果您想提出改进建议、添加新的指南，或纠正文档中的任何问题，欢迎随时提交 Pull Request 或在我们的 [GitHub 仓库](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh) 中打开 issue。

**准备好更快更高效地翻译您的应用了吗？** 立即深入阅读我们的文档，开始使用 Intlayer。体验一种强大且简化的国际化方法，帮助您保持内容有序，提高团队生产力。

---

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
