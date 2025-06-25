---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useLocaleフックのドキュメント | next-intlayer
description: next-intlayerパッケージのuseLocaleフックの使用方法を確認してください
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

# Next.js統合: `useLocale`フックのドキュメント for `next-intlayer`

このセクションでは、`next-intlayer`ライブラリ内でNext.jsアプリケーション向けに調整された`useLocale`フックの詳細なドキュメントを提供します。これは、ロケールの変更とルーティングを効率的に処理するよう設計されています。

## Next.jsでの`useLocale`のインポート

Next.jsアプリケーションで`useLocale`フックを利用するには、以下のようにインポートします:

```javascript
import { useLocale } from "next-intlayer"; // Next.jsでロケールとルーティングを管理するために使用
```

## 使用方法

Next.jsコンポーネント内で`useLocale`フックを実装する方法は以下の通りです:

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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
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

## パラメータと戻り値

`useLocale`フックを呼び出すと、以下のプロパティを含むオブジェクトが返されます:

- **`locale`**: Reactコンテキストで設定された現在のロケール。
- **`defaultLocale`**: 設定で定義された主要なロケール。
- **`availableLocales`**: 設定で定義された利用可能なすべてのロケールのリスト。
- **`setLocale`**: アプリケーションのロケールを変更し、URLを更新するための関数。設定に基づいて、パスにロケールを追加するかどうかのルールを処理します。`next/navigation`の`useRouter`を利用して、`push`や`refresh`などのナビゲーション機能を提供。
- **`pathWithoutLocale`**: ロケールなしのパスを返す計算プロパティ。URLを比較する際に便利です。例えば、現在のロケールが`fr`で、URLが`fr/my_path`の場合、ロケールなしのパスは`/my_path`です。現在のパスを取得するために`next/navigation`の`usePathname`を利用。

## 結論

`next-intlayer`の`useLocale`フックは、Next.jsアプリケーションでロケールを管理するための重要なツールです。ロケールの保存、状態管理、URLの変更をシームレスに処理する統合的なアプローチを提供します。
