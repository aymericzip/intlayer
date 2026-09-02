---
createdAt: 2025-11-25
updatedAt: 2026-08-09
title: 最佳化 i18n 打包體積與效能
description: 透過最佳化國際化（i18n）內容來縮減應用程式包的大小。了解如何利用 Intlayer 實現字典的 tree shaking 和延遲載入（lazy loading）。
keywords:
  - 打包最佳化
  - 內容自動化
  - 動態內容
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 9.2.1
    date: 2026-08-09
    changes: "`purge` 與 `minify` 現在可透過 `@intlayer/swc` 在 Next.js 上運作 — 不需要 `babel.config.js`"
  - version: 8.12.0
    date: 2026-06-24
    changes: "在參考表中依所需的流水線順序列出 Babel 外掛（extract → purge → minify → optimize）"
  - version: 8.12.0
    date: 2026-06-07
    changes: "為 Babel/Webpack 引入了 `intlayerPurgeBabelPlugin` 和 `intlayerMinifyBabelPlugin`，明確了外掛程式管線"
  - version: 8.7.0
    date: 2026-04-08
    changes: "向建置設定中新增了 `minify` 和 `purge` 選項"
author: aymericzip
---

# 最佳化 i18n 打包體積與效能

依賴 JSON 檔案的傳統 i18n 解決方案中最常見的挑戰之一是管理內容體積。如果開發者沒有手動將內容拆分到各個命名空間（namespaces），使用者通常會為了查看一個頁面而下載所有頁面、甚至是所有語言的翻譯。

例如，一個應用程式有 10 個頁面並被翻譯成了 10 種語言，可能導致使用者為了這 10 個頁面下載所有的內容，儘管他們只想要**一個頁面**的內容（當前語言版本的當前頁面）。這不僅會造成頻寬浪費，也會導致更慢的載入時間。

**Intlayer 透過在建置時（build-time）進行最佳化來解決這一問題。** 它可以分析您的程式碼以檢測每個元件實際使用了哪些字典，並只將必要的內容注入到您的打包結果（bundle）中。

## 目錄

<TOC />

## 它是如何運作的

Intlayer 使用一種**基於元件的方法（per-component approach）**。與全域 JSON 檔案不同，您的內容會在元件旁邊或是元件內部進行定義。在建置流程中，Intlayer 將會：

1. **分析**您的程式碼以尋找 `useIntlayer` 的呼叫。
2. **建置**對應的字典內容。
3. **替換** `useIntlayer` 呼叫為依據您的設定進行最佳化後的程式碼。

這樣能夠確保：

- 如果一個元件未被匯入，它的內容將不會包含在打包產物中（Dead Code Elimination / 死程式碼消除）。
- 如果一個元件被延遲載入，其內容同樣會被延遲載入。

## 各平台設定指南

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js 需要 `@intlayer/swc` 外掛，因為 Next.js 使用 SWC 進行建置。自 **v9.2.1** 起，這一個套件即可涵蓋整條流水線 —— 最佳化（匯入重寫）、清除與壓縮。

> 該外掛程式並未預設安裝，因為 SWC 外掛程式在 Next.js 當中目前仍處於實驗階段。未來這部分有可能會發生改變。

> **Next.js 16.1.0 是最低版本。** 它是首個基於 SWC 向前相容 Wasm 外掛 ABI 建置的版本；更早的版本會拒絕該外掛。`withIntlayer` 會讀取你專案的 Next.js 版本，低於 16.1.0 時乾脆不註冊該外掛 —— 這些建置仍會成功，只是在沒有打包最佳化的情況下執行。

<Tabs>
 <Tab value="npm">

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

 </Tab>
 <Tab value="Crates.io (rust)">

```toml fileName="Cargo.toml"
[dependencies]
intlayer-swc-plugin = "*"
```

