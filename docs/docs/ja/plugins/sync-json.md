---
createdAt: 2025-03-13
updatedAt: 2026-06-21
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
  - version: 9.0.0
    date: 2026-06-21
    changes: "splitKeys オプションを追加（next-intl / react-intl の単一ファイルレイアウト向けに、トップレベルの名前空間キーごとに1つの辞書）"
  - version: 7.5.0
    date: 2025-12-13
    changes: "ICUおよびi18next形式のサポートを追加"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Sync JSONプラグインの初期ドキュメント"
author: aymericzip
---

# Sync JSON（i18nブリッジ）- ICU / i18nextサポート付きSync JSON

<iframe title="IntlayerでJSON翻訳を同期状態に保つ方法" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Plugins

このパッケージは2つのプラグインを提供します：

- `loadJSON`: JSONファイルをIntlayer辞書にロードします。
  - このプラグインは、ソースからJSONファイルをロードし、Intlayer辞書にロードするために使用されます。コードベース全体をスキャンし、特定のJSONファイルを検索できます。
    このプラグインは以下の場合に使用できます。
    - JSONのロードに特定の場所を課すi18nライブラリ（例：`next-intl`、`i18next`、`react-intl`、`vue-i18n`など）を使用しているが、コンテンツ宣言をコードベースの好きな場所に配置したい場合。
    - リモートソース（例：CMS、APIなど）からメッセージをフェッチし、JSONファイルにメッセージを保存したい場合。

  > 内部的には、このプラグインはコードベース全体をスキャンし、特定のJSONファイルを検索してIntlayer辞書にロードします。
  > このプラグインは出力と翻訳をJSONファイルに書き戻さないことに注意してください。

- `syncJSON`: JSONファイルをIntlayer辞書と同期します。
  - このプラグインは、JSONファイルをIntlayer辞書と同期するために使用されます。指定された場所をスキャンし、特定のJSONファイルのパターンに一致するJSONをロードできます。このプラグインは、別のi18nライブラリを使用しながらIntlayerの利点を得たい場合に便利です。

