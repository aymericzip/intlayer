---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "NestJS i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）NestJSアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - NestJS
  - JavaScript
  - バックエンド
slugs:
  - doc
  - environment
  - nest
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid の useIntlayer API の使用法を直接プロパティアクセスに更新"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 5.8.0
    date: 2025-09-09
    changes: "初版ドキュメント"
---

# Intlayer を使用して Nest バックエンド Web サイトを多言語化する | 国際化 (i18n)

`express-intlayer` は Express アプリケーション向けの強力な国際化 (i18n) ミドルウェアであり、クライアントの設定に基づいたローカライズされたレスポンスを提供することで、バックエンド サービスをグローバルにアクセス可能にするよう設計されています。NestJS は Express の上に構築されているため、`express-intlayer` を NestJS アプリケーションにシームレスに統合して、多言語コンテンツを効果的に処理できます。

tical Use Cases

- **ユーザーの言語でバックエンドエラーを表示する**: エラーが発生した場合、ユーザーの母国語でメッセージを表示することで、理解が向上し、フラストレーションが軽減されます。これは、トーストやモーダルなどのフロントエンドコンポーネントに表示される可能性のある動的なエラーメッセージに特に役立ちます。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションの場合、国際化により、複数の言語でこのコンテンツを提供できることが保証されます。これは、製品説明、記事、およびユーザーが希望する言語でその他のコンテンツを表示する必要があるe-commerceサイトやコンテンツ管理システムなどのプラットフォームにとって重要です。

- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に向上させることができます。

- **多言語プッシュ通知**: モバイルアプリケーションの場合、ユーザーの優先言語でプッシュ通知を送信することで、インタラクションと保持率を向上させることができます。この個人的なタッチにより、通知がより関連性が高く、実用的に感じられるようになります。

- **その他の通信**: SMS メッセージ、システムアラート、またはユーザーインターフェースの更新など、バックエンドからのあらゆる形式の通信は、ユーザーの言語で行われることで、明確性を確保し、全体的なユーザーエクスペリエンスを向上させます。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズにより適切に対応し、サービスを世界規模で拡張するための重要なステップとなります。

## はじめに

### 新しい NestJS プロジェクトの作成

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### インストール

`express-intlayer` を使い始めるには、npm を使ってパッケージをインストールします。

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
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
```

### tsconfig.json の設定

TypeScriptでIntlayerを使用するには、`tsconfig.json`がESモジュールをサポートするように設定されていることを確認してください。これは、`module`と`moduleResolution`のオプションを`nodenext`に設定することで実現できます。

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... その他のオプション
  },
}
```

### セットアップ

プロジェクトのルートに`intlayer.config.ts`を作成して、国際化設定を構成します。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### コンテンツの宣言

翻訳を格納するためのコンテンツ宣言を作成および管理します:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](/doc/concept/content)を参照してください。

### Express ミドルウェアのセットアップ

`express-intlayer` ミドルウェアを NestJS アプリケーションに統合して、国際化を処理します：

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // 全てのルートに適用
  }
}
```

### サービスまたはコントローラーで翻訳を使用する

これで、`getIntlayer` 関数を使用してサービスやコントローラー内で翻訳にアクセスできます：

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // 翻訳された挨拶を取得
  }
}
```

### 互換性

`express-intlayer` は以下と完全に互換性があります：

- Reactアプリケーション向けの [`react-intlayer`](/doc/packages/react-intlayer)
- Next.jsアプリケーション向けの [`next-intlayer`](/doc/packages/next-intlayer)
- Viteアプリケーション向けの [`vite-intlayer`](/doc/packages/vite-intlayer)

また、ブラウザやAPIリクエストを含む様々な環境での国際化ソリューションともシームレスに連携します。ミドルウェアをカスタマイズして、ヘッダーやクッキーを通じてロケールを検出することも可能です：

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

デフォルトでは、`express-intlayer` は `Accept-Language` ヘッダーを解釈してクライアントの優先言語を判別します。

> 設定や高度なトピックの詳細については、[ドキュメント](/doc/concept/configuration)をご覧ください。

