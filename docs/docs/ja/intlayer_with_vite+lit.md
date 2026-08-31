---
createdAt: 2026-03-23
updatedAt: 2026-08-30
title: "Vite + Lit i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Vite + Litアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - Lit
  - Web Components
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
applicationShowcase: https://intlayer-vite-lit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 8.4.10
    date: 2026-03-23
    changes: "初期履歴"
author: aymericzip
---

# Intlayerを使用してViteとLitのウェブサイトを翻訳する | 国際化 (i18n)

<Tabs defaultTab="code">
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-lit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-vite-lit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-vite-lit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「lit-localize」や「i18next」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**Lit を完全にカバー**

<Accordion header="Full Lit coverage">

Intlayer は、**Web コンポーネント レベルのコンテンツ スコープ**、**TypeScript サポート**、および国際化 (i18n) のスケーリングに必要なすべての機能を提供することで、Lit と完全に連携するように最適化されています。

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

<Accordion header="none-dev でのスケーリング">

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>
</AccordionGroup>

---

GitHub の [Application Template](https://github.com/aymericzip/intlayer-vite-lit-template) を参照してください。

## ViteとLitアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

<Steps>

<Step number={1} title="依存関係のインストール">

npmを使用して必要なパッケージをインストールします：

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
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージです。

- **lit-intlayer**
  IntlayerをLitアプリケーションと統合するパッケージです。`ReactiveController`ベースのフック（`useIntlayer`、`useLocale`など）を提供し、言語が変更されたときにLitElementが自動的に再レンダリングされるようにします。

- **vite-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先言語の検出、クッキーの管理、URLリダイレクトの処理のためのミドルウェアが含まれています。

</Step>

<Step number={2} title="プロジェクトの設定">

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // その他の言語
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="Vite設定にIntlayerを統合する">

Vite設定にintlayerプラグインを追加します。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。コンテンツ宣言ファイルのビルドを確実にし、開発モードでそれらを監視します。Viteアプリケーション内でIntlayer環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

</Step>

<Step number={4} title="エントリポイントでIntlayerをブートストラップする">

最初の要素が接続されるときにグローバルロケールシングルトンが準備できているように、カスタム要素が登録される**前に** `installIntlayer()` を呼び出します。

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// 任意のLitElementがDOMに接続される前に呼び出す必要があります。
installIntlayer();

// カスタム要素をインポートして登録します。
import "./my-element.js";
```

`md()` コンテンツ宣言（Markdown）も使用する場合は、Markdownレンダラーもインストールしてください：

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

</Step>

<Step number={5} title="コンテンツの宣言">

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
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
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más información"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれ、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）と一致する限り、アプリケーション内のどこにでも定義できます。
>
> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

</Step>

<Step number={6} title="LitElementでIntlayerを活用する">

`LitElement` 内で `useIntlayer` を使用します。これは、アクティブなロケールが変更されるたびに自動的に再レンダリングをトリガーする `ReactiveController` プロキシを返します。追加の設定は不要です。

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayerはReactiveControllerとして自身を登録します。
  // 要素は言語が変更されると自動的に再レンダリングされます。
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> ネイティブHTML属性（例：`alt`、`aria-label`、`title`）で翻訳された文字列が必要な場合は、リーフノードで `.value` を呼び出します：
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> html`<img alt=${content.viteLogo.toString()} />`;
> html`<img alt=${String(content.viteLogo)} />`;
> ```

</Step>

<Step number={7} title="コンテンツの言語を変更する" isOptional={true}>

コンテンツの言語を変更するには、`useLocale` コントローラーによって公開されている `setLocale` メソッドを使用します。

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={8} title="MarkdownとHTMLコンテンツのレンダリング" isOptional={true}>

Intlayerは `md()` および `html()` コンテンツ宣言をサポートしています。Litでは、コンパイルされた出力は `unsafeHTML` ディレクティブを介して生HTMLとして挿入されます。

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

コンパイルされたHTMLを要素内でレンダリングします：

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)` は、生のMarkdown文字列を返す `IntlayerNode` の `toString()` を呼び出します。それを `compileMarkdown` に渡してHTML文字列を取得し、Litの `unsafeHTML` ディレクティブでレンダリングします。

</Step>

<Step number={9} title="アプリケーションにローカライズされたルーティングを追加する" isOptional={true}>

言語ごとに固有のルートを作成するには（SEOに有用）、クライアントサイドのルーターをIntlayerの `localeMap` / `localeFlatMap` ヘルパー、およびサーバーサイドの言語検出用の `intlayerProxy` Viteプラグインと共に使用できます。

まず、Vite設定に `intlayerProxy` を追加します：

> プロダクション環境で `intlayerProxy` を使用するには、`vite-intlayer` を `devDependencies` から `dependencies` に移動する必要があることに注意してください。

> Intlayer v9 以降、`intlayerProxy()` は `intlayer()` プラグインに直接バンドルされており、`routing.enableProxy` オプション（デフォルトで `true`）を通じてデフォルトで有効になっています。以下に示すように個別に登録することはオプションになりました — これはbackward compatibility のため、またプラグインの順序を制御する必要があるセットアップのために保持されています。`routing.enableProxy: false` を設定してオプトアウトできます。[v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/releases/v9.md) を参照してください。

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={10} title="言語が変更されたときにURLを変更する" isOptional={true}>

言語が変更されたときにブラウザのURLを更新するには、ロケールスイッチャーと共に `useRewriteURL` を使用します：

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // 言語が変更されたときに現在のURLを自動的に書き換えます。
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

</Step>

<Step number={11} title="HTMLの言語と方向属性を切り替える" isOptional={true}>

アクセシビリティとSEOのために、現在の言語に合わせて `<html>` タグの `lang` および `dir` 属性を更新します。

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- コンテンツ -->`;
  }
}
```

</Step>

<Step number={12} title="コンポーネントのコンテンツを抽出する" isOptional={true}>

既存のコードベースがある場合、数千ものファイルを変換するのは時間がかかる場合があります。

このプロセスを容易にするために、Intlayerはコンポーネントを変換してコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [抽出器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提案しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
     * コンポーネントを変換した後に保存するかどうかを指定します。
     * これにより、コンパイラを一度だけ実行してアプリを変換し、その後削除することができます。
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

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` と `useDefineForClassFields: false` は、Litのデコレーターサポートに必要です。

