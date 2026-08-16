---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: ESLint 插件 | Intlayer 的 Lint 规则
description: 使用 eslint-plugin-intlayer 捕获硬编码字符串、Intlayer 编译器无法优化的动态调用以及未使用的字典内容。支持 ESLint 和 oxlint，适用于 React、Vue、Svelte、Angular 和 Astro。
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - 代码检查
  - i18n
  - 国际化
  - no-raw-text
  - 硬编码字符串
  - 未使用的翻译
  - 死内容
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

`eslint-plugin-intlayer` 能够捕获 TypeScript 无法发现的几类 i18n 错误：

1. **硬编码文本**：从未写入字典中的文本。
2. **动态调用**：能够通过类型检查并正常运行，但 Intlayer 编译器无法进行优化的调用。
3. **死内容（Dead content）**：项目中没有任何地方读取的字典和字段（需手动开启）。

未知的字典键、未知的字段路径和缺失的语言环境本身已是编译错误，因此插件不会重复报告它们。

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

需要 ESLint 9 或更高版本（Flat config）。支持 ESLint 10。

## 使用方法

该插件可在 ESLint 和 [oxlint](https://oxc.rs) 中运行 — 拥有相同的规则和配置选项。

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

或者展开某个配置并自行设置严重级别：

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
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

两点注意事项：oxlint 对 JS 插件的支持仍处于 Alpha 阶段，且 oxlint 不支持自定义解析器 — 因此 `.vue`、`.svelte`、`.astro` 和 Angular 模板无法在此处进行 lint。请在 JS/TS/JSX 文件上运行 oxlint，其余文件保留使用 ESLint。

上面特意排除了 `no-unused-content`：它需要从规则上下文中获取工作目录和被检查文件的路径，而 Alpha 阶段的 JS 插件桥接层无法保证提供这些信息。请在 ESLint 下运行该规则。

  </Tab>
</Tabs>

### 预设配置

| 配置            | `no-raw-text`           | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                    | error                   | error                     | off                      | off                 |
| `strict`        | error (+ 非 JSX 字面量) | error                   | error                     | error                    | off                 |
| `contract-only` | off                     | error                   | error                     | off                      | off                 |

`recommended` 特意将 `no-raw-text` 设为 `warn`：将其指向现有代码库会一次性暴露所有未翻译的字符串，这不应该在第一天就导致构建中断。

`enforce-adapter-import` 默认关闭 — 如果需要请显式启用。

`no-unused-content` 在所有配置中均默认关闭（包括 `strict`）。这是唯一一个需要读取 Intlayer 配置并从磁盘遍历源文件的规则，因此启用它应当是一项经过深思熟虑的选择，而非预设自动执行的行为。

## 规则列表

### `no-raw-text`

报告未在字典中声明的面向用户的文本。它使用与 `intlayer extract` 相同的检测逻辑，因此品牌名称、CSS 类名和技术标识符都会被忽略。

```jsx
// ✗ 报告错误
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ 正常
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

内容声明文件（`*.content.ts`, …）会被跳过。

若要一次性修复整个文件，运行 `npx intlayer extract`，让编译器自动将字符串移入字典。

**配置选项**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // 值为面向用户文本的属性列表。
      // 默认值: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // 内容绝非面向用户文本的元素列表。
      // 默认值: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // 绝不报告的文本正则表达式。
      ignorePatterns: ["^Powered by"],

      // 是否同时报告标记语言之外的字符串字面量。默认值: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

要求字典键必须是字符串字面量。

编译器只有在调用位置直接读取到键时，才能预加载字典。使用计算键会静默跳过优化，转而打包所有字典。

```typescript
// ✗ 报告错误
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

这适用于 `useIntlayer`、`getIntlayer` 以及所有兼容适配器（`useTranslation`、`useTranslations`、`formatMessage`、`<FormattedMessage id>`、`<Trans i18nKey>` 等）。

### `no-dynamic-field-access`

要求从字典中读取的字段必须是静态已知的。

编译器会移除它未检测到使用的字段。动态计算访问对其不可见，因此该读取在运行时可能会返回 `undefined`。

```typescript
// ✗ 报告错误
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

优先使用 `@intlayer/*` 兼容适配器而非原始包。原始包仅在配置了打包工具别名时才会解析为 Intlayer；而适配器始终生效。可通过 `--fix` 自动修复。

```typescript
// ✗ 报告错误
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ 正常
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**默认关闭。** 报告项目中没有任何地方读取的内容，以及在多个位置声明的字典键。

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ 当项目中没有任何调用方请求 "home" 时报告
  content: {
    title: t({ zh: "标题", en: "Title" }),

    // ✗ 当没有任何地方读取 `hero` 时报告
    hero: {
      subtitle: t({ zh: "副标题", en: "Subtitle" }),
    },
  },
};
```

与其他规则不同，此规则无法仅凭眼前的文件给出判断 — 字段是否未使用仅相对于整个项目而言。在一次 lint 运行的首次内容声明时，它会加载你的 Intlayer 配置，匹配该配置声明的源文件（`build.traversePattern`、`compiler.transformPattern`），并运行驱动 `@intlayer/lsp` 和 VS Code 扩展中“未使用”删除线的同一套使用情况分析器。结果会缓存 `cacheTtl` 毫秒，因此每次运行只会扫描一次，而不是每个文件扫描一次。

**配置选项**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // 报告没有任何地方引用的字典键。默认值: true
      reportUnusedDictionaries: true,

      // 报告没有任何地方读取的内容字段。默认值: true
      reportUnusedFields: true,

      // 报告在多处声明的重复键。默认值: true
      reportDuplicateKeys: true,

      // 绝不报告的字段路径正则表达式。
      ignoreFields: ["^meta"],

      // 扫描起始的项目根目录。默认值: ESLint 的工作目录
      baseDir: process.cwd(),

      // 项目扫描结果复用时长（毫秒）。默认值: 30000
      cacheTtl: 30000,
    },
  ],
}
```

如果你在长期运行的编辑器服务中进行 lint 且希望更快看到修改结果，可以降低 `cacheTtl`；当单次 lint 运行跨越 monorepo 中的多个 Intlayer 项目时，请设置 `baseDir`。

> **倾向于保持沉默。** 此处的误报会导致翻译被误删，因此当字典以分析器无法跟踪的方式被使用时，不会报告任何内容：内容对象被整体传递、从中绑定的翻译函数（`const t = useTranslations("home")`）、通过直接导入访问的声明（`useDictionary(myDictionary)`）、来自另一个字典的 `nest()`、或者因 spread 展开而不详尽的字段列表。单文件组件（`.vue`、`.svelte`、`.astro`）计为使用了它们提及的字典中的所有字段，因为它们的脚本块在此处不会被解析。

`reportDuplicateKeys` 读取构建时写入 `.intlayer/` 下的未合并字典，因此在项目至少构建过一次之前它会保持静默。共享一个键的两个声明会被合并，这是一种合法的模式 — 该报告之所以存在，是因为在两边同时定义的字段会静默保留两个值中的一个。

分析器从以 ESM 形式分发的 `@intlayer/lsp` 中加载。因此该规则需要能够 `require()` ES 模块的 Node 版本 — Node 20.19+ 或 22.12+。在更低版本上，它不会报错中断 lint 运行，而是什么都不报告。

## 框架支持

每条规则均适用于所有 Intlayer 集成，包括 Vue、Svelte 和 Angular 模板内部。你只需告诉 ESLint 哪个解析器负责读取对应的文件类型即可。

| 框架                      | 文件              | 解析器                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular 模板              | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs"
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

请仅安装项目所需的解析器。

> **已知局限性。** 在 Vue 和 Angular 模板中，类似于 `{{ content[key] }}` 的表达式不会被 `no-dynamic-field-access` 检查。写在 script 块中的动态读取仍会被正常捕获。
