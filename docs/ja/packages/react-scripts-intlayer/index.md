# react-scripts-intlayer: React Create AppアプリケーションでIntlayerを使用するためのNPMパッケージ

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージ群です。React、React、Express.jsなどのフレームワークと互換性があります。

**`react-scripts-intlayer`パッケージ**は、Create React AppベースのアプリケーションにIntlayerを統合するための`react-scripts-intlayer`コマンドとプラグインを含んでいます。これらのプラグインは[craco](https://craco.js.org/)に基づいており、[Webpack](https://webpack.js.org/)バンドラーの追加設定を含んでいます。

## 設定

`react-scripts-intlayer`パッケージは、[`react-intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/index.md)および[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/index.md)とシームレスに動作します。詳細については、関連するドキュメントをご覧ください。

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします:

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

`react-scripts-intlayer`パッケージは以下のCLIコマンドを提供します:

- `npx react-scripts-intlayer build`: Intlayer設定を使用してReactアプリケーションをビルドします。
- `npx react-scripts-intlayer start`: Intlayer設定を使用して開発サーバーを起動します。

### package.jsonスクリプトの置き換え

`react-scripts-intlayer`パッケージを使用するには、以下のコマンドで`package.json`スクリプトを置き換える必要があります:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## カスタムWebpack設定の使用

`react-scripts-intlayer`は[craco](https://craco.js.org/)に基づいており、Webpack設定をカスタマイズすることができます。
Webpack設定をカスタマイズする必要がある場合は、intlayer cracoプラグインに基づいて独自のセットアップを実装することもできます。[こちらの例を参照してください](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

## React Create App用のIntlayerガイドを読む

Intlayerは、Reactアプリケーションを国際化するための多くの機能を提供します。
[React Create Appでintlayerを使用する方法を参照してください](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)。
