---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer と next-i18next
description: 包括的な Next.js 国際化ソリューションのために Intlayer を next-i18next と統合する
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - 国際化
  - ブログ
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON プラグインへの変更と包括的な書き直し
---

# next-i18next と Intlayer を使った Next.js の国際化 (i18n)

## 目次

<TOC/>

## next-i18next とは？

**next-i18next** は、Next.js アプリケーション向けの最も人気のある国際化（i18n）フレームワークの一つです。強力な **i18next** エコシステムの上に構築されており、Next.js プロジェクトにおける翻訳、ローカリゼーション、言語切り替えの管理に包括的なソリューションを提供します。

しかし、next-i18next にはいくつかの課題があります：

- **複雑な設定**：next-i18next のセットアップには複数の設定ファイルが必要であり、サーバーサイドとクライアントサイドの i18n インスタンスの慎重な設定が求められます。
- **翻訳ファイルの分散**：翻訳ファイルは通常、コンポーネントとは別のディレクトリに保存されているため、一貫性の維持が難しくなります。
- **名前空間の手動管理**：開発者は名前空間を手動で管理し、翻訳リソースが適切に読み込まれることを保証する必要があります。
- **限定的な型安全性**：TypeScript のサポートには追加の設定が必要であり、翻訳の自動型生成は提供されません。

## Intlayerとは？

**Intlayer** は、従来のi18nソリューションの欠点を解決するために設計された革新的なオープンソースの国際化ライブラリです。Next.jsアプリケーションにおけるコンテンツ管理に対してモダンなアプローチを提供します。

[next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md) のブログ記事で next-intl との具体的な比較をご覧ください。

## なぜ Intlayer を next-i18next と組み合わせるのか？

Intlayerは優れた単独のi18nソリューションを提供します（[Next.js統合ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)を参照）が、次のような理由でnext-i18nextと組み合わせたい場合があります。

1. **既存のコードベース**: 既にnext-i18nextの実装があり、Intlayerの改善された開発者体験へ段階的に移行したい場合。
2. **レガシー要件**: プロジェクトが既存のi18nextプラグインやワークフローとの互換性を必要とする場合。
3. **チームの慣れ親しみ**: チームがnext-i18nextに慣れているが、より良いコンテンツ管理を望んでいる場合。

**そのために、Intlayerはnext-i18nextのアダプターとして実装でき、CLIやCI/CDパイプラインでのJSON翻訳の自動化、翻訳のテストなどを支援します。**

このガイドでは、next-i18nextとの互換性を維持しながら、Intlayerの優れたコンテンツ宣言システムを活用する方法を示します。

---

## next-i18nextとIntlayerをセットアップするステップバイステップガイド

### ステップ1: 依存関係のインストール

お好みのパッケージマネージャーを使って必要なパッケージをインストールしてください：

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**パッケージの説明：**

- **intlayer**: コンテンツ宣言と管理のためのコアライブラリ
- **next-intlayer**: ビルドプラグインを備えたNext.js統合レイヤー
- **i18next**: コアi18nフレームワーク
- **next-i18next**: i18nextのNext.jsラッパー
- **i18next-resources-to-backend**: i18nextのための動的リソース読み込み
- **@intlayer/sync-json-plugin**: Intlayerのコンテンツ宣言をi18nextのJSON形式に同期するプラグイン

### ステップ2: JSONをラップするためのIntlayerプラグインの実装

サポートするロケールを定義するためにIntlayerの設定ファイルを作成します。

**i18next用のJSON辞書もエクスポートしたい場合は、`syncJSON`プラグインを追加してください:**

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

`syncJSON`プラグインはJSONを自動的にラップします。コンテンツの構造を変更することなく、JSONファイルの読み書きを行います。

JSONとintlayerのコンテンツ宣言ファイル（`.content`ファイル）を共存させたい場合、Intlayerは以下の手順で処理します：

    1. JSONファイルとコンテンツ宣言ファイルの両方を読み込み、intlayerの辞書に変換します。

2. JSONとコンテンツ宣言ファイル間に競合がある場合、Intlayerはすべての辞書をマージします。これはプラグインの優先順位やコンテンツ宣言ファイルの優先順位に依存します（すべて設定可能です）。

CLIを使用してJSONの翻訳を行った場合やCMSを使用した場合、Intlayerは新しい翻訳でJSONファイルを更新します。

---

## Git設定

生成されたファイルをバージョン管理から除外します：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
intl
```

これらのファイルはビルドプロセス中に自動的に再生成されるため、リポジトリにコミットする必要はありません。

### VS Code拡張機能

開発者体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールしてください：

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

2. JSONとコンテンツ宣言ファイル間に競合がある場合、Intlayerはすべての辞書をマージします。プラグインの優先度とコンテンツ宣言ファイルの優先度に応じて処理されます（すべて設定可能です）。

CLIを使用してJSONの翻訳を変更した場合やCMSを使用した場合、Intlayerは新しい翻訳でJSONファイルを更新します。

---

## Git設定

生成されたファイルをバージョン管理から除外します：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
intl
```

これらのファイルはビルドプロセス中に自動的に再生成されるため、リポジトリにコミットする必要はありません。

### VS Code拡張機能

開発者体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールしてください：

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
