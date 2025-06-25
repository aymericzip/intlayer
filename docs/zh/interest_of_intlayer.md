---
docName: interest_of_intlayer
url: https://intlayer.org/doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2024-08-14
title: Intlayer的优势
description: 发现使用Intlayer进行项目的好处和优点。了解为什么Intlayer在其他框架中脱颖而出。
keywords:
  - 好处
  - 优势
  - Intlayer
  - 框架
  - 比较
---

# Intlayer: 一种定制化的网站翻译方式

**Intlayer** 是一个专门为 JavaScript 开发者设计的国际化库。它允许你在代码的任何地方声明你的内容。它将多语言内容的声明转换为结构化字典，以便轻松集成到你的代码中。使用 TypeScript，**Intlayer** 使你的开发更加健壮和高效。

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

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## 为什么选择 Intlayer？

- **基于 JavaScript 的内容管理**：利用 JavaScript 的灵活性来高效地定义和管理你的内容。
- **类型安全环境**：使用 TypeScript 确保所有内容定义都准确无误。
- **集成的内容文件**：将翻译内容保存在其相应组件附近，提高可维护性和清晰度。
- **简化配置**：以最少的配置快速开始，特别针对 Next.js 项目进行了优化。
- **服务器组件支持**：完美适合 Next.js 服务器组件，确保流畅的服务器端渲染。
- **改进的路由**：完全支持 Next.js 应用程序路由，完美适应复杂的应用程序结构。
- **组织良好的代码库**：保持代码库更有组织性：1 个组件 = 1 个字典在同一文件夹中。
- **自动 TypeScript 类型**：TypeScript 类型自动实现，防止因重命名或删除键而导致的代码破坏。
- **CI 自动翻译**：使用您自己的 OpenAI API 密钥在 CI 中自动填充您的翻译，消除对 L10n 平台的需求。
- **MCP 服务器集成**：为 IDE 自动化提供 MCP（Model Context Protocol）服务器，直接在您的开发环境中实现无缝的内容管理和 i18n 工作流。[了解更多](https://github.com/aymericzip/intlayer/blob/main/docs/en/mcp_server.md)。
- **Markdown 支持**：导入和解释 markdown 文件以处理多语言内容，如隐私政策。
- **免费可视化编辑器和 CMS**：如果你需要与内容作者合作进行翻译，可以使用免费的可视化编辑器和 CMS，再次消除对本地化平台的需求，并允许从代码库中外部化内容。
- **简化的内容检索**：无需为每个内容片段调用 `t` 函数；使用单个钩子直接检索所有内容。
- **一致的实现**：客户端和服务器组件使用相同的实现，无需通过每个服务器组件传递 `t` 函数。
- **Tree-shakable 内容**：内容是 tree-shakable 的，使最终包更轻量。
- **非阻塞静态渲染**：Intlayer 不会像 `next-intl` 那样阻塞静态渲染。
- **互操作性**：允许与 [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-i18next.md)、[next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-i18next.md)、[next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-intl.md) 和 [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-intl.md) 进行互操作。
