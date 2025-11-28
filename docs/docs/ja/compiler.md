---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Intlayer コンパイラー | i18n のための自動コンテンツ抽出
description: Intlayer コンパイラーで国際化プロセスを自動化しましょう。コンポーネントから直接コンテンツを抽出し、Vite、Next.js などでより高速かつ効率的な i18n を実現します。
keywords:
  - Intlayer
  - コンパイラー
  - 国際化
  - i18n
  - 自動化
  - 抽出
  - 速度
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: コンパイラーリリース
---

# Intlayer コンパイラー | i18n のための自動コンテンツ抽出

## Intlayer コンパイラーとは？

**Intlayer コンパイラー**は、アプリケーションの国際化（i18n）プロセスを自動化するために設計された強力なツールです。ソースコード（JSX、TSX、Vue、Svelte）内のコンテンツ宣言をスキャンし、それらを抽出して必要な辞書ファイルを自動的に生成します。これにより、コンテンツをコンポーネントと共に配置したままにでき、Intlayer が辞書の管理と同期を担当します。

## なぜ Intlayer コンパイラーを使うのか？

- **自動化**: コンテンツを辞書に手動でコピー＆ペーストする手間を排除します。
- **高速化**: 最適化されたコンテンツ抽出により、ビルドプロセスの高速化を実現します。
- **開発者体験**: コンテンツ宣言を使用箇所にそのまま保持し、保守性を向上させます。
- **ライブアップデート**: 開発中に即時フィードバックを得られるホットモジュールリプレースメント（HMR）をサポートします。

より詳しい比較については、[Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md) のブログ記事をご覧ください。

## Intlayer コンパイラーを使わない理由

コンパイラーは優れた「そのまま動作する」体験を提供しますが、いくつかのトレードオフも導入します：

- **ヒューリスティックの曖昧さ**：コンパイラーは、ユーザー向けコンテンツとアプリケーションロジック（例：`className="active"`、ステータスコード、製品ID）を推測する必要があります。複雑なコードベースでは、これにより誤検出や見逃された文字列が発生し、手動での注釈と例外処理が必要になる場合があります。
- **静的抽出のみ**：コンパイラーベースの抽出は静的解析に依存しています。実行時のみ存在する文字列（APIエラーコード、CMSフィールドなど）は、コンパイラー単独では発見または翻訳できないため、補完的なランタイムi18n戦略が必要です。

より深いアーキテクチャの比較については、ブログ記事[Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)を参照してください。

代替として、コンテンツの完全な制御を維持しながらi18nプロセスを自動化するために、Intlayerは自動抽出コマンド `intlayer transform`（[CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/transform.md)を参照）またはIntlayer VS Code拡張機能の `Intlayer: extract content to Dictionary` コマンド（[VS Code拡張機能ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)を参照）も提供しています。

## 使い方

### Vite

Viteベースのアプリケーション（React、Vue、Svelteなど）では、`vite-intlayer` プラグインを使うのが最も簡単な方法です。

#### インストール

```bash
npm install vite-intlayer
```

#### 設定

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // コンパイラプラグインを追加
  ],
});
```

#### フレームワークサポート

Viteプラグインは自動的に異なるファイルタイプを検出し処理します：

- **React / JSX / TSX**: ネイティブに対応。
- **Vue**: `@intlayer/vue-compiler` が必要です。
- **Svelte**: `@intlayer/svelte-compiler` が必要です。

使用しているフレームワークに応じて、適切なコンパイラパッケージをインストールしてください：

```bash
# Vue用
npm install @intlayer/vue-compiler

# Svelte用
npm install @intlayer/svelte-compiler
```

### Next.js (Babel)

Next.jsやその他のWebpackベースのBabelを使用するアプリケーションでは、`@intlayer/babel`プラグインを使ってコンパイラを設定できます。

#### インストール

```bash
npm install @intlayer/babel
```

#### 設定

`babel.config.js`（または `babel.config.json`）を更新して、抽出プラグインを含めます。Intlayerの設定を自動的に読み込むためのヘルパー `getExtractPluginOptions` を提供しています。

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

この設定により、コンポーネント内で宣言されたコンテンツが自動的に抽出され、ビルドプロセス中に辞書の生成に使用されます。
