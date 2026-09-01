---
createdAt: 2026-03-31
updatedAt: 2026-08-30
title: "Vanilla JS i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Vanilla JSアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 8.4.10
    date: 2026-03-31
    changes: "履歴の初期化"
author: aymericzip
---

# Intlayerを使用したVanilla JSウェブサイトの翻訳 | 国際化 (i18n)

<Tabs defaultTab="code">
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目次

<TOC/>

## 代替手段ではなく Interlayer を使用する理由

「i18next」や「i18n.js」などの主要なソリューションと比較して、Intlayer は次のような統合された最適化を備えたソリューションです。

<AccordionGroup>
<Accordion header="Vanilla JS を完全にカバー">

Intlayer は、**フレームワークに依存しないコンテンツ管理**、**TypeScript サポート**、および国際化 (i18n) の拡張に必要なすべての機能を提供することにより、Vanilla JavaScript と完全に連携するように最適化されています。

</Accordion>

<Accordion header="バンドルサイズ">

大量の JSON ファイルをページにロードするのではなく、必要なコンテンツのみをロードします。 Intlayer は、**バンドルとページのサイズを最大 50% 削減**するのに役立ちます。

</Accordion>

<Accordion header="保守性">

アプリケーションのコンテンツのスコープを設定すると、大規模なアプリケーションの **メンテナンスが容易になります**。コンテンツ コードベース全体を確認するという精神的な負担を負うことなく、単一の機能フォルダーを複製または削除できます。さらに、Intlayer は**完全に型指定**されており、コンテンツの正確性を保証します。

</Accordion>

<Accordion header="AI Agent">

コンテンツを同じ場所に配置すると、大規模言語モデル (LLM) によって **必要なコンテキストが削減**されます。 Intlayer には、翻訳の欠落をテストする **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** などのツール スイートも付属しています。および **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)** により、AI エージェントの開発者エクスペリエンス (DX) がさらにスムーズになります。

</Accordion>

<Accordion header="自動化">

AI プロバイダーの費用で、選択した LLM を使用して CI/CD パイプラインで自動化を変換します。 Intlayer は、コンテンツ抽出を自動化する **コンパイラー** と、**バックグラウンドでの翻訳**を支援する [Web プラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) も提供します。

</Accordion>

<Accordion header="パフォーマンス">

大量の JSON ファイルをコンポーネントに接続すると、パフォーマンスと反応性の問題が発生する可能性があります。 Intlayer は、ビルド時のコンテンツの読み込みを最適化します。

</Accordion>

<Accordion header="none-dev でのスケーリング">

