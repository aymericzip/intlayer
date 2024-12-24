# Getting Started Internationalizing (i18n) with Intlayer and React Create App

## What is Intlayer?

**Intlayer**は、モダンなウェブアプリケーションにおける多言語サポートを簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用することで：

- **コンポーネントレベルで宣言的な辞書を使用して翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **TypeScriptのサポートを保証**し、自動生成される型により、オートコンプリートとエラー検出を改善できます。
- **動的ロケール検出と切り替え**のような高度な機能を利用できます。

---

## Step-by-Step Guide to Set Up Intlayer in a React Application

### Step 1: Install Dependencies

必要なパッケージをnpmを使用してインストールします：

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Step 2: Configuration of your project

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールを追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

すべての利用可能なパラメータについては、[こちらの設定ドキュメントを参照してください](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)。

### Step 3: Integrate Intlayer in Your CRA Configuration

スクリプトを変更してreact-intlayerを使用します。

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

注意：react-intlayerのスクリプトはcracoに基づいています。独自の設定をintlayer cracoプラグインに基づいて実装することもできます。[こちらの例を参照してください](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

### Step 4: Declare Your Content

コンテンツ辞書を作成・管理します：

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

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
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

[Intlayerの宣言ファイルの宣言方法はこちらを参照してください](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)。

### Step 5: Utilize Intlayer in Your Code

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
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
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* useIntlayerフックを正しく使用するには、子コンポーネントでデータにアクセスする必要があります */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerProvider>
  );
}

export default App;
```

> Note: `alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使用したい場合は、関数の値を呼び出す必要があります。例えば：
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optional) Step 6: Change the language of your content

コンテンツの言語を変更するには、`useLocale`フックによって提供される`setLocale`関数を使用します。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.Japanese)}>
      Change Language to 日本語
    </button>
  );
};
```

### (Optional) Step 7: Add localized Routing to your application

このステップの目的は、各言語のユニークなルートを作成することです。これはSEOとSEOフレンドリーなURLに役立ちます。
例：

```tsx
// /dashboard
// /ja/dashboard
// /fr/dashboard
```

> デフォルトでは、ルートはデフォルトロケールのプレフィックスが付いていません。デフォルトロケールにプレフィックスを付けたい場合は、設定の`middleware.prefixDefault`オプションを`true`に設定できます。詳細については、[設定ドキュメントをご覧ください](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールに基づいたルーティングを処理する`LocaleRouter`コンポーネントを作成できます。以下は[React Router](https://reactrouter.com/home)を使用した例です：

```tsx
// 必要な依存関係と関数をインポート
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
import { FC, PropsWithChildren } from "react"; // 関数コンポーネントとプロップのためのReact型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキスト用のプロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーション管理のためのルーターコンポーネント

// Intlayerから設定を分解
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * ローカライズを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 現在のURLパスを取得
  const { locale } = useParams<{ locale: Locales }>(); // URLからロケールパラメータを抽出

  // 現在のロケールを決定し、指定されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールプレフィックスを削除してベースパスを構築
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスが付けられます。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // デフォルトロケールでパスを更新してリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 現在の履歴エントリを新しいもので置き換える
        />
      );
    }

    // IntlayerProviderで子要素をラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトロケールはプレフィックスが付けられません。
     * 現在のロケールが有効であり、デフォルトロケールでないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストにあるか確認
    ) {
      // ロケールプレフィックスなしでパスにリダイレクト
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProviderで子要素をラップし、現在のロケールを設定
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
        // ロケールをキャプチャするルートパターン（例：/en/、/fr/）を指定し、その後のすべてのパスと一致させます
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 子要素をロケール管理でラップ
      />

      {
        // デフォルトロケールのプレフィクシングが無効な場合、ルートパスで直接子要素をレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 子要素をロケール管理でラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Optional) Step 8: Change the URL when the locale changes

ロケールが変更されたときにURLを変更するには、`useLocale`フックによって提供される`onLocaleChange`プロパティを使用できます。同時に、`react-router-dom`から`useLocation`と`useNavigate`フックを使用してURLパスを更新できます。

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // 現在のURLパスを取得。例：/fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 更新されたロケールでURLを構築
    // 例：ロケールをスペイン語に設定した場合の/es/about
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URLパスを更新
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.Japanese)}>
      Change Language to 日本語
    </button>
  );
};
```

### Configure TypeScript

Intlayerは、TypeScriptの利点を得るためにモジュール拡張を使用し、コードベースを強化します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScriptの設定には自動生成された型を含めるようにしてください。

```json5
// tsconfig.json

{
  // あなたのカスタム設定
  "include": [
    "src",
    "types", // <- 自動生成された型を追加
  ],
}
```

### Git Configuration

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットするのを避けることができます。

これを行うには、`.gitignore`ファイルに以下の指示を追加できます：

```plaintext
# Intlayerによって生成されたファイルを無視
.intlayer
```
