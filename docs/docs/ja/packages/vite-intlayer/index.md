---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: パッケージドキュメント | vite-intlayer
description: vite-intlayerパッケージの使い方を見る
keywords:
  - Intlayer
  - vite-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer: Viteアプリケーションを国際化（i18n）するためのNPMパッケージ

**Intlayer**はJavaScript開発者向けに特化して設計されたパッケージ群です。ReactやExpress.jsなどのフレームワークと互換性があります。

**`vite-intlayer`パッケージ**は、Viteアプリケーションを国際化することを可能にします。環境変数を通じて設定を行うためのViteプラグインを含んでおり、これは[Viteバンドラー](https://vitejs.dev/guide/why.html#why-bundle-for-production)に組み込まれています。また、ユーザーの好みのロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)で指定された適切なURLへリダイレクトするミドルウェアも提供します。

## なぜViteアプリケーションを国際化するのか？

Viteアプリケーションを国際化することは、グローバルなユーザーに効果的に対応するために不可欠です。これにより、各ユーザーの好みの言語でコンテンツやメッセージを提供できるようになります。この機能はユーザー体験を向上させ、異なる言語背景を持つ人々にとってよりアクセスしやすく関連性の高いものにすることで、アプリケーションのリーチを広げます。

## 設定

`vite-intlayer`パッケージは、[`react-intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)および[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/index.md)とシームレスに連携します。詳細については関連ドキュメントをご覧ください。

## インストール

必要なパッケージをお好みのパッケージマネージャーでインストールしてください：

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

viteの設定にプラグインを組み込む例を示します。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intlayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` は Intlayer を Vite と統合するための Vite プラグインです。コンテンツ宣言ファイルのビルドを保証し、開発モードでそれらを監視します。Vite アプリケーション内で Intlayer の環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスも提供します。

> `intlayerMiddlewarePlugin()` はアプリケーションにサーバーサイドルーティングを追加します。このプラグインは URL に基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、ユーザーのブラウザの言語設定に基づいて最適なロケールを判別します。ロケールが検出されない場合は、デフォルトのロケールにリダイレクトします。

## Vite アプリケーションの国際化をマスターする

Intlayerは、Viteアプリケーションの国際化を支援する多くの機能を提供しています。

**これらの機能の詳細については、ViteおよびReactアプリケーション向けの[React Internationalization (i18n) with Intlayer and Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)ガイドを参照してください。**

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
