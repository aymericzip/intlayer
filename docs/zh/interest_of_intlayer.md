# Intlayer: 更接近翻译您的应用程序

**Intlayer** 是一个专为 JavaScript 开发人员设计的国际化库。它允许您在代码的各个地方声明内容。它将多语言内容的声明转换为结构化的字典，以便更容易地集成到您的代码中。使用 TypeScript，**Intlayer** 使您的开发更强大且更高效。

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
import { type DeclarationContent, t } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

- **JavaScript 驱动的内容管理**: 利用 JavaScript 的灵活性高效地定义和管理您的内容。
- **类型安全环境**: 利用 TypeScript 确保您的内容定义精确且无错误。
- **集成内容文件**: 将翻译文本与其各自的组件紧密结合，增强可维护性和清晰性。
- **简化设置**: 通过最小的配置快速启动，特别为 Next.js 项目优化。
- **服务器组件支持**: 完美适合 Next.js 服务器组件，确保流畅的服务器端渲染。
- **增强路由**: 完全支持 Next.js 应用路由，能够无缝适应复杂的应用结构。
- **互操作性**: 允许与 i18next 的互操作性。（beta）
