---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Intlayerを使ったreact-i18nextのJSON翻訳の自動化方法
description: Reactアプリケーションの国際化を強化するために、Intlayerとreact-i18nextを使ってJSON翻訳を自動化する方法。
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - 国際化
  - i18n
  - ブログ
  - React
  - JavaScript
  - TypeScript
  - コンテンツ管理
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSONプラグインへの変更
---

# Intlayerを使ったreact-i18nextのJSON翻訳の自動化方法

## Intlayerとは何ですか？

**Intlayer**は、従来のi18nソリューションの欠点を解決するために設計された革新的なオープンソースの国際化ライブラリです。Reactアプリケーションにおけるコンテンツ管理に対して、モダンなアプローチを提供します。

具体的な比較については、当社のブログ記事[react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/react-i18next_vs_react-intl_vs_intlayer.md)をご覧ください。

## なぜIntlayerをreact-i18nextと組み合わせるのか？

Intlayerは優れた単独のi18nソリューションを提供します（[React統合ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)を参照）が、以下のような理由でreact-i18nextと組み合わせたい場合があります：

1. **既存のコードベース**: 既にreact-i18nextの実装があり、Intlayerの向上した開発者体験へ段階的に移行したい場合。
2. **レガシー要件**: プロジェクトが既存のreact-i18nextプラグインやワークフローとの互換性を必要とする場合。
3. **チームの慣れ親しみ**: チームがreact-i18nextに慣れているが、より良いコンテンツ管理を望んでいる場合。

**そのために、Intlayerはreact-i18nextのアダプターとして実装でき、CLIやCI/CDパイプラインでのJSON翻訳の自動化、翻訳のテストなどを支援します。**

このガイドでは、react-i18nextとの互換性を維持しながら、Intlayerの優れたコンテンツ宣言システムを活用する方法を示します。

## 目次

<TOC/>

## react-i18nextとIntlayerをセットアップするステップバイステップガイド

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

- **intlayer**: 国際化管理、コンテンツ宣言、ビルドのためのコアライブラリ
- **@intlayer/sync-json-plugin**: Intlayerのコンテンツ宣言をreact-i18next互換のJSON形式にエクスポートするプラグイン

### ステップ2: JSONをラップするためのIntlayerプラグインの実装

サポートするロケールを定義するIntlayer設定ファイルを作成します:

**react-i18next用のJSON辞書もエクスポートしたい場合は、`syncJSON`プラグインを追加してください:**

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

もし JSON と intlayer のコンテンツ宣言ファイル（`.content` ファイル）を共存させたい場合、Intlayer は以下の手順で処理します：

    1. JSONファイルとコンテンツ宣言ファイルの両方を読み込み、Intlayerの辞書に変換します。
    2. JSONファイルとコンテンツ宣言ファイルの間に競合がある場合、Intlayerはすべての辞書をマージします。これはプラグインの優先度やコンテンツ宣言ファイルの優先度に依存します（すべて設定可能です）。

CLIを使用してJSONの翻訳を行った場合やCMSを使用した場合、Intlayerは新しい翻訳でJSONファイルを更新します。

`syncJSON`プラグインの詳細については、[syncJSONプラグインのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)をご参照ください。

## Git設定

自動生成されたIntlayerファイルは無視することを推奨します：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

これらのファイルはビルドプロセス中に再生成可能であり、バージョン管理にコミットする必要はありません。

### VS Code拡張機能

開発者体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールしてください：

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
