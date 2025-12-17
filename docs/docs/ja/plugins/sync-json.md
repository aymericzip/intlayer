---
createdAt: 2025-03-13
updatedAt: 2025-12-13
title: Sync JSON プラグイン
description: Intlayerの辞書をサードパーティのi18n JSONファイル（i18next、next-intl、react-intl、vue-i18nなど）と同期します。既存のi18nを維持しながら、Intlayerでメッセージの管理、翻訳、テストを行えます。
keywords:
  - Intlayer
  - Sync JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - translations
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: ICUおよびi18next形式のサポートを追加
  - version: 6.1.6
    date: 2025-10-05
    changes: Sync JSONプラグインの初期ドキュメント
---

# Sync JSON（i18nブリッジ）- ICU / i18nextサポート付きSync JSON

<iframe title="IntlayerでJSON翻訳を同期状態に保つ方法" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

既存のi18nスタックにIntlayerをアドオンとして使用します。このプラグインはJSONメッセージをIntlayerの辞書と同期させるので、以下が可能です：

- i18next、next-intl、react-intl、vue-i18n、next-translate、nuxt-i18n、Solid-i18next、svelte-i18nなどをそのまま利用し続けることができます。
- アプリのリファクタリングなしで、Intlayer（CLI、CI、プロバイダー、CMS）を使ってメッセージを管理・翻訳できます。
- 各エコシステムをターゲットにしたチュートリアルやSEOコンテンツを配信しつつ、JSON管理レイヤーとしてIntlayerを提案できます。

注意事項と現在の対応範囲：

- CMSへの外部化は翻訳とクラシックテキストに対応しています。
- 挿入、複数形/ICU、その他ライブラリの高度なランタイム機能にはまだ対応していません。
- サードパーティのi18n出力に対するビジュアルエディターはまだサポートされていません。

### このプラグインを使うべきタイミング

- すでにi18nライブラリを使用しており、メッセージをJSONファイルに保存している場合。
- レンダリングランタイムを変更せずに、AI支援による入力、CIでのテスト、コンテンツ運用を行いたい場合。

## インストール

```bash
pnpm add -D @intlayer/sync-json-plugin
# または
npm i -D @intlayer/sync-json-plugin
```

## クイックスタート

`intlayer.config.ts`にプラグインを追加し、既存のJSON構造を指定します。

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 現在のJSONファイルをIntlayerの辞書と同期させる
  plugins: [
    syncJSON({
      // ロケールごと、名前空間ごとのレイアウト（例：next-intl、名前空間付きのi18next）
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

代替案：ロケールごとに単一ファイル（i18next/react-intlのセットアップで一般的）：

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### 動作の仕組み

- 読み込み：プラグインは`source`ビルダーからJSONファイルを検出し、それらをIntlayerの辞書として読み込みます。
- 書き込み：ビルドと補完の後、ローカライズされたJSONを同じパスに書き戻します（フォーマットの問題を避けるために末尾に改行を追加）。
- 自動補完: プラグインは各辞書に対して `autoFill` パスを宣言します。`intlayer fill` を実行すると、デフォルトで JSON ファイル内の欠落している翻訳のみが更新されます。

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // 必須
  location?: string, // オプションのラベル、デフォルト: "plugin"
  priority?: number, // コンフリクト解決のためのオプションの優先度、デフォルト: 0
  format?: 'intlayer' | 'icu' | 'i18next', // オプションのフォーマッター、デフォルト: 'intlayer'
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

JSONファイルを同期する際に辞書コンテンツに使用するフォーマッターを指定します。これにより、さまざまなi18nライブラリと互換性のある異なるメッセージフォーマット構文を使用できます。

- `'intlayer'`: デフォルトのIntlayerフォーマッター（デフォルト）。
- `'icu'`: ICUメッセージフォーマットを使用します（react-intl、vue-i18nなどのライブラリと互換性があります）。
- `'i18next'`: i18nextメッセージフォーマットを使用します（i18next、next-i18next、Solid-i18nextと互換性があります）。

**例：**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // 互換性のためにi18nextフォーマットを使用
}),
```

## 複数の JSON ソースと優先度

複数の `syncJSON` プラグインを追加して異なる JSON ソースを同期することができます。これは、複数の i18n ライブラリや異なる JSON 構造をプロジェクトで使用している場合に便利です。

### 優先度システム

複数のプラグインが同じ辞書キーを対象とする場合、`priority` パラメータがどのプラグインが優先されるかを決定します:

- 優先度の数値が高いものが低いものより優先される
- `.content` ファイルのデフォルト優先度は `0`
- プラグインのコンテンツファイルのデフォルト優先度は `-1`
- 同じ優先度のプラグインは、設定に記載された順序で処理されます

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // プライマリJSONソース（最も高い優先度）
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // フォールバックJSONソース（低い優先度）
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // レガシーJSONソース（最も低い優先度）
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### コンフリクト解決

同じ翻訳キーが複数のJSONソースに存在する場合：

1. 最も優先度の高いプラグインが最終的な値を決定します
2. 優先度の低いソースは、欠落しているキーのフォールバックとして使用されます
3. これにより、レガシー翻訳を維持しつつ、新しい構造へ段階的に移行できます

## 統合

以下は一般的なマッピング例です。ランタイムは変更せず、プラグインのみを追加してください。

### i18next

典型的なファイル構成: `./public/locales/{locale}/{namespace}.json` または `./locales/{locale}/{namespace}.json`。

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

ロケールごとのJSONメッセージ（多くの場合 `./messages/{locale}.json`）または名前空間ごと。

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

参照: `docs/ja/intlayer_with_next-intl.md`。

### react-intl

ロケールごとに単一のJSONが一般的:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

ロケールごと、またはネームスペースごとに単一ファイルを使用する場合：

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

同期されたJSONファイルは他の `.content` ファイルとして扱われます。つまり、すべてのintlayerコマンドが同期されたJSONファイルに対して利用可能です。以下を含みます：

- `intlayer content test` で翻訳漏れがないかテストする
- `intlayer content list` で同期されたJSONファイルの一覧を表示する
- `intlayer content fill` で翻訳漏れを補完する
- `intlayer content push` で同期されたJSONファイルをプッシュする
- `intlayer content pull` で同期されたJSONファイルをプルする

See [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md) for more details.

## 制限事項（現状）

- サードパーティライブラリを対象とする場合、挿入や複数形/ICUのサポートはありません。
- 非Intlayerランタイム向けのビジュアルエディタはまだ利用できません。
- JSON同期のみ対応で、非JSONカタログ形式はサポートされていません。

## なぜこれが重要か

- 確立されたi18nソリューションを推奨し、Intlayerをアドオンとして位置付けることができます。
- チュートリアルの最後にIntlayerでJSONを管理することを提案することで、彼らのSEO/キーワードを活用できます。
- 対象ユーザーを「新規プロジェクト」から「すでにi18nを使用しているチーム全般」へと拡大します。
