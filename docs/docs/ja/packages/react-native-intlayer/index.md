---
docName: package__react-native-intlayer
url: https://intlayer.org/doc/packages/react-native-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-native-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: パッケージドキュメント | react-native-intlayer
description: react-native-intlayerパッケージの使い方を見る
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# react-native-intlayer: React Nativeアプリケーションの国際化（i18n）

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージ群です。ReactやExpress.jsなどのフレームワークと互換性があります。

**`react-native-intlayer`パッケージ**は、Viteアプリケーションの国際化を可能にします。環境変数を通じて設定を行うMetroプラグインが含まれており、[Metroバンドラー](https://docs.expo.dev/guides/customizing-metro/)に組み込むことができます。

## なぜReact Nativeアプリケーションを国際化するのか？

React Nativeアプリケーションを国際化することは、グローバルなユーザーに効果的にサービスを提供するために不可欠です。これにより、各ユーザーの好みの言語でコンテンツやメッセージを配信できるようになります。この機能はユーザー体験を向上させ、異なる言語背景を持つ人々にとってよりアクセスしやすく、関連性の高いアプリケーションにすることで、アプリのリーチを広げます。

## 設定

`react-native-intlayer`パッケージは、[`react-intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)および[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/index.md)とシームレスに連携します。詳細については、関連するドキュメントをご覧ください。

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールしてください：

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## 使用例

viteの設定にプラグインを組み込む方法の例を示します。

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Viteアプリケーションの国際化を極める

Intlayerは、Viteアプリケーションの国際化を支援する多くの機能を提供しています。

**これらの機能の詳細については、React Nativeアプリケーション向けの[React Internationalization (i18n) with Intlayer and React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_native+expo.md)ガイドを参照してください。**

## Intlayerについて読む

- [Intlayer ウェブサイト](https://intlayer.org)
- [Intlayer ドキュメント](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [スマートドキュメントに質問する](https://intlayer.org/docchat)

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
