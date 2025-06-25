---
docName: package__react-intlayer
url: /doc/packages/react-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: 包文档 | react-intlayer
description: 查看如何使用 react-intlayer 软件包
keywords:
  - Intlayer
  - react-intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# react-intlayer: 用于国际化 (i18n) React 应用的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的工具包。它兼容 React、React 和 Express.js 等框架。

**`react-intlayer` 包** 允许您对 React 应用进行国际化。它为 React 国际化提供了上下文提供者和钩子。

## 为什么要国际化您的 React 应用？

国际化您的 React 应用对于有效服务全球受众至关重要。它使您的应用能够以每个用户的首选语言传递内容和消息。这种能力增强了用户体验，并通过使您的应用对不同语言背景的人更具可访问性和相关性，从而扩大了应用的覆盖范围。

## 为什么要集成 Intlayer？

- **JavaScript 驱动的内容管理**：利用 JavaScript 的灵活性高效地定义和管理您的内容。
- **类型安全的环境**：利用 TypeScript 确保所有内容定义都精确且无错误。
- **集成的内容文件**：将翻译与其相关组件紧密结合，增强可维护性和清晰度。

## 安装

使用您首选的包管理器安装所需的包：

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

使用 Intlayer，您可以在代码库中的任何地方以结构化方式声明内容。

默认情况下，Intlayer 会扫描扩展名为 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` 的文件。

> 您可以通过在[配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)中设置 `contentDir` 属性来修改默认扩展名。

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

### 声明您的内容

`react-intlayer` 是为 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/index.md) 设计的。`intlayer` 是一个允许您在代码中的任何地方声明内容的包。它将多语言内容声明转换为结构化字典，无缝集成到您的应用中。

以下是内容声明的示例：

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
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
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
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
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
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
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars"
      }
    }
  }
}
```

### 在代码中使用内容

声明内容后，您可以在代码中使用它。以下是如何在 React 组件中使用内容的示例：

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

## 掌握 React 应用的国际化

Intlayer 提供了许多功能来帮助您国际化您的 React 应用。

**要了解更多关于这些功能的信息，请参考 [使用 Intlayer 和 Vite 以及 React 进行 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md) 的指南，或 [使用 Intlayer 和 React (CRA) 进行 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md) 的指南。**

## `react-intlayer` 包提供的功能

`react-intlayer` 包还提供了一些功能来帮助您国际化您的应用。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayerAsync.md)