### Gitの設定

Intlayerによって生成されたファイルは無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加します：

```bash
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**自動補完**。
- 翻訳漏れの**リアルタイムなエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成および更新できる**クイックアクション**。

詳細な使用方法については、[Intlayer VS Code Extensionドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに詳しく

さらに詳しく知りたい場合は、[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりすることができます。

## よくある質問

<FAQ>

<Question title="Vite と Lit アプリを国際化するために利用可能なソリューションにはどのようなものがありますか？">

Vite は i18n について特定の意見を持たないため、選択肢は Lit エコシステムから来ます：

- **`@lit/localize`**: 公式オプション。XLIFF 抽出とロケールごとにコンパイルされたバンドルに基づいており、実行時に言語を切り替えるには runtime モードが必要です。
- **手書きの辞書**: 各要素にインポートされます。依存関係なし、型付けなし、ツールなし。
- **`Intlayer`**: 最も高度なソリューション。コードベースのどこにでもコンテンツを宣言でき（[各コンポーネントの隣またはセントラライズ](https://intlayer.org/blog/per-component-vs-centralized-i18n)）、ビルド時に Vite プラグインでコンパイルされ、完全に型付けされ、AI 翻訳、ビジュアルエディタ、CMS を備えています。

Vite 固有の利点は、翻訳が実行時に JSON として取得されるのではなく、コンパイル時に解決され tree shake されることです。そのため、ページはレンダリングするエントリのみを配信します。[Intlayer を選ぶ理由](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)と[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)を参照してください。

</Question>

<Question title="i18n は Lit バンドルサイズにどの程度追加されますか？">

namespace ベースのセットアップよりもはるかに少なくなります。ページはレンダリングしないカタログをダウンロードしないためです。ビルド時コンパイラは `useIntlayer` 呼び出しをコンポーネントが使用する正確な辞書エントリに置き換えるため、未使用のキーと未使用の言語は削除され、[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)は残りをロケールごとに分割します。通常の代替案と比較すると、Intlayer はバンドルとページサイズを最大 50% 削減します。[バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)と[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)を参照してください。

</Question>

<Question title="`@lit/localize` から要素を書き直さずに移行できますか？">

ほぼ可能です。[互換性アダプタの概要](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)に従ってコンテンツを移動してください。段階的に移行することもできます：[sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は既存の JSON カタログを真実のソースとして保ち、それらから Intlayer 辞書を生成するため、両方のレイヤーは同期を保ったまま、要素を一度に 1 つずつ移動できます。

</Question>

<Question title="既存の JSON 翻訳ファイルを保持できますか？">

はい。[sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は `/messages/{locale}/{namespace}.json` ファイルを真実のソースとして保ち、それらから Intlayer 辞書を双方向で生成します。[sync PO プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)は gettext カタログに対して同じことを行い、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)では 1 つのファイルにロケールをグループ化する代わりに、言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract` を実行すると、Intlayer はコンポーネントを読み込み、ユーザーに見える文字列を抽出し、各コンポーネントの隣に `.content` ファイルを書き込むため、カタログに文字列を 1 つずつコピーする代わりに diff をレビューできます。このガイドのステップ 12 でそれを説明しています。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)はビルド時に同じことを行います：JSX、TSX、Vue、Svelte ソースをすべての変更でスキャンし、辞書を生成し、hot module replacement を通じてそれらを同期させるため、手動で保守するキーはまったくありません。

