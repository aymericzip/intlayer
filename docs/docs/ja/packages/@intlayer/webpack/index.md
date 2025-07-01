---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Intlayer i18n用Webpackプラグイン
description: WebpackベースのアプリケーションにIntlayerの国際化をシームレスに統合するためのWebpack設定とプラグインを提供するNPMパッケージ。
keywords:
  - intlayer
  - webpack
  - プラグイン
  - 設定
  - i18n
  - JavaScript
  - NPM
  - バンドラー
slugs:
  - doc
  - package
  - @intlayer_webpack
---

# @intlayer/webpack: IntlayerのWebpackプラグインをアプリケーションで使用するためのNPMパッケージ

**Intlayer** はJavaScript開発者向けに特別に設計されたパッケージ群です。ReactやExpress.jsなどのフレームワークと互換性があります。

**`@intlayer/webpack`** パッケージは、Intlayerを用いたWebpackベースのアプリケーションを動作させるためのWebpack設定を提供します。また、既存のWebpackアプリケーションに追加できるプラグインも提供しています。

## 使用方法

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // オプション
    }),
  ],
};
```

## インストール

お好みのパッケージマネージャーを使って必要なパッケージをインストールしてください：

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
yarn add @intlayer/webpack
```

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
