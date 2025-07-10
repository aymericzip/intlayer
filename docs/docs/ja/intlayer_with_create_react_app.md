---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Create React App (CRA)のウェブサイトを翻訳する (i18n)
description: Create React App (CRA) を使用したウェブサイトを多言語化する方法を見つけましょう。国際化（i18n）して翻訳するためにドキュメントに従ってください。
keywords:
  - 国際化
  - 文書
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
---

# IntlayerとReact Create Appを使用した国際化(i18n)の開始方法

[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-react-cra-template)をGitHubで見る。

## Intlayerとは？

**Intlayer**は、モダンなWebアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用すると、以下が可能です：

- **コンポーネントレベルで宣言的な辞書を使用して翻訳を簡単に管理**。
- **メタデータ、ルート、コンテンツを動的にローカライズ**。
- **自動生成された型でTypeScriptサポートを確保**し、オートコンプリートやエラー検出を向上。
- **動的なロケール検出や切り替え**などの高度な機能を活用。

## ReactアプリケーションでのIntlayerセットアップ手順

### ステップ1: 依存関係をインストール

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)を提供する国際化ツールのコアパッケージ。

- **react-intlayer**

  ReactアプリケーションとIntlayerを統合するためのパッケージ。Reactの国際化のためのコンテキストプロバイダーとフックを提供。

- **react-scripts-intlayer**

