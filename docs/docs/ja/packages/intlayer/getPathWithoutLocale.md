---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t関数のドキュメント | intlayer
description: intlayerパッケージのt関数の使用方法を確認してください
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
---

# ドキュメント: `getPathWithoutLocale` 関数 in `intlayer`

## 説明

指定されたURLまたはパス名からロケールセグメントを削除します（存在する場合）。絶対URLと相対パス名の両方で動作します。

## パラメータ

- `inputUrl: string`

  - **説明**: 処理する完全なURL文字列またはパス名。
  - **型**: `string`

- `locales: Locales[]`
  - **説明**: サポートされているロケールのオプション配列。プロジェクトで設定されたロケールがデフォルトです。
  - **型**: `Locales[]`

## 戻り値

- **型**: `string`
- **説明**: ロケールセグメントを除いたURL文字列またはパス名。

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
