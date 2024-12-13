# Next.js統合: `useLocale`フックのドキュメント for `next-intlayer`

このセクションでは、`next-intlayer`ライブラリのNext.jsアプリケーション向けに調整された`useLocale`フックに関する詳細なドキュメントを提供します。これはロケールの変更とルーティングを効率的に処理するように設計されています。

## Next.jsでの`useLocale`のインポート

Next.jsアプリケーションで`useLocale`フックを利用するには、以下のようにインポートします。

```javascript
import { useLocale } from "next-intlayer"; // Next.jsでロケールとルーティングを管理するために使用
```

## 使用方法

Next.jsコンポーネント内で`useLocale`フックを実装する方法は以下の通りです。

```jsx
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

export default LocaleSwitcher;
```

## パラメータと返り値

`useLocale`フックを呼び出すと、以下のプロパティを含むオブジェクトが返されます。

- **`locale`**: Reactコンテキストで設定された現在のロケール。
- **`defaultLocale`**: 設定で定義された主要なロケール。
- **`availableLocales`**: 設定で定義されたすべての利用可能なロケールのリスト。
- **`setLocale`**: アプリケーションのロケールを変更し、URLを適切に更新するための関数。これは、設定に基づいてロケールをパスに追加するかどうかに関するプレフィックスルールを処理します。`next/navigation`からの`useRouter`を利用して、`push`や`refresh`などのナビゲーション機能を使用します。
- **`pathWithoutLocale`**: ロケールなしのパスを返す計算プロパティ。これはURLを比較するために便利です。例えば、現在のロケールが`fr`で、URLが`fr/my_path`の場合、ロケールなしのパスは`/my_path`です。現在のパスを取得するために`next/navigation`からの`usePathname`を利用します。

## 結論

`next-intlayer`の`useLocale`フックは、Next.jsアプリケーションにおけるロケール管理のための重要なツールです。これは、ロケールのストレージ、状態管理、およびURLの変更をシームレスに処理することによって、アプリケーションを複数のロケールに対応させるための統合されたアプローチを提供します。
