---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "intlayer-cli パッケージのドキュメント"
description: "Intlayer向けのCLIツールで、辞書のビルドや監査のコマンドを提供します。"
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# intlayer-cli パッケージ

`intlayer-cli` パッケージは、Intlayer の辞書と設定を管理するための一連のコマンドを提供します。

## インストール

```bash
npm install intlayer-cli
```

## エクスポート

### CLI コマンド（関数）

このパッケージは、CLI コマンドを実現する関数をエクスポートします。

| 関数        | 説明                                               |
| ----------- | -------------------------------------------------- |
| `build`     | Intlayer の辞書をビルドします。                    |
| `audit`     | 欠落している翻訳を検出するために辞書を監査します。 |
| `liveSync`  | 辞書をリアルタイムで同期します。                   |
| `pull`      | リモートソースから辞書をプルします。               |
| `push`      | 辞書をリモートソースへプッシュします。             |
| `test`      | 辞書に対してテストを実行します。                   |
| `transform` | 辞書を別フォーマットに変換します。                 |
