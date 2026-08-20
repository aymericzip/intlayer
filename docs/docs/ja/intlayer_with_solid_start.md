---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "Solid Start i18n - アプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）SolidStartアプリを構築するためのガイド。サーバーレンダリングされたロケールルーティング、hreflang、サイトマップ、AI支援翻訳。"
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Initial history"
author: aymericzip
---

# Intlayer を使用して SolidStart Web サイトを翻訳する | 国際化 (i18n)

<Tabs defaultTab="video">
  <Tab label="動画" value="video">

<iframe title="ViteとSolidに最適なi18nソリューション？Intlayerをご紹介" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目次

<TOC/>

このガイドでは、**サーバーレンダリング**された SolidStart アプリケーションを扱います。ロケール検出はリクエスト時に行われ、ページは正しい言語でサーバー上にレンダリングされ、検索エンジンが必要とする `<html lang>`、`hreflang`、サイトマップのシグナルはサーバー側で出力されます。

## 代替手段ではなく Intlayer を選ぶ理由

`@solid-primitives/i18n` や `i18next` などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

<AccordionGroup>

<Accordion header="Solid の完全なサポート">

Intlayer は、**コンポーネントレベルのコンテンツスコープ**、**リアクティブな翻訳**、および国際化 (i18n) の拡張に必要なすべての機能を提供することで、Solid と完全に連携するように最適化されています。

</Accordion>

<Accordion header="バンドルサイズ">

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。Intlayer は、**バンドルとページのサイズを最大 50% 削減**するのに役立ちます。

</Accordion>

<Accordion header="保守性">

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの**メンテナンスが容易になります**。コンテンツコードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

</Accordion>

<Accordion header="AI エージェント">

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって**必要なコンテキストが削減**されます。Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**、**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)** などのツールスイートも付属しており、AI エージェントの開発者エクスペリエンス (DX) をさらにスムーズにします。

</Accordion>

<Accordion header="自動化">

AI プロバイダーのコストで、選択した LLM を使用して CI/CD パイプラインで翻訳を自動化します。Intlayer は、コンテンツ抽出を自動化する**コンパイラ**や、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

</Accordion>

<Accordion header="パフォーマンス">

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。Intlayer は、ビルド時のコンテンツ読み込みを最適化します。

</Accordion>

<Accordion header="開発者以外のメンバーとのスケーリング">

単なる i18n ソリューションにとどまらず、Intlayer は**セルフホスト型の[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**と**[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**を提供し、多言語コンテンツを**リアルタイム**で管理できるようにします。これにより、翻訳者、コピーライター、その他のチームメンバーとのコラボレーションがスムーズになります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>
</AccordionGroup>

---

## SolidStart アプリケーションで Intlayer をセットアップするためのステップバイステップガイド

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

> このコマンドは環境を検出し、必要なパッケージをインストールします。例:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)、トランスパイル、[CLI コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)のための国際化ツールを提供するコアパッケージです。

- **solid-intlayer**

  Intlayer を Solid アプリケーションに統合するパッケージです。Solid の国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**

  Intlayer を [Vite バンドラー](https://vite.dev/guide/why.html#why-bundle-for-production) に統合するための Vite プラグインと、ユーザーの優先ロケールを検出し、Cookie を管理し、URL リダイレクトを処理するロケールルーティングハンドラーが含まれています。

> `vite-intlayer` は、単なるビルド時の懸念事項ではなく、サーバー側の懸念事項でもあります。SolidStart の Nitro サーバーが実行するリクエストハンドラーを提供します。`dependencies` に維持するのが安全なデフォルトです。コンパイルされた `.output` ディレクトリをデプロイし、Nitro がハンドラーをインライン化する場合にのみ、`devDependencies` に移動できます。

</Step>

<Step number={2} title="プロジェクトの設定">

アプリケーションの言語を設定するための設定ファイルを作成します:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

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
    mode: "prefix-no-default",
  },
};

