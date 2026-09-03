---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: "Express i18n - あなたのアプリを翻訳する完全ガイド"
description: "i18nextはもう不要。2026年に多言語（i18n）Expressアプリを構築するためのガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメンテーション
  - Intlayer
  - Express
  - JavaScript
  - バックエンド
slugs:
  - doc
  - environment
  - express
applicationTemplate: https://github.com/aymericzip/intlayer-express-template
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

# IntlayerでExpress backendを翻訳する | 国際化（i18n）

`express-intlayer` は、Expressアプリケーション向けの強力な国際化 (i18n) ミドルウェアであり、クライアントの好みに基づいてローカライズされたレスポンスを提供することで、バックエンドサービスをグローバルに利用可能にします。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示する**: エラーが発生した場合、ユーザーの母語でメッセージを表示することで、理解が向上し、イライラを軽減できます。これは、トーストやモーダルなどのフロントエンドコンポーネントに表示される可能性のある動的エラーメッセージに特に役立ちます。

- **ユーザーの言語でバックエンドエラーを表示**: エラーが発生した際に、ユーザーの母国語でメッセージを表示することで、理解が深まり、フラストレーションが軽減されます。これは、トーストやモーダルのようなフロントエンドコンポーネントに表示される動的なエラーメッセージに特に有用です。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションでは、国際化により複数の言語でコンテンツを提供できます。これは、ユーザーが好む言語で商品説明や記事、その他のコンテンツを表示する必要があるeコマースサイトやコンテンツ管理システムのようなプラットフォームにとって重要です。
- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に向上させることができます。

- **多言語プッシュ通知**: モバイルアプリケーションでは、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションとリテンションを向上させることができます。このパーソナルなタッチにより、通知がより関連性が高く、行動を促すものになります。

- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語で行うことで明確さが向上し、全体的なユーザーエクスペリエンスが向上します。
  バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズにより適合し、サービスを世界規模で拡大するための重要なステップとなります。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズとより良く整合し、サービスを世界規模で拡張する上で重要なステップとなります。

## 始めるにあたって

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-express-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-express-template) on GitHub.

### インストール

`express-intlayer` を使用するには、npmを使用してパッケージをインストールします:

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

### セットアップ

プロジェクトのルートに `intlayer.config.ts` を作成して国際化設定を構成します:

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

翻訳を格納するためのコンテンツ宣言を作成および管理します:

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
        "ja": "英語で返されるコンテンツの例",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれていれば、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### Express アプリケーションのセットアップ

`express-intlayer` を使用するように Express アプリケーションをセットアップします:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// 国際化リクエストハンドラーを読み込む
app.use(intlayer());

// ルート
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// サーバーを起動
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### 互換性

`express-intlayer` は以下と完全に互換性があります:

- Reactアプリケーション向けの [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)
- Next.jsアプリケーション向けの [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)
- Viteアプリケーション向けの [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)
  さまざまな環境（ブラウザやAPIリクエストを含む）で、あらゆる国際化ソリューションとシームレスに連携します。ミドルウェアをカスタマイズして、ヘッダーやクッキーからロケールを検出することも可能です：

また、ブラウザや API リクエストなど、様々な環境における国際化ソリューションとシームレスに連携します。ヘッダーやクッキーを通じてロケールを検出するようにミドルウェアをカスタマイズできます:

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

デフォルトでは、`express-intlayer` は `Accept-Language` ヘッダーを解釈してクライアントの優先言語を判別します。

> 設定や高度なトピックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

### TypeScript の設定

`express-intlayer` は、TypeScript の強力な機能を活用して国際化プロセスを強化します。TypeScript の静的型付けにより、すべての翻訳キーが網羅されていることが保証され、翻訳漏れのリスクを減らし、保守性を向上させます。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

