---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Intlayerを使ってreact-i18nextのJSON翻訳を自動化する方法
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
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: loadJSONプラグインを追加
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSONプラグインに変更
---

# Intlayerを使ってreact-i18nextのJSON翻訳を自動化する方法

<iframe title="Intlayerを使ってreact-i18nextのJSON翻訳を自動化する方法" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Intlayerとは何ですか？

**Intlayer**は、従来のi18nソリューションの欠点を解決するために設計された革新的なオープンソースの国際化ライブラリです。Reactアプリケーションにおけるコンテンツ管理に対して、モダンなアプローチを提供します。

具体的な比較については、当社のブログ記事[react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/react-i18next_vs_react-intl_vs_intlayer.md)をご覧ください。

## なぜIntlayerをreact-i18nextと組み合わせるのか？

Intlayerは優れた単独のi18nソリューションを提供します（当社の[React統合ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)を参照）が、以下のような理由でreact-i18nextと組み合わせたい場合があります：

1. **既存のコードベース**: 既に確立されたreact-i18nextの実装があり、Intlayerの改善された開発者体験に徐々に移行したい場合。
2. **レガシー要件**: プロジェクトが既存のreact-i18nextプラグインやワークフローとの互換性を必要とする場合。
3. **チームの慣れ親しみ**: チームがreact-i18nextに慣れているが、より良いコンテンツ管理を望んでいる場合。
4. **Intlayerの機能利用**: コンテンツ宣言、翻訳の自動化、翻訳のテストなど、Intlayerの機能を活用したい場合。

**そのために、Intlayerはreact-i18nextのアダプターとして実装でき、CLIやCI/CDパイプラインでのJSON翻訳の自動化、翻訳のテストなどを支援します。**

このガイドでは、react-i18nextとの互換性を維持しながら、Intlayerの優れたコンテンツ宣言システムを活用する方法を示します。

## 目次

<TOC/>

## react-i18nextとIntlayerをセットアップするステップバイステップガイド

### ステップ1: 依存関係のインストール

必要なパッケージをインストールします:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**パッケージの説明:**

- **intlayer**: 国際化管理、コンテンツ宣言、およびビルドのためのコアライブラリ
- **@intlayer/sync-json-plugin**: Intlayerのコンテンツ宣言をreact-i18next互換のJSON形式にエクスポートするプラグイン

### ステップ2: JSONをラップするためのIntlayerプラグインの実装

サポートするロケールを定義するためのIntlayer設定ファイルを作成します。

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
      format: 'i18next',
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

`export default config;
```

`syncJSON`プラグインはJSONを自動的にラップします。コンテンツの構造を変更することなく、JSONファイルの読み書きを行います。

もしJSONとintlayerのコンテンツ宣言ファイル（`.content`ファイル）を共存させたい場合、Intlayerは以下の手順で処理します：

1. JSONファイルとコンテンツ宣言ファイルの両方を読み込み、intlayerの辞書に変換します。
2. JSONとコンテンツ宣言ファイル間に競合がある場合、Intlayerはすべての辞書をマージします。プラグインの優先度やコンテンツ宣言ファイルの優先度に応じて処理されます（すべて設定可能です）。

CLIを使ってJSONの翻訳を変更した場合やCMSを使用した場合、Intlayerは新しい翻訳でJSONファイルを更新します。

`syncJSON`プラグインの詳細については、[syncJSONプラグインのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)を参照してください。

### （オプション）ステップ3：コンポーネントごとのJSON翻訳の実装

デフォルトでは、IntlayerはJSONファイルとコンテンツ宣言ファイルの両方を読み込み、マージし、同期します。詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。しかし、必要に応じてIntlayerプラグインを使用して、コードベースのどこにでもあるJSONのローカライズをコンポーネント単位で管理することも可能です。

そのためには、`loadJSON`プラグインを使用できます。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 現在のJSONファイルをIntlayerの辞書と同期させる
  plugins: [
    /**
     * src内の{key}.i18n.jsonパターンに一致するすべてのJSONファイルを読み込みます
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // これらのJSONファイルが`./locales/en/${key}.json`のファイルより優先されることを保証します
    }),
    /**
     * ローカルディレクトリ内のJSONファイルに出力と翻訳を書き戻しながら読み込みます
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

これにより、`src` ディレクトリ内の `{key}.i18n.json` パターンに一致するすべての JSON ファイルが読み込まれ、Intlayer の辞書としてロードされます。

## Git 設定

自動生成された Intlayer ファイルは無視することを推奨します：

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

これらのファイルはビルドプロセス中に再生成可能であり、バージョン管理にコミットする必要はありません。

### VS Code 拡張機能

開発者体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールしてください：

[VS Code マーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
