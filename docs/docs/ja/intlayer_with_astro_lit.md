---
createdAt: 2026-04-24
updatedAt: 2026-08-30
title: "Astro + Lit i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Astro + Litアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Astro
  - Lit
  - ウェブコンポーネント
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Astro + Litの初期ドキュメント"
author: aymericzip
---

# Intlayerを使用したAstro + Litサイトの翻訳 | 国際化 (i18n)

<Tabs defaultTab="code">
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「astro-i18n」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**Astro を完全にカバー**

<Accordion header="Full Astro coverage">

Intlayer は、**多言語ルーティング**、**サイトマップ**、および国際化 (i18n) の拡張に必要なすべての機能を提供することで、Astro と完全に連携するように最適化されています。

**バンドルサイズ**

<Accordion header="Bundle サイズ">

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

<Accordion header="none-dev でスケーリング">

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>
</AccordionGroup>

---

## Astro + LitへのIntlayer設定ステップバイステップガイド

GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-astro-template)を表示。

<Steps>

<Step number={1} title="依存関係のインストール">

お好みのパッケージマネージャーを使用して、必要なパッケージをインストールします：

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

> このコマンドは環境を検出し、必要なパッケージをインストールします。例えば：

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit
```

- **intlayer**
  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **astro-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのAstro統合プラグイン、およびユーザーの優先ロケールの検出、クッキーの管理、URLリダイレクトの処理を行うミドルウェアが含まれています。

- **lit**
  高速で軽量なウェブコンポーネントを構築するためのコアLitパッケージ。

- **lit-intlayer**
  IntlayerをLitアプリケーションと統合するパッケージ。言語変更時にLitElementを自動的に再レンダリングするための `ReactiveController` ベースのフック（`useIntlayer`、`useLocale` など）を提供します。

- **@astrojs/lit**
  Astroページ内でLitカスタム要素の使用を可能にする公式のAstro統合。

</Step>

<Step number={2} title="プロジェクトの設定">

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts"
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

> この設定ファイルを使用して、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの全リストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="Astro設定へのIntlayerの統合">

Astroの設定にintlayerプラグインとLit統合を追加します。

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> Astro統合プラグイン `intlayer()` は、IntlayerをAstroと統合するために使用されます。コンテンツ宣言ファイルの構築を確実にし、開発モードで監視します。Astroアプリケーション内でIntlayerの環境変数を定義し、パフォーマンス最適化のためのエイリアスを提供します。

> `lit()` 統合により、Astroページ内でLitカスタム要素を使用できるようになります。

</Step>

<Step number={4} title="コンテンツの宣言">

翻訳を保存するためのコンテンツ宣言を作成・管理します：

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      ja: "こんにちは世界",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
      ja: "多言語対応のAstro + Litサイトへようこそ。",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> コンテンツ宣言は、`contentDir`（デフォルトは `./src`）に含まれ、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）と一致していれば、アプリケーション内のどこにでも定義できます。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

</Step>

<Step number={5} title="Astroでのコンテンツの使用">

`intlayer`からエクスポートされたコアヘルパーを使用して、`.astro`ファイル内で直接辞書を消費できます。また、各ページにhreflangや正規リンクなどのSEOメタデータを追加する必要があります。Litカスタム要素はクライアントサイドの `<script>` を通じてインポートされ、bodyに配置されます。

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- 正規リンク -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflangリンク -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- Litカスタム要素 - サーバーで検出されたロケールをプロパティとして受け取ります -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> `alt`、`title`、`href`、`aria-label` などの `文字列` 属性でコンテンツを使用したい場合は、次のように関数の値を使用できます。

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> **ルーティング設定に関する注意:**
> 使用するディレクトリ構造は、`intlayer.config.ts` の `middleware.routing` 設定によります：
>
> - **`prefix-no-default`（デフォルト）:** ルート（プレフィックスなし）にデフォルト言語を保持し、他の言語にはプレフィックスを付けます。すべてのケースをキャッチするために `[...locale]` を使用します。
> - **`prefix-all`:** すべてのURLに言語プレフィックスが付きます。ルートを個別に処理する必要がない場合は、標準の `[locale]` を使用できます。
> - **`search-param` または `no-prefix`:** ロケールフォルダは不要です。ロケールは検索パラメータまたはクッキーを通じて処理されます。

</Step>

<Step number={6} title="Litカスタム要素の作成">

Litカスタム要素を作成します。クライアントサイドでIntlayerシングルトンを初期化するために、サーバーによって検出された `locale` プロパティを使用して `connectedCallback` で `installIntlayer` を呼び出します。

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // サーバーによって検出されたロケールで初期化
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- 言語切り替え器はLitElement内にレンダリングされます -->
        <div class="locale-switcher">
          <span class="switcher-label">言語を切り替える :</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${
                    localeItem === currentLocale ? "active" : ""
                  }"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">{localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> `locale` プロップはAstroページ（サーバー検出）から渡され、要素内のすべての `ReactiveController` フックの初期ロケールとするために `connectedCallback` で `installIntlayer` を初期化するために使用されます。

> `useIntlayer` は `ReactiveController` として登録されます。言語が変更されると要素は自動的に再レンダリングされます。追加の設定は不要です。

</Step>

<Step number={7} title="言語切り替え機能の追加">

言語切り替え機能は、Litカスタム要素の `render()` メソッド（ステップ6参照）に直接組み込まれています。`lit-intlayer` の `useLocale` を使用し、ユーザーが新しい言語を選択したときにローカライズされたURLに移動します：

```typescript fileName="src/components/lit/LitDemo.ts"
// LitElementクラス内、useLocale設定（ステップ6参照）の後：

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // 言語変更時にローカライズされたURLに移動
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">言語を切り替える :</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Litのリアクティビティに関する注意:**
> `useLocale` は `ReactiveController` を返します。`setLocale` が呼び出されると、コントローラーは自動的に再レンダリングをスケジュールします。そのため、手動でDOMを操作することなく、アクティブなボタンの状態が更新されます。

