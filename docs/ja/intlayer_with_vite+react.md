# IntlayerとViteおよびReactを使用した国際化（i18n）の開始

## Intlayerとは？

**Intlayer**は、モダンなウェブアプリケーションでの多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用すると、以下のことが可能です：

- **コンポーネントレベルで宣言的な辞書を使用して翻訳を簡単に管理**。
- **メタデータ、ルート、およびコンテンツを動的にローカライズ**。
- **TypeScriptサポートを確保**し、自動生成された型で補完機能とエラー検出を向上。
- **高度な機能を活用**、例えば動的なロケール検出と切り替え。

---

## ViteとReactアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

### ステップ1: 依存関係のインストール

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer react-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer vite-intlayer
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を提供するコアパッケージ。

- **react-intlayer**
  IntlayerをReactアプリケーションと統合するためのパッケージ。Reactの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  [Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)とIntlayerを統合するためのViteプラグインを含み、ユーザーの優先ロケールを検出し、クッキーを管理し、URLリダイレクションを処理するミドルウェアを提供します。

### ステップ2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### ステップ3: Vite設定へのIntlayerの統合

設定にintlayerプラグインを追加します。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Viteプラグインは、IntlayerをViteと統合するために使用されます。コンテンツ宣言ファイルのビルドを確実にし、開発モードでそれらを監視します。また、Viteアプリケーション内でIntlayer環境変数を定義し、パフォーマンスを最適化するためのエイリアスを提供します。

