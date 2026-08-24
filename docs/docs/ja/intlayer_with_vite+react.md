---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Vite + React i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Vite + Reactアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
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
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴の初期化"
author: aymericzip
---

# Intlayerを使ってViteとReactのウェブサイトを翻訳する | 国際化（i18n）

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「react-i18next」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

<AccordionGroup>

**Vite と React を完全にカバー**

Intlayer は、**コンポーネント レベルのコンテンツ スコープ**、**遅延読み込み翻訳**、および国際化のスケーリング (i18n) に必要なすべての機能を提供することにより、Vite および React と完全に連携するように最適化されています。

**バンドルサイズ**

<Accordion header="Bundle size">

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。 Intlayer は、**バンドルとページのサイズを最大 50% 削減**するのに役立ちます。

**保守性**

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの **メンテナンスが容易になります**。コンテンツ コードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

**AI エージェント**

</Accordion>

<Accordion header="AI Agent">

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって **必要なコンテキストが削減**されます。 Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** などのツール スイートも付属しています。および **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)** により、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

**オートメーション**

<Accordion header="自動化">

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化を変換します。 Intlayer は、コンテンツ抽出を自動化する **コンパイラー** と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

**パフォーマンス**

<Accordion header="パフォーマンス">

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。 Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

**非開発によるスケーリング**

<Accordion header="none-devでのスケーリング">

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>
</AccordionGroup>

---

## ViteとReactアプリケーションでIntlayerをセットアップするステップバイステップガイド

<Tabs defaultTab="video">
  <Tab label="ビデオ" value="video">

