---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: パッケージドキュメント | lynx-intlayer
description: lynx-intlayerパッケージの使用方法を確認してください
keywords:
  - Intlayer
  - lynx-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

**Intlayer**は、JavaScript開発者向けに設計されたパッケージ群です。React、React、Express.jsなどのフレームワークと互換性があります。

**`lynx-intlayer`パッケージ**は、Viteアプリケーションを国際化するためのものです。環境変数を通じて設定を行うためのMetroプラグインを含み、[Lynxバンドラー](https://lynxjs.org/index.html)に統合されています。

## なぜLynxアプリケーションを国際化するのか？

Lynxアプリケーションを国際化することは、グローバルなオーディエンスに効果的に対応するために不可欠です。これにより、アプリケーションは各ユーザーの好みの言語でコンテンツやメッセージを提供することができます。この機能はユーザーエクスペリエンスを向上させ、異なる言語背景を持つ人々にとってよりアクセスしやすく、関連性のあるものにすることで、アプリケーションのリーチを広げます。

## 設定

`lynx-intlayer`パッケージは、[`react-intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)および[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/index.md)とシームレスに連携します。詳細については、関連するドキュメントをご覧ください。

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## 使用例

Viteの設定にプラグインを含める方法の例を以下に示します。

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... 他のプラグイン
    pluginIntlayerLynx(),
  ],
});
```

## Viteアプリケーションの国際化をマスターする

Intlayerは、Viteアプリケーションを国際化するための多くの機能を提供します。

**これらの機能について詳しく知りたい場合は、[IntlayerとLynxを使用したReactの国際化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_lynx+react.md)ガイドをご覧ください。**

## Intlayerについて読む

- [Intlayer公式サイト](https://intlayer.org)
- [Intlayerドキュメント](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [スマートドキュメントに質問する](https://intlayer.org/docchat)