[View on Crates.io](https://crates.io/crates/intlayer-swc-plugin)

 </Tab>
</Tabs>

安裝完畢後，Intlayer 將會自動偵測並使用該外掛程式。

**清除與壓縮**階段（欄位移除與欄位重新命名）不需要額外套件，也不需要 `babel.config.js`。用 `withIntlayer` 包住你的設定，並在 `intlayer.config.ts` 中開啟相應旗標：

```typescript fileName="next.config.ts"
import { withIntlayer } from "next-intlayer/server";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {/* 你的設定 */};

export default withIntlayer(nextConfig);
```

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // 從打包的 JSON 中移除未使用的內容欄位
    minify: true, // 將內容欄位鍵重新命名為簡短別名
  },
};

export default config;
```

在 `next build` 期間，`withIntlayer` 會分析你的原始碼、重寫已編譯的字典，並將產生的欄位重新命名表交給 `@intlayer/swc`，由它更新你程式碼中對應的屬性存取。

> 請使用非同步的 `withIntlayer`，而不是 `withIntlayerSync`。同步版本不會執行分析流水線，因此清除與壓縮對它沒有效果。

> 清除與壓縮僅在 `next build` 時執行 —— 最佳化流水線在 `next dev` 期間是關閉的。

> 當設定了相容轉接器呼叫方時它們也會被停用（`swcExtraCallers`，由 `@intlayer/next-intl`、`@intlayer/react-i18next` 等相容套件設定）：這些呼叫點對使用分析器不可見，因此清除會移除程式碼仍在讀取的欄位。匯入重寫仍保持啟用。

**更早的版本（9.2.1 之前）** 需要 `@intlayer/babel` 以及一個宣告 `intlayerPurgeBabelPlugin` 與 `intlayerMinifyBabelPlugin` 的 `babel.config.js`。該檔案不再需要，可以刪除。

 </Tab>
 <Tab value="vite">

### Vite

Vite 使用了包含在 `vite-intlayer` 依賴當中的 `@intlayer/babel` 外掛程式。整個最佳化管線 —— 包括匯入重寫、清除和壓縮 —— 是預設開啟的，且無需任何額外的外掛程式註冊。

在 `intlayer.config.ts` 裡設定相對應的標誌來開啟 purge 以及 minify：

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // 將未被使用的欄位從打包好的 JSON 中移除
    minify: true, // 將欄位名稱重新命名為簡短的別名
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (以及設定了 Babel 的 Next.js)

安裝 `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

在 `babel.config.js` 裡按照正確的順序添加所有四個外掛程式：

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: 編譯 .content.ts 檔案 → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: 從 .intlayer/**/*.json 移除不必要的欄位
    //    (讀取 intlayer.config.ts 內的 build.purge 設定)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: 壓縮並重新命名 JSON + 原始碼裡的欄位名稱
    //    (讀取 intlayer.config.ts 內的 build.minify 設定)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: 重寫 useIntlayer('key') → useDictionary(hash)
    //    它必須位於末尾，因為該操作會抹去原本的 dictionary 鍵名。
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## 外掛程式參考

Intlayer 的建置最佳化被劃分為若干個職責單一的外掛程式。了解它們各自的用途可以防止在設定它們時產生困惑。

### Babel 外掛程式 (`@intlayer/babel`)

這些被直接運用在基於 Webpack 設定的 `babel.config.js` 當中（比如使用了 Babel 的 Next.js、CRA，或是自訂的 Webpack 等）。

下表依所需的流水線順序列出它們（與它們必須在 `babel.config.js` 中出現的順序相同）：

