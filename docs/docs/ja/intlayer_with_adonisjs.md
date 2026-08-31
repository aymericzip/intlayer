---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: "AdonisJS i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）AdonisJSアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - AdonisJS
  - JavaScript
  - バックエンド
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonis-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 8.0.0
    date: 2025-12-30
    changes: "履歴の初期化"
author: aymericzip
---

# Intlayer を使用して AdonisJS バックエンドウェブサイトを翻訳する | 国際化 (i18n)

`adonis-intlayer` は、AdonisJS アプリケーション向けの強力な国際化 (i18n) パッケージであり、クライアントの好みに基づいてローカライズされたレスポンスを提供することで、バックエンドサービスをグローバルにアクセス可能にするように設計されています。

### 実用的なユースケース

- **ユーザーの言語でのバックエンドエラーの表示**: エラーが発生した際、ユーザーの母国語でメッセージを表示することで、理解が深まり、フラストレーションを軽減できます。これは、トーストやモーダルなどのフロントエンドコンポーネントに表示される可能性のある動的なエラーメッセージに特に役立ちます。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションの場合、国際化によって、このコンテンツを複数の言語で提供できるようになります。これは、製品説明や記事、その他のコンテンツをユーザーが好む言語で表示する必要がある e コマースサイトやコンテンツ管理システムなどのプラットフォームにとって非常に重要です。

- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に高めることができます。

- **多言語プッシュ通知**: モバイルアプリケーションの場合、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションと継続率を高めることができます。このパーソナライズされたアプローチにより、通知がより関連性が高く、実行しやすいものに感じられます。

- **その他のコミュニケーション**: SMS メッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語であることでメリットを得られ、明快さを確保し、全体的なユーザーエクスペリエンスを向上させます。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズにより適合し、サービスを世界規模で拡大するための重要なステップとなります。

## はじめる

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-adonis-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonis-template) on GitHub.

### インストール

`adonis-intlayer` の使用を開始するには、npm を使用してパッケージをインストールします。

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
npm install intlayer adonis-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
```

### 設定

プロジェクトのルートに `intlayer.config.ts` を作成して、国際化設定を構成します。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します。

```typescript fileName="app/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ja: "日本語で返されるコンテンツの例",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "ja": "日本語で返されるコンテンツの例",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトでは `./src` または `./app`）に含まれており、コンテンツ宣言のファイル拡張子（デフォルトでは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致する限り、アプリケーションのどこにでも定義できます。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### AdonisJS アプリケーションの設定

`adonis-intlayer` を使用するように AdonisJS アプリケーションをセットアップします。

#### ミドルウェアの登録

まず、アプリケーションに `intlayer` ミドルウェアを登録する必要があります。

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### ルートの定義

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    ja: "日本語で返されるコンテンツの例",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### 関数

`adonis-intlayer` は、アプリケーションでの国際化を処理するためにいくつかの関数をエクスポートします。

- `t(content, locale?)`: 基本的な翻訳関数。
- `getIntlayer(key, locale?)`: 辞書からキーによってコンテンツを取得します。
- `getDictionary(dictionary, locale?)`: 特定の辞書オブジェクトからコンテンツを取得します。
- `getLocale()`: リクエストコンテキストから現在のロケールを取得します。

