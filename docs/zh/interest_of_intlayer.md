# Intlayer: 更贴近的方式翻译您的应用程序

**Intlayer** 是一个专为 JavaScript 开发者设计的国际化库。它允许您在代码中的任何地方声明内容。它将多语言内容的声明转换为结构化的字典，便于集成到您的代码中。通过使用 TypeScript，**Intlayer** 使您的开发更强大、更高效。

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

- **基于 JavaScript 的内容管理**：利用 JavaScript 的灵活性高效定义和管理您的内容。
- **类型安全环境**：借助 TypeScript 确保所有内容定义精确且无错误。
- **集成内容文件**：将翻译内容与其相关组件紧密结合，提升可维护性和清晰度。
- **简化的设置**：通过最少的配置快速启动，特别为 Next.js 项目优化。
- **服务器组件支持**：完美适配 Next.js 服务器组件，确保流畅的服务器端渲染。
- **增强的路由功能**：完全支持 Next.js 应用路由，无缝适应复杂的应用结构。
- **互操作性**：支持与 [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_react-i18next.md)、[next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_next-i18next.md)、[next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_next-intl.md) 和 [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_react-intl.md) 的互操作性。
