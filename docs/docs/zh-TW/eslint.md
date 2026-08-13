---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint 外掛 | Intlayer 的 Lint 規則
description: 使用 eslint-plugin-intlayer 捕捉硬編碼字串、Intlayer 編譯器無法最佳化的動態呼叫以及未使用的字典內容。支援 ESLint 與 oxlint，適用於 React、Vue、Svelte、Angular 與 Astro。
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - 程式碼檢查
  - i18n
  - 國際化
  - no-raw-text
  - 硬編碼字串
  - 未使用的翻譯
  - 死內容
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

`eslint-plugin-intlayer` 能夠捕捉 TypeScript 無法發現的幾類 i18n 錯誤：

1. **硬編碼文字**：從未寫入字典中的文字。
2. **動態呼叫**：能夠通過型別檢查並正常執行，但 Intlayer 編譯器無法進行最佳化的呼叫。
3. **死內容（Dead content）**：專案中沒有任何地方讀取的字典與欄位（需手動開啟）。

未知的字典鍵、未知的欄位路徑與缺失的語系本身已是編譯錯誤，因此外掛不會重複回報它們。

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

需要 ESLint 9 或更高版本（Flat config）。

## 使用方法

此外掛可在 ESLint 與 [oxlint](https://oxc.rs) 中執行 — 擁有相同的規則與設定選項。

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

或者逐一啟用規則：

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

兩點注意事項：oxlint 對 JS 外掛的支援仍處於 Alpha 階段，且 oxlint 不支援自訂解析器 — 因此 `.vue`、`.svelte`、`.astro` 與 Angular 範本無法在此處進行 lint。請在 JS/TS/JSX 檔案上執行 oxlint，其餘檔案保留使用 ESLint。

上面特意排除了 `no-unused-content`：它需要從規則上下文中取得工作目錄與被檢查檔案的路徑，而 Alpha 階段的 JS 外掛橋接層無法保證提供這些資訊。請在 ESLint 下執行該規則。

  </Tab>
</Tabs>

### 預設設定

| 設定            | `no-raw-text`           | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                    | error                   | error                     | off                      | off                 |
| `strict`        | error (+ 非 JSX 字面量) | error                   | error                     | error                    | off                 |
| `contract-only` | off                     | error                   | error                     | off                      | off                 |

`recommended` 特意將 `no-raw-text` 設為 `warn`：將其指向現有程式碼庫會一次性暴露所有未翻譯的字串，這不應該在第一天就導致建置中斷。

`enforce-adapter-import` 預設關閉 — 如果需要請明確啟用。

`no-unused-content` 在所有設定中均預設關閉（包含 `strict`）。這是唯一一個需要讀取 Intlayer 設定並從磁碟遍歷來源檔案的規則，因此啟用它應當是一項經過深思熟慮的選擇，而非預設自動執行的行為。

## 規則列表

### `no-raw-text`

回報未在字典中宣告的面向使用者文字。它使用與 `intlayer extract` 相同的偵測邏輯，因此品牌名稱、CSS 類別名稱與技術識別碼都會被忽略。

```jsx
// ✗ 回報錯誤
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ 正常
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

內容宣告檔案（`*.content.ts`, …）會被略過。

若要一次性修復整個檔案，執行 `npx intlayer extract`，讓編譯器自動將字串移入字典。

**設定選項**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // 值為面向使用者文字的屬性列表。
      // 預設值: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // 內容絕非面向使用者文字的元素列表。
      // 預設值: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // 絕不回報的文字正規表示式。
      ignorePatterns: ["^Powered by"],

      // 是否同時回報標記語言之外的字串字面量。預設值: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

要求字典鍵必須是字串字面量。

編譯器只有在呼叫位置直接讀取到鍵時，才能預先載入字典。使用計算鍵會無訊息略過最佳化，轉而打包所有字典。

```typescript
// ✗ 回報錯誤
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ 變數仍然不是字面量
const key = "home";
useIntlayer(key);

// ✓ 正常
useIntlayer("home");
getTranslations({ namespace: "home" });
```

這適用於 `useIntlayer`、`getIntlayer` 以及所有相容介面卡（`useTranslation`、`useTranslations`、`formatMessage`、`<FormattedMessage id>`、`<Trans i18nKey>` 等）。

### `no-dynamic-field-access`

要求從字典中讀取的欄位必須是靜態已知的。

編譯器會移除它未偵測到使用的欄位。動態計算存取對其不可見，因此該讀取在執行階段可能會回傳 `undefined`。

```typescript
// ✗ 回報錯誤
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

優先使用 `@intlayer/*` 相容介面卡而非原始套件。原始套件僅在設定了打包工具別名時才會解析為 Intlayer；而介面卡始終生效。可透過 `--fix` 自動修復。

```typescript
// ✗ 回報錯誤
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ 正常
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**預設關閉。** 回報專案中沒有任何地方讀取的內容，以及在多個位置宣告的字典鍵。

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ 當專案中沒有任何呼叫端請求 "home" 時回報
  content: {
    title: t({ "zh-TW": "標題", en: "Title" }),

    // ✗ 當沒有任何地方讀取 `hero` 時回報
    hero: {
      subtitle: t({ "zh-TW": "副標題", en: "Subtitle" }),
    },
  },
};
```

與其他規則不同，此規則無法僅憑眼前的檔案給出判斷 — 欄位是否未使用僅相對於整個專案而言。在一次 lint 執行的首次內容宣告時，它會載入你的 Intlayer 設定，比對該設定宣告的來源檔案（`build.traversePattern`、`compiler.transformPattern`），並執行驅動 `@intlayer/lsp` 與 VS Code 擴充套件中「未使用」刪除線的同一套使用情況分析器。結果會快取 `cacheTtl` 毫秒，因此每次執行只會掃描一次，而不是每個檔案掃描一次。

**設定選項**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // 回報沒有任何地方引用的字典鍵。預設值: true
      reportUnusedDictionaries: true,

      // 回報沒有任何地方讀取的內容欄位。預設值: true
      reportUnusedFields: true,

      // 回報在多處宣告的重複鍵。預設值: true
      reportDuplicateKeys: true,

      // 絕不回報的欄位路徑正規表示式。
      ignoreFields: ["^meta"],

      // 掃描起始的專案根目錄。預設值: ESLint 的工作目錄
      baseDir: process.cwd(),

      // 專案掃描結果重複使用時長（毫秒）。預設值: 30000
      cacheTtl: 30000,
    },
  ],
}
```

如果你在長期執行的編輯器服務中進行 lint 且希望更快看到修改結果，可以降低 `cacheTtl`；當單次 lint 執行跨越 monorepo 中的多個 Intlayer 專案時，請設定 `baseDir`。

> **傾向於保持沉默。** 此處的誤報會導致翻譯被誤刪，因此當字典以分析器無法追蹤的方式被使用時，不會回報任何內容：內容物件被整體傳遞、從中繫結的翻譯函式（`const t = useTranslations("home")`）、透過直接匯入存取的宣告（`useDictionary(myDictionary)`）、來自另一個字典的 `nest()`、或者因 spread 展開而不詳盡的欄位列表。單一檔案元件（`.vue`、`.svelte`、`.astro`）計為使用了它們提及的字典中的所有欄位，因為它們的指令碼區塊在此處不會被解析。

`reportDuplicateKeys` 讀取建置時寫入 `.intlayer/` 下的未合併字典，因此在專案至少建置過一次之前它會保持安靜。共享一個鍵的兩個宣告會被合併，這是一種合法的模式 — 該回報之所以存在，是因為在兩邊同時定義的欄位會無訊息保留兩個值中的一個。

分析器從以 ESM 形式發布的 `@intlayer/lsp` 中載入。因此該規則需要能夠 `require()` ES 模組的 Node 版本 — Node 20.19+ 或 22.12+。在更低版本上，它不會回報錯誤中斷 lint 執行，而是什麼都不回報。

## 框架支援

每條規則均適用於所有 Intlayer 整合，包含 Vue、Svelte 與 Angular 範本內部。你只需告訴 ESLint 哪個解析器負責讀取對應的檔案類型即可。

| 框架                      | 檔案              | 解析器                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular 範本              | `.component.html` | `@angular-eslint/template-parser` |
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

請僅安裝專案所需的解析器。

> **已知限制。** 在 Vue 與 Angular 範本中，類似於 `{{ content[key] }}` 的運算式不會被 `no-dynamic-field-access` 檢查。寫在 script 區塊中的動態讀取仍會被正常捕捉。
