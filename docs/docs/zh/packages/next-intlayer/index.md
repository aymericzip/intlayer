---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 包文档 | next-intlayer
description: 查看如何使用 next-intlayer 包
keywords:
  - Intlayer
  - next-intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
---

# next-intlayer：用于国际化（i18n）Next.js 应用的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包。它兼容 React、Next.js 和 Express.js 等框架。

**`next-intlayer` 包** 允许您对 Next.js 应用进行国际化。它提供了用于 Next.js 国际化的上下文提供者和钩子。此外，它还包含用于将 Intlayer 集成到 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 的 Next.js 插件，以及用于检测用户首选语言环境、管理 Cookie 和处理 URL 重定向的中间件。

## 为什么要对您的 Next.js 应用进行国际化？

国际化您的 Next.js 应用对于有效服务全球用户至关重要。它使您的应用能够以每个用户偏好的语言传递内容和信息。这种能力提升了用户体验，扩大了应用的覆盖范围，使其对来自不同语言背景的人们更具可访问性和相关性。

## 为什么要集成 Intlayer？

- **基于 JavaScript 的内容管理**：利用 JavaScript 的灵活性高效定义和管理您的内容。
- **类型安全环境**：借助 TypeScript 确保所有内容定义准确无误。
- **集成内容文件**：将翻译内容与各自组件紧密结合，提升可维护性和清晰度。

## 安装

使用您喜欢的包管理器安装必要的包：

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## 使用示例

使用 Intlayer，您可以在代码库中的任何地方以结构化的方式声明您的内容。

默认情况下，Intlayer 会扫描扩展名为 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` 的文件。

> 您可以通过在[配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)中设置 `contentDir` 属性来修改默认扩展名。

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.ts
        │   └── index.tsx
        └── ServerComponent
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.mjs
        │   └── index.mjx
        └── ServerComponent
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### 声明你的内容

`next-intlayer` 设计用于配合 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/index.md) 使用。`intlayer` 是一个允许你在代码中的任何位置声明内容的包。它将多语言内容声明转换为结构化的字典，能够无缝集成到你的应用程序中。

以下是内容声明的示例：

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "许多车",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    }),
  },
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
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
        ">5": "一些车",
        ">19": "许多车"
      }
    }
  }
}
```

### 在代码中使用内容

一旦声明了内容，就可以在代码中使用它。以下是如何在 React 组件中使用内容的示例：

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 创建相关内容声明

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 创建相关内容声明

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 创建相关内容声明

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## 精通您的 Next.js 应用程序的国际化

Intlayer 提供了许多功能，帮助您实现 Next.js 应用程序的国际化。以下是一些关键功能：

- **服务器组件的国际化**：Intlayer 允许您以与客户端组件相同的方式对服务器组件进行国际化。这意味着您可以为客户端和服务器组件使用相同的内容声明。
- **用于语言环境检测的中间件**：Intlayer 提供了用于检测用户首选语言环境的中间件。该中间件用于检测用户的首选语言环境，并根据[配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)将用户重定向到相应的 URL。
- **元数据的国际化**：Intlayer 提供了一种国际化元数据的方法，例如页面标题，使用 Next.js 提供的 `generateMetadata` 函数。您可以使用 `getTranslation` 函数来翻译您的元数据。
- **sitemap.xml 和 robots.txt 的国际化**：Intlayer 允许您对 sitemap.xml 和 robots.txt 文件进行国际化。您可以使用 `getMultilingualUrls` 函数为您的 sitemap 生成多语言 URL。
- **URL 的国际化**：Intlayer 允许您通过使用 `getMultilingualUrls` 函数来实现 URL 的国际化。该函数为您的 sitemap 生成多语言 URL。

**要了解有关这些功能的更多信息，请参阅 [Next.js 与 Intlayer 及 Next.js 15 App Router 的国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md) 指南。**

## `next-intlayer` 包提供的函数

`next-intlayer` 包还提供了一些函数，帮助您实现应用程序的国际化。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayerAsync.md)

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
