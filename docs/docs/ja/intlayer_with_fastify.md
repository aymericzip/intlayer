---
createdAt: 2025-12-30
updatedAt: 2026-08-30
title: "Fastify i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Fastifyアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Fastify
  - JavaScript
  - バックエンド
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.6.0
    date: 2025-12-31
    changes: "initコマンドの追加"
  - version: 7.6.0
    date: 2025-12-31
    changes: "履歴の初期化"
author: aymericzip
---

# Intlayerを使用したFastifyバックエンドウェブサイトの翻訳 | 国際化 (i18n)

`fastify-intlayer`は、Fastifyアプリケーション向けの強力な国際化(i18n)プラグインです。クライアントの好みに基づいてローカライズされたレスポンスを提供することで、バックエンドサービスをグローバルにアクセス可能にするよう設計されています。

> GitHubで[パッケージの実装を確認する](https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer)。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示する**: エラーが発生した際、ユーザーの母国語でメッセージを表示することで、理解を深め、フラストレーションを軽減します。これは、トーストやモーダルなどのフロントエンドコンポーネントに表示される動的なエラーメッセージに特に有用です。
- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションの場合、国際化によって複数の言語でコンテンツを提供できるようになります。これは、ユーザーの好みの言語で商品説明や記事などを表示する必要があるECサイトやコンテンツ管理システムなどのプラットフォームにとって極めて重要です。
- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に高めることができます。
- **多言語プッシュ通知**: モバイルアプリケーションの場合、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションと継続率を向上させることができます。このパーソナライズされたアプローチにより、通知がより関連性が高く、実行可能なものと感じられるようになります。
- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語に対応することで、明快さを確保し、全体的なユーザーエクスペリエンスを向上させることができます。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズにより適合するようになり、サービスを世界規模で拡張するための重要なステップとなります。

## はじめに

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-fastify-template)を確認してください。

### インストール

`fastify-intlayer`の使用を開始するには、npmを使用してパッケージをインストールします。

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` フラグはオプションです。AI エージェントの場合は `intlayer-cli init` を使用してください。

> このコマンドは環境を検出し、必要なパッケージをインストールします。例えば：

```bash packageManager="npm"
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### 設定

プロジェクトのルートに`intlayer.config.ts`を作成して、国際化設定を構成します。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します。

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトでは`./src`）に含まれている限り、アプリケーション内のどこにでも定義できます。また、コンテンツ宣言のファイル拡張子（デフォルトでは`.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）と一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### Fastifyアプリケーションの設定

`fastify-intlayer`を使用するようにFastifyアプリケーションを設定します。

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// 国際化プラグインのロード
await fastify.register(intlayer);

// ルート
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// サーバーの起動
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### 互換性

`fastify-intlayer`は、以下と完全に互換性があります。

- Reactアプリケーション用 [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)
- Next.jsアプリケーション用 [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)
- Viteアプリケーション用 [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)

また、ブラウザやAPIリクエストなど、さまざまな環境におけるあらゆる国際化ソリューションとシームレスに連携します。ミドルウェアをカスタマイズして、ヘッダーまたはCookieを介してロケールを検出することもできます。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

デフォルトでは、`fastify-intlayer`は`Accept-Language`ヘッダーを解釈して、クライアントの優先言語を決定します。

> 設定および詳細なトピックについては、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### TypeScriptの設定

`fastify-intlayer`は、国際化プロセスを改善するためにTypeScriptの強力な機能を活用しています。TypeScriptの静的型付けにより、すべての翻訳キーが考慮されていることが保証され、翻訳漏れのリスクが軽減され、保守性が向上します。

自動生成された型（デフォルトでは./types/intlayer.d.ts）がtsconfig.jsonファイルに含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code Extension**をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します。

- 翻訳キーの**オートコンプリート**。
- 翻訳漏れに対する**リアルタイムのエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新できる**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code Extensionドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### Gitの設定

Intlayerによって生成されたファイルは無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

そのためには、`.gitignore`ファイルに以下の指示を追加します。

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer

```

## よくある質問

<FAQ>

<Question title="Fastify バックエンドを国際化するために利用可能なソリューションにはどのようなものがありますか？">

一般的なオプションは `i18next` と `fastify-i18next` またはカスタムで書かれた hook で、名前空間ごとに JSON カタログを読み込み、ロケールをリクエストに保存します。別のオプションは `fastify-intlayer` を通じた `Intlayer` で、プラグインを自動的に登録し、リクエストごとにロケールを解決し、フロントエンドと同じ型付きコンテンツを共有します。

バックエンドを国際化する理由は、ユーザーが読むテキストの大部分がフロントエンドを通過しないためです。API エラーメッセージ、トランザクションメール、プッシュ通知、SMS、PDF エクスポートなどです。これらは受信者の言語が必要で、セッションごとではなくリクエストごとに解決される必要があります。

[Intlayer を選ぶ理由](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)を参照してください。

</Question>

<Question title="i18n は Fastify サーバーのバンドルサイズにどの程度の影響を与えますか？">

非常に少ないです。辞書はビルド時にコンパイルされ、宣言したロケールのみが含まれるため、ブート時のカタログ読み込みやリクエストパス上のファイル読み込みはありません。これは特にサーバーレスおよびエッジデプロイメントで重要です。バンドルサイズはコールドスタート時間に影響します。[バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)を参照してください。

</Question>

<Question title="`i18next` からハンドラーを書き直さずに移行できますか？">

はい、2 つのパスがあります。[i18next 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)を使用してコンテンツを段階的に移行できます。または、現在の API を完全に保つことができます。[互換性アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)は `i18next` と同じ API を公開しますが、Intlayer 辞書によって提供されるため、インポートは変わりますがハンドラーコードは変わりません。

