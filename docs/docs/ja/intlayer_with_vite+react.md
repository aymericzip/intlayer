---
createdAt: 2024-03-07
updatedAt: 2024-03-07
title: Vite and Reactアプリを翻訳する方法 – i18nガイド 2025
description: Intlayerを使ってViteとReactアプリケーションに国際化（i18n）を追加する方法を学びます。このガイドに従ってアプリを多言語対応にしましょう。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4---
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# IntlayerとViteとReactで始める国際化（i18n）

<iframe title="The best i18n solution for Vite and React? Discover Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vite-react-template)を参照してください。

## Intlayerとは？

**Intlayer**は、最新のウェブアプリケーションでの多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使うと、以下が可能です：

- **コンポーネントレベルで宣言的な辞書を使って** 翻訳を簡単に管理できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ** できます。
- **自動生成された型によりTypeScriptサポートを保証** し、オートコンプリートやエラー検出を向上させます。
- **動的なロケール検出や切り替えなどの高度な機能を活用** できます。

---

## ViteとReactアプリケーションでIntlayerをセットアップするステップバイステップガイド

### ステップ1: 依存関係のインストール

npmを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージです。

- **react-intlayer**
  IntlayerをReactアプリケーションと統合するパッケージです。Reactの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケール検出、クッキー管理、URLリダイレクト処理のためのミドルウェアを含みます。

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
      // 他のロケールをここに追加
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
      // 他のロケールをここに追加
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
      // 他のロケールをここに追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Vite設定にIntlayerを統合する

設定にintlayerプラグインを追加します。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードで監視されます。また、Viteアプリケーション内でIntlayerの環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスも提供します。

### ステップ4: コンテンツを宣言する

