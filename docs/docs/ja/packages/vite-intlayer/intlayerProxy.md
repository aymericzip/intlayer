---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerProxy Viteプラグインドキュメント | vite-intlayer
description: Viteの開発/プレビューサーバーおよび本番SSR用の言語ルーティングミドルウェア。言語検出、URLリダイレクト、および内部書き換えを処理します。
keywords:
  - intlayerProxy
  - vite
  - プラグイン
  - ミドルウェア
  - 言語
  - ルーティング
  - 国際化
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "configOptionsを単一のoptionsオブジェクトにマージ。proxyをintlayer()にバンドル"
author: aymericzip
---

# intlayerProxy

`intlayerProxy`は、開発サーバー、プレビューサーバー、および本番SSR（Nitro / TanStack Start）の**すべての環境**に対応する言語ルーティングミドルウェアを登録するViteプラグインです。

> **Intlayer v9以降**、`intlayerProxy`は自動的にメインの[`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayer.md)プラグインに含まれ、`routing.enableProxy: true`を介してデフォルトで有効になります。より低レベルな制御が必要な場合や、標準の`intlayer()`セットアップ以外で使用する場合にのみ、個別に登録する必要があります。

## 使用方法

### `intlayer()`の一部として（推奨、v9+）

`intlayerProxy`を個別に登録する代わりに、メインプラグインに`proxy`オプションを渡します：

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### スタンドアロン（必要な場合）

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## オプション

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

すべてのオプションは任意であり、単一のオブジェクトとして渡されます：

| オプション      | 型                                  | 説明                                                                                                                                                         |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ignore`        | `(req: IncomingMessage) => boolean` | リクエストを言語ルーティングから除外する述語。リクエストをスキップするには`true`を返します（例：APIルート、ヘルスチェック）。                                |
| `configOptions` | `GetConfigurationOptions`           | `getConfiguration()`に転送されるIntlayer設定のオーバーライド。プロキシに特定の設定ファイルを読み込ませたり、値を上書きしたりする必要がある場合に使用します。 |

### 例

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler`は、すべての言語ルーティングロジックを含む、特定のフレームワークに依存しないNode.jsの`(req, res, next)`スタンドアロンミドルウェアを作成します。ViteプラグインAPIが使用できない環境（例：純粋なNode.jsサーバーやカスタムNitroモジュール）で有用です。

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### 本番SSR（TanStack Start / h3を介した Nitro）

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## ルーティングの動作

ミドルウェアは、`next-intlayer`ミドルウェアのルーティングロジックを反映しており、すべてのIntlayerルーティングモードをサポートしています。

### ルーティングモード

| モード          | ブラウザに表示されるURL  | 動作                                                                                                                                |
| --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/ja/about`              | デフォルト。URLの言語プレフィックス。`prefix-all`が有効でない限り、デフォルト言語はプレフィックスなしのURLにリダイレクトします。    |
| `prefix-all`    | `/en/about`, `/ja/about` | デフォルト言語を含むすべての言語が常にプレフィックス付きになります。                                                                |
| `no-prefix`     | `/about`                 | URLに言語は含まれません。言語はCookieにのみ保存され、内部的にURLの書き換えが行われます。                                            |
| `search-params` | `/about?locale=ja`       | クエリパラメータとして渡される言語。パラメータがない、または古い場合に、`locale`パラメータを追加/更新するためにリダイレクトします。 |

### 検出の優先順位

1. URLパスのプレフィックス（例：`/ja/about` → `ja`）。
2. Cookie / localStorageの値（`intlayer-locale`）。
3. `Accept-Language`ヘッダー。
4. 設定ファイル内の`defaultLocale`。

### 自動バイパス

ミドルウェアは、言語処理を行うことなく、常に以下のリクエストをそのまま通します：

- `ignore`述語に一致するリクエスト。
- `/node_modules/**`
- `/@**` – Viteの内部処理（`@vite/`、`@fs/`、`@id/`など）。
- `/_**` – サーバーの内部処理（`__vite_ping`、`__manifest`など）。
- パスがファイル拡張子で終わるリクエスト（静的アセット）。静的アセットのパスに言語プレフィックスが存在する場合（例：`/ja/logo.png`）、ファイルが正しく提供されるようにプレフィックスが削除されます。

### ドメインルーティング

Intlayer設定で`routing.domains`が構成されている場合、ミドルウェアはドメインをまたぐ言語ルーティングを処理します：

- `domains.zh = "intlayer.zh"`のとき、`intlayer.org`上の`/zh/about`に対するリクエストは`https://intlayer.zh/about`にリダイレクトされます。
- `intlayer.zh/about`へのリクエストは、`[locale]`ルートパラメータが入力されるように、内部的に`/zh/about`に書き換えられます。

### リダイレクトループ防止

ミドルウェアは、2秒のスライディングウィンドウ内で、`originalUrl → newUrl`のペアごとのリクエストに対するリダイレクト回数を追跡します。ウィンドウ内で10回を超えるリダイレクトが発生した場合、無限ループに陥るのを防ぐために、説明的なエラーを含む`500`応答を返します。

## Nitro / 本番SSR（自動注入、v9+）

`intlayerProxy`がViteプラグインとして使用される場合、`.nitro`プロパティを保持します。`nitro/vite`ビルドプラグインはこのプロパティを読み取り、`nitroConfig.modules`にプッシュします。これにより、`intlayerNitroHandler`が自動的にNitroサーバーミドルウェアとして登録されます。本番SSRのための手動設定は不要です。

Nitroハンドラーは、h3 v2のWeb Fetch APIイベントモデルを使用しているため（`fromNodeMiddleware`ではない）、Node、Bun、Deno、エッジランタイムなど、すべてのNitroプリセットと互換性があります。

## 非推奨のエイリアス

| 非推奨のシグネチャ         | 代替品          |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
