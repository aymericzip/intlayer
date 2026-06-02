---
createdAt: 2026-03-23
updatedAt: 2026-05-31
title: "Vite + Vanilla JS i18n - 完全な翻訳ガイド：Vite + Vanilla JS アプリ"
description: "i18nextはもう不要。2026年に多言語（i18n）Vite + Vanilla JSアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
applicationShowcase: https://intlayer-vite-vanilla.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 8.4.10
    date: 2026-03-23
    changes: "初期履歴"
---

# Intlayerを使用したViteおよびVanilla JSウェブサイトの翻訳 | 国際化 (i18n)

<Tabs defaultTab="code">
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-vite-vanilla.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-vite-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「i18next」や「i18n.js」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

**Vite の完全な内容**

Intlayer は、**フレームワークに依存しないコンテンツ管理**、**TypeScript サポート**、および国際化の拡張 (i18n) に必要なすべての機能を提供することで、Vite と完全に連携するように最適化されています。

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

## ViteおよびVanilla JSアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

<Steps>

<Step number={1} title="依存関係のインストール">

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**
  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **vanilla-intlayer**
  Intlayerを純粋なJavaScript / TypeScriptアプリケーションと統合するパッケージ。パブリッシュ/サブスクライブ シングルトン (`IntlayerClient`) とコールバックベースのヘルパー (`useIntlayer`、`useLocale`など) を提供し、UIフレームワークに依存せずにアプリのどこからでも言語の変更に反応できるようにします。

