---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 包文档 | intlayer
description: 查看如何使用 intlayer 包
keywords:
  - Intlayer
  - intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
---

# intlayer：管理多语言词典（i18n）的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包集合。它兼容 React、Next.js 和 Express.js 等框架。

**`intlayer` 包** 允许你在代码中的任何位置声明内容。它将多语言内容声明转换为结构化的词典，能够无缝集成到你的应用程序中。借助 TypeScript，**Intlayer** 通过提供更强大、更高效的工具来增强你的开发体验。

## 为什么要集成 Intlayer？

- **基于 JavaScript 的内容管理**：利用 JavaScript 的灵活性，高效地定义和管理你的内容。
- **类型安全的环境**：利用 TypeScript 确保所有内容定义准确无误。
- **集成的内容文件**：将翻译内容与各自组件紧密结合，提高可维护性和清晰度。

## 安装

使用你喜欢的包管理器安装所需的包：

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### 配置 Intlayer

Intlayer 提供了一个配置文件用于设置你的项目。将此文件放置在项目根目录。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 使用示例

使用 Intlayer，您可以在代码库中的任何位置以结构化的方式声明您的内容。

默认情况下，Intlayer 会扫描扩展名为 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` 的文件。

> 可以通过在[配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)中设置 `contentDir` 属性来修改默认的扩展名。

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
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
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### 声明你的内容

以下是内容声明的示例：

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "许多汽车",
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
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有汽车",
      "1": "一辆车",
      ">5": "一些汽车",
      ">19": "许多汽车",
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
      es: "Hola Mundo",
      fr: "Bonjour le monde",
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

### 构建你的字典

你可以使用 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md) 来构建你的字典。

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

此命令会扫描所有 `*.content.*` 文件，编译它们，并将结果写入您在 **`intlayer.config.ts`** 中指定的目录（默认是 `./.intlayer`）。

一个典型的输出结构可能如下所示：

```bash
.
└── .intlayer
    ├── dictionary  # 包含您的内容字典
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # 包含字典的入口点，用于您的应用程序
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # 包含字典的自动生成类型定义
        ├── intlayer.d.ts  # 包含 Intlayer 的自动生成类型定义
        ├── client-component.d.ts
        └── server-component.d.ts
```

### 构建 i18next 资源

Intlayer 可以配置为构建适用于 [i18next](https://www.i18next.com/) 的字典。为此，您需要在 `intlayer.config.ts` 文件中添加以下配置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // 告诉 Intlayer 生成 i18next 的消息文件
    dictionaryOutput: ["i18next"],

    // Intlayer 将写入消息 JSON 文件的目录
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // 告诉 Intlayer 生成 i18next 的消息文件
    dictionaryOutput: ["i18next"],

    // Intlayer 将写入消息 JSON 文件的目录
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // 告诉 Intlayer 生成 i18next 的消息文件
    dictionaryOutput: ["i18next"],

    // Intlayer 将写入消息 JSON 文件的目录
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> 有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

输出：

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

例如，**en/client-component.json** 可能如下所示：

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "一些汽车"
}
```

### 构建 next-intl 字典

Intlayer 可以配置为构建适用于 [i18next](https://www.i18next.com/) 或 [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl) 的字典。为此，您需要在 `intlayer.config.ts` 文件中添加以下配置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // 告诉 Intlayer 生成适用于 i18next 的消息文件
    dictionaryOutput: ["next-intl"],

    // Intlayer 将写入消息 JSON 文件的目录
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // 告诉 Intlayer 生成 next-intl 的消息文件
    dictionaryOutput: ["next-intl"],

    // Intlayer 将写入消息 JSON 文件的目录
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // 告诉 Intlayer 生成 next-intl 的消息文件
    dictionaryOutput: ["next-intl"],

    // Intlayer 将写入消息 JSON 文件的目录
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> 有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

输出：

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

例如，**en/client-component.json** 可能如下所示：

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "你好，世界",
  "zero_numberOfCar": "没有汽车",
  "one_numberOfCar": "一辆汽车",
  "two_numberOfCar": "两辆汽车",
  "other_numberOfCar": "一些汽车"
}
```

## CLI 工具

Intlayer 提供了一个 CLI 工具来：

- 审核你的内容声明并补全缺失的翻译
- 从你的内容声明构建字典
- 从你的 CMS 推送和拉取远程字典到你的本地项目

更多信息请参阅 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

## 在你的应用中使用 Intlayer

内容声明完成后，你可以在应用中使用 Intlayer 字典。

Intlayer 作为一个包提供给你的应用使用。

### React 应用

要在您的 React 应用程序中使用 Intlayer，您可以使用 [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md)。

### Next.js 应用程序

要在您的 Next.js 应用程序中使用 Intlayer，您可以使用 [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/index.md)。

### Express 应用程序

要在您的 Express 应用程序中使用 Intlayer，您可以使用 [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/express-intlayer/index.md)。

## `intlayer` 包提供的函数

`intlayer` 包还提供了一些函数，帮助您实现应用程序的国际化。

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md)

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史记录
