# intlayer: NPM包用于管理多语言内容声明（i18n）

**Intlayer** 是一套专为JavaScript开发者设计的包。它与React、Next.js和Express.js等框架兼容。

**`intlayer`包** 允许您在代码中的任何地方声明内容。它将多语言内容声明转换为结构化的字典，无缝集成到您的应用程序中。通过TypeScript，**Intlayer**通过提供更强大、更高效的工具增强您的开发。

## 为什么集成Intlayer？

- **基于JavaScript的内容管理**：利用JavaScript的灵活性高效地定义和管理您的内容。
- **类型安全的环境**：利用TypeScript确保您所有的内容定义都是精确的且无错误的。
- **集成内容文件**：将您的翻译与相应的组件紧密结合，提高可维护性和清晰性。

## 安装

使用您的首选包管理器安装必要的包：

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

Intlayer提供一个配置文件以设置您的项目。将此文件放在项目根目录中。

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

> 有关可用参数的完整列表，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 使用示例

使用Intlayer，您可以在代码库中的任何地方以结构化的方式声明您的内容。

默认情况下，Intlayer扫描扩展名为 `.content.{ts,tsx,js,jsx,mjs,cjs}` 的文件。

> 您可以通过在[配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)中设置 `contentDir` 属性来修改默认扩展名。

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    ├── ClientComponent
    │   ├── index.content.ts
    │   └── index.tsx
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
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### 声明您的内容

这是一个内容声明的示例：

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
      "-1": "减去一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "很多车",
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
      "-1": "减去一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "很多车",
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
      "-1": "减去一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "几辆车",
      ">19": "很多车",
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
        "-1": "减去一辆车",
        "0": "没有车",
        "1": "一辆车",
        ">5": "几辆车",
        ">19": "很多车"
      }
    }
  }
}
```

### 构建您的字典

您可以使用[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md)构建您的字典。

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

该命令扫描所有 `*.content.*` 文件，编译它们，并将结果写入您 **`intlayer.config.ts`** 中指定的目录（默认是 `./.intlayer`）。

典型的输出可能如下所示：

```bash
.
├── .intlayer
│   ├── dictionary  # 包含您内容的字典
│   │   ├── client-component.json
│   │   └── server-component.json
│   ├── main  # 包含您字典的入口点，可用于您的应用程序
│   │   ├── dictionary.cjs
│   │   └── dictionary.mjs
│   └── types  # 包含您字典的自动生成的类型定义
│       ├── client-component.d.ts
│       └── server-component.d.ts
└── types
    └── intlayer.d.ts  # 包含Intlayer的自动生成类型定义
```

### 构建i18next资源

Intlayer可以配置为为[i18next](https://www.i18next.com/)构建字典。为此，您需要将以下配置添加到您的 `intlayer.config.ts` 文件中：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // 告诉Intlayer为i18next生成消息文件
    dictionaryOutput: ["i18next"],

    // Intlayer将写入您的消息JSON文件的目录
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
    // 告诉Intlayer为i18next生成消息文件
    dictionaryOutput: ["i18next"],

    // Intlayer将写入您的消息JSON文件的目录
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
    // 告诉Intlayer为i18next生成消息文件
    dictionaryOutput: ["i18next"],

    // Intlayer将写入您的消息JSON文件的目录
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> 有关可用参数的完整列表，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

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

```json filePath="intlayer/dictionary/zh/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "没有车",
  "one_numberOfCar": "一辆车",
  "two_numberOfCar": "两辆车",
  "other_numberOfCar": "几辆车"
}
```

### 构建i18next或next-intl字典

Intlayer可以配置为为[i18next](https://www.i18next.com/)或[next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl)构建字典。为此，您需要将以下配置添加到您的 `intlayer.config.ts` 文件中：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // 告诉Intlayer为next-intl生成消息文件
    dictionaryOutput: ["next-intl"],

    // Intlayer将写入您的消息JSON文件的目录
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
    // 告诉Intlayer为next-intl生成消息文件
    dictionaryOutput: ["next-intl"],

    // Intlayer将写入您的消息JSON文件的目录
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
    // 告诉Intlayer为next-intl生成消息文件
    dictionaryOutput: ["next-intl"],

    // Intlayer将写入您的消息JSON文件的目录
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> 有关可用参数的完整列表，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

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

```json filePath="intlayer/dictionary/zh/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "没有车",
  "one_numberOfCar": "一辆车",
  "two_numberOfCar": "两辆车",
  "other_numberOfCar": "几辆车"
}
```

## CLI工具

Intlayer提供一个CLI工具，用于：

- 审核您的内容声明并完成缺失的翻译
- 从您的内容声明构建字典
- 从您的CMS推送和拉取远程字典到您的本地项目

请参考[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md)以获取更多信息。

## 在您的应用程序中使用Intlayer

在声明您的内容后，您可以在应用程序中使用您的Intlayer字典。

Intlayer作为您应用程序的一个包可用。

### React应用程序

要在您的React应用程序中使用Intlayer，您可以使用[react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/index.md)。

### Next.js应用程序

要在您的Next.js应用程序中使用Intlayer，您可以使用[next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/next-intlayer/index.md)。

### Express应用程序

要在您的Express应用程序中使用Intlayer，您可以使用[express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/express-intlayer/index.md)。

## `intlayer`包提供的函数

`intlayer`包还提供一些函数来帮助您国际化您的应用程序。

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/getPathWithoutLocale.md)
