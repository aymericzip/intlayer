---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Intlayerを使ったreact-intl JSON翻訳の自動化方法
description: Reactアプリケーションの国際化を強化するために、Intlayerとreact-intlを使ってJSON翻訳を自動化する方法。
keywords:
  - react-intl
  - Intlayer
  - 国際化
  - ブログ
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSONプラグインへの変更
---

# Intlayerを使ったreact-intl JSON翻訳の自動化方法

## Intlayerとは何か？

**Intlayer**は、従来のi18nソリューションの欠点を解決するために設計された革新的なオープンソースの国際化ライブラリです。Reactアプリケーションにおけるコンテンツ管理に対して、モダンなアプローチを提供します。

具体的な比較については、当社のブログ記事[react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/react-i18next_vs_react-intl_vs_intlayer.md)をご覧ください。

## なぜIntlayerをreact-intlと組み合わせるのか？

Intlayerは優れた単独のi18nソリューションを提供します（[React統合ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)をご覧ください）が、いくつかの理由でreact-intlと組み合わせたい場合があります：

1. **既存のコードベース**: 既にreact-intlの実装があり、Intlayerの優れた開発者体験へ段階的に移行したい場合。
2. **レガシー要件**: プロジェクトが既存のreact-intlプラグインやワークフローとの互換性を必要とする場合。
3. **チームの慣れ親しみ**: チームがreact-intlに慣れているが、より良いコンテンツ管理を求めている場合。

**そのために、Intlayerはreact-intlのアダプターとして実装でき、CLIやCI/CDパイプラインでのJSON翻訳の自動化、翻訳のテストなどを支援します。**

このガイドでは、react-intlとの互換性を保ちながら、Intlayerの優れたコンテンツ宣言システムを活用する方法を示します。

## 目次

<TOC/>

## react-intlとIntlayerをセットアップするステップバイステップガイド

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
- **@intlayer/sync-json-plugin**: Intlayerのコンテンツ宣言をreact-intl互換のJSON形式にエクスポートするプラグイン

### ステップ2: JSONをラップするためのIntlayerプラグインの実装

サポートするロケールを定義するためにIntlayerの設定ファイルを作成します：

**react-intl用のJSON辞書もエクスポートしたい場合は、`syncJSON`プラグインを追加してください：**

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

`syncJSON` プラグインは JSON を自動的にラップします。コンテンツの構造を変更することなく、JSON ファイルの読み書きを行います。

JSON と intlayer のコンテンツ宣言ファイル（`.content` ファイル）を共存させたい場合、Intlayer は以下の手順で処理します：

    1. JSON ファイルとコンテンツ宣言ファイルの両方を読み込み、intlayer の辞書に変換します。

2. JSONとコンテンツ宣言ファイル間に競合がある場合、Intlayerはすべての辞書をマージします。プラグインの優先度やコンテンツ宣言ファイルの優先度に応じて処理されます（すべて設定可能です）。

CLIを使用してJSONの翻訳を行った場合やCMSを使用した場合、Intlayerは新しい翻訳でJSONファイルを更新します。

`syncJSON`プラグインの詳細については、[syncJSONプラグインのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)をご参照ください。

## Git設定

自動生成されたIntlayerファイルは無視することを推奨します：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
```

これらのファイルはビルドプロセス中に再生成可能であり、バージョン管理にコミットする必要はありません。

### VS Code 拡張機能

開発者体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールしてください：

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
