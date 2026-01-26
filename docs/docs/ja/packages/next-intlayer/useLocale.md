---
createdAt: 2024-08-11
updatedAt: 2026-01-26
title: useLocale フックドキュメント | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: `onLocaleChange` のデフォルト値を `replace` に設定
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴初期化
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

## パラメーター

`useLocale` フックは以下のパラメーターを受け入れます。

- **`onLocaleChange`**: ロケールが変更されたときに URL をどのように更新するかを決定する文字列です。`"replace"`、`"push"`、または `"none"` を指定できます。

  > 例を挙げてみましょう：
  >
  > 1. あなたは現在 `/fr/home` にいます
  > 2. `/fr/about` へ移動します
  > 3. ロケールを `/es/about` に変更します
  > 4. ブラウザの「戻る」ボタンをクリックします
  >
  > `onLocaleChange` の値によって動作が異なります：
  >
  > - `"replace"` (デフォルト): 現在の URL を新しいローカライズされた URL に置き換え、Cookie を設定します。
  >   -> 「戻る」ボタンは `/es/home` へ戻ります
  > - `"push"`: 新しいローカライズされた URL をブラウザの履歴に追加し、Cookie を設定します。
  >   -> 「戻る」ボタンは `/fr/about` へ戻ります
  > - `"none"`: URL を変更せずに、クライアントコンテキストのロケールのみを更新し、Cookie を設定します。
  >   -> 「戻る」ボタンは `/fr/home` へ戻ります
  > - `(locale) => void`: Cookie を設定し、ロケールが変更されたときに呼び出されるカスタム関数を実行します。
  >
  >   `undefined` オプションはデフォルトの動作です。新しいロケールへの移動には `Link` コンポーネントの使用を推奨しています。
  >   例：
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     私たちについて
  >   </Link>
  >   ```

## 戻り値

- **`locale`**: React コンテキストで設定されている現在のロケール。
- **`defaultLocale`**: 設定で定義された主要なロケール。
- **`availableLocales`**: 設定で定義された利用可能なすべてのロケールのリスト。
- **`setLocale`**: アプリケーションのロケールを変更し、それに応じてURLを更新する関数です。プレフィックスのルールを考慮し、設定に基づいてパスにロケールを追加するかどうかを管理します。`next/navigation` の `useRouter` を利用して、`push` や `refresh` といったナビゲーション機能を実装しています。
- **`pathWithoutLocale`**: ロケールを除いたパスを返す計算プロパティです。URLを比較する際に便利です。例えば、現在のロケールが `fr` で、URLが `fr/my_path` の場合、ロケールを除いたパスは `/my_path` となります。現在のパスを取得するために `next/navigation` の `usePathname` を利用しています。

## 結論

`next-intlayer` の `useLocale` フックは、Next.js アプリケーションでロケールを管理するための重要なツールです。ロケールの保存、状態管理、URL の変更をシームレスに処理することで、複数のロケールに対応したアプリケーションを統合的に適応させるアプローチを提供します。
