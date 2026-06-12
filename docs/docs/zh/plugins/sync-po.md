---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Sync PO 插件
description: 将 Intlayer 字典与 Gettext PO 文件同步。在使用 Intlayer 管理、翻译和测试消息的同时，保留现有的 i18n。
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - 翻译
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "初始 Sync PO 插件文档"
author: aymericzip
---

# Sync PO (i18n 桥接) - 支持 ICU / i18next 的 Sync PO

将 Intlayer 作为现有 i18n 栈的补充。此插件使您的 Gettext PO 消息与 Intlayer 字典保持同步，以便您可以：

- 保留现有的基于 PO 的翻译工作流。
- 使用 Intlayer (CLI、CI、供应商、CMS) 管理和翻译您的消息，无需重构您的应用。
- 发布针对各生态系统的教程和 SEO 内容，同时建议将 Intlayer 作为 PO 管理层。

注意事项和当前范围：

- 外部化到 CMS 适用于翻译和经典文本。
- 尚不支持 PO 条目内部的插值、复数/ICU 或其他库的高级运行时功能。
- 可视化编辑器尚不支持第三方 i18n 输出。

### 何时使用此插件

- 您已经在使用 Gettext PO 文件进行翻译。
- 您希望在不更改渲染运行时的情况下，获得 AI 辅助填充、CI 测试和内容运营。

## 安装

```bash
pnpm add -D @intlayer/sync-po-plugin
# 或
npm i -D @intlayer/sync-po-plugin
```

## 插件

此包提供两个插件：

- `loadPO`：将 PO 文件加载到 Intlayer 字典中。
  - 此插件用于从源加载 PO 文件并将其载入 Intlayer 字典。它可以扫描整个代码库并搜索特定的 PO 文件。
    此插件可用于：
    - 如果您使用的 i18n 库强制要求 PO 文件的加载位置，但您希望将内容声明放在代码库中您喜欢的位置。
    - 它也可以用于从远程源（如 CMS、API 等）获取消息并将消息存储在 PO 文件中。

  > 在底层，此插件将扫描整个代码库并搜索特定的 PO 文件，并将其加载到 Intlayer 字典中。
  > 请注意，此插件不会将输出和翻译写回 PO 文件。

- `syncPO`：将 PO 文件与 Intlayer 字典同步。
  - 此插件用于将 PO 文件与 Intlayer 字典同步。它可以扫描给定位置并加载与特定 PO 文件模式匹配的 PO。如果您想在使用另一个 i18n 库的同时获得 Intlayer 的优势，此插件非常有用。

