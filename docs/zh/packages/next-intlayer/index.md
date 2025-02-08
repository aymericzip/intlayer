# next-intlayer: NPM 包用于国际化 (i18n) 一个 Next.js 应用程序

**Intlayer** 是一套专门为 JavaScript 开发人员设计的包。它与 React、Next.js 和 Express.js 等框架兼容。

**`next-intlayer` 包** 使您能够国际化您的 Next.js 应用程序。它提供了上下文提供者和钩子，以支持 Next.js 的国际化。此外，它还包括用于将 Intlayer 集成到 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 的 Next.js 插件，以及用于检测用户首选语言环境、管理 Cookies 和处理 URL 重定向的中间件。

## 为什么要国际化您的 Next.js 应用程序？

国际化您的 Next.js 应用程序对于有效地服务全球受众至关重要。它允许您的应用程序以每个用户的首选语言传递内容和消息。这种能力增强了用户体验，并通过使其更易于访问和与来自不同语言背景的人们相关而扩展了您应用程序的覆盖范围。

## 为什么要集成 Intlayer？

- **基于 JavaScript 的内容管理**：利用 JavaScript 的灵活性高效地定义和管理您的内容。
- **类型安全环境**：利用 TypeScript 确保所有内容定义都准确且无误。
- **集成内容文件**：将您的翻译与各自的组件保持在一起，提高可维护性和清晰度。

## 安装

使用您首选的包管理器安装必要的包：

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

默认情况下，Intlayer 扫描扩展名为 `.content.{ts,tsx,js,jsx,mjs,cjs}` 的文件。

> 您可以通过设置 [配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md) 中的 `contentDir` 属性来修改默认扩展名。

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

### 声明您的内容

`next-intlayer` 是与 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/index.md) 一起使用的。`intlayer` 是一个允许您在代码中的任何地方声明内容的包。它将多语言内容声明转换为无缝集成到您应用程序中的结构化字典。

以下是内容声明的示例：

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
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
      "<-1": "少于一辆车",
      "-1": "一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
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
      "<-1": "少于一辆车",
      "-1": "一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    }),
  },
};

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
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
      "<-1": "少于一辆车",
      "-1": "一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    }),
  },
};

module.exports = clientComponentContent;
```

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
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
        "<-1": "少于一辆车",
        "-1": "一辆车",
        "0": "没有车",
        "1": "一辆车",
        ">5": "一些车",
        ">19": "许多车"
      }
    }
  }
}
```

### 在您的代码中利用内容

一旦您声明了内容，您可以在代码中使用它。以下是如何在 React 组件中使用内容的示例：

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

## 精通 Next.js 应用程序的国际化

Intlayer 提供了许多功能，以帮助您国际化您的 Next.js 应用程序。以下是一些关键功能：

- **服务器组件的国际化**：Intlayer 允许您以与客户端组件相同的方式国际化服务器组件。这意味着您可以为客户端和服务器组件使用相同的内容声明。
- **语言环境检测中间件**：Intlayer 提供中间件以检测用户的首选语言环境。该中间件用于检测用户的首选语言环境，并根据 [配置](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md) 将他们重定向到适当的 URL。
- **元数据的国际化**：Intlayer 提供了一种国际化您的元数据（例如页面的标题）的方法，使用 Next.js 提供的 `generateMetadata` 函数。您可以使用 `getTranslation` 函数来翻译您的元数据。
- **sitemap.xml 和 robots.txt 的国际化**：Intlayer 允许您国际化您的 sitemap.xml 和 robots.txt 文件。您可以使用 `getMultilingualUrls` 函数为您的 sitemap 生成多语言 URL。
- **URL 的国际化**：Intlayer 允许您通过使用 `getMultilingualUrls` 函数来国际化您的 URL。该函数为您的 sitemap 生成多语言 URL。

**要了解有关这些功能的更多信息，请参考 [使用 Intlayer 和 Next.js 15 应用程序路由的 Next.js 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md) 指南。**

## `next-intlayer` 包提供的功能

`next-intlayer` 包还提供了一些函数，以帮助您国际化您的应用程序。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/useIntlayerAsync.md)
