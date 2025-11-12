---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: サブパッケージ @intlayer/* に関連するエラーが発生する
description: サブパッケージ @intlayer/* に関連するエラーの修正方法。
keywords:
  - @intlayer/*
  - サブパッケージ
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# サブパッケージ `@intlayer/*` に関連するエラーが発生する

この問題は通常、Intlayerパッケージのアップデート後に発生します。

エラーメッセージの例：

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERROR  "node_modules/@intlayer/config/dist/esm/client.mjs" に "configESMxCJSRequire" の一致するエクスポートがありません

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## 理由

`intlayer`、`react-intlayer`、`react-native-intlayer`、`vue-intlayer` のようなベースパッケージは、コードの重複を避けるために `@intlayer/config`、`@intlayer/core`、`@intlayer/types` といった同じサブパッケージを再利用しています。

バージョン間で、サブパッケージのエクスポートが同じである保証はありません。この問題を制限するために、intlayer はサブパッケージのバージョンをメインパッケージのバージョンに固定しています。

> 例: `intlayer@1.0.0` は `@intlayer/config@1.0.0`、`@intlayer/core@1.0.0`、`@intlayer/types@1.0.0` を使用します。

> (`@intlayer/swc` を除き)、`@intlayer/*` のサブパッケージは直接使用することを意図していません。したがって、直接インストールしないことを推奨します。

## 解決策

1. メインパッケージとサブパッケージのバージョンが同じであることを確認してください。

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // バージョンが間違っています。7.0.1であるべきです
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. lockfile と node_modules フォルダを削除して依存関係を再インストールしてみてください。

パッケージマネージャーは、キャッシュ内の lockfile にサブパッケージの古いバージョンを保持していることがあります。これを修正するには、lockfile と node_modules フォルダを削除して依存関係を再インストールしてみてください。

```bash
rm -rf package-lock.json node_modules
npm install
```

3. グローバルインストールを確認する

CLI コマンドにアクセスするために、`intlayer` または `intlayer-cli` をグローバルにインストールすることを推奨します。グローバルバージョンがローカルバージョンと異なる場合、パッケージマネージャーは誤ったバージョンを認識する可能性があります。

**パッケージがグローバルにインストールされているか確認する**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**潜在的なグローバル依存関係の競合を修正する**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. キャッシュのクリーニングを試みる

Docker、GitHub Actions、またはVercelのようなウェブホスティングプラットフォームなどの環境では、キャッシュが存在する場合があります。キャッシュをクリアしてからインストールを再試行してみてください。

また、以下のコマンドでパッケージマネージャーのキャッシュをクリアすることもできます。

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