翻訳を格納するためのコンテンツ宣言を作成および管理します:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
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
      en: (
        <>
          <code>src/App.tsx</code> を編集して保存し、HMRをテストします
        </>
      ),
      fr: (
        <>
          <code>src/App.tsx</code> を編集して保存し、HMRをテストします
        </>
      ),
      es: (
        <>
          <code>src/App.tsx</code> を編集して保存し、HMRをテストします
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

/** @type {import('intlayer').Dictionary} */
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
        // コンテンツ内でReactノードを使用する場合はReactをインポートすることを忘れないでください
        en: (
          <>
            Edit <code>src/App.tsx</code>{" "}
            を編集して保存し、HMRをテストしてください
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
      en: "ViteとReactのロゴをクリックして詳細を確認してください",
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
        // コンテンツ内でReactノードを使用する場合はReactをインポートすることを忘れないでください
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
      ja: "詳細を知るには、Vite と React のロゴをクリックしてください",
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
        "es": "Logo Vite",
        "ja": "Vite ロゴ"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "ja": "React ロゴ",
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "ja": "Vite + React",
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "ja": "カウントは ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "ja": "src/App.tsx を編集して保存し、HMR をテストしてください",
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ja": "ViteとReactのロゴをクリックして詳細を学びましょう",
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> あなたのコンテンツ宣言は、`contentDir`ディレクトリ（デフォルトは`./src`）に含まれた時点で、アプリケーションのどこにでも定義できます。そして、コンテンツ宣言ファイルの拡張子（デフォルトは`.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

> コンテンツファイルにTSXコードが含まれている場合は、`import React from "react";`をコンテンツファイルにインポートすることを検討してください。

### ステップ5: コード内でIntlayerを利用する

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
            alt={content.reactLogo.value} // Reactロゴの代替テキスト
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

> もし `alt`、`title`、`href`、`aria-label` などの `string` 属性でコンテンツを使用したい場合は、関数の値を呼び出す必要があります。例えば：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

### （オプション）ステップ6: コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale` フックが提供する `setLocale` 関数を使用します。この関数を使うことで、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>英語に言語を変更</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>英語に言語を変更</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>英語に言語を変更</button>
  );
};
```

> `useLocale` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

### （オプション）ステップ7：アプリケーションにローカライズされたルーティングを追加する

このステップの目的は、各言語ごとにユニークなルートを作成することです。これはSEOやSEOに適したURLに役立ちます。
例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> デフォルトでは、ルートはデフォルトロケールに対してプレフィックスが付きません。デフォルトロケールにもプレフィックスを付けたい場合は、設定の `middleware.prefixDefault` オプションを `true` に設定できます。詳細は[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールベースのルーティングを処理する `LocaleRouter` コンポーネントを作成できます。以下は [React Router](https://reactrouter.com/home) を使用した例です。

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 必要な依存関係と関数のインポート
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
import type { FC, PropsWithChildren } from "react"; // 関数コンポーネントとプロパティのReact型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキストのプロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーション管理用のルーターコンポーネント

// Intlayerから設定を分割代入
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、子要素を適切なロケールコンテキストでラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得

  // 現在のロケールを決定し、指定がなければデフォルトロケールを使用
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールのプレフィックスを取り除き、ベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールには常にプレフィックスを付ける必要があります。
   */
  if (middleware.prefixDefault) {
    // ロケールの検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールへリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものに置き換える
        />
      );
    }

    // IntlayerProviderで子要素をラップし、現在のロケールを設定する
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
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストに含まれているかをチェック
    ) {
      // ロケールのプレフィックスなしのパスへリダイレクト
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
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
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // ロケールをキャプチャするルートパターン（例: /en/, /fr/）およびそれに続くすべてのパスにマッチ
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // ロケール管理で子要素をラップ
          />
        ))}

      {
        // デフォルトロケールのプレフィックスが無効の場合、ルートパスで直接子要素をレンダリング
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

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 必要な依存関係と関数のインポート
import { configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
// 'intlayer'からのユーティリティ関数と型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキストのプロバイダー
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // ナビゲーション管理のためのルーターコンポーネント

// Intlayerからの設定の分割代入
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
/**
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得

  // 現在のロケールを決定し、指定がなければデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールのプレフィックスを削除してベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールの検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールへリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものに置き換えます
        />
      );
    }

    // IntlayerProviderで子要素をラップし、現在のロケールを設定します
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
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストに含まれているかをチェック
    ) {
      // ロケールのプレフィックスなしのパスにリダイレクト
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
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
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // ロケールをキャプチャするルートパターン（例：/en/、/fr/）およびその後のすべてのパスにマッチ
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // ロケール管理で子要素をラップ
          />
        ))}

      {
        // デフォルトロケールのプレフィックスが無効の場合、ルートパスで直接子要素をレンダリング
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
// 必要な依存関係と関数のインポート
const { configuration, getPathWithoutLocale } = require("intlayer"); // 'intlayer'からのユーティリティ関数と型
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 国際化コンテキストのプロバイダー
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // ナビゲーション管理のためのルーターコンポーネント

// Intlayerからの設定の分割代入
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * ローカリゼーションを処理し、子要素を適切なロケールコンテキストでラップするコンポーネント。
 * URLベースのロケール検出と検証を管理する。
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 現在のURLパスを取得

  // 現在のロケールを決定。指定がなければデフォルトロケールを使用
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールのプレフィックスを取り除き、ベースパスを作成
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefaultがtrueの場合、デフォルトロケールは常にプレフィックスされるべき
   */
  if (middleware.prefixDefault) {
    // ロケールの検証
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトロケールへリダイレクト
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものに置き換えます
        />
      );
    }

    // IntlayerProviderで子要素をラップし、現在のロケールを設定します
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
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストに含まれているか確認
    ) {
      // ロケールプレフィックスなしのパスにリダイレクト
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
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
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // ロケールをキャプチャするルートパターン（例: /en/, /fr/）およびそれに続くすべてのパスにマッチ
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 子コンポーネントをロケール管理でラップします
          />
        ))}

      {
        // デフォルトロケールのプレフィックスが無効の場合、ルートパスで直接子コンポーネントをレンダリングします
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 子コンポーネントをロケール管理でラップします
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

次に、アプリケーションで `LocaleRouter` コンポーネントを使用できます:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... あなたの AppContent コンポーネント

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... あなたの AppContent コンポーネント

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... あなたの AppContent コンポーネント

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

並行して、`intlayerMiddleware` を使用してアプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインは、URL に基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザの言語設定に基づいて最も適切なロケールを判断します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトします。

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer, intlayerMiddleware } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

### （オプション）ステップ8：ロケールが変更されたときにURLを変更する

ロケールが変更されたときにURLを変更するには、`useLocale`フックが提供する`onLocaleChange`プロパティを使用できます。同時に、`react-router-dom`の`useLocation`と`useNavigate`フックを使用してURLパスを更新できます。

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

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 更新されたロケールでURLを構築する
      // 例: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URLパスを更新する
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
              {/* 現在のロケールでの言語名 - 例: Francés（現在のロケールがLocales.SPANISHの場合） */}
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
  const { pathname, search } = useLocation(); // 現在のURLパスを取得します。例: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 更新されたロケールでURLを構築します
      // 例: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URLパスを更新します
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
              {/* そのロケールでの言語名 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: Locales.SPANISH に設定された現在のロケールでの "Francés" */}
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
  const { pathname, search } = useLocation(); // 現在のURLパスを取得します。例: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 更新されたロケールでURLを構築します
      // 例: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URLパスを更新します
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
              {/* 現在のロケールでの言語名 - 例: Locales.SPANISHに設定された現在のロケールでのFrancés */}
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
> - [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Attributes/aria-current)

以下は、説明を追加しコード例を洗練させた更新版の**ステップ9**です。

---

### （オプション）ステップ9: HTMLの言語属性と方向属性を切り替える

アプリケーションが複数の言語をサポートしている場合、`<html>`タグの`lang`属性と`dir`属性を現在のロケールに合わせて更新することが非常に重要です。これにより、以下が保証されます：

- **アクセシビリティ**：スクリーンリーダーや支援技術は、正しい`lang`属性に依存してコンテンツを正確に発音・解釈します。
- **テキストのレンダリング**：`dir`（方向）属性は、テキストが適切な順序（例：英語は左から右、アラビア語やヘブライ語は右から左）で表示されることを保証し、読みやすさに不可欠です。
- **SEO**：検索エンジンは`lang`属性を使用してページの言語を判別し、適切なローカライズされたコンテンツを検索結果に提供します。

ロケールが変更されるたびにこれらの属性を動的に更新することで、すべての対応言語において一貫性がありアクセシブルなユーザー体験を保証します。

#### フックの実装

HTML属性を管理するカスタムフックを作成します。このフックはロケールの変更を監視し、それに応じて属性を更新します。

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいてHTMLの<html>要素の`lang`および`dir`属性を更新します。
 * - `lang`: ブラウザや検索エンジンにページの言語を通知します。
 * - `dir`: 正しい読み順を保証します（例：英語は'ltr'、アラビア語は'rtl'）。
 *
 * この動的な更新は、適切なテキストレンダリング、アクセシビリティ、およびSEOに不可欠です。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 現在のロケールに言語属性を更新します。
    document.documentElement.lang = locale;

    // 現在のロケールに基づいてテキストの方向を設定します。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいてHTMLの<html>要素の`lang`および`dir`属性を更新します。
 * - `lang`: ブラウザや検索エンジンにページの言語を通知します。
 * - `dir`: 正しい読み順を保証します（例：英語は 'ltr'、アラビア語は 'rtl'）。
 *
 * この動的な更新は、適切なテキストレンダリング、アクセシビリティ、およびSEOに不可欠です。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 現在のロケールに言語属性を更新します。
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
 * 現在のロケールに基づいてHTMLの<html>要素の`lang`および`dir`属性を更新します。
 * - `lang`: ブラウザや検索エンジンにページの言語を通知します。
 * - `dir`: 正しい読み順を保証します（例：英語は'ltr'、アラビア語は'rtl'）。
 *
 * この動的な更新は、適切なテキストレンダリング、アクセシビリティ、およびSEOに不可欠です。
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 現在のロケールに言語属性を更新します。
    document.documentElement.lang = locale;

    // 現在のロケールに基づいてテキストの方向を設定します。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### アプリケーションでのフックの使用方法

ロケールが変更されるたびにHTML属性が更新されるように、メインコンポーネントにフックを統合します：

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // ロケールに基づいて<html>タグのlangとdir属性を更新するためにフックを適用します。
  useI18nHTMLAttributes();

  // ... コンポーネントの残りの部分
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

#### アプリケーションでのフックの使用

フックをメインコンポーネントに統合し、ロケールが変更されるたびにHTML属性が更新されるようにします：

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // ロケールに基づいて<html>タグのlangとdir属性を更新するためにフックを適用します。
  useI18nHTMLAttributes();

  // ... コンポーネントの残りの部分
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
  // ロケールに基づいて<html>タグのlangとdir属性を更新するためにフックを適用します。
  useI18nHTMLAttributes();

  // ... コンポーネントの残りの部分
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
  // ロケールに基づいて<html>タグのlangとdir属性を更新するためにフックを適用します。
  useI18nHTMLAttributes();

  // ... コンポーネントの残りの部分
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

これらの変更を適用することで、アプリケーションは以下を実現します：

- 現在のロケールを正確に反映する**言語**（`lang`）属性を確実に設定し、SEOやブラウザの動作に重要な役割を果たします。
- ロケールに応じて**テキストの方向**（`dir`）を調整し、異なる読み順の言語に対して読みやすさと使いやすさを向上させます。
- これらの属性に依存する支援技術のために、より**アクセシブル**な体験を提供します。

### （オプション）ステップ10：ローカライズされたリンクコンポーネントの作成

これらの変更を適用することで、アプリケーションは以下を実現します：

- **言語**（`lang`）属性が現在のロケールを正確に反映し、SEOやブラウザの動作に重要な役割を果たします。
- ロケールに応じて**テキストの方向**（`dir`）を調整し、異なる読み方向の言語に対して読みやすさと使いやすさを向上させます。
- 支援技術がこれらの属性に依存して最適に機能するため、より**アクセシブル**な体験を提供します。

### （オプション）ステップ10：ローカライズされたリンクコンポーネントの作成

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタムの `Link` コンポーネントを作成できます。このコンポーネントは内部のURLに自動的に現在の言語をプレフィックスとして付加します。例えば、フランス語を話すユーザーが「About」ページへのリンクをクリックすると、`/about` ではなく `/fr/about` にリダイレクトされます。

この動作は以下の理由で有用です：

- **SEOとユーザー体験**：ローカライズされたURLは、検索エンジンが言語別のページを正しくインデックスし、ユーザーに好みの言語でコンテンツを提供するのに役立ちます。
- **一貫性**：アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まり、予期しない言語の切り替えを防ぎます。
- **保守性**: ローカリゼーションのロジックを単一のコンポーネントに集約することで、URLの管理が簡素化され、アプリケーションの成長に伴いコードベースの保守や拡張が容易になります。

以下は、TypeScriptで実装されたローカライズされた `Link` コンポーネントの例です。

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
 * 指定されたURLが外部リンクかどうかを判定するユーティリティ関数。
 * URLが http:// または https:// で始まる場合、外部リンクとみなされます。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいてhref属性を適応するカスタムLinkコンポーネント。
 * 内部リンクの場合、`getLocalizedUrl`を使用してURLの先頭にロケールを付加します（例：/fr/about）。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることを保証します。
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // リンクが内部リンクで有効なhrefが提供されている場合、ローカライズされたURLを取得します。
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
 * 指定されたURLが外部リンクかどうかをチェックするユーティリティ関数。
 * URLが http:// または https:// で始まる場合、外部リンクとみなされます。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいてhref属性を適応させるカスタムLinkコンポーネント。
 * 内部リンクの場合、`getLocalizedUrl`を使用してURLにロケールのプレフィックスを付けます（例：/fr/about）。
 * これにより、ナビゲーションが同じロケールのコンテキスト内に留まることが保証されます。
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // リンクが内部リンクで有効なhrefが提供されている場合、ローカライズされたURLを取得します。
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
 * 指定されたURLが外部リンクかどうかをチェックするユーティリティ関数。
 * URLが http:// または https:// で始まる場合、外部リンクと見なされます。
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応するカスタム Link コンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用して URL にロケールをプレフィックスします（例: /fr/about）。
 * これにより、ナビゲーションが同じロケールのコンテキスト内に留まることが保証されます。
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
  ヘルパー関数 `checkIsExternalLink` は、URLが外部リンクかどうかを判定します。外部リンクはローカライズの必要がないため、そのままにされます。

- **現在のロケールの取得**:  
  `useLocale` フックは現在のロケール（例：フランス語の場合は `fr`）を提供します。

- **URLのローカライズ**:  
  内部リンク（すなわち外部リンクでない場合）には、`getLocalizedUrl` が使用され、URLの先頭に現在のロケールを自動的に付加します。例えば、ユーザーがフランス語環境にいる場合、`href` に `/about` を渡すと `/fr/about` に変換されます。

- **リンクの返却**:  
  コンポーネントはローカライズされたURLを持つ `<a>` 要素を返し、ナビゲーションがロケールに一貫して対応するようにします。

この `Link` コンポーネントをアプリケーション全体に統合することで、一貫性のある言語対応のユーザー体験を維持しつつ、SEOや使いやすさの向上も実現できます。

### TypeScript の設定

Intlayer はモジュール拡張を利用して TypeScript の利点を活かし、コードベースをより強固にします。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript の設定に自動生成された型が含まれていることを確認してください。

コンポーネントはローカライズされたURLを持つ`<a>`要素を返し、ナビゲーションがロケールに沿って一貫して行われることを保証します。

この`Link`コンポーネントをアプリケーション全体に統合することで、一貫性のある言語対応のユーザー体験を維持しつつ、SEOや使いやすさの向上も期待できます。

### TypeScriptの設定

Intlayerはモジュール拡張を利用してTypeScriptの利点を活かし、コードベースをより堅牢にします。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に自動生成された型を含めることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルはGitリポジトリにコミットしないように無視することを推奨します。

これを行うには、`.gitignore`ファイルに以下の指示を追加してください。

```plaintext
# IntlayerでVite and Reactを翻訳する | 国際化（i18n）
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- **翻訳が不足している場合のリアルタイムエラー検出**。
- **翻訳内容のインラインプレビュー**。
- **翻訳の作成や更新を簡単に行うクイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進むために

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。

---
