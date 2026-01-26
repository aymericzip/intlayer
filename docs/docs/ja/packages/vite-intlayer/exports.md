---
createdAt: 2026-01-21
updatedAt: 2026-01-21
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
  - version: 8.0.0
    date: 2026-01-21
    changes: 全エクスポートのドキュメントを統合
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

| 関数                 | 説明                                                               | 関連ドキュメント                                                                                                       |
| -------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Intlayer をビルドプロセスに統合する主要な Vite プラグイン。        | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**非推奨**) `intlayer` のエイリアス。                             | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | ロケール検出とルーティングを処理する開発用ミドルウェアプラグイン。 | -                                                                                                                      |
| `intlayerMiddleware` | (**非推奨**) `intlayerProxy` のエイリアス。                        | -                                                                                                                      |
| `intlayerPrune`      | ビルド時に未使用の辞書をツリーシェイクしてプルーンするプラグイン。 | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayerPrune.md) |
