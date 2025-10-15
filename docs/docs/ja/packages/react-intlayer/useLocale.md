---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale フック ドキュメント | react-intlayer
description: react-intlayer パッケージの useLocale フックの使い方を確認する
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# React統合: `useLocale` フック ドキュメント

このセクションでは、Reactアプリケーションでのロケール管理を目的とした `react-intlayer` ライブラリの `useLocale` フックについて詳しく説明します。

## Reactでの `useLocale` のインポート

`useLocale` フックを React アプリケーションに統合するには、対応するパッケージからインポートします。

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // ロケール管理のために React コンポーネントで使用
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // ロケール管理のために React コンポーネントで使用
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // ロケール管理のために React コンポーネントで使用
```

## 概要

`useLocale` フックは、React コンポーネント内でロケール設定に簡単にアクセスし操作する方法を提供します。現在のロケール、デフォルトロケール、利用可能なすべてのロケール、およびロケール設定を更新する関数にアクセスできます。

## 使用方法

React コンポーネント内で `useLocale` フックを使用する方法は以下の通りです：

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

## パラメーターと戻り値

`useLocale` フックを呼び出すと、以下のプロパティを含むオブジェクトが返されます:

- **`locale`**: Reactコンテキストで設定されている現在のロケール。
- **`defaultLocale`**: 設定で定義された主要なロケール。
- **`availableLocales`**: 設定で定義された利用可能なすべてのロケールのリスト。
- **`setLocale`**: アプリケーションのコンテキスト内で現在のロケールを更新するための関数。

## 例

この例は、`useLocale` フックを使用してロケールスイッチャーをレンダリングし、ユーザーがアプリケーションのロケールを動的に変更できるコンポーネントを示しています。

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## 結論

`react-intlayer` の `useLocale` フックは、React アプリケーションでロケールを管理するための重要なツールであり、さまざまな国際的なユーザーに効果的に対応するための機能を提供します。
