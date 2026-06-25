---
createdAt: 2025-03-13
updatedAt: 2026-06-21
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
  - version: 9.0.0
    date: 2026-06-21
    changes: "添加 splitKeys 选项（每个顶级命名空间键一个字典），用于 next-intl / react-intl 单文件布局"
  - version: 7.5.0
    date: 2025-12-13
    changes: "添加 ICU 和 i18next 格式支持"
  - version: 6.1.6
    date: 2025-10-05
    changes: "初始同步 JSON 插件文档"
author: aymericzip
---

# 同步 JSON（i18n 桥接）- 支持 ICU / i18next 的同步 JSON

<iframe title="如何保持您的 JSON 翻译与 Intlayer 同步" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Plugins

This package provides two plugins:

- `loadJSON`: Load JSON files into Intlayer dictionaries.
  - This plugin is used to load JSON files from a source and will be loaded into Intlayer dictionaries. It can scan all the codebase and search for specific JSON files.
    This plugin can be used
    - if you use an i18n library that impose a specific location for your JSON to be loaded (ex: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, etc.), but you want to place your content declaration where you want in your code base.
    - It can also be used if you want to fetch your messages from a remote source (ex: a CMS, a API, etc.) and store your messages in JSON files.

  > Under the hood, this plugin will scan all the codebase and search for specific JSON files and load them into Intlayer dictionaries.
  > Note that this plugin will not write the output and translations back to the JSON files.

- `syncJSON`: Synchronize JSON files with Intlayer dictionaries.
  - This plugin is used to synchronize JSON files with Intlayer dictionaries. It can scan the given location and load the JSON that match the pattern for specific JSON files. This plugin is useful if you want to get the benefits of Intlayer while using another i18n library.