> **固定の維持に関する注意:**
> `window.location.href` を介したリダイレクトのために `onLocaleChange` を使用することで、新しい言語のURLが確実に訪問され、Intlayerミドルウェアが言語クッキーを設定して、将来の訪問時にユーザーの好みが記憶されるようになります。

</Step>

<Step number={8} title="サイトマップとRobots.txt">

Intlayerは、動的にローカライズされたサイトマップとrobots.txtファイルを生成するためのユーティリティを提供します。

#### サイトマップ

Intlayer には、アプリケーションのサイトマップを簡単に作成できるサイトマップ ジェネレーターが組み込まれています。ローカライズされたルートを処理し、検索エンジンに必要なメタデータを追加します。

> Intlayer によって生成されたサイトマップは、`xhtml:link` 名前空間 (Hreflang XML Extensions) をサポートしています。生の URL のみを表示するデフォルトのサイトマップ ジェネレーターとは異なり、Intlayer はページのすべての言語バージョン (例: `/about`、`/about?lang=fr`、`/about?lang=es`) 間に必要な双方向リンクを自動的に作成します。これにより、検索エンジンが正しい言語バージョンを正しい対象者に正しくインデックス付けして提供できるようになります。

すべてのローカライズされたルートを含むサイトマップを生成するために、`src/pages/sitemap.xml.ts` を作成します。

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

検索エンジンのクロールを制御するために `src/pages/robots.txt.ts` を作成します。

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

</Step>

<Step number={15} title="Extract the content of your components" isOptional={true}>

If you have an existing codebase, transforming thousands of files can be time-consuming.

To ease this process, Intlayer propose a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) to transform your components and extract the content.

To set it up, you can add a `compiler` section in your `intlayer.config.ts` file:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indicates if the components should be saved after being transformed.
     *
     * - If `true`, the compiler will rewrite the component file in the disk. So the transformation will be permanent, and the compiler will skip the transformation for the next process. That way, the compiler can transform the app, and then it can be removed.
     *
     * - If `false`, the compiler will inject the `useIntlayer()` function call into the code in the build output only, and keep the base codebase intact. The transformation will be done only in memory.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Run the extractor to transform your components and extract the content

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

Update your `vite.config.ts` to include the `intlayerCompiler` plugin:

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
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

---

</Step>

</Steps>

### TypeScriptの設定

