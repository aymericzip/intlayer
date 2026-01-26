---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer-cli パッケージドキュメント
description: Intlayer 用の CLI ツール。辞書のビルドや監査用コマンドを提供します。
keywords:
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートに関するドキュメントを統一
---

# intlayer-cli パッケージ

`intlayer-cli` パッケージは、Intlayer の辞書と設定を管理するための一連のコマンドを提供します。

## インストール

```bash
npm install intlayer-cli
```

## エクスポート

### CLI コマンド（関数）

このパッケージは CLI コマンドを実装する関数をエクスポートしており、Intlayer の操作をプログラムからトリガーできます。

インポート:

```tsx
import "intlayer-cli";
```

| 関数           | 説明                                       |
| -------------- | ------------------------------------------ |
| `build`        | Intlayer の辞書をビルドします。            |
| `audit`        | 翻訳漏れがないか辞書を監査します。         |
| `liveSync`     | 辞書をリアルタイムで同期します。           |
| `pull`         | リモートソースから辞書を取得します。       |
| `push`         | リモートソースへ辞書を送信します。         |
| `test`         | 辞書に対してテストを実行します。           |
| `transform`    | 辞書を別フォーマットに変換します。         |
| `fill`         | AI を使って辞書の欠落翻訳を補完します。    |
| `reviewDoc`    | 国際化向けのドキュメントをレビューします。 |
| `translateDoc` | AIを使用してドキュメントを翻訳します。     |