### ステップ4: コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ja: "Viteロゴ",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ja: "Reactロゴ",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ja: "カウントは ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      ja: (
        <>
          <code>src/App.tsx</code>を編集して保存し、HMRをテストしてください
        </>
      ),
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
      ja: "ViteとReactのロゴをクリックして詳細を確認してください",
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ja: "Viteロゴ",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ja: "Reactロゴ",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ja: "カウントは ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Reactノードをコンテンツで使用する場合はReactをインポートすることを忘れないでください
        ja: (
          <>
            <code>src/App.tsx</code>を編集して保存し、HMRをテストしてください
          </>
        ),
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
      },

    readTheDocs: t({
      ja: "ViteとReactのロゴをクリックして詳細を確認してください",
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ja: "Viteロゴ",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ja: "Reactロゴ",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ja: "カウントは ",
      en: "count is ",
      fr: "le compte est ",
---

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "ja": "Vite ロゴ"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React",
        "ja": "React ロゴ"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "ja": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "ja": "カウントは "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "ja": "src/App.tsx を編集して保存し、HMR をテストしてください"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "ja": "Vite と React のロゴをクリックして詳細を確認してください"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトでは `./src`）に含まれている限り、アプリケーション内のどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトでは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。  
> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)を参照してください。  
> コンテンツファイルに TSX コードが含まれている場合は、`import React from "react";` をコンテンツファイルにインポートすることを検討してください。

### ステップ 5: コード内で Intlayer を利用する

アプリケーション全体でコンテンツ辞書にアクセスします:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
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
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
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
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
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
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> `alt`、`title`、`href`、`aria-label` などの `string` 属性でコンテンツを使用する場合、関数の値を呼び出す必要があります。例えば:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

### （オプション）ステップ 6: コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale` フックが提供する `setLocale` 関数を使用します。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>言語を英語に変更</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
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

> `useLocale`フックについて詳しくは、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

### (オプション) ステップ7: アプリケーションにローカライズされたルーティングを追加する

このステップの目的は、各言語に固有のルートを作成することです。これはSEOおよびSEOフレンドリーなURLに役立ちます。
例:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> デフォルトでは、デフォルトのロケールにはルートがプレフィックスされません。デフォルトのロケールにプレフィックスを付けたい場合は、設定で`middleware.prefixDefault`オプションを`true`に設定できます。詳細は[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールベースのルーティングを処理する`LocaleRouter`コンポーネントを作成します。以下は[React Router](https://reactrouter.com/home)を使用した例です:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 必要な依存関係と関数をインポート
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
import type { FC, PropsWithChildren } from "react"; // 関数型コンポーネントとプロップのReact型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキストのプロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーションを管理するためのルーターコンポーネント

// Intlayerから設定を分解
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得

  // 現在のロケールを決定し、指定されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // ロケールプレフィックスをパスから削除してベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトのロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトのロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものに置き換える
        />
      );
    }

    // 子要素をIntlayerProviderでラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトのロケールはプレフィックスされません。
     * 現在のロケールが有効であり、デフォルトのロケールでないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトのロケールを除外
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
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
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
            // ロケールをキャプチャし（例: /en/, /fr/）、すべての後続パスにマッチするルートパターン
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 子要素をロケール管理でラップ
          />
        ))}

      {
        // デフォルトのロケールのプレフィックスが無効な場合、ルートパスで子要素を直接レンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 子要素をロケール管理でラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 必要な依存関係と関数をインポート
import { configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキストのプロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーションを管理するためのルーターコンポーネント

// Intlayerから設定を分解
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得

  // 現在のロケールを決定し、指定されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // ロケールプレフィックスをパスから削除してベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトのロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトのロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものに置き換える
        />
      );
    }

    // 子要素をIntlayerProviderでラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefaultがfalseの場合、デフォルトのロケールはプレフィックスされません。
     * 現在のロケールが有効であり、デフォルトのロケールでないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトのロケールを除外
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
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
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
            // ロケールをキャプチャするルートパターン（例: /en/, /fr/）とその後のすべてのパスを一致させる
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 子要素をロケール管理でラップ
          />
        ))}

      {
        // デフォルトロケールのプレフィックスが無効化されている場合、子要素をルートパスで直接レンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 子要素をロケール管理でラップ
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
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 国際化コンテキストのプロバイダー
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // ナビゲーションを管理するためのルーターコンポーネント

// Intlayerからの設定を分解
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
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
     * middleware.prefixDefaultがfalseの場合、デフォルトロケールはプレフィックスされません。
     * 現在のロケールが有効であり、デフォルトロケールでないことを確認します。
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
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
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
            // ロケールをキャプチャするルートパターン（例: /en/, /fr/）とその後のすべてのパスを一致させる
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 子要素をロケール管理でラップ
          />
        ))}

      {
        // デフォルトロケールのプレフィックスが無効化されている場合、子要素をルートパスで直接レンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 子要素をロケール管理でラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

次に、アプリケーションで`LocaleRouter`コンポーネントを使用できます:

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

並行して、`intLayerMiddlewarePlugin`を使用してアプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインは、URLに基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザ言語設定に基づいて最適なロケールを決定します。ロケールが検出されない場合、デフォルトロケールにリダイレクトします。

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### （オプション）ステップ8: ロケールが変更されたときにURLを変更する

ロケールが変更されたときにURLを変更するには、`useLocale`フックで提供される`onLocaleChange`プロップを使用できます。同時に、`react-router-dom`の`useLocation`および`useNavigate`フックを使用してURLパスを更新できます。

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
  const { pathname, search } = useLocation(); // 現在のURLパスを取得。例: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 更新されたロケールでURLを構築
      // 例: /es/about?foo=bar
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
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語名 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: Francés (現在のロケールがLocales.SPANISHの場合) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
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
  const { pathname, search } = useLocation(); // 現在のURLパスを取得。例: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 更新されたロケールでURLを構築
      // 例: /es/about?foo=bar
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
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語名 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: Francés (現在のロケールがLocales.SPANISHの場合) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
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
  const { pathname, search } = useLocation(); // 現在のURLパスを取得。例: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 更新されたロケールでURLを構築
      // 例: /es/about?foo=bar
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
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語名 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: Francés (現在のロケールがLocales.SPANISHの場合) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語名 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> ドキュメント参照:
>
> - [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

---

### (オプション) ステップ 9: HTMLの言語と方向属性を切り替える

アプリケーションが複数の言語をサポートしている場合、現在のロケールに合わせて `<html>` タグの `lang` および `dir` 属性を更新することが重要です。これにより以下が保証されます:

- **アクセシビリティ**: スクリーンリーダーや支援技術は正しい `lang` 属性に依存して、コンテンツを正確に発音・解釈します。
- **テキストレンダリング**: `dir` (方向) 属性は、テキストが適切な順序でレンダリングされることを保証します（例: 英語は左から右、アラビア語やヘブライ語は右から左）。これは可読性にとって重要です。
- **SEO**: 検索エンジンはページの言語を判断するために `lang` 属性を使用し、検索結果で適切なローカライズされたコンテンツを提供します。

ロケールが変更されるたびにこれらの属性を動的に更新することで、すべてのサポート言語で一貫性があり、アクセシブルなユーザー体験を提供できます。

#### フックの実装

カスタムフックを作成してHTML属性を管理します。このフックはロケールの変更を監視し、属性を適切に更新します:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**

import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいてHTML <html> 要素の `lang` と `dir` 属性を更新します。
 * - `lang`: ページの言語をブラウザや検索エンジンに通知します。
 * - `dir`: 正しい読み順を保証します（例: 英語の場合は 'ltr'、アラビア語の場合は 'rtl'）。
 *
 * この動的な更新は、適切なテキストレンダリング、アクセシビリティ、SEOにとって重要です。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 言語属性を現在のロケールに更新します。
    document.documentElement.lang = locale;

    // 現在のロケールに基づいてテキストの方向を設定します。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * 現在のロケールに基づいてHTML <html> 要素の `lang` と `dir` 属性を更新します。
 * - `lang`: ページの言語をブラウザや検索エンジンに通知します。
 * - `dir`: 正しい読み順を保証します（例: 英語の場合は 'ltr'、アラビア語の場合は 'rtl'）。
 *
 * この動的な更新は、適切なテキストレンダリング、アクセシビリティ、SEOにとって重要です。
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 言語属性を現在のロケールに更新します。
    document.documentElement.lang = locale;

    // 現在のロケールに基づいてテキストの方向を設定します。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### アプリケーションでフックを使用する

ロケールが変更されるたびにHTML属性が更新されるように、メインコンポーネントにフックを統合します。

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // フックを適用して、ロケールに基づいて <html> タグの lang と dir 属性を更新します。
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
  // フックを適用して、ロケールに基づいて <html> タグの lang と dir 属性を更新します。
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
  // フックを適用して、ロケールに基づいて <html> タグの lang と dir 属性を更新します。
  useI18nHTMLAttributes();

  // ... 残りのコンポーネント
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

これらの変更を適用することで、アプリケーションは以下を実現します：

- 現在のロケールを正確に反映する **言語** (`lang`) 属性を保証し、SEOやブラウザの動作に重要な役割を果たします。
- ロケールに応じて **テキストの方向** (`dir`) を調整し、異なる読み順を持つ言語の可読性と使いやすさを向上させます。
- **アクセシビリティ** を向上させ、支援技術がこれらの属性に依存して最適に機能するようにします。

### （オプション）ステップ10: ローカライズされたリンクコンポーネントの作成

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタム `Link` コンポーネントを作成できます。このコンポーネントは内部URLに自動的に現在の言語をプレフィックスとして付加します。例えば、フランス語を話すユーザーが「About」ページへのリンクをクリックすると、`/about` の代わりに `/fr/about` にリダイレクトされます。

この動作は以下の理由で有用です：

- **SEOとユーザーエクスペリエンス**: ローカライズされたURLは、検索エンジンが言語別のページを正確にインデックス化し、ユーザーに好みの言語でコンテンツを提供するのに役立ちます。
- **一貫性**: アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まり、予期しない言語切り替えを防ぎます。
- **保守性**: URLのローカライズロジックを単一のコンポーネントに集中させることで、コードベースの管理が簡単になり、アプリケーションの成長に伴う拡張が容易になります。

以下は、TypeScriptで実装されたローカライズされた `Link` コンポーネントです：

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * 指定されたURLが外部リンクかどうかを確認するユーティリティ関数。
 * URLが http:// または https:// で始まる場合、外部リンクと見なされます。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用してURLにロケールをプレフィックスとして付加します（例: /fr/about）。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることを保証します。
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // リンクが内部リンクで有効な href が提供されている場合、ローカライズされたURLを取得します。
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * 指定されたURLが外部リンクかどうかを確認するユーティリティ関数。
 * URLが http:// または https:// で始まる場合、外部リンクと見なされます。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用してURLにロケールをプレフィックスとして付加します（例: /fr/about）。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることを保証します。
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {

const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // リンクが内部リンクで有効な href が提供されている場合、ローカライズされた URL を取得します。
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * 指定された URL が外部リンクかどうかを確認するユーティリティ関数。
 * URL が http:// または https:// で始まる場合、それは外部リンクと見なされます。
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用して URL にロケールをプレフィックスします (例: /ja/about)。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることが保証されます。
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // リンクが内部リンクで有効な href が提供されている場合、ローカライズされた URL を取得します。
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### 動作の仕組み

- **外部リンクの検出**:  
  ヘルパー関数 `checkIsExternalLink` は URL が外部リンクかどうかを判定します。外部リンクはローカライズを必要としないため、そのまま変更されません。

- **現在のロケールの取得**:  
  `useLocale` フックは現在のロケール (例: フランス語の場合は `fr`) を提供します。

- **URL のローカライズ**:  
  内部リンク (外部でないリンク) の場合、`getLocalizedUrl` を使用して URL に現在のロケールを自動的にプレフィックスします。これにより、ユーザーがフランス語を使用している場合、`/about` を `href` として渡すと `/fr/about` に変換されます。

- **リンクの返却**:  
  コンポーネントはローカライズされた URL を持つ `<a>` 要素を返し、ロケールに一致したナビゲーションを保証します。

この `Link` コンポーネントをアプリケーション全体で統合することで、一貫性があり言語に配慮したユーザー体験を維持しつつ、SEO と使いやすさを向上させることができます。

### TypeScript の設定

Intlayer はモジュール拡張を使用して TypeScript の利点を活用し、コードベースを強化します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 設定に自動生成された型を含めてください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Git の設定

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、それらを Git リポジトリにコミットするのを避けることができます。

これを行うには、以下の指示を `.gitignore` ファイルに追加します:

```plaintext
# Intlayer によって生成されたファイルを無視
.intlayer
```

### さらに進む

さらに進むために、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md) を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md) を使用してコンテンツを外部化することができます。
