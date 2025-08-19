---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 包文档 | react-intlayer
description: 查看如何使用 react-intlayer 包
keywords:
  - Intlayer
  - react-intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
---

# react-intlayer：用于国际化（i18n）React 应用的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包。它兼容 React、React 和 Express.js 等框架。

**`react-intlayer` 包** 允许您对 React 应用进行国际化。它为 React 国际化提供了上下文提供者和钩子。

## 为什么要对您的 React 应用进行国际化？

对您的 React 应用进行国际化对于有效服务全球用户至关重要。它使您的应用能够以每个用户偏好的语言传递内容和信息。这种能力提升了用户体验，并通过使应用对不同语言背景的人更易访问和相关，扩大了应用的覆盖范围。

## 为什么要集成 Intlayer？

- **基于 JavaScript 的内容管理**：利用 JavaScript 的灵活性高效地定义和管理您的内容。
- **类型安全环境**：利用 TypeScript 确保所有内容定义准确且无错误。
- **集成内容文件**：将翻译内容与各自组件紧密结合，提升可维护性和清晰度。

## 安装

使用您喜欢的包管理器安装所需的包：

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## 使用示例

使用 Intlayer，您可以在代码库中的任何位置以结构化的方式声明内容。

默认情况下，Intlayer 会扫描扩展名为 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` 的文件。

> 你可以通过在[配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)中设置 `contentDir` 属性来修改默认的扩展名。

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### 声明你的内容

`react-intlayer` 设计为与 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/index.md) 配合使用。`intlayer` 是一个允许你在代码中任何地方声明内容的包。它将多语言内容声明转换为结构化的字典，能够无缝集成到你的应用程序中。

以下是内容声明的示例：

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "许多车",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx fileName="src/Component1/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有汽车",
      "1": "一辆汽车",
      ">5": "一些汽车",
      ">19": "许多汽车",
    }),
  },
};

export default component1Content;
```

```jsx fileName="src/Component1/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "少于负一辆汽车",
      "-1": "负一辆汽车",
      "0": "没有汽车",
      "1": "一辆汽车",
      ">5": "一些汽车",
      ">19": "许多汽车",
    }),
  },
};

module.exports = component1Content;
```

```json fileName="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "少于负一辆车",
        "-1": "负一辆车",
        "0": "没有车",
        "1": "一辆车",
        ">5": "几辆车",
        ">19": "许多车"
      }
    }
  }
}
```

### 在代码中使用内容

一旦声明了内容，就可以在代码中使用它。以下是如何在 React 组件中使用内容的示例：

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // 创建相关内容声明

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // 创建相关内容声明

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // 创建相关内容声明

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## 掌握您的 React 应用程序的国际化

Intlayer 提供了许多功能，帮助您实现 React 应用程序的国际化。

**要了解有关这些功能的更多信息，请参阅针对 Vite 和 React 应用程序的 [使用 Intlayer 和 Vite 进行 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md) 指南，或针对 React Create App 的 [使用 Intlayer 和 React (CRA) 进行 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md) 指南。**

## `react-intlayer` 包提供的函数

`react-intlayer` 包还提供了一些函数，帮助你实现应用程序的国际化。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/t.md)
  **要了解有关这些功能的更多信息，请参阅针对 Vite 和 React 应用的[使用 Intlayer 和 Vite 进行 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)指南，或针对 React Create App 的[使用 Intlayer 和 React (CRA) 进行 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)指南。**

## `react-intlayer` 包提供的函数

`react-intlayer` 包还提供了一些函数，帮助您实现应用的国际化。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