## Using both plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current JSON files in sync with Intlayer dictionaries
  plugins: [
    /**
     * Will load all the JSON files in the src that match the pattern {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Ensures these JSON files take precedence over files at `./locales/en/${key}.json`
      format: "intlayer", // Format of the JSON content
    }),
    /**
     * Will load, and write the output and translations back to the JSON files in the locales directory
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Quick start

将插件添加到您的 `intlayer.config.ts` 中，并指向您现有的 JSON 结构。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 保持您当前的 JSON 文件与 Intlayer 字典同步
  plugins: [
    syncJSON({
      // 每个语言环境，每个命名空间的布局（例如，next-intl，带命名空间的 i18next）
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

替代方案：每个语言环境一个文件（常见于 i18next/react-intl 设置）：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### 工作原理

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
  splitKeys?: boolean, // 可选，将单个文件拆分为每个顶级键一个字典（自动检测）
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

#### `splitKeys` (boolean)

控制单个 JSON 文件（其**第一级键是命名空间**）是否应拆分为每个顶级键一个字典，而不是将整个文件作为一个字典。

这与 `next-intl` 和 `react-intl` 等库的命名空间模型相匹配，其中一个 `messages/{locale}.json` 文件通过其第一级键将多个命名空间分组，每个命名空间独立寻址（例如 `useTranslations('Hero')` 解析为 `Hero` 字典）。

- `undefined` (默认)：**自动检测** — 当 `source` 模式没有 `{key}` 段时（一个文件包含所有命名空间），文件将被拆分；否则（每个键一个文件），文件将保持为单个字典。
- `true`：始终将每个顶级键拆分为其自己的字典。
- `false`：从不拆分；整个文件将成为一个字典。

给定一个 `messages/{locale}.json` 文件：

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // 隐含，因为模式没有 `{key}` 段
}),
```

这将生成三个字典 — `Hero`、`Nav` 和 `About` — 因此 `useTranslations('Hero')` (next-intl) 可以正确解析。在写回时，所有命名空间将重新组装到同一个按语言环境的文件中。

> 当您在 `source` 中保留显式的 `{key}` 段时（例如 `./locales/${locale}/${key}.json`），每个文件已经是一个命名空间，因此默认禁用拆分。

### 多个 JSON 源和优先级

你可以添加多个 `syncJSON` 插件来同步不同的 JSON 源。当你的项目中使用多个 i18n 库或有不同的 JSON 结构时，这非常有用。

#### 优先级系统

当多个插件针对同一个词典键时，`priority` 参数决定哪个插件优先：

- 数值越高的优先级胜出
- `.content` 文件的默认优先级是 `0`
- 插件内容文件的默认优先级是 `-1`
- 具有相同优先级的插件按它们在配置中出现的顺序处理

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
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
};

export default config;
```

## Load JSON plugin

### Quick start

将插件添加到您的 `intlayer.config.ts` 以将现有 JSON 文件作为 Intlayer 字典导入。此插件是只读的（不写入磁盘）：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingest JSON messages located anywhere in your source tree
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Load a single locale per plugin instance (defaults to the config defaultLocale)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

替代方案：按语言环境布局，仍然是只读的（只加载选定的语言环境）：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Only files for Locales.FRENCH will be loaded from this pattern
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- 发现：从您的 `source` 构建器构建一个 glob 并收集匹配的 JSON 文件。
- 导入：将每个 JSON 文件作为 Intlayer 字典加载，并使用提供的 `locale`。
- 只读：不写入或格式化输出文件；如果您需要往返同步，请使用 `syncJSON`。
- 自动填充就绪：定义一个 `fill` 模式，以便 `intlayer content fill` 可以在您选择时填充缺失的键。

### API

```ts
loadJSON({
  // Build paths to your JSON. `locale` is optional if your structure has no locale segment
  source: ({ key, locale }) => string,

  // Target locale for the dictionaries loaded by this plugin instance
  // Defaults to configuration.internationalization.defaultLocale
  locale?: Locale,

  // Optional label to identify the source
  location?: string, // default: "plugin"

  // Priority used for conflict resolution against other sources
  priority?: number, // default: 0

  // Optional formatter for the JSON content
  format?: 'intlayer' | 'icu' | 'i18next', // default: 'intlayer'

  // Split a single file into one dictionary per top-level key (auto-detected)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

指定在加载 JSON 文件时用于字典内容的格式化器。这允许使用与各种 i18n 库兼容的不同消息格式化语法。

- `'intlayer'`：默认的 Intlayer 格式化器（默认值）。
- `'icu'`：使用 ICU 消息格式化（与 react-intl、vue-i18n 等库兼容）。
- `'i18next'`：使用 i18next 消息格式化（与 i18next、next-i18next、Solid-i18next 兼容）。

**示例：**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // 使用 ICU 格式化以保持兼容性
}),
```

#### `splitKeys` (boolean)

与 [`syncJSON`](#splitkeys-boolean) 中的行为相同：当单个 JSON 文件通过其第一级键将多个命名空间分组时，每个顶级键都将成为其自己的字典。

- `undefined` (默认)：**自动检测** — 当 `source` 模式没有 `{key}` 段时拆分，否则为单个字典。
- `true` / `false`：强制或禁用拆分。

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys 自动启用：`Hero`、`Nav`、`About` 等每个都成为一个字典
}),
```

### Behavior and conventions

- 如果您的 `source` 掩码包含语言环境占位符，则只导入所选 `locale` 的文件。
- 如果您的掩码中没有 `{key}` 段，则文件的每个顶级键默认会成为其自己的字典（请参阅 [`splitKeys`](#splitkeys-boolean)）。将 `splitKeys: false` 设置为将整个文件加载为单个 `index` 字典。
- 键通过替换 `source` 构建器中的 `{key}` 占位符从文件路径派生。
- 插件只使用发现的文件，不制造缺失的语言环境或键。
- `fill` 路径从您的 `source` 推断，并用于在您选择时通过 CLI 更新缺失值。

## Conflict resolution

当相同的翻译键存在于多个 JSON 源中时：

1. 优先级最高的插件决定最终的值
2. 优先级较低的源作为缺失键的备用
3. 这允许您在逐步迁移到新结构的同时，保持旧版翻译

## CLI

同步的 JSON 文件将被视为其他 `.content` 文件。这意味着所有 intlayer 命令都可以用于同步的 JSON 文件，包括：

- `intlayer content test` 用于测试是否有缺失的翻译
- `intlayer content list` 用于列出同步的 JSON 文件
- `intlayer content fill` 用于填充缺失的翻译
- `intlayer content push` 用于推送同步的 JSON 文件
- `intlayer content pull` 用于拉取同步的 JSON 文件

请参阅[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)了解更多详情。

## Limitations (current)

- 针对第三方库时不支持插入或复数/ICU。
- 非 Intlayer 运行时尚不支持可视化编辑器。
- 仅支持 JSON 同步；不支持非 JSON 目录格式。

## Why this matters

- 我们可以推荐成熟的 i18n 解决方案，并将 Intlayer 定位为附加组件。
- 通过教程利用它们的 SEO/关键词，教程最后建议使用 Intlayer 来管理 JSON。
- 将可覆盖的用户群从“新项目”扩展到“任何已经使用 i18n 的团队”。
