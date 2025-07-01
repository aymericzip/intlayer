---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale フックドキュメント | next-intlayer
description: next-intlayer パッケージの useLocale フックの使い方を解説
keywords:
  - useLocale
  - 辞書
  - キー
  - Intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# Next.js 統合: `next-intlayer` の `useLocale` フックドキュメント

このセクションでは、`next-intlayer` ライブラリ内の Next.js アプリケーション向けにカスタマイズされた `useLocale` フックの詳細なドキュメントを提供します。これはロケールの変更とルーティングを効率的に処理するよう設計されています。

## Next.js での `useLocale` のインポート

Next.js アプリケーションで `useLocale` フックを利用するには、以下のようにインポートします。

```javascript
import { useLocale } from "next-intlayer"; // Next.js でロケールとルーティングを管理するために使用
```

## 使い方

Next.js コンポーネント内で `useLocale` フックを実装する方法は以下の通りです。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>現在のロケール: {locale}</h1>
      <p>デフォルトロケール: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>現在のロケール: {locale}</h1>
      <p>デフォルトのロケール: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>現在のロケール: {locale}</h1>
      <p>デフォルトのロケール: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## パラメーターと戻り値

`useLocale` フックを呼び出すと、以下のプロパティを含むオブジェクトが返されます。

- **`locale`**: React コンテキストで設定されている現在のロケール。
- **`defaultLocale`**: 設定で定義された主要なロケール。
- **`availableLocales`**: 設定で定義された利用可能なすべてのロケールのリスト。
- **`setLocale`**: アプリケーションのロケールを変更し、それに応じてURLを更新する関数です。プレフィックスのルールを考慮し、設定に基づいてパスにロケールを追加するかどうかを管理します。`next/navigation` の `useRouter` を利用して、`push` や `refresh` といったナビゲーション機能を実装しています。
- **`pathWithoutLocale`**: ロケールを除いたパスを返す計算プロパティです。URLを比較する際に便利です。例えば、現在のロケールが `fr` で、URLが `fr/my_path` の場合、ロケールを除いたパスは `/my_path` となります。現在のパスを取得するために `next/navigation` の `usePathname` を利用しています。

## 結論

`next-intlayer` の `useLocale` フックは、Next.js アプリケーションでロケールを管理するための重要なツールです。ロケールの保存、状態管理、URL の変更をシームレスに処理することで、複数のロケールに対応したアプリケーションを統合的に適応させるアプローチを提供します。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
