---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getConfiguration 関数ドキュメント | intlayer
description: intlayer パッケージの getConfiguration 関数の使い方を解説
keywords:
  - getConfiguration
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
  - getConfiguration
---

# ドキュメント: `intlayer` の `getConfiguration` 関数

## 説明

`getConfiguration` 関数は、環境変数を抽出することで `intlayer` アプリケーションの全体設定を取得します。この関数は、クライアント側とサーバー側の両方で同じ設定を使用できる柔軟性を提供し、アプリケーション全体の一貫性を確保します。

---

## パラメーター

この関数はパラメーターを受け取りません。代わりに、環境変数を使用して設定を行います。

### 戻り値

- **型**: `IntlayerConfig`
- **説明**: `intlayer` の完全な設定を含むオブジェクトです。設定には以下のセクションが含まれます:

  - `internationalization`: ロケールや厳格モードに関連する設定。
  - `middleware`: URLおよびクッキー管理に関連する設定。
  - `content`: コンテンツファイル、ディレクトリ、およびパターンに関連する設定。
  - `editor`: エディター固有の設定。

詳細については、[Intlayer設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

---

## 使用例

### 完全な設定の取得

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// 出力例:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// 出力例:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// 出力例:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### `availableLocales` と `defaultLocale` の抽出

設定の `internationalization` セクションは、`locales`（利用可能なロケール）や `defaultLocale`（フォールバック言語）などのロケール関連の設定を提供します。

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 出力例: ["en", "fr", "es"]
console.log(defaultLocale); // 出力例: "en"
console.log(cookieName); // 出力: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 出力例: ["en", "fr", "es"]
console.log(defaultLocale); // 出力例: "en"
console.log(cookieName); // 出力: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 出力例: ["en", "fr", "es"]
console.log(defaultLocale); // 出力例: "en"
console.log(cookieName); // 出力: "INTLAYER_LOCALE"
```

## 注意事項

- この関数を呼び出す前に、必要なすべての環境変数が正しく設定されていることを確認してください。環境変数が不足していると、初期化時にエラーが発生します。
- この関数はクライアント側とサーバー側の両方で使用可能であり、設定を統一的に管理するための多用途なツールです。

## アプリケーションでの使用方法

`getConfiguration` 関数は、`intlayer` アプリケーションの設定を初期化および管理するための重要なユーティリティです。ロケール、ミドルウェア、コンテンツディレクトリなどの設定へのアクセスを提供することで、多言語対応およびコンテンツ駆動型アプリケーションにおいて、一貫性とスケーラビリティを確保します。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