Intlayerはモジュール拡張を使用してTypeScriptの利点を活かし、コードベースをより堅牢にします。デコレータ構文を使用している場合、Litでは `experimentalDecorators` を有効にする必要があります。

![オートコンプリート](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // デコレータサポートのためにLitで必須
  },
  include: [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

そのためには、`.gitignore`ファイルに以下の指示を追加してください：

```bash
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerを使用した開発体験を向上させるために、**公式のIntlayer VS Code拡張機能**をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新するための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに詳しく

さらに詳しく知りたい場合は、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりすることもできます。

## よくある質問

<FAQ>

<Question title="Lit island を使用した Astro サイトを国際化するための利用可能なソリューションにはどのようなものがありますか？">

Astro の組み込み `i18n` オプションはロケールプレフィックスとリダイレクトを処理しますが、コンテンツ自体は処理しません。そのため、メッセージレイヤーが依然として必要です。さらに、island は Lit で動作し、Astro ではないため、別の問題が発生します。

- **Astro `i18n` と手書きの辞書**、そして island 内に **`@lit/localize`**: 同期を保つべき2つのコンテンツソースがあり、それらの間に共有された型付けがありません。
- **`Intlayer`**: 両方に対応する単一のコンテンツレイヤーです。`astro-intlayer` は `.astro` ページをカバーし、`lit-intlayer` は Lit island をカバーし、同じ宣言を読み込みます。

ラベルを一度宣言し、それを静的ページとインタラクティブな island の両方で使用できることが、ここで単一のコンテンツレイヤーを選択する理由です。[Intlayer を選ぶ理由](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md) を参照してください。

</Question>

<Question title="i18n は Astro の bundle サイズをどれくらい増加させますか？">

名前空間ベースのセットアップよりもはるかに少ないです。なぜなら、ページはレンダリングしないカタログをダウンロードしないからです。Astro ページはビルド時にレンダリングされるため、翻訳された HTML を出力し、辞書は一切含まれません。island のみが辞書を受け取ります。ビルド時コンパイラは、コンポーネントが使用する正確なエントリにコンテンツ呼び出しを解決し、[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md) は残りをロケールごとに分割します。一般的な代替手段と比較して、Intlayer は bundle およびページサイズを最大50%削減します。[bundle 最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md) および [ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md) を参照してください。

</Question>

<Question title="`@lit/localize` からコンポーネントを書き直さずに移行できますか？">

大部分は可能です。[互換性アダプターの概要](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md) に従ってコンテンツを移行してください。段階的に移行することもできます。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md) は、既存の JSON カタログを信頼できる情報源として保持し、それらから Intlayer 辞書を生成するため、コンポーネントを一つずつ移行する間も両方のレイヤーが同期を保ちます。

</Question>

<Question title="既存の JSON 翻訳ファイルを保持できますか？">

はい、可能です。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md) は、`/messages/{locale}/{namespace}.json` ファイルを信頼できる情報源として保持し、双方向でそれらから Intlayer 辞書を生成します。[sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md) は gettext カタログに対しても同様の機能を提供し、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md) を使用すると、ロケールを1つのファイルにまとめるのではなく、言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract` を実行すると、Intlayer はコンポーネントを読み込み、ユーザー向けの文字列を抽出し、それぞれの隣に `.content` ファイルを書き込みます。これにより、文字列をカタログに一つずつコピーする代わりに、差分を確認できます。このガイドのステップ15でその手順を説明しています。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) がビルド時に同じことを行います。変更があるたびに JSX、TSX、Vue、Svelte のソースをスキャンし、辞書を生成し、ホットモジュールリプレイスメントを通じてそれらを同期させます。そのため、手動で管理するキーは一切ありません。

コンパイラを有効にする前に知っておくべき2つの制限があります。これは静的解析によって機能するため、API エラーコードや CMS フィールドなど、実行時にのみ存在する文字列は対象外となります。また、`className="active"` やステータスコードのようなアプリケーションロジックと、ユーザー向けのテキストを区別する必要があり、大規模なコードベースではいくつかの注釈が必要になります。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) は、ユーザーが関与することでこれら両方を回避します。

</Question>

<Question title="利用可能なエディタおよび AI エージェントツールにはどのようなものがありますか？">

