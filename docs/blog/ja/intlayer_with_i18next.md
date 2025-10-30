---
createdAt: 2024-12-24
updatedAt: 2025-10-29
title: Intlayerを使ってi18nextのJSON翻訳を自動化する方法
description: Intlayerとi18nextを使ってJavaScriptアプリケーションの国際化を強化するためにJSON翻訳を自動化する方法。
keywords:
  - Intlayer
  - i18next
  - 国際化
  - i18n
  - ローカリゼーション
  - 翻訳
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - マイグレーション
  - 統合
slugs:
  - blog
  - intlayer-with-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSONプラグインへの変更
---

# Intlayerを使ってi18nextのJSON翻訳を自動化する方法

## Intlayerとは何ですか？

**Intlayer**は、従来のi18nソリューションの欠点を解決するために設計された革新的なオープンソースの国際化ライブラリです。JavaScriptアプリケーションにおけるコンテンツ管理に対して、モダンなアプローチを提供します。

具体的な比較については、当社のブログ記事[Next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md)をご覧ください。

## なぜIntlayerをi18nextと組み合わせるのか？

Intlayerは優れた単独のi18nソリューションを提供します（[Next.js統合ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)を参照）が、いくつかの理由でi18nextと組み合わせたい場合があります：

1. **既存のコードベース**: 既に確立されたi18nextの実装があり、Intlayerの改善された開発者体験へ段階的に移行したい場合。
2. **レガシー要件**: プロジェクトが既存のi18nextプラグインやワークフローとの互換性を必要とする場合。
3. **チームの慣れ親しみ**: チームがi18nextに慣れているが、より良いコンテンツ管理を望んでいる場合。

**そのために、Intlayerはi18nextのアダプターとして実装でき、CLIやCI/CDパイプラインでのJSON翻訳の自動化、翻訳のテストなどを支援します。**

このガイドでは、i18nextとの互換性を維持しつつ、Intlayerの優れたコンテンツ宣言システムを活用する方法を示します。

## 目次

<TOC/>

## Intlayerとi18nextをセットアップするステップバイステップガイド

### ステップ1: 依存関係のインストール

必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**パッケージの説明:**

- **intlayer**: 国際化管理、コンテンツ宣言、およびビルドのためのコアライブラリ
- **@intlayer/sync-json-plugin**: Intlayerのコンテンツ宣言をi18next互換のJSON形式にエクスポートするプラグイン

### ステップ2: JSONをラップするためのIntlayerプラグインの実装

サポートするロケールを定義するためにIntlayerの設定ファイルを作成します：

**i18next用のJSON辞書もエクスポートしたい場合は、`syncJSON`プラグインを追加してください：**

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON`プラグインはJSONを自動的にラップします。コンテンツの構造を変更することなく、JSONファイルの読み書きを行います。

JSONとintlayerのコンテンツ宣言ファイル（`.content`ファイル）を共存させたい場合、Intlayerは以下の手順で処理します：

    1. JSONファイルとコンテンツ宣言ファイルの両方を読み込み、intlayerの辞書に変換します。

2. JSONとコンテンツ宣言ファイル間に競合がある場合、Intlayerはすべての辞書をマージします。プラグインの優先度およびコンテンツ宣言ファイルの優先度に応じて処理されます（すべて設定可能です）。

CLIを使用してJSONの翻訳を行った場合やCMSを使用した場合、Intlayerは新しい翻訳でJSONファイルを更新します。

## Git設定

自動生成されたIntlayerファイルは無視することを推奨します：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
```

これらのファイルはビルドプロセス中に再生成可能であり、バージョン管理にコミットする必要はありません。

### VS Code拡張機能

開発者体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールしてください：

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
