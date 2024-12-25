# React統合: `useLocale`フックのドキュメント

このセクションでは、Reactアプリケーションにおけるロケール管理のために設計された`react-intlayer`ライブラリの`useLocale`フックに関する詳細を提供します。

## Reactでの`useLocale`のインポート

`useLocale`フックをReactアプリケーションに統合するには、対応するパッケージからインポートします：

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // ロケール管理のためにReactコンポーネントで使用
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // ロケール管理のためにReactコンポーネントで使用
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // ロケール管理のためにReactコンポーネントで使用
```

## 概要

`useLocale`フックは、Reactコンポーネント内でロケール設定を簡単にアクセスおよび操作する方法を提供します。現在のロケール、デフォルトロケール、利用可能なすべてのロケール、そしてロケール設定を更新するための関数にアクセスできます。

## 使い方

以下は、Reactコンポーネント内で`useLocale`フックの使い方です：

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

## パラメータと戻り値

`useLocale`フックを呼び出すと、次のプロパティを含むオブジェクトが返されます：

- **`locale`**: Reactコンテキストで設定された現在のロケール。
- **`defaultLocale`**: 設定で定義された主要ロケール。
- **`availableLocales`**: 設定で定義されたすべての利用可能なロケールのリスト。
- **`setLocale`**: アプリケーションのコンテキスト内で現在のロケールを更新するための関数。

## 例

この例では、`useLocale`フックを使用してロケールスイッチャーをレンダリングするコンポーネントを示し、ユーザーがアプリケーションのロケールを動的に変更できるようにします：

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale); // 新しいロケールを設定
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
    setLocale(newLocale); // 新しいロケールを設定
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
    setLocale(newLocale); // 新しいロケールを設定
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

`react-intlayer`の`useLocale`フックは、Reactアプリケーションのロケール管理において不可欠なツールであり、さまざまな国際的なオーディエンスにアプリケーションを適応させるために必要な機能を提供します。