| 外掛程式                      | 功能說明                                                                                               |
| :---------------------------- | :----------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | 掃描 `.content.ts` 檔案並把編譯好的字典寫入 `.intlayer/`                                               |
| `intlayerPurgeBabelPlugin`    | 掃描所有原始碼檔案，從已編譯的 `.intlayer/**/*.json` 字典檔案中刪除**未被使用的內容欄位**              |
| `intlayerMinifyBabelPlugin`   | **重新命名內容欄位的鍵（keys）** 為簡短的字母別名（例如 `title` 變成 `a`），作用範圍包括 JSON 與原始碼 |
| `intlayerOptimizeBabelPlugin` | 將 `useIntlayer('key')` 重寫為 `useDictionary(hash)` 並注入匹配對應字典的 `import` 語句                |

> **外掛程式的執行順序很重要。** 在您的 `babel.config.js` 裡，purge 和 minify 的外掛程式必須放置在 optimize 外掛程式**之前**。最佳化步驟（optimize）會把 `useIntlayer('key')` 替換為模糊的 `useDictionary(hash)`，此舉抹除了能夠讓 purge 和 minify 識別哪些欄位被使用過的字典 key 資訊。

每一個 Babel 外掛程式都有對應的選項助手（options helper），該助手會在設定載入時讀取一遍 `intlayer.config.ts`，並返回預解析的值：

| 選項助手                     | 配套外掛程式                  |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |

### Vite 外掛程式 (`vite-intlayer`)

Vite 使用者**不需要直接對它們進行設定**。當您在 `vite.config.ts` 裡呼叫 `withIntlayer()` 時，它們會自動生效。只需要在 `intlayer.config.ts` 中設定 `build.purge` 和 `build.minify`，即可開啟相應的功能，且不需要額外的外掛程式註冊過程。

| 內部 Vite 外掛程式 | 等效行為                                                                                |
| :----------------- | :-------------------------------------------------------------------------------------- |
| Usage analyzer     | 等同於 `intlayerPurgeBabelPlugin` 的分析步驟                                            |
| Dictionary prune   | 等同於 `intlayerPurgeBabelPlugin` 的 JSON 寫入步驟                                      |
| Dictionary minify  | 等同於 `intlayerMinifyBabelPlugin` 的 JSON 寫入步驟                                     |
| Babel transform    | 等同於 `intlayerMinifyBabelPlugin` 的程式碼重新命名步驟 + `intlayerOptimizeBabelPlugin` |

### SWC 外掛（`@intlayer/swc`）

Next.js 使用者同樣**從不直接設定這些**。自 **v9.2.1** 起，`next.config.ts` 中的 `withIntlayer()` 僅憑 `build.purge` 與 `build.minify` 兩個旗標就會執行完整流水線 —— 清除、壓縮與匯入重寫。

工作被分成兩部分，因為 SWC Wasm 外掛一次只轉換一個檔案，且無法存取檔案系統：

| 階段                                 | 執行位置                       | 作用                                                           |
| :----------------------------------- | :----------------------------- | :------------------------------------------------------------- |
| 使用分析 + JSON 清除/壓縮            | Node，位於 `withIntlayer()` 內 | 讀取每個元件原始檔，重寫 `.intlayer/**/*.json`，產生重新命名表 |
| 原始碼重寫（`content.title` → `.a`） | `@intlayer/swc`（Wasm）        | 將重新命名表套用到你程式碼中對應的屬性存取                     |
| 匯入重寫（`useIntlayer` → dict）     | `@intlayer/swc`（Wasm）        | 與 `intlayerOptimizeBabelPlugin` 相同                          |

判斷_哪些_欄位未被使用以及每個欄位取得_什麼_別名，需要跨檔案狀態與檔案 I/O，因此這一半在 Node 中執行；SWC 外掛只接收產生的表。

## 設定選項

您可以透過在您的 `intlayer.config.ts` 裡的 `build` 屬性來控制 Intlayer 怎樣去最佳化您的程式碼包。

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.CHINESE_TRADITIONAL],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // 決定在建置時是否直接用直引字典覆蓋 useIntlayer() 的呼叫。
    // undefined = 自動（在生產環境中開啟），true = 始終開啟，false = 始終關閉。
    optimize: undefined,

    // 將已編譯字典裡的欄位鍵名改寫為簡短的字母名稱（例如：title → a）。
    // 這將縮小 JSON 的體積；前提條件是啟用了 optimize。
    minify: true,

    // 將未曾在程式碼裡真正存取過的內容欄位移除。
    // 前提條件是啟用了 optimize。
    purge: true,
  },
};

