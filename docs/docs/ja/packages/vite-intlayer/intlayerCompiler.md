---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerCompiler Viteプラグインドキュメント | vite-intlayer
description: コンポーネントファイルからインラインのIntlayerコンテンツ宣言を抽出し、ビルド/変換時に辞書JSONファイルに書き込むViteプラグイン。
keywords:
  - intlayerCompiler
  - vite
  - プラグイン
  - コンパイラ
  - コンテンツ
  - 辞書
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "intlayer()にバンドル。ドキュメント初期化"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler`は、コンポーネントのソースファイルをスキャンして**インラインのIntlayerコンテンツ宣言**（別個の`.content.ts`ファイルではなく、コンポーネント内に直接定義されたコンテンツ）を探し、変換（transform）フェーズ中にそれらを辞書JSONファイルに書き込むViteプラグインです。

> **Intlayer v9以降**、`compiler.enabled`が`true`かつ`compiler.output`がIntlayer設定で指定されている場合、`intlayerCompiler`はメインの[`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayer.md)プラグインに自動的に組み込まれます。コンパイラ固有の設定を完全に制御したい場合にのみ、個別に登録する必要があります。

## 使用方法

### `intlayer()`の一部として（推奨、v9+）

Intlayer設定でコンパイラを有効にします：

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // 抽出された辞書が書き込まれる場所
  },
});
```

次に、追加の登録なしで標準プラグインを使用します：

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### スタンドアロン（必要な場合）

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## オプション

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| オプション       | 型                        | 説明                                                                                           |
| ---------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | `getConfiguration()`に転送されるIntlayer設定のオーバーライド。                                 |
| `compilerConfig` | `Partial<CompilerConfig>` | コンパイラ固有の設定セクションに対するオーバーライド（例：`enabled`、`output`、`filesList`）。 |

### 例

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## 動作原理

### 変換（Transform）フェーズ

`compiler.filesList`に一致するすべてのソースファイルに対して、コンパイラプラグインは以下を実行します：

1. ファイルコンテンツを`@intlayer/babel`の`extractContent`に渡します。
2. 検出された各宣言に対して`onExtract`を呼び出し、結果の辞書JSONを`compiler.output`に書き込みます。
3. インライン宣言が標準の`useIntlayer('key')` / `getIntlayer('key')`呼び出しに置き換えられた、変換後のソースコードを返します。

サポートされているファイルタイプ：`.ts`、`.tsx`、`.js`、`.jsx`、`.vue`、`.svelte`、`.astro`。

### HMR（ホットモジュールリプレイスメント）

開発モードでコンポーネントファイルが保存されると、コンパイラは以下を実行します：

1. Viteの`handleHotUpdate`フックを介してファイルの変更を検知します。
2. 更新されたファイルからコンテンツを再抽出します。
3. 更新された辞書JSONを書き込みます。
4. ページのフルリロードをトリガーします（`server.ws.send({ type: 'full-reload' })`）。

500ミリ秒のデバウンス（遅延）により、辞書の書き込み自体（これもファイル変更イベントをトリガーします）が無限の再抽出ループを引き起こすのを防ぎます。

### 重複排除（Deduplication）

`intlayerCompiler`は、他のバンドルされたプラグインと同じ`createPrimaryInstanceGuard`重複排除メカニズムを使用します。`intlayer()`（コンパイラを内包）と手動の`intlayerCompiler()`呼び出しの両方が存在する場合、最初に登録されたインスタンスのみが実行され、辞書が二重に書き込まれることはありません。
