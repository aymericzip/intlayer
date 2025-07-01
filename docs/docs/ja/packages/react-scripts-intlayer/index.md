---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: パッケージドキュメント | react-scripts-intlayer
description: react-scripts-intlayerパッケージの使い方
keywords:
  - Intlayer
  - react-scripts-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-scripts-intlayer
---

# react-scripts-intlayer: React Create AppアプリケーションでIntlayerを使用するためのNPMパッケージ

**Intlayer**はJavaScript開発者向けに特別に設計されたパッケージ群です。ReactやReact、Express.jsなどのフレームワークと互換性があります。

**`react-scripts-intlayer`パッケージ**は、Create React AppベースのアプリケーションにIntlayerを統合するための`react-scripts-intlayer`コマンドとプラグインを含んでいます。これらのプラグインは[craco](https://craco.js.org/)に基づいており、[Webpack](https://webpack.js.org/)バンドラーの追加設定も含まれています。

## 設定

`react-scripts-intlayer`パッケージは、[`react-intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)および[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/index.md)とシームレスに連携します。詳細については関連ドキュメントをご覧ください。

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールしてください：

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## 使用方法

### CLIコマンド

`react-scripts-intlayer`パッケージは以下のCLIコマンドを提供します：

- `npx react-scripts-intlayer build`：Intlayer設定でReactアプリケーションをビルドします。
- `npx react-scripts-intlayer start`：Intlayer設定で開発サーバーを起動します。

### package.jsonのスクリプトを置き換える

`react-scripts-intlayer`パッケージを使用するには、`package.json`のスクリプトを以下のコマンドに置き換える必要があります：

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## カスタムWebpack設定の使用

`react-scripts-intlayer`は[craco](https://craco.js.org/)をベースにしており、Webpackの設定をカスタマイズすることが可能です。
Webpackの設定をカスタマイズする必要がある場合は、intlayerのcracoプラグインをベースに独自のセットアップを実装することもできます。[こちらの例を参照してください](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

## React Create App用のIntlayer完全ガイドを読む

IntlayerはReactアプリケーションの国際化を支援する多くの機能を提供しています。
[IntlayerをReact Create Appで使用する方法はこちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)をご覧ください。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 初期履歴
