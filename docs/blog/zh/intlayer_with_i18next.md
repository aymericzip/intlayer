---
createdAt: 2024-12-24
updatedAt: 2025-10-29
title: 如何使用 Intlayer 自动化您的 i18next JSON 翻译
description: 使用 Intlayer 和 i18next 自动化您的 JSON 翻译，提升 JavaScript 应用程序的国际化水平。
keywords:
  - Intlayer
  - i18next
  - 国际化
  - i18n
  - 本地化
  - 翻译
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - 迁移
  - 集成
slugs:
  - blog
  - intlayer-with-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: 更改为 syncJSON 插件
---

# 如何使用 Intlayer 自动化您的 i18next JSON 翻译

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化库，旨在解决传统 i18n 解决方案的不足。它为 JavaScript 应用程序中的内容管理提供了一种现代化的方法。

请参阅我们博客文章中的具体比较：[next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/next-i18next_vs_next-intl_vs_intlayer.md)。

## 为什么要将 Intlayer 与 i18next 结合使用？

虽然 Intlayer 提供了一个出色的独立 i18n 解决方案（请参阅我们的[Next.js 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)），但您可能出于以下几个原因想将其与 i18next 结合使用：

1. **现有代码库**：您已经有一个成熟的 i18next 实现，并希望逐步迁移到 Intlayer 以获得更好的开发者体验。
2. **遗留需求**：您的项目需要兼容现有的 i18next 插件或工作流程。
3. **团队熟悉度**：您的团队熟悉 i18next，但希望获得更好的内容管理。

**为此，Intlayer 可以作为 i18next 的适配器来实现，帮助您在 CLI 或 CI/CD 流水线中自动化 JSON 翻译，测试翻译内容等。**

本指南将向您展示如何利用 Intlayer 优越的内容声明系统，同时保持与 i18next 的兼容性。

## 目录

<TOC/>

## 使用 i18next 设置 Intlayer 的分步指南

### 第一步：安装依赖项

安装必要的包：

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**包描述：**

- **intlayer**：用于国际化管理、内容声明和构建的核心库
- **@intlayer/sync-json-plugin**：用于将 Intlayer 内容声明导出为兼容 i18next 的 JSON 格式的插件

### 步骤 2：实现 Intlayer 插件以包装 JSON

创建一个 Intlayer 配置文件以定义支持的语言环境：

**如果你还想导出 i18next 的 JSON 词典**，请添加 `syncJSON` 插件：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` 插件会自动包装 JSON。它会读取和写入 JSON 文件，而不会改变内容结构。

如果你想让 JSON 与 intlayer 内容声明文件（`.content` 文件）共存，Intlayer 会按以下方式处理：

    1. 加载 JSON 和内容声明文件，并将它们转换为 intlayer 字典。

2. 如果 JSON 文件和内容声明文件之间存在冲突，Intlayer 将合并所有字典。合并的优先级取决于插件的优先级以及内容声明文件的优先级（所有这些都是可配置的）。

如果使用 CLI 翻译 JSON，或使用 CMS 进行更改，Intlayer 会使用新的翻译更新 JSON 文件。

## Git 配置

建议忽略自动生成的 Intlayer 文件：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

这些文件可以在构建过程中重新生成，无需提交到版本控制。

### VS Code 扩展

为了提升开发者体验，请安装官方的 **Intlayer VS Code 扩展**：

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
