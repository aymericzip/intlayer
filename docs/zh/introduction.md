# Intlayer 文档

欢迎来到 Intlayer 文档。本指南提供了 Intlayer 的概述、其主要特性以及如何有效利用这些文档来增强您的开发体验。

## 介绍

### 什么是 Intlayer？

**Intlayer** 是一个专为 JavaScript 开发者设计的国际化库。它允许您在代码中的任何地方声明您的内容。它将多语言内容的声明转换为结构化字典，以便轻松集成到您的代码中。使用 TypeScript，**Intlayer** 使您的开发更加稳健和高效。

Intlayer 还提供了一个可选的视觉编辑器，允许您轻松编辑和管理您的内容。对于喜欢使用视觉界面进行内容管理的开发者，或者对于生成内容而不必担心代码的团队而言，该编辑器特别有用。

## 使用示例

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### 主要特点

Intlayer 提供了一系列功能，旨在满足现代 web 开发的需求。以下是关键特性，并附有每个特性详细文档的链接：

- **国际化支持**：通过内置的国际化支持增强您的应用程序的全球覆盖范围。
- **视觉编辑器**：通过为 Intlayer 设计的编辑器插件改善您的开发工作流程。查看 [视觉编辑器指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。
- **配置灵活性**：通过 [配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)中详细的配置选项自定义您的设置。
- **高级命令行工具**：利用 Intlayer 的命令行界面高效管理您的项目。在 [CLI 工具文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 中探索其功能。
- **与 i18n 的兼容性**：Intlayer 可以与其他国际化库无缝协作。有关更多信息，请查看 [i18n 指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_i18next.md)。

### 支持的平台

Intlayer 被设计为可以与 Next.js 和 React 应用程序无缝配合。它还支持 Vite 和 Create React App。

- **Next.js 集成**：在 Intlayer 中利用 Next.js 的强大功能进行服务器端渲染和静态网站生成。我们的 [Next.js 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md) 中提供了详细信息。
- **Vite 和 React 集成**：在 Intlayer 中利用 Vite 进行服务器端渲染和静态网站生成。我们的 [Vite 和 React 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md) 中提供了详细信息。
- **Create React App 集成**：在 Intlayer 中利用 Create React App 的强大功能进行服务器端渲染和静态网站生成。我们的 [Create React App 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md) 中提供了详细信息。

### 如何使用本文件

要充分利用本文档：

1. **导航到相关部分**：使用上面提供的链接直接转到满足您需求的部分。
2. **互动示例**：如有可用，可利用互动示例实时查看功能的工作方式。
3. **反馈和贡献**：您的反馈很重要。如果您有建议或更正，请考虑为文档做出贡献。
