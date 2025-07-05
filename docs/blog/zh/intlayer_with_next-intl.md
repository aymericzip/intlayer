---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer和next-intl
description: 与React应用程序的next-intl集成Intlayer
keywords:
  - next-intl
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
---

# Next.js 国际化 (i18n) 与 next-intl 和 Intlayer

next-intl 和 Intlayer 是为 Next.js 应用程序设计的开源国际化 (i18n) 框架。它们广泛用于管理软件项目中的翻译、本地化和语言切换。

它们共享三个主要概念：

1. **内容声明**: 定义应用程序可翻译内容的方法。

   - 在 Intlayer 中称为 `content declaration file`，可以是导出结构化数据的 JSON、JS 或 TS 文件。有关更多信息，请参见 [Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/concept/content.md)。
   - 在 next-intl 中称为 `messages` 或 `locale messages`，通常在 JSON 文件中。有关更多信息，请参见 [next-intl 文档](https://github.com/amannn/next-intl/blob/main/docs/zh/introduction.md)。

2. **工具**: 用于构建和解释应用程序中的内容声明的工具，例如 Intlayer 的 `useIntlayer()` 或 `useLocale()`，以及 next-intl 的 `useTranslations()`。

3. **插件和中间件**: 用于管理 URL 重定向、打包优化等功能, , 例如，Intlayer 的 `intlayerMiddleware` 或 next-intl 的 [`createMiddleware`](https://github.com/amannn/next-intl/blob/main/docs/zh/api/middleware.md)。

## Intlayer 与 next-intl: 关键区别

要深入分析 Intlayer 如何与其他 i18n 库（如 next-intl）进行比较，请查看 [next-i18next vs. next-intl vs. Intlayer 博客文章](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18next_vs_next-intl_vs_intlayer.md)。

## 如何生成 next-intl 消息与 Intlayer

### 为什么使用 Intlayer 与 next-intl？

Intlayer 内容声明文件通常提供更好的开发者体验。由于两个主要优点，它们更加灵活和易于维护：

1. **灵活的位置**: 你可以将 Intlayer 内容声明文件放置在应用程序文件树的任何位置。这使得重命名或删除组件变得简单，而不会留下未使用或悬挂的消息文件。

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

2. **集中翻译**: Intlayer 将所有翻译存储在一个内容声明中，确保没有翻译被遗漏。在 TypeScript 项目中，缺失翻译会自动被标记为类型错误，为开发者提供即时反馈。

### 安装

要一起使用 Intlayer 和 next-intl，请安装这两个库：

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### 配置 Intlayer 导出 next-intl 消息

> **注意:** 从 Intlayer 导出消息到 next-intl 可能会引入结构上的细微差异。如果可能，保持 Intlayer 或 next-intl 单独的流程以简化集成。如果确实需要从 Intlayer 生成 next-intl 消息，请遵循以下步骤。

在项目根目录中创建或更新一个 `intlayer.config.ts` 文件（或 `.mjs` / `.cjs`）：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // 使用 next-intl 输出
    nextIntlMessagesDir: "./intl/messages", // 保存 next-intl 消息的位置
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
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
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
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### 内容声明

以下是多个格式的内容声明文件示例。Intlayer 将把这些编译成 next-intl 可以使用的消息文件。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
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
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
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
  "key": "my-component",
  "content": {
    "helloWorld": {
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

### 构建 next-intl 消息

要构建 next-intl 的消息文件，请运行：

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

这将在 `./intl/messages` 目录中生成资源（如 `intlayer.config.*` 中配置的）。预期输出：

```bash
.
└── intl
    └── messages
       └── zh
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

每个文件包含来自所有 Intlayer 内容声明的编译消息。顶级键通常与 `content.key` 字段匹配。

### 在你的 Next.js 应用中使用 next-intl

> 欲了解更多详细信息，请参阅官方 [next-intl 使用文档](https://github.com/amannn/next-intl/blob/main/docs/zh/getting-started.md)。

1. **创建中间件 (可选):**  
   如果你想管理自动语言检测或重定向，请使用 next-intl 的 [createMiddleware](https://github.com/amannn/next-intl/blob/main/docs/zh/api/middleware.md)。

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **创建一个 `layout.tsx` 或 `_app.tsx` 来加载消息:**  
   如果你正在使用 App Router（Next.js 13+），请创建一个布局：

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';


   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   如果你正在使用 Pages Router（Next.js 12 或更早），请在 `_app.tsx` 中加载消息：

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **在服务器端获取消息 (Pages Router 示例):**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### 在 Next.js 组件中使用内容

一旦消息被加载到 next-intl 中，你可以通过 `useTranslations()` 钩子在组件中使用它们：

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component' 对应于 Intlayer 中的内容键

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**就这些！** 每当你更新或添加新的 Intlayer 内容声明文件时，重新运行 `intlayer build` 命令以重新生成你的 next-intl JSON 消息。next-intl 将自动获取更新的内容。
