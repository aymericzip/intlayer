# Getting Started Internationalizing (i18n) with Intlayer and React Create App

## What is Intlayer?

**Intlayer**は、現代のWebアプリケーションにおける多言語サポートを簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用することで、次のことが可能になります：

- **宣言型辞書を使用して**、コンポーネントレベルで翻訳を簡単に管理することができます。
- **メタデータやルート、コンテンツを動的にローカライズ**することができます。
- **自動生成された型でTypeScriptのサポートを確保**し、自動補完やエラー検出を改善します。
- **動的なロケール検出や切り替え**などの高度な機能を活用できます。

---

## Step-by-Step Guide to Set Up Intlayer in a React Application

### Step 1: Install Dependencies

必要なパッケージをnpmを使ってインストールします：

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)、トランスパイレーション、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージです。

- **react-intlayer**

  IntlayerをReactアプリケーションに統合するパッケージです。React国際化のためのコンテキストプロバイダーおよびフックを提供します。さらに、Create React AppベースのアプリケーションにIntlayerを統合するためのプラグインも含まれています。

### Step 2: Configuration of your project

アプリケーションの言語を設定するための構成ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.SPANISH,
      // あなたの他のロケール
    ],
    defaultLocale: Locales.JAPANESE,
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
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.SPANISH,
      // あなたの他のロケール
    ],
    defaultLocale: Locales.JAPANESE,
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
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.SPANISH,
      // あなたの他のロケール
    ],
    defaultLocale: Locales.JAPANESE,
  },
};

module.exports = config;
```

> この構成ファイルを通じて、ローカライズされたURL、ミドルウェアリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、Intlayerのコンソールログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[構成ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### Step 3: Integrate Intlayer in Your CRA Configuration

スクリプトを変更してreact-intlayerを使用します。

```json fileName="package.json"
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-intlayer`スクリプトは、[craco](https://craco.js.org/)に基づいています。Intlayer cracoプラグインに基づいて独自のセットアップを実装することもできます。 [こちらの例を参照してください](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

### Step 4: Declare Your Content

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      ja: (
        <>
          <code>src/App.tsx</code>を編集して保存すると再読み込みされます
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
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      ja: "編集を始めるには",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ja: "Reactを学ぶ",
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

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      ja: "編集を始めるには",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ja: "Reactを学ぶ",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトは`./src`）に含まれる限り、アプリケーションの任意の場所で定義できます。そして、コンテンツ宣言ファイル拡張子（デフォルトは`.content.{ts,tsx,js,jsx,mjs,cjs}`）に一致します。
> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)を参照してください。
> コンテンツファイルにTSXコードが含まれている場合は、コンテンツファイルに`import React from "react";`をインポートすることを検討してください。

### Step 5: Utilize Intlayer in Your Code

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx {4,7} fileName="src/App.tsx" codeFormat="typescript"
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

> 注意: `alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使用したい場合は、関数の値を呼び出す必要があります。例えば:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer`フックについて詳しくは、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

### (Optional) Step 6: Change the language of your content

コンテンツの言語を変更するには、`useLocale`フックによって提供される`setLocale`関数を使用します。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.JAPANESE)}>
      言語を日本語に変更
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
    <button onClick={() => setLocale(Locales.JAPANESE)}>
      言語を日本語に変更
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.JAPANESE)}>
      言語を日本語に変更
    </button>
  );
};
```

> `useLocale`フックについて詳しくは、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

### (Optional) Step 7: Add localized Routing to your application

このステップの目的は、各言語のユニークなルートを作成することです。これはSEOやSEOフレンドリーなURLに便利です。
例：

```plaintext
- https://example.com/about
- https://example.com/ja/about
- https://example.com/fr/about
```

