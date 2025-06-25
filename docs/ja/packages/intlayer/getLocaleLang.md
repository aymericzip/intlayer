---
docName: package__intlayer__getLocaleLang
url: /doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t関数のドキュメント | intlayer
description: intlayerパッケージのt関数の使用方法を確認してください
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
---

# ドキュメント: `getLocaleLang` 関数 in `intlayer`

## 説明

`getLocaleLang` 関数は、ロケール文字列から言語コードを抽出します。国コードの有無にかかわらずロケールをサポートします。ロケールが指定されていない場合は、デフォルトで空の文字列を返します。

## パラメータ

- `locale?: Locales`

  - **説明**: 言語コードが抽出されるロケール文字列（例: `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`）。
  - **型**: `Locales`（オプション）

## 戻り値

- **型**: `string`
- **説明**: ロケールから抽出された言語コード。ロケールが指定されていない場合は、空の文字列（`''`）を返します。

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

- **ロケールが指定されていない場合:**

  - `locale` が `undefined` の場合、関数は空の文字列を返します。

- **不正なロケール文字列:**
  - `locale` が `language-country` フォーマット（例: `Locales.ENGLISH-US`）に従わない場合、関数は安全に `'-'` の前の部分、または `'-'` が存在しない場合は文字列全体を返します。

[詳細はこちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/getLocaleLang.md)
