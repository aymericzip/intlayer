---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Intlayerを使ってnext-intlのJSON翻訳を自動化する方法
description: Next.jsアプリケーションの国際化を強化するために、Intlayerとnext-intlを使ってJSON翻訳を自動化する方法。
slugs:
  - blog
  - intlayer-with-next-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSONプラグインへの変更
---

# Intlayerを使ってnext-intlのJSON翻訳を自動化する方法

## Intlayerとは？

**Intlayer**は、従来のi18nソリューションの欠点を解決するために設計された革新的なオープンソースの国際化ライブラリです。Next.jsアプリケーションにおけるコンテンツ管理に対してモダンなアプローチを提供します。

next-intlとの具体的な比較については、当社のブログ記事[ next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md)をご覧ください。

## なぜIntlayerをnext-intlと組み合わせるのか？

Intlayerは優れた単独のi18nソリューションを提供します（当社の[Next.js統合ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)を参照）が、いくつかの理由でnext-intlと組み合わせたい場合があります。

1. **既存のコードベース**: 既に確立されたnext-intlの実装があり、Intlayerの改善された開発者体験に徐々に移行したい場合。
2. **レガシー要件**: プロジェクトが既存のnext-intlプラグインやワークフローとの互換性を必要とする場合。
3. **チームの慣れ親しみ**: チームがnext-intlに慣れているが、より良いコンテンツ管理を望んでいる場合。

**そのために、Intlayerはnext-intlのアダプターとして実装でき、CLIやCI/CDパイプラインでのJSON翻訳の自動化、翻訳のテストなどを支援します。**

このガイドでは、next-intlとの互換性を維持しながら、Intlayerの優れたコンテンツ宣言システムを活用する方法を示します。

## 目次

<TOC/>

## next-intlとIntlayerをセットアップするステップバイステップガイド

### ステップ1: 依存関係のインストール

必要なパッケージをインストールします:

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
- **@intlayer/sync-json-plugin**: Intlayerのコンテンツ宣言をnext-intl互換のJSON形式にエクスポートするプラグイン

### ステップ 2: JSONをラップするためのIntlayerプラグインの実装

サポートするロケールを定義するためのIntlayer設定ファイルを作成します:

**next-intl用のJSON辞書もエクスポートしたい場合は、`syncJSON`プラグインを追加してください:**

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` プラグインは JSON を自動的にラップします。コンテンツの構造を変更することなく、JSON ファイルの読み書きを行います。

JSON と intlayer のコンテンツ宣言ファイル（`.content` ファイル）を共存させたい場合、Intlayer は以下の手順で処理します：

    1. JSON ファイルとコンテンツ宣言ファイルの両方を読み込み、intlayer の辞書に変換します。

2. JSONとコンテンツ宣言ファイル間に競合がある場合、Intlayerはすべての辞書をマージします。プラグインの優先順位やコンテンツ宣言ファイルの優先順位に応じて処理されます（すべて設定可能です）。

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
