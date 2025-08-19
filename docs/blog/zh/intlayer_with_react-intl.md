---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer和react-intl
description: 与React应用程序一起使用react-intl和Intlayer
keywords:
  - react-intl
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-react-intl
---

# React Internationalization (i18n) with **react-intl** and Intlayer

本指南展示了如何将 **Intlayer** 与 **react-intl** 集成，以管理 React 应用程序中的翻译。您将使用 Intlayer 声明可翻译的内容，然后使用 **react-intl** 这个来自 [FormatJS](https://formatjs.io/docs/react-intl) 生态系统的流行库来消费这些消息。

## 概述

- **Intlayer** 允许您在项目中存储翻译，位于 **组件级** 内容声明文件（如 JSON、JS、TS 等）中。
- **react-intl** 提供 React 组件和钩子（如 `<FormattedMessage>` 和 `useIntl()`）来显示本地化字符串。

通过配置 Intlayer 以 **导出** 以 **react-intl 兼容** 格式的翻译，您可以自动 **生成** 和 **更新** `<IntlProvider>`（来自 react-intl）所需的消息文件。

---

## 为什么使用 Intlayer 和 react-intl？

1. **按组件内容声明**  
   Intlayer 内容声明文件可以与您的 React 组件并存，如果组件被移动或删除，可以防止“孤立”翻译。例如：

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Intlayer 内容声明
               └── index.tsx          # React 组件
   ```

2. **集中翻译**  
   每个内容声明文件收集组件所需的所有翻译。这在 TypeScript 项目中特别有帮助：缺少翻译可以在 **编译时** 被捕获。

3. **自动构建和再生**  
   每当您添加或更新翻译时，Intlayer 会重新生成消息 JSON 文件。然后，您可以将这些文件传入 react-intl 的 `<IntlProvider>`。

---

## 安装

在典型的 React 项目中，安装以下内容：

```bash
# with npm
npm install intlayer react-intl

# with yarn
yarn add intlayer react-intl

# with pnpm
pnpm add intlayer react-intl
```

### 为什么选择这些包？

- **intlayer**：核心 CLI 和库，扫描内容声明，合并它们，并构建字典输出。
- **react-intl**：来自 FormatJS 的主要库，提供 `<IntlProvider>`、`<FormattedMessage>`、`useIntl()` 和其他国际化原语。

> 如果您还没有安装 React，您也需要安装它（`react` 和 `react-dom`）。

## 配置 Intlayer 以导出 react-intl 消息

在项目根目录下，创建 **`intlayer.config.ts`**（或 `.js`、`.mjs`、`.cjs`），如下所示：

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // 可以添加任意数量的语言环境
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // 告诉 Intlayer 为 react-intl 生成消息文件
    dictionaryOutput: ["react-intl"],

    // Intlayer 将在此目录中写入您的消息 JSON 文件
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **注意**：有关其他文件扩展名（`.mjs`、`.cjs`、`.js`），请参阅 [Intlayer 文档](https://intlayer.org/en/doc/concept/configuration) 以获取使用细节。

---

## 创建您的 Intlayer 内容声明

Intlayer 默认扫描您的代码库（在 `./src` 下），查找匹配 `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}` 的文件。  
这里是一个 **TypeScript** 示例：

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" 变成您的 react-intl JSON 文件中的顶级消息键
  key: "my-component",

  content: {
    // 每次调用 t() 声明一个可翻译的字段
    helloWorld: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

如果您更喜欢 JSON 或不同的 JS 语法（`.cjs`、`.mjs`），结构大致相同, 请参阅 [Intlayer 文档关于内容声明](https://intlayer.org/en/doc/concept/content)。

---

## 构建 react-intl 消息

要生成 **react-intl** 的实际消息 JSON 文件，请运行：

```bash
# with npm
npx intlayer dictionaries build

# with yarn
yarn intlayer build

# with pnpm
pnpm intlayer build
```

这会扫描所有 `*.content.*` 文件，编译它们，并将结果写入您在 **`intlayer.config.ts`** 中指定的目录, 在这个例子中是 `./react-intl/messages`。  
典型输出可能如下所示：

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

每个文件都是一个 JSON 对象，其 **顶级键** 对应于每个