#### コントローラーでの使用

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        ja: "コントローラーからのこんにちは",
      })
    );
  }
}
```

### 互換性

`adonis-intlayer` は、以下と完全に互換性があります。

- React アプリケーション向けの [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)
- Next.js アプリケーション向けの [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)
- Vite アプリケーション向けの [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)

また、ブラウザや API リクエストを含む、さまざまな環境にわたるあらゆる国際化ソリューションとシームレスに連携します。ヘッダーやクッキーを介してロケールを検出するようにミドルウェアをカスタマイズできます。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定オプション
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

デフォルトでは、`adonis-intlayer` は `Accept-Language` ヘッダーを解釈して、クライアントの優先言語を決定します。

> 設定や高度なトピックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

### TypeScript の設定

`adonis-intlayer` は、TypeScript の強力な機能を活用して国際化プロセスを強化します。TypeScript の静的型付けにより、すべての翻訳キーが考慮され、翻訳の漏れのリスクが軽減され、保守性が向上します。

![補完](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

自動生成された型（デフォルトでは ./types/intlayer.d.ts）が tsconfig.json ファイルに含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能**をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します。

- 翻訳キーの**自動補完**。
- 翻訳漏れの**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新するための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/ja/doc/vs-code-extension)を参照してください。

### Git の設定

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、それらを Git リポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加します。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

## よくある質問

<FAQ>

<Question title="AdonisJSバックエンドを国際化するための異なるソリューションは何ですか？">

AdonisJSには、リクエストスコープのサービスで`resources/lang`ファイル内のICUメッセージをカバーする`@adonisjs/i18n`が付属しています。もう一つの選択肢は、`adonis-intlayer`を介した`Intlayer`です。これは、フロントエンドと共有される型付きファイルでコンテンツを宣言し、リクエストごとにロケールを解決し、AI翻訳、不足している翻訳のチェック、およびCMSを追加します。

バックエンドを国際化する理由は、ユーザーが読むテキストの大部分がフロントエンドを通過しないためです。APIエラーメッセージ、トランザクションメール、プッシュ通知、SMS、PDFエクスポートなどがこれに該当します。これらは、セッションごとではなく、リクエストごとに解決される受信者の言語を必要とします。

[Intlayerを選ぶ理由](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)をご覧ください。

</Question>

<Question title="i18nはAdonisJSサーバーのbundleサイズにどれくらい影響しますか？">

ほとんどありません。辞書は事前にコンパイルされ、宣言したロケールのみが含まれるため、起動時にカタログがロードされたり、リクエストパスでファイルが読み込まれたりすることはありません。これは、bundleサイズがコールドスタート時間に影響するサーバーレスおよびエッジデプロイメントで最も重要です。[bundle最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)をご覧ください。

</Question>

<Question title="`i18next`からハンドラーを書き換えずに移行できますか？">

はい、2つの方法があります。[i18next移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)に従って、コンテンツを段階的に移行できます。または、現在のAPIを完全に維持することも可能です。[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)は、`i18next`とまったく同じAPIを公開しますが、Intlayerの辞書によって提供されるため、インポートは変更されますが、ハンドラーコードは変更されません。

</Question>

<Question title="既存のJSON翻訳ファイルを保持できますか？">

はい、可能です。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は、`/messages/{locale}/{namespace}.json`ファイルを信頼できる情報源として保持し、そこからIntlayer辞書を双方向に生成します。[sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)はgettextカタログに対しても同様の機能を提供し、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)を使用すると、1つのファイルにロケールをグループ化する代わりに、言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ、必要ありません。`npx intlayer extract`を実行すると、Intlayerはソースファイルを読み込み、ユーザー向けの文字列を抽出し、それぞれのファイルの隣に`.content`ファイルを書き出します。これにより、文字列をカタログに一つずつコピーする代わりに、差分を確認することができます。[extractコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)をご覧ください。

同じプロジェクトのフロントエンド側では、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)がさらに進んで、JSX、TSX、Vue、またはSvelteのソースからビルド時に辞書を生成します。これにより、アプリの両側が手動でキーを管理することなく、1つのコンテンツレイヤーを共有できます。

</Question>

<Question title="利用可能なエディターおよびAIエージェントツールは何ですか？">

5つのツールがあり、すべてオプションです。

- **[VS Code拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer`キーからそれを宣言するコンテンツファイルへジャンプしたり、コンポーネントからコンテンツを抽出したり、コマンドパレットまたは専用のIntlayerタブからビルド、フィル、テスト、プッシュ、プルを実行したりできます。
- **[LSPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSPに対応する任意のエディターで同様の機能を提供します。定義へのジャンプ、すべての参照の検索、翻訳された値のホバープレビュー、キーとフィールドのオートコンプリート、およびキーがどこにも宣言されていない場合の警告などがあります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl`の呼び出しも解決するため、移行中に役立ちます。
- **[MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: IntlayerのドキュメントとCLIをCursor、VS Code、Claude Desktop、Claude Code、ChatGPTに公開します。これにより、アシスタントは推測ではなく現在のドキュメントから回答し、`intlayer fill`などのコマンドを自身で実行できます。
- **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content`などの特化したスキルに加え、フレームワークごとのスキルがあり、エージェントにルーティング設定とコンテンツノードのタイプを教えます。
- **[ESLintプラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text`はハードコードされた文字列にフラグを立て、静的辞書キーや未使用のコンテンツに対する追加のルールも提供します。

</Question>

<Question title="Intlayerはどの言語で応答すべきかをどのように判断しますか？">

デフォルトでは、`adonis-intlayer`は受信リクエストの`Accept-Language` headerを読み取り、最も近い宣言されたロケールを選択し、デフォルトのロケールにフォールバックします。`routing.storage`を使用してソースを変更できます。例えば、カスタムheaderやフロントエンドによって設定されたcookieを使用することで、APIはブラウザが通知する言語ではなく、ユーザーが実際に選択した言語で応答できます。[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

</Question>

<Question title="ロケールはリクエストごとに分離されていますか？">

はい。middlewareはアクティブなロケールをリクエストにスコープするため、異なる言語の2つの同時リクエストが互いのロケールを読み取ることはありません。これにより、すべての関数にロケール引数を渡すことなく、サービスから`t()`および`getIntlayer()`を安全に呼び出すことができます。

</Question>

<Question title="受信者の言語でトランザクションメールを送信するにはどうすればよいですか？">

他のコンテンツと同様に、メールコンテンツをコンテンツファイルで宣言し、リクエストロケールではなく、受信者の保存されたロケールに対して`getIntlayer`で解決します。これは、言語がユーザーレコードに属し、headerを読み取るための受信リクエストがないジョブやキューの場合に重要です。

</Question>

<Question title="APIエラーメッセージをローカライズするにはどうすればよいですか？">

エラーが構築される時点でメッセージを`t()`でラップします。アクティブなリクエストロケールがそれを解決するため、クライアントは直接表示できるメッセージを受け取り、フロントエンドはエラーコードの並行カタログを必要としません。

</Question>

<Question title="コントローラーまたはサービス内で翻訳を使用するにはどうすればよいですか？">

辞書キーを指定して`getIntlayer`を呼び出すか、メッセージを`t()`でラップします。アクティブなロケールはmiddlewareがインストールしたリクエストコンテキストから取得されるため、サービスを注入したり、ロケール引数を渡したりする必要はありません。

</Question>

<Question title="Edgeテンプレートで動作しますか？">

はい、動作します。コントローラーでコンテンツを解決し、それをビューに渡すことで、テンプレートはキー自体を解決するのではなく、すでに翻訳された値をレンダリングします。

</Question>

<Question title="AIを使用してバックエンドコンテンツを自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill`を実行すると、選択したLLMと独自のプロバイダーおよびAPIキーを使用して、不足している翻訳が補完されます。`--git-diff`を追加すると、ブランチで変更されたコンテンツのみが翻訳されます。[fillコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と[CI/CD統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)をご覧ください。

</Question>

<Question title="Intlayerはサーバー上で複数形、性別、および補間された値をサポートしていますか？">

はい、サポートしています。[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別に基づくコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、補間された値のための[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、メール本文のための[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、そして数値、日付、通貨のための[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)に対応しています。

</Question>

<Question title="サーバー上でTypeScriptのオートコンプリートは利用できますか？">

はい、利用できます。Intlayerは辞書の型を`./types/intlayer.d.ts`に生成するため、存在しないキーは実行時の空文字列ではなく、コンパイルエラーとなります。宣言されたロケールにコンテンツが不足している場合にビルドを失敗させるには、CIで`npx intlayer test`を実行してください。

</Question>

<Question title="フロントエンドとバックエンドで同じコンテンツを共有できますか？">

はい、それが一般的な設定です。`adonis-intlayer`は、`react-intlayer`、`next-intlayer`、`vite-intlayer`と同じ宣言されたコンテンツで動作するため、APIレスポンスとページの両方で使用されるラベルは一度だけ宣言されます。[Intlayerの仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/how_works_intlayer.md)をご覧ください。

</Question>

<Question title="Intlayerは無料でオープンソースですか？">

はい、Apache 2.0ライセンスの下で、商用利用を含め無料でオープンソースです。ホストされている[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)はオプションの有料サービスであり、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することも可能です。

</Question>

</FAQ>