<iframe title="ViteとReactに最適なi18nソリューション？Intlayerを発見" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使ってアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubの[Application Template](https://github.com/aymericzip/intlayer-vite-react-template)を参照してください。

<Steps>

<Step number={1} title="依存関係のインストール">

npm を使用して必要なパッケージをインストールします:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` フラグはオプションです。AI エージェントの場合は `intlayer-cli init` を使用してください。

> このコマンドは、あなたの環境を検出し、必要なパッケージをインストールします。例えば:

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

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  国際化ツールを提供するコアパッケージで、設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)を提供します。

- **react-intlayer**
  Intlayer を React アプリケーションと統合するパッケージです。React の国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケール検出、Cookie管理、URL リダイレクト処理を行うミドルウェアが含まれています。

</Step>

<Step number={2} title="プロジェクトの設定">

アプリケーションの言語を設定するための config ファイルを作成します:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> この設定ファイルを通じて、ローカライズされた URL、ミドルウェアリダイレクト、Cookie 名、コンテンツ宣言の場所と拡張子、Intlayer ログのコンソールへの出力の無効化など、さまざまな設定ができます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="Intlayer を Vite 設定に統合する">

intlayer プラグインを設定に追加します。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> `intlayer()` Vite プラグインは、Intlayer と Vite を統合するために使用されます。コンテンツ宣言ファイルのビルドを保証し、開発モードでそれらを監視します。Vite アプリケーション内に Intlayer 環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

</Step>

<Step number={4} title="コンテンツの宣言">

コンテンツ宣言を作成・管理して翻訳を保存します:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ja: "Vite ロゴ",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ja: "React ロゴ",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ja: "カウント: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      ja: (
        <>
          <code>src/App.tsx</code> を編集して保存し、HMR をテストします
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
      ja: "Vite と React のロゴをクリックして詳細を確認します",
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
        "ja": "Viteロゴ",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "ja": "Reactロゴ",
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
        "ja": "src/App.tsxを編集して保存し、HMRをテストしてください",
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ja": "ViteおよびReactのロゴをクリックして、詳細を確認してください",
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトでは `./src`）に含まれている限り、アプリケーション内のどこでも定義できます。そして、コンテンツ宣言ファイル拡張子（デフォルトでは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）と一致する必要があります。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

> コンテンツファイルに TSX コードが含まれている場合は、コンテンツファイルに `import React from "react";` をインポートすることを検討してください。

</Step>

<Step number={5} title="コードで Intlayer を利用する">

アプリケーション全体でコンテンツ辞書にアクセスします:

```tsx {5,9} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
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

> `string` 属性（`alt`、`title`、`href`、`aria-label` など）でコンテンツを使用したい場合は、関数の値を次のように使用できます：

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` フックについて詳しく知るには、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください。

> 既存のアプリケーションがある場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)と[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を使用して、数千のコンポーネントを数秒で変換できます。

</Step>

<Step number={6} title="コンテンツの言語を変更する" isOptional={true}>

コンテンツの言語を変更するには、`useLocale` フックから提供される `setLocale` 関数を使用できます。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

> `useLocale` フックについてさらに詳しく知るには、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください。

</Step>

<Step number={7} title="アプリケーションにローカライズされたルーティングを追加する" isOptional={true}>

このステップの目的は、言語ごとに一意のルートを作成することです。これはSEOとSEOフレンドリーなURLに役立ちます。
例：

```- https://example.com/about
- https://example.com/ja/about
- https://example.com/fr/about
```

> デフォルトでは、デフォルトロケールのルートにはプレフィックスが付きません。デフォルトロケールにプレフィックスを付けたい場合は、設定で `middleware.prefixDefault` オプションを `true` に設定できます。詳細については、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールベースのルーティングを処理する `LocaleRouter` コンポーネントを作成できます。[React Router](https://reactrouter.com/home) を使用した例を以下に示します:

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
import { localeMap } from "intlayer"; // 'intlayer'からのユーティリティ関数と型
import type { FC, PropsWithChildren } from "react"; // 関数コンポーネントとpropsのReact型
import { IntlayerProvider } from "react-intlayer"; // 国際化コンテキスト用のプロバイダー
import { BrowserRouter, Route, Routes } from "react-router-dom"; // ナビゲーション管理用のルーターコンポーネント

/**
 * ロケール固有のルートを設定するルーターコンポーネント。
 * React Routerを使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // ロケール（例：/en/、/fr/）をキャプチャし、その後のすべてのパスにマッチするルートパターン
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // ロケール管理でchildrenをラップ
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

> 注記: `routing.mode: 'no-prefix' | 'search-params'`を使用する場合、おそらく`localeMap`関数を使用する必要はありません。

Then, you can use the `LocaleRouter` component in your application:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... AppContentコンポーネント

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

並行して、`intlayerProxy` を使用して、アプリケーションにサーバーサイド ルーティングを追加することもできます。このプラグインは、URL に基づいて現在のロケールを自動的に検出し、適切なロケール Cookie を設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザ言語設定に基づいて最適なロケールを決定します。ロケールが検出されない場合、デフォルト ロケールにリダイレクトされます。

> `intlayerProxy` を本番環境で使用するには、`vite-intlayer` パッケージを `devDependencies` から `dependencies` に移動する必要があることに注意してください。

> Intlayer v9以降、`intlayerProxy()`は`intlayer()`プラグインに直接バンドルされており、`routing.enableProxy`オプション（デフォルトでは`true`）を通じてデフォルトで有効になっています。以下に示すように別々に登録することはオプションになりました — これは後方互換性とプラグインの順序を制御する必要があるセットアップのために保持されています。`routing.enableProxy: false`に設定してオプトアウトしてください。[v9リリースノート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/releases/v9.md)を参照してください。

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={8} title="ロケールが変更されたときにURLを変更する" isOptional={true}>

ロケールが変更されたときにURLを変更するには、`useLocale`フックで提供される`onLocaleChange`プロップを使用できます。並行して、`react-router-dom`から`useLocation`および`useNavigate`フックを使用して、URLパスを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
              {/* 独自のロケールでの言語 - 例: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: 現在のロケールがLocales.SPANISHに設定されている場合はFrancés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英語での言語 - 例: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> ドキュメントリファレンス:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

以下は、追加の説明と改良されたコード例を含む更新された **Step 9** です:

---

</Step>

<Step number={9} title="HTMLの言語属性と方向属性を切り替える" isOptional={true}>

アプリケーションが複数の言語をサポートしている場合、現在のロケールに合わせて `<html>` タグの `lang` および `dir` 属性を更新することが重要です。そうすることで、以下が保証されます:

- **Accessibility**: スクリーンリーダーと支援技術は、正しい `lang` 属性に依存して、コンテンツを正確に発音・解釈します。
- **Text Rendering**: `dir` (direction) 属性により、テキストが適切な順序でレンダリングされます (例：英語は左から右へ、アラビア語またはヘブライ語は右から左へ)。これは可読性に不可欠です。
- **SEO**: 検索エンジンは `lang` 属性を使用してページの言語を判断し、検索結果で適切なローカライズされたコンテンツを配信するのに役立ちます。

ロケールが変更されるときにこれらの属性を動的に更新することで、サポートされているすべての言語にわたってユーザーに一貫性のあるアクセスしやすい体験を保証します。

#### フックの実装

HTML属性を管理するためのカスタムフックを作成します。このフックはロケールの変更を監視し、それに応じて属性を更新します:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいて、HTMLの <html> 要素の `lang` 属性と `dir` 属性を更新します。
 * - `lang`: ブラウザや検索エンジンにページの言語を通知します。
 * - `dir`: 正しい読み取り順序（例：英語の場合は 'ltr'、アラビア語の場合は 'rtl'）を保証します。
 *
 * この動的な更新は、適切なテキストレンダリング、アクセシビリティ、およびSEOにとって不可欠です。
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

#### アプリケーションでのフックの使用

ロケールが変更されるたびに HTML 属性が更新されるように、フックをメインコンポーネントに統合します：

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // ロケールに基づいて <html> タグの lang および dir 属性を更新するためにフックを適用します。
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

これらの変更を適用することで、アプリケーションは以下のようになります：

- **言語** (`lang`) 属性が現在のロケールを正確に反映するようになり、これは SEO やブラウザの動作にとって重要です。
- ロケールに応じて**テキストの方向** (`dir`) を調整し、読み取り順序が異なる言語の可読性とユーザビリティを向上させます。
- 支援技術が最適に機能するためにこれらの属性に依存しているため、より**アクセシブル**な体験を提供します。

</Step>

<Step number={10} title="ローカライズされた Link コンポーネントの作成" isOptional={true}>

アプリケーションのナビゲーションが現在のロケールを尊重するように、カスタムの `Link` コンポーネントを作成できます。このコンポーネントは、内部 URL の先頭に現在の言語を自動的に付加します。例えば、フランス語を話すユーザーが「About」ページへのリンクをクリックすると、`/about` ではなく `/fr/about` にリダイレクトされます。

この動作は、いくつかの理由で有用です：

- **SEO とユーザーエクスペリエンス**: ローカライズされた URL は、検索エンジンが言語固有のページを正しくインデックスするのを助け、ユーザーに好みの言語でコンテンツを提供します。
- **一貫性**: アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まることを保証し、予期しない言語の切り替えを防ぎます。
- **メンテナンス性**: ローカリゼーション ロジックを単一のコンポーネントに集約することで URL の管理が簡素化され、アプリケーションの成長に合わせて codebase のメンテナンスや拡張が容易になります。

以下は、TypeScript でのローカライズされた `Link` コンポーネントの実装です：

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps extends DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {}

/**
 * 与えられた URL が外部へのものかどうかを確認するユーティリティ関数。
 * URL が http:// または https:// で始まる場合、外部と見なされます。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいて href 属性を適応させるカスタム Link コンポーネント。
 * 内部リンクの場合、`getLocalizedUrl` を使用して URL にロケールを付加します（例: /fr/about）。
 * これにより、ナビゲーションが同じロケール コンテキスト内に留まることが保証されます。
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // リンクが内部向けであり、有効な href が提供されている場合、ローカライズされた URL を取得します。
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

#### 仕組み

- **外部リンクの検出**:  
  ヘルパー関数 `checkIsExternalLink` は、URLが外部リンクであるかどうかを判断します。外部リンクはローカライズの必要がないため、そのままにされます。

- **現在のロケールの取得**:  
  `useLocale` フックは、現在のロケール（例：フランス語の場合は `fr`）を提供します。

- **URLのローカライズ**:  
  内部リンク（すなわち、外部ではないリンク）の場合、`getLocalizedUrl` を使用して自動的に現在のロケールをURLのプレフィックスとして付加します。これは、ユーザーがフランス語環境にいる場合、`href` として `/about` を渡すと `/fr/about` に変換されることを意味します。

- **リンクの返却**:  
  コンポーネントは、ローカライズされたURLを持つ `<a>` 要素を返し、ナビゲーションがロケールと一貫するようにします。

この `Link` コンポーネントをアプリケーション全体に統合することで、SEOとユーザビリティの向上というメリットを享受しながら、一貫性のある言語対応のユーザーエクスペリエンスを維持できます。

</Step>

<Step number={11} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

既存のコードベースがある場合、数千ものファイルを変換するのは時間がかかる場合があります。

このプロセスを容易にするために、Intlayerはコンポーネントを変換し、コンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [エクストラクター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提供しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加できます。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを指定します。
     *
     * - `true` の場合、コンパイラはディスク上のコンポーネントファイルを書き換えます。これにより変換は永続的になり、次回のプロセスでは変換をスキップします。その方法で、コンパイラがアプリを変換した後に、コンパイラを削除することができます。
     *
     * - `false` の場合、コンパイラはビルド出力のコードにのみ `useIntlayer()` 関数の呼び出しを注入し、元のコードベースはそのまま維持します。変換はメモリ内でのみ行われます。
     */
    saveComponents: false,

    /**
     * 辞書キーのプレフィックス
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

エクストラクターを実行して、コンポーネントを変換しコンテンツを抽出します

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # または npm run dev
```

```bash packageManager="pnpm"
pnpm run build # または pnpm run dev
```

```bash packageManager="yarn"
yarn build # または yarn dev
```

```bash packageManager="bun"
bun run build # または bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### （任意）サイトマップと robots.txt（ビルド時生成）

Intlayer は `generateSitemap` と `getMultilingualUrls` により、クローラ向けに整形した多言語の `sitemap.xml` と `robots.txt` を `public/` に自動で書き出せます。通常は Vite より**前**に小さな Node スクリプトを走らせます（例: npm の `predev` / `prebuild`）。

#### サイトマップ

Intlayer のサイトマップ生成はロケール設定を踏まえ、クローラ向けのメタデータを含めます。

> 生成されるサイトマップは `xhtml:link`（hreflang）をサポートします。単純な URL 列挙ではなく、各ページの言語版同士を双方向で結びます（例: `/about`、`/fr/about`、`/about?lang=fr` などルーティングに依存）。

#### Robots.txt

`getMultilingualUrls` で `Disallow` を、機微パスの**すべての言語 URL**に効かせます。

#### 1. プロジェクトルートに `generate-seo.mjs` を置く

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

`intlayer` がインストールされている必要があります。本番では環境変数 `SITE_URL` を設定してください（CI など）。

> Node の ESM では `generate-seo.mjs` を推奨します。`generate-seo.js` にする場合は `package.json` の `"type": "module"` などで ESM を有効にしてください。

#### 2. Vite より前にスクリプトを実行する

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

pnpm や yarn を使う場合はコマンドを読み替えてください。CI から呼び出しても構いません。

### TypeScriptの設定

Intlayerはモジュール拡張（module augmentation）を使用してTypeScriptの利点を活用し、コードベースをより強固にします。

![オートコンプリート](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に、自動生成された型が含まれていることを確認してください。

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

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore`ファイルに以下の指示を追加できます。

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

### VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下の機能を提供します：

- 翻訳キーの **オートコンプリート**。
- 不足している翻訳の **リアルタイムエラー検出**。
- 翻訳済みコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成・更新するための **クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/ja/doc/vs-code-extension)を参照してください。

---

### さらに進むために

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。