- **vite-intlayer**
  Intlayerを[Vite バンドラー](https://vite.dev/guide/why.html Japan#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先言語の検出、クッキーの管理、URLリダイレクトの処理のためのミドルウェアが含まれています。

</Step>

<Step number={2} title="プロジェクトの設定">

アプリケーションの言語を設定するための設定ファイルを作成します。

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

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの全リストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="Vite設定へのIntlayerの統合">

設定にintlayerプラグインを追加します。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

> `intlayer()` Viteプラグインは、IntlayerをViteと統合するために使用されます。コンテンツ宣言ファイルの構築を確実にし、開発モードでそれらを監視します。Viteアプリケーション内でIntlayer環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

</Step>

<Step number={4} title="エントリーポイントでのIntlayerのブートストラップ">

グローバルな言語シングルトンの準備ができるように、コンテンツがレンダリングされる**前**に `installIntlayer()` を呼び出します。

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// i18nコンテンツをレンダリングする前に呼び出す必要があります。
installIntlayer();

// アプリケーションモジュールをインポートして実行。
import "./app.js";
```

`md()` コンテンツ宣言（Markdown）も使用する場合は、Markdownレンダラーもインストールしてください：

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
```

</Step>

<Step number={5} title="コンテンツの宣言">

翻訳を保存するためのコンテンツ宣言を作成および管理します。

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Viteのロゴをクリックして詳細を確認してください",
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
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Viteのロゴをクリックして詳細を確認してください"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれ、コンテンツ宣言のファイル拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）に一致していれば、アプリケーション内のどこにでも定義できます。
>
> 詳細については、[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

</Step>

<Step number={6} title="JavaScriptでのIntlayerの使用">

`vanilla-intlayer` は `react-intlayer` のサーフェスAPIを反映しています：`useIntlayer(key, locale?)` は翻訳されたコンテンツを直接返します。結果に対して `.onChange()` をチェーンして言語の変更を購読します（これはReactの再レンダリングと同じ明示的な効果を持ちます）。

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// 現在の言語の初期コンテンツを取得。
// 言語が変更されるたびに通知を受け取るために .onChange() をチェーン。
const content = useIntlayer("app").onChange((newContent) => {
  // 影響を受けるドームノードのみを再レンダリングまたはパッチ
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// 初期レンダリング
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> リーフ値は `String()` でラップして文字列としてアクセスします。これにより、ノードの `toString()` メソッドが呼び出され、翻訳されたテキストを返します。
>
> ネイティブHTML属性の属性値（例：`alt`、`aria-label`）が必要な場合は、`.value` を直接使用してください。
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="コンテンツの言語を変更する" isOptional={true}>

コンテンツの言語を変更するには、`useLocale` によって公開される `setLocale` 関数を使用します。

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value as any));

  // 他の場所から言語が変更されたときにドロップダウンを同期させる
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="MarkdownおよびHTMLコンテンツのレンダリング" isOptional={true}>

Intlayerは `md()` および `html()` コンテンツ宣言をサポートしています。Vanilla JSでは、コンパイルされた出力は `innerHTML` を介して生のHTMLとして挿入されます。

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

HTMLのコンパイルと注入：

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` は、生のMarkdown文字列を返す `IntlayerNode` 上で `toString()` を呼び出します。これを `compileMarkdown` に渡してHTML文字列を取得し、`innerHTML` を介して設定します。

> [!WARNING]
> 信頼できるコンテンツに対してのみ `innerHTML` を使用してください。Markdownがユーザー入力から来ている場合は、最初にサニタイズしてください（例：DOMPurifyを使用）。サニタイズレンダラーを動的にインストールできます：
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

</Step>

<Step number={9} title="アプリケーションへのローカライズされたルーティングの追加" isOptional={true}>

言語ごとにユニークなルートを作成するには（SEOに有用）、Vite設定で `intlayerProxy` を使用してサーバーサイドの言語検出を行うことができます。

まず、Vite設定に `intlayerProxy` を追加します。

> 本番環境で `intlayerProxy` を使用するには、`vite-intlayer` を `devDependencies` から `dependencies` に移動する必要があることに注意してください。

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // 最初に配置する必要があります
    intlayer(),
  ],
});
```

</Step>

<Step number={10} title="言語変更時のURL変更" isOptional={true}>

言語が変更されたときにブラウザのURLを更新するには、Intlayerのインストール後に `useRewriteURL()` を呼び出します。

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// すぐに、およびその後のすべての言語変更時にURLを書き換えます。
// クリーンアップのための購読停止関数を返します。
const stopRewriteURL = useRewriteURL();
```

</Step>

<Step number={11} title="HTML 言語属性とテキスト方向属性の切り替え" isOptional={true}>

アクセシビリティとSEOのために、`<html>` タグの `lang` および `dir` 属性を現在の言語に合わせて更新します。

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={12} title="言語ごとの辞書の遅延ロード" isOptional={true}>

大規模なアプリの場合、各言語の辞書を独自のチャンクに分割したい場合があります。Viteの動的 `import()` と併せて `useDictionaryDynamic` を使用します：

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> 各言語のバンドルは、その言語がアクティブになったときにのみ取得され、結果はキャッシュされます。同じ言語へのその後の切り替えは瞬時に行われます。

</Step>

<Step number={13} title="コンポーネントのコンテンツの抽出" isOptional={true}>

既存のコードベースがある場合、数千のファイルを変換するのは時間がかかる場合があります。

このプロセスを容易にするために、Intlayerはコンポーネントを変換してコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [エクストラクター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提案しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを指定。
     * これにより、コンパイラを一度だけ実行してアプリを変換し、その後削除できます。
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
 <Tab value='Extract コマンド'>

エクストラクターを実行してコンポーネントを変換し、コンテンツを抽出します。

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
 <Tab value='Babel コンパイラ'>

`intlayerCompiler` プラグインを含めるように `vite.config.ts` を更新します：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
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

### TypeScript の設定

TypeScript の設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Git 設定

Intlayer によって生成されたファイルは無視することをお勧めします。これにより、それらを Git リポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加します。

```bash
# Intlayer によって生成されたファイルを無視
.intlayer
```

### VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下の機能を提供します：

- 翻訳キーの**オートコンプリート**。
- 翻訳漏れの**リアルタイムなエラー検出**。
- 翻訳されたコンテンツの**インライン形プレビュー**。
- 翻訳を簡単に作成および更新できる**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code 拡張機能ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### 次のステップ

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりできます。