export default config;
```

`prefix-no-default` を使用すると、デフォルトのロケールはプレフィックスのない URL から提供されます:

```plaintext
/            /about          → 英語     (デフォルトロケール)
/fr          /fr/about       → フランス語
/es          /es/about       → スペイン語
```

> この設定ファイルを使用して、ローカライズされた URL、ミドルウェアのリダイレクト、Cookie 名、コンテンツ宣言の場所と拡張子の設定、コンソールでの Intlayer ログの無効化などを行うことができます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)を参照してください。

</Step>

<Step number={3} title="Vite 設定への Intlayer の統合">

Intlayer プラグインを設定に追加します:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> `intlayer()` Vite プラグインは、コンテンツ宣言ファイルをビルドし、開発モードで監視し、アプリケーション内に Intlayer 環境変数を定義します。また、パフォーマンスを最適化するエイリアスも提供します。

### ロケールルーティングはプラグインに付属しています

SolidStart は [Nitro](https://nitro.build) 上で動作し、`intlayer()` はロケールルーティングハンドラーを Nitro のサーバーパイプラインに直接登録します（デフォルトで `true` になっている `routing.enableProxy` オプションを介して）。他に接続するものは何もありません。構築されたサーバー上では、すべてのリクエストがルーターに到達する前に検査されます。

- ロケールは URL プレフィックス、次に `INTLAYER_LOCALE` Cookie、次に `Accept-Language` ヘッダーから読み取られます。
- 解決されたロケールがデフォルトのものではない場合、プレフィックスのない URL は対応するローカライズされた URL にリダイレクトされます (`/` → `/fr`)。
- 冗長なプレフィックスを持つ URL は、正規の形式にリダイレクトされます (`/en/about` → `/about`)。
- ロケール Cookie はレスポンスに書き戻されます。

</Step>

<Step number={4} title="コンテンツの宣言">

翻訳を保存するためのコンテンツ宣言を作成および管理します:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **SolidStart 固有の注意点**: `src/routes` 配下のすべての `.ts` / `.tsx` ファイルはルートになり、`.content.ts` ファイルにはデフォルトのエクスポートがあるため、ページとして検出されてしまいます。**ページ**のコンテンツ宣言はルートディレクトリの外に配置してください (`src/contents/` が適しています)。**コンポーネント**のコンテンツは、`src/components` がファイルシステムルーターによってスキャンされないため、同じ場所に配置したままで問題ありません。

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトでは `./src`）に含まれ、コンテンツ宣言ファイルの拡張子（デフォルトでは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）と一致していれば、アプリケーション内のどこにでも定義できます。
>
> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)を参照してください。

</Step>

<Step number={5} title="ローカライズされたルーティングの追加">

このステップの目標は、各言語に独自の URL を与えることです。これは検索エンジンがインデックスを作成する対象となります。

ページを**オプションの動的セグメント**に移動します。SolidStart のファイルシステムルーターでは、`[[locale]]` は `:locale?` パスパターンにコンパイルされます:

```plaintext
src/routes/
  [[locale]].tsx          ← セグメントを検証するレイアウト
  [[locale]]/
    index.tsx             → /        および /fr        および /es
    about.tsx             → /about   および /fr/about  および /es/about
  [...404].tsx            → その他のすべてをキャッチ
```

レイアウトファイルの唯一の役割は、セグメントを設定されたロケールに制約することです:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` は `:locale?` を 2 つのパターン（セグメントありとセグメントなし）に拡張し、降順の特定性でそれらを試行します。`matchFilters` は、機能する設定と混乱を招く設定の差を生み出すものです:

| URL         | `matchFilters` なし                                | `matchFilters` あり                            |
| ----------- | -------------------------------------------------- | ---------------------------------------------- |
| `/fr/about` | フランス語の about ページ                          | フランス語の about ページ                      |
| `/about`    | About ページ (静的セグメントが優先)                | About ページ                                   |
| `/unknown`  | **ホーム ページ**（`locale=unknown` で静かに表示） | 一致なし → キャッチオール 404 にフォールスルー |

> `'prefix-all'` ルーティングモードを使用する場合は `[[locale]]` の代わりに `[locale]` (必須) を推奨し、`'no-prefix'` や `'search-params'` の場合はセグメントを完全に削除します。

</Step>

<Step number={6} title="アプリケーションへのロケールの提供">

