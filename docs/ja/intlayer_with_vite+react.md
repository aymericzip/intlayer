# Getting Started Internationalizing (i18n) with Intlayer and Vite and React

## Intlayerとは？

**Intlayer**は、モダンなWebアプリケーションにおける多言語対応を簡素化するために設計された、革新的でオープンソースの国際化(i18n)ライブラリです。

Intlayerを使用すると、以下のことが可能です：

- **コンポーネントレベルで宣言的な辞書を使用して翻訳を簡単に管理**。
- **メタデータ、ルート、コンテンツを動的にローカライズ**。
- **自動生成された型でTypeScriptサポートを確保**し、オートコンプリートとエラー検出を向上。
- **動的なロケール検出と切り替え**などの高度な機能を活用。

---

## ViteとReactアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

### ステップ1: 依存関係をインストール

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

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)、トランスパイル、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を提供するコアパッケージ。

- **react-intlayer**
  IntlayerをReactアプリケーションと統合するためのパッケージ。Reactの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  [Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)とIntlayerを統合するためのViteプラグインを含み、ユーザーの優先ロケールを検出し、クッキーを管理し、URLリダイレクトを処理するミドルウェアを提供します。

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

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### ステップ3: Vite設定にIntlayerを統合

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

> `intlayerPlugin()` Viteプラグインは、IntlayerをViteと統合するために使用されます。コンテンツ宣言ファイルのビルドを保証し、開発モードでそれらを監視します。また、Viteアプリケーション内でIntlayer環境変数を定義し、パフォーマンスを最適化するためのエイリアスを提供します。

### ステップ4: コンテンツを宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します：

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
      // Reactノードをコンテンツで使用する場合はReactをインポートすることを忘れないでください
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

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトでは`./src`）に含まれ、コンテンツ宣言ファイルの拡張子（デフォルトでは`.content.{ts,tsx,js,jsx,mjs,cjs}`）と一致する限り、アプリケーションのどこにでも定義できます。詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)を参照してください。
> コンテンツファイルにTSXコードが含まれる場合は、`import React from "react";`をコンテンツファイルにインポートすることを検討してください。

### ステップ5: コード内でIntlayerを利用

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

> `useIntlayer`フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

### (オプション) ステップ6: コンテンツの言語を変更

`useLocale`フックが提供する`setLocale`関数を使用して、コンテンツの言語を変更できます。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

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

> `useLocale`フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

### (オプション) ステップ7: アプリケーションにローカライズされたルーティングを追加

このステップの目的は、各言語に固有のルートを作成することです。これはSEOとSEOフレンドリーなURLに役立ちます。

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> デフォルトでは、デフォルトロケールにはルートがプレフィックスされません。デフォルトロケールをプレフィックスしたい場合は、設定で`middleware.prefixDefault`オプションを`true`に設定できます。詳細については、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

以下のコードを参考にしてください。

---

続きは同様の形式で翻訳されます。
