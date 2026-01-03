---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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
  - version: 6.0.1
    date: 2025-09-22
    changes: ライブ同期のドキュメントを追加
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` フィールドを `liveSync` に置き換え
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴を初期化
---

# Intlayer コンテンツ管理システム（CMS）ドキュメント

<iframe title="あなたのWebアプリのためのビジュアルエディター + CMS: Intlayerの説明" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMSは、Intlayerプロジェクトのコンテンツを外部化できるアプリケーションです。

そのために、Intlayerは「遠隔辞書（distant dictionaries）」の概念を導入しています。

![Intlayer CMS インターフェース](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

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

Intlayerの設定ファイル内で、CMSの設定をカスタマイズできます：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 他の設定
  editor: {
    /**
     * 必須
     *
     * アプリケーションのURL。
     * これはビジュアルエディタが対象とするURLです。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必須
     *
     * エディタを有効にするには、クライアントIDとクライアントシークレットが必要です。
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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
     * エディターを有効にするには、クライアントIDとクライアントシークレットが必要です。
     * これらはコンテンツを編集しているユーザーを識別するために使用されます。
     * Intlayerダッシュボードのプロジェクトページ（https://app.intlayer.org/projects）で新しいクライアントを作成することで取得できます。
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
     * Intlayer CMSのURLです。
     * デフォルトでは https://back.intlayer.org に設定されています。
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> クライアントIDとクライアントシークレットをお持ちでない場合は、[Intlayerダッシュボード - プロジェクト](https://app.intlayer.org/projects)で新しいクライアントを作成して取得できます。

> 利用可能なすべてのパラメータについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

## CMSの使用方法

### 設定のプッシュ

Intlayer CMSを設定するには、[intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ja/intlayer_cli.md)コマンドを使用できます。

```bash
npx intlayer config push
```

> `intlayer.config.ts`設定ファイルで環境変数を使用している場合は、`--env`引数を使って希望の環境を指定できます：

```bash
npx intlayer config push --env production
```

このコマンドは設定をIntlayer CMSにアップロードします。

### 辞書をプッシュする

ロケール辞書をリモート辞書に変換するには、[intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ja/intlayer_cli.md)コマンドを使用できます。

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> `intlayer.config.ts` 設定ファイルで環境変数を使用している場合は、`--env` 引数を使って希望の環境を指定できます。

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

このコマンドは初期コンテンツの辞書をアップロードし、Intlayer プラットフォームを通じて非同期に取得および編集できるようにします。

### 辞書の編集

その後、[Intlayer CMS](https://app.intlayer.org/content) で辞書を確認および管理できるようになります。

## ライブ同期

ライブ同期は、アプリが実行時に CMS のコンテンツ変更を反映できるようにします。再ビルドや再デプロイは不要です。有効にすると、更新がライブ同期サーバーにストリームされ、アプリケーションが読み込む辞書が更新されます。

> Live Syncは継続的なサーバー接続を必要とし、エンタープライズプランで利用可能です。

Intlayerの設定を更新してLive Syncを有効にします：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定
  editor: {
    /**
     * 変更が検出されたときにロケール設定のホットリロードを有効にします。
     * 例えば、辞書が追加または更新された場合、アプリケーションは
     * ページに表示されるコンテンツを更新します。
     *
     * ホットリロードは継続的なサーバー接続を必要とするため、
     * `enterprise`プランのクライアントのみ利用可能です。
     *
     * デフォルト: false
     */
    liveSync: true,
  },
  build: {
    /**
     * 辞書のインポート方法を制御します：
     *
     * - "live"：辞書はLive Sync APIを使用して動的に取得されます。
     *   useIntlayerの代わりにuseDictionaryDynamicを使用します。
     *
     * 注意：ライブモードはLive Sync APIを使用して辞書を取得します。API呼び出しが
     * 失敗した場合、辞書は動的にインポートされます。
     * 注意：リモートコンテンツかつ"live"フラグが付いた辞書のみがライブモードを使用します。
     * その他はパフォーマンスのために動的モードを使用します。
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... その他の設定
  editor: {
    /**
     * ロケール設定の変更が検出されたときにホットリロードを有効にします。
     * 例えば、辞書が追加または更新された場合、アプリケーションは
     * ページに表示されるコンテンツを更新します。
     *
     * ホットリロードはサーバーへの継続的な接続を必要とするため、
     * `enterprise` プランのクライアントのみ利用可能です。
     *
     * デフォルト: false
     */
    liveSync: true,
  },
  build: {
    /**
     * 辞書のインポート方法を制御します：
     *
     * - "live": Live Sync APIを使用して辞書を動的に取得します。
     *   useIntlayerをuseDictionaryDynamicに置き換えます。
     *
     * 注意: ライブモードはLive Sync APIを使用して辞書を取得します。API呼び出しが
     * 失敗した場合、辞書は動的にインポートされます。
     * 注意: リモートコンテンツを持ち、かつ "live" フラグが設定された辞書のみがライブモードを使用します。
     * その他の辞書はパフォーマンスのためにダイナミックモードを使用します。
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... その他の設定
  editor: {
    /**
     * 変更が検出された際にロケール設定のホットリロードを有効にします。
     * 例えば、辞書が追加または更新された場合、アプリケーションは
     * ページに表示されるコンテンツを更新します。
     *
     * ホットリロードはサーバーへの継続的な接続を必要とするため、
     * `enterprise` プランのクライアントのみ利用可能です。
     *
     * デフォルト: false
     */
    liveSync: true,

    /**
     * Live Syncサーバーのポート番号。
     *
     * デフォルト: 4000
     */
    liveSyncPort: 4000,

    /**
     * Live SyncサーバーのURL。
     *
     * デフォルト: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * 辞書のインポート方法を制御します：
     *
     * - "live": Live Sync APIを使用して辞書を動的に取得します。
     *   useIntlayerをuseDictionaryDynamicに置き換えます。
     *
     * 注意: ライブモードはLive Sync APIを使用して辞書を取得します。API呼び出しが失敗した場合、
     * 辞書は動的にインポートされます。
     * 注意: リモートコンテンツかつ"live"フラグが付いた辞書のみがライブモードを使用します。
     * その他はパフォーマンスのために動的モードを使用します。
     */
    importMode: "live",
  },
};

module.exports = config;
```

