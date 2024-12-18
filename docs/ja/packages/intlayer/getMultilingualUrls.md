# Documentation: `getMultilingualUrls` Function in `intlayer`

## 説明:

`getMultilingualUrls`関数は、指定されたURLに各サポートされているロケールをプレフィックスして多言語URLのマッピングを生成します。この関数は、指定された設定またはデフォルトに基づいて適切なロケールプレフィックスを適用し、絶対URLと相対URLの両方を処理できます。

---

## パラメータ:

- `url: string`

  - **説明**: ロケールを前置する元のURL文字列。
  - **種類**: `string`

- `locales: Locales[]`

  - **説明**: サポートされているロケールのオプションの配列。プロジェクトに設定されたロケールがデフォルトとなります。
  - **種類**: `Locales[]`
  - **デフォルト**: `localesDefault`

- `defaultLocale: Locales`

  - **説明**: アプリケーションのデフォルトロケール。プロジェクトに設定されたデフォルトロケールがデフォルトとなります。
  - **種類**: `Locales`
  - **デフォルト**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **説明**: デフォルトロケールをプレフィックスすべきかどうか。プロジェクトに設定された値がデフォルトとなります。
  - **種類**: `boolean`
  - **デフォルト**: `prefixDefaultDefault`

### 戻り値:

- **種類**: `IConfigLocales<string>`
- **説明**: 各ロケールをその対応する多言語URLにマッピングするオブジェクト。

---

## 使用例:

### 相対URL:

```typescript
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

### 絶対URL:

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

  - 関数は、多言語マッピングを生成する前に、URLから既存のロケールセグメントを削除します。

- **デフォルトロケール:**

  - `prefixDefault`が`false`の場合、関数はデフォルトロケールのURLをプレフィックスしません。

- **サポートされていないロケール:**
  - `locales`配列に提供されたロケールのみがURL生成に考慮されます。

---

## アプリケーションでの使用:

多言語アプリケーションでは、`locales`および`defaultLocale`で国際化設定を構成することが、表示される正しい言語を確保するために重要です。以下は、アプリケーション設定で`getMultilingualUrls`を使用する方法の例です:

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

上記の設定により、アプリケーションは`ENGLISH`、`FRENCH`、`SPANISH`をサポートされた言語として認識し、`ENGLISH`をフォールバック言語として使用します。

この設定を使用すると、`getMultilingualUrls`関数はアプリケーションのサポートされているロケールに基づいて多言語URLマッピングを動的に生成できます:

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

`getMultilingualUrls`を統合することで、開発者は複数の言語にわたる一貫したURL構造を維持し、ユーザーエクスペリエンスとSEOの両方を向上させることができます。
