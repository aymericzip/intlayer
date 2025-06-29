---
docName: package__react-intlayer__useLocale
url: https://intlayer.org/doc/packages/react-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocaleフックのドキュメント | react-intlayer
description: react-intlayerパッケージのuseLocaleフックの使い方を参照してください
keywords:
  - useLocale
  - 辞書
  - キー
  - Intlayer
  - 国際化
  - 文書
  - Next.js
  - JavaScript
  - React
---

# React統合: `useLocale`フックのドキュメント

このセクションでは、Reactアプリケーションでロケール管理を行うために設計された`react-intlayer`ライブラリの`useLocale`フックに関する包括的な詳細を提供します。

## Reactでの`useLocale`のインポート

Reactアプリケーションに`useLocale`フックを統合するには、対応するパッケージからインポートします:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Reactコンポーネントでロケール管理に使用
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Reactコンポーネントでロケール管理に使用
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Reactコンポーネントでロケール管理に使用
```

## 概要

`useLocale`フックは、Reactコンポーネント内でロケール設定にアクセスし、操作するための簡単な方法を提供します。現在のロケール、デフォルトのロケール、利用可能なすべてのロケール、およびロケール設定を更新するための関数にアクセスできます。

## 使用方法

以下は、Reactコンポーネント内で`useLocale`フックを使用する方法の例です:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

export default LocaleSwitcher;
```

## パラメータと戻り値

`useLocale`フックを呼び出すと、以下のプロパティを含むオブジェクトが返されます:

- **`locale`**: Reactコンテキストで設定されている現在のロケール。
- **`defaultLocale`**: 設定で定義された主要なロケール。
- **`availableLocales`**: 設定で定義された利用可能なすべてのロケールのリスト。
- **`setLocale`**: アプリケーションのコンテキスト内で現在のロケールを更新するための関数。

## 例

この例では、`useLocale`フックを使用してロケールスイッチャーをレンダリングし、ユーザーがアプリケーションのロケールを動的に変更できるようにするコンポーネントを示します:

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

`react-intlayer`の`useLocale`フックは、Reactアプリケーションでロケールを管理するための重要なツールであり、さまざまな国際的なオーディエンスにアプリケーションを効果的に適応させるために必要な機能を提供します。
