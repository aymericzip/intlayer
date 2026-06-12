---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Sync PO プラグイン
description: Intlayer 辞書を Gettext PO ファイルと同期します。Intlayer を使用してメッセージの管理、翻訳、テストを行いながら、既存の i18n を維持します。
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - 翻訳
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Sync PO プラグインの初期ドキュメント"
author: aymericzip
---

# Sync PO (i18n ブリッジ) - ICU / i18next サポート付きの Sync PO

既存の i18n スタックのアドオンとして Intlayer を使用します。このプラグインは、Gettext PO メッセージを Intlayer 辞書と同期させ、以下のことを可能にします。

- 既存の PO ベースの翻訳ワークフローを維持する。
- アプリをリファクタリングすることなく、Intlayer（CLI、CI、プロバイダー、CMS）を使用してメッセージを管理および翻訳する。
- Intlayer を PO 管理レイヤーとして提案しながら、各エコシステムをターゲットにしたチュートリアルや SEO コンテンツをリリースする。

注意点と現在の範囲：

- CMS への外部化は、翻訳と通常のテキストで機能します。
- 挿入、複数形/ICU、または PO エントリ自体の内部にある他のライブラリの高度なランタイム機能はまだサポートされていません。
- ビジュアルエディターは、サードパーティの i18n 出力ではまだサポートされていません。

### このプラグインを使用する場合

- すでに翻訳に Gettext PO ファイルを使用している場合。
- レンダリングランタイムを変更せずに、AI による補完、CI でのテスト、コンテンツ運用を行いたい場合。

## インストール

```bash
pnpm add -D @intlayer/sync-po-plugin
# または
npm i -D @intlayer/sync-po-plugin
```

## プラグイン

このパッケージは 2 つのプラグインを提供します。

- `loadPO`: PO ファイルを Intlayer 辞書にロードします。
  - このプラグインは、ソースから PO ファイルをロードして Intlayer 辞書に読み込むために使用されます。コードベース全体をスキャンして特定の PO ファイルを検索できます。
    このプラグインの使用例：
    - i18n ライブラリが PO ファイルの読み込み場所を制限しているが、コンテンツ宣言はコードベース内の好きな場所に配置したい場合。
    - リモートソース（例：CMS、API など）からメッセージを取得し、メッセージを PO ファイルに保存したい場合。

  > 内部的には、このプラグインはコードベース全体をスキャンして特定の PO ファイルを検索し、Intlayer 辞書に読み込みます。
  > このプラグインは、出力や翻訳を PO ファイルに書き戻さないことに注意してください。

- `syncPO`: PO ファイルを Intlayer 辞書と同期させます。
  - このプラグインは、PO ファイルを Intlayer 辞書と同期させるために使用されます。指定された場所をスキャンし、特定の PO ファイルのパターンに一致する PO をロードできます。このプラグインは、別の i18n ライブラリを使用しながら Intlayer の利点を得たい場合に役立ちます。