export default config;
```

> 在大多數情況之下，推薦為 `optimize` 保留它的預設值（`undefined`）。

> 請參閱設定參考資料以了解所有的選項：[設定說明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/configuration.md)

### 建置選項

| 屬性           | 類型                  | 預設值      | 詳細說明                                                                                                                                     |
| :------------- | :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean / undefined` | `undefined` | 用於開啟 import 語句的重寫。`undefined` = 僅在打包成生產環境模式時生效。當設定為 `false` 的時候，同樣會導致 purge 以及 minify 均一併被關閉。 |
| **`minify`**   | `boolean`             | `false`     | 用於對已編譯好的 JSON 檔案裡的內容鍵名改寫成短的單字母名稱。同理也會一併將原始碼裡相關存取屬性同樣改名。僅當 `optimize` 為 `false` 時無效。  |
| **`purge`**    | `boolean`             | `false`     | 用於移除無論如何也不會被呼叫的且靜態的原始檔的內容欄位，從 JSON 輸出中去除掉。僅當 `optimize` 為 `false` 時無效。                            |

### 壓縮 / Minification (重新命名欄位鍵值)

`build.minify` **並非**壓縮您的 JavaScript —— 那是您的打包器應該處理的工作。它的工作，是把編譯後的字典對應的 JSON 檔案的每一個自訂內容的欄位，全用短位的字母標識來替代，藉此將其體積進行壓縮：

```
// Minify 之前
{ "title": "Hello", "subtitle": "World" }

// Minify 之後
{ "a": "Hello", "b": "World" }
```

該重新命名的方法同樣也會應用到那些處於程式碼裡的屬性名稱存取階段，所以在最終編譯好的結果裡，`content.title` 便會演變為 `content.a`。它們在執行時的實際表現完全一致。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> 當 `optimize` 為 `false` 時，壓縮會被跳過。當 `editor.enabled` 為 `true` 時，壓縮仍會執行，但不會執行欄位重新命名步驟——視覺化編輯器透過 `keyPath` 解析編輯內容，因此原始欄位名稱必須保留。

> 在 Next.js 上，當 `@intlayer/swc` 未安裝或無法載入時（Next.js 低於 16.1.0），壓縮同樣會被略過。重寫原始碼存取的正是這個外掛，因此在沒有它的情況下重新命名字典，會讓你的程式碼讀取已不存在的欄位名稱。

> 同理，如果是利用了 `importMode: 'fetch'` 來載入欄位時此過程同樣不適用。因為它們的內容會以原始命名由後端 API 所提供，對客戶端內容隨意重新命名會破壞客戶端與伺服器端的匹配契約。

### 欄位清除 / Purging (去掉未被引用的欄位內容)

`build.purge` 能自動分析究竟哪些欄位真真切切地被您的原始碼所引用，進而只把實際引用過的資料予以保留，把其他的垃圾資料從編譯產生的 JSON 裡排除掉。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**範例說明:** 我們有一個包含五個不同欄位資料的字典，但是程式碼實際就用到了裡邊的兩個：

```
// Purge 執行前
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Purge 之後（這裡僅僅只用到了 title 與 subtitle）
{ "title": "…", "subtitle": "…" }
```

> 當 `optimize` 為 `false` 時，清除（Purge）會被跳過。當 `editor.enabled` 為 `true` 時，它仍保持啟用——被清除的欄位不會被任何元件讀取，因此編輯器永遠不會渲染它。在 Next.js 上，當 `@intlayer/swc` 不可用以及設定了相容轉接器呼叫方時，還會被額外略過。

