---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - 国際化のためのコマンドラインツール
description: 翻訳管理、辞書構築、国際化ワークフローの自動化を提供するIntlayerのコマンドラインインターフェースパッケージ。
keywords:
  - intlayer
  - CLI
  - コマンドライン
  - 国際化
  - i18n
  - ツール
  - NPM
  - 自動化
slugs:
  - doc
  - package
  - intlayer-cli
---

# intlayer-cli: Intlayer CLIを使用するためのNPMパッケージ

**Intlayer**はJavaScript開発者向けに特化して設計されたパッケージ群です。ReactやExpress.jsなどのフレームワークと互換性があります。

**`intlayer-cli`** パッケージは、`@intlayer/cli` パッケージを利用し、`intlayer` コマンドラインインターフェースで使用可能にするNPMパッケージです。

> [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/docs/ja/packages/intlayer/index.md) パッケージがインストールされている場合、このパッケージは不要です。`intlayer` パッケージと比較すると、`intlayer-cli` パッケージはCLIツールのみを含む軽量パッケージであり、`@intlayer/core` の依存関係は含まれていません。

## インストール

お好みのパッケージマネージャーを使って必要なパッケージをインストールしてください：

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## 使い方

`intlayer-cli` パッケージの使用例は以下の通りです：

```bash
npx intlayer dictionaries build
```

## CLI コマンド

Intlayer は以下の機能を持つ CLI ツールを提供します：

- コンテンツ宣言を監査し、欠落している翻訳を補完する
- コンテンツ宣言から辞書を構築する
- CMS からローカルプロジェクトへ、またはその逆にリモート辞書をプッシュおよびプルする

詳細は [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md) を参照してください。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
