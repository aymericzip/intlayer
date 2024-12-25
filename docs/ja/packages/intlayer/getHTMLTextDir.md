# Documentation: `getHTMLTextDir` 関数 in `intlayer`

## 説明:

`getHTMLTextDir` 関数は、提供されたロケールに基づいてテキスト方向（`ltr`、`rtl`、または `auto`）を決定します。これは、開発者がHTMLの `dir` 属性を適切に設定し、テキストを正しくレンダリングするのに役立つように設計されています。

## パラメータ:

- `locale?: Locales`

  - **説明**: テキスト方向を決定するために使用されるロケール文字列（例: `Locales.ENGLISH`, `Locales.ARABIC`）。
  - **型**: `Locales`（オプショナル）

## 戻り値:

- **型**: `Dir` （`'ltr' | 'rtl' | 'auto'`）
- **説明**: ロケールに対応するテキスト方向:
  - `'ltr'` 左から右への言語の場合。
  - `'rtl'` 右から左への言語の場合。
  - `'auto'` ロケールが認識されない場合。

## 使用例:

### テキスト方向の決定:

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 出力: "ltr"
getHTMLTextDir(Locales.FRENCH); // 出力: "ltr"
getHTMLTextDir(Locales.ARABIC); // 出力: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 出力: "ltr"
getHTMLTextDir(Locales.FRENCH); // 出力: "ltr"
getHTMLTextDir(Locales.ARABIC); // 出力: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // 出力: "ltr"
getHTMLTextDir(Locales.FRENCH); // 出力: "ltr"
getHTMLTextDir(Locales.ARABIC); // 出力: "rtl"
```

## エッジケース:

- **ロケールが提供されない場合:**

  - `locale` が `undefined` の場合、関数は `'auto'` を返します。

- **認識されないロケール:**
  - 認識されないロケールの場合、関数は `'auto'` にデフォルト設定します。

## コンポーネント内での使用:

`getHTMLTextDir` 関数は、ロケールに基づいてHTMLドキュメント内の `dir` 属性を動的に設定するのに使用できます。

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

上記の例では、`dir` 属性はロケールに基づいて動的に設定されています。
