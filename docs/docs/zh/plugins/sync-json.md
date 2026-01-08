---
createdAt: 2025-03-13
updatedAt: 2025-12-13
title: 同步 JSON 插件
description: 将 Intlayer 字典与第三方 i18n JSON 文件（如 i18next、next-intl、react-intl、vue-i18n 等）同步。保持您现有的 i18n，同时使用 Intlayer 管理、翻译和测试您的消息。
keywords:
  - Intlayer
  - 同步 JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - 翻译
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: 添加 ICU 和 i18next 格式支持
  - version: 6.1.6
    date: 2025-10-05
    changes: 初始同步 JSON 插件文档
---

# 同步 JSON（i18n 桥接）- 支持 ICU / i18next 的同步 JSON

<iframe title="如何保持您的 JSON 翻译与 Intlayer 同步" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

将 Intlayer 作为您现有 i18n 体系的附加组件使用。此插件可使您的 JSON 消息与 Intlayer 字典保持同步，从而您可以：

- 继续使用 i18next、next-intl、react-intl、vue-i18n、next-translate、nuxt-i18n、Solid-i18next、svelte-i18n 等。
- 使用 Intlayer（CLI、CI、提供者、CMS）管理和翻译您的消息，而无需重构您的应用程序。
- 发布针对各生态系统的教程和 SEO 内容，同时推荐 Intlayer 作为 JSON 管理层。

注意事项及当前范围：

- 外部化到 CMS 适用于翻译和经典文本。
- 目前尚不支持插入、复数/ICU 或其他库的高级运行时功能。
- 视觉编辑器尚不支持第三方 i18n 输出。

### 何时使用此插件

- 您已经使用了一个 i18n 库并将消息存储在 JSON 文件中。
- 您希望在不更改渲染运行时的情况下，实现 AI 辅助填充、CI 测试和内容运营。

## 安装

```bash
pnpm add -D @intlayer/sync-json-plugin
# 或者
npm i -D @intlayer/sync-json-plugin
```

## 快速开始

将插件添加到您的 `intlayer.config.ts` 中，并指向您现有的 JSON 结构。

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 保持您当前的 JSON 文件与 Intlayer 字典同步
  plugins: [
    syncJSON({
      // 每个语言环境，每个命名空间的布局（例如，next-intl，带命名空间的 i18next）
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

替代方案：每个语言环境一个文件（常见于 i18next/react-intl 设置）：

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### 工作原理

- 读取：插件从您的 `source` 构建器发现 JSON 文件，并将其加载为 Intlayer 字典。
- 写入：在构建和填充之后，它将本地化的 JSON 写回相同路径（末尾带有换行符以避免格式问题）。
- 自动填充：该插件为每个词典声明一个 `autoFill` 路径。运行 `intlayer fill` 默认只会更新 JSON 文件中缺失的翻译。

API：

```ts
syncJSON({
  source: ({ key, locale }) => string, // 必填
  location?: string, // 可选标签，默认值："plugin"
  priority?: number, // 可选优先级，用于冲突解决，默认值：0
  format?: 'intlayer' | 'icu' | 'i18next', // 可选格式化器，用于 Intlayer 运行时兼容性
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

指定在同步 JSON 文件时用于字典内容的格式化器。这允许使用与 Intlayer 运行时兼容的不同消息格式化语法。

- `undefined`：不使用格式化器，JSON 内容将按原样使用。
- `'intlayer'`：默认的 Intlayer 格式化器（默认值）。
- `'icu'`：使用 ICU 消息格式化（与 react-intl、vue-i18n 等库兼容）。
- `'i18next'`：使用 i18next 消息格式化（与 i18next、next-i18next、Solid-i18next 兼容）。

> 请注意，使用格式化器会转换您的 JSON 内容的输入和输出。对于复杂的 JSON 规则（如 ICU 复数），解析可能无法确保输入和输出之间的 1 对 1 映射。
> 如果您不使用 Intlayer 运行时，您可能更倾向于不设置格式化器。

**示例：**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // 使用 i18next 格式化以保持兼容性
}),
```

## 多个 JSON 源和优先级

你可以添加多个 `syncJSON` 插件来同步不同的 JSON 源。当你的项目中使用多个 i18n 库或有不同的 JSON 结构时，这非常有用。

### 优先级系统

当多个插件针对同一个词典键时，`priority` 参数决定哪个插件优先：

- 数值越高的优先级胜出
- `.content` 文件的默认优先级是 `0`
- 插件内容文件的默认优先级是 `-1`
- 具有相同优先级的插件按它们在配置中出现的顺序处理

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // 主要 JSON 源（最高优先级）
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // 备用 JSON 源（较低优先级）
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // 旧版 JSON 源（最低优先级）
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### 冲突解决

当相同的翻译键存在于多个 JSON 源中时：

1. 优先级最高的插件决定最终的值
2. 优先级较低的源作为缺失键的备用
3. 这允许您在逐步迁移到新结构的同时，保持旧版翻译

## 集成

以下是常见的映射。保持您的运行时不变；只需添加插件。

### i18next

典型的文件布局：`./public/locales/{locale}/{namespace}.json` 或 `./locales/{locale}/{namespace}.json`。

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

每个语言环境的 JSON 消息（通常是 `./messages/{locale}.json`）或按命名空间划分。

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

另见：`docs/zh/intlayer_with_next-intl.md`。

### react-intl

每个语言环境单个 JSON 文件较为常见：

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

每个语言环境使用单个文件或每个命名空间使用单个文件：

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

同步的 JSON 文件将被视为其他 `.content` 文件。这意味着所有 intlayer 命令都可以用于同步的 JSON 文件，包括：

- `intlayer content test` 用于测试是否有缺失的翻译
- `intlayer content list` 用于列出同步的 JSON 文件
- `intlayer content fill` 用于填充缺失的翻译
- `intlayer content push` 用于推送同步的 JSON 文件
- `intlayer content pull` 用于拉取同步的 JSON 文件

请参阅[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)了解更多详情。

## 限制（当前）

- 针对第三方库时不支持插入或复数/ICU。
- 非 Intlayer 运行时尚不支持可视化编辑器。
- 仅支持 JSON 同步；不支持非 JSON 目录格式。

## 重要性

- 我们可以推荐成熟的 i18n 解决方案，并将 Intlayer 定位为附加组件。
- 通过教程利用它们的 SEO/关键词，教程最后建议使用 Intlayer 来管理 JSON。
- 将可覆盖的用户群从“新项目”扩展到“任何已经使用 i18n 的团队”。
