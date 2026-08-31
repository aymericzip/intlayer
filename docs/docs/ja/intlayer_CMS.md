---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: Intlayer CMS | コンテンツをIntlayer CMSに外部化する
description: コンテンツ管理をチームに委任するために、コンテンツをIntlayer CMSに外部化します。
keywords:
  - CMS
  - ビジュアルエディター
  - 国際化
  - ドキュメンテーション
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "「ライブ同期」セクションを専用ページ（live-sync.md）に移動し、ここには簡単な紹介とリンクのみを残した"
  - version: 9.0.0
    date: 2026-06-30
    changes: "「セルフホスティング」セクションを追加: Docker Composeブートストラップ、サービスインベントリ、SDK設定、オプション機能、アップグレードノート"
  - version: 9.0.0
    date: 2026-06-29
    changes: "プログラムによるCMSアクセスに関する @intlayer/api SDK (createIntlayerCMS) セクションを追加"
  - version: 6.0.1
    date: 2025-09-22
    changes: "ライブ同期のドキュメントを追加"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` フィールドを `liveSync` に置き換え"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴を初期化"
author: aymericzip
---

# Intlayer コンテンツ管理システム（CMS）ドキュメント

<iframe title="あなたのWebアプリのためのビジュアルエディター + CMS: Intlayerの説明" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMSは、Intlayerプロジェクトのコンテンツを外部化できるアプリケーションです。

そのために、Intlayerは「遠隔辞書（distant dictionaries）」の概念を導入しています。

![Intlayer CMS インターフェース](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## 目次

<TOC/>

---

## 遠隔辞書の理解

Intlayerは「ローカル辞書」と「遠隔辞書」を区別しています。

- 「ローカル」辞書とは、Intlayerプロジェクト内で宣言されている辞書のことです。例えば、ボタンの宣言ファイルやナビゲーションバーなどです。この場合、コンテンツは頻繁に変更されることを想定していないため、コンテンツを外部化することは意味がありません。

- 「遠隔」辞書とは、Intlayer CMSを通じて管理される辞書のことです。これは、チームがウェブサイト上で直接コンテンツを管理できるようにするために役立ち、さらにA/Bテスト機能やSEOの自動最適化を利用することも目的としています。

## ビジュアルエディターとCMSの違い

[Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) エディターは、ローカル辞書のコンテンツをビジュアルエディターで管理できるツールです。変更が行われると、コンテンツはコードベースに置き換えられます。つまり、アプリケーションが再ビルドされ、ページがリロードされて新しいコンテンツが表示されることを意味します。

これに対して、Intlayer CMSは、遠隔辞書のコンテンツをビジュアルエディターで管理できるツールです。変更が行われても、コンテンツはコードベースに影響を与えません。そして、ウェブサイトは自動的に変更されたコンテンツを表示します。

## 統合

パッケージのインストール方法の詳細については、以下の該当セクションを参照してください。

### Next.jsとの統合

Next.jsとの統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

### Create React Appとの統合

Create React Appとの統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)を参照してください。

### Vite + Reactとの統合

Vite + Reactとの統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)を参照してください。

## 設定

Intlayer CMSにログインするには、次のコマンドを実行してください：

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

これにより、デフォルトのブラウザが開き、認証プロセスを完了し、Intlayerサービスを使用するために必要な認証情報（Client IDとClient Secret）を受け取ることができます。

Intlayerの設定ファイル内で、CMSの設定をカスタマイズできます：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定
  editor: {
    /**
     * 必須
     *
     * アプリケーションのURL。
     * これはビジュアルエディターがターゲットとするURLです。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必須
     *
     * エディターを有効にするためにクライアントIDとクライアントシークレットが必要です。
     * これらはコンテンツを編集しているユーザーを識別するために使用されます。
     * Intlayerダッシュボードのプロジェクト（https://app.intlayer.org/projects）で新しいクライアントを作成することで取得できます。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 任意
     *
     * Intlayer CMSをセルフホスティングしている場合、CMSのURLを設定できます。
     *
     * Intlayer CMSのURL。
     * デフォルトでは https://intlayer.org に設定されています。
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * オプション
     *
     * Intlayer CMSをセルフホスティングしている場合、バックエンドのURLを設定できます。
     *
     * Intlayer CMSのURL。
     * デフォルトでは https://back.intlayer.org に設定されています。
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

> クライアントIDとクライアントシークレットをお持ちでない場合は、[Intlayerダッシュボード - プロジェクト](https://app.intlayer.org/projects)で新しいクライアントを作成して取得できます。

> 利用可能なすべてのパラメータについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

## CMSの使用方法

### 設定のプッシュ

Intlayer CMSを設定するには、[intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ja/cli/index.md)コマンドを使用できます。

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> `intlayer.config.ts`設定ファイルで環境変数を使用している場合は、`--env`引数を使って希望の環境を指定できます：

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

このコマンドは設定をIntlayer CMSにアップロードします。

### 辞書をプッシュする

ロケール辞書をリモート辞書に変換するには、[intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ja/cli/index.md)コマンドを使用できます。

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> `intlayer.config.ts` 設定ファイルで環境変数を使用している場合は、`--env` 引数を使って希望の環境を指定できます。

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

このコマンドは初期コンテンツの辞書をアップロードし、Intlayer プラットフォームを通じて非同期に取得および編集できるようにします。

### 辞書の編集

その後、[Intlayer CMS](https://app.intlayer.org/content) で辞書を確認および管理できるようになります。

## `@intlayer/api` SDK を使用したプログラムによるアクセス

CLI およびビジュアルエディターを超えて、Intlayer は [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api) パッケージで型付き SDK を提供しています。これにより、CMS を**ヘッドレスコンテンツデータベース**として扱うことができます。プロジェクトの取得、辞書の取得、および独自のアプリケーション、スクリプト、または CI パイプラインから直接、それらをプッシュまたは更新できます。

SDK は認証を処理します。`clientId` と `clientSecret` が利用可能であれば（Intlayer の設定または環境変数で）、OAuth2 アクセストークンを自動的に取得および更新し、すべてのリクエストに署名します。

### インストール

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### 仕組み: オーセンティケーター + エンドポイント

SDK は、バンドルサイズを小さくするために、意図的に**2つの別々のインポート**に分割されています。

1.  `createIntlayerCMS` — 軽量な**オーセンティケーター**を作成します。これは認証情報と管理されたアクセストークンのみを保持し、特定のドメインについては何も知りません。
2.  `dictionaryEndpoint`、`projectEndpoint`、… — ドメインごとの**エンドポイントバインダー**で、それぞれ独自のサブパス（`@intlayer/api/dictionary`、`@intlayer/api/project`、…）からインポートされます。必要なエンドポイントにオーセンティケーターを渡します。

各エンドポイントは個別にインポートされるため、バンドルには実際に使用するドメインのみが含まれます。`dictionaryEndpoint` をインポートしても、プロジェクト、AI、その他のドメインクライアントがプルインされることはありません。

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// 設定はオプションです: 省略した場合、認証情報は
// `@intlayer/config/built` から読み込まれます。これは INTLAYER_CLIENT_ID および
// INTLAYER_CLIENT_SECRET 環境変数を解決します。
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> CMS の認証情報 (`clientId` / `clientSecret`) はコンテンツへの**書き込みアクセス**を許可します。オーセンティケーターは**サーバー側**（サーバーアクション、ルートハンドラー、スクリプト、CI）でのみ作成してください。クライアント側コードにインポートしたり、認証情報をブラウザに公開したりしないでください。

ビルド時の設定に依存しない場合は、認証情報を明示的に渡します。

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // オプション、セルフホスティングされたバックエンドの場合:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> 認証情報は、[Intlayer Dashboard - Projects](https://app.intlayer.org/projects) で新しいアクセスキーを作成して取得できます。

### プロジェクトの取得

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// 認証情報でアクセス可能なプロジェクトをリストアップ
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// 選択したプロジェクトの集約されたローカライゼーションインサイトを読み取る
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### 辞書の取得

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// プロジェクトのすべてのリモート辞書をリストアップ
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// またはキーで単一の辞書を取得
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### 辞書のプッシュと更新

CMS をデータベースとして使用してコンテンツを書き戻します。

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// 新しい辞書を作成
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// 辞書の一括Upsert (1回の呼び出しで作成または更新)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// 既存の辞書を更新
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> ヒント: 繰り返しを避けるためにバインドされたエンドポイントを再利用します。
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### 単一メソッドの抽出

すべてのエンドポイントメソッドはすでに認証されており、スタンドアロンであるため（独自のトークン処理を保持しているため）、1つを抽出して渡すことができます。例えば、依存関係として注入する場合などです。

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// すでに認証済み — 呼び出しごとに自動的にトークンを更新します
export const pushDictionaries = dictionary.pushDictionaries;

// 使用方法
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## ライブ同期

ライブ同期は、アプリが実行時に CMS のコンテンツ変更を反映できるようにします。再ビルドや再デプロイは不要です。有効にすると、更新がライブ同期サーバーにストリームされ、アプリケーションが読み込む辞書が更新されます。

設定方法、Live Sync サーバーの起動、ローカル開発ワークフロー、制約事項などの完全なガイドは、[Live Sync ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/live-sync.md)を参照してください。

## セルフホスティング

Intlayer は、独自のインフラストラクチャ上で完全に実行できます。Docker Compose を使用して、フルスタック（ダッシュボード、API、データベース、オブジェクトストレージ、メール）を1行でブートストラップできます。

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

完全なセットアップガイド、環境変数リファレンス、アップグレード手順、バックアップ/復元手順については、[セルフホスティングガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)を参照してください。

---

## デバッグ

CMSで問題が発生した場合は、以下を確認してください：

- アプリケーションが稼働していること。

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration)の設定がIntlayerの設定ファイルで正しく行われていること。
  - 必須フィールド：
    - アプリケーションのURLは、エディター設定の `applicationURL` と一致している必要があります。
    - CMSのURL

- プロジェクトの設定がIntlayer CMSにプッシュされていることを確認してください。

- ビジュアルエディターはiframeを使用してウェブサイトを表示します。ウェブサイトのコンテンツセキュリティポリシー（CSP）がCMSのURLを `frame-ancestors`（デフォルトは 'https://app.intlayer.org'）として許可していることを確認してください。エディターのコンソールでエラーがないか確認してください。

## よくある質問

<FAQ>

<Question title="Intlayer CMS とビジュアルエディターの違いは何ですか？">

[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) はローカル辞書を編集し、その変更をコードベースに書き戻します。これにより、アプリが再ビルドされ、通常のレビューとデプロイのプロセスを経て変更が適用されます。CMS はリモート辞書を編集します。変更はコードベースに触れず、実行中のサイトはデプロイなしで変更を反映します。チームはしばしば両方を使用します。開発者が所有するコンテンツにはエディターを、マーケティングが毎週変更するコンテンツには CMS を使用します。

</Question>

<Question title="i18n は bundle サイズにどれくらい影響しますか？">

名前空間ベースのセットアップよりもはるかに少ないです。なぜなら、ページはレンダリングしないカタログをダウンロードすることがないからです。サーバーレンダリングされたマークアップはサーバー上でコンテンツを解決し、ビルド時コンパイラは `useIntlayer` の呼び出しをコンポーネントが使用する正確な辞書エントリに置き換えるため、未使用のキーや未使用の言語は削除されます。[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md) は残りをロケールごとに分割します。一般的な代替手段と比較して、Intlayer は bundle およびページサイズを最大 50% 削減します。[bundle 最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md) および [ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md) を参照してください。

</Question>

<Question title="コンポーネントを書き直すことなく、`i18next`、`next-intl`、`react-i18next` から移行できますか？">

はい、2つの方法があります。[i18next 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md) または [next-intl 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-intl_to_intlayer.md) を使用して、コンテンツを段階的に移行できます。または、現在の API を完全に維持することもできます。[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md) は、`i18next`、`react-i18next`、`next-intl`、`next-i18next`、`react-intl`、`use-intl`、`vue-i18n`、および `Lingui` とまったく同じ API を公開しますが、Intlayer 辞書によって提供されるため、import は変更されますが、コンポーネントコードは変更されません。

</Question>

<Question title="既存の JSON 翻訳ファイルを維持できますか？">

はい。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md) は、`/messages/{locale}/{namespace}.json` ファイルを信頼できる情報源として保持し、それらから Intlayer 辞書を双方向に生成します。[sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md) は gettext カタログに対しても同様の機能を提供し、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md) を使用すると、1つのファイルにロケールをグループ化する代わりに、言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract` を実行すると、Intlayer はソースファイルを読み込み、ユーザー向けの文字列を抽出し、それぞれのファイルの隣に `.content` ファイルを書き込みます。これにより、文字列をカタログに1つずつコピーする代わりに、差分を確認できます。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を参照してください。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) は、JSX、TSX、Vue、および Svelte のソースに対してビルド時に同じ処理を行い、変更があるたびに辞書を生成するため、手動でキーを管理する必要がありません。これは静的解析によって機能するため、実行時にのみ存在する文字列は対象外となり、ユーザー向けのテキストとアプリケーションロジックを区別するためにいくつかの注釈が必要です。

