---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite プラグイン ドキュメント | vite-intlayer
description: vite-intlayer パッケージの intlayer プラグインの使い方を確認します
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "ドキュメントの初期作成"
author: aymericzip
---

# intlayer Vite プラグイン ドキュメント

`intlayer` の Vite プラグインは、Intlayer の設定をビルドプロセスに統合します。辞書のエイリアスを管理し、開発モードでは辞書ウォッチャーを起動し、ビルドのために辞書を準備します。

## 使用方法

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
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` は `GetConfigurationOptions` (参照: `@intlayer/config`) を拡張し、以下の追加フィールドを含みます:

| オプション      | 型                              | デフォルト  | 説明                                                                                                                                    |
| --------------- | ------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | compat-adapterパッケージ(例: `@intlayer/react-i18next`)用の追加呼び出しパターン。ビルド時にfield-usage analyserに渡されます。           |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | バンドルされたlocale-routingプロキシに転送されるオプション。`ignore`を使用して特定のパス(例: APIルート)をlocale routingから除外します。 |

その他すべてのオプション(`override`、`configFile`など)は `getConfiguration()` に直接転送されます。

### 例

#### ロケール ルーティングから API ルートを除外する

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

#### カスタムコンフィグファイルパスを使用する場合

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### compat-adapter callers を使用する場合

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## プラグインが行うこと

### 1. Dictionary preparation

ビルドが開始される前に（そして開発環境では1時間ごとに）、`intlayer` は `prepareIntlayer` を呼び出して、すべての `.content.ts` ファイルを最適化された JSON 辞書にコンパイルし、`.intlayer/` に保存します。

### 2. モジュールエイリアス

プラグインはViteのresolveエイリアスを追加して、`import { myDict } from 'intlayer/dictionaries/my-dict'` がディスク上のコンパイルされたJSONファイルに解決されるようにします。SSRビルドは `ssr.noExternal` を使用して、すべての `@intlayer/*` パッケージがエイリアスを適用してバンドルされることを確認します。

### 3. Dev-server watcher

開発モードでは `chokidar` ウォッチャーが起動します。`.content.ts` ファイルが変更されると、辞書が再コンパイルされ、Vite の HMR がブラウザに更新を伝播します。

### 4. バンドルされたロケールルーティングプロキシ (v9+)

Intlayer v9 以降、`intlayerProxy` ミドルウェアは `intlayer()` 内に自動的に登録されます。以下の処理を担当します:

- URL プレフィックス、Cookie、および `Accept-Language` ヘッダーからのロケール検出。
- 検出されたロケールが現在の URL と一致しない場合の 301 リダイレクト。
- フレームワークが正しい `[locale]` ルートパラメータを認識するための内部 URL 書き換え。

プロキシは Intlayer 設定の `routing.enableProxy`（デフォルト `true`）で制御されます。完全に無効にするには:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

別の `intlayerProxy()` 呼び出しなしでプロキシの動作をカスタマイズするには、メインプラグインに `proxy` オプションを渡します:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

ルーティング動作の完全なリファレンスについては、[intlayerProxy ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayerProxy.md)を参照してください。

### 5. Bundled compiler (v9+)

`compiler.enabled` が `true` **かつ** `compiler.output` が Intlayer config で設定されている場合、`intlayer()` は `intlayerCompiler` を自動的に登録します。コンパイラはコンポーネントファイル内に直接記述されたインラインコンテンツ宣言を抽出し、トランスフォーム時に辞書に書き込みます。[intlayerCompiler ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayerCompiler.md)を参照してください。

### 6. ビルド最適化

本番環境ビルド中、プラグインは以下を追加します：

- **intlayerOptimize** – `useIntlayer('key')` → `useDictionary(hash)` を書き直し、直接 JSON インポートをインジェクトする Babel トランスフォーム。
- **intlayerPrune** – dictionary JSON から使用されていないコンテンツフィールドを削除します。
- **intlayerMinify** – dictionary JSON をコンパクト化し、必要に応じてフィールド名をマングルします。

これらは開発モードでは無効です。

## 廃止予定のエイリアス

| 廃止予定のエクスポート | 置き換え   |
| ---------------------- | ---------- |
| `intlayerPlugin`       | `intlayer` |
| `intLayerPlugin`       | `intlayer` |