## 両方のプラグインの使用

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 現在の PO ファイルを Intlayer 辞書と同期させる
  plugins: [
    /**
     * src 内の {key}.i18n.po パターンに一致するすべての PO ファイルをロードします
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // `./locales/en/${key}.po` のファイルよりもこれらの PO ファイルが優先されるようにします
    }),
    /**
     * ロードし、出力と翻訳を locales ディレクトリの PO ファイルに書き戻します
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## `syncPO` プラグイン

### クイックスタート

プラグインを `intlayer.config.ts` に追加し、既存の PO 構造を指すようにします。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 現在の PO ファイルを Intlayer 辞書と同期させる
  plugins: [
    syncPO({
      // ロケール別、名前空間別のレイアウト
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

代替案：ロケールごとに 1 つのファイル：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### 仕組み

- 読み取り: プラグインは `source` ビルダーから PO ファイルを検出し、Intlayer 辞書として読み込みます。
- 書き込み: ビルドと補完の後、ローカライズされた PO を同じパスに書き戻します（適切な Gettext ヘッダー付き）。
- 自動補完: プラグインは各辞書の `autoFill` パスを宣言します。`intlayer fill` を実行すると、デフォルトで PO ファイルの不足している翻訳のみが更新されます。

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // 必須
  location?: string, // オプションのラベル、デフォルト: "sync-po::path/to/source"
  priority?: number, // 競合解決のためのオプションの優先度、デフォルト: 0
});
```

### 複数の PO ソースと優先度

複数の `syncPO` プラグインを追加して、異なる PO ソースを同期させることができます。これは、プロジェクトに複数の翻訳ソースや異なる PO 構造がある場合に役立ちます。

#### 優先度システム

複数のプラグインが同じ辞書キーをターゲットにしている場合、`priority` パラメーターによってどのプラグインが優先されるかが決まります。

- 優先度の高い数値が低い数値よりも優先されます
- `.content` ファイルのデフォルト優先度は `0` です
- プラグインのデフォルト優先度は `0` です
- 同じ優先度のプラグインは、設定に表示される順序で処理されます

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // 主要な PO ソース (最高優先度)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // フォールバック PO ソース (低い優先度)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // レガシー PO ソース (最低優先度)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load PO プラグイン

### クイックスタート

既存の PO ファイルを Intlayer 辞書として取り込むために、プラグインを `intlayer.config.ts` に追加します。このプラグインは読み取り専用です（ディスクへの書き込みはありません）。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // ソースツリー内の任意の場所にある PO メッセージを取り込む
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // プラグインインスタンスごとに単一のロケールをロードします (デフォルトは config の defaultLocale です)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

代替案：ロケール別のレイアウト、依然として読み取り専用（選択したロケールのみがロードされます）：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // このパターンから Locales.FRENCH のファイルのみが読み込まれます
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### 仕組み

- 発見: `source` ビルダーから glob を構築し、一致する PO ファイルを収集します。
- 取り込み: 各 PO ファイルを指定された `locale` で Intlayer 辞書として読み込みます。
- 読み取り専用: 出力ファイルを書き込んだりフォーマットしたりしません。ラウンドトリップ同期が必要な場合は `syncPO` を使用してください。
- 自動補完対応: `intlayer content fill` が不足しているキーを入力できるように `fill` パスを定義します。

### API

```ts
loadPO({
  // PO へのパスを構築します。構造にロケールセグメントがない場合、`locale` はオプションです。
  source: ({ key, locale }) => string,

  // このプラグインインスタンスによってロードされる辞書のターゲットロケール
  // デフォルトは configuration.internationalization.defaultLocale です
  locale?: Locale,

  // ソースを識別するためのオプションのラベル
  location?: string, // デフォルト: "plugin"

  // 他のソースとの競合解決に使用される優先度
  priority?: number, // デフォルト: 0
});
```

### 動作と規約

- `source` マスクにロケールプレースホルダーが含まれている場合、選択した `locale` のファイルのみが取り込まれます。
- マスクに `{key}` セグメントがない場合、辞書キーは "index" になります。
- キーは、`source` ビルダー内の `{key}` プレースホルダーを置き換えることにより、ファイルパスから派生します。
- プラグインは発見されたファイルのみを使用し、不足しているロケールやキーを捏造しません。
- `fill` パスは `source` から推測され、オプトインしたときに CLI を介して不足している値を更新するために使用されます。

## 競合解決

同じ翻訳キーが複数の PO ソースに存在する場合：

1. 優先度が最も高いプラグインが最終的な値を決定します
2. 優先度の低いソースは、不足しているキーのフォールバックとして使用されます
3. これにより、新しい構造に徐々に移行しながら、レガシーな翻訳を維持することができます

## CLI

同期された PO ファイルは、他の `.content` ファイルと同様に扱われます。つまり、同期された PO ファイルに対してすべての intlayer コマンドが利用可能になります。以下を含みます。

- `intlayer content test`: 不足している翻訳があるかどうかをテストします
- `intlayer content list`: 同期された PO ファイルをリストします
- `intlayer content fill`: 不足している翻訳を埋めます
- `intlayer content push`: 同期された PO ファイルをプッシュします
- `intlayer content pull`: 同期された PO ファイルをプルします

詳細は [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) を参照してください。

## 制限事項（現在）

- サードパーティライブラリをターゲットにする場合、挿入や複数形/ICU のサポートはありません。
- Intlayer 以外のランタイムでは、ビジュアルエディターはまだ利用できません。
- PO 同期のみ。PO 以外のカタログ形式はサポートされていません。

## なぜこれが重要なのか

- 確立された i18n ソリューションを推奨し、Intlayer をアドオンとして位置付けることができます。
- Intlayer を使用して PO を管理することを提案して終わるチュートリアルで、彼らの SEO/キーワードを活用します。
- 対応可能なオーディエンスを「新しいプロジェクト」から「すでに i18n を使用しているチーム」へと拡大します。
