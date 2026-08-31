---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: Intlayerビジュアルエディター | ビジュアルエディターを使用してコンテンツを編集します
description: Intlayerエディターを使用して多言語ウェブサイトを管理する方法を発見してください。このオンラインドキュメントの手順に従って、数分でプロジェクトを設定することができます。
keywords:
  - エディター
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴を初期化"
author: aymericzip
---

# Intlayer Visual Editor ドキュメント

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Visual Editor は、ビジュアルエディターを使用してコンテンツ宣言ファイルと対話するためにウェブサイトをラップするツールです。

![Intlayer Visual Editor インターフェース](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

`intlayer-editor` パッケージは Intlayer に基づいており、React (Create React App)、Vite + React、Next.js などの JavaScript アプリケーションで利用可能です。

## ビジュアルエディター vs CMS

Intlayer Visual Editor は、ローカル辞書のビジュアルエディタでコンテンツを管理できるツールです。変更が行われると、コンテンツはコードベース内で置き換えられます。つまり、アプリケーションが再構築され、ページがリロードされて新しいコンテンツが表示されます。

対照的に、[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) は、遠隔辞書のビジュアルエディタでコンテンツを管理できるツールです。変更が行われても、コードベースには影響を与えません。そして、ウェブサイトは自動的に変更されたコンテンツを表示します。

## Intlayer をアプリケーションに統合する

Intlayer を統合する方法の詳細については、以下の関連セクションを参照してください。

### Next.js との統合

Next.js との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md) を参照してください。

### Create React App との統合

Create React App との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md) を参照してください。

### Vite + React との統合

Vite + React との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md) を参照してください。

## Intlayer Editor の仕組み

アプリケーション内のビジュアルエディタには以下の2つの要素が含まれます:

- ウェブサイトを iframe に表示するフロントエンドアプリケーション。ウェブサイトが Intlayer を使用している場合、ビジュアルエディタは自動的にコンテンツを検出し、対話できるようにします。変更が行われると、変更をダウンロードすることができます。

- ダウンロードボタンをクリックすると、ビジュアルエディタはサーバーにリクエストを送信し、プロジェクト内で宣言されている場所に新しいコンテンツでコンテンツ宣言ファイルを置き換えます。

> 現時点では、Intlayer Editor はコンテンツ宣言ファイルを JSON ファイルとして書き込みます。

## インストール

プロジェクトで Intlayer が設定されたら、`intlayer-editor` を開発依存関係としてインストールしてください:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

`--with` フラグを使用すると、エディターを別のコマンドと並行して開始できます:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## 設定

