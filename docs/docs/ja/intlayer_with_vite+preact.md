---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite と Preact i18n - Preactアプリの翻訳方法 – ガイド 2026
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
  - version: 7.5.9
    date: 2025-12-30
    changes: initコマンドを追加
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# IntlayerでVite and Preactを翻訳する | 国際化（i18n）

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

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
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

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
  routing: {
    mode: "prefix-no-default", // デフォルト：デフォルトロケール以外のすべてのロケールにプレフィックスを付ける
    storage: ["cookie", "header"], // デフォルト：ロケールをクッキーに保存し、ヘッダーから検出する
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
  routing: {
    mode: "prefix-no-default", // デフォルト：デフォルトロケール以外のすべてのロケールにプレフィックスを付ける
    storage: ["cookie", "header"], // デフォルト：ロケールをクッキーに保存し、ヘッダーから検出する
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
  routing: {
    mode: "prefix-no-default", // デフォルト：デフォルトロケール以外のすべてのロケールにプレフィックスを付ける
    storage: ["cookie", "header"], // デフォルト：ロケールをクッキーに保存し、ヘッダーから検出する
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ルーティングモード、ストレージオプション、クッキー名、コンテンツ宣言の場所や拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ 3: Vite 設定に Intlayer を統合する

設定に intlayer プラグインを追加します。

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

### ステップ 4: コンテンツを宣言する

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
          Edit <code>src/app.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
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

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite et Preact pour obtenir plus d'informations",
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
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite et Preact pour en savoir plus",
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
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
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
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）に一致する必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

> コンテンツファイルに TSX コードが含まれている場合は、`import { h } from "preact";` をインポートするか、JSX プラグマが Preact 用に正しく設定されていることを確認する必要があります。

### ステップ 5: コード内で Intlayer を利用する

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
      {/* Markdown コンテンツ */}
      <div>{content.myMarkdownContent}</div>

      {/* HTML コンテンツ */}
      <div>{content.myHtmlContent}</div>

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

### （オプション）ステップ 6：コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale` フックが提供する `setLocale` 関数を使用します。この関数を使うことで、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
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
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
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
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> `useLocale` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください（`preact-intlayer` でも同様のAPIです）。

### （オプション）ステップ 7: アプリケーションにローカライズされたルーティングを追加する

このステップの目的は、各言語ごとにユニークなルートを作成することです。これはSEOやSEOに適したURLに役立ちます。
例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> デフォルトでは、ルートはデフォルトロケールに対してプレフィックスが付きません。デフォルトロケールにもプレフィックスを付けたい場合は、設定の `routing.mode` オプションを `"prefix-all"` に設定できます。詳細は[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールベースのルーティングを処理する `LocaleRouter` コンポーネントを作成できます。以下は [preact-iso](https://github.com/preactjs/preact-iso) を使用した例です。

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * preact-isoを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * preact-isoを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
const { localeMap } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, Router, Route } = require("preact-iso");

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * preact-isoを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
const LocaleRouter = ({ children }) =>
  h(
    LocationProvider,
    {},
    h(
      Router,
      {},
      localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) =>
          h(Route, {
            key: locale,
            path: `${urlPrefix}/:rest*`,
            component: () => h(IntlayerProvider, { locale }, children),
          })
        )
    )
  );

module.exports = { LocaleRouter };
```

次に、アプリケーション内で `LocaleRouter` コンポーネントを使用できます:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... AppContent コンポーネント

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... AppContent コンポーネント

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... AppContent コンポーネント

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

### （オプション）ステップ 8: ロケールが変更されたときに URL を変更する

ロケールが変更されたときに URL を変更するには、`useLocale` フックが提供する `onLocaleChange` プロパティを使用できます。同時に、`preact-iso` の `useLocation` から `route` メソッドを使用して URL パスを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // 更新されたロケールで URL を構築
      // 例: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // URL パスを更新
      route(pathWithLocale, true); // true は置換（replace）
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
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
              {/* その言語自身のロケールでの名称 - 例: Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語名称 - 例: 現在のロケールが Locales.SPANISH の場合 Francés */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での名称 - 例: French */}
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
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
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
const { useLocation } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return h(
    "div",
    {},
    h("button", { popovertarget: "localePopover" }, getLocaleName(locale)),
    h(
      "div",
      { id: "localePopover", popover: "auto" },
      availableLocales.map((localeItem) =>
        h(
          "a",
          {
            href: getLocalizedUrl(url, localeItem),
            hreflang: localeItem,
            "aria-current": locale === localeItem ? "page" : undefined,
            onClick: (e) => {
              e.preventDefault();
              setLocale(localeItem);
            },
            key: localeItem,
          },
          h("span", {}, localeItem),
          h("span", {}, getLocaleName(localeItem, localeItem)),
          h(
            "span",
            { dir: getHTMLTextDir(localeItem), lang: localeItem },
            getLocaleName(localeItem, locale)
          ),
          h(
            "span",
            { dir: "ltr", lang: Locales.ENGLISH },
            getLocaleName(localeItem, Locales.ENGLISH)
          )
        )
      )
    )
  );
};

module.exports = LocaleSwitcher;
```

> ドキュメント参照:
>
> > - [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)（API は `preact-intlayer` でも同様です）> - [`getLocaleName` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)> - [`getLocalizedUrl` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)> - [`getHTMLTextDir` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)> - [`hreflang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ja)> - [`lang` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang)> - [`dir` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` 属性](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/ja/docs/Web/API/Popover_API)

### （オプション）ステップ 9: HTML の言語属性と言語方向属性を切り替える

アプリケーションが複数言語に対応している場合、`<html>` タグの `lang` 属性と `dir` 属性を現在のロケールに合わせて更新することが非常に重要です。これにより以下が保証されます：

- **アクセシビリティ**: スクリーンリーダーや支援技術は、正しい `lang` 属性に依存してコンテンツを正確に発音・解釈します。
- **テキストのレンダリング**: `dir`（方向）属性は、テキストが正しい順序（例：英語は左から右、アラビア語やヘブライ語は右から左）で表示されることを保証します。これは読みやすさに不可欠です。
- **SEO**: 検索エンジンは `lang` 属性を使用してページの言語を判断し、適切なローカライズされたコンテンツを検索結果に表示するのに役立てます。

これらの属性をロケール変更時に動的に更新することで、サポートされているすべての言語においてユーザーに一貫したアクセシブルな体験を提供できます。

#### フックの実装

HTML 属性を管理するためのカスタムフックを作成します。このフックはロケールの変更を監視し、それに応じて属性を更新します：

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいて HTML の <html> 要素の `lang` と `dir` 属性を更新します。
 * - `lang`: ブラウザや検索エンジンにページの言語を通知します。
 * - `dir`: 正しい読み順（例：英語は 'ltr'、アラビア語は 'rtl'）を保証します。
 *
 * この動的な更新は、適切なテキストレンダリング、アクセシビリティ、および SEO に不可欠です。
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

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいて HTML の <html> 要素の `lang` と `dir` 属性を更新します。
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
 * 現在のロケールに基づいて HTML の <html> 要素の `lang` と `dir` 属性を更新します。
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

#### アプリケーションでのフックの使用

ロケールが変更されるたびに HTML 属性が更新されるように、メインコンポーネントにフックを統合します：

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // AppContent で必要なら useIntlayer は既にインポートされています
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// ステップ 5 の AppContent 定義

const AppWithHooks: FunctionalComponent = () => {
  // ロケールに基づいて <html> タグの lang と dir 属性を更新するためにフックを適用します。
  useI18nHTMLAttributes();

  // AppContent がステップ 5 のメインコンテンツ表示コンポーネントであると仮定します
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
// ステップ 5 の AppContent 定義

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
// ステップ 5 の AppContent 定義

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

### （オプション）ステップ 10: ローカライズされたリンクコンポーネントの作成

アプリケーションのナビゲーションが現在のロケールを尊重するようにするために、カスタムの `Link` コンポーネントを作成できます。このコンポーネントは内部 URL に現在の言語を自動的にプレフィックスとして付加します。

この動作は以下の理由で役立ちます：

- **SEO とユーザー体験**: ローカライズされた URL は、検索エンジンが言語固有のページを正しくインデックスするのを助け、ユーザーに好みの言語でコンテンツを提供します。
- **一貫性**: アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まることを保証し、予期しない言語の切り替えを防ぎます。
- **保守性**: ローカリゼーションのロジックを単一のコンポーネントに集約することで、URL の管理が簡素化されます。

以下は、Preact におけるローカライズされた `Link` コンポーネントの実装です：

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * 指定された URL が外部のものかどうかをチェックするユーティリティ関数。
 * URL が http:// または https:// で始まる場合、外部とみなされます。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用して URL にロケールをプレフィックス（例：/fr/about）します。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることが保証されます。
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // 内部リンクであり、有効な href が提供されている場合、ローカライズされた URL を取得します。
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

```jsx fileName="src/components/Link.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";

/**
 * 指定された URL が外部のものかどうかをチェックするユーティリティ関数。
 * URL が http:// または https:// で始まる場合、外部とみなされます。
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用して URL にロケールをプレフィックス（例：/fr/about）します。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることが保証されます。
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 内部リンクであり、有効な href が提供されている場合、ローカライズされた URL を取得します。
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

```jsx fileName="src/components/Link.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { forwardRef } = require("preact/compat");

/**
 * 指定された URL が外部のものかどうかをチェックするユーティリティ関数。
 * URL が http:// または https:// で始まる場合、外部とみなされます。
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用して URL にロケールをプレフィックス（例：/fr/about）します。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることが保証されます。
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 内部リンクであり、有効な href が提供されている場合、ローカライズされた URL を取得します。
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return h(
    "a",
    {
      href: hrefI18n,
      ref: ref,
      ...props,
    },
    children
  );
});

Link.displayName = "Link";

module.exports = { Link, checkIsExternalLink };
```

#### 動作の仕組み

- **外部リンクの検出**:  
  ヘルパー関数 `checkIsExternalLink` は、URL が外部かどうかを判断します。外部リンクはローカライズの必要がないため、変更されません。
- **現在のロケールの取得**:  
  `useLocale` フックは現在のロケール（例：フランス語なら `fr`）を提供します。
- **URL のローカライズ**:  
  内部リンク（非外部リンク）の場合、`getLocalizedUrl` を使用して、現在のロケールを URL の先頭に自動的に付加します。つまり、ユーザーがフランス語環境にいる場合、`/about` を `href` として渡すと `/fr/about` に変換されます。
- **リンクの返却**:  
  コンポーネントはローカライズされた URL を持つ `<a>` 要素を返し、ナビゲーションがロケールと一貫していることを保証します。

### （オプション）ステップ 11: Markdown と HTML のレンダリング

Intlayer は Preact での Markdown と HTML コンテンツのレンダリングをサポートしています。

`.use()` メソッドを使用して、Markdown および HTML コンテンツのレンダリングをカスタマイズできます。このメソッドを使用すると、特定のタグのデフォルトのレンダリングを上書きできます。

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* 基本的なレンダリング */}
    {myMarkdownContent}

    {/* Markdown のカスタムレンダリング */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* HTML の基本的なレンダリング */}
    {myHtmlContent}

    {/* HTML のカスタムレンダリング */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

### TypeScript の設定

Intlayer はモジュール拡張を使用して TypeScript の利点を得て、コードベースをより強固にします。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Preact 10+ に推奨
    // ...
  },
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

> `tsconfig.json` が Preact 用に設定されていることを確認してください。特に `jsx` と `jsxImportSource`、または `preset-vite` のデフォルトを使用していない場合は古い Preact バージョン用の `jsxFactory`/`jsxFragmentFactory` を確認してください。

### Git 設定

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、それらを Git リポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加できます：

```plaintext
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**。
- 翻訳漏れの **リアルタイムエラー検出**。
- 翻訳されたコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成・更新できる **クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進む

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) を使用してコンテンツを外部化できます。

---
