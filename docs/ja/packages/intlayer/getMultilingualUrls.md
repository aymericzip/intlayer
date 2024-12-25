# Documentation: `getMultilingualUrls` Function in `intlayer`

## 説明:

`getMultilingualUrls` 関数は、指定された URL に各サポートされているロケールでプレフィックスを付けることによって、マルチリンガル URL のマッピングを生成します。この関数は、絶対 URL と相対 URL の両方を処理でき、提供された設定やデフォルトに基づいて適切なロケールプレフィックスを適用します。

---

## パラメータ:

- `url: string`

  - **説明**: ロケールでプレフィックスを付ける元の URL 文字列。
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
  - **説明**: デフォルトロケールにプレフィックスを付けるかどうか。プロジェクトで設定された値がデフォルトです。
  - **型**: `boolean`
  - **デフォルト**: `prefixDefaultDefault`

### 戻り値:

- **型**: `IConfigLocales<string>`
- **説明**: 各ロケールをその対応するマルチリンガル URL へマッピングしたオブジェクト。

---

## 使用例:

### 相対 URL:

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

### 絶対 URL:

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

## エッジケース:

- **ロケールセグメントなし:**

  - 関数は、マルチリンガルマッピングを生成する前に、URL から既存のロケールセグメントを削除します。

- **デフォルトロケール:**

  - `prefixDefault` が `false` のとき、関数はデフォルトロケールの URL にプレフィックスを付けません。

- **サポートされていないロケール:**
  - `locales` 配列で提供されたロケールのみが URL の生成に考慮されます。

---

## アプリケーションでの使用:

マルチリンガルアプリケーションでは、`locales` と `defaultLocale` で国際化設定を構成することが、正しい言語を表示するために重要です。以下は、アプリケーションセットアップで `getMultilingualUrls` を使用する方法の例です:

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

上記の設定により、アプリケーションは `ENGLISH`、`FRENCH`、および `SPANISH` をサポートされている言語として認識し、`ENGLISH` をフォールバック言語として使用します。

この設定を使用して、`getMultilingualUrls` 関数はアプリケーションのサポートされているロケールに基づいてマルチリンガル URL マッピングを動的に生成できます:

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

`getMultilingualUrls` を統合することで、開発者は複数の言語で一貫した URL 構造を維持でき、ユーザーエクスペリエンスと SEO の両方を向上させます。
