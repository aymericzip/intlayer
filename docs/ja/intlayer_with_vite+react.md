# Getting Started Internationalizing (i18n) with Intlayer and Vite and React

## What is Intlayer?

**Intlayer**は、現代のウェブアプリケーションにおける多言語サポートを簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用すると、次のことができます。

- **宣言的辞書を使用して簡単に翻訳を管理**できます。
- **メタデータ、ルート、およびコンテンツを動的にローカライズ**できます。
- **自動生成された型によるTypeScriptサポートを保証**し、自動補完およびエラー検出を向上させます。
- **動的ロケール検出と切り替え**などの高度な機能の恩恵を享受できます。

---

## Step-by-Step Guide to Set Up Intlayer in a Vite and React Application

### Step 1: Install Dependencies

必要なパッケージをnpmを使用してインストールします。

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

アプリケーションの言語を設定するための設定ファイルを作成します。

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールを追加してください
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

すべての利用可能なパラメータについては、[configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### Step 3: Integrate Intlayer in Your Vite Configuration

設定にintlayerプラグインを追加します。

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

### Step 4: Declare Your Content

コンテンツ辞書を作成して管理します。

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // 内容にReactノードを使用する場合は、Reactをインポートすることを忘れないでください
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

> 注: コンテンツファイルにTSXコードが含まれる場合は、コンテンツファイルに`import React from "react";`をインポートすることを検討してください。

[See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)。

### Step 5: Utilize Intlayer in Your Code

アプリケーション全体でコンテンツ辞書にアクセスします。

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> 注: `alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使用する場合は、関数の値を呼び出す必要があります。次のようになります。
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optional) Step 6: Change the language of your content

コンテンツの言語を変更するには、`useLocale`フックによって提供される`setLocale`関数を使用できます。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx
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

### (Optional) Step 7: Add localized Routing to your application

このステップの目的は、各言語のユニークなルートを作成することです。これはSEOおよびSEOフレンドリーなURLに役立ちます。
例：

```tsx
// /dashboard
// /es/dashboard
// /fr/dashboard
```

> デフォルトのロケールには、ルートがプレフィックスされていません。デフォルトのロケールをプレフィックスしたい場合は、設定の`middleware.prefixDefault`オプションを`true`に設定できます。詳細については、[configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールベースのルーティングを処理する`LocaleRouter`コンポーネントを作成できます。以下は、[React Router](https://reactrouter.com/home)を使用した例です。

```tsx
// 必要な依存関係と関数のインポート
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
import { FC, PropsWithChildren } from "react"; // 関数型コンポーネントとプロップのためのReact型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキストのためのプロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーションを管理するためのルータコンポーネント

// Intlayerから設定を分解
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * ローカライズ処理を管理し、適切なロケールコンテキストで子をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 現在のURLパスを取得
  const { locale } = useParams<{ locale: Locales }>(); // URLからロケールパラメータを抽出

  // 現在のロケールを決定し、指定されていない場合はデフォルトに戻ります
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールプレフィックスを除去してベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    path // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールにリダイレクトします
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 現在の履歴エントリを新しいものに置き換えます
        />
      );
    }

    // IntlayerProviderで子をラップし、現在のロケールを設定します
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトロケールはプレフィックスされません。
     * 現在のロケールが有効であり、デフォルトロケールでないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストに含まれているか確認
    ) {
      // ロケールプレフィックスのないパスにリダイレクト
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProviderで子をラップし、現在のロケールを設定します
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ローカライズされたルートをセットアップするためのルータコンポーネント。
 * ナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングするためにReact Routerを使用します。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // ロケールをキャプチャするルートパターン（例：/en/、/fr/）とその後のすべてのパスに一致
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // ローカル管理で子をラップします
      />

      {
        // デフォルトロケールのプレフィックスが無効な場合、ルートパスに直接子をレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // ローカル管理で子をラップします
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

並行して、intLayerMiddlewarePluginを使用してアプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインは、URLに基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、このプラグインはユーザーのブラウザ言語の設定に基づいて最も適切なロケールを決定します。ロケールが検出されない場合は、デフォルトロケールにリダイレクトします。

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optional) Step 8: Change the URL when the locale changes

ロケールが変更されたときにURLを変更するには、`useLocale`フックによって提供される`onLocaleChange`プロップを使用できます。並行して、`react-router-dom`からの`useLocation`および`useNavigate`フックを使用してURLパスを更新することができます。

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // 現在のURLパスを取得。例: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 更新されたロケールでURLを構築
    // 例: /es/aboutをスペイン語のロケールに設定
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URLパスを更新
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

### Configure TypeScript

Intlayerは、TypeScriptの利点を得るためにモジュール拡張を使用し、コードベースを強化します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScriptの設定に自動生成された型を含めるようにしてください。

```json5
// tsconfig.json

{
  // あなたのカスタム設定
  include: [
    "src",
    "types", // <- 自動生成された型を含める
  ],
}
```

### Git Configuration

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、これらのファイルをGitリポジトリにコミットするのを避けることができます。

これを行うには、次の指示を`.gitignore`ファイルに追加できます。

```plaintext
# Intlayerによって生成されたファイルを無視
.intlayer
```