### TypeScriptの設定

`express-intlayer` は、国際化プロセスを強化するために TypeScript の強力な機能を活用しています。TypeScript の静的型付けにより、すべての翻訳キーが確実に管理され、翻訳漏れのリスクを減らし、保守性を向上させます。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

自動生成される型定義ファイル（デフォルトでは ./types/intlayer.d.ts）が tsconfig.json ファイルに含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  include: [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型定義を含める
  ],
}
```

### VS Code 拡張機能

Intlayerでの開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**。
- 欠落している翻訳の **リアルタイムエラー検出**。
- 翻訳された内容の **インラインプレビュー**。
- 翻訳の作成や更新を簡単に行うための **クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### Git 設定

Intlayerによって生成されたファイルは無視することを推奨します。これにより、Gitリポジトリへのコミットを避けることができます。

これを行うには、以下の指示を `.gitignore` ファイルに追加してください。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

## よくある質問

<FAQ>

<Question title="NestJS バックエンドを国際化するために利用可能なソリューションにはどのようなものがありますか？">

NestJS には `nestjs-i18n` があり、これが一般的な選択肢で、JSON または YAML カタログとリクエストスコープのサービスをカバーしています。別の選択肢は `express-intlayer` を通じた `Intlayer` で、フロントエンドと同じ宣言されたコンテンツを使用し、辞書に対して型付けされており、AI 翻訳と CMS が付属しています。

バックエンドを国際化する理由は、ユーザーが読むテキストの大部分がフロントエンドを通過しないためです。API エラーメッセージ、トランザクションメール、プッシュ通知、SMS、PDF エクスポートなどです。これらはセッションごとではなくリクエストごとに解決される受信者の言語が必要です。

[Intlayer の利点](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)を参照してください。

</Question>

<Question title="i18n は NestJS サーバーのバンドルサイズにどの程度追加されますか？">

ほとんど追加されません。辞書はあらかじめコンパイルされ、宣言したロケールのみが含まれるため、ブート時のカタログ読み込みやリクエストパス上のファイル読み込みはありません。これはサーバーレスおよびエッジデプロイメントで最も重要で、バンドルサイズがコールドスタート時間を左右します。[バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)を参照してください。

</Question>

<Question title="`i18next` からハンドラーを書き直さずに移行できますか？">

はい、2 つのパスがあります。[i18next 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)でコンテンツを段階的に移行できます。または、現在の API を完全に保つことができます。[互換性アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)は `i18next` と同じ API を公開しますが、Intlayer 辞書によって提供されるため、インポートは変わりますがハンドラーコードは変わりません。

</Question>

<Question title="既存の JSON 翻訳ファイルを保持できますか？">

はい。[sync JSON プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は `/messages/{locale}/{namespace}.json` ファイルを真実のソースとして保持し、双方向で Intlayer 辞書を生成します。[sync PO プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)は gettext カタログに対して同じことを行い、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)ではロケールを 1 つのファイルにグループ化する代わりに言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract` を実行すると、Intlayer はソースファイルを読み込み、ユーザーが見える文字列を抽出し、各ファイルの横に `.content` ファイルを書き込むため、文字列をカタログに 1 つずつコピーする代わりに diff をレビューできます。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を参照してください。

同じプロジェクトのフロントエンド側では、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)はさらに進んで、JSX、TSX、Vue または Svelte ソースからビルド時に辞書を生成するため、アプリの両側が手動で保持されたキーなしで 1 つのコンテンツレイヤーを共有します。

</Question>

<Question title="利用可能なエディターと AI エージェントツールは何ですか？">

5 つあり、すべてオプションです。

