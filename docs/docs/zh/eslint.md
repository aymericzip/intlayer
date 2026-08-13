---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint 插件 | Intlayer 的 lint 规则
description: 使用 eslint-plugin-intlayer 捕获硬编码字符串以及 Intlayer 编译器无法优化的动态调用。支持 ESLint 和 oxlint，适用于 React、Vue、Svelte、Angular 和 Astro。
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - 国际化
  - no-raw-text
  - 硬编码字符串
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "初始化历史"
author: aymericzip
---

# ESLint x OXLint 插件

`eslint-plugin-intlayer` 捕获 TypeScript 无法发现的两类 i18n 错误：

1. **硬编码文本** —— 从未进入字典的文本。
2. **动态调用** —— 能通过类型检查并正常运行，但 Intlayer 编译器无法优化的调用。

未知的字典 key、未知的字段路径以及缺失的语言环境已经是编译错误，因此该插件不会重复报告。

## 安装

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

需要 ESLint 9 或更高版本（flat config）。

## 使用

该插件同时在 ESLint 和 [oxlint](https://oxc.rs) 中运行 —— 规则相同，选项相同。

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

或者逐条启用规则：

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

有两点需要注意：oxlint 的 JS 插件支持仍处于 alpha 阶段，并且 oxlint 不支持自定义解析器 —— 因此 `.vue`、`.svelte`、`.astro` 文件和 Angular 模板不会在其中被检查。请用 oxlint 检查 JS/TS/JSX 文件，其余部分继续使用 ESLint。

  </Tab>
</Tabs>

### 配置

| 配置            | `no-raw-text`           | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                    | error                   | error                     | off                      |
| `strict`        | error（+ JSX 外字面量） | error                   | error                     | error                    |
| `contract-only` | off                     | error                   | error                     | off                      |

`recommended` 特意将 `no-raw-text` 保持为 `warn`：把它指向现有 codebase 会一次性暴露所有未翻译的字符串，而这不应该在第一天就让你的构建失败。

`enforce-adapter-import` 默认关闭 —— 如果需要，请显式启用。

## 规则

### `no-raw-text`

报告未在字典中声明的面向用户的文本。它使用与 `intlayer extract` 相同的检测逻辑，因此品牌名称、CSS 类名和技术标识符会被忽略。

```jsx
// ✗ 会被报告
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ 正常
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

内容声明文件（`*.content.ts` 等）会被跳过。

要一次性修复整个文件，请运行 `npx intlayer extract`，让编译器替你把字符串移入字典。

**选项**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // 值为面向用户文本的属性。
      // 默认值：title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // 内容永远不是面向用户文本的元素。
      // 默认值：code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // 永不报告的文本的正则表达式。
      ignorePatterns: ["^Powered by"],

      // 同时报告标记之外的字符串字面量。默认值：false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

要求字典 key 必须是字符串字面量。

只有当编译器能在调用处直接读取 key 时，才能预加载对应的字典。如果 key 是计算得出的，编译器会静默跳过优化，转而打包所有字典。

```typescript
// ✗ 会被报告
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ 变量仍然不是字面量
const key = "home";
useIntlayer(key);

// ✓ 正常
useIntlayer("home");
getTranslations({ namespace: "home" });
```

该规则适用于 `useIntlayer`、`getIntlayer` 以及每个 compat 适配器（`useTranslation`、`useTranslations`、`formatMessage`、`<FormattedMessage id>`、`<Trans i18nKey>` 等）。

### `no-dynamic-field-access`

要求你从字典中读取的字段是静态可知的。

编译器会移除它看不到被使用的字段。计算得出的访问对它不可见，因此读取时可能在运行时返回 `undefined`。

```typescript
// ✗ 会被报告
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ 正常
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

优先使用 `@intlayer/*` compat 适配器而非原始包。只有在配置了打包器别名时，原始包才会解析到 Intlayer；而适配器总是可以。可通过 `--fix` 自动修复。

```typescript
// ✗ 会被报告
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ 正常
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## 框架

所有规则都适用于全部 Intlayer 集成，包括 Vue、Svelte 和 Angular 模板内部。你只需告诉 ESLint 哪个解析器读取哪种文件类型。

| 框架                      | 文件              | 解析器                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular 模板              | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

只需安装项目实际需要的解析器。

> **已知限制。** 在 Vue 和 Angular 模板中，形如 `{{ content[key] }}` 的表达式不会被 `no-dynamic-field-access` 检查。写在 script 块中的动态读取会被正常捕获。