URL はロケールの唯一の信頼できる情報源です。ミドルウェアはすでにリクエストをローカライズされたパスにリダイレクトしているため、ルートレイアウトでパスを読み取ることで、サーバーレンダリングとクライアントハイドレーションの一致が保たれ、クライアント側のナビゲーションごとに無料でロケールが更新されます。

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // サーバーは entry-server.tsx で <html> をレンダリングします。クライアント側のロケール間
  // ナビゲーションでは、属性自体を更新する必要があります。
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` はその `locale` プロパティに反応するため、JSX 内でアクセサー呼び出し `locale()` を渡すだけで十分です。Solid はそれをゲッターにコンパイルし、URL が変更されるとツリー全体が新しい言語で再レンダリングされます。

</Step>

<Step number={7} title="サーバー上での HTML lang および dir 属性の設定">

`<html>` エレメントは `Router` の外部にある `entry-server.tsx` によってレンダリングされます。代わりにリクエスト URL からロケールを読み取ります:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

クローラーは最初のバイトで正しい言語を受け取るようになります:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="ページでの Intlayer の活用">

アプリケーション全体でコンテンツ辞書にアクセスします:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> Solid では、`useIntlayer` はリアクティブなコンテンツ（例: `content`）を返します。そのプロパティに直接アクセスできます。

> `alt`、`title`、`href`、`aria-label` などの `string` 属性でコンテンツを使用したい場合は、次のように関数の値を使用できます:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)を参照してください。

コンテンツノードは単純な翻訳に限定されません。例えば、複数形化されたカウンター:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` はアクティブなロケールの `Intl.PluralRules` を介してカテゴリを選択するため、3 つ以上の複数形を持つ言語でも余分なコードなしで動作します。

</Step>

<Step number={9} title="ローカライズされた Link コンポーネントの作成">

内部 URL に現在の言語のプレフィックスを自動的に付与するカスタム `Link` コンポーネントを作成します:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

一度 `href="/about"` と記述するだけで、アクティブなロケールに応じて `/about`、`/fr/about`、または `/es/about` が生成されるようになります。ページ内のどこでも手動でプレフィックスを付ける必要はありません。

</Step>

<Step number={10} title="ロケールスイッチャーコンポーネントの作成">

スイッチャーを `<select>` ではなく**実際のアンカー**としてレンダリングします。現在のページの各言語が新しいタブで開くことができるクロール可能なリンクになり、JavaScript のみのコントロールでは提供できない利点が得られます。