自動生成された型定義ファイル（デフォルトでは ./types/intlayer.d.ts）が tsconfig.json ファイルに含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型定義を含める
  ],
}
```

### VS Code 拡張機能

Intlayer の開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**。
- 欠落している翻訳の **リアルタイムエラー検出**。
- 翻訳済みコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成・更新できる **クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### Git 設定

Intlayer によって生成されたファイルは無視することを推奨します。これにより、Git リポジトリへのコミットを避けることができます。

これを行うには、以下の指示を `.gitignore` ファイルに追加してください。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

## よくある質問

<FAQ>

<Question title="Expressバックエンドを国際化するための異なるソリューションは何ですか？">

従来の選択肢は、`i18next`と`i18next-http-middleware`を組み合わせる方法で、名前空間ごとにJSONカタログをロードし、リクエストにロケールを保存します。もう一つの選択肢は、`express-intlayer`を介した`Intlayer`です。これは、フロントエンドと共有される型付きファイルでコンテンツを宣言し、リクエストごとにロケールを解決し、AI翻訳とCMSを追加します。

バックエンドを国際化する理由は、ユーザーが読むテキストの大部分がフロントエンドを通過しないためです。例えば、APIエラーメッセージ、トランザクションメール、プッシュ通知、SMS、PDFエクスポートなどです。これらはセッションごとではなく、リクエストごとに解決される受信者の言語を必要とします。

[Intlayerを選ぶ理由](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)をご覧ください。

</Question>

<Question title="i18nはExpressサーバーのbundleサイズにどれくらい影響しますか？">

ごくわずかです。辞書は事前にコンパイルされ、宣言したロケールのみが含まれるため、起動時のカタログロードやリクエストパスでのファイル読み込みは発生しません。これは、bundleサイズがコールドスタート時間に影響するサーバーレスおよびエッジデプロイメントで特に重要です。
[bundle最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)をご覧ください。

</Question>

<Question title="`i18next`からハンドラーを書き換えずに移行できますか？">

はい、2つの方法があります。[i18next移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)に従って、コンテンツを段階的に移行できます。または、既存のAPIを完全に維持することも可能です。[compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)は`i18next`とまったく同じAPIを公開しますが、Intlayerの辞書によって提供されるため、インポートは変更されますが、ハンドラーコードは変更されません。

</Question>

<Question title="既存のJSON翻訳ファイルを保持できますか？">

はい、可能です。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は、`/messages/{locale}/{namespace}.json`ファイルを信頼できる情報源として保持し、そこからIntlayer辞書を双方向に生成します。
[sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)はgettextカタログに対しても同様の機能を提供し、[per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)を使用すると、ロケールを1つのファイルにまとめるのではなく、言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ、必要ありません。`npx intlayer extract`を実行すると、Intlayerがソースファイルを読み込み、ユーザー向けの文字列を抽出し、それぞれの隣に`.content`ファイルを書き込みます。これにより、文字列をカタログに1つずつコピーする代わりに、差分を確認するだけで済みます。
[extractコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)をご覧ください。

同じプロジェクトのフロントエンド側では、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)がさらに進んで、ビルド時にJSX、TSX、Vue、またはSvelteのソースから辞書を生成します。これにより、アプリの両半分が手動でキーを管理することなく、1つのコンテンツレイヤーを共有できます。

</Question>

<Question title="利用可能なエディターおよびAIエージェントツールは何ですか？">

以下の5つのツールがあり、すべてオプションです。

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer`キーからそれを宣言するコンテンツファイルにジャンプしたり、コンポーネントからコンテンツを抽出したり、コマンドパレットまたは専用のIntlayerタブからビルド、フィル、テスト、プッシュ、プルを実行したりできます。
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSPをサポートする任意のエディターで、定義へのジャンプ、すべての参照の検索、翻訳された値のホバープレビュー、キーとフィールドのオートコンプリート、どこにも宣言されていないキーに対する警告など、同様の認識機能を提供します。また、`i18next`、`react-i18next`、`next-intl`、`use-intl`の呼び出しも解決するため、移行中に役立ちます。
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: IntlayerのドキュメントとCLIをCursor、VS Code、Claude Desktop、Claude Code、ChatGPTに公開します。これにより、アシスタントは推測ではなく現在のドキュメントから回答し、`intlayer fill`などのコマンドを自分で実行できます。
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content`などの特化したスキルに加え、フレームワークごとのスキルがあり、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text`はハードコードされた文字列を検出し、静的辞書キーや未使用コンテンツに対する追加のルールも提供します。