アプリケーションをラップするために Live Sync サーバーを起動します：

Next.js を使用した例：

```json5 fileName="package.json"
{
  "scripts": {
    // ... その他のスクリプト
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Vite を使用した例：

```json5 fileName="package.json"
{
  "scripts": {
    // ... その他のスクリプト
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Live Sync サーバーはあなたのアプリケーションをラップし、更新されたコンテンツが到着すると自動的に適用します。

CMSからの変更通知を受け取るために、Live SyncサーバーはバックエンドとのSSE接続を維持します。CMSのコンテンツが変更されると、バックエンドは更新情報をLive Syncサーバーに転送し、新しい辞書を書き込みます。アプリケーションは次のナビゲーションまたはブラウザのリロード時に更新を反映し、再ビルドは不要です。

フローチャート（CMS/バックエンド -> Live Syncサーバー -> アプリケーションサーバー -> フロントエンド）:

![Live Sync ロジックスキーマ](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

動作の仕組み:

![Live Sync フロー CMS/バックエンド/Live Syncサーバー/アプリケーションサーバー/フロントエンド スキーマ](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### 開発ワークフロー（ローカル）

- 開発中は、アプリケーション起動時にすべてのリモート辞書が取得されるため、更新をすばやくテストできます。
- Next.jsでローカルにLive Syncをテストするには、開発サーバーをラップします：

```json5 fileName="package.json"
{
  "scripts": {
    // ... 他のスクリプト
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Vite用
  },
}
```

開発中にIntlayerがLiveインポート変換を適用するように最適化を有効にします：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

この設定により、開発サーバーがLive Syncサーバーでラップされ、起動時にリモート辞書を取得し、CMSからの更新をSSE経由でストリーミングします。変更を確認するにはページをリロードしてください。

注意事項と制約：

- Live Sync のオリジンをサイトのセキュリティポリシー（CSP）に追加してください。Live Sync の URL が `connect-src`（および該当する場合は `frame-ancestors`）で許可されていることを確認してください。
- Live Sync は静的出力では動作しません。Next.js の場合、ページはランタイムで更新を受け取るために動的である必要があります（例：完全な静的のみの制約を避けるために、`generateStaticParams`、`generateMetadata`、`getServerSideProps`、または `getStaticProps` を適切に使用してください）。
- CMSでは、各辞書に`live`フラグがあります。`live=true`の辞書のみがライブ同期APIを通じて取得され、それ以外は動的にインポートされ、実行時には変更されません。
- `live`フラグはビルド時に各辞書ごとに評価されます。ビルド時にリモートコンテンツが`live=true`に設定されていなかった場合、その辞書のライブ同期を有効にするには再ビルドが必要です。
- ライブ同期サーバーは`.intlayer`に書き込み可能でなければなりません。コンテナ環境では`/.intlayer`への書き込み権限を確保してください。

## デバッグ

CMSで問題が発生した場合は、以下を確認してください：

- アプリケーションが稼働していること。

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration)の設定がIntlayerの設定ファイルで正しく行われていること。
  - 必須フィールド：
- アプリケーションのURLは、エディター設定の `applicationURL` と一致している必要があります。
- CMSのURL

- プロジェクトの設定がIntlayer CMSにプッシュされていることを確認してください。

- ビジュアルエディターはiframeを使用してウェブサイトを表示します。ウェブサイトのコンテンツセキュリティポリシー（CSP）がCMSのURLを `frame-ancestors`（デフォルトは 'https://intlayer.org'）として許可していることを確認してください。エディターのコンソールでエラーがないか確認してください。
