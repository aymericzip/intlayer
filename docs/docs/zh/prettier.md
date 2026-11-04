---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier x Oxfmt 插件 | 排序 Intlayer 翻译
description: "使用 prettier-plugin-intlayer 排序 t() 的语言环境、plural() 的类别、enu() 的条件、select() 的分支以及内容声明中的键。支持 Prettier 和 oxfmt。"
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - 格式化
  - 排序翻译
  - 排序语言环境
  - i18n
  - 国际化
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "初始历史"
  - version: 9.7.1
    date: 2026-11-03
    changes: "新增 oxfmt 用法"
author: aymericzip
---

# Prettier x Oxfmt 插件

每次 Prettier 格式化文件时，`prettier-plugin-intlayer` 都会将翻译键按固定顺序排列。代码变更（diff）保持精简，合并冲突显著减少，缺失的语言环境也一目了然。

```ts
// 之前
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// 之后
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## 安装

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

需要 Prettier 3 或更高版本。

如果你的项目已在使用 Prettier，运行 `intlayer init prettier` 将自动安装该插件并将其添加到你的配置中。

## 用法

该插件同时适用于 Prettier 和 [oxfmt](https://oxc.rs/docs/guide/usage/formatter)。

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

将插件添加到你的 Prettier 配置中：

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

如果只想应用于内容声明文件，可以使用覆盖配置（override）：

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt 不会加载 Prettier 插件。让 Prettier 仅在内容声明文件上运行该插件，然后让 oxfmt 格式化整个项目：

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"]
      }
    }
  ]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

请保持这个顺序。oxfmt 会按自己的风格重写排版，但从不调整对象键的顺序，因此排序结果会被保留。

  </Tab>
</Tabs>

## 排序规则

### `t()`: 语言环境

固定（pinned）的语言环境排在最前（默认为 `en`）。其他语言环境按字母顺序排列。

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: CLDR 顺序

类别从小数量到回退（fallback）排列：`zero`、`one`、`two`、`few`、`many`、`other`。

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: 升序阈值

条件首先按数字大小排序，然后按操作符排序（`<1`、`<=1`、`1`、`>=1`、`>1`）。`fallback` 排在最后。

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

在运行时，首个匹配的条件生效。仅当每个数量仍能解析为相同的内容时，插件才会应用新顺序。如果排序会改变匹配结果，则对象保持原样。例如在 `{ '<1': …, '<=-2.3': … }` 中，`'<1'` 键会捕获所有负数。

### `select()`: 字母顺序

分支按字母顺序排序，`fallback` 放在最后。

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

如果没有 `fallback` 或 `other` 键，最后一个分支将作为回退项。该分支保留在末尾，仅对其前面的分支进行排序。

### `.content.json` 文件

序列化后的形式以相同方式排序：`{ "nodeType": "translation", "translation": { … } }`，以及 `plural`、`enumeration` 和 `select` 节点。

### 内容键排序（可选）

开启 `intlayerSortContentKeys: true` 后，插件还会对字典 `content` 中的键在所有嵌套层级上按字母顺序排序。此项仅适用于 `*.content.*` 文件。

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

排序会深入遍历每个辅助函数（`t`、`plural`、`enu`、`select`、`cond`、`gender`、`md`、`insert`、`nest`、`file`…）以处理其内部对象。每个辅助函数本身的键映射保留其内部顺序。传递给 `cond()` 和 `gender()` 的键永远不会被重新排序，因为它们的最后一个键是回退项。与 `content` 平级的字段（`key`、`title`、`locale`…）保持不变。

## 配置选项

| 选项                      | 默认值   | 描述                                                                          |
| ------------------------- | -------- | ----------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]` | 在 `t()` 中优先置顶的语言环境列表及其顺序。传入 `[]` 对所有语言环境进行排序。 |
| `intlayerSortContentKeys` | `false`  | 在 `*.content.*` 文件中，同时对字典内容键及嵌套对象进行排序。                 |

## 保持原样的情形

- 包含解构扩展（`...base`）、计算属性键（`[key]`）、方法或重复键的对象。
- 包含非 CLDR 类别的 `plural()` 映射。
- 重新排序会改变解析内容的 `enu()` 映射。
- 调用名称与辅助函数相同但接收了非对象参数的函数。

注释会随其所属的键一同移动。

## 支持的解析器

`babel`、`babel-flow`、`babel-ts`、`typescript`、`flow`、`acorn`、`espree`、`meriyah`、`json`、`json5` 以及 `jsonc`。Vue、Svelte 和 Astro 文件的 `<script>` 块均使用这些解析器进行格式化。

> **已知限制。** Prettier 每个解析器仅运行一个插件。如果其他插件也替换了 JavaScript/TypeScript 解析器（例如 `prettier-plugin-tailwindcss`），则仅列表中最后一个插件生效。建议使用 override 将 `prettier-plugin-intlayer` 限制在 `*.content.*` 文件中以避免冲突。 使用 oxfmt 时，Tailwind 类名由其内置的 `sortTailwindcss` 选项排序，因此不存在这个冲突。
