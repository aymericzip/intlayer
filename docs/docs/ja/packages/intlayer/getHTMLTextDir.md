---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getHTMLTextDir 関数ドキュメント | intlayer
description: intlayer パッケージの getHTMLTextDir 関数の使い方を確認する
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
slugs:
  - doc
  - packages
  - intlayer
  - getHTMLTextDir
---

# ドキュメント: `intlayer` の `getHTMLTextDir` 関数

## 説明

`getHTMLTextDir` 関数は、指定されたロケールに基づいてテキストの方向（`ltr`、`rtl`、または `auto`）を決定します。これは、開発者がHTMLの `dir` 属性を適切に設定してテキストを正しく表示できるように設計されています。

## パラメーター

- `locale?: Locales`

  - **説明**: テキスト方向を決定するために使用されるロケール文字列（例：`Locales.ENGLISH`、`Locales.ARABIC`）。
  - **型**: `Locales`（オプション）

## 戻り値

- **型**: `Dir`（`'ltr' | 'rtl' | 'auto'`）
- **説明**: ロケールに対応するテキスト方向：
  - 左から右への言語の場合は `'ltr'`。
  - 右から左への言語の場合は `'rtl'`。
  - ロケールが認識されない場合は `'auto'`。

## 使用例

### テキスト方向の判定

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

- **認識されないロケールの場合:**
  - 認識されないロケールの場合、関数はデフォルトで `'auto'` を返します。

## コンポーネントでの使用方法:

`getHTMLTextDir` 関数は、ロケールに基づいて適切なテキストレンダリングのために HTML ドキュメントの `dir` 属性を動的に設定するために使用できます。

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

// localeに基づいてdir属性を動的に設定するHTMLレイアウトコンポーネント
const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

上記の例では、`dir`属性がlocaleに基づいて動的に設定されています。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