## 同时使用两个插件

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 使当前的 PO 文件与 Intlayer 字典保持同步
  plugins: [
    /**
     * 将加载 src 中匹配 {key}.i18n.po 模式的所有 PO 文件
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // 确保这些 PO 文件优先于 `./locales/en/${key}.po` 处的文件
    }),
    /**
     * 将加载输出和翻译并将其写回 locales 目录中的 PO 文件
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## `syncPO` 插件

### 快速开始

将插件添加到您的 `intlayer.config.ts` 并指向您现有的 PO 结构。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 使当前的 PO 文件与 Intlayer 字典保持同步
  plugins: [
    syncPO({
      // 每个语言、每个命名空间的布局
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

备选方案：每个语言一个文件：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### 工作原理

- 读取：插件从您的 `source` 构建器发现 PO 文件并将其作为 Intlayer 字典加载。
- 写入：构建和填充后，它将本地化的 PO 写回相同的路径（带有正确的 Gettext 头）。
- 自动填充：插件为每个字典声明一个 `autoFill` 路径。默认情况下，运行 `intlayer fill` 仅更新 PO 文件中缺失的翻译。

API：

```ts
syncPO({
  source: ({ key, locale }) => string, // 必填
  location?: string, // 可选标签，默认："sync-po::path/to/source"
  priority?: number, // 用于冲突解决的可选优先级，默认：0
});
```

### 多个 PO 源和优先级

您可以添加多个 `syncPO` 插件来同步不同的 PO 源。当您的项目中有多个翻译源或不同的 PO 结构时，这很有用。

#### 优先级系统

当多个插件针对同一个字典键时，`priority` 参数决定哪个插件优先：

- 高优先级数字胜过低优先级数字
- `.content` 文件的默认优先级为 `0`
- 插件的默认优先级为 `0`
- 具有相同优先级的插件按照它们在配置中出现的顺序进行处理

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // 主要 PO 源（最高优先级）
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // 后备 PO 源（较低优先级）
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // 遗留 PO 源（最低优先级）
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load PO 插件

### 快速开始

将插件添加到您的 `intlayer.config.ts` 以将现有的 PO 文件作为 Intlayer 字典摄取。此插件是只读的（不会写入磁盘）：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // 摄取位于源树中任何位置的 PO 消息
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // 每个插件实例加载一个语言（默认为配置的 defaultLocale）
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

备选方案：按语言布局，仍然是只读的（仅加载选定的语言）：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // 只有 Locales.FRENCH 的文件将从此模式加载
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### 工作原理

- 发现：从您的 `source` 构建器构建一个 glob 并收集匹配的 PO 文件。
- 摄取：使用提供的 `locale` 将每个 PO 文件加载为 Intlayer 字典。
- 只读：不写入或格式化输出文件；如果您需要双向同步，请使用 `syncPO`。
- 自动填充准备：定义一个 `fill` 路径，以便 `intlayer content fill` 可以填充缺失的键。

### API

```ts
loadPO({
  // 构建指向您的 PO 的路径。如果您的结构没有语言段，则 `locale` 是可选的
  source: ({ key, locale }) => string,

  // 由此插件实例加载的字典的目标语言
  // 默认为 configuration.internationalization.defaultLocale
  locale?: Locale,

  // 用于识别源的可选标签
  location?: string, // 默认："plugin"

  // 用于与其他源进行冲突解决的优先级
  priority?: number, // 默认：0
});
```

### 行为和约定

- 如果您的 `source` 掩码包含语言占位符，则仅摄取所选 `locale` 的文件。
- 如果掩码中没有 `{key}` 段，则字典键为 "index"。
- 键通过替换 `source` 构建器中的 `{key}` 占位符从文件路径派生。
- 插件仅使用发现的文件，不会伪造缺失的语言或键。
- `fill` 路径从您的 `source` 推导出来，并在您选择启用时用于通过 CLI 更新缺失的值。

## 冲突解决

当多个 PO 源中存在相同的翻译键时：

1. 具有最高优先级的插件决定最终值
2. 较低优先级的源用作缺失键的后备
3. 这允许您保留遗留翻译，同时逐步迁移到新结构

## CLI

同步的 PO 文件将被视为与其他 `.content` 文件相同。这意味着，所有 intlayer 命令都将可用于同步的 PO 文件。包括：

- `intlayer content test` 测试是否有缺失的翻译
- `intlayer content list` 列出同步的 PO 文件
- `intlayer content fill` 填充缺失的翻译
- `intlayer content push` 推送同步的 PO 文件
- `intlayer content pull` 拉取同步的 PO 文件

有关更多详细信息，请参阅 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)。

## 局限性（当前）

- 针对第三方库时不支持插值或复数/ICU。
- 可视化编辑器尚不适用于非 Intlayer 运行时。
- 仅限 PO 同步；不支持非 PO 目录格式。

## 为什么这很重要

- 我们可以推荐成熟的 i18n 解决方案，并将 Intlayer 定位为补充。
- 我们通过教程利用他们的 SEO/关键词，教程最后建议使用 Intlayer 来管理 PO。
- 将目标受众从“新项目”扩展到“任何已经在使用 i18n 的团队”。
