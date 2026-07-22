---
createdAt: 2025-04-18
updatedAt: 2026-06-23
title: "Vite + Preact i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Vite + Preactアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
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
applicationShowcase: https://intlayer-vite-preact-template.vercel.app
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

# IntlayerでVite and Preactを翻訳する | 国際化（i18n）

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-preact-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-vite-preact-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-vite-preact-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

> このパッケージは開発中です。詳細は[issue](https://github.com/aymericzip/intlayer/issues/118)をご覧ください。Intlayer for Preact に関心がある場合は、issue に「いいね」をして興味を示してください。

GitHub の[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vite-preact-template)もご覧ください。

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「preact-i18n」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**Preact を完全にカバー**

Intlayer は、**コンポーネント レベルのコンテンツ スコープ**、**遅延読み込み**、および国際化のスケーリング (i18n) に必要なすべての機能を提供することで、Preact と完全に連携するように最適化されています。

**バンドルサイズ**

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。 Intlayer は、**バンドルとページのサイズを最大 50% 削減**するのに役立ちます。

**保守性**

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの **メンテナンスが容易になります**。コンテンツ コードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

**AI エージェント**

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって **必要なコンテキストが削減**されます。 Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** などのツール スイートも付属しています。および **[エージェント スキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)** により、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

**オートメーション**

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化を変換します。 Intlayer は、コンテンツ抽出を自動化する **コンパイラー** と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

**パフォーマンス**

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。 Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

**非開発によるスケーリング**

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

---

## Vite と Preact アプリケーションで Intlayer をセットアップするステップバイステップガイド

GitHub の[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vite-preact-template)を参照してください。

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

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および [CLI コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージです。

- **preact-intlayer**
  Intlayer と Preact アプリケーションを統合するパッケージです。Preact の国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayer を[Vite バンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するための Vite プラグイン、およびユーザーの優先ロケールを検出し、Cookie を管理し、URL リダイレクトを処理するミドルウェアが含まれています。

</Step>

<Step number={2} title="プロジェクトの構成">

アプリケーションの言語を構成するための設定ファイルを作成します:

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
  routing: {
    mode: "prefix-no-default", // デフォルト: デフォルトロケール以外のすべてのロケールにプレフィックスを付ける
    storage: ["cookie", "header"], // デフォルト: Cookie にロケールを保存し、ヘッダーから検出する
  },
};

export default config;
```

> この設定ファイルを通じて、ローカライズされた URL、ルーティング モード、ストレージ オプション、Cookie 名、コンテンツ宣言の場所と拡張子、コンソールで Intlayer ログを無効にするなど、その他多くの設定を行うことができます。利用可能なパラメーターの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="Vite 構成に Intlayer を統合">

設定に intlayer プラグインを追加します。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

> `intlayer()` Vite プラグインは、Intlayer を Vite と統合するために使用されます。コンテンツ宣言ファイルのビルドを確保し、開発モードでそれらを監視します。Vite アプリケーション内で Intlayer 環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

</Step>

<Step number={4} title="コンテンツを宣言">

翻訳を保存するためのコンテンツ宣言を作成および管理します:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ja: "Vite ロゴ",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      ja: "Preact ロゴ",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      ja: "カウント: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      ja: (
        <>
          <code>src/app.tsx</code> を編集して保存し、HMR をテストしてください
        </>
      ),
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
      ja: "詳細については、Vite と Preact のロゴをクリックしてください",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
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
        "ja": "カウント: ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "ja": "src/app.tsx を編集して保存し、HMR をテストしてください",
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ja": "詳細については、Vite と Preact のロゴをクリックしてください",
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ (デフォルトでは `./src`) に含まれており、コンテンツ宣言ファイルの拡張子 (デフォルトでは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`) と一致する限り、アプリケーションのどこでも定義できます。

> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

> コンテンツファイルに TSX コードが含まれている場合、`import { h } from "preact";` をインポートするか、Preact 用に JSX pragma が正しく設定されていることを確認する必要があります。

</Step>

<Step number={5} title="コードで Intlayer を利用">

アプリケーション全体でコンテンツ辞書にアクセスします:

```tsx {6,10} fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // preact.svg があると仮定
import viteLogo from "/vite.svg";
import "./app.css"; // CSS ファイルが app.css という名前であると仮定
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

> `alt`、`title`、`href`、`aria-label` などの `string` 属性でコンテンツを使用したい場合、次のように関数の値を使用できます:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> 注: Preact では、`className` は通常 `class` として書かれます。

> `useIntlayer` フック の詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)を参照してください (`preact-intlayer` の API は同様です)。

> アプリがすでに存在する場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) および [extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を使用して、数秒で数千のコンポーネントを変換できます。

</Step>

<Step number={6} title="コンテンツの言語を変更" isOptional={true}>

コンテンツの言語を変更するには、`useLocale` フックで提供される `setLocale` 関数を使用できます。この関数により、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

> `useLocale` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)を参照してください (`preact-intlayer` の API は同様です)。

</Step>

<Step number={7} title="アプリケーションにローカライズされたルーティングを追加" isOptional={true}>

このステップの目的は、各言語にユニークなルートを作成することです。これは SEO とユーザーフレンドリーな URL に有効です。
例:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> デフォルトでは、ルートはデフォルトロケールに対してプレフィックス付きになりません。デフォルトロケールにプレフィックスを付けたい場合は、設定で `routing.mode` オプションを `"prefix-all"` に設定できます。詳細については、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

アプリケーションにローカライズされたルーティングを追加するには、アプリケーションのルートをラップし、ロケールベースのルーティングを処理する `LocaleRouter` コンポーネントを作成できます。[preact-iso](https://github.com/preactjs/preact-iso) を使用した例を次に示します:

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * ロケール固有のルートをセットアップするルーターコンポーネント。
 * preact-iso を使用してナビゲーションを管理し、ローカライズされたコンポーネントをレンダリングします。
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

その後、アプリケーションで `LocaleRouter` コンポーネントを使用できます:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

並行して、`intlayerProxy` を使用してサーバーサイドルーティングをアプリケーションに追加することもできます。このプラグインは、URL に基づいて現在のロケールを自動的に検出し、適切なロケール Cookie を設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザ言語設定に基づいて最も適切なロケールを決定します。ロケールが検出されない場合、デフォルトロケールにリダイレクトします。

> 本番環境で `intlayerProxy` を使用するには、`vite-intlayer` パッケージを `devDependencies` から `dependencies` に切り替える必要があることに注意してください。

> Intlayer v9 以降、`intlayerProxy()` は `intlayer()` プラグインに直接バンドルされ、`routing.enableProxy` オプション (デフォルトで `true`) を通じてデフォルトで有効になっています。以下に示すように個別に登録することはオプションになりました — これは後方互換性のため、およびプラグインの順序を制御する必要があるセットアップのために保持されます。オプトアウトするには `routing.enableProxy: false` を設定してください。[v9 リリースノート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/releases/v9.md)を参照してください。

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={8} title="ロケール変更時に URL を変更" isOptional={true}>

ロケール変更時に URL を変更するには、`useLocale` フックで提供される `onLocaleChange` prop を使用できます。並行して、`preact-iso` の `useLocation` から `route` メソッドを使用して URL パスを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
      route(pathWithLocale, true); // true は置換用
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
              // ロケール設定後のプログラム的なナビゲーションは onLocaleChange で処理されます
            }}
            key={localeItem}
          >
            <span>
              {/* ロケール - 例: FR */}
              {localeItem}
            </span>
            <span>
              {/* 自身のロケールでの言語 - 例: Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 現在のロケールでの言語 - 例: 現在のロケールが Locales.SPANISH に設定されている場合の Francés */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

> ドキュメント参照:
>
> > - [`useLocale` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md) (`preact-intlayer` の API は同様)> - [`getLocaleName` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)> - [`getLocalizedUrl` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)> - [`getHTMLTextDir` フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)> - [`hreflang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ja)> - [`lang` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/lang)> - [`dir` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` 属性](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/ja/docs/Web/API/Popover_API)

以下は、説明とコード例が改善された更新版**ステップ 9**です:

---

</Step>

<Step number={9} title="HTML言語と方向属性を切り替え" isOptional={true}>

アプリケーションが複数の言語をサポートしている場合、現在のロケールと一致するように `<html>` タグの `lang` 属性と `dir` 属性を更新することが重要です。これにより以下が確保されます:

- **アクセシビリティ**: スクリーンリーダーとアシスティブテクノロジーは、コンテンツを正確に発音および解釈するために正しい `lang` 属性に依存しています。
- **テキストレンダリング**: `dir` (方向) 属性は、テキストが適切な順序 (例: 英語の場合は左から右、アラビア語またはヘブライ語の場合は右から左) でレンダリングされることを保証し、可読性に不可欠です。
- **SEO**: 検索エンジンは `lang` 属性を使用してページの言語を判定し、検索結果に適切なローカライズされたコンテンツを配信するのに役立ちます。

ロケール変更時にこれらの属性を動的に更新することで、サポートされているすべての言語でユーザーに一貫性のあるアクセス可能なエクスペリエンスを保証します。

#### フックの実装

HTML属性を管理するカスタムフックを作成します。このフックはロケール変更をリッスンし、それに応じて属性を更新します:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 現在のロケールに基づいて HTML <html> 要素の `lang` および `dir` 属性を更新します。
 * - `lang`: ブラウザと検索エンジンにページの言語を通知します。
 * - `dir`: 正しい読み取り順序を確保します（例：英語の場合は 'ltr'、アラビア語の場合は 'rtl'）。
 *
 * この動的更新は、適切なテキストレンダリング、アクセシビリティ、およびSEOに不可欠です。
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 言語属性を現在のロケールに更新します。
    document.documentElement.lang = locale;

    // 現在のロケールに基づいてテキスト方向を設定します。
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### アプリケーションでフックを使用する

ロケールが変更されるたびにHTML属性が更新されるように、フックをメインコンポーネントに統合します：

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // AppContentが必要な場合、useIntlayerが既にインポートされています
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// ステップ5でのAppContent定義

const AppWithHooks: FunctionalComponent = () => {
  // フックを適用して、ロケールに基づいて<html>タグのlangおよびdir属性を更新します。
  useI18nHTMLAttributes();

  // AppContentはステップ5からのメインコンテンツ表示コンポーネントと仮定します
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

これらの変更を適用することで、アプリケーションは以下のようになります：

- **言語**（`lang`）属性が現在のロケールを正しく反映することを確保し、これはSEOとブラウザの動作にとって重要です。
- ロケールに従って**テキスト方向**（`dir`）を調整し、異なる読む順序を持つ言語の読みやすさと使いやすさを向上させます。
- より**アクセシブル**な体験を提供します。補助技術はこれらの属性に依存して最適に機能するためです。

</Step>

<Step number={10} title="ローカライズされたLinkコンポーネントの作成" isOptional={true}>

アプリケーションのナビゲーションが現在のロケールを尊重することを確保するために、カスタム`Link`コンポーネントを作成できます。このコンポーネントは、内部URLに現在の言語を自動的にプレフィックスします。

この動作は複数の理由で有用です：

- **SEOとユーザー体験**：ローカライズされたURLは、検索エンジンが言語固有のページを正しくインデックスするのに役立ち、ユーザーに優先言語のコンテンツを提供します。
- **一貫性**：アプリケーション全体でローカライズされたリンクを使用することで、ナビゲーションが現在のロケール内に留まることを保証し、予期しない言語の切り替えを防ぎます。
- **保守性**：単一のコンポーネントにローカライズロジックを集約することで、URLの管理を簡素化します。

以下は、Preactでのローカライズされた`Link`コンポーネントの実装です：

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * 与えられたURLが外部URLかどうかをチェックするユーティリティ関数。
 * URLがhttp://またはhttps://で始まる場合、外部と見なされます。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 現在のロケールに基づいてhref属性を適応させるカスタムLinkコンポーネント。
 * 内部リンクの場合、`getLocalizedUrl`を使用してURLをロケール（例：/fr/about）でプレフィックスします。
 * これにより、ナビゲーションが同じロケールコンテキスト内に留まることを確保します。
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // リンクが内部で、有効なhrefが提供されている場合、ローカライズされたURLを取得します。
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

## Vite と Preact アプリケーションで Intlayer をセットアップするステップバイステップガイド

<Steps>

<Step number={1} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

既存のコードベースがある場合、数千のファイルを変換するのは時間がかかることがあります。

このプロセスを容易にするために、Intlayerは、コンポーネントを変換しコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [エクストラクタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提案しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の構成
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します。
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを指定します。これにより、コンパイラを一度だけ実行してアプリを変換し、その後削除することができます。
     */
    saveComponents: false,

    /**
     * 辞書キーの接頭辞
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='抽出コマンド'>

コンポーネントを変換してコンテンツを抽出するためにエクストラクタを実行します

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
 <Tab value='Babelコンパイラ'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // コンポーネントから辞書へコンテンツを抽出する
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
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
bun run build # Or bun run dev
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

### TypeScriptを設定する

Intlayerはモジュール拡張を使用してTypeScriptの利点を活かし、codebaseをより堅牢にします。

![オートコンプリーション](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript設定に自動生成型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Preact 10+推奨
    // ...
  },
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

> `tsconfig.json`がPreact用に設定されていることを確認してください。特に`jsx`と`jsxImportSource`、または`preset-vite`のデフォルトを使用していない場合は古いPreactバージョンの`jsxFactory`/`jsxFragmentFactory`を設定してください。

### Git Configuration

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、Git リポジトリにコミットするのを避けることができます。

これを行うには、`.gitignore` ファイルに次の指示を追加できます：

```bash
# Intlayer によって生成されたファイルを無視する
.intlayer
```

### VS Code Extension

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下の機能を提供します:

- 翻訳キーの **自動補完**。
- 不足している翻訳に対する **リアルタイムエラー検出**。
- 翻訳されたコンテンツの **インラインプレビュー**。
- 翻訳の作成と更新を簡単に行うための **クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進む

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) を使用してコンテンツを外部化できます。

---