</Question>

<Question title="Intlayerはどの言語で応答するかをどのように判断しますか？">

デフォルトでは、`express-intlayer`は受信リクエストの`Accept-Language` headerを読み取り、最も近い宣言されたロケールを選択し、見つからない場合はデフォルトのロケールにフォールバックします。`routing.storage`を使用してソースを変更できます。例えば、フロントエンドによって設定されたカスタムheaderやcookieを使用することで、APIはブラウザが通知する言語ではなく、ユーザーが実際に選択した言語で応答できます。
[設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

</Question>

<Question title="ロケールはリクエストごとに分離されますか？">

はい。middlewareはアクティブなロケールをリクエストにスコープするため、異なる言語の2つの同時リクエストが互いのロケールを読み取ることはありません。これにより、サービスから`t()`や`getIntlayer()`を呼び出す際に、すべての関数にロケール引数を渡す必要がなく、安全に呼び出すことができます。

</Question>

<Question title="受信者の言語でトランザクションメールを送信するにはどうすればよいですか？">

他のコンテンツと同様に、メールコンテンツをコンテンツファイルで宣言し、リクエストロケールではなく、受信者の保存されたロケールに対して`getIntlayer`で解決します。これは、言語がユーザーレコードに属し、headerを読み取るための受信リクエストがないジョブやキューにとって重要です。

</Question>

<Question title="APIエラーメッセージをローカライズするにはどうすればよいですか？">

エラーが構築される時点でメッセージを`t()`でラップします。アクティブなリクエストロケールがそれを解決するため、クライアントは直接表示できるメッセージを受け取り、フロントエンドはエラーコードの並行カタログを必要としません。

</Question>

<Question title="既存のExpressアプリや他のmiddlewareと連携しますか？">

はい。`express-intlayer`は標準的なExpress middlewareであるため、既存のスタックと連携します。コンテンツを読み取るルートの前に登録することで、ハンドラーが`t()`または`getIntlayer()`を呼び出すまでにロケールが解決されます。

</Question>

<Question title="AIを使ってバックエンドコンテンツを自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill`を実行すると、選択したLLMと独自のプロバイダーおよびAPIキーを使用して、不足している翻訳が自動的に補完されます。`--git-diff`を追加すると、ブランチで変更されたコンテンツのみを翻訳できます。
[fillコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)および[CI/CD統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)をご覧ください。

</Question>

<Question title="Intlayerはサーバー上で複数形、性別、補間値をサポートしていますか？">

はい、サポートしています。[複数形](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)、[性別に基づくコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、補間値のための[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、メール本文のための[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、そして数値、日付、通貨のための[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)に対応しています。

</Question>

<Question title="サーバー上でTypeScriptのオートコンプリートは利用できますか？">

はい。Intlayerは辞書の型を`./types/intlayer.d.ts`に生成するため、存在しないキーは実行時に空の文字列になるのではなく、コンパイルエラーになります。CIで`npx intlayer test`を実行すると、宣言されたロケールにコンテンツが不足している場合にビルドを失敗させることができます。

</Question>

<Question title="フロントエンドとバックエンドで同じコンテンツを共有できますか？">

はい、可能です。それが一般的な設定です。`express-intlayer`は、`react-intlayer`、`next-intlayer`、`vite-intlayer`と連携して同じ宣言されたコンテンツで動作するため、APIレスポンスとページの両方で使用されるラベルは一度だけ宣言されます。
[Intlayerの仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/how_works_intlayer.md)をご覧ください。

</Question>

<Question title="Intlayerは無料でオープンソースですか？">

はい、Apache 2.0ライセンスの下で、商用利用も含まれます。ホストされている[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)はオプションの有料サービスですが、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することも可能です。

</Question>

</FAQ>
