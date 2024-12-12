# Intlayer: 更靠近地翻译您的应用程序

**Intlayer** 是一个专为 JavaScript 开发者设计的国际化库。它允许您在代码的任何地方声明您的内容。它将多语言内容的声明转换为结构化字典，以便轻松集成到您的代码中。使用 TypeScript，**Intlayer** 让您的开发更加稳健和高效。

## 用法示例

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component1",
  content: {
    myTranslatedContent: t({
      en: "Hello World", // 英文
      fr: "Bonjour le monde", // 法文
      es: "Hola Mundo", // 西班牙文
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

## 为什么选择 Intlayer？

- **JavaScript 驱动的内容管理**：利用 JavaScript 的灵活性高效定义和管理您的内容。
- **类型安全环境**：利用 TypeScript 确保您的所有内容定义都是精确且无误的。
- **集成内容文件**：将您的翻译与其相应的组件紧密结合，提高可维护性和清晰性。
- **简化设置**：快速启动，配置极简，特别优化为适用于 Next.js 项目。
- **服务器组件支持**：完美适用于 Next.js 服务器组件，确保顺畅的服务器端渲染。
- **增强路由**：完全支持 Next.js 应用路由，动态适应复杂的应用结构。
- **互操作性**：允许 i18next 互操作性。(beta)
