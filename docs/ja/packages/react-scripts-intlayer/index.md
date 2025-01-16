# react-scripts-intlayer: NPMパッケージを使用してIntlayerをReact Create Appアプリケーションで利用する

**Intlayer**は、JavaScript開発者向けに特別に設計された一連のパッケージです。React、React、およびExpress.jsのようなフレームワークと互換性があります。

**`react-scripts-intlayer`パッケージ**には、Create React AppベースのアプリケーションとIntlayerを統合するための`react-scripts-intlayer`コマンドとプラグインが含まれています。これらのプラグインは[craco](https://craco.js.org/)に基づいており、[Webpack](https://webpack.js.org/)バンドラー用の追加構成が含まれています。

## 設定

`react-scripts-intlayer`パッケージは、[`react-intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/index.md)および[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/index.md)とシームレスに動作します。詳細については関連するドキュメントを確認してください。

## インストール

必要なパッケージをお好みのパッケージマネージャーを使用してインストールします：

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## 使い方

### CLIコマンド

`react-scripts-intlayer`パッケージは、以下のCLIコマンドを提供します：

- `npx react-scripts-intlayer build`: Intlayer構成でReactアプリケーションをビルドします。
- `npx react-scripts-intlayer start`: Intlayer構成で開発サーバーを起動します。

### package.jsonスクリプトの置き換え

`react-scripts-intlayer`パッケージを使用するには、次のコマンドで`package.json`スクリプトを置き換える必要があります：

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## カスタムWebpack構成を使用する

`react-scripts-intlayer`は[craco](https://craco.js.org/)に基づいており、Webpack構成をカスタマイズすることができます。
Webpack構成をカスタマイズする必要がある場合、intlayer cracoプラグインに基づいて独自のセットアップを実装することもできます。[例はこちらをご覧ください](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

## React Create App用の完全なIntlayerガイドを読む

Intlayerは、Reactアプリケーションを国際化するための多くの機能を提供します。
[React Create Appでintlayerを使用する方法](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)をご覧ください。
