---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocalizedUrl 関数ドキュメント | intlayer
description: intlayer パッケージの getLocalizedUrl 関数の使い方をご覧ください
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
---

# ドキュメント: `intlayer` の `getLocalizedUrl` 関数

## 説明

`getLocalizedUrl` 関数は、指定されたロケールを与えられた URL の前に付加することでローカライズされた URL を生成します。絶対 URL と相対 URL の両方を処理し、設定に基づいて正しいロケールのプレフィックスが適用されることを保証します。

---

## パラメーター

- `url: string`

  - **説明**: ロケールのプレフィックスを付加する元の URL 文字列。
  - **型**: `string`

- `currentLocale: Locales`

  - **説明**: URL をローカライズする対象の現在のロケール。
  - **型**: `Locales`

- `locales: Locales[]`

  - **説明**: サポートされているロケールのオプション配列。デフォルトでは、プロジェクトで設定されたロケールが提供されます。
  - **型**: `Locales[]`
  - **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md#middleware)

- `defaultLocale: Locales`

  - **説明**: アプリケーションのデフォルトロケール。デフォルトでは、プロジェクトで設定されたデフォルトロケールが提供されます。
  - **型**: `Locales`
  - **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md#middleware)

- `prefixDefault: boolean`
  - **説明**: デフォルトロケールの URL にプレフィックスを付けるかどうか。デフォルトでは、プロジェクトで設定された値が提供されます。
  - **型**: `boolean`
  - **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md#middleware)

### 戻り値

- **型**: `string`
- **説明**: 指定されたロケールに対応するローカライズされた URL。

---

## 使用例

### 相対 URL

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 出力: フランス語ロケールの場合 "/fr/about"
// 出力: デフォルト（英語）ロケールの場合 "/about"
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 出力: フランス語ロケールの場合 "/fr/about"
// 出力: デフォルト（英語）ロケールの場合 "/about"
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 出力: フランス語ロケールの場合 "/fr/about"
// 出力: デフォルト（英語）ロケールの場合 "/about"
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 出力: フランス語ロケールの場合 "/fr/about"
// 出力: デフォルト（英語）ロケールの場合 "/about"
```

### 絶対URL

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  false // デフォルトロケールにプレフィックスを付けるかどうか
); // フランス語の場合の出力: "https://example.com/fr/about"

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  false // デフォルトロケールにプレフィックスを付けるかどうか
); // 英語の場合の出力: "https://example.com/about"

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  true // デフォルトロケールにプレフィックスを付けるかどうか
); // 英語の場合の出力: "https://example.com/en/about"
```

### サポートされていないロケール

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH // デフォルトロケール
); // 出力: "/about"（サポートされていないロケールにはプレフィックスが適用されません）
```

---

## エッジケース

- **ロケールセグメントがない場合:**

  - URLにロケールセグメントが含まれていない場合、関数は適切なロケールを安全にプレフィックスします。

- **デフォルトロケール:**

  - `prefixDefault` が `false` の場合、関数はデフォルトロケールのURLにプレフィックスを付けません。

- **サポートされていないロケール:**
  - `locales` にリストされていないロケールには、関数はプレフィックスを適用しません。

---

## アプリケーションでの使用方法

多言語対応アプリケーションでは、`locales` と `defaultLocale` を使用して国際化設定を構成することが、正しい言語を表示するために非常に重要です。以下は、`getLocalizedUrl` をアプリケーションのセットアップでどのように使用できるかの例です。

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

上記の設定により、アプリケーションは `ENGLISH`、`FRENCH`、`SPANISH` をサポート言語として認識し、フォールバック言語として `ENGLISH` を使用します。

この設定を使用すると、`getLocalizedUrl` 関数はユーザーの言語設定に基づいて動的にローカライズされたURLを生成できます：

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 出力: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 出力: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 出力: "/about"
```

`getLocalizedUrl` を統合することで、開発者は複数言語にわたって一貫したURL構造を維持でき、ユーザー体験とSEOの両方を向上させることができます。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