- **[VS Code 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプし、コンポーネントからコンテンツを抽出し、コマンドパレットまたは専用の Intlayer タブからビルド、fill、test、push、pull を実行します。
- **[LSP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSP を話す任意のエディターで同じ認識を持ち、定義へのジャンプ、すべての参照を検索、翻訳値のホバープレビュー、キーとフィールドのオートコンプリート、キーがどこにも宣言されていない場合の警告があります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl` の呼び出しも解決し、移行中に役立ちます。
- **[MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: Intlayer ドキュメントと CLI を Cursor、VS Code、Claude Desktop、Claude Code、ChatGPT に公開するため、アシスタントは推測する代わりに現在のドキュメントから回答でき、`intlayer fill` などのコマンドを自分で実行できます。
- **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content` などの焦点を絞ったスキル、およびフレームワークごとに 1 つ、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint プラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text` はハードコードされた文字列にフラグを立て、静的辞書キーと未使用コンテンツのさらなるルールがあります。

</Question>

<Question title="Intlayer はどの言語で応答するかをどのように知っていますか？">

デフォルトでは `express-intlayer` は受信リクエストの `Accept-Language` ヘッダーを読み込み、最も近い宣言されたロケールを選択し、デフォルトロケールにフォールバックします。`routing.storage` でソースを変更できます。例えば、カスタムヘッダーまたはフロントエンドで設定された cookie を使用して、API がブラウザが宣伝する言語ではなくユーザーが実際に選択した言語で応答するようにできます。[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Question>

<Question title="ロケールはリクエストごとに分離されていますか？">

はい。middleware はアクティブなロケールをリクエストにスコープするため、異なる言語の 2 つの同時リクエストが互いのロケールを読み込むことはありません。これが `t()` と `getIntlayer()` をサービスから呼び出すのが安全である理由で、すべての関数を通じてロケール引数をスレッド化する必要がありません。

</Question>

<Question title="受信者の言語でトランザクションメールを送信するにはどうすればよいですか？">

他のコンテンツと同じようにメールコンテンツをコンテンツファイルで宣言し、リクエストロケールではなく受信者の保存されたロケールに対して `getIntlayer` で解決します。これはジョブとキューで重要で、言語はユーザーレコードに属し、ヘッダーを読み込むための受信リクエストがありません。

</Question>

<Question title="API エラーメッセージをローカライズするにはどうすればよいですか？">

メッセージをエラーが構築される時点で `t()` でラップします。アクティブなリクエストロケールがそれを解決するため、クライアントは直接表示できるメッセージを受け取り、フロントエンドはエラーコードの並列カタログを必要としません。

</Question>

<Question title="NestJS サービスまたはコントローラーに翻訳を注入できますか？">

はい。サービスまたはコントローラー内で `getIntlayer("app")` を呼び出します。上記に示されています。機能ごとに登録するモジュールはなく、注入するトークンもありません。アクティブなロケールは middleware がインストールしたリクエストコンテキストから来るためです。

</Question>

<Question title="バックエンドコンテンツを AI で自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill` を実行します。これは選択した LLM を使用して独自のプロバイダーと API キーで不足している翻訳を入力します。`--git-diff` を追加してブランチで変更されたコンテンツのみを翻訳します。[fill コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と [CI/CD 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)を参照してください。

</Question>

<Question title="Intlayer はサーバー上で複数形、性別、補間値をサポートしていますか？">

はい。[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別ベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、補間値の[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、メール本文の [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、および数値、日付、通貨の[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)があります。

</Question>

<Question title="サーバーで TypeScript オートコンプリートを取得できますか？">

はい。Intlayer は辞書の型を `./types/intlayer.d.ts` に生成するため、存在しないキーはランタイムの空の文字列ではなくコンパイルエラーになります。CI で `npx intlayer test` を実行して、宣言されたロケールがコンテンツを欠いている場合にビルドを失敗させます。

</Question>

<Question title="フロントエンドとバックエンドが同じコンテンツを共有できますか？">

はい、それが通常のセットアップです。`express-intlayer` は同じ宣言されたコンテンツ上で `react-intlayer`、`next-intlayer`、`vite-intlayer` と一緒に機能するため、API レスポンスとページの両方で使用されるラベルは 1 回宣言されます。[Intlayer の仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/how_works_intlayer.md)を参照してください。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい、Apache 2.0 ライセンスの下で、商用利用を含みます。ホストされた [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) はオプションの有料サービスで、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することもできます。

</Question>

</FAQ>