Intlayer は単なる i18n ソリューションではなく、**自己ホスト型 [ビジュアル エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** と **[完全な CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** を提供します。 **リアルタイム**で多言語コンテンツを管理できるようになり、翻訳者、コピーライター、その他のチーム メンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>
</AccordionGroup>

---

## Vanilla JSアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

<Steps>

<Step number={1} title="依存関係のインストール">

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
# intlayerとvanilla-intlayerのスタンドアロンバンドルを生成
# このファイルはHTMLファイルにインポートされます
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 設定ファイルを使用してintlayerを初期化
npx intlayer init --no-gitignore

# ディクショナリをビルド
npx intlayer build
```

```bash packageManager="pnpm"
# intlayerとvanilla-intlayerのスタンドアロンバンドルを生成
# このファイルはHTMLファイルにインポートされます
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 設定ファイルを使用してintlayerを初期化
pnpm intlayer init --no-gitignore

# ディクショナリをビルド
pnpm intlayer build
```

```bash packageManager="yarn"
# intlayerとvanilla-intlayerのスタンドアロンバンドルを生成
# このファイルはHTMLファイルにインポートされます
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# intlayer設定ファイル、TypeScript（セットアップされている場合）、環境変数を初期化
yarn intlayer init --no-gitignore

# ディクショナリをビルド
yarn intlayer build
```

```bash packageManager="bun"
# intlayerとvanilla-intlayerのスタンドアロンバンドルを生成
# このファイルはHTMLファイルにインポートされます
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 設定ファイルを使用してintlayerを初期化
bun x intlayer init --no-gitignore

# ディクショナリをビルド
bun x intlayer build
```

- **intlayer**
  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージです。

- **vanilla-intlayer**
  Intlayerを純粋なJavaScript / TypeScriptアプリケーションと統合するパッケージです。パブ/サブシングルトン (`IntlayerClient`) とコールバックベースのヘルパー (`useIntlayer`、`useLocale`など) を提供し、UIフレームワークに依存することなく、アプリのあらゆる部分がロケールの変更に反応できるようにします。

> `intlayer standalone` CLIによるバンドリングエクスポートは、設定に特化した未使用のパッケージ、ロケール、および非本質的なロジック（リダイレクトやプレフィックスなど）をツリーシェイキング（不要なコードの削除）することで、最適化されたビルドを生成します。

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
      // その他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="HTMLへのバンドルのインポート">

`intlayer.js` バンドルを生成したら、それをHTMLファイルにインポートできます：

```html fileName="index.html"
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />

    <!-- バンドルのインポート -->
    <script src="./intlayer.js" defer></script>
    <!-- メインスクリプトのインポート -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

バンドルは、`window` 上にグローバルオブジェクトとして `Intlayer` と `VanillaIntlayer` を公開します。

</Step>

<Step number={4} title="エントリポイントでのIntlayerのブートストラップ">

`src/main.js` で、コンテンツがレンダリングされる**前**に `installIntlayer()` を呼び出し、グローバルロケールシングルトンの準備を整えます。

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// i18nコンテンツをレンダリングする前に呼び出す必要があります。
installIntlayer();
```

Markdownレンダラーも使用したい場合は、`installIntlayerMarkdown()` を呼び出します：

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="コンテンツの宣言">

翻訳を保存するためのコンテンツ宣言を作成および管理します：

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
      es: "Haga clic en el logotipo de Vite para obtener más información",
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
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれ、コンテンツ宣言のファイル拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致していれば、アプリケーションのどこにでも定義できます。
>
> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

</Step>

<Step number={6} title="JavaScriptでIntlayerを使用する">

`window.VanillaIntlayer` オブジェクトは API ヘルパーを提供します：`useIntlayer(key, locale?)` は、指定されたキーに対応する翻訳済みコンテンツを返します。

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// 現在のロケールの初期コンテンツを取得。
// .onChange() をチェーンして、ロケールが変更されるたびに通知を受け取るようにします。
const content = useIntlayer("app").onChange((newContent) => {
  // 影響を受ける DOM ノードのみを再レンダリングまたはパッチ
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// 初期レンダリング
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> リーフ値を文字列として取得するには、それらを `String()` でラップします。これにより、ノードの `toString()` メソッドが呼び出され、翻訳されたテキストが返されます。
>
> ネイティブ HTML 属性（`alt`、`aria-label` など）の値が必要な場合は、直接 `.value` を使用します：
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="コンテンツの言語を変更する">

コンテンツの言語を変更するには、`useLocale` によって公開される `setLocale` 関数を使用します。

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "言語");

  const render = (currentLocale) => {
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

  select.addEventListener("change", () => setLocale(select.value));

  // 別の場所からロケールが変更されたときにドロップダウンを同期させる
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="HTMLの言語および方向属性の切り替え">

アクセシビリティとSEOのために、`<html>` タグの `lang` および `dir` 属性を現在のロケールに合わせて更新します。

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="ロケールごとのディクショナリの遅延読み込み">

ロケールごとにディクショナリを遅延読み込みしたい場合は、`useDictionaryDynamic` を使用できます。これは、初期の `intlayer.js` ファイルにすべての翻訳をバンドルしたくない場合に便利です。

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> 注意: `useDictionaryDynamic` には、ディクショナリが個別の ESM ファイルとして利用可能である必要があります。このアプローチは通常、ディクショナリを配信するウェブサーバーがある場合に使用されます。
> </Step>

</Steps>

### TypeScriptの設定

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の **Intlayer VS Code拡張機能** をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **自動補完**。
- 欠落している翻訳に対する **リアルタイムのエラー検出**。
- 翻訳済みコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成および更新するための **クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに詳しく

さらに詳しく知るには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりできます。

## よくある質問

<FAQ>

<Question title="バンドラーやフレームワークなしで Intlayer を使用できますか？">

はい。このガイドではそれをカバーしています。ステップ 3 に示すように、`vanilla-intlayer` バンドルを HTML に直接インポートし、エントリーポイントでブートストラップして、`useIntlayer` でコンテンツを読み込みます。Vite、webpack、ビルドパイプラインは必要ありません。

</Question>

<Question title="i18n はページの重さにどのくらい影響しますか？">

ランタイムカタログよりもはるかに少なくなります。ページはレンダリングしない言語をダウンロードしないためです。コンテンツは事前にコンパイルされた辞書から解決され、ロケールごとの遅延読み込みにより、訪問者が言語を切り替えるまで他の言語は初期ペイロードから除外されます。通常の代替案と比較すると、Intlayer は bundle とページサイズを最大 50% 削減します。[bundle 最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)、[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)、および[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)を参照してください。

</Question>

<Question title="`i18next` からスクリプトを書き直さずに移行できますか？">

ほぼ可能です。[i18next 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)に従ってコンテンツを移動してください。段階的に移行することもできます。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md) は既存の JSON カタログを信頼できるソースとして保持し、それらから Intlayer 辞書を生成するため、両方のレイヤーは同期を保ったまま、スクリプトを一度に 1 つずつ移動できます。

</Question>

<Question title="既存の JSON 翻訳ファイルを保持できますか？">

はい。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md) は `/messages/{locale}/{namespace}.json` ファイルを信頼できるソースとして保持し、双方向で Intlayer 辞書を生成します。[sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md) は gettext カタログに対して同じことを行い、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)ではコンテンツを言語ごとに分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract` を実行すると、Intlayer はソースファイルを読み込み、ユーザーに見える文字列を抽出して、各ファイルの隣に `.content` ファイルを書き込むため、カタログに文字列を 1 つずつコピーする代わりに diff を確認できます。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を参照してください。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) はビルド時に JSX、TSX、Vue、Svelte ソースに対して同じことを行い、変更のたびに辞書を生成するため、手動でキーを保持する必要がありません。静的分析によって動作するため、ランタイムにのみ存在する文字列は到達不可能なままであり、ユーザーに見えるテキストをアプリケーションロジックから区別するために、いくつかのアノテーションが必要です。

</Question>

<Question title="利用可能なエディターと AI エージェントツールは何ですか？">

5 つあり、すべてオプションです：

- **[VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプし、コンポーネントからコンテンツを抽出し、コマンドパレットまたは専用の Intlayer タブからビルド、fill、テスト、push、pull を実行します。
- **[LSP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSP に対応した任意のエディターで同じ認識を提供し、定義へのジャンプ、すべての参照を検索、翻訳値のホバープレビュー、キーとフィールドのオートコンプリート、キーが宣言されていない場合の警告があります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl` の呼び出しも解決し、移行中に役立ちます。
- **[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: Intlayer ドキュメントと CLI を Cursor、VS Code、Claude Desktop、Claude Code、ChatGPT に公開し、アシスタントが推測する代わりに現在のドキュメントから回答でき、`intlayer fill` などのコマンドを自分で実行できます。
- **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content` などの焦点を絞ったスキル、およびフレームワークごとに 1 つ、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text` はハードコードされた文字列にフラグを立て、静的辞書キーと未使用コンテンツの追加ルールがあります。

</Question>

<Question title="プレーン JavaScript サイトを国際化するために利用可能なさまざまなソリューションは何ですか？">

- **手書きの辞書オブジェクト**、通常は `fetch` で読み込まれる言語ごとに 1 つの JSON ファイル：依存関係はありませんが、型付けなし、複数形ルールなし、翻訳が不足していることを示すものはありません。
- **CDN からの `i18next`**：成熟していてフレームワークに依存しない、plugin エコシステムがありますが、runtime と独自のカタログ読み込みを追加します。
- **`Intlayer`**：複数形と性別ルール、ロケール検出、右から左へのサポート、ロケールごとの遅延読み込みを備えた宣言されたコンテンツ、さらに不足している翻訳を AI で埋める CLI と非開発者向けのビジュアルエディター。

[Intlayer の利点](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)を参照してください。

</Question>

<Question title="翻訳を読み込んで DOM に配置するにはどうすればよいですか？">

辞書キーで `useIntlayer` を呼び出し、ステップ 6 に示すように値をノードに自分で書き込みます。フレームワークがないため、何も自動的に再レンダリングされません。ロケールが変更されたときにノードを更新します。これはステップ 7 でカバーされています。

</Question>

<Question title="訪問者の言語はどのように検出されますか？">

`routing.storage` にリストされたソースから、通常は cookie が最初で、次に `Accept-Language` header、デフォルトロケールにフォールバックします。訪問者が明示的に選択した言語は永続化されるため、次の訪問でも保持されます。[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Question>

<Question title="アラビア語やヘブライ語などの右から左への言語をサポートするにはどうすればよいですか？">

ステップ 8 でカバーされています。`getHTMLTextDir` はロケールに対して `ltr`、`rtl`、または `auto` を返すため、アクティブなロケールから `html` 要素に `lang` と `dir` を設定し、CSS 論理プロパティに残りを処理させます。

</Question>

<Question title="訪問者はすべての言語をダウンロードしますか？">

望まない場合はそうではありません。ステップ 9 ではロケールごとの辞書の遅延読み込みをカバーしているため、ページは 1 つの言語を読み込み、訪問者が切り替えるときにのみ別の言語を取得します。[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)を参照してください。

</Question>

<Question title="AI でアプリを自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill` を実行してください。選択した LLM を使用して、独自のプロバイダーと API キーで不足している翻訳を埋め、`--git-diff` は実行をブランチで変更されたコンテンツに制限します。[fill コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と [CI/CD 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)を参照してください。

</Question>

<Question title="Intlayer は複数形、性別、リッチテキストをサポートしていますか？">

はい：[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別ベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、および数値、日付、通貨の[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)。

</Question>

<Question title="翻訳者はコードに触れずにコンテンツを編集できますか？">

[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を通じて、独自のインフラストラクチャで実行され、実行中のアプリでテキストをその場で編集できます。または、コンテンツを外部化して、デプロイメントなしで変更できる [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい、Apache 2.0 ライセンスの下で、商用利用を含みます。ホストされた CMS はオプションの有料サービスで、[自己ホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することもできます。

</Question>

</FAQ>
