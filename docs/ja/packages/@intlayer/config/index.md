# @intlayer/config: NPMパッケージでIntlayer設定を取得

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージのスイートです。React、React、およびExpress.jsなどのフレームワークと互換性があります。

**`@intlayer/config`**パッケージは、Intlayerの設定を取得し、現在の環境に関連する環境変数を定義することができるNPMパッケージです。

## インストール

好みのパッケージマネージャを使用して必要なパッケージをインストールします:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## 使用法

### ファイルシステムを使用してIntlayerの設定を読み取る

例:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// 出力:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> この関数は`fs`パッケージを使用し、サーバー側のみで動作します。

### 環境変数を使用してIntlayerの設定を読み取る

例:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// 出力:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> 環境変数が定義されていない場合、この関数は何も返しません。

### 環境変数を定義する

1. 設定ファイルを作成します。

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> 詳細については[Intlayer設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

2. 環境変数を定義します。

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// すべての設定値を環境変数としてフォーマット
const env = formatEnvVariable();

// 各フォーマットされた環境変数をprocess.envに設定
Object.assign(process.env, env);
```

3. 設定ファイルをインポートします。

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
