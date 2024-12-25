# Next.js インテグレーション: `useLocale` フックのドキュメント for `next-intlayer`

このセクションでは、`next-intlayer` ライブラリ内での Next.js アプリケーション向けに特化した `useLocale` フックの詳細なドキュメントを提供します。ロケールの変更とルーティングを効率的に処理するために設計されています。

## Next.js での `useLocale` のインポート

Next.js アプリケーションで `useLocale` フックを利用するために、次のようにインポートします。

```javascript
import { useLocale } from "next-intlayer"; // Next.js でロケールとルーティングを管理するために使用されます
```

## 使用方法

Next.js コンポーネント内で `useLocale` フックを実装する方法は次のとおりです。

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

`useLocale` フックを呼び出すと、以下のプロパティを含むオブジェクトが返されます。

- **`locale`**: React コンテキストで設定された現在のロケール。
- **`defaultLocale`**: 設定で定義された主要なロケール。
- **`availableLocales`**: 設定で定義されたすべての利用可能なロケールのリスト。
- **`setLocale`**: アプリケーションのロケールを変更し、URLを更新するための関数。設定に基づいてパスにロケールを追加するかどうかの接頭辞ルールを処理します。`next/navigation` の `useRouter` を利用して、`push` や `refresh` などのナビゲーション機能を使用します。
- **`pathWithoutLocale`**: ロケールなしのパスを返す計算プロパティ。URLを比較するのに便利です。例えば、現在のロケールが `fr` で、URL が `fr/my_path` の場合、ロケールのないパスは `/my_path` です。`next/navigation` の `usePathname` を利用して現在のパスを取得します。

## 結論

`next-intlayer` の `useLocale` フックは、Next.js アプリケーションでロケールを管理するための重要なツールです。ロケールの保存、状態管理、URLの変更をシームレスに処理し、複数のロケールに適応する統合アプローチを提供します。
