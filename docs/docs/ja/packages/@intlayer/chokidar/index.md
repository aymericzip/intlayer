---
docName: package__@intlayer_chokidar
url: https://intlayer.org/doc/package/@intlayer_chokidar
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/@intlayer/chokidar/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - Intlayer i18nのためのファイル監視
description: Intlayer向けのファイル監視機能を提供するNPMパッケージで、国際化コンテンツの自動更新とホットリロードを可能にします。
keywords:
  - intlayer
  - chokidar
  - ファイル監視
  - ホットリロード
  - i18n
  - JavaScript
  - NPM
  - 開発
---

# @intlayer/chokidar: Intlayer宣言ファイルを辞書にスキャン・構築するNPMパッケージ

**Intlayer** はJavaScript開発者向けに特別に設計されたパッケージ群です。ReactやExpress.jsなどのフレームワークと互換性があります。

**`@intlayer/chokidar`** パッケージは、[chokidar](https://github.com/paulmillr/chokidar) を使用し、[Intlayerの設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) に従ってIntlayer宣言ファイルをスキャンし、辞書に構築するために使用されます。

## 使い方

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Intlayer辞書を構築する

watch({ persistent: true }); // 設定ファイルの変更を監視する
```

## インストール

お好みのパッケージマネージャーを使って必要なパッケージをインストールしてください：

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