Intlayer の設定ファイルで、エディタの設定をカスタマイズできます:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の設定
  editor: {
    /**
     * 必須
     * アプリケーションの URL。
     * これはビジュアルエディタがターゲットとする URL です。
     * 例: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 任意
     * デフォルトは `true`。`false` の場合、エディタは無効化されアクセスできません。
     * 本番環境などのセキュリティ上の理由で特定の環境でエディタを無効化するために使用できます。
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * 任意
     * デフォルトは `8000`。
     * エディタサーバーのポート。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 任意
     * デフォルトは "http://localhost:8000"
     * エディタサーバーの URL。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> 利用可能なすべてのパラメータについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) を参照してください。

## エディタの使用方法

1. エディタがインストールされたら、次のコマンドを使用してエディタを起動できます:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

> **アプリケーションを並行して実行する必要があることに注意してください。** アプリケーション URL は、エディター設定で設定した URL (`applicationURL`) と一致する必要があります。

> **アプリケーションは並行して実行する必要があります。** アプリケーションの URL はエディタ設定の `applicationURL` と一致している必要があります。

2. 次に、指定された URL を開きます。デフォルトは `http://localhost:8000` です。

   コンテンツ上にカーソルをホバーすると、Intlayer によってインデックスされた各フィールドを確認できます。

   ![コンテンツ上をホバー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. コンテンツがアウトライン表示されている場合、長押しして編集ドロワーを表示できます。

## 環境設定

エディタは特定の環境ファイルを使用するように設定できます。これは、開発環境と本番環境で同じ設定ファイルを使いたい場合に便利です。

特定の環境ファイルを使用するには、エディタ起動時に `--env-file` または `-f` フラグを使用します:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> 環境ファイルはプロジェクトのルートディレクトリに配置する必要があります。

または、`--env` または `-e` フラグを使って環境を指定することもできます:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## デバッグ

ビジュアルエディタに問題がある場合は、以下を確認してください:

- ビジュアルエディタとアプリケーションが実行中である。

- Intlayer 設定ファイルで [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 設定が正しく設定されている。
  - 必須フィールド:
    - アプリケーション URL はエディタ設定 (`applicationURL`) に設定したものと一致する必要があります。

- ビジュアルエディターは iframe を使用してウェブサイトを表示します。ウェブサイトのコンテンツセキュリティポリシー（CSP）が CMS の URL を `frame-ancestors` として許可していることを確認してください（デフォルトは 'http://localhost:8000'）。エディターのコンソールでエラーがないか確認してください。

## よくある質問

<FAQ>

<Question title="ビジュアルエディターとCMSの違いは何ですか？">

ビジュアルエディターはローカル辞書を編集し、その変更をコードベースに書き戻すため、通常のレビューとデプロイメントのプロセスを経ます。[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) はリモート辞書を編集し、デプロイメントなしで実行中のサイトに変更を反映させます。エディターは開発者が所有するコンテンツに適しており、CMSはマーケティングチームが所有するコンテンツに適しています。

</Question>

<Question title="i18nはバンドルサイズにどのくらい影響しますか？">

名前空間ベースのセットアップよりもはるかに少なく、ページはレンダリングしないカタログをダウンロードすることはありません。サーバーでレンダリングされたマークアップはサーバー上でコンテンツを解決し、ビルド時コンパイラは `useIntlayer` の呼び出しをコンポーネントが使用する正確な辞書エントリに置き換えるため、未使用のキーや未使用の言語は削除されます。[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md) は残りをロケールごとに分割します。一般的な代替手段と比較して、Intlayerはbundleサイズとページサイズを最大50%削減します。[バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md) および [ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md) を参照してください。

</Question>

<Question title="`i18next`、`next-intl`、`react-i18next` からコンポーネントを書き換えずに移行できますか？">

はい、2つの方法があります。[i18next移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md) または [next-intl移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-intl_to_intlayer.md) を使用して、コンテンツを段階的に移行できます。または、現在のAPIを完全に維持することもできます。[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md) は、`i18next`、`react-i18next`、`next-intl`、`next-i18next`、`react-intl`、`use-intl`、`vue-i18n`、`Lingui` とまったく同じAPIを公開しますが、Intlayer辞書によって提供されるため、インポートは変更されますが、コンポーネントコードは変更されません。

</Question>

<Question title="既存のJSON翻訳ファイルを維持できますか？">

はい。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md) は、`/messages/{locale}/{namespace}.json` ファイルを信頼できる情報源として保持し、それらからIntlayer辞書を双方向に生成します。[sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md) はgettextカタログに対しても同様の処理を行い、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md) を使用すると、1つのファイルにロケールをグループ化する代わりに、言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract` を実行すると、Intlayerはソースファイルを読み込み、ユーザー向けの文字列を抽出し、それぞれのファイルの隣に `.content` ファイルを書き込みます。これにより、文字列をカタログに1つずつコピーする代わりに、差分をレビューできます。[extractコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を参照してください。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) は、JSX、TSX、Vue、Svelteのソースに対してビルド時に同じ処理を行い、変更があるたびに辞書を生成するため、手動でキーを管理する必要はありません。これは静的解析によって機能するため、実行時にのみ存在する文字列は対象外となり、ユーザー向けのテキストとアプリケーションロジックを区別するためにいくつかの注釈が必要です。

</Question>

<Question title="利用可能なエディターとAIエージェントのツールは何ですか？">

5つのツールがあり、すべてオプションです。

- **[VS Code拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプしたり、コンポーネントからコンテンツを抽出したり、コマンドパレットまたは専用のIntlayerタブからビルド、フィル、テスト、プッシュ、プルを実行したりできます。
- **[LSPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSPをサポートする任意のエディターで同様の認識を提供し、定義へのジャンプ、すべての参照の検索、翻訳された値のホバープレビュー、キーとフィールドのオートコンプリート、およびキーがどこにも宣言されていない場合の警告機能があります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl` の呼び出しも解決するため、移行中に役立ちます。
- **[MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: IntlayerのドキュメントとCLIをCursor、VS Code、Claude Desktop、Claude Code、ChatGPTに公開するため、アシスタントは推測ではなく現在のドキュメントから回答し、`intlayer fill` などのコマンドを自分で実行できます。
- **[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content` などの特化されたスキルに加え、フレームワークごとのスキルがあり、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLintプラグイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text` はハードコードされた文字列を検出し、静的辞書キーと未使用のコンテンツに関する追加のルールを提供します。

</Question>

<Question title="ビジュアルエディターはどこで実行されますか？">

お客様自身のインフラストラクチャ上で実行されます。アプリケーションをiframe内にロードし、ローカルのエディターサーバーと通信するため、コンテンツがお客様の環境を離れることはありません。これにより、ホスト型サービスにコピーを送信できないプロジェクトでも利用できます。

</Question>

<Question title="エディターはコードの知識が必要ですか？">

いいえ。彼らはサイトを開き、テキストの一部をクリックしてその場で編集します。エディターは、そのテキストを裏付ける辞書エントリを解決し、適切なコンテンツファイルに変更を書き込むため、翻訳者はファイルを見つけたりキーを知る必要はありません。

</Question>

<Question title="ビジュアルエディターでの編集はソースファイルを変更しますか？">

はい、それが意図するところです。変更はコードベース内のコンテンツ宣言ファイルに反映されるため、通常の差分としてレビューおよびコミットでき、アプリケーションはそれを表示するために再ビルドされます。

</Question>

<Question title="エディターが空白ページを表示したり、サイトの読み込みを拒否したりします。何を確認すべきですか？">

エディターはアプリケーションをiframe内に表示するため、Content Security Policyでエディターのオリジンを `frame-ancestors` として許可する必要があります。デフォルトでは `http://localhost:8000` です。また、エディター設定の `applicationURL` が、実際にアプリが提供されているURLと一致していることを確認してください。エディターのコンソールは両方の失敗を報告します。

</Question>

<Question title="ビジュアルエディターを本番環境で使用できますか？">

これは開発環境およびステージング環境向けに設計されており、編集後の再ビルドが許容される場合に適しています。デプロイメントなしでライブサイトのコンテンツを編集するには、代わりに[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) とそのリモート辞書を使用してください。

</Question>

<Question title="ビジュアルエディターは無料ですか？">

はい。ビジュアルエディターはオープンソースプロジェクトの一部であり、Apache 2.0ライセンスの下で提供され、商用利用も含まれます。ホスト型[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) のみが有料サービスであり、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md) することも可能です。

</Question>

</FAQ>
