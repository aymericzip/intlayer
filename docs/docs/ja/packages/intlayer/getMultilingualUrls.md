---
docName: package__intlayer__getMultilingualUrls
url: https://intlayer.org/doc/packages/intlayer/getMultilingualUrls
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getMultilingualUrls.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t関数のドキュメント | intlayer
description: intlayerパッケージのt関数の使用方法を確認してください
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

# ドキュメント: `getMultilingualUrls` 関数 in `intlayer`

## 説明

`getMultilingualUrls` 関数は、指定された URL に各サポートされているロケールをプレフィックスとして付加することで、多言語 URL のマッピングを生成します。この関数は絶対 URL と相対 URL の両方を処理でき、提供された設定またはデフォルトに基づいて適切なロケールプレフィックスを適用します。

---

## パラメータ

- `url: string`

  - **説明**: ロケールをプレフィックスとして付加する元の URL 文字列。
  - **型**: `string`

- `locales: Locales[]`

  - **説明**: サポートされているロケールのオプション配列。プロジェクトで設定されたロケールがデフォルトです。
  - **型**: `Locales[]`
  - **デフォルト**: `localesDefault`

- `defaultLocale: Locales`

  - **説明**: アプリケーションのデフォルトロケール。プロジェクトで設定されたデフォルトロケールがデフォルトです。
  - **型**: `Locales`
  - **デフォルト**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **説明**: デフォルトロケールをプレフィックスするかどうか。プロジェクトで設定された値がデフォルトです。
  - **型**: `boolean`
  - **デフォルト**: `prefixDefaultDefault`

### 戻り値

- **型**: `IConfigLocales<string>`
- **説明**: 各ロケールを対応する多言語 URL にマッピングするオブジェクト。

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

### 絶対 URL

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

  - 関数は URL から既存のロケールセグメントを削除してから多言語マッピングを生成します。

- **デフォルトロケール:**

  - `prefixDefault` が `false` の場合、デフォルトロケールの URL にプレフィックスを付加しません。

- **サポートされていないロケール:**
  - `locales` 配列に提供されたロケールのみが URL の生成に考慮されます。

---

## アプリケーションでの使用

多言語アプリケーションでは、`locales` と `defaultLocale` を使用して国際化設定を構成することが、正しい言語を表示するために重要です。以下は、アプリケーション設定で `getMultilingualUrls` を使用する例です:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// サポートされているロケールとデフォルトロケールの設定
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
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

上記の設定により、アプリケーションは `ENGLISH`、`FRENCH`、`SPANISH` をサポート言語として認識し、`ENGLISH` をフォールバック言語として使用します。

この設定を使用して、`getMultilingualUrls` 関数はアプリケーションのサポートされているロケールに基づいて動的に多言語 URL マッピングを生成できます:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// 出力:
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
// 出力:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

`getMultilingualUrls` を統合することで、開発者は複数の言語にわたる一貫した URL 構造を維持し、ユーザーエクスペリエンスと SEO を向上させることができます。
