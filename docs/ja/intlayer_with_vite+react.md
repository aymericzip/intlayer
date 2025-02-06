# はじめに Intlayer と Vite と React を使った国際化 (i18n)

## Intlayer とは何ですか？

**Intlayer** は、現代のウェブアプリケーションにおける多言語サポートを簡素化するために設計された革新的でオープンソースの国際化 (i18n) ライブラリです。

Intlayer を使用すると、次のことができます。

- **コンポーネントレベルで宣言的な辞書を使用して、翻訳を簡単に管理**できます。
- **メタデータ、ルートおよびコンテンツを動的にローカライズ**できます。
- **自動生成された型で TypeScript サポートを確保**し、オートコンプリートとエラーチェックを向上させます。
- **動的ロケールの検出と切り替え**のような高度な機能を利用できます。

---

## Vite および React アプリケーションに Intlayer をセットアップするステップバイステップガイド

### ステップ 1: 依存関係のインストール

npm を使用して必要なパッケージをインストールします：

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

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)、トランスパイレーション、および [CLI コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md) のための国際化ツールを提供するコアパッケージです。

- **react-intlayer**
  Intlayer を React アプリケーションに統合するためのパッケージです。React 国際化のためのコンテキストプロバイダーとフックを提供します。また、[Vite バンドラー](https://vite.dev/guide/why.html#why-bundle-for-production) と Intlayer を統合するための Vite プラグイン、ユーザーの優先ロケールの検出、クッキーの管理、URL リダイレクトを処理するためのミドルウェアを含みます。

### ステップ 2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // その他のロケール
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
      // その他のロケール
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
      // その他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされた URL、ミドルウェアのリダイレクト、クッキーの名前、コンテンツ宣言の場所と拡張子、コンソール内の Intlayer ログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### ステップ 3: Vite 設定に Intlayer を統合

設定に intlayer プラグインを追加します。

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

> `intlayerPlugin()` Vite プラグインは、Vite と Intlayer を統合するために使用されます。これは、コンテンツ宣言ファイルのビルドを確実に行い、開発モードでそれらを監視します。Vite アプリケーション内で Intlayer 環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

### ステップ 4: コンテンツを宣言する

翻訳を保存するためにコンテンツ宣言を作成および管理します：

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import type { ReactNode } from "react";

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
      // Reactノードを使用する場合は、Reactをインポートすることを忘れないでください
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
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

    edit:
      t <
      ReactNode >
      {
        // Reactノードを使用する場合は、Reactをインポートすることを忘れないでください
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

/** @type {import('intlayer').DeclarationContent} */
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

    edit:
      t <
      ReactNode >
      {
        // Reactノードを使用する場合は、Reactをインポートすることを忘れないでください
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
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）内に含まれている限り、アプリケーション内の任意の場所に定義できます。コンテンツ宣言ファイルの拡張子は、デフォルトでは `.content.{ts,tsx,js,jsx,mjs,cjs}` でなければなりません。
> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md) を参照してください。
> コンテンツファイルに TSX コードが含まれている場合は、コンテンツファイルに `import React from "react";` をインポートすることを検討してください。

### ステップ 5: コード内で Intlayer を利用する

アプリケーション全体でコンテンツ辞書にアクセスします：

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

> `string` 属性（例: `alt`, `title`, `href`, `aria-label` など）でコンテンツを使用する場合は、関数の値を呼び出す必要があります。例えば：
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` フックについて詳しくは、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

### (オプション) ステップ 6: コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale` フックによって提供される `setLocale` 関数を使用します。この関数を使うと、アプリケーションのロケールを設定し、コンテンツをそれに応じて更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> `useLocale` フックについて詳しくは、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

### (オプション) ステップ 7: アプリケーションにローカライズされたルーティングを追加する

このステップの目的は、各言語のためにユニークなルートを作成することです。これはSEOとSEOフレンドリーなURLに役立ちます。
例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> デフォルトでは、ルートはデフォルトロケールのためにプレフィックスが付与されていません。デフォルトロケールにプレフィックスを付けたい場合は、設定の `middleware.prefixDefault` オプションを `true` に設定できます。詳細については、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md) を参照してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールに基づくルーティングを処理する `LocaleRouter` コンポーネントを作成します。以下は、[React Router](https://reactrouter.com/home) を使用した例です：

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 必要な依存関係と関数をインポート
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer'のユーティリティ関数と型
import type { FC, PropsWithChildren } from "react"; // 関数コンポーネントとプロパティのためのReact型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキスト用のプロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーションを管理するためのルータコンポーネント

// Intlayer から設定を分割
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 現在のURLパスを取得
  const { locale } = useParams<{ locale: Locales }>(); // URLからロケールパラメータを抽出

  // 現在のロケールを決定し、提供されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // ベースパスを構築するために、パスからロケールプレフィックスを削除
  const pathWithoutLocale = getPathWithoutLocale(
    path // 現在のURLパス
  );

  /**
   * middleware.prefixDefault が true の場合、デフォルトロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトのロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 現在の履歴のエントリを新しいもので置き換え
        />
      );
    }

    // 子要素を IntlayerProvider でラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault が false の場合、デフォルトロケールはプレフィックスされない。
     * 現在のロケールが有効であり、デフォルトロケールでないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストに含まれるか確認
    ) {
      // ロケールプレフィックスなしでパスにリダイレクト
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 子要素を IntlayerProvider でラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ロケール特有のルートを設定するルーティングコンポーネント。
 * React Router を使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // ロケールをキャプチャするためのルートパターン（例: /en/, /fr/）およびすべての後続のパスをマッチ
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子要素をラップ
      />

      {
        // デフォルトロケールのプレフィックスが無効な場合、ルートパスに直接子要素をレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子要素をラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 必要な依存関係と関数をインポート
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer'のユーティリティ関数と型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキスト用のプロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーションを管理するためのルータコンポーネント

// Intlayer から設定を分割
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 現在のURLパスを取得
  const { locale } = useParams(); // URLからロケールパラメータを抽出

  // 現在のロケールを決定し、提供されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // ベースパスを構築するために、パスからロケールプレフィックスを削除
  const pathWithoutLocale = getPathWithoutLocale(
    path // 現在のURLパス
  );

  /**
   * middleware.prefixDefault が true の場合、デフォルトロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトのロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 現在の履歴のエントリを新しいもので置き換え
        />
      );
    }

    // 子要素を IntlayerProvider でラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault が false の場合、デフォルトロケールはプレフィックスされない。
     * 現在のロケールが有効であり、デフォルトロケールでないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストに含まれるか確認
    ) {
      // ロケールプレフィックスなしでパスにリダイレクト
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 子要素を IntlayerProvider でラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ロケール特有のルートを設定するルーティングコンポーネント。
 * React Router を使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // ロケールをキャプチャするためのルートパターン（例: /en/, /fr/）およびすべての後続のパスをマッチ
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子要素をラップ
      />

      {
        // デフォルトロケールのプレフィックスが無効な場合、ルートパスに直接子要素をレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子要素をラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 必要な依存関係と関数をインポート
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // 'intlayer'のユーティリティ関数と型
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 国際化コンテキスト用のプロバイダー
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // ナビゲーションを管理するためのルータコンポーネント

// Intlayer から設定を分割
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 現在のURLパスを取得
  const { locale } = useParams(); // URLからロケールパラメータを抽出

  // 現在のロケールを決定し、提供されていない場合はデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // ベースパスを構築するために、パスからロケールプレフィックスを削除
  const pathWithoutLocale = getPathWithoutLocale(
    path // 現在のURLパス
  );

  /**
   * middleware.prefixDefault が true の場合、デフォルトロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトのロケールにリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 現在の履歴のエントリを新しいもので置き換え
        />
      );
    }

    // 子要素を IntlayerProvider でラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault が false の場合、デフォルトロケールはプレフィックスされない。
     * 現在のロケールが有効であり、デフォルトロケールでないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // デフォルトロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストに含まれるか確認
    ) {
      // ロケールプレフィックスなしでパスにリダイレクト
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 子要素を IntlayerProvider でラップし、現在のロケールを設定
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * ロケール特有のルートを設定するルーティングコンポーネント。
 * React Router を使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // ロケールをキャプチャするためのルートパターン（例: /en/, /fr/）およびすべての後続のパスをマッチ
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子要素をラップ
      />

      {
        // デフォルトロケールのプレフィックスが無効な場合、ルートパスに直接子要素をレンダリング
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // ロケール管理で子要素をラップ
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

並行して、`intLayerMiddlewarePlugin` を使用してアプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインは、URL に基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザーの言語設定に基づいて最も適切なロケールを決定します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトされます。

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

### (オプション) ステップ 8: ロケールが変更されるときにURLを変更する

ロケールが変更されるときにURLを変更するには、`useLocale` フックによって提供される `onLocaleChange` プロパティを使用できます。同時に、`react-router-dom` の `useLocation` および `useNavigate` フックを使用してURLパスを更新できます。

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
  const location = useLocation(); // 現在のURLパスを取得します。例: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 更新されたロケールでURLを構築
    // 例: ロケールがスペイン語に設定されている場合: /es/about
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
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 言語のロケール - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: Francés（現在のロケールが Locales.SPANISH に設定される） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自分のロケールでの言語 - 例: FR */}
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
  const location = useLocation(); // 現在のURLパスを取得します。例: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // 更新されたロケールでURLを構築
    // 例: ロケールがスペイン語に設定されている場合: /es/about
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
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 言語のロケール - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: Francés（現在のロケールが Locales.SPANISH に設定される） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自分のロケールでの言語 - 例: FR */}
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
  const location = useLocation(); // 現在のURLパスを取得します。例: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // 更新されたロケールでURLを構築
    // 例: ロケールがスペイン語に設定されている場合: /es/about
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
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 言語のロケール - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: Francés（現在のロケールが Locales.SPANISH に設定される） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 自分のロケールでの言語 - 例: FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> ドキュメントの参照：
>
> - [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` フック](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### TypeScriptの設定

Intlayer は、TypeScript の利点を活用し、コードベースを強化するためのモジュール拡張を使用します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript の設定ファイルに自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // カスタム設定
  "include": [
    "src",
    "types", // <- 自動生成された型を含める
  ],
}
```

### Git の設定

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、それらを Git リポジトリにコミットするのを避けることができます。

これを行うには、次の指示を `.gitignore` ファイルに追加できます：

```plaintext
# Intlayer によって生成されたファイルを無視する
.intlayer
```