5つのツールがあり、すべてオプションです。

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプしたり、コンポーネントからコンテンツを抽出したり、コマンドパレットまたは専用の Intlayer タブからビルド、フィル、テスト、プッシュ、プルを実行したりできます。
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSP をサポートする任意のエディタで同様の認識機能を提供します。定義へのジャンプ、すべての参照の検索、翻訳された値のホバープレビュー、キーとフィールドのオートコンプリート、およびキーがどこにも宣言されていない場合の警告機能があります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl` の呼び出しも解決するため、移行中に役立ちます。
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: Intlayer のドキュメントと CLI を Cursor、VS Code、Claude Desktop、Claude Code、ChatGPT に公開します。これにより、アシスタントは推測ではなく現在のドキュメントから回答し、`intlayer fill` などのコマンドを自身で実行できます。
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content` などの特化したスキルに加え、フレームワークごとのスキルがあり、エージェントにルーティング設定とコンテンツノードの型を教えます。
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text` はハードコードされた文字列にフラグを立て、静的辞書キーや未使用のコンテンツに対する追加のルールも提供します。

</Question>

<Question title="Lit island 内に別の i18n ライブラリが必要ですか？">

いいえ、必要ありません。`lit-intlayer` は Astro 側と同じ辞書を読み込むため、`@lit/localize` を一緒にインストールする必要はありません。ステップ6では、island コンポーネントがアクティブなロケールを再度解決するのではなく、ページから受け取る様子を示しています。

</Question>

<Question title="island はページがどのロケールでレンダリングされているかをどのように知りますか？">

Astro ページがそれを prop として渡し、island 内の Intlayer provider がそれを受け取ります。これにより、island はサーバーがレンダリングしたのと同じ言語でハイドレートされます。これは、island がブラウザで独自にロケールを検出したときに発生するデフォルト言語のちらつきを防ぐものです。

</Question>

<Question title="翻訳されたコンテンツは静的 HTML として提供されますか？">

はい、Astro の部分はビルド時にレンダリングされるため、ローカライズされたページはクローラーが JavaScript を実行せずに読み取れる純粋な静的 HTML です。island のみが辞書を受け取り、それはレンダリングするロケールのみに限定されます。

</Question>

<Question title="ローカライズされたルーティングとロケールスイッチャーはどのように設定しますか？">

ステップ7でスイッチャーについて説明しています。`routing.mode` は URL スキームを決定します: `"prefix-no-default"` (デフォルト、`/about` と `/fr/about`)、`"prefix-all"`、`"no-prefix"`、または `"search-params"`。また、`routing.domains` はロケールを独自のドメインにマッピングします。`getLocalizedUrl` は現在のパスを書き換えるため、言語を切り替えても読者は同じページに留まります。[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) を参照してください。

</Question>

<Question title="ローカライズされた sitemap と hreflang タグはどのように生成しますか？">

ステップ8で `sitemap.xml` と `robots.txt` について説明しています。`getMultilingualUrls` は、宣言されたすべてのロケール（検索エンジンが適切な言語バージョンを提供するために使用する `x-default` を含む）の代替 URL を構築します。

</Question>

<Question title="AI を使用してサイトを自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill` を実行します。これにより、選択した LLM を使用し、独自のプロバイダーと API キーを使って、不足している翻訳を埋めます。`--git-diff` オプションは、実行をブランチで変更されたコンテンツに限定します。[fill コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md) および [CI/CD 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md) を参照してください。

</Question>

<Question title="Intlayer は複数形、性別、リッチテキストをサポートしていますか？">

はい、サポートしています: [複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別に基づくコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、長文テキスト用の [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、および数値、日付、通貨用の [フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md) をサポートしています。

</Question>

<Question title="翻訳者はコードに触れることなくコンテンツを編集できますか？">

独自のインフラストラクチャで動作し、実行中のアプリ上で誰でもテキストを直接編集できる [ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) を通じて、またはコンテンツを外部化してデプロイなしで変更できるようにする [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) を通じて可能です。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい、Apache 2.0 ライセンスの下で、商用利用を含めて無料かつオープンソースです。ホスト型 CMS はオプションの有料サービスですが、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md) することも可能です。

</Question>

</FAQ>
