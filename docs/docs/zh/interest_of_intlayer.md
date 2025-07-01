---
docName: interest_of_intlayer
url: https://intlayer.org/doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: Intlayer 的优势
description: 发现使用 Intlayer 在您的项目中的好处和优势。了解为什么 Intlayer 在众多框架中脱颖而出。
keywords:
  - 好处
  - 优势
  - Intlayer
  - 框架
  - 比较
---

# Intlayer：为您的网站量身定制的翻译方式

**Intlayer** 是一个专为 JavaScript 开发者设计的国际化库。它允许您在代码中的任何地方声明内容。它将多语言内容的声明转换为结构化的字典，便于轻松集成到您的代码中。通过使用 TypeScript，**Intlayer** 使您的开发更加强大且高效。

## 使用示例

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

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// 组件示例内容
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// 组件示例内容
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

// 组件示例
export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

// 组件示例
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

// 组件示例
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## 为什么选择 Intlayer？

| 功能                               | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **基于JavaScript的内容管理**       | 利用JavaScript的灵活性，高效地定义和管理您的内容。                                                                                                                                                                                                                                                                                                                                                                                                           |
| **类型安全环境**                   | 利用 TypeScript 确保所有内容定义准确无误且无错误。                                                                                                                                                                                                                                                                                                                                                                                                           |
| **集成内容文件**                   | 将您的翻译内容与各自的组件紧密结合，提升可维护性和清晰度。                                                                                                                                                                                                                                                                                                                                                                                                   |
| **简化设置**                       | 通过最少的配置快速启动，特别针对 Next.js 项目进行了优化。                                                                                                                                                                                                                                                                                                                                                                                                    |
| **服务器组件支持**                 | 完美适配 Next.js 服务器组件，确保流畅的服务器端渲染。                                                                                                                                                                                                                                                                                                                                                                                                        |
| **增强的路由功能**                 | 完全支持 Next.js 应用路由，能够无缝适应复杂的应用结构。                                                                                                                                                                                                                                                                                                                                                                                                      |
| **有序的代码库**                   | 保持代码库更加有序：1 个组件 = 同一文件夹中的 1 个字典。                                                                                                                                                                                                                                                                                                                                                                                                     |
| **CI 自动翻译**                    | 使用您自己的 OpenAI API 密钥在持续集成（CI）中自动填充您的翻译，消除对本地化平台的需求。                                                                                                                                                                                                                                                                                                                                                                     |
| **MCP 服务器集成**                 | 提供 MCP（模型上下文协议）服务器以实现 IDE 自动化，使您能够在开发环境中直接无缝管理内容和国际化工作流程。[了解更多](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)。                                                                                                                                                                                                                                                           |
| **Markdown 支持**                  | 导入并解析多语言内容的 Markdown 文件，例如隐私政策。                                                                                                                                                                                                                                                                                                                                                                                                         |
| **免费可视化编辑器和内容管理系统** | 如果您需要与内容撰写者合作进行翻译，我们提供免费的可视化编辑器和内容管理系统，这同样消除了对本地化平台的需求，并允许将内容从代码库中外部化。                                                                                                                                                                                                                                                                                                                 |
| **简化内容获取**                   | 无需为每一条内容调用 `t` 函数；可以使用单个钩子直接获取所有内容。                                                                                                                                                                                                                                                                                                                                                                                            |
| **一致的实现**                     | 客户端和服务器组件使用相同的实现，无需在每个服务器组件之间传递你的 `t` 函数。                                                                                                                                                                                                                                                                                                                                                                                |
| **可进行 Tree-shaking 的内容**     | 内容支持 Tree-shaking，这减轻了最终包的体积。                                                                                                                                                                                                                                                                                                                                                                                                                |
| **非阻塞静态渲染**                 | Intlayer 不会像 `next-intl` 那样阻塞静态渲染。                                                                                                                                                                                                                                                                                                                                                                                                               |
| **非阻塞静态渲染**                 | Intlayer 不会像 `next-intl` 那样阻塞静态渲染。                                                                                                                                                                                                                                                                                                                                                                                                               |
| **互操作性**                       | 允许与 [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_react-i18next.md)、[next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_next-i18next.md)、[next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_next-intl.md) 和 [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_react-intl.md) 互操作。 |

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
