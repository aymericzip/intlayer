---
createdAt: 2026-03-31
updatedAt: 2026-05-31
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

**Vanilla JS を完全にカバー**

Intlayer は、**フレームワークに依存しないコンテンツ管理**、**TypeScript サポート**、および国際化 (i18n) の拡張に必要なすべての機能を提供することにより、Vanilla JavaScript と完全に連携するように最適化されています。

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

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれ、コンテンツ宣言のファイル拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）に一致していれば、アプリケーションのどこにでも定義できます。
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
