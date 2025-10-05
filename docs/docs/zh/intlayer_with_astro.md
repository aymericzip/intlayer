---
createdAt: 2024-03-07
updatedAt: 2025-10-03
title: 在 Astro 中使用 Intlayer 入门
description: 学习如何使用 Intlayer 为您的 Vite 和 React 应用添加国际化（i18n）。按照本指南使您的应用支持多语言。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
---

# 使用 Intlayer 和 Astro 开始国际化（i18n）

请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-astro-template)。

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化（i18n）库，旨在简化现代 Web 应用中的多语言支持。

使用 Intlayer，您可以：

- **通过组件级声明式字典轻松管理翻译**。
- **动态本地化元数据、路由和内容**。
- **确保 TypeScript 支持**，通过自动生成类型，提升自动补全和错误检测能力。
- **享受高级功能**，如动态语言环境检测和切换。

---

## 在 Astro 中设置 Intlayer 的分步指南

### 第一步：安装依赖

使用您的包管理器安装必要的包：

```bash packageManager="npm"
npm install intlayer astro-intlayer
# 可选：添加 React 岛屿支持
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# 可选：添加 React 岛屿支持
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# 可选：添加 React 岛屿支持
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**  
  核心包，提供国际化工具，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)、转译以及[命令行工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

- **astro-intlayer**  
  包括用于将 Intlayer 与 [Vite 打包工具](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Astro 集成插件，以及用于检测用户首选语言环境、管理 Cookie 和处理 URL 重定向的中间件。

### 第 2 步：配置您的项目

创建一个配置文件来配置您的应用程序语言：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第三步：在您的 Astro 配置中集成 Intlayer

将 intlayer 插件添加到您的配置中。

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> `intlayer()` Astro 集成插件用于将 Intlayer 与 Astro 集成。它确保内容声明文件的构建，并在开发模式下监控这些文件。在 Astro 应用中定义了 Intlayer 环境变量。此外，它还提供别名以优化性能。

### 第4步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> 您的内容声明可以定义在应用程序中的任何位置，只要它们被包含在 `contentDir` 目录中（默认是 `./src`）。并且文件扩展名需匹配内容声明文件扩展名（默认是 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

### 第5步：在 Astro 中使用您的内容

您可以直接在 `.astro` 文件中使用 `intlayer` 导出的核心辅助函数来消费字典。

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### 第6步：本地化路由

创建一个动态路由段来服务本地化页面，例如 `src/pages/[locale]/index.astro`：

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Astro 集成在开发期间添加了一个 Vite 中间件，帮助处理基于语言环境的路由和环境定义。你仍然可以使用自己的逻辑或 `intlayer` 提供的工具函数如 `getLocalizedUrl` 来实现语言环境间的链接。

### 第7步：继续使用你喜欢的框架

继续使用您喜欢的框架来构建您的应用程序。

- Intlayer + React: [Intlayer 与 React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer 与 Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer 与 Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer 与 Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer 与 Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+preact.md)

### 配置 TypeScript

Intlayer 使用模块增强来利用 TypeScript 的优势，使您的代码库更强大。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 您现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到您的 Git 仓库中。

要做到这一点，您可以将以下指令添加到您的 `.gitignore` 文件中：

```plaintext
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的 **自动补全**。
- 缺失翻译的 **实时错误检测**。
- 翻译内容的 **内联预览**。
- 轻松创建和更新翻译的 **快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入探索

要进一步使用，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[内容管理系统（CMS）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。

---

## 文档历史

| 版本  | 日期       | 变更内容                              |
| ----- | ---------- | ------------------------------------- |
| 6.2.0 | 2025-10-03 | 针对 Astro 集成、配置和使用进行了更新 |