</Question>

<Question title="既存の JSON 翻訳ファイルを保持できますか？">

はい。[sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は `/messages/{locale}/{namespace}.json` ファイルを信頼できるソースとして保持し、Intlayer 辞書を双方向で生成します。[sync PO プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)は gettext カタログに対して同じことを行い、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)ではロケールを 1 つのファイルにグループ化する代わりに言語で分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract` を実行すると、Intlayer はソースファイルを読み込み、ユーザーが見える文字列を抽出し、各ファイルの隣に `.content` ファイルを書き込むため、文字列をカタログに 1 つずつコピーする代わりに diff をレビューできます。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を参照してください。

同じプロジェクトのフロントエンド側では、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)はさらに進んで、JSX、TSX、Vue または Svelte ソースからビルド時に辞書を生成するため、アプリの両側は手動で管理されたキーなしで 1 つのコンテンツレイヤーを共有します。

</Question>

<Question title="利用可能なエディターと AI エージェントツールは何ですか？">

5 つのツールがあり、すべてオプションです。

- **[VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプし、コンポーネントからコンテンツを抽出し、コマンドパレットまたは専用 Intlayer タブからビルド、fill、test、push、pull を実行します。
- **[LSP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSP に対応した任意のエディターで同じ認識を提供し、定義へのジャンプ、すべての参照を検索、翻訳値のホバープレビュー、キーとフィールドのオートコンプリート、キーが宣言されていない場合の警告があります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl` の呼び出しも解決し、移行中に役立ちます。
- **[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: Intlayer ドキュメントと CLI を Cursor、VS Code、Claude Desktop、Claude Code、ChatGPT に公開するため、アシスタントは推測する代わりに現在のドキュメントから回答でき、`intlayer fill` などのコマンドを自分で実行できます。
- **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content` などの焦点を絞ったスキル、およびフレームワークごとに 1 つのスキルがあり、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text` はハードコードされた文字列にフラグを立て、静的辞書キーと未使用コンテンツの追加ルールがあります。

</Question>

<Question title="Intlayer はどの言語で応答するかをどのように知っていますか？">

デフォルトでは `fastify-intlayer` は受信リクエストの `Accept-Language` ヘッダーを読み込み、最も近い宣言されたロケールを選択し、デフォルトロケールにフォールバックします。`routing.storage` でソースを変更できます。例えば、カスタムヘッダーまたはフロントエンドで設定された cookie を使用して、API がブラウザーが宣伝する言語ではなく、ユーザーが実際に選択した言語で応答するようにできます。[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Question>

<Question title="ロケールはリクエストごとに分離されていますか？">

はい。プラグインはアクティブなロケールをリクエストにスコープするため、異なる言語の 2 つの同時リクエストが互いのロケールを読み込むことはありません。これにより、`t()` と `getIntlayer()` をサービスから呼び出すことが安全になり、すべての関数を通じてロケール引数をスレッド化する必要がなくなります。

</Question>

<Question title="受信者の言語でトランザクションメールを送信するにはどうすればよいですか？">

他のコンテンツと同様にメールコンテンツをコンテンツファイルで宣言し、リクエストロケールではなく受信者の保存されたロケールに対して `getIntlayer` で解決します。これはジョブとキューで重要です。言語はユーザーレコードに属し、ヘッダーを読み込むための受信リクエストがないためです。

</Question>

<Question title="API エラーメッセージをローカライズするにはどうすればよいですか？">

メッセージをエラーが構築される時点で `t()` でラップします。アクティブなリクエストロケールがそれを解決するため、クライアントは直接表示できるメッセージを受け取り、フロントエンドはエラーコードの並列カタログを必要としません。

</Question>

<Question title="Fastify プラグインのライフサイクルとカプセル化で機能しますか？">

はい。`fastify-intlayer` は標準 Fastify プラグインとして登録されるため、通常のカプセル化ルールに従います。ルートで登録するか、それを必要とするスコープ内で、コンテンツを読み込むルートの前に登録します。

</Question>

<Question title="バックエンドコンテンツを AI で自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill` を実行します。これにより、選択した LLM を使用して、独自のプロバイダーと API キーで不足している翻訳を入力します。`--git-diff` を追加して、ブランチで変更されたコンテンツのみを翻訳します。[fill コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と [CI/CD 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)を参照してください。

</Question>

<Question title="Intlayer はサーバー上で複数形、性別、補間値をサポートしていますか？">

はい。[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別ベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、補間値の[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、メール本文の [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、および数値、日付、通貨の[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)があります。

</Question>

<Question title="サーバーで TypeScript オートコンプリートを取得できますか？">

はい。Intlayer は辞書の型を `./types/intlayer.d.ts` に生成するため、存在しないキーはランタイムの空の文字列ではなくコンパイルエラーになります。CI で `npx intlayer test` を実行して、宣言されたロケールがコンテンツを欠いている場合にビルドを失敗させます。

</Question>

<Question title="フロントエンドとバックエンドが同じコンテンツを共有できますか？">

はい、これが通常のセットアップです。`fastify-intlayer` は同じ宣言されたコンテンツで `react-intlayer`、`next-intlayer`、`vite-intlayer` と並行して機能するため、API レスポンスとページの両方で使用されるラベルは 1 回だけ宣言されます。[Intlayer の仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/how_works_intlayer.md)を参照してください。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい、Apache 2.0 ライセンスの下で、商用利用を含みます。ホストされた [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) はオプションの有料サービスで、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することもできます。

</Question>

</FAQ>
