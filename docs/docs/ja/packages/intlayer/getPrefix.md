---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: getPrefix 関数ドキュメント | intlayer
description: intlayer パッケージの getPrefix 関数の使い方を確認する
keywords:
  - getPrefix
  - prefix
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: 初回ドキュメント作成
---

# ドキュメント: `intlayer` の `getPrefix` 関数

## 説明

`getPrefix` 関数は、ルーティングモードの設定に基づいて指定されたロケールのURLプレフィックスを決定します。ロケールとデフォルトロケールを比較し、柔軟なURL構築のために3つの異なるプレフィックス形式を含むオブジェクトを返します。

**主な特徴：**

- 最初のパラメータとしてロケールを受け取る（必須）
- `defaultLocale` と `mode` を含むオプションの `options` オブジェクト
- `prefix` と `localePrefix` プロパティを持つオブジェクトを返す
- すべてのルーティングモードをサポート：`prefix-no-default`、`prefix-all`、`no-prefix`、および `search-params`
- ロケールプレフィックスを追加するタイミングを判断する軽量ユーティリティ

---

## 関数シグネチャ

```typescript
getPrefix(
  locale: Locales,               // 必須
  options?: {                    // オプション
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // 例: 'fr/' または ''
  localePrefix?: Locale; // 例: 'fr' または undefined
}
```

---

## パラメータ

- `locale: Locales`
  - **説明**: プレフィックスを生成する対象のロケール。値が偽（undefined、null、空文字列）の場合、関数は空文字列を返します。
  - **型**: `Locales`
  - **必須**: はい

- `options?: object`
  - **説明**: プレフィックス判定のための設定オブジェクト。
  - **型**: `object`
  - **必須**: いいえ（オプション）

  - `options.defaultLocale?: Locales`
    - **説明**: アプリケーションのデフォルトロケール。指定がない場合は、プロジェクト設定で構成されたデフォルトロケールを使用します。
    - **型**: `Locales`
    - **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`

- **説明**: ロケール処理のためのURLルーティングモード。指定しない場合は、プロジェクト設定で構成されたモードが使用されます。
- **型**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
- **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md#middleware)
- **モード**:
  - `prefix-no-default`: ロケールがデフォルトロケールと一致する場合、空文字列を返します
  - `prefix-all`: デフォルトを含むすべてのロケールに対してプレフィックスを返します
  - `no-prefix`: 空文字列を返します（URLにプレフィックスなし）
  - `search-params`: 空文字列を返します（クエリパラメータにロケールを含む）

### 戻り値

- **型**: `GetPrefixResult`
- **説明**: 3つの異なるプレフィックス形式を含むオブジェクト:
  - `prefix`: 後続のスラッシュを含むパスのプレフィックス（例: `'fr/'`, `''`）
  - `localePrefix`: スラッシュなしのロケール識別子（例: `'fr'`, `undefined`）

---

## 使用例

### 基本的な使用法

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// 英語ロケールのプレフィックスをチェック
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// 戻り値: { prefix: 'en/', localePrefix: 'en' }

// フランス語ロケールのプレフィックスをチェック
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// 戻り値: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// 戻り値: { prefix: '', localePrefix: undefined }
```

### 異なるルーティングモード

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: 常にプレフィックスを返す
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// 戻り値: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: ロケールがデフォルトと一致する場合はプレフィックスなし
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// 戻り値: { prefix: '', localePrefix: undefined }

javascript;
// prefix-no-default: ロケールがデフォルトと異なる場合にプレフィックスを返す
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// 戻り値: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix と search-params: プレフィックスを返さない
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// 戻り値: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// 戻り値: { prefix: '', localePrefix: undefined }
```

### 実用例

```typescript
import { getPrefix, Locales } from "intlayer";

// 特定のロケールに適したプレフィックスでURLを構築する
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// パス構築にprefixを使用
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// 結果: "/fr/about"

// locale識別にlocalePrefixを使用
console.log(`現在のロケール: ${localePrefix}`);
// 出力: "現在のロケール: fr"
```

---

## 関連関数

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md): 特定のロケール用のローカライズされたURLを生成
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getMultilingualUrls.md): 設定されたすべてのロケール用のURLを生成

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // 末尾にスラッシュが付いたパスのプレフィックス（例: 'fr/' または ''）
  localePrefix?: Locale; // スラッシュなしのロケール識別子（例: 'fr' または undefined）
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
