---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint 外掛 | Intlayer 的 lint 規則
description: 使用 eslint-plugin-intlayer 捕捉硬編碼字串以及 Intlayer 編譯器無法最佳化的動態呼叫。支援 ESLint 與 oxlint，適用於 React、Vue、Svelte、Angular 與 Astro。
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - 國際化
  - no-raw-text
  - 硬編碼字串
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
    changes: "初始化歷史"
author: aymericzip
---

# ESLint x OXLint 外掛

`eslint-plugin-intlayer` 捕捉 TypeScript 無法發現的兩類 i18n 錯誤：

1. **硬編碼文字** —— 從未進入字典的文字。
2. **動態呼叫** —— 能通過型別檢查並正常執行，但 Intlayer 編譯器無法最佳化的呼叫。

未知的字典 key、未知的欄位路徑以及缺少的語系已經是編譯錯誤，因此這個外掛不會重複回報。

## 安裝

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

需要 ESLint 9 或更新版本（flat config）。

## 使用方式

這個外掛可同時在 ESLint 與 [oxlint](https://oxc.rs) 中執行 —— 規則相同，選項相同。

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

或逐條啟用規則：

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

有兩點需要注意：oxlint 的 JS 外掛支援仍處於 alpha 階段，而且 oxlint 不支援自訂 parser —— 因此 `.vue`、`.svelte`、`.astro` 檔案與 Angular 樣板不會在其中被檢查。請用 oxlint 檢查 JS/TS/JSX 檔案，其餘部分繼續使用 ESLint。

  </Tab>
</Tabs>

### 設定

| 設定            | `no-raw-text`           | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                    | error                   | error                     | off                      |
| `strict`        | error（+ JSX 外字面值） | error                   | error                     | error                    |
| `contract-only` | off                     | error                   | error                     | off                      |

`recommended` 刻意將 `no-raw-text` 保持在 `warn`：把它指向既有的 codebase 會一次暴露所有未翻譯的字串，而這不該在第一天就讓你的建置失敗。

`enforce-adapter-import` 預設為關閉 —— 如有需要請明確啟用。

## 規則

### `no-raw-text`

回報未在字典中宣告、面向使用者的文字。它採用與 `intlayer extract` 相同的偵測邏輯，因此品牌名稱、CSS class 與技術識別字都會被忽略。

```jsx
// ✗ 會被回報
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ 正常
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

內容宣告檔（`*.content.ts` 等）會被略過。

若要一次修正整個檔案，請執行 `npx intlayer extract`，讓編譯器替你把字串移入字典。

**選項**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // 值為面向使用者文字的屬性。
      // 預設值：title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // 內容永遠不是面向使用者文字的元素。
      // 預設值：code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // 永不回報的文字的正規表達式。
      ignorePatterns: ["^Powered by"],

      // 同時回報標記之外的字串字面值。預設值：false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

要求字典 key 必須是字串字面值。

只有在編譯器能於呼叫處直接讀取 key 時，才能預先載入對應的字典。若 key 是計算而來，編譯器會靜默略過最佳化，改為打包所有字典。

```typescript
// ✗ 會被回報
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ 變數仍然不是字面值
const key = "home";
useIntlayer(key);

// ✓ 正常
useIntlayer("home");
getTranslations({ namespace: "home" });
```

此規則適用於 `useIntlayer`、`getIntlayer` 以及每個 compat 轉接器（`useTranslation`、`useTranslations`、`formatMessage`、`<FormattedMessage id>`、`<Trans i18nKey>` 等）。

### `no-dynamic-field-access`

要求你從字典讀取的欄位必須是靜態可知的。

編譯器會移除它看不到被使用的欄位。計算而來的存取對它不可見，因此讀取時可能在執行期回傳 `undefined`。

```typescript
// ✗ 會被回報
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

優先使用 `@intlayer/*` compat 轉接器而非原始套件。只有在設定了打包工具別名時，原始套件才會解析到 Intlayer；轉接器則永遠可以。可透過 `--fix` 自動修正。

```typescript
// ✗ 會被回報
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ 正常
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## 框架

所有規則都適用於全部 Intlayer 整合，包括 Vue、Svelte 與 Angular 樣板內部。你只需要告訴 ESLint 哪個 parser 讀取哪種檔案類型。

| 框架                      | 檔案              | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular 樣板              | `.component.html` | `@angular-eslint/template-parser` |
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

只需安裝專案實際需要的 parser。

> **已知限制。** 在 Vue 與 Angular 樣板中，形如 `{{ content[key] }}` 的運算式不會被 `no-dynamic-field-access` 檢查。寫在 script 區塊中的動態讀取會被正常捕捉。
