---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t関数のドキュメント | intlayer
description: intlayerパッケージのt関数の使用方法を確認してください
keywords:
  - getEnumeration
  - 翻訳
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# ドキュメント: `getEnumeration` 関数 in `intlayer`

## 説明

`getEnumeration` 関数は、列挙オブジェクト内の事前定義された条件に基づいて、特定の数量に対応するコンテンツを取得します。条件はキーとして定義され、オブジェクト内の順序によって優先順位が決まります。

## パラメータ

- `enumerationContent: QuantityContent<Content>`

  - **説明**: キーが条件（例: `<=`, `<`, `>=`, `=`）を表し、値が対応するコンテンツを表すオブジェクト。キーの順序が一致の優先順位を定義します。
  - **型**: `QuantityContent<Content>`
    - `Content` は任意の型を取ることができます。

- `quantity: number`

  - **説明**: `enumerationContent` 内の条件と一致させるために使用される数値。
  - **型**: `number`

## 戻り値

- **型**: `Content`
- **説明**: `enumerationContent` 内の最初に一致する条件に対応するコンテンツ。一致が見つからない場合、実装に基づいて（例: エラーやフォールバックコンテンツ）処理されます。

## 使用例

### 基本的な使用法

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "You have less than -2.3", // -2.3以下の場合
    "<1": "You have less than one", // 1未満の場合
    "2": "You have two", // 2の場合
    ">=3": "You have three or more", // 3以上の場合
  },
  2
);

console.log(content); // 出力: "You have two"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "You have less than one", // 1未満の場合
    "2": "You have two", // 2の場合
    ">=3": "You have three or more", // 3以上の場合
  },
  2
);

console.log(content); // 出力: "You have two"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "You have less than one", // 1未満の場合
    "2": "You have two", // 2の場合
    ">=3": "You have three or more", // 3以上の場合
  },
  2
);

console.log(content); // 出力: "You have two"
```

### 条件の優先順位

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "You have less than four", // 4未満の場合
    "2": "You have two", // 2の場合
  },
  2
);

console.log(content); // 出力: "You have less than four"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "You have less than four", // 4未満の場合
    "2": "You have two", // 2の場合
  },
  2
);

console.log(content); // 出力: "You have less than four"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "You have less than four", // 4未満の場合
    "2": "You have two", // 2の場合
  },
  2
);

console.log(content); // 出力: "You have less than four"
```

## エッジケース

- **一致する条件がない場合:**

  - 提供された数量に一致する条件がない場合、関数は `undefined` を返すか、明示的にデフォルト/フォールバックシナリオを処理します。

- **曖昧な条件:**

  - 条件が重複している場合、最初に一致する条件（オブジェクトの順序に基づく）が優先されます。

- **無効なキー:**

  - 関数は、`enumerationContent` 内のすべてのキーが有効で条件として解析可能であると仮定します。無効または形式が不適切なキーは予期しない動作を引き起こす可能性があります。

- **TypeScript の強制:**
  - 関数は、すべてのキーで `Content` 型が一貫していることを保証し、取得されたコンテンツの型安全性を確保します。

## 注意事項

- `findMatchingCondition` ユーティリティは、指定された数量に基づいて適切な条件を決定するために使用されます。

[GitHub リンク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/**/*.md)
