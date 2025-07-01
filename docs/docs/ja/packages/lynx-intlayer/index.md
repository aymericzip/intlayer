---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: パッケージドキュメント | lynx-intlayer
description: lynx-intlayerパッケージの使い方を見る
keywords:
  - Intlayer
  - lynx-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# lynx-intlayer: Lynxアプリケーションの国際化（i18n）

**Intlayer**はJavaScript開発者向けに特別に設計されたパッケージ群です。ReactやExpress.jsなどのフレームワークと互換性があります。

**`lynx-intlayer`パッケージ**は、Viteアプリケーションの国際化を可能にします。環境変数を通じて設定を行うMetroプラグインが含まれており、[Lynxバンドラー](https://lynxjs.org/index.html)に組み込むことができます。

## なぜLynxアプリケーションを国際化するのか？

Lynxアプリケーションを国際化することは、グローバルなユーザーに効果的に対応するために不可欠です。これにより、各ユーザーの好みの言語でコンテンツやメッセージを提供できるようになります。この機能はユーザー体験を向上させ、異なる言語背景を持つ人々にとってよりアクセスしやすく、関連性の高いアプリケーションにすることで、アプリケーションのリーチを広げます。

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

viteの設定にプラグインを含める方法の例を示します。

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

Intlayerは、Viteアプリケーションの国際化を支援する多くの機能を提供します。

**これらの機能の詳細については、Lynxアプリケーション向けの[ReactとIntlayerおよびLynxによる国際化（i18n）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_lynx+react.md)ガイドを参照してください。**

## Intlayerについて読む

- [Intlayer公式サイト](https://intlayer.org)
- [Intlayerドキュメント](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [スマートドキュメントに質問する](https://intlayer.org/doc/chat)

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
