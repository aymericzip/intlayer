---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getPathWithoutLocale 関数ドキュメント | intlayer
description: intlayer パッケージの getPathWithoutLocale 関数の使い方を確認する
keywords:
  - getPathWithoutLocale
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
  - getPathWithoutLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴初期化
---

# ドキュメント: `intlayer` の `getPathWithoutLocale` 関数

## 説明

指定された URL またはパス名からロケールセグメントを削除します。絶対 URL と相対パス名の両方で動作します。

## パラメーター

- `inputUrl: string`

  - **説明**: 処理する完全な URL 文字列またはパス名。
  - **型**: `string`

- `locales: Locales[]`
  - **説明**: サポートされているロケールのオプション配列。プロジェクトで設定されたロケールがデフォルトになります。
  - **型**: `Locales[]`

## 戻り値

- **型**: `string`
- **説明**: ロケールセグメントを除いた URL 文字列またはパス名。

## 使用例

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // 出力: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // 出力: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 出力: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // 出力: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // 出力: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // 出力: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 出力: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // 出力: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // 出力: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // 出力: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 出力: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // 出力: "https://example.com/dashboard"
```