</Question>

<Question title="利用可能なエディターおよび AI エージェントツールは何ですか？">

5つのツールがあり、すべてオプションです。

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer` キーからそれを宣言するコンテンツファイルにジャンプしたり、コンポーネントからコンテンツを抽出したり、コマンドパレットまたは専用の Intlayer タブから build、fill、test、push、pull を実行したりできます。
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSP をサポートする任意のエディターで同様の機能を提供します。定義へのジャンプ、すべての参照の検索、翻訳された値のホバープレビュー、キーとフィールドのオートコンプリート、およびキーがどこにも宣言されていない場合の警告が含まれます。また、`i18next`、`react-i18next`、`next-intl`、`use-intl` の呼び出しも解決するため、移行中に役立ちます。
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: Intlayer のドキュメントと CLI を Cursor、VS Code、Claude Desktop、Claude Code、ChatGPT に公開します。これにより、アシスタントは推測ではなく最新のドキュメントから回答し、`intlayer fill` などのコマンドを自身で実行できます。
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content` などの特化したスキルに加え、フレームワークごとのスキルがあり、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text` はハードコードされた文字列にフラグを立て、静的辞書キーや未使用のコンテンツに対する追加のルールも提供します。

</Question>

<Question title="どのコンテンツを CMS に移動すべきですか？">

頻繁に変更され、リリースに属さないコンテンツ、例えばランディングページのコピー、価格設定の文言、お知らせ、マーケティングチームが所有するあらゆるものなどです。ボタンのラベルやフォームのエラーなど、インターフェースの一部であるコンテンツは、それを使用するコードと一緒にレビューされるローカル辞書として残しておく方が良いでしょう。

</Question>

<Question title="CMS にアクセスできない場合、どうなりますか？">

アプリケーションは辞書のローカル宣言にフォールバックするため、ネットワーク障害や停止が発生しても、空のページではなく、ビルドに含まれるコンテンツに切り替わります。これが、すべてのリモート辞書に対してローカル宣言を保持することが重要である理由です。

</Question>

<Question title="CMS をセルフホストできますか？">

はい。CMS は独自のインフラストラクチャで実行できます。これは、コンテンツがネットワーク外に出るべきではない場合の一般的な解決策です。[Intlayer のセルフホスティング](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md) を参照してください。

</Question>

<Question title="コンテンツ編集者は変更を公開するために開発者を必要としますか？">

いいえ。それがリモート辞書の利点です。編集者が CMS でテキストを変更すると、サイトにそれが反映され、[ライブ同期](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/live.md) によってビルドを待つことなく実行時に更新が適用されます。

</Question>

<Question title="インターフェースを使用する代わりに CMS を自動化できますか？">

はい。`@intlayer/api` SDK はインターフェースと同じエンドポイントを公開しているため、スクリプトやパイプラインからプロジェクトの取得、辞書の読み取り、更新のプッシュが可能です。上記のセクションでは、認証機能とエンドポイントについて説明しています。

</Question>

<Question title="CMS は A/B テスト翻訳をサポートしていますか？">

はい。リモート辞書は [コンテンツバリアント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/variants.md) をサポートしており、[アナリティクス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/analytics.md) は各バリアントがどのように公開されているかを報告するため、文言の変更について議論するのではなく、測定することができます。

</Question>

<Question title="CMS は無料ですか？">

Intlayer ライブラリ、CLI、コンパイラ、およびビジュアルエディターは、Apache 2.0 license の下で無料かつオープンソースです。ホスト型 CMS はオプションの有料サービスであり、代わりに [セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md) することも可能です。

</Question>

</FAQ>
