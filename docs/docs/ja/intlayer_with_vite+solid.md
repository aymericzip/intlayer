---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite and Solidアプリを翻訳する方法 – i18nガイド 2026
description: Vite と Solid のウェブサイトを多言語対応にする方法を紹介します。国際化（i18n）と翻訳のドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - Solid
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-solid
applicationTemplate: https://github.com/aymericzip/intlayer-vite-solid-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: initコマンドを追加
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# IntlayerでVite and Solidを翻訳する | 国際化（i18n）

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Solid? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

> このパッケージは開発中です。詳細は[issue](https://github.com/aymericzip/intlayer/issues/117)をご覧ください。Solid向けIntlayerに関心がある場合は、issueに「いいね」をして応援してください。

<!-- GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-solid-template)もご参照ください。 -->

## Intlayerとは何ですか？

**Intlayer**は、最新のウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使うと、以下が可能です：

- **コンポーネントレベルで宣言的な辞書を使って翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成された型によりTypeScriptのサポートを保証**し、オートコンプリートやエラー検出を向上させます。
- **動的なロケール検出や切り替えなどの高度な機能を活用**できます。

---

## ViteとSolidアプリケーションでIntlayerをセットアップするステップバイステップガイド

## Table of Contents

<TOC/>

### ステップ1: 依存関係のインストール

npmを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  国際化のための設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のツールを提供するコアパッケージ。

- **solid-intlayer**
  IntlayerをSolidアプリケーションと統合するパッケージです。Solidの国際化のためのコンテキストプロバイダーとフックを提供します。

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

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Vite設定にIntlayerを統合する

intlayerプラグインを設定に追加します。

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

### ステップ 3: Vite 設定に Intlayer を統合する

intlayer プラグインを設定に追加します。

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

> `intlayer()` は Vite プラグインで、Intlayer を Vite に統合するために使用されます。コンテンツ宣言ファイルのビルドを保証し、開発モードでそれらを監視します。Vite アプリケーション内で Intlayer の環境変数を定義します。さらに、パフォーマンス最適化のためのエイリアスも提供します。

### ステップ 4: コンテンツを宣言する

翻訳を格納するためのコンテンツ宣言を作成および管理します。

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {},
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {}
}
```

> コンテンツ宣言は、アプリケーション内のどこにでも定義できます。`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り有効です。また、コンテンツ宣言ファイルの拡張子は（デフォルトで `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ5: Intlayerをコードで利用する

アプリケーション全体でコンテンツ辞書にアクセスします：

```tsx {1,11} fileName="src/App.tsx" codeFormat="typescript"
import { createSignal, type Component } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "solid-intlayer";

const AppContent: Component = () => {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content().viteLogo.value} />
        </a>
        <a href="https://www.solidjs.com/" target="_blank">
          <img
            src={solidLogo}
            class="logo solid"
            alt={content().solidLogo.value}
          />
        </a>
      </div>
      <h1>{content().title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content().count({ count: count() })}
        </button>
        <p>{content().edit}</p>
      </div>
      <p class="read-the-docs">{content().readTheDocs}</p>
    </>
  );
};

const App: Component = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> [!NOTE]
> Solidでは、`useIntlayer`は**accessor**関数（例：`content()`）を返します。リアクティブコンテンツにアクセスするには、この関数を呼び出す必要があります。

> `alt`、`title`、`href`、`aria-label`などの`string`属性でコンテンツを使用する場合は、関数の値を次のように呼び出す必要があります：
>
> ```jsx
> <img src={content().image.src.value} alt={content().image.value} />
> ```

### （オプション）ステップ6: コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale`フックによって提供される`setLocale`関数を使用できます。この関数により、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { Locales } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as Locales)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

### （オプション）ステップ7: アプリケーションにローカライズされたルーティングを追加する

このステップの目的は、各言語に対して一意のルートを作成することです。これはSEOとSEOフレンドリーなURLに役立ちます。
例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

アプリケーションにローカライズされたルーティングを追加するには、`@solidjs/router`を使用できます。

まず、必要な依存関係をインストールします：

```bash packageManager="npm"
npm install @solidjs/router
```

次に、アプリケーションを`Router`でラップし、`localeMap`を使用してルートを定義します：

```tsx fileName="src/index.tsx"  codeFormat="typescript"
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
```

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { type Component } from "solid-js";
import { Route } from "@solidjs/router";
import { localeMap } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import Home from "./pages/Home";
import About from "./pages/About";

const App: Component = () => (
  <IntlayerProvider>
    {localeMap(({ locale, urlPrefix }) => (
      <Route
        path={urlPrefix || "/"}
        component={(props: any) => (
          <IntlayerProvider locale={locale}>{props.children}</IntlayerProvider>
        )}
      >
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Route>
    ))}
  </IntlayerProvider>
);

export default App;
```

### （オプション）ステップ8: ロケール変更時にURLを変更する

ロケールが変更されたときにURLを変更するには、`useLocale`フックによって提供される`onLocaleChange`プロップを使用できます。`@solidjs/router`の`useNavigate`と`useLocation`フックを使用して、URLパスを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (loc) => {
      const pathWithLocale = getLocalizedUrl(location.pathname, loc);
      navigate(pathWithLocale);
    },
  });

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as any)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

### （オプション）ステップ9: HTMLの言語属性と言語方向属性を切り替える

アクセシビリティとSEOのために、`<html>`タグの`lang`と`dir`属性を現在のロケールに合わせて更新します。

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { createEffect, type Component } from "solid-js";
import { useLocale } from "solid-intlayer";
import { getHTMLTextDir } from "intlayer";

const AppContent: Component = () => {
  const { locale } = useLocale();

  createEffect(() => {
    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    // ... アプリケーションのコンテンツ
  );
};
```

### （オプション）ステップ10：ローカライズされたリンクコンポーネントの作成

内部URLを現在の言語で自動的にプレフィックスするカスタム`Link`コンポーネントを作成します。

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { type ParentComponent } from "solid-js";
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const Link: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => props.href.startsWith("http");
  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

### （オプション）ステップ11: Markdownをレンダリングする

Intlayerは、独自の内部パーサーを使用して、SolidアプリケーションでMarkdownコンテンツを直接レンダリングすることをサポートしています。デフォルトでは、Markdownはプレーンテキストとして扱われます。リッチHTMLとしてレンダリングするには、アプリケーションを`MarkdownProvider`でラップします。

```tsx fileName="src/index.tsx"
import { render } from "solid-js/web";
import { MarkdownProvider } from "solid-intlayer";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <MarkdownProvider>
      <App />
    </MarkdownProvider>
  ),
  root!
);
```

次に、コンポーネントで使用できます：

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-content");

  return (
    <div>
      {/* MarkdownProvider経由でHTMLとしてレンダリング */}
      {content().markdownContent}
    </div>
  );
};
```

### TypeScriptを設定する

TypeScript設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Git設定

Intlayerによって生成されたファイルは、Gitリポジトリにコミットしないように無視することを推奨します。

これを行うには、`.gitignore`ファイルに以下の指示を追加してください。

```plaintext
# Intlayerによって生成されたファイルを無視する
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- **翻訳されたコンテンツのインラインプレビュー**。
- **翻訳を簡単に作成・更新するためのクイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進むために

さらに進みたい場合は、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。

---
