---
docName: package__intlayer__getHTMLTextDir
url: https://intlayer.org/doc/packages/intlayer/getHTMLTextDir
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: t関数のドキュメント | intlayer
description: intlayerパッケージのt関数の使用方法を確認してください
keywords:
  - getHTMLTextDir
  - 翻訳
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# ドキュメント: `getHTMLTextDir` 関数 in `intlayer`

## 説明

`getHTMLTextDir` 関数は、指定されたロケールに基づいてテキストの方向 (`ltr`, `rtl`, または `auto`) を決定します。この関数は、HTML内で適切なテキストレンダリングのために `dir` 属性を設定する際に役立ちます。

## パラメータ

- `locale?: Locales`

  - **説明**: テキスト方向を決定するために使用されるロケール文字列 (例: `Locales.ENGLISH`, `Locales.ARABIC`)。
  - **型**: `Locales` (オプション)

## 戻り値

- **型**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **説明**: ロケールに対応するテキスト方向:
  - `'ltr'`: 左から右に読む言語。
  - `'rtl'`: 右から左に読む言語。
  - `'auto'`: ロケールが認識されない場合。

## 使用例

### テキスト方向の決定

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

## エッジケース

- **ロケールが指定されていない場合:**

  - `locale` が `undefined` の場合、関数は `'auto'` を返します。

- **認識されないロケール:**
  - 認識されないロケールの場合、関数はデフォルトで `'auto'` を返します。

## コンポーネントでの使用:

`getHTMLTextDir` 関数は、ロケールに基づいてHTMLドキュメント内の `dir` 属性を動的に設定するために使用できます。

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

上記の例では、`dir` 属性がロケールに基づいて動的に設定されます。