`getPathWithoutLocale` は現在のパスからロケールセグメントを取り除き、`getLocalizedUrl` はターゲットロケール用にそれを再構築するため、何もハードコーディングすることなくリンクがルーティングモードに従います。レンダリングされたロケールを変更するのはナビゲーションであり（`[[locale]]` ルートは URL からそれを導出します）、`setLocale` は選択を `INTLAYER_LOCALE` Cookie に保持するため、後でロケールなしの URL を訪問したときに同じ言語に解決されます。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // 現在表示されているページの正規（ロケールなし）パス
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // 完全一致のみ。デフォルトロケールのリンクがすべてのページでアクティブとして
              // フラグが立てられないようにするため
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // ブラウザの「戻る」ボタンが前のページに戻ることを保証します
              replace
            >
              {/* 独自のロケールでの言語 - 例: Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> Solid では、`useLocale` からの `locale` は**シグナルアクセサー**です。リアクティブに現在の値を読み取るには、`locale()`（括弧付き）を使用します。
>
> `getLocaleName(localeItem)` は各言語を独自の言語で表示します（`English / Français / Español`）。2 番目の引数を渡すと、代わりに現在表示されている言語に名前を翻訳します: `getLocaleName(localeItem, locale())` は英語で `English / French / Spanish`、日本語で `英語 / フランス語 / スペイン語` を返します。
>
> `<A>` は現在の URL に一致するリンクにすでに `aria-current="page"` を設定しているため、そこに追加するものはありません。`replace` はレンダリングされた属性からルーターによって読み取られます。履歴エントリをプッシュするのではなく置き換えるため、ブラウザの「戻る」ボタンは前の言語の同じページではなく、切り替え前に訪問したページに戻ります。
>
> 各リンクの `dir` と `hreflang` は、右から左への言語名を正しく配置し、支援技術やクローラーに各リンクがどの言語を指しているかを伝えます。
>
> `useLocale` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)を参照してください。

</Step>

<Step number={11} title="canonical および hreflang リンクの出力" isOptional={true}>

`hreflang` アノテーションは、`/about`、`/fr/about`、`/es/about` が異なる言語での同じページであることを検索エンジンに伝えます。`getMultilingualUrls` はルーティングモードに従って、正規（ロケールなし）のパスからそれらを導出するため、何もハードコーディングされません:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** レンダリングされているページの絶対 URL。 */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

これをドキュメントの head（リクエスト URL が利用可能な場所）にレンダリングします:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … <head> 内、他の meta タグの隣:
<AlternateLinks url={url} />;
```

`GET /fr/about` は以下を出力します:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **`@solidjs/meta` に関する注意**: 執筆時点では、`@solidjs/meta` の `<Title>` と `<Meta>` はハイドレーション後にクライアントに適用されますが、SolidStart v2 のサーバーレンダリングされた `<head>` には**出力されません**。目が離せない修正がアップストリームで適用されるまでは、クローラーが JavaScript なしで表示する必要があるタグ（`canonical`、`hreflang`、必要に応じて `title` / `description`）を、上記のように `entry-server.tsx` に直接レンダリングしてください。

</Step>

<Step number={12} title="404 ページの管理" isOptional={true}>

`src/routes` のルートにあるスプラットルートは、ロケールセグメントに一致しなかったすべてのパスをキャッチします（`matchFilters` によって拒否された無効なロケールプレフィックスを含む）。ロケールはルートレイアウトを通じて URL から取得されるため、404 ページは訪問者の言語で表示されます:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| リクエスト        | 結果                                            |
| ----------------- | ----------------------------------------------- |
| `/xx`             | `404` — `xx` は設定されたロケールではありません |
| `/nonexistent`    | デフォルトロケールでの `404`                    |
| `/fr/nonexistent` | フランス語での `404` (`Page introuvable`)       |

</Step>

<Step number={13} title="多言語サイトマップの生成" isOptional={true}>

Intlayer のサイトマップジェネレーターは、各パスをロケールごとに 1 つのエントリに拡張し、それらの間に `xhtml:link` の代替を接続するため、ルートは正規のロケールなしパスをリストするだけで済みます。

> フラットな URL のみを出力する基本的なジェネレーターとは異なり、Intlayer は各ページのローカライズされたバリアント間に双方向リンクを接続します。これにより、検索エンジンがローカライズされた URL を関連付け、適切なユーザーに適切な URL を提供するのに役立ちます。

SolidStart は、HTTP メソッドをエクスポートするファイルを API ルートに変換し、パスから `.ts` 拡張子を削除します。そのため、`src/routes/sitemap.xml.ts` は `/sitemap.xml` で提供されます:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> API ルートはオプションのパラメータをサポートしていないため、このファイルは `src/routes` のルート、`[[locale]]` セグメントの外側に保持してください。サイトマップにはすでにすべてのロケールが含まれています。

`getMultilingualUrls` を使用して同じ方法で `robots.txt` を構築し、`Disallow` エントリが機密パスのローカライズされた表記すべてをカバーするようにすることができます:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="サーバー関数でのロケールの取得" isOptional={true}>

サーバー関数または API ルートの内部から現在のロケールにアクセスしたい場合があります。

このようなプレフィックスベースの設定では、**URL が決定権を持ちます**: `getLocaleFromPath` はリクエスト URL からプレフィックスを読み取ります。`getLocale` はロケールプレフィックスを持たないリクエストのフォールバックです。`INTLAYER_LOCALE` Cookie を調べ、次に `x-intlayer-locale` ヘッダーを調べ、`Accept-Language` を交渉します。

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // リクエストから Cookie を取得（デフォルト: 'INTLAYER_LOCALE'）
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // リクエストからヘッダーを取得（デフォルト: 'x-intlayer-locale'）、
      // Accept-Language の交渉にフォールバック
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // getIntlayer() を使用してコンポーネントの外部でコンテンツを取得
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> ここで `getLocale` だけに頼らないでください。ロケール Cookie は訪問者が積極的に言語を切り替えたときにのみ書き込まれるため、`/fr/...` への初回訪問はデフォルトロケールに解決されてしまいます。

</Step>

<Step number={15} title="コンポーネントのコンテンツの抽出" isOptional={true}>

既存のコードベースがある場合、何千ものファイルを変換するには時間がかかることがあります。

このプロセスを簡素化するために、Intlayer はコンポーネントを変換してコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [エクストラクター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) を提案しています。

設定するには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 設定の残りの部分
  compiler: {
    /**
     * コンパイラを有効にするかどうかを示します。
     */
    enabled: true,

    /**
     * 出力ファイルパスを定義します
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを示します。
     *
     * - `true` の場合、コンパイラはディスク上のコンポーネントファイルを書き換えます。これにより変換は永久的なものとなり、コンパイラは次のプロセスでの変換をスキップします。これにより、コンパイラはアプリを変換した後、削除できます。
     *
     * - `false` の場合、コンパイラはビルド出力のコードにのみ `useIntlayer()` 関数呼び出しを注入し、ベースコードベースを元のまま維持します。変換はメモリ内でのみ行われます。
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
 <Tab value='Extract コマンド'>

エクストラクターを実行してコンポーネントを変換し、コンテンツを抽出します

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

> その後、ステップ 5 で説明した理由により、生成されたページのコンテンツファイルを `src/routes` の外に移動してください。

 </Tab>
 <Tab value='Babel コンパイラ'>

> v9 以降、`intlayerCompiler` は `intlayer` プラグインに含まれています。そのため、手動で追加する必要はありません。

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // コンパイラプラグインを追加
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

<Step number={16} title="TypeScript の設定">

Intlayer はモジュール拡張機能を使用して TypeScript のメリットを活かし、コードベースをより堅牢にします。

TypeScript の設定に自動生成された型が含まれていることを確認します:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... 既存の設定
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

辞書キーとコンテンツパスがコンパイル時にチェックされるようになります:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## 設定の検証

ビルドしてサーバーを起動し、以下のリクエストが期待通りに動作することを確認します:

```bash
npm run build
node .output/server/index.mjs
```

| リクエスト                                 | 期待されるレスポンス                   |
| ------------------------------------------ | -------------------------------------- |
| `GET /`                                    | `200` — 英語                           |
| `GET /` (`Accept-Language: fr` 付き)       | `302` → `/fr`                          |
| `GET /` (`INTLAYER_LOCALE=es` Cookie 付き) | `302` → `/es`                          |
| `GET /fr`                                  | `200` — フランス語, `<html lang="fr">` |
| `GET /fr/about`                            | `200` — フランス語の about ページ      |
| `GET /en/about`                            | `302` → `/about` (正規リダイレクト)    |
| `GET /xx`                                  | `404`                                  |
| `GET /fr/nonexistent`                      | `404` (フランス語)                     |
| `GET /sitemap.xml`                         | `200` — 多言語 XML サイトマップ        |

ページをレンダリングする行は `vite dev` 下でもまったく同じように動作します。3 つのリダイレクト行は、自分でハンドラーをミドルウェアとして登録しない限り、構築されたサーバーにのみ適用されます（ステップ 3 を参照）。

> デブサーバーは Bun (`bun --bun vite dev`) ではなく Node (`vite dev`) で実行してください。SolidStart の SSR は現在、Bun ランタイム下で `Expected a Response object, but received 'NodeResponse'` で失敗します。これは Intlayer とは無関係で（プレーンなテンプレートでも再現します）、`vite build` ではなく開発サーバーにのみ影響します。

---

## Git の設定

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、それらを Git リポジトリにコミットすることを回避できます。

これを行うには、`.gitignore` ファイルに次の手順を追加します:

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視
.intlayer
```

---

## VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します:

- 翻訳キーの **自動補完**。
- 欠落している翻訳の **リアルタイムエラー検出**。
- 翻訳されたコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成および更新するための **クイックアクション**。

---

## さらに進む

さらに進むには、[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)を使用してコンテンツを外部化できます。

---

## ドキュメントの参照

- [Intlayer ドキュメント](https://intlayer.org)
- [SolidStart ドキュメント](https://start.solidjs.com)
- [useIntlayer フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [useLocale フック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
