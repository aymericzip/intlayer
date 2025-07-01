---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - Intlayerの設定管理
description: Intlayerの設定を取得し、異なる環境間での国際化設定に関する環境変数を定義するためのNPMパッケージ。
keywords:
  - intlayer
  - 設定
  - 環境
  - 設定項目
  - i18n
  - JavaScript
  - NPM
  - 変数
slugs:
  - doc
  - package
  - @intlayer_config
---

# @intlayer/config: Intlayerの設定を取得するためのNPMパッケージ

**Intlayer** はJavaScript開発者向けに特別に設計されたパッケージ群です。ReactやExpress.jsなどのフレームワークと互換性があります。

**`@intlayer/config`** パッケージは、Intlayerの設定を取得し、現在の環境に関連する環境変数を定義するためのNPMパッケージです。

## インストール

お使いのパッケージマネージャーを使用して必要なパッケージをインストールしてください：

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## 使い方

### ファイルシステムを使ってIntlayerの設定を読み取る

例：

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// 出力例:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> この関数は `fs` パッケージを使用しており、サーバーサイドでのみ動作します。

### 環境変数を使ってIntlayerの設定を読み取る

例：

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// 出力例:
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

> 詳細は[Intlayer設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

2. 環境変数を定義します。

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// すべての設定値を環境変数の形式に変換
const env = formatEnvVariable();

// 変換された各環境変数をprocess.envに設定
Object.assign(process.env, env);
```

3. 設定ファイルをインポートします。

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
