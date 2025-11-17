---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Vite and Preactアプリを翻訳する方法 – i18nガイド 2025
description: Vite と Preact のウェブサイトを多言語対応にする方法を紹介します。国際化（i18n）と翻訳のためのドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# IntlayerでVite and Preactを翻訳する | 国際化（i18n）

> このパッケージは開発中です。詳細は[issue](https://github.com/aymericzip/intlayer/issues/118)をご覧ください。Intlayer for Preact に関心がある場合は、issue に「いいね」をして興味を示してください。

GitHub の[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vite-preact-template)もご覧ください。

## Intlayerとは？

**Intlayer** は、モダンなウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayer を使うと、以下が可能です：

- **コンポーネントレベルで宣言的な辞書を使い、翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成された型により TypeScript サポートを確保し、オートコンプリートやエラー検出を向上**させます。
- **動的なロケール検出や切り替えなどの高度な機能を活用**できます。

---

## Vite と Preact アプリケーションで Intlayer をセットアップするステップバイステップガイド

### ステップ 1: 依存関係のインストール

npm を使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージ。

- **preact-intlayer**
  IntlayerをPreactアプリケーションと統合するパッケージです。Preactの国際化のためのコンテキストプロバイダーとフックを提供します。

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
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所や拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Vite設定にIntlayerを統合する

設定にintlayerプラグインを追加します。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。これにより、コンテンツ宣言ファイルのビルドが保証され、開発モードで監視されます。また、Viteアプリケーション内でIntlayerの環境変数を定義します。さらに、パフォーマンス最適化のためのエイリアスも提供します。

### ステップ4: コンテンツを宣言する

翻訳を格納するためのコンテンツ宣言を作成および管理します:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          <code>src/app.tsx</code> を編集して保存し、HMRをテストします
        </>
      ),
      fr: (
        <>
          <code>src/app.tsx</code> を編集して保存し、HMRをテストします
        </>
      ),
      es: (
        <>
          <code>src/app.tsx</code> を編集して保存し、HMRをテストします
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // JSXを.mjsで直接使用する場合に必要

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
      ja: "Vite ロゴ",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
      ja: "Preact ロゴ",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      ja: "カウントは ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
      ja: "src/app.jsx を編集して保存し、HMRをテストしてください",
    }),
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // JSXを.cjsで直接使用する場合に必要

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      ja: "カウントは ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
      ja: "src/app.tsx を編集して保存し、HMR をテストします",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      ja: "Vite と Preact のロゴをクリックして詳細を確認してください",
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
        "ja": "Vite ロゴ",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "ja": "Preact ロゴ",
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "ja": "Vite + Preact",
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
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
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "ja": "src/app.tsx を編集して保存し、HMR をテストします"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información",
        "ja": "Vite と Preact のロゴをクリックして詳細を学びましょう"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

> コンテンツファイルに TSX コードが含まれている場合は、`import { h } from "preact";` をインポートするか、JSX プラグマが Preact 用に正しく設定されていることを確認する必要があります。

### ステップ5: コード内で Intlayer を利用する

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // preact.svgがあると仮定しています
import viteLogo from "/vite.svg";
import "./app.css"; // CSSファイルがapp.cssという名前であると仮定しています
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

> コンテンツを `alt`、`title`、`href`、`aria-label` などの `string` 属性で使用したい場合は、関数の値を呼び出す必要があります。例：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 注意：Preact では、`className` は通常 `class` として記述されます。

> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください（`preact-intlayer` も同様の API です）。

### （オプション）ステップ6：コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale` フックが提供する `setLocale` 関数を使用します。この関数を使うことで、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>言語を英語に変更</button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>言語を英語に変更</button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>言語を英語に変更</button>
  );
};

