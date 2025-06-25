---
docName: package__intlayer
url: /doc/packages/intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: 包文档 | intlayer
description: 查看如何使用 intlayer 软件包
keywords:
  - Intlayer
  - intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# intlayer: 管理多语言词典的NPM包 (i18n)

**Intlayer** 是专为JavaScript开发者设计的一套工具包。它兼容React、Next.js和Express.js等框架。

**`intlayer`包** 允许您在代码中的任何地方声明内容。它将多语言内容声明转换为结构化词典，能够无缝集成到您的应用程序中。通过TypeScript，**Intlayer** 提供更强大、更高效的开发工具。

## 为什么要集成Intlayer？

- **基于JavaScript的内容管理**：利用JavaScript的灵活性高效地定义和管理内容。
- **类型安全的环境**：利用TypeScript确保所有内容定义的精确性和无错误。
- **集成的内容文件**：将翻译与其相关组件保持紧密联系，提高可维护性和清晰度。

## 安装

使用您喜欢的包管理器安装必要的包：

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### 配置Intlayer

Intlayer提供了一个配置文件来设置您的项目。将此文件放置在项目的根目录中。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// 配置文件示例
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
// 配置文件示例
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
// 配置文件示例
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

> 有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 使用示例

通过Intlayer，您可以在代码库中的任何地方以结构化的方式声明内容。

默认情况下，Intlayer会扫描扩展名为`.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`的文件。

> 可以通过在[配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)中设置`contentDir`属性来修改默认扩展名。

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

### 声明您的内容

以下是内容声明的示例：

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

// 客户端组件内容
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      zh: "你好，世界",
    }),
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "很多车",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// 客户端组件内容
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      zh: "你好，世界",
    }),
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "很多车",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// 客户端组件内容
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      zh: "你好，世界",
    }),
    numberOfCar: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "很多车",
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
        "es": "Hola Mundo",
        "zh": "你好，世界"
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
        ">19": "很多车"
      }
    }
  }
}
```

### 构建您的词典

您可以使用[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md)构建词典。

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

此命令扫描所有`*.content.*`文件，编译它们，并将结果写入**`intlayer.config.ts`**中指定的目录（默认是`./.intlayer`）。

典型输出可能如下所示：

```bash
.
└── .intlayer
    ├── dictionary  # 包含内容的词典
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # 包含应用程序中使用的词典入口点
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # 包含词典的自动生成类型定义
        ├── intlayer.d.ts  # 包含Intlayer的自动生成类型定义
        ├── client-component.d.ts
        └── server-component.d.ts
```

### 构建i18next资源

Intlayer可以配置为为[i18next](https://www.i18next.com/)构建词典。为此，您需要在`intlayer.config.ts`文件中添加以下配置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// 配置文件示例
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // 告诉Intlayer生成i18next的消息文件
    dictionaryOutput: ["i18next"],

    // Intlayer将写入消息JSON文件的目录
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
// 配置文件示例
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // 告诉Intlayer生成i18next的消息文件
    dictionaryOutput: ["i18next"],

    // Intlayer将写入消息JSON文件的目录
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
// 配置文件示例
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // 告诉Intlayer生成i18next的消息文件
    dictionaryOutput: ["i18next"],

    // Intlayer将写入消息JSON文件的目录
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> 有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

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

例如，**en/client-component.json**可能如下所示：

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```