> デフォルトでは、ルートはデフォルトロケールにプレフィックスが付けられていません。デフォルトロケールにプレフィックスを追加したい場合は、構成で`middleware.prefixDefault`オプションを`true`に設定できます。[構成ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照して、詳細を確認してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールベースのルーティングを処理する`LocaleRouter`コンポーネントを作成できます。以下は[React Router](https://reactrouter.com/home)を使用した例です：

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat="typescript"
// 必要な依存関係と関数をインポート
import { Locales, getConfiguration } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
import type { FC, PropsWithChildren } from "react"; // 関数コンポーネントとプロパティのためのReact型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキストのためのプロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーションを管理するためのルーターコンポーネント

// Intlayerからの設定を分解
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子コンポーネントをラップするコンポーネント。
 * URLベースのロケール検出とバリデーションを管理します。
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 現在のURLパスを取得
  const { locale } = useParams<{ locale: Locales }>(); // URLからロケールパラメータを抽出

  // 現在のロケールを決定し、提供されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールプレフィックスを削除し、基本パスを構築
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスが付けられます。
   */
  if (middleware.prefixDefault) {
    // ロケールをバリデート
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 現在の履歴エントリを新しいもので置き換える
        />
      );
    }

    // IntlayerProviderで子コンポーネントをラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトロケールはプレフィックスが付けられていません。
     * 現在のロケールが有効であり、デフォルトロケールではないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストにあるか確認
    ) {
      // ロケールプレフィックスのないパスにリダイレクト
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProviderで子コンポーネントをラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // ロケール（例：/en/、/fr/）をキャッチし、その後のすべてのパスに一致させるルートパターン
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子コンポーネントをラップ
      />

      {
        // デフォルトロケールにプレフィックスが付けられていない場合、ルートパスでそのまま子コンポーネントをレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子コンポーネントをラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 必要な依存関係と関数をインポート
import { Locales, getConfiguration } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキストのためのプロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーションを管理するためのルーターコンポーネント

// Intlayerからの設定を分解
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子コンポーネントをラップするコンポーネント。
 * URLベースのロケール検出とバリデーションを管理します。
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 現在のURLパスを取得
  const { locale } = useParams(); // URLからロケールパラメータを抽出

  // 現在のロケールを決定し、提供されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールプレフィックスを削除し、基本パスを構築
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスが付けられます。
   */
  if (middleware.prefixDefault) {
    // ロケールをバリデート
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 現在の履歴エントリを新しいもので置き換える
        />
      );
    }

    // IntlayerProviderで子コンポーネントをラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトロケールはプレフィックスが付けられていません。
     * 現在のロケールが有効であり、デフォルトロケールではないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストにあるか確認
    ) {
      // ロケールプレフィックスのないパスにリダイレクト
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProviderで子コンポーネントをラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // ロケール（例：/en/、/fr/）をキャッチし、その後のすべてのパスに一致させるルートパターン
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子コンポーネントをラップ
      />

      {
        // デフォルトロケールにプレフィックスが付けられていない場合、ルートパスでそのまま子コンポーネントをレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子コンポーネントをラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 必要な依存関係と関数をインポート
const { Locales, getConfiguration, getPathWithoutLocale } = require("intlayer"); // 'intlayer'からのユーティリティ関数と型
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 国際化コンテキストのためのプロバイダー
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // ナビゲーションを管理するためのルーターコンポーネント

// Intlayerからの設定を分解
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子コンポーネントをラップするコンポーネント。
 * URLベースのロケール検出とバリデーションを管理します。
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 現在のURLパスを取得
  const { locale } = useParams(); // URLからロケールパラメータを抽出

  // 現在のロケールを決定し、提供されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールプレフィックスを削除し、基本パスを構築
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスが付けられます。
   */
  if (middleware.prefixDefault) {
    // ロケールをバリデート
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 現在の履歴エントリを新しいもので置き換える
        />
      );
    }

    // IntlayerProviderで子コンポーネントをラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトロケールはプレフィックスが付けられていません。
     * 現在のロケールが有効であり、デフォルトロケールではないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストにあるか確認
    ) {
      // ロケールプレフィックスのないパスにリダイレクト
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProviderで子コンポーネントをラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // ロケール（例：/en/、/fr/）をキャッチし、その後のすべてのパスに一致させるルートパターン
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子コンポーネントをラップ
      />

      {
        // デフォルトロケールにプレフィックスが付けられていない場合、ルートパスでそのまま子コンポーネントをレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子コンポーネントをラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Optional) Step 8: Change the URL when the locale changes

ロケールが変更されたときにURLを変更するには、`useLocale`フックが提供する`onLocaleChange`プロパティを使用できます。並行して、`react-router-dom`からの`useLocation`および`useNavigate`フックを使用してURLパスを更新できます。

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
  const location = useLocation(); // 現在のURLパスを取得。例: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 更新されたロケールでURLを構築
    // 例: /es/aboutをロケールがスペイン語に設定
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URLパスを更新
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自国語での言語名 - 例: 日本語 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: 日本語の言語名 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: Japanese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自国語の略称 - 例: JA */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const location = useLocation(); // 現在のURLパスを取得。例: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // 更新されたロケールでURLを構築
    // 例: /es/aboutをロケールがスペイン語に設定
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URLパスを更新
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自国語での言語名 - 例: 日本語 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: 日本語の言語名 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: Japanese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自国語の略称 - 例: JA */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const location = useLocation(); // 現在のURLパスを取得。例: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // 更新されたロケールでURLを構築
    // 例: /es/aboutをロケールがスペイン語に設定
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URLパスを更新
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 自国語での言語名 - 例: 日本語 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: 日本語の言語名 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: Japanese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自国語の略称 - 例: JA */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> ドキュメント参照：
>
> - [`useLocale`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)
> - [`getLocaleName`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir`フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang`属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current`属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Configure TypeScript

Intlayerはモジュール拡張を使ってTypeScriptの利点を活用し、コードベースをより堅牢にします。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript設定には、自動生成された型を含めるようにしてください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript構成
  "include": [
    // ... 既存のTypeScript構成
    "types", // 自動生成された型を含めます
  ],
}
```

### Git Configuration

Intlayerによって生成されたファイルは無視することをお勧めします。これにより、Gitリポジトリにコミットされるのを避けることができます。

これを行うには、次の指示を`.gitignore`ファイルに追加できます：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```