コンパイラをオンにする前に知っておく価値のある 2 つの制限があります。静的分析によって機能するため、API エラーコードや CMS フィールドなど、実行時にのみ存在する文字列は到達不可能なままです。また、`className="active"` やステータスコードなどのアプリケーションロジックからユーザーに見える文字列を区別する必要があり、大規模なコードベースではいくつかのアノテーションが必要です。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)はあなたをループに保つことで両方を回避します。

</Question>

<Question title="利用可能なエディタと AI エージェントツールは何ですか？">

5 つのツール。すべてオプションです：

- **[VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプし、コンポーネントからコンテンツを抽出し、コマンドパレットまたは専用の Intlayer タブからビルド、fill、test、push、pull を実行します。
- **[LSP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSP を話す任意のエディタで同じ認識を提供し、定義へのジャンプ、すべての参照を検索、翻訳値のホバープレビュー、キーとフィールドのオートコンプリーション、キーがどこにも宣言されていない場合の警告があります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl` 呼び出しを解決し、移行中に役立ちます。
- **[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: Intlayer ドキュメントと CLI を Cursor、VS Code、Claude Desktop、Claude Code、ChatGPT に公開し、アシスタントが推測する代わりに現在のドキュメントから回答でき、`intlayer fill` などのコマンドを自分で実行できます。
- **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content` などの焦点を絞ったスキル、およびフレームワークごとに 1 つ。エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text` はハードコードされた文字列にフラグを立て、静的辞書キーと未使用コンテンツのさらなるルールがあります。

</Question>

<Question title="Lit コンポーネントで翻訳されたコンテンツを使用するにはどうすればよいですか？">

ステップ 6 が示すように、Intlayer バインディングを通じて `LitElement` render メソッド内のコンテンツを読み込みます。ロケールを変更すると、それを読み込む要素の更新がトリガーされるため、言語切り替えはページの再読み込みや 2 番目のバンドルの配信を必要としません。

</Question>

<Question title="Intlayer は Vite dev サーバーと hot reload で機能しますか？">

はい。`intlayer()` Vite プラグインは `.content.ts` ファイルを監視し、保存時に影響を受ける辞書を再構築するため、編集は dev サーバーを再起動せずに表示され、生成された型は同時に再生成されるため、オートコンプリーションは同期を保ちます。

</Question>

<Question title="ローカライズされたルーティングをセットアップするにはどうすればよいですか？">

ステップ 9 と 10 はローカライズされたルートと、ロケール変更時の URL 書き直しをカバーしています。`routing.mode` は URL スキームを決定します：`"prefix-no-default"`（デフォルト、`/about` と `/fr/about`）、`"prefix-all"`、`"no-prefix"`（cookie、header、またはドメインから解決）、または `"search-params"`（`/about?locale=fr`）。[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Question>

<Question title="アラビア語やヘブライ語などの右から左への言語をサポートするにはどうすればよいですか？">

ステップ 11 でカバーしています。`getHTMLTextDir` はロケールに対して `ltr`、`rtl`、または `auto` を返すため、アクティブなロケールからルート要素に `lang` と `dir` をバインドし、CSS 論理プロパティに残りを処理させます。

</Question>

<Question title="クライアントレンダリングされた Vite アプリで SEO メタデータを処理するにはどうすればよいですか？">

アクティブなロケールから `html` 要素に `lang` と `dir` を設定し、`getMultilingualUrls` で宣言されたすべてのロケールに対して `hreflang` 代替を発行します。`x-default` を含みます。確実にクロールされる必要があるページの場合は、事前レンダリングまたはサーバーレンダリングセットアップを優先してください。

</Question>

<Question title="AI でアプリを自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill` を実行します。選択した LLM を使用して、独自のプロバイダーと API キーで不足している翻訳を入力し、`--git-diff` は実行をブランチで変更されたコンテンツに制限します。[fill コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と [CI/CD 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)を参照してください。

</Question>

<Question title="Intlayer は複数形、性別、リッチテキストをサポートしていますか？">

はい：[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別ベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、および数値、日付、通貨の[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)。

</Question>

<Question title="翻訳者がコードに触れずにコンテンツを編集するにはどうすればよいですか？">

[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を通じて。独自のインフラストラクチャで実行され、誰でも実行中のアプリでテキストをその場で編集できます。または [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)。コンテンツを外部化し、デプロイメントなしで変更できます。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい。Apache 2.0 ライセンスの下で、商用利用を含みます。ホストされた CMS はオプションの有料サービスで、[自己ホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)も可能です。

</Question>

</FAQ>
