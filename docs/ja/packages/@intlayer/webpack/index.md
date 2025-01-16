# @intlayer/webpack: NPMパッケージを使用してアプリケーションにIntlayer Webpackプラグインを組み込む

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージのスイートです。React、React、Express.jsなどのフレームワークと互換性があります。

**`@intlayer/webpack`**パッケージは、Intlayerを使用してWebpackベースのアプリケーションを作業するためのWebpack設定を提供するために使用されます。このパッケージは、既存のWebpackアプリケーションに追加するためのプラグインも提供します。

## 使用法

```ts
import { IntLayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntLayerPlugin({
      // オプション
    }),
  ],
};
```

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

[詳細については、こちらを参照してください。](https://github.com/aymericzip/intlayer/blob/main/docs/ja/**/*)
