# Intlayer 文档

欢迎来到 Intlayer 文档。 本指南提供了 Intlayer 的概述、主要功能以及如何有效利用这些文档来增强您的开发体验。

## 介绍

### 什么是 Intlayer？

**Intlayer** 是一个专为 JavaScript 开发者设计的国际化库。它允许在代码的任何地方声明您的内容。它将多语言内容的声明转换为结构化字典，以便轻松集成到代码中。使用 TypeScript，**Intlayer** 使您的开发更强大、更高效。

Intlayer 还提供了一个可选的可视化编辑器，允许您轻松编辑和管理您的内容。这个编辑器对那些喜欢内容管理的可视化接口的开发者特别有用，或者对于生成内容而不必担心代码的团队。

## 使用示例

```bash codeFormat="typescript"
.
└── Components
    └── myComponent
       ├── index.content.ts
       └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── myComponent
       ├── index.content.cjs
       └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── myComponent
       ├── index.content.mjs
       └── index.js
```

```tsx fileName="src/components/myComponent/myComponent.content.ts" contentDeclarationFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentContent;
```

```javascript fileName="src/components/myComponent/myComponent.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

```javascript fileName="src/components/myComponent/myComponent.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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

```json fileName="src/components/myComponent/myComponent.content.json" contentDeclarationFormat="json"
{
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

```tsx fileName="src/components/myComponent/MyComponent.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/myComponent/MyComponent.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/myComponent/MyComponent.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### 主要功能

Intlayer 提供一系列功能来满足现代 web 开发的需求。以下是关键功能的概述，包括每个功能的详细文档链接：

- **国际化支持**: 通过内置的国际化支持增强您的应用程序的全球覆盖范围。
- **可视化编辑器**: 通过为 Intlayer 设计的编辑器插件改善您的开发工作流程。查看 [可视化编辑器指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。
- **配置灵活性**: 根据 [配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md) 中详细说明的广泛配置选项自定义您的设置。
- **先进的 CLI 工具**: 使用 Intlayer 的命令行界面高效管理您的项目。了解 [CLI 工具文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 中的功能。
- **与 i18n 的兼容性**: Intlayer 与其他国际化库无缝协作。有关更多信息，请查看 [i18n 指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_i18next.md)。

### 支持的平台

Intlayer 旨在与 Next.js 和 React 应用程序无缝协作。它还支持 Vite 和 Create React App。

- **Next.js 集成**: 在 Intlayer 中利用 Next.js 的强大功能来实现服务器端渲染和静态站点生成。详细信息在我们的 [Next.js 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md) 中提供。
- **Vite 和 React 集成**: 在 Intlayer 中利用 Vite 实现服务器端渲染和静态站点生成。详细信息在我们的 [Vite 和 React 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md) 中提供。
- **Create React App 集成**: 在 Intlayer 中利用 Create React App 的强大功能来实现服务器端渲染和静态站点生成。详细信息在我们的 [Create React App 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md) 中提供。

### 如何使用此文档

为了充分利用此文档：

1. **导航到相关部分**: 使用上面提供的链接直接访问满足您需求的部分。
2. **交互式示例**: 在可用的地方，利用交互式示例实时查看功能是如何工作的。
3. **反馈和贡献**: 您的反馈至关重要。如果您有建议或更正，请考虑为文档做出贡献。