Create React AppベースのアプリケーションにIntlayerを統合するための`react-scripts-intlayer`コマンドとプラグインを含みます。これらのプラグインは[craco](https://craco.js.org/)に基づいており、[Webpack](https://webpack.js.org/)バンドラーの追加設定を含みます。

### ステップ2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: CRA設定へのIntlayerの統合

スクリプトをreact-intlayerを使用するように変更します：

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-scripts-intlayer`スクリプトは[CRACO](https://craco.js.org/)に基づいています。Intlayer cracoプラグインに基づいて独自のセットアップを実装することもできます。[こちらの例を参照](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

### ステップ4: コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ja: "Reactを学ぶ",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      ja: "編集を始めましょう",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ja: "Reactを学ぶ",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      ja: "編集を始めましょう",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ja: "Reactを学ぶ",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトでは`./src`）に含まれる限り、アプリケーション内のどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトでは`.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

> コンテンツファイルにTSXコードが含まれている場合は、`import React from "react";`をコンテンツファイルにインポートすることを検討してください。

### ステップ5: コード内でIntlayerを利用

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> 注意: `alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使用したい場合は、関数の値を呼び出す必要があります。例：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```
>
> `useIntlayer`フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

### (オプション) ステップ6: コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale`フックが提供する`setLocale`関数を使用します。この関数を使うことで、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>言語を英語に変更</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>言語を英語に変更</button>
  );
};
```

> `useLocale`フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

### (オプション) ステップ7: アプリケーションにローカライズされたルーティングを追加

このステップの目的は、各言語にユニークなルートを作成することです。これはSEOやSEOフレンドリーなURLに役立ちます。
例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> デフォルトでは、デフォルトロケールにはルートがプレフィックスされません。デフォルトロケールをプレフィックスしたい場合は、設定で`middleware.prefixDefault`オプションを`true`に設定できます。詳細については、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールベースのルーティングを処理する`LocaleRouter`コンポーネントを作成します。以下は[React Router](https://reactrouter.com/home)を使用した例です：

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 必要な依存関係と関数をインポート
// 必要な依存関係と関数をインポート
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
import type { FC, PropsWithChildren } from "react"; // Reactの型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキスト用プロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーション管理用のルーターコンポーネント

// Intlayerからの設定を分解
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * ローカライズを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得

  // 現在のロケールを決定し、指定されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールプレフィックスを削除してベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものに置き換え
        />
      );
    }

    // 子要素をIntlayerProviderでラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトロケールはプレフィックスされない。
     * 現在のロケールが有効であり、デフォルトロケールでないことを確認。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールリストに含まれているか確認
    ) {
      // ロケールプレフィックスなしのパスにリダイレクト
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 子要素をIntlayerProviderでラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリング。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // ロケールをキャプチャするルートパターン（例：/en/、/fr/）とその後のすべてのパスを一致
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // ロケール管理で子要素をラップ
          />
        ))}

      {
        // デフォルトロケールのプレフィックスが無効な場合、ルートパスで直接子要素をレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // ロケール管理で子要素をラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 必要な依存関係と関数をインポート
import { configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
// 'intlayer'からのユーティリティ関数と型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキスト用プロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーション管理用のルーターコンポーネント

// Intlayerからの設定を分解
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * ローカライズを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得

  // 現在のロケールを決定し、指定されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールプレフィックスを削除してベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものに置き換え
        />
      );
    }

    // 子要素をIntlayerProviderでラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトロケールはプレフィックスされない。
     * 現在のロケールが有効であり、デフォルトロケールでないことを確認。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールリストに含まれているか確認
    ) {
      // ロケールプレフィックスなしのパスにリダイレクト
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 子要素をIntlayerProviderでラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリング。
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // ロケールをキャプチャするルートパターン（例：/en/、/fr/）とその後のすべてのパスを一致
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // ロケール管理で子要素をラップ
          />
        ))}

      {
        // デフォルトロケールのプレフィックスが無効な場合、ルートパスで直接子要素をレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // ロケール管理で子要素をラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 必要な依存関係と関数をインポート
const { configuration, getPathWithoutLocale } = require("intlayer"); // 'intlayer'からのユーティリティ関数と型
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 国際化コンテキスト用プロバイダー
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // ナビゲーション管理用のルーターコンポーネント

// Intlayerからの設定を分解
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * ローカライズを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理。
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得

  // 現在のロケールを決定し、指定されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールプレフィックスを削除してベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスされるべき。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものに置き換え
        />
      );
    }

    // 子要素をIntlayerProviderでラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトロケールはプレフィックスされない。
     * 現在のロケールが有効であり、デフォルトロケールでないことを確認。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールリストに含まれているか確認
    ) {
      // ロケールプレフィックスなしのパスにリダイレクト
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 子要素をIntlayerProviderでラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリング。
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // ロケールをキャプチャするルートパターン（例：/en/、/fr/）とその後のすべてのパスを一致
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // ロケール管理で子要素をラップ
          />
        ))}

      {
        // デフォルトロケールのプレフィックスが無効な場合、ルートパスで直接子要素をレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // ロケール管理で子要素をラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

その後、アプリケーションで`LocaleRouter`コンポーネントを使用できます：

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... AppContentコンポーネント

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... AppContentコンポーネント

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... AppContentコンポーネント

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

### (オプション) ステップ8: ロケール変更時にURLを変更

ロケール変更時にURLを変更するには、`useLocale`フックが提供する`onLocaleChange`プロップを使用できます。同時に、`react-router-dom`の`useLocation`と`useNavigate`フックを使用してURLパスを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得。例：/fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 更新されたロケールでURLを構築
      // 例：/es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URLパスを更新
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* ロケール - 例：FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語 - 例：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例：Francés（現在のロケールがLocales.SPANISHの場合） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得。例：/fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 更新されたロケールでURLを構築
      // 例：/es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URLパスを更新
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* ロケール - 例：FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語 - 例：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例：Francés（現在のロケールがLocales.SPANISHの場合） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得。例：/fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 更新されたロケールでURLを構築
      // 例：/es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URLパスを更新
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* ロケール - 例：FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語 - 例：Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例：Francés（現在のロケールがLocales.SPANISHの場合） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例：French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> ドキュメント参照：
>
> - [`useLocale`フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
> - [`getLocaleName`フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl`フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir`フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang`属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current`属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### （オプション）ステップ9：HTMLの言語と言語方向属性を切り替える

アプリケーションが複数の言語をサポートしている場合、`<html>`タグの`lang`属性と`dir`属性を現在のロケールに合わせて更新することが非常に重要です。これにより、以下のことが保証されます：

- **アクセシビリティ**：スクリーンリーダーや支援技術は、正しい`lang`属性に依存してコンテンツを正確に発音および解釈します。
- **テキストレンダリング**：`dir`（方向）属性は、テキストが適切な順序でレンダリングされることを保証します（例：英語の場合は左から右、アラビア語やヘブライ語の場合は右から左）。これは読みやすさに不可欠です。
- **SEO**：検索エンジンは`lang`属性を使用してページの言語を判断し、検索結果で適切なローカライズされたコンテンツを提供します。

ロケールが変更されるたびにこれらの属性を動的に更新することで、すべてのサポート言語で一貫性があり、アクセス可能なエクスペリエンスをユーザーに提供します。

#### フックの実装

#### フックの実装

HTML属性を管理するカスタムフックを作成します。このフックはロケールの変更を監視し、属性を適切に更新します：

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいてHTML <html>要素の`lang`および`dir`属性を更新します。
 * - `lang`: ページの言語をブラウザや検索エンジンに通知。
 * - `dir`: 正しい読み順を保証（例：英語の場合は'ltr'、アラビア語の場合は'rtl'）。
 *
 * この動的更新は、適切なテキストレンダリング、アクセシビリティ、SEOに不可欠です。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいてHTML <html>要素の`lang`および`dir`属性を更新します。
 * - `lang`: ページの言語をブラウザや検索エンジンに通知。
 * - `dir`: 正しい読み順を保証（例：英語の場合は'ltr'、アラビア語の場合は'rtl'）。
 *
 * この動的更新は、適切なテキストレンダリング、アクセシビリティ、SEOに不可欠です。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 現在のロケールに言語属性を更新
    document.documentElement.lang = locale;

    // 現在のロケールに基づいてテキスト方向を設定
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 現在のロケールに言語属性を更新
    document.documentElement.lang = locale;

    // 現在のロケールに基づいてテキスト方向を設定
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * 現在のロケールに基づいてHTML <html>要素の`lang`および`dir`属性を更新します。
 * - `lang`: ページの言語をブラウザや検索エンジンに通知します。
 * - `dir`: 正しい読み順を保証します（例：英語の場合は 'ltr'、アラビア語の場合は 'rtl'）。
 *
 * この動的な更新は、適切なテキストレンダリング、アクセシビリティ、およびSEOに不可欠です。
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 現在のロケールに言語属性を更新
    document.documentElement.lang = locale;

    // 現在のロケールに基づいてテキスト方向を設定
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### アプリケーションでのフックの使用

フックをメインコンポーネントに統合し、ロケールが変更されるたびにHTML属性が更新されるようにします：

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // フックを適用してロケールに基づいて<html>タグのlangおよびdir属性を更新
  useI18nHTMLAttributes();

  // ... 残りのコンポーネント
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // フックを適用してロケールに基づいて<html>タグのlangおよびdir属性を更新
  useI18nHTMLAttributes();

  // ... 残りのコンポーネント
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // フックを適用してロケールに基づいて<html>タグのlangおよびdir属性を更新
  useI18nHTMLAttributes();

  // ... 残りのコンポーネント
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
module.exports = App;
```

これらの変更を適用することで、アプリケーションは次のことを保証します：

- **言語**（`lang`）属性が現在のロケールを正しく反映し、SEOやブラウザの動作に重要な役割を果たします。
- **テキスト方向**（`dir`）がロケールに応じて調整され、異なる読み順を持つ言語の可読性と使いやすさを向上させます。
- **アクセシビリティ**が向上し、支援技術がこれらの属性に依存して最適に機能します。

### TypeScriptの設定

Intlayerはモジュール拡張を使用してTypeScriptの利点を活用し、コードベースを強化します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)
自動生成された型を含めるようにTypeScriptの設定を確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript構成
  "include": [
    // ... 既存のTypeScript構成
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットするのを避けることができます。

これを行うには、次の指示を`.gitignore`ファイルに追加できます：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。
[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新できる**クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### さらに進む

さらに進むために、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。
[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳内容の**インラインプレビュー**。
- 翻訳を簡単に作成・更新できる**クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### さらに進むには

さらに進みたい場合は、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使ってコンテンツを外部化することができます。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
