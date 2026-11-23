---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Prettier x Oxfmt 插件 | 排序 Intlayer 翻译并补充 .value
description: "对内容声明中 t()、plural()、enu() 和 select() 的语言环境进行排序，并在内容被当作字符串使用的地方补充 .value，使类型在可视化编辑器下保持有效。支持 Prettier 和 oxfmt。"
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
  - 可视化编辑器
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "新增为作为字符串使用的内容补充 .value"
  - version: 9.7.1
    date: 2026-11-03
    changes: "初始历史"
  - version: 9.7.1
    date: 2026-11-03
    changes: "新增 oxfmt 用法"
author: aymericzip
---

# Prettier x Oxfmt 插件

`prettier-plugin-intlayer` 在 Prettier 每次格式化文件时做两件事：

1. **按固定顺序排序翻译。** diff 保持精简，合并冲突更少，缺失的语言环境一目了然。
2. **在内容被当作字符串使用的地方补充 `.value`**，启用可视化编辑器后类型依然有效。

```ts
// 之前
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// 之后
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## 安装

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

需要 Prettier 3 或更高版本。

如果你的项目已在使用 Prettier，运行 `intlayer init prettier` 将自动安装该插件并将其添加到你的配置中。

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt 无法加载第三方插件，因此排序通过 Prettier 完成。请在 oxfmt 旁边安装 Prettier。它只用于对内容声明进行排序，项目的格式化仍由 oxfmt 负责。

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

需要 Prettier 3 或更高版本。 `intlayer init` 只会在已使用 Prettier 的项目中配置该插件，因此请按下文所示手动配置。

  </Tab>
</Tabs>

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

如果只想排序内容声明，请使用 override。此时 `.value` 补充不会作用于你的组件：

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

format 脚本会运行两个工具，各司其职：

1. **Prettier** 运行插件。第一个 glob 排序内容声明，第二个 glob 在组件中补充 `.value`。如果只需要排序，请删除第二个 glob。
2. **oxfmt** 格式化整个项目，包括内容声明。

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" \"src/**/*.{ts,tsx,js,jsx}\" && oxfmt"
  }
}
```

请保持这个顺序。oxfmt 会用自己的布局替换 Prettier 写出的布局，但从不重新排列对象的键，因此排序结果会被保留。

这种配置有一些限制：

- **保存时格式化。** 使用 oxfmt 格式化的编辑器不会运行插件。请改为运行 `format` 脚本。
- **check 模式。** 不要对 oxfmt 格式化过的文件使用 `prettier --check`：两者布局不同，它会报告每个文件。要在 CI 中检查顺序，请运行 `format` 脚本，并在有改动时让 job 失败：

```bash
npm run format && git diff --exit-code
```

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### 相同的翻译

在 `*.content.*` 文件中，所有语言都为同一字符串的 `t()` 会被替换为该字符串。普通字符串会提供给每种语言，因此输出不会改变。

```ts
// 之前
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// 之后
nextjs: "Next.js",
```

只有一种语言、带类型参数（`t<string>()`）、带注释或包含非字符串值的 `t()` 会保持不变。设置 `intlayerCollapseIdenticalTranslations: false` 可关闭此功能。

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

## 作为字符串使用的内容

启用[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)（`editor.enabled: true`）后，`useIntlayer` 或 `getIntlayer` 返回的字段是可渲染的节点，而不是字符串。将其传给原生元素的属性或在其上调用字符串方法将无法通过类型检查。模板字符串、字符串拼接和 `String()` 接受任意类型，保持不变。插件会补充 `.value`，无论编辑器是否启用，它都保存着字符串。

```tsx
// 之前
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// 之后
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

会被改写的写法:

- 字符串方法: `content.name.toUpperCase()`
- 原生元素的属性: `<img alt={content.alt} />`

保持不变的写法（它们接收节点）:

- JSX 子元素: `<h1>{content.title}</h1>`
- 组件 props: `<Card title={content.title} />`
- 标签模板: `` html`<h1>${content.title}</h1>` `` (Lit)

这作用于组件而非内容声明，因此插件必须在组件文件上运行。若某个变量名在文件其他位置被重新声明，则会跳过该变量。Vue 和 Svelte 模板不会被改写：请为它们使用同样支持自动修复的 [ESLint 规则 `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)。

同时会移除 JSX 子元素中的 `.value`：`<h1>{content.title.value}</h1>` 会变为 `<h1>{content.title}</h1>`，以便可视化编辑器选中该文本。适用于 React、Next.js、Preact、Solid 和 React Native。

通过 `intlayerNodeValueAccess: false` 关闭。

## 配置选项

| 选项                                    | 默认值   | 描述                                                                                             |
| --------------------------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `intlayerPinnedLocales`                 | `["en"]` | 在 `t()` 中优先置顶的语言环境列表及其顺序。传入 `[]` 对所有语言环境进行排序。                    |
| `intlayerSortContentKeys`               | `false`  | 在 `*.content.*` 文件中，同时对字典内容键及嵌套对象进行排序。                                    |
| `intlayerCollapseIdenticalTranslations` | `true`   | 在 `*.content.*` 文件中，将所有语言都为同一字符串的 `t()` 替换为该字符串。                       |
| `intlayerNodeValueAccess`               | `true`   | 在内容被当作字符串使用的地方补充 `.value`（`alt={content.alt}`、`content.name.toUpperCase()`）。 |

## 保持原样的情形

- 包含解构扩展（`...base`）、计算属性键（`[key]`）、方法或重复键的对象。
- 包含非 CLDR 类别的 `plural()` 映射。
- 重新排序会改变解析内容的 `enu()` 映射。
- 调用名称与辅助函数相同但接收了非对象参数的函数。

注释会随其所属的键一同移动。

## 支持的解析器

`babel`、`babel-flow`、`babel-ts`、`typescript`、`flow`、`acorn`、`espree`、`meriyah`、`json`、`json5` 以及 `jsonc`。Vue、Svelte 和 Astro 文件的 `<script>` 块均使用这些解析器进行格式化。

> **已知限制。** Prettier 每个解析器仅运行一个插件。如果其他插件也替换了 JavaScript/TypeScript 解析器（例如 `prettier-plugin-tailwindcss`），则仅列表中最后一个插件生效。建议使用 override 将 `prettier-plugin-intlayer` 限制在 `*.content.*` 文件中以避免冲突。 使用 oxfmt 时，Tailwind 类名由其内置的 `sortTailwindcss` 选项排序，因此不存在这个冲突。 这种情况下，组件中的 `.value` 请交给 [ESLint 规则 `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md) 处理。
