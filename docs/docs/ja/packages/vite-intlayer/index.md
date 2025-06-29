---
docName: package__vite-intlayer
url: https://intlayer.org/doc/packages/vite-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: パッケージドキュメント | vite-intlayer
description: vite-intlayerパッケージの使用方法を確認してください
keywords:
  - Intlayer
  - vite-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# vite-intlayer: Viteアプリケーションを国際化（i18n）するためのNPMパッケージ

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージ群です。React、React、Express.jsなどのフレームワークと互換性があります。

**`vite-intlayer`パッケージ**は、Viteアプリケーションを国際化するためのものです。このパッケージには、[Viteバンドラー](https://vitejs.dev/guide/why.html#why-bundle-for-production)に環境変数を設定するためのViteプラグインが含まれています。また、ユーザーの優先ロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)で指定された適切なURLにリダイレクトするためのミドルウェアも提供します。

## なぜViteアプリケーションを国際化するのか？

Viteアプリケーションを国際化することは、グローバルなオーディエンスに効果的にサービスを提供するために不可欠です。これにより、各ユーザーの好みの言語でコンテンツやメッセージを提供することができます。この機能はユーザーエクスペリエンスを向上させ、異なる言語背景を持つ人々にとってアプリケーションをよりアクセスしやすく、関連性のあるものにすることで、アプリケーションのリーチを広げます。

## 設定

`vite-intlayer`パッケージは、[`react-intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)や[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/index.md)とシームレスに連携します。詳細については、関連するドキュメントをご覧ください。

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## 使用例

Vite設定にプラグインを含める方法の例を以下に示します。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` Viteプラグインは、IntlayerをViteに統合するために使用されます。これにより、コンテンツ宣言ファイルの構築が保証され、開発モードでそれらを監視します。また、Viteアプリケーション内でIntlayer環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

> `intLayerMiddlewarePlugin()`は、アプリケーションにサーバーサイドルーティングを追加します。このプラグインは、URLに基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、ユーザーのブラウザの言語設定に基づいて最適なロケールを決定します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトします。

## Viteアプリケーションの国際化をマスターする

Intlayerは、Viteアプリケーションを国際化するための多くの機能を提供します。

**これらの機能について詳しくは、[IntlayerとViteおよびReactを使用したReactの国際化（i18n）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)ガイドをご覧ください。**
