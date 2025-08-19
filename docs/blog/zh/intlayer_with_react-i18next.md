---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer和react-i18next
description: 比较React应用程序的react-i18next与Intlayer
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-react-i18next
---

# React 国际化 (i18n) 与 react-i18next 和 Intlayer

## 概述

- **Intlayer** 帮助您通过 **组件级别** 内容声明文件管理翻译。
- **react-i18next** 是一个流行的 React 集成 **i18next** 的库，提供 `useTranslation` 等钩子以在组件中获取本地化字符串。

结合使用时，Intlayer 可以 **导出** 与 **i18next 兼容的 JSON**，以便 react-i18next 可以在运行时 **使用** 它们。

## 为什么将 Intlayer 与 react-i18next 结合使用？

**Intlayer** 内容声明文件提供了更好的开发者体验，因为它们是：

1. **灵活的文件位置**  
   将每个内容声明文件放在需要它的组件旁边。这种结构允许您保持翻译的共存，防止组件移动或删除时出现孤立翻译。

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

2. **集中翻译**  
   单个内容声明文件收集一个组件所需的所有翻译，使缺失翻译更易于捕捉。  
   使用 TypeScript 时，如果缺少翻译，您甚至会在编译时收到错误。

## 安装

在 Create React App 项目中，安装这些依赖：

```bash
# 使用 npm
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# 使用 yarn
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# 使用 pnpm
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### 这些包是做什么的？

- **intlayer** – 用于管理 i18n 配置、内容声明和构建字典输出的 CLI 和核心库。
- **react-intlayer** – 针对 Intlayer 的 React 特定集成，提供自动化构建字典的一些脚本。
- **react-i18next** – i18next 的 React 特定集成库，包括 `useTranslation` 钩子。
- **i18next** – 用于处理翻译的底层框架。
- **i18next-resources-to-backend** – 一个动态导入 JSON 资源的 i18next 后端。

## 配置 Intlayer 以导出 i18next 字典

在项目根目录中创建（或更新）`intlayer.config.ts`：

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // 添加您想要的任意多的语言环境
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // 告诉 Intlayer 创建与 i18next 兼容的 JSON
    dictionaryOutput: ["i18next"],

    // 为生成的资源选择一个输出目录
    // 如果该文件夹尚不存在，将自动创建。
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **注意**：如果您不使用 TypeScript，可以将此配置文件创建为 `.cjs`、`.mjs` 或 `.js`（请参阅 [Intlayer 文档](https://intlayer.org/zh/doc/concept/configuration) 以获取详细信息）。

## 构建 i18next 资源

一旦您的内容声明到位（下一部分），运行 **Intlayer 构建命令**：

```bash
# 使用 npm
npx run intlayer build
```

```bash
# 使用 yarn
yarn intlayer build
```

```bash
# 使用 pnpm
pnpm intlayer build
```

> 这将在默认情况下在 `./i18next/resources` 目录中生成您的 i18next 资源。

一个典型的输出可能如下所示：

```bash
.
└── i18next
    └── resources
       ├── zh
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

其中每个 **Intlayer** 声明键用作 **i18next 命名空间**（例如，`my-content.json`）。

## 将字典导入到您的 react-i18next 配置中

要在运行时动态加载这些资源，请使用 [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend)。例如，在您的项目中创建一个 `i18n.ts`（或 `.js`）文件：

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // react-i18next 插件
  .use(initReactI18next)
  // 动态加载资源
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // 调整您资源目录的导入路径
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // 初始化 i18next
  .init({
    // 回退语言
    fallbackLng: "zh",

    // 您可以在此处添加其他 i18next 配置选项，见：
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "zh",
  });

export default i18next;
```

然后，在您的 **根** 或 **索引** 文件（例如，`src/index.tsx`）中，导入此 `i18n` 设置 **在** 渲染 `App` 之前：

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// 在任何其他事情之前初始化 i18n
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 创建和管理您的内容声明

Intlayer 从位于 `./src` 下的“内容声明文件”中提取翻译（默认为此）。  
以下是 TypeScript 中的一个最小示例：

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // “key” 将是您的 i18next 命名空间（例如，“my-component”）
  key: "my-component",
  content: {
    // 每个“t”调用是一个单独的翻译节点
    heading: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    description: t({
      en: "My i18n description text...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

如果您更喜欢 JSON、`.cjs` 或 `.mjs`，请参考 [Intlayer 文档](https://intlayer.org/zh/doc/concept/content)。

> 默认情况下，有效的内容声明匹配文件扩展名模式：

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## 在 React 组件中使用翻译

在您 **构建** 了 Intlayer 资源并配置了 react-i18next 后，您可以直接使用 **react-i18next** 的 `useTranslation` 钩子。  
例如：

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * i18next 的“命名空间”是来自“MyComponent.content.ts”的 Intlayer `key`
 * 因此我们将“my-component”传递给 useTranslation()。
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> 请注意，`t` 函数引用您生成的 JSON 中的 **键**。对于名为 `heading` 的 Intlayer 内容条目，您将使用 `t("heading")`。

## 可选：与 Create React App 脚本集成 (CRACO)

**react-intlayer** 提供了一种基于 CRACO 的自定义构建和开发服务器配置方法。如果您希望 Intlayer 的构建步骤无缝集成，可以：

1. **安装 react-intlayer**（如果您还没有）：
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **调整您的 `package.json` 脚本**以使用 `react-intlayer` 脚本：

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > `react-intlayer` 脚本基于 [CRACO](https://craco.js.org/)。您还可以根据 intlayer craco 插件实现自己的设置。[在此处查看示例](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

现在，运行 `npm run build`、`yarn build` 或 `pnpm build` 将同时触发 Intlayer 和 CRA 的构建。

## TypeScript 配置

**Intlayer** 提供了 **自动生成的类型定义** 来支持您的内容。为确保 TypeScript 能够捕获这些类型，请在 `tsconfig.json` 的 **include** 数组中添加 **`types`**（如果您另有配置则为 `types`）：

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> 这将使 TypeScript 推断您的翻译的形状，以获得更好的自动补全和错误检测。

## Git 配置

建议 **忽略** Intlayer 生成的自动生成文件和文件夹。将以下行添加到您的 `.gitignore`：

```plaintext
# 忽略 Intlayer 生成的文件
.intlayer
i18next
```

您通常不应提交这些资源或 `.intlayer` 内部构建工件，因为它们可以在每次构建时重新生成。
