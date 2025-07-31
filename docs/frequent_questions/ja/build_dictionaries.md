---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 辞書のビルド方法
description: 辞書のビルド方法を学ぶ
keywords:
  - ビルド
  - 辞書
  - intlayer
  - コマンド
  - 監視
  - vscode
  - プラグイン
  - フレームワーク
  - next.js
  - vite
slugs:
  - doc
  - faq
  - build-dictionaries
---

# 辞書のビルド

## 辞書のビルド方法

Intlayerは辞書をビルドするためのコマンドラインツールを提供しています。

```bash
npx intlayer dictionaries build
```

このコマンドは以下を行います：

- プロジェクト内のすべてのコンテンツ宣言ファイル（`.content.{ts,tsx,js,mjs,cjs,json,...}`）をスキャンします。
- 辞書を生成し、`.intlayer/dictionary`フォルダに保存します。

### 監視モード

コンテンツ宣言ファイルに変更があった場合に辞書を自動的に更新したい場合は、次のコマンドを実行してください：

```bash
npx intlayer dictionaries build --watch
```

このモードでは、Intlayerはコンテンツ宣言ファイルに変更があるたびにスキャンして辞書をビルドし、`.intlayer/dictionary`フォルダを自動的に更新します。

### VSCode拡張機能の使用

また、[Intlayer VSCode拡張機能](https://github.com/aymericzip/intlayer/tree/main/docs/ja/vs_code_extension.md)を使用して、VSCodeでのIntlayerの体験を向上させることもできます。

### お気に入りのアプリケーションフレームワーク用プラグインの使用

Next.js（Webpack / Turbopack）、Vite、React Native、Lynxなどのフレームワークを使用している場合、IntlayerはアプリケーションにIntlayerを統合するためのプラグインを提供しています。

Intlayerは、アプリケーションのビルド前に辞書を構築します。
同様に、開発モードでは、コンテンツ宣言ファイルの変更を監視し、辞書を自動的に再構築します。

したがって、プラグインの統合方法については、使用しているフレームワークの特定のドキュメントを参照してください。