> 當檢測到某份程式碼因為異常無法順利解析、又或者當把由 `useIntlayer` 輸出的值以靜態解析器難以預測分析的模式在不同元件中來回丟（比如被打包成物件傳入等而未被進行解構）的時候，它同樣會跳過，以此保守地保留整部字典的全部資訊，避免意外發生。

### 匯入模式（Import Mode）

對於包含多個頁面和地區規模比較大的應用程式來說，您的 JSON 可能會佔去絕大一部分包（Bundle）的內容。所以，您可以憑藉著 `importMode` 這個參數讓 Intlayer 來調整對字典內容本身的實際拉取行為。

### 全域定義

該參數可以經由您本身的 `intlayer.config.ts` 這個檔案在全域進行指定。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // 預設為 'static'
  },
};

export default config;
```

### 為字典獨立配置

我們也可以在這其中部分獨立詞典原本配置內的 `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` 把該參數改寫成另外想要的規則。

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // 將原本的模式改寫
  content: {
    // ...
  },
};

export default appContent;
```

| 屬性             | 取值類型                           | 預設設置   | 描述說明                                                                                           |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **已被棄用**: 建議調整為 `dictionary.importMode`。這決定了應當怎樣載入各項字典。（細節參考下文）。 |

這處 `importMode` 設定用於指揮元件拉取各項內容的真實手段。要麼被指定在了全域 `intlayer.config.ts` 中的 `dictionary` 裡，要不便以 `content.ts` 形式來分別定製。

### 1. 靜態模式（Static Mode - `default`）

在這個預設設定下，Intlayer 自動把全部 `useIntlayer` 變成了 `useDictionary` 以做到將所需的翻譯資料無縫拼接入 JavaScript 包內。

- **優勢（Pros）:** 即時就能被載入（屬於同步型），由於沒有水合（hydration）從而意味著額外的零請求。
- **缺點（Cons）:** 但這個包同樣也就塞滿了給該元件用的**各種不同可用語言的對應版本**，這非常佔空間。
- **最佳應用場合:** 單頁應用程式（SPA）。

**程式碼在轉換之後的圖示（舉例）:**

```tsx
// 這是您的原本程式碼
const content = useIntlayer("my-key");

// (靜態) 最佳化圖解。
// 僅為了解釋說明而列，出於最佳化實際上的最終輸出略有差別
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      zh: "我的標題",
    },
  },
});
```

### 2. 動態模式（Dynamic Mode）

在這一設定之下，Intlayer 自動把全部 `useIntlayer` 全給變成了 `useDictionaryAsync`。這個操作能將拉取行文變成動態 `import()`（這和 Suspense 的表現接近），並有針對性地對當地所在的特殊語言去單獨非同步請求其實際資料。

- **優勢（Pros）:** **支援基於地區語言所實施的程式碼樹抖動分離（Tree shaking）。** 說白了就是，正在瀏覽英語界面的使用者**僅僅**會只被發送那部分英文對應的詞典內容，法文或是其他國家的資料都不會載入。
- **缺點（Cons）:** 這個階段下，將會讓元件因資料要求而針對各項水合需求（hydration）各自產生不同種的呼叫申請（拉取各部件內容）。
- **最佳應用場合:** 內容巨大且充斥了長文部落格的複雜平台、亦或是本身涵蓋了大量的翻譯種類因而在包（bundle）體積極為嚴格的情況下使用。

**程式碼在轉換之後的圖示（舉例）:**

```tsx
// 這是您的原本程式碼
const content = useIntlayer("my-key");

// (動態) 最佳化圖解。
// 僅為了解釋說明而列，出於最佳化實際上的最終輸出略有差別
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  zh: () =>
    import(".intlayer/dynamic_dictionary/my-key/zh.json").then(
      (mod) => mod.default
    ),
});
```