## 両方のプラグインを使用する

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
     * src内のパターン {key}.i18n json に一致するすべてのJSONファイルをロードします
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // これらのJSONファイルが `./locales/en/${key}.json` のファイルよりも優先されるようにします
      format: "intlayer", // JSONコンテンツのフォーマット
    }),
    /**
     * ロケールディレクトリ内のJSONファイルに、出力と翻訳をロードして書き戻します
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### クイックスタート

`intlayer.config.ts`にプラグインを追加し、既存のJSON構造を指定します。

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // 現在のJSONファイルをIntlayerの辞書と同期させる
  plugins: [
    syncJSON({
      // ロケールごと、名前空間ごとのレイアウト（例：next-intl、名前空間付きのi18next）
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

代替案：ロケールごとに単一ファイル（i18next/react-intlのセットアップで一般的）：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### 動作の仕組み

- 読み込み：プラグインは`source`ビルダーからJSONファイルを検出し、それらをIntlayerの辞書として読み込みます。
- 書き込み：ビルドと補完の後、ローカライズされたJSONを同じパスに書き戻します（フォーマットの問題を避けるために末尾に改行を追加）。
- 自動補完: プラグインは各辞書に対して `autoFill` パスを宣言します。`intlayer fill` を実行すると、デフォルトで JSON ファイル内の欠落している翻訳のみが更新されます。

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // 必須
  location?: string, // オプションのラベル、デフォルト: "plugin"
  priority?: number, // コンフリクト解決のためのオプションの優先度、デフォルト: 0
  format?: 'intlayer' | 'icu' | 'i18next', // オプションのフォーマッター、Intlayerランタイム互換性のために使用
  splitKeys?: boolean, // オプション、単一ファイルをトップレベルキーごとに1つの辞書に分割（自動検出）
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

JSONファイルを同期する際に辞書コンテンツに使用するフォーマッターを指定します。これにより、Intlayerランタイムと互換性のある異なるメッセージフォーマット構文を使用できます。

- `undefined`: フォーマッターは使用されず、JSONコンテンツはそのまま使用されます。
- `'intlayer'`: デフォルトのIntlayerフォーマッター（デフォルト）。
- `'icu'`: ICUメッセージフォーマットを使用します（react-intl、vue-i18nなどのライブラリと互換性があります）。
- `'i18next'`: i18nextメッセージフォーマットを使用します（i18next、next-i18next、Solid-i18nextと互換性があります）。

> フォーマッターを使用すると、JSONコンテンツの入力と出力が変換されることに注意してください。ICU複数形などの複雑なJSONルールの場合、パースは入力と出力の1対1のマッピングを保証できない場合があります。
> Intlayerランタイムを使用しない場合は、フォーマッターを設定しない方が良いかもしれません。

**例：**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // 互換性のためにi18nextフォーマットを使用
}),
```

#### `splitKeys` (boolean)

**ファーストレベルのキーが名前空間である**単一のJSONファイルを、ファイル全体を保持する単一の辞書ではなく、トップレベルキーごとに1つの辞書にするかどうかを制御します。

これは、`next-intl`や`react-intl`のようなライブラリの名前空間モデルと一致します。これらのライブラリでは、1つの`messages/{locale}.json`ファイルが、そのファーストレベルのキーによって複数の名前空間をグループ化し、それぞれが独立してアドレス指定されます（例：`useTranslations('Hero')`は`Hero`辞書に解決されます）。

- `undefined` (デフォルト): **自動検出** — `source`パターンに`{key}`セグメントがない場合（1つのファイルがすべての名前空間を保持する場合）にファイルが分割され、それ以外の場合（キーごとに1つのファイル）は単一の辞書として保持されます。
- `true`: 常に各トップレベルキーを独自の辞書に分割します。
- `false`: 分割しません。ファイル全体が単一の辞書になります。

単一の`messages/{locale}.json`ファイルが与えられた場合：

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // パターンに`{key}`セグメントがないため、暗黙的に有効
}),
```

これにより、`Hero`、`Nav`、`About`の3つの辞書が生成され、`useTranslations('Hero')` (next-intl) が正しく解決されます。書き戻し時には、すべての名前空間が同じロケールごとのファイルに再結合されます。

> `source`に明示的な`{key}`セグメントを保持している場合（例：`./locales/${locale}/${key}.json`）、各ファイルはすでに1つの名前空間であるため、分割はデフォルトで無効になります。

### 複数の JSON ソースと優先度

複数の `syncJSON` プラグインを追加して異なる JSON ソースを同期することができます。これは、複数の i18n ライブラリや異なる JSON 構造をプロジェクトで使用している場合に便利です。

#### 優先度システム

複数のプラグインが同じ辞書キーを対象とする場合、`priority` パラメータがどのプラグインが優先されるかを決定します:

- 優先度の数値が高いものが低いものより優先される
- `.content` ファイルのデフォルト優先度は `0`
- プラグインのコンテンツファイルのデフォルト優先度は `-1`
- 同じ優先度のプラグインは、設定に記載された順序で処理されます

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
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
};

export default config;
```

## Load JSON plugin

### クイックスタート

`intlayer.config.ts`にプラグインを追加して、既存のJSONファイルをIntlayer辞書として取り込みます。このプラグインは読み取り専用です（ディスクへの書き込みは行いません）：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // ソースツリー内のどこにでも配置されたJSONメッセージを取り込む
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // プラグインインスタンスごとに単一のロケールをロード（設定のdefaultLocaleにデフォルト設定）
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

代替案：ロケールごとのレイアウト、読み取り専用（選択されたロケールのみがロードされます）：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // このパターンからはLocales.FRENCHのファイルのみがロードされます
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### 動作の仕組み

- 検出：`source`ビルダーからグロブを構築し、一致するJSONファイルを収集します。
- 取り込み：各JSONファイルを提供された`locale`を持つIntlayer辞書としてロードします。
- 読み取り専用：出力ファイルの書き込みやフォーマットは行いません。ラウンドトリップ同期が必要な場合は`syncJSON`を使用してください。
- 自動補完対応：`fill`パターンを定義し、`intlayer content fill`がCLI経由で不足しているキーを埋めることができます。

### API

```ts
loadJSON({
  // JSONへのパスを構築します。構造にロケールセグメントがない場合、`locale`はオプションです
  source: ({ key, locale }) => string,

  // このプラグインインスタンスによってロードされる辞書のターゲットロケール
  // デフォルトは configuration.internationalization.defaultLocale
  locale?: Locale,

  // ソースを識別するためのオプションのラベル
  location?: string, // デフォルト: "plugin"

  // 他のソースとのコンフリクト解決に使用される優先度
  priority?: number, // デフォルト: 0

  // JSONコンテンツのオプションのフォーマッター
  format?: 'intlayer' | 'icu' | 'i18next', // デフォルト: 'intlayer'

  // 単一ファイルをトップレベルキーごとに1つの辞書に分割（自動検出）
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

JSONファイルをロードする際に辞書コンテンツに使用するフォーマッターを指定します。これにより、さまざまなi18nライブラリと互換性のある異なるメッセージフォーマット構文を使用できます。

- `'intlayer'`: デフォルトのIntlayerフォーマッター（デフォルト）。
- `'icu'`: ICUメッセージフォーマットを使用します（react-intl、vue-i18nなどのライブラリと互換性があります）。
- `'i18next'`: i18nextメッセージフォーマットを使用します（i18next、next-i18next、Solid-i18nextと互換性があります）。

**例：**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // 互換性のためにICUフォーマットを使用
}),
```

#### `splitKeys` (boolean)

[`syncJSON`](#splitkeys-boolean) と同じ動作です。単一のJSONファイルがファーストレベルのキーによって複数の名前空間をグループ化する場合、各トップレベルキーが独自の辞書になります。

- `undefined` (デフォルト): **自動検出** — `source`パターンに`{key}`セグメントがない場合に分割され、それ以外の場合は単一の辞書になります。
- `true` / `false`: 分割を強制または無効にします。

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys auto-enabled: `Hero`、`Nav`、`About`などがそれぞれ辞書になります
}),
```

### Behavior and conventions

- `source`マスクにロケールプレースホルダーが含まれている場合、選択された`locale`のファイルのみが取り込まれます。
- マスクに`{key}`セグメントがない場合、ファイルの各トップレベルキーがデフォルトで独自の辞書になります（[`splitKeys`](#splitkeys-boolean)を参照）。代わりにファイル全体を単一の`index`辞書として読み込むには、`splitKeys: false`を設定します。
- キーは、`source`ビルダーの`{key}`プレースホルダーを置換することでファイルパスから派生します。
- プラグインは検出されたファイルのみを使用し、不足しているロケールやキーを捏造することはありません。
- `fill`パスは`source`から推測され、CLI経由で不足している値を更新するために使用されます（オプトインした場合）。

## Conflict resolution

同じ翻訳キーが複数のJSONソースに存在する場合：

1. 最も優先度の高いプラグインが最終的な値を決定します
2. 優先度の低いソースは、欠落しているキーのフォールバックとして使用されます
3. これにより、レガシー翻訳を維持しつつ、新しい構造へ段階的に移行できます

## CLI

同期されたJSONファイルは他の `.content` ファイルとして扱われます。つまり、すべてのintlayerコマンドが同期されたJSONファイルに対して利用可能です。以下を含みます：

- `intlayer content test` で翻訳漏れがないかテストする
- `intlayer content list` で同期されたJSONファイルの一覧を表示する
- `intlayer content fill` で翻訳漏れを補完する
- `intlayer content push` で同期されたJSONファイルをプッシュする
- `intlayer content pull` で同期されたJSONファイルをプルする

See [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) for more details.

## Limitations (current)

- サードパーティライブラリを対象とする場合、挿入や複数形/ICUのサポートはありません。
- 非Intlayerランタイム向けのビジュアルエディタはまだ利用できません。
- JSON同期のみ対応で、非JSONカタログ形式はサポートされていません。

## なぜこれが重要か

- 確立されたi18nソリューションを推奨し、Intlayerをアドオンとして位置付けることができます。
- チュートリアルの最後にIntlayerでJSONを管理することを提案することで、彼らのSEO/キーワードを活用できます。
- 対象ユーザーを「新規プロジェクト」から「すでにi18nを使用しているチーム全般」へと拡大します。
