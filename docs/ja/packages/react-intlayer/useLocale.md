# React Integration: `useLocale` フック ドキュメント

このセクションでは、React アプリケーションのロケール管理を扱うために設計された `react-intlayer` ライブラリの `useLocale` フックに関する詳細を提供します。

## React での `useLocale` のインポート

`useLocale` フックを React アプリケーションに統合するには、次のようにして対応するパッケージからインポートします：

```javascript
import { useLocale } from "react-intlayer"; // ロケール管理のために React コンポーネントで使用されます
```

## 概要

`useLocale` フックは、React コンポーネント内でロケール設定にアクセスし、操作するための簡単な方法を提供します。現在のロケール、デフォルトロケール、すべての利用可能なロケール、ロケール設定を更新するための関数にアクセスできます。

## 使用方法

以下は、React コンポーネント内で `useLocale` フックを使用する方法です：

```jsx
import React from "react";
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

## パラメータと返り値

`useLocale` フックを呼び出すと、次のプロパティを含むオブジェクトが返されます：

- **`locale`**: React コンテキスト内で設定された現在のロケール。
- **`defaultLocale`**: 設定で定義された主要なロケール。
- **`availableLocales`**: 設定で定義されたすべての利用可能なロケールのリスト。
- **`setLocale`**: アプリケーションのコンテキスト内で現在のロケールを更新するための関数。

## 例

この例は、`useLocale` フックを使用してロケールスイッチャーをレンダリングするコンポーネントを示しており、ユーザーがアプリケーションのロケールを動的に変更できるようにしています：

```jsx
import { useLocale } from "react-intlayer";

function LocaleSelector() {
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
}

export default LocaleSelector;
```

## 結論

`react-intlayer` の `useLocale` フックは、React アプリケーション内のロケールを管理するための必須ツールであり、アプリケーションをさまざまな国際的な観客に効果的に適応させるために必要な機能を提供します。