module.exports = LocaleSwitcher;
```

> `useLocale` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください（`preact-intlayer` でも同様のAPIです）。

### （オプション）ステップ7：アプリケーションにローカライズされたルーティングを追加する

このステップの目的は、各言語ごとにユニークなルートを作成することです。これはSEOやSEOに適したURLに役立ちます。
例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> デフォルトでは、ルートはデフォルトロケールに対してプレフィックスが付きません。デフォルトロケールにもプレフィックスを付けたい場合は、設定の `middleware.prefixDefault` オプションを `true` に設定できます。詳細は[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールベースのルーティングを処理する `LocaleRouter` コンポーネントを作成できます。以下は [preact-iso](https://github.com/preactjs/preact-iso) を使用した例です。

まず、`preact-iso` をインストールします：

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * ローカライズを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // 現在のロケールを決定し、指定がなければデフォルトにフォールバック
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールのプレフィックスを削除してベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefault が true の場合、デフォルトのロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証する
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトのロケールにリダイレクトする
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものに置き換える
        />
      );
    }

    // IntlayerProvider で子要素をラップし、現在のロケールを設定する
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault が false の場合、デフォルトのロケールはプレフィックスされません。
     * 現在のロケールが有効であり、デフォルトロケールではないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // デフォルトロケールを除外
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

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * preact-isoを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// 必要な依存関係と関数のインポート
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // JSXに必要

// Intlayerから設定を分割代入
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * ローカリゼーションを処理し、子要素を適切なロケールコンテキストでラップするコンポーネントです。
 * URLベースのロケール検出と検証を管理します。
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // 現在のロケールを決定し、指定がなければデフォルトにフォールバックします
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールのプレフィックスを削除してベースパスを構築します
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefault が true の場合、デフォルトロケールは常にプレフィックスされるべきです。
   */
  if (middleware.prefixDefault) {
    // ロケールを検証する
    if (!locale || !locales.includes(locale)) {
      // 更新されたパスでデフォルトのロケールにリダイレクトする
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 現在の履歴エントリを新しいものと置き換える
        />
      );
    }

    // IntlayerProviderで子要素をラップし、現在のロケールを設定する
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
          (loc) => loc.toString() !== defaultLocale.toString() // デフォルトロケールを除外
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

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * ロケール固有のルートを設定するルーターコンポーネントです。
 * preact-isoを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// 必要な依存関係と関数のインポート
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // JSXに必要

// Intlayerから設定を分割代入
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * ローカリゼーションを処理し、適切なロケールコンテキストで子要素をラップするコンポーネント。
 * URLベースのロケール検出と検証を管理する。
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // 現在のロケールを決定し、指定がなければデフォルトロケールを使用
  const currentLocale = locale ?? defaultLocale;

  // パスからロケールのプレフィックスを削除してベースパスを構築
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 現在のURLパス
  );

  /**
   * middleware.prefixDefault が true の場合、デフォルトロケールは常にプレフィックスされるべき
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
     * 現在のロケールが有効であり、デフォルトのロケールではないことを確認します。
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // デフォルトのロケールを除外
        )
        .includes(currentLocale) // 現在のロケールが有効なロケールのリストに含まれているかをチェック
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

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * ロケール固有のルートを設定するルーターコンポーネントです。
 * preact-isoを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

次に、アプリケーション内で `LocaleRouter` コンポーネントを使用できます:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
tsx fileName="src/app.tsx" codeFormat="typescript"
// ... ステップ5で定義した AppContent コンポーネント

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... ステップ5で定義した AppContent コンポーネント

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... ステップ5で定義した AppContent コンポーネント

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

並行して、`intlayerProxy` を使用してアプリケーションにサーバーサイドルーティングを追加することもできます。このプラグインはURLに基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザの言語設定に基づいて最適なロケールを判別します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトします。

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

### （オプション）ステップ8：ロケールが変更されたときにURLを変更する

ロケールが変更されたときにURLを変更するには、`useLocale`フックが提供する`onLocaleChange`プロパティを使用できます。同時に、`preact-iso`の`useLocation`と`route`を使ってURLパスを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-isoは完全なURLを提供します
      // 更新されたロケールでURLを構築
      // 例: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // URLパスを更新
      route(pathWithLocale, true); // trueは置換を意味する
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // ロケール設定後のプログラムによるナビゲーションは onLocaleChange で処理されます
            }}
            key={localeItem}
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* そのロケールでの言語名 - 例: Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名 - 例: ロケールが Locales.SPANISH の場合 Francés */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // JSX用

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // JSX用

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> ドキュメント参照:
>
> > - [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md) (`preact-intlayer` でも同様の API です)
> > - [`getLocaleName` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)
> > - [`getLocalizedUrl` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)
> > - [`getHTMLTextDir` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)
> > - [`hreflang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> > - [`lang` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang)
> > - [`dir` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/dir)
> > - [`aria-current` 属性](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> > - [Popover API](https://developer.mozilla.org/ja/docs/Web/API/Popover_API)la.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

以下は、説明を追加しコード例を洗練させた更新版の**ステップ9**です。

---

### （オプション）ステップ9：HTMLの言語属性と言語方向属性を切り替える

アプリケーションが複数言語に対応している場合、`<html>`タグの`lang`属性と`dir`属性を現在のロケールに合わせて更新することが非常に重要です。これにより以下が保証されます：

- **アクセシビリティ**：スクリーンリーダーや支援技術は、正しい`lang`属性に依存してコンテンツを正確に発音・解釈します。
- **テキストのレンダリング**：`dir`（方向）属性はテキストが正しい順序で表示されることを保証します（例：英語は左から右へ、アラビア語やヘブライ語は右から左へ）。これは読みやすさに不可欠です。
- **SEO**: 検索エンジンは `lang` 属性を使用してページの言語を判別し、適切なローカライズされたコンテンツを検索結果に表示します。

これらの属性をロケールの変更時に動的に更新することで、すべての対応言語において一貫性がありアクセシブルなユーザー体験を保証します。

#### フックの実装

HTML属性を管理するカスタムフックを作成します。このフックはロケールの変更を監視し、それに応じて属性を更新します：

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいてHTMLの <html> 要素の `lang` と `dir` 属性を更新します。
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

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいてHTMLの<html>要素の`lang`および`dir`属性を更新します。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * 現在のロケールに基づいてHTMLの<html>要素の`lang`および`dir`属性を更新します。
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### アプリケーションでのフックの使用方法

ロケールが変更されるたびにHTML属性が更新されるように、メインコンポーネントにフックを統合します：

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // AppContentが必要な場合はuseIntlayerはすでにインポートされています
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// ステップ5のAppContent定義

const AppWithHooks: FunctionalComponent = () => {
  // ロケールに基づいて <html> タグの lang と dir 属性を更新するためにフックを適用します。
  useI18nHTMLAttributes();

  // AppContent はステップ5で定義したメインコンテンツ表示コンポーネントと仮定します
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// ステップ5で定義した AppContent

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// ステップ5からのAppContent定義

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

これらの変更を適用することで、アプリケーションは以下を実現します：

- **言語**（`lang`）属性が現在のロケールを正しく反映し、SEOやブラウザの動作に重要な役割を果たします。
- ロケールに応じて**テキストの方向**（`dir`）を調整し、異なる読み方向の言語に対して読みやすさと使いやすさを向上させます。
- アシスティブテクノロジーがこれらの属性に依存して最適に機能するため、より**アクセシブルな**体験を提供します。

### （オプション）ステップ10：ローカライズされたリンクコンポーネントの作成

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタムの `Link` コンポーネントを作成できます。このコンポーネントは内部URLに自動的に現在の言語をプレフィックスとして付加します。

この動作は以下の理由で有用です：

- **SEOとユーザー体験**：ローカライズされたURLは検索エンジンが言語別のページを正しくインデックスし、ユーザーに好みの言語でコンテンツを提供するのに役立ちます。
- **一貫性**：アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まり、予期しない言語の切り替えを防ぎます。
- **保守性**: ローカリゼーションのロジックを単一のコンポーネントに集約することで、URLの管理が簡素化されます。

`preact-iso`を使用したPreactでは、通常のナビゲーションに標準の`<a>`タグが使われ、ルーティングは`preact-iso`が担当します。クリック時にプログラム的なナビゲーションが必要な場合（例：ナビゲーション前に何らかの処理を行いたい場合）、`useLocation`から提供される`route`関数を使用できます。以下は、URLをローカライズするカスタムアンカーコンポーネントの作成例です。

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // useLocationとrouteはpreact-intlayer経由でpreact-isoから再エクスポートされている場合、または直接インポート
// もし再エクスポートされていない場合は、直接インポートしてください: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // HTMLAttributes用
import { forwardRef } from "preact/compat"; // ref転送用

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // 任意: 履歴状態を置き換えるかどうか
}

/**
 * 指定されたURLが外部リンクかどうかを判定するユーティリティ関数。
 * URLが http:// または https:// で始まる場合は外部リンクとみなします。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタムLinkコンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用してURLにロケールをプレフィックスとして付加します（例：/fr/about）。
 * これにより、ナビゲーションが同じロケールのコンテキスト内に留まることが保証されます。
 * 標準の <a> タグを使用しますが、preact-iso の `route` を使ってクライアントサイドのナビゲーションをトリガーすることができます。
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // preact-iso から取得
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // hrefが定義されていることを確認
        event.button === 0 && // 左クリック
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // 標準の修飾キーのチェック
        !props.target // 新しいタブ/ウィンドウをターゲットにしていない
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // URLが異なる場合のみナビゲート
          route(hrefI18n, replace); // preact-isoのrouteを使用
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso"; // preact-isoからインポート
import { forwardRef } from "preact/compat";
import { h } from "preact"; // JSX用

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // preact-isoからインポート
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // JSX用

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

// 外部リンクかどうかをチェックする関数
const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale(); // 現在のロケールを取得
    const location = useLocation(); // 現在のロケーションを取得
    const isExternalLink = checkIsExternalLink(href); // 外部リンク判定

    // 内部リンクの場合はロケール付きURLを取得、外部リンクはそのまま
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### 動作の仕組み

- **外部リンクの検出**:  
  ヘルパー関数 `checkIsExternalLink` は、URLが外部リンクかどうかを判定します。外部リンクは変更されません。
- **現在のロケールの取得**:  
  `useLocale` フックは現在のロケールを提供します。
- **URLのローカライズ**:  
  内部リンクの場合、`getLocalizedUrl` はURLの先頭に現在のロケールを付加します。
- **クライアントサイドナビゲーション**:
  `handleClick`関数は、リンクが内部リンクかつ標準のナビゲーションを防止すべきかどうかをチェックします。もしそうであれば、`preact-iso`の`route`関数（`useLocation`から取得するか、直接インポートしたもの）を使ってクライアントサイドのナビゲーションを実行します。これにより、ページ全体のリロードなしでSPAのような動作が可能になります。
- **リンクの返却**:  
  コンポーネントはローカライズされたURLとカスタムクリックハンドラを持つ`<a>`要素を返します。

### TypeScriptの設定

Intlayerはモジュール拡張を利用してTypeScriptの利点を活かし、コードベースをより強固にします。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Preact 10+に推奨される設定
    // ...
  },
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

> `tsconfig.json`がPreact用に設定されていることを確認してください。特に`jsx`と`jsxImportSource`、または古いPreactバージョンを使用している場合は`jsxFactory`/`jsxFragmentFactory`が必要です（`preset-vite`のデフォルトを使用していない場合）。

### Gitの設定

Intlayerによって生成されたファイルはGitリポジトリにコミットしないように、無視することを推奨します。これにより、不要なファイルのコミットを防ぐことができます。

これを行うには、以下の指示を `.gitignore` ファイルに追加できます。

```plaintext
# Intlayer によって生成されたファイルを無視する
.intlayer
```

### VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**。
- 翻訳が欠落している場合の **リアルタイムエラー検出**。
- 翻訳されたコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成・更新できる **クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進むために

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使ってコンテンツを外部化することができます。

---
