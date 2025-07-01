---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleLang 関数ドキュメント | intlayer
description: intlayer パッケージの getLocaleLang 関数の使い方を説明します
keywords:
  - getLocaleLang
  - 翻訳
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
  - getLocaleLang
---

# ドキュメント: `intlayer` の `getLocaleLang` 関数

## 説明

`getLocaleLang` 関数は、ロケール文字列から言語コードを抽出します。国コードの有無にかかわらずロケールをサポートしています。ロケールが指定されていない場合は、デフォルトで空文字列を返します。

## パラメーター

- `locale?: Locales`

  - **説明**: 言語コードを抽出するためのロケール文字列（例：`Locales.ENGLISH_UNITED_STATES`、`Locales.FRENCH_CANADA`）。
  - **型**: `Locales`（オプション）

## 戻り値

- **型**: `string`
- **説明**: ロケールから抽出された言語コード。ロケールが指定されていない場合は空文字列（`''`）を返します。

## 使用例

### 言語コードの抽出:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 出力: "en"
getLocaleLang(Locales.ENGLISH); // 出力: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 出力: "fr"
getLocaleLang(Locales.FRENCH); // 出力: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 出力: "en"
getLocaleLang(Locales.ENGLISH); // 出力: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 出力: "fr"
getLocaleLang(Locales.FRENCH); // 出力: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 出力: "en"
getLocaleLang(Locales.ENGLISH); // 出力: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 出力: "fr"
getLocaleLang(Locales.FRENCH); // 出力: "fr"
```

## エッジケース

- **ロケールが提供されていない場合:**

  - `locale` が `undefined` の場合、関数は空文字列を返します。

- **不正なロケール文字列:**
  - `locale` が `language-country` 形式に従っていない場合（例: `Locales.ENGLISH-US`）、関数は安全に `'-'` の前の部分を返すか、`'-'` が存在しない場合は文字列全体を返します。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
