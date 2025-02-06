# react-intlayer: NPM包以国际化（i18n）React应用程序

**Intlayer** 是一套专门为JavaScript开发人员设计的包。它与React、React和Express.js等框架兼容。

**`react-intlayer`包**允许您国际化您的React应用程序。它为React国际化提供上下文提供者和钩子。

## 为什么要国际化您的React应用程序？

国际化您的React应用程序对于有效地服务全球受众至关重要。它使您的应用程序能够以每个用户的首选语言传递内容和信息。此功能提升了用户体验，并通过使其更具可访问性和相关性来拓宽应用程序的覆盖面，使其适合来自不同语言背景的人。

## 为什么要集成Intlayer？

- **基于JavaScript的内容管理**：利用JavaScript的灵活性高效地定义和管理您的内容。
- **类型安全环境**：利用TypeScript确保您的所有内容定义都是准确且无误的。
- **集成内容文件**：将您的翻译与各自组件保持紧密，增强可维护性和清晰度。

## 安装

使用您首选的包管理器安装必要的包：

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## 示例

使用Intlayer，您可以在代码库的任何地方以结构化的方式声明您的内容。

默认情况下，Intlayer扫描扩展名为`.content.{ts,tsx,js,jsx,mjs,cjs}`的文件。

> 您可以通过在 [配置文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md) 中设置 `contentDir` 属性来修改默认扩展名。

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

`react-intlayer` 旨在与 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/intlayer/index.md) 一起使用。`intlayer` 是一个允许您在代码的任何地方声明内容的包。它将多语言内容声明转换为结构化词典，可无缝集成到您的应用中。

以下是内容声明的示例：

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
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

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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

```json filePath="src/Component1/index.content.json" codeFormat="json"
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

### 在您的代码中利用内容

一旦您声明了内容，就可以在代码中使用它。以下是如何在React组件中使用内容的示例：

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

## 掌握您React应用程序的国际化

Intlayer提供了许多功能来帮助您国际化您的React应用程序。

**要了解有关这些功能的更多信息，请参阅 [与Intlayer和Vite及React的React国际化（i18n）](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md)指南，或 [使用Intlayer和React（CRA）的React国际化（i18n）](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)指南。**

## `react-intlayer`包提供的功能

`react-intlayer`包还提供了一些功能，帮助您国际化应用程序。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/zh/packages/react-intlayer/useIntlayerAsync.md)
