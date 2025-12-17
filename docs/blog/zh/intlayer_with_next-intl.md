---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: 如何使用 Intlayer 自动化您的 next-intl JSON 翻译
description: 使用 Intlayer 和 next-intl 自动化您的 JSON 翻译，提升 Next.js 应用的国际化体验。
keywords:
  - Intlayer
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: 添加 loadJSON 插件
  - version: 7.0.0
    date: 2025-10-29
    changes: 更改为 syncJSON 插件
---

# 如何使用 Intlayer 自动化您的 next-intl JSON 翻译

<iframe title="如何使用 Intlayer 自动化您的 next-intl JSON 翻译" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化库，旨在解决传统 i18n 解决方案的不足。它为 Next.js 应用提供了一种现代化的内容管理方法。

请参阅我们博客文章中的具体比较：[next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/next-i18next_vs_next-intl_vs_intlayer.md)。

## 为什么要将 Intlayer 与 next-intl 结合使用？

虽然 Intlayer 提供了一个出色的独立 i18n 解决方案（请参阅我们的[Next.js 集成指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)），但您可能出于以下几个原因想将其与 next-intl 结合使用：

1. **现有代码库**：您已经有一个成熟的 next-intl 实现，并希望逐步迁移到 Intlayer 以获得更好的开发者体验。
2. **遗留需求**：您的项目需要兼容现有的 next-intl 插件或工作流程。
3. **团队熟悉度**：您的团队对 next-intl 感到熟悉，但希望获得更好的内容管理。

**为此，Intlayer 可以作为 next-intl 的适配器来实现，帮助您在 CLI 或 CI/CD 流水线中自动化 JSON 翻译、测试翻译等功能。**

本指南将向您展示如何利用 Intlayer 优越的内容声明系统，同时保持与 next-intl 的兼容性。

## 目录

<TOC/>

## 使用 next-intl 设置 Intlayer 的分步指南

### 第一步：安装依赖

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

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**包描述：**

- **intlayer**：国际化管理、内容声明和构建的核心库
- **@intlayer/sync-json-plugin**：用于将 Intlayer 内容声明导出为 next-intl 兼容 JSON 格式的插件

### 第2步：实现 Intlayer 插件以封装 JSON

创建一个 Intlayer 配置文件以定义支持的语言环境：

**如果您还想为 next-intl 导出 JSON 字典**，请添加 `syncJSON` 插件：

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
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` 插件会自动封装 JSON。它会读取和写入 JSON 文件，而不会改变内容结构。

如果你想让 JSON 与 intlayer 内容声明文件（`.content` 文件）共存，Intlayer 会按以下方式处理：

    1. 加载 JSON 和内容声明文件，并将它们转换为 intlayer 字典。

2. 如果 JSON 文件和内容声明文件之间存在冲突，Intlayer 将合并所有字典。合并的优先级取决于插件的优先级以及内容声明文件的优先级（所有优先级均可配置）。

如果通过 CLI 翻译 JSON 或使用 CMS 进行更改，Intlayer 会使用新的翻译更新 JSON 文件。

有关 `syncJSON` 插件的更多详细信息，请参阅 [syncJSON 插件文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)。

### （可选）步骤 3：实现按组件的 JSON 翻译

默认情况下，Intlayer 会加载、合并并同步 JSON 文件和内容声明文件。更多详情请参见[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。但如果你愿意，也可以使用 Intlayer 插件，在代码库中的任意位置实现基于组件的 JSON 本地化管理。

为此，你可以使用 `loadJSON` 插件。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 保持您当前的 JSON 文件与 Intlayer 字典同步
  plugins: [
    /**
     * 将加载 src 目录中所有匹配模式 {key}.i18n.json 的 JSON 文件
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // 确保这些 JSON 文件优先于 `./locales/en/${key}.json` 中的文件
    }),
    /**
     * 将加载并将输出和翻译写回到 locales 目录中的 JSON 文件
     */
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

这将加载 `src` 目录中所有匹配 `{key}.i18n.json` 模式的 JSON 文件，并将它们作为 Intlayer 字典加载。

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
