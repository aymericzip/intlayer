---
blogName: intlayer_with_next-i18next
url: https://intlayer.org/blog/intlayer-with-next-i18next
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/intlayer_with_next-i18next.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Intlayer和next-i18next
description: 与Next.js应用程序的next-i18next集成Intlayer
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# Next.js 国际化 (i18n) 与 next-i18next 和 Intlayer

both next-i18next 和 Intlayer 是为 Next.js 应用程序设计的开源国际化 (i18n) 框架。它们广泛用于软件项目中的翻译、地方化和语言切换管理。

这两种解决方案包括三个主要概念：

1. **内容声明**：定义应用程序可翻译内容的方法。

   - 在 `i18next` 的情况下称为 `resource`，内容声明是一个结构化的 JSON 对象，包含一种或多种语言翻译的键值对。有关更多信息，请参阅 [i18next 文档](https://www.i18next.com/translation-function/essentials)。
   - 在 `Intlayer` 的情况下称为 `content declaration file`，内容声明可以是导出结构化数据的 JSON、JS 或 TS 文件。有关更多信息，请参阅 [Intlayer 文档](https://intlayer.org/fr/doc/concept/content)。

2. **工具**：构建和解释应用程序中的内容声明的工具，例如 `getI18n()`、`useCurrentLocale()` 或 `useChangeLocale()` 对于 next-i18next，以及 `useIntlayer()` 或 `useLocale()` 对于 Intlayer。

3. **插件和中间件**：用于管理 URL 重定向、打包优化等功能，例如 next-i18next 的 `next-i18next/middleware` 或 Intlayer 的 `intlayerMiddleware`。

## Intlayer vs. i18next：主要区别

要探索 i18next 和 Intlayer 之间的区别，请查看我们的 [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18next_vs_next-intl_vs_intlayer.md) 博客文章。

## 如何使用 Intlayer 生成 next-i18next 字典

### 为什么在 next-i18next 中使用 Intlayer？

Intlayer 内容声明文件通常提供更好的开发者体验。由于两个主要优点，它们更灵活且可维护：

1. **灵活的放置**：Intlayer 内容声明文件可以放置在应用程序的文件树中的任何位置，简化了重复或删除组件管理，而无需留下未使用的内容声明。

   示例文件结构：

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # 内容声明文件
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # 内容声明文件
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # 内容声明文件
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # 内容声明文件
               └── index.jsx
   ```

2. **集中翻译**：Intlayer 将所有翻译存储在一个文件中，确保没有翻译缺失。当使用 TypeScript 时，缺失的翻译会被自动检测并报告为错误。

### 安装

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### 配置 Intlayer 导出 i18next 字典

> 导出 i18next 资源并不能确保与其他框架的 1:1 兼容。建议坚持使用基于 Intlayer 的配置以减少问题。

要导出 i18next 资源，请在 `intlayer.config.ts` 文件中配置 Intlayer。示例配置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
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
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
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
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

以下是文档其余部分的续写和更正：

---

### 将字典导入到您的 i18next 配置中

要将生成的资源导入到您的 i18next 配置中，请使用 `i18next-resources-to-backend`。以下是示例：

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### 内容声明

各种格式的内容声明文件示例：

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### 构建 next-i18next 资源

要构建 next-i18next 资源，请运行以下命令：

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

这将生成资源在 `./i18next/resources` 目录中。预期的输出：

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

注意：i18next 命名空间对应 Intlayer 声明键。

### 实现 Next.js 插件

配置完成后，实施 Next.js 插件，以便在 Intlayer 内容声明文件更新时重新构建 i18next 资源。

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### 在 Next.js 组件中使用内容

实施 Next.js 插件后，您可以在组件中使用内容：

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```
