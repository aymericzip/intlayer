---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getEnumeration 関数ドキュメント | intlayer
description: intlayer パッケージの getEnumeration 関数の使い方を確認する
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
slugs:
  - doc
  - packages
  - intlayer
  - getEnumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# ドキュメント: `intlayer` の `getEnumeration` 関数

## 説明

`getEnumeration` 関数は、列挙オブジェクト内の事前定義された条件に基づいて、特定の数量に対応するコンテンツを取得します。条件はキーとして定義されており、その優先順位はオブジェクト内の順序によって決まります。

## パラメーター

- `enumerationContent: QuantityContent<Content>`

  - **説明**: キーが条件（例: `<=`, `<`, `>=`, `=`）を表し、値が対応するコンテンツを表すオブジェクトです。キーの順序がマッチングの優先順位を定義します。
  - **型**: `QuantityContent<Content>`
    - `Content` は任意の型を取ることができます。

- `quantity: number`

  - **説明**: `enumerationContent` の条件と照合するために使用される数値です。
  - **型**: `number`

## 戻り値

- **型**: `Content`
- **説明**: `enumerationContent` 内の最初にマッチした条件に対応するコンテンツを返します。マッチが見つからない場合は、実装に基づいて処理されます（例: エラーやフォールバックコンテンツ）。

## 使用例

### 基本的な使用例

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "あなたの値は-2.3未満です",
    "<1": "あなたの値は1未満です",
    "2": "あなたの値は2です",
    ">=3": "あなたの値は3以上です",
  },
  2
);

console.log(content); // 出力: "あなたの値は2です"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "あなたの値は1未満です",
    "2": "あなたの値は2です",
    ">=3": "あなたの値は3以上です",
  },
  2
);

console.log(content); // 出力: "あなたの値は2です"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "あなたの値は1未満です",
    "2": "あなたの値は2です",
    ">=3": "あなたの値は3以上です",
  },
  2
);

console.log(content); // 出力: "あなたの値は2です"
```

### 条件の優先順位

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "あなたの値は4未満です",
    "2": "あなたの値は2です",
  },
  2
);

console.log(content); // 出力: "あなたの値は4未満です"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "あなたの値は4未満です",
    "2": "あなたの値は2です",
  },
  2
);

console.log(content); // 出力: "あなたの値は4未満です"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "あなたの値は4未満です",
    "2": "あなたの値は2です",
  },
  2
);

console.log(content); // 出力: "あなたの値は4未満です"
```

## エッジケース

- **一致する条件がない場合:**

  - 提供された数量に一致する条件がない場合、関数は `undefined` を返すか、デフォルト/フォールバックのシナリオを明示的に処理します。

- **曖昧な条件:**

  - 条件が重複する場合、最初に一致した条件（オブジェクトの順序に基づく）が優先されます。

- **無効なキー:**

  - 関数は、`enumerationContent` 内のすべてのキーが有効であり、条件として解析可能であると想定しています。無効または不適切にフォーマットされたキーは、予期しない動作を引き起こす可能性があります。

- **TypeScriptの強制:**
  - 関数は、すべてのキーにわたって `Content` 型が一貫していることを保証し、取得されるコンテンツの型安全性を確保します。

## 注意事項

- `findMatchingCondition` ユーティリティは、与えられた数量に基づいて適切な条件を決定するために使用されます。