> 使用了 `importMode: 'dynamic'` 這個方案之時，如果某一頁剛好湊齊了 100 個包含了 `useIntlayer` 內容的部件時，瀏覽器就有極大的機率朝著伺服器丟過去多達 100 種不重樣的 fetch 請求。如果意在免於這樣的連環「瀑布效應」，嘗試盡可能去少寫單個的獨立 `.content` （嘗試著每幾塊湊一起合併起來比如每一個大的分塊區共享其內容字典，而非是切得那麼碎，比如連每一個單小按鈕都設單獨請求。）如果把多個帶有單獨名字 `.content` 內容給附加上相同的 Key 名稱，程式依然能夠很輕易將這些零散碎落的資料融合成單獨龐大且統一的一本完整的字典物件裡去。

### 3. Fetch 模式（Fetch Mode）

行為跟 Dynamic 有所重疊，不過最優先則是朝 Intlayer Live Sync API 請求其詞典內容。假如獲取資料時遭到攔截或者內容不屬於即時的資料內容體系的話，接下來便將其作為兜底順延遞回之前的動切請求。

**程式碼在轉換之後的圖示（舉例）:**

```tsx
// 這是您的原本程式碼
const content = useIntlayer("my-key");

// 能夠將它（Fetch）看成這類實現
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  zh: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/zh").then((res) =>
      res.json()
    ),
});
```

> 如果還需要獲得對於 CMS 獲取方面的認知的話：可以去查看 [CMS 說明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh-TW/intlayer_CMS.md)

> 此模式同樣會一如既往地因為 JSON 內容會直接藉由後端直接輸送而不遭受 purge 跟 minify 等等這幾類資料剔除方案的干擾。

## 概要: 靜態 和 動態

| 模式特徵                   | 靜態模式（Static Mode）                                      | 動態模式（Dynamic Mode）                  |
| :------------------------- | :----------------------------------------------------------- | :---------------------------------------- |
| **JS 產生的 Bundle 體積**  | 龐大（包含了供各個不同元件使用時呼叫的其他全部外語語系資訊） | 小巧（內容直接為空、只有程式碼框架）      |
| **最初載入所需時間**       | 極速（畢竟那些所需資訊一開始都已經存在於包（Bundle）裡面了） | 略需等待（拉取 JSON 所需消耗時間）        |
| **附帶發生的網路請求**     | 無，無需任何等待直接 0 次                                    | 取決字典請求次數（一次 Key 取出就是一回） |
| **樹抖動（Tree Shaking）** | 按單一元件的級別而做分割                                     | 依元件級別外加依據地區與語種去實施拆分    |
| **最佳應用與方案環境**     | 普通互動式元件內容或單一介面的輕型程式等                     | 極其充滿內容的純文區塊或極其繁多的語系    |

## 分析您的打包大小

分析您的打包結果是找出「臃腫」的 JSON 檔案和考慮進行程式碼分割（code-splitting）的最直接方式。這些工具可以產生您應用程式編譯程式碼的樹狀可視檢視（treemap），讓您能夠清楚地看到究竟是哪些函式庫佔據了最多的空間。

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite 在底層使用了 Rollup。外掛程式 `rollup-plugin-visualizer` 能夠產生一個互動式 HTML 檔案，展示相依性圖（graph）中每個模組的體積。

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // 自動在瀏覽器中打開報告
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

對於使用了 App Router 和 Turbopack 的專案，Next.js 提供了一個內建的實驗性分析器，它不需要額外的相依套件。

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

如果您在 Next.js 中使用的是預設的 Webpack 打包器，請使用官方的 bundle analyzer。您可以透過在建置期間設定一個環境變數來觸發它。

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // 您的 Next.js 設定
});
```

**用法:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### 純 Webpack

針對 Create React App (ejected)、Angular 或是自訂 Webpack 的設定，使用業界標準的 `webpack-bundle-analyzer`。

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>
