# Documentation: `getLocalizedUrl` Function in `intlayer`

## 説明:

`getLocalizedUrl` 関数は、指定されたURLを指定されたロケールでプレフィックスすることでローカライズされたURLを生成します。絶対URLと相対URLの両方を処理し、構成に基づいて正しいロケールプレフィックスが適用されることを保証します。

---

## パラメータ:

- `url: string`

  - **説明**: ロケールでプレフィックスされる元のURL文字列。
  - **型**: `string`

- `currentLocale: Locales`

  - **説明**: URLがローカライズされる現在のロケール。
  - **型**: `Locales`

- `locales: Locales[]`

  - **説明**: サポートされるロケールのオプションの配列。デフォルトでは、プロジェクトで構成されたロケールが提供されます。
  - **型**: `Locales[]`
  - **デフォルト**: [`プロジェクトの構成`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#middleware)

- `defaultLocale: Locales`

  - **説明**: アプリケーションのデフォルトロケール。デフォルトでは、プロジェクトで構成されたデフォルトロケールが提供されます。
  - **型**: `Locales`
  - **デフォルト**: [`プロジェクトの構成`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#middleware)

- `prefixDefault: boolean`
  - **説明**: デフォルトのロケールのURLにプレフィックスを付けるかどうか。デフォルトでは、プロジェクトで構成された値が提供されます。
  - **型**: `boolean`
  - **デフォルト**: [`プロジェクトの構成`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#middleware)

### 戻り値:

- **型**: `string`
- **説明**: 指定されたロケールのローカライズされたURL。

---

## 使用例:

### 相対URL:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 出力: "/fr/about" (フランス語ロケール用)
// 出力: "/about" (デフォルト（英語）ロケール用)
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

// 出力: "/fr/about" (フランス語ロケール用)
// 出力: "/about" (デフォルト（英語）ロケール用)
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

// 出力: "/fr/about" (フランス語ロケール用)
// 出力: "/about" (デフォルト（英語）ロケール用)
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

// 出力: "/fr/about" (フランス語ロケール用)
// 出力: "/about" (デフォルト（英語）ロケール用)
```

### 絶対URL:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  false // デフォルトロケールをプレフィックスするか
); // 出力: "https://example.com/fr/about" (フランス語用)

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  false // デフォルトロケールをプレフィックスするか
); // 出力: "https://example.com/about" (英語用)

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH, // デフォルトロケール
  true // デフォルトロケールをプレフィックスするか
); // 出力: "https://example.com/en/about" (英語用)
```

### サポートされていないロケール:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // 現在のロケール
  [Locales.ENGLISH, Locales.FRENCH], // サポートされているロケール
  Locales.ENGLISH // デフォルトロケール
); // 出力: "/about" (サポートされていないロケールにはプレフィックスを適用しない)
```

---

## エッジケース:

- **ロケールセグメントなし:**

  - URLにロケールセグメントが含まれていない場合、関数は適切なロケールを安全にプレフィックスします。

- **デフォルトロケール:**

  - `prefixDefault`が`false`の場合、関数はデフォルトロケールのURLにプレフィックスを付けません。

- **サポートされていないロケール:**
  - `locales`にリストされていないロケールの場合、関数はプレフィックスを適用しません。

---

## アプリケーションでの使用方法:

多言語アプリケーションでは、`locales`と`defaultLocale`を使用して国際化設定を構成することが、適切な言語が表示されることを保証するために重要です。以下は、アプリケーションのセットアップで`getLocalizedUrl`がどのように使用されるかの例です：

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// サポートされているロケールとデフォルトロケールの構成
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

上記の構成により、アプリケーションは`ENGLISH`、`FRENCH`、`SPANISH`をサポートされている言語として認識し、`ENGLISH`をフォールバック言語として使用します。

この構成を使用すると、`getLocalizedUrl`関数はユーザーの言語設定に基づいて動的にローカライズされたURLを生成できます：

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 出力: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 出力: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 出力: "/about"
```

`getLocalizedUrl`を統合することで、開発者は複数の言語間で一貫したURL構造を維持でき、ユーザー体験とSEOの両方を向上させることができます。
