# Documentation: `getLocalizedUrl` Function in `intlayer`

## 説明:

`getLocalizedUrl` 関数は、指定されたロケールで与えられた URL をプレフィックスしてローカライズされた URL を生成します。絶対 URL と相対 URL の両方を処理し、設定に基づいて適切なロケールプレフィックスが適用されることを保証します。

---

## パラメータ:

- `url: string`

  - **説明**: ロケールでプレフィックスを付ける元の URL 文字列。
  - **型**: `string`

- `currentLocale: Locales`

  - **説明**: URL がローカライズされている現在のロケール。
  - **型**: `Locales`

- `locales: Locales[]`

  - **説明**: サポートされているロケールのオプションの配列。デフォルトでは、プロジェクトで設定されたロケールが提供されます。
  - **型**: `Locales[]`
  - **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#middleware)

- `defaultLocale: Locales`

  - **説明**: アプリケーションのデフォルトロケール。デフォルトでは、プロジェクトで設定されたデフォルトロケールが提供されます。
  - **型**: `Locales`
  - **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#middleware)

- `prefixDefault: boolean`
  - **説明**: デフォルトロケールの URL にプレフィックスを付けるかどうか。デフォルトでは、プロジェクトで設定された値が提供されます。
  - **型**: `boolean`
  - **デフォルト**: [`プロジェクト設定`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#middleware)

### 戻り値:

- **型**: `string`
- **説明**: 指定されたロケールのローカライズされた URL。

---

## 使用例:

### 相対 URL:

```typescript
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 出力: "/fr/about" フランス語ロケールの場合
// 出力: "/about" デフォルト（英語）ロケールの場合
```

### 絶対 URL:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  false // デフォルトロケールプレフィックス
); // 出力: "https://example.com/fr/about" フランス語の場合

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  false // デフォルトロケールプレフィックス
); // 出力: "https://example.com/about" 英語の場合

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  true // デフォルトロケールプレフィックス
); // 出力: "https://example.com/en/about" 英語の場合
```

### サポートされていないロケール:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH // デフォルトロケール
); // 出力: "/about" (サポートされていないロケールのためプレフィックスなし)
```

---

## エッジケース:

- **ロケールセグメントなし:**

  - URL にロケールセグメントが含まれていない場合、関数は適切なロケールで安全にプレフィックスを付けます。

- **デフォルトロケール:**

  - `prefixDefault` が `false` の場合、関数はデフォルトロケールの URL にプレフィックスを付けません。

- **サポートされていないロケール:**
  - `locales` にリストされていないロケールの場合、関数はプレフィックスを適用しません。

---

## アプリケーションでの使用:

多言語アプリケーションでは、`locales` および `defaultLocale` で国際化設定を構成することが、正しい言語が表示されるために重要です。以下は、アプリケーションセットアップで `getLocalizedUrl` を使用する方法の例です。

```tsx
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

上記の構成により、アプリケーションは `ENGLISH`、`FRENCH`、および `SPANISH` をサポートされている言語として認識し、`ENGLISH` をフォールバック言語として使用します。

この構成を使用して、`getLocalizedUrl` 関数はユーザーの言語設定に基づいて動的にローカライズされた URL を生成できます。

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 出力: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 出力: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 出力: "/about"
```

`getLocalizedUrl` を統合することで、開発者は複数の言語で一貫した URL 構造を維持でき、ユーザーエクスペリエンスと SEO を向上させることができます。
