---
docName: package__intlayer__getLocalizedUrl
url: /doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t関数のドキュメント | intlayer
description: intlayerパッケージのt関数の使用方法を確認してください
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
---

# ドキュメント: `getLocalizedUrl` 関数 in `intlayer`

## 説明

`getLocalizedUrl` 関数は、指定されたロケールをプレフィックスとして付加することでローカライズされたURLを生成します。この関数は絶対URLと相対URLの両方を処理し、設定に基づいて正しいロケールプレフィックスが適用されることを保証します。

---

## パラメータ

- `url: string`

  - **説明**: ロケールをプレフィックスとして付加する元のURL文字列。
  - **型**: `string`

- `currentLocale: Locales`

  - **説明**: URLをローカライズするための現在のロケール。
  - **型**: `Locales`

- `locales: Locales[]`

  - **説明**: サポートされているロケールのオプション配列。デフォルトでは、プロジェクトで設定されたロケールが提供されます。
  - **型**: `Locales[]`
  - **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#middleware)

- `defaultLocale: Locales`

  - **説明**: アプリケーションのデフォルトロケール。デフォルトでは、プロジェクトで設定されたデフォルトロケールが提供されます。
  - **型**: `Locales`
  - **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#middleware)

- `prefixDefault: boolean`
  - **説明**: デフォルトロケールのURLにプレフィックスを付加するかどうか。デフォルトでは、プロジェクトで設定された値が提供されます。
  - **型**: `boolean`
  - **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#middleware)

### 戻り値

- **型**: `string`
- **説明**: 指定されたロケールのローカライズされたURL。

---

## 使用例

### 相対URL

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 出力: "/fr/about" (フランス語ロケールの場合)
// 出力: "/about" (デフォルトの英語ロケールの場合)
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

// 出力: "/fr/about" (フランス語ロケールの場合)
// 出力: "/about" (デフォルトの英語ロケールの場合)
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

// 出力: "/fr/about" (フランス語ロケールの場合)
// 出力: "/about" (デフォルトの英語ロケールの場合)
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

// 出力: "/fr/about" (フランス語ロケールの場合)
// 出力: "/about" (デフォルトの英語ロケールの場合)
```

### 絶対URL

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  false // デフォルトロケールのプレフィックス
); // 出力: "https://example.com/fr/about" (フランス語の場合)

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  false // デフォルトロケールのプレフィックス
); // 出力: "https://example.com/about" (英語の場合)

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  true // デフォルトロケールのプレフィックス
); // 出力: "https://example.com/en/about" (英語の場合)
```

### サポートされていないロケール

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH // デフォルトロケール
); // 出力: "/about" (サポートされていないロケールにはプレフィックスが適用されません)
```

---

## エッジケース

- **ロケールセグメントなし:**

  - URLにロケールセグメントが含まれていない場合、関数は適切なロケールを安全にプレフィックスします。

- **デフォルトロケール:**

  - `prefixDefault` が `false` の場合、関数はデフォルトロケールのURLにプレフィックスを付加しません。

- **サポートされていないロケール:**
  - `locales` にリストされていないロケールの場合、関数はプレフィックスを適用しません。

---

## アプリケーションでの使用

多言語対応アプリケーションでは、`locales` と `defaultLocale` を設定することで、正しい言語が表示されるようにすることが重要です。以下は、アプリケーション設定で `getLocalizedUrl` を使用する例です:

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

この設定を使用すると、`getLocalizedUrl` 関数はユーザーの言語設定に基づいて動的にローカライズされたURLを生成できます:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 出力: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 出力: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 出力: "/about"
```

`getLocalizedUrl` を統合することで、開発者は複数言語間で一貫したURL構造を維持し、ユーザーエクスペリエンスとSEOを向上させることができます。
