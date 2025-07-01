---
docName: package__intlayer__getMultilingualUrls
url: https://intlayer.org/doc/packages/intlayer/getMultilingualUrls
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getMultilingualUrls.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getMultilingualUrls 関数ドキュメント | intlayer
description: intlayer パッケージの getMultilingualUrls 関数の使い方をご覧ください
keywords:
  - getMultilingualUrls
  - 翻訳
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# ドキュメント: `intlayer` の `getMultilingualUrls` 関数

## 説明

`getMultilingualUrls` 関数は、指定された URL に各サポートされているロケールをプレフィックスとして付加することで、多言語対応の URL マッピングを生成します。絶対 URL と相対 URL の両方に対応しており、提供された設定またはデフォルトに基づいて適切なロケールプレフィックスを適用します。

---

## パラメータ

- `url: string`

  - **説明**: ロケールを付加する元の URL 文字列。
  - **型**: `string`

- `locales: Locales[]`

  - **説明**: オプションのサポートされているロケールの配列。プロジェクトで設定されたロケールがデフォルト。
  - **型**: `Locales[]`
  - **デフォルト**: `localesDefault`

- `defaultLocale: Locales`

  - **説明**: アプリケーションのデフォルトロケール。プロジェクトで設定されたデフォルトロケールがデフォルト。
  - **型**: `Locales`
  - **デフォルト**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **説明**: デフォルトロケールにプレフィックスを付けるかどうか。プロジェクトで設定された値がデフォルト。
  - **型**: `boolean`
  - **デフォルト**: `prefixDefaultDefault`

### 戻り値

- **型**: `IConfigLocales<string>`
- **説明**: 各ロケールを対応する多言語 URL にマッピングしたオブジェクト。

---

## 使用例

### 相対 URL

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// 出力: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// 出力: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// 出力: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### 絶対URL

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// 出力: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## エッジケース

- **ロケールセグメントなし:**

  - 関数は多言語マッピングを生成する前に、URLから既存のロケールセグメントを削除します。

- **デフォルトロケール:**

  - `prefixDefault` が `false` の場合、デフォルトロケールのURLにはプレフィックスを付けません。

- **サポートされていないロケール:**
  - URL生成には、`locales` 配列に指定されたロケールのみが考慮されます。

---

## アプリケーションでの使用方法

多言語対応アプリケーションでは、`locales` と `defaultLocale` を使って国際化設定を行うことが、正しい言語表示を保証するために重要です。以下は、`getMultilingualUrls` をアプリケーション設定で使用する例です:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// 対応ロケールとデフォルトロケールの設定
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// 国際化設定のためのコンフィグオブジェクト
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // サポートするロケール一覧
    defaultLocale: Locales.ENGLISH, // デフォルトロケール
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// 国際化設定のためのコンフィグオブジェクト
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // サポートするロケール一覧
    defaultLocale: Locales.ENGLISH, // デフォルトロケール
  },
};

module.exports = config;
```

上記の設定により、アプリケーションは `ENGLISH`、`FRENCH`、`SPANISH` をサポート言語として認識し、`ENGLISH` をフォールバック言語として使用します。

この設定を使用すると、`getMultilingualUrls` 関数はアプリケーションのサポートロケールに基づいて多言語URLマッピングを動的に生成できます。

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// 出力例:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// 出力例:
// {
//   en: "https://example.com/en/dashboard",

module.exports = config;
```

上記の設定により、アプリケーションは `ENGLISH`、`FRENCH`、および `SPANISH` をサポート言語として認識し、`ENGLISH` をフォールバック言語として使用します。

この設定を使用すると、`getMultilingualUrls` 関数はアプリケーションのサポートされているロケールに基づいて、多言語のURLマッピングを動的に生成できます。

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// 出力例:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }
```

上記の設定により、アプリケーションは `ENGLISH`、`FRENCH`、`SPANISH` をサポート言語として認識し、`ENGLISH` をフォールバック言語として使用します。

この設定を使用すると、`getMultilingualUrls` 関数はアプリケーションのサポートされているロケールに基づいて多言語URLマッピングを動的に生成できます：

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// 出力例:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// 出力例:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

`getMultilingualUrls` を統合することで、開発者は複数言語にわたって一貫したURL構造を維持でき、ユーザー体験とSEOの両方を向上させることができます。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
