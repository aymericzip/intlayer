---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: ライブ同期 | CMSコンテンツの変更をリアルタイムに反映
description: リビルドや再デプロイなしで、Intlayer CMS のコンテンツ変更をアプリにリアルタイムで反映させます。
keywords:
  - ライブ同期
  - Live Sync
  - CMS
  - ビジュアルエディタ
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Intlayer CMS ドキュメントから独立したページに移動"
  - version: 6.0.1
    date: 2025-09-22
    changes: "ライブ同期のドキュメントを追加"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` フィールドを `liveSync` に置き換え"
author: aymericzip
---

# ライブ同期

ライブ同期は、アプリが実行時に CMS のコンテンツ変更を反映できるようにします。再ビルドや再デプロイは不要です。有効にすると、更新がライブ同期サーバーにストリームされ、アプリケーションが読み込む辞書が更新されます。

## 目次

<TOC/>

---

Intlayerの設定を更新してLive Syncを有効にします：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
    /**
     * 辞書のインポート方法を制御します：
     *
     * - "fetch"：辞書はLive Sync APIを使用して動的に取得されます。
     *   useIntlayerの代わりにuseDictionaryDynamicを使用します。
     *
     * 注意：ライブモードはLive Sync APIを使用して辞書を取得します。API呼び出しが
     * 失敗した場合、辞書は動的にインポートされます。
     * 注意：リモートコンテンツかつ"live"フラグが付いた辞書のみがライブモードを使用します。
     * その他はパフォーマンスのために動的モードを使用します。
     */
    importMode: "fetch",
  },
};

export default config;
```

アプリケーションをラップするために Live Sync サーバーを起動します：

スタンドアロンサーバーを使用した例：

```json5 fileName="package.json"
{
  "scripts": {
    // ... その他のスクリプト
    "live:start": "npx intlayer live",
  },
}
```

`--process` 引数を使用して、アプリケーションサーバーと並行して使用することもできます。

Next.js を使用した例：

```json5 fileName="package.json"
{
  "scripts": {
    // ... その他のスクリプト
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Live Sync サーバーはあなたのアプリケーションをラップし、更新されたコンテンツが到着すると自動的に適用します。

CMSからの変更通知を受け取るために、Live SyncサーバーはバックエンドとのSSE接続を維持します。CMSのコンテンツが変更されると、バックエンドは更新情報をLive Syncサーバーに転送し、新しい辞書を書き込みます。アプリケーションは次のナビゲーションまたはブラウザのリロード時に更新を反映し、再ビルドは不要です。

フローチャート（CMS/バックエンド -> Live Syncサーバー -> アプリケーションサーバー -> フロントエンド）:

![Live Sync フロー CMS/バックエンド/Live Syncサーバー/アプリケーションサーバー/フロントエンド スキーマ](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

動作の仕組み:

![Live Sync ロジックスキーマ](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

## 開発ワークフロー（ローカル）

- 開発中は、アプリケーション起動時にすべてのリモート辞書が取得されるため、更新をすばやくテストできます。
- Next.jsでローカルにLive Syncをテストするには、開発サーバーをラップします：

```json5 fileName="package.json"
{
  "scripts": {
    // ... 他のスクリプト
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Vite用
  },
}
```

開発中にIntlayerがLiveインポート変換を適用するように最適化を有効にします：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true, // default: process.env.NODE_ENV === 'production'
  },
};

export default config;
```

この設定により、開発サーバーがLive Syncサーバーでラップされ、起動時にリモート辞書を取得し、CMSからの更新をSSE経由でストリーミングします。変更を確認するにはページをリロードしてください。

注意事項と制約：

- Live Sync のオリジンをサイトのセキュリティポリシー（CSP）に追加してください。Live Sync の URL が `connect-src`（および該当する場合は `frame-ancestors`）で許可されていることを確認してください。
- Live Sync は静的出力では動作しません。Next.js の場合、ページはランタイムで更新を受け取るために動的である必要があります（例：完全な静的のみの制約を避けるために、`generateStaticParams`、`generateMetadata`、`getServerSideProps`、または `getStaticProps` を適切に使用してください）。
- CMSでは、各辞書に`live`フラグがあります。`live=true`の辞書のみがライブ同期APIを通じて取得され、それ以外は動的にインポートされ、実行時には変更されません。
- `live`フラグはビルド時に各辞書ごとに評価されます。ビルド時にリモートコンテンツが`live=true`に設定されていなかった場合、その辞書のライブ同期を有効にするには再ビルドが必要です。
- ライブ同期サーバーは`.intlayer`に書き込み可能でなければなりません。コンテナ環境では`/.intlayer`への書き込み権限を確保してください。

## 役立つリンク

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)
- [Intlayer ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)
- [設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [セルフホスティングガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)
