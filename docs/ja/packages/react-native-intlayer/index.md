**Intlayer**は、JavaScript開発者向けに設計されたパッケージスイートです。React、React、Express.jsなどのフレームワークと互換性があります。

**`react-native-intlayer`パッケージ**は、Viteアプリケーションを国際化するためのものです。環境変数を通じて[Metroバンドラー](https://docs.expo.dev/guides/customizing-metro/)に設定を適用するためのMetroプラグインが含まれています。

## React Nativeアプリケーションを国際化する理由

React Nativeアプリケーションを国際化することは、グローバルなオーディエンスに効果的に対応するために不可欠です。これにより、各ユーザーの好みの言語でコンテンツやメッセージを提供することができます。この機能はユーザーエクスペリエンスを向上させ、異なる言語背景を持つ人々にとってアプリケーションをよりアクセスしやすく、関連性のあるものにすることで、アプリケーションのリーチを広げます。

## 設定

`react-native-intlayer`パッケージは、[`react-intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/index.md)や[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/index.md)とシームレスに連携します。詳細については、関連するドキュメントをご覧ください。

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

Vite設定にプラグインを含める方法の例を以下に示します。

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Viteアプリケーションの国際化をマスターする

Intlayerは、Viteアプリケーションを国際化するための多くの機能を提供します。

**これらの機能について詳しく知りたい場合は、[React Nativeアプリケーション向けのIntlayerとReact Nativeを使用した国際化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_react_native+expo.md)ガイドをご覧ください。**

## Intlayerについて読む

- [Intlayer公式ウェブサイト](https://intlayer.org)
- [Intlayerドキュメント](https://intlayer.org/docs)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [スマートドキュメントに質問する](https://intlayer.org/docs/chat)
