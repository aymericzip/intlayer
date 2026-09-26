---
createdAt: 2026-01-21
updatedAt: 2026-01-21
priority: 5
title: vite-intlayer パッケージのドキュメント
description: Intlayer用のViteプラグイン。辞書エイリアスとウォッチャーを提供します。
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "エクスポートインデックスを更新 – プロキシとコンパイラが intlayer() にバンドルされました。intlayerProxy、intlayerCompiler、intlayerMinify のドキュメントを追加"
  - version: 8.0.0
    date: 2026-01-21
    changes: "全エクスポートのドキュメントを統合"
author: aymericzip
---

# vite-intlayer パッケージ

`vite-intlayer` パッケージは、Viteベースのアプリケーションに Intlayer を統合するための Vite プラグインを提供します。

## インストール

```bash
npm install vite-intlayer
```

## エクスポート

### プラグイン

インポート:

```tsx
import "vite-intlayer";
```

| 関数                       | 説明                                                                                                                                                             | 関連ドキュメント                                                                                                             |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | メインの Vite プラグイン。辞書を準備し、エイリアスを設定し、開発サーバーウォッチャーを開始し、（v9 以降）プロキシとコンパイラをバンドルします。                  | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**非推奨**) `intlayer` のエイリアス。                                                                                                                           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**非推奨**) `intlayer` のエイリアス。                                                                                                                           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | ロケールルーティングミドルウェアプラグイン（検出、リダイレクト、書き換え）。v9 以降 `intlayer()` にバンドルされています – 必要な場合のみ個別に登録してください。 | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**非推奨**) `intlayerProxy` のエイリアス。                                                                                                                      | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**非推奨**) `intlayerProxy` のエイリアス。                                                                                                                      | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | コンポーネントからインラインコンテンツ宣言を抽出し、辞書に書き込みます。v9 以降 `intlayer()` にバンドルされています。                                            | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | 本番バンドルから未使用の辞書フィールドをツリーシェイクします。                                                                                                   | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | コンパイルされた辞書 JSON ファイルを縮小し、オプションでフィールド名を難読化します。                                                                             | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayerMinify.md)     |

### ユーティリティ

| エクスポート                 | 説明                                                                                                            | 関連ドキュメント                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | フレームワークに依存しないNode.js `(req, res, next)` ミドルウェアをロケールルーティングロジック付きで返します。 | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayerProxy.md) |

### Types

| Export                       | Description                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `IntlayerPluginOptions`      | `intlayer()` で受け入れられるオプション。`GetConfigurationOptions` を `compatCallers` と `proxy` で拡張します。          |
| `IntlayerProxyPluginOptions` | `intlayerProxy()` と `createIntlayerProxyHandler()` で受け入れられるオプション。`ignore` と `configOptions` を含みます。 |
| `IntlayerCompilerOptions`    | `intlayerCompiler()` で受け入れられるオプション。`configOptions` と `compilerConfig` を含みます。                        |
| `CompatCallerConfig`         | `@intlayer/babel` から再エクスポート。フィールド使用分析のための compat-adapter caller パターンを説明します。            |
