---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer と vue-i18n
description: 包括的な Vue.js 国際化ソリューションのために Intlayer を vue-i18n と統合する
keywords:
  - vue-i18n
  - Intlayer
  - 国際化
  - ブログ
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: loadJSON プラグインを追加
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON プラグインへの変更と包括的な書き直し
---

# vue-i18n と Intlayer を使った Vue.js の国際化 (i18n)

## 目次

<TOC/>

## Intlayer とは？

**Intlayer** は、従来の i18n ソリューションの欠点を解決するために設計された革新的なオープンソースの国際化ライブラリです。Vue.js および Nuxt アプリケーションにおけるコンテンツ管理に対して、モダンなアプローチを提供します。

具体的な比較は、当社のブログ記事 [vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer.md) をご覧ください。

## なぜ Intlayer を vue-i18n と組み合わせるのか？

Intlayer は優れた単独の i18n ソリューションを提供します（[Vue.js 統合ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vue.md) を参照）が、いくつかの理由で vue-i18n と組み合わせたい場合があります：

1. **既存のコードベース**: 既に確立された vue-i18n の実装があり、Intlayer の改善された開発者体験へ段階的に移行したい場合。
2. **レガシー要件**: プロジェクトが既存の vue-i18n プラグインやワークフローとの互換性を必要とする場合。
3. **チームの慣れ**: チームが vue-i18n に慣れているが、より良いコンテンツ管理を望んでいる場合。
4. **Intlayer の機能利用**: コンテンツ宣言、翻訳の自動化、翻訳のテストなど、Intlayer の機能を利用したい場合。

**そのために、Intlayer は vue-i18n のアダプターとして実装でき、CLI や CI/CD パイプラインでの JSON 翻訳の自動化、翻訳のテストなどを支援します。**

このガイドでは、vue-i18nとの互換性を維持しながら、Intlayerの優れたコンテンツ宣言システムを活用する方法を示します。

---

## vue-i18nとIntlayerをセットアップするステップバイステップガイド

### ステップ1: 依存関係のインストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**パッケージの説明:**

- **intlayer**: コンテンツ宣言と管理のためのコアライブラリ
- **@intlayer/sync-json-plugin**: Intlayerのコンテンツ宣言をvue-i18nのJSON形式に同期するプラグイン

### ステップ2: JSONをラップするためのIntlayerプラグインの実装

サポートするロケールを定義するためにIntlayerの設定ファイルを作成します。

**vue-i18n用のJSON辞書もエクスポートしたい場合は、`syncJSON`プラグインを追加してください:**

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
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON`プラグインはJSONを自動的にラップします。コンテンツの構造を変更することなく、JSONファイルの読み書きを行います。

もしそのJSONとintlayerのコンテンツ宣言ファイル（`.content`ファイル）を共存させたい場合、Intlayerは以下の手順で処理します：

1. JSONファイルとコンテンツ宣言ファイルの両方を読み込み、intlayerの辞書に変換します。
2. JSONとコンテンツ宣言ファイルの間に競合がある場合、Intlayerはそれらすべての辞書をマージします。プラグインの優先度やコンテンツ宣言ファイルの優先度に応じて処理されます（すべて設定可能です）。

CLIを使ってJSONの翻訳を変更した場合やCMSを使用した場合、Intlayerは新しい翻訳でJSONファイルを更新します。

`syncJSON`プラグインの詳細については、[syncJSONプラグインのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)を参照してください。

---

### （オプション）ステップ3：コンポーネントごとのJSON翻訳の実装

デフォルトでは、IntlayerはJSONファイルとコンテンツ宣言ファイルの両方を読み込み、マージし、同期します。詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。しかし、必要に応じてIntlayerプラグインを使用して、コードベースのどこにでもあるJSONのローカライズをコンポーネントごとに管理することも可能です。

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
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

これは、`src` ディレクトリ内の `{key}.i18n.json` パターンに一致するすべての JSON ファイルを読み込み、Intlayer の辞書としてロードします。

---

## Git 設定

生成されたファイルをバージョン管理から除外します：

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

これらのファイルはビルドプロセス中に自動的に再生成されるため、リポジトリにコミットする必要はありません。

### VS Code 拡張機能

開発者体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールしてください：

[VS Code マーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
