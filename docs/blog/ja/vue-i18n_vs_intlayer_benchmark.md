---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer：2026年ベンチマーク"
description: 同じ Vite + Vue 3 アプリで vue-i18n と Intlayer を計測。ライブラリサイズ、ページあたりの JavaScript、コンテンツの漏れ、コンポーネントサイズ、ロケール切り替えのリアクティビティを、数値の解説付きで紹介します。
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Vue 国際化 (i18n) ベンチマーク

`vue-i18n` は Vue における i18n ライブラリの定番です。Intlayer はコンパイラベースでコンポーネント単位にスコープされた代替手段で、Vue 統合（`vue-intlayer`）を提供します。両者の[機能と開発者体験](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer.md)についてはすでに比較済みです。本記事では、アプリをビルドした後にそれぞれがどれだけのコストになるかを見ていきます。

データは [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) から取得しています。これは各ライブラリで同じアプリケーションをビルドし、ブラウザが実際にダウンロードして実行する内容を記録するオープンソースのスイートです。

<TOC/>

> **tl;dr**：同じ Vite + Vue 3 アプリで、`vue-i18n` はページあたり **134.9 KB** の gzip 圧縮 JavaScript を配信するのに対し、i18n なしのアプリは **41.3 KB** です。Intlayer は **57.1 KB** を配信します。`vue-i18n` のランタイムだけで **24.3 KB gzip**（Intlayer の 3.9 KB の 6 倍）あり、すべてのページが**他ページの文字列の 90%** を抱え、単体でコンパイルしたコンポーネントはグローバルなメッセージツリーに束縛されているため **196 KB** を引き込みます。`@intlayer/vue-i18n` アダプターは `vue-i18n` の API を維持しつつ、ページあたり **47.0 KB** を計測しました。

## 要約

- **vue-i18n** - Vue 2 / Vue 3 における事実上の標準 i18n ライブラリで、`@nuxtjs/i18n` の中核。ICU スタイルのメッセージ、SFC の `<i18n>` ブロック、`v-t` ディレクティブ、`d()` / `n()` フォーマッター、大規模なエコシステム。メッセージは `createI18n()` でグローバルインスタンスに登録され、ロケールごとの遅延読み込みは手動の `setLocaleMessage()` パターンで、ルートごとの分割は自分で構築する必要があります。
- **Intlayer** - コンポーネント中心のコンテンツモデル。`.content.ts` 辞書はそれを使うコンポーネントの隣に置かれ、ビルド時コンパイラ（`vite-intlayer`）がコンポーネント単位・ロケール単位でツリーシェイクと遅延読み込みを行い、コンテンツから厳密な TypeScript 型が生成され、翻訳の欠落はビルド時に失敗します。ルーター / SEO ヘルパー、ビジュアルエディター / CMS、AI 支援翻訳を同梱しています。

| ライブラリ            | GitHub スター                                                                                                                                                                  | 総コミット数                                                                                                                                                                       | 最終コミット                                                                                                                                        | 初版       | NPM バージョン                                                                                              | NPM ダウンロード                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | 2024年4月  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | 2016年12月 | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> バッジは自動的に更新されます。スナップショットは時間とともに変化します。

## 機能の比較一覧

| 機能                                                 | `vue-intlayer` (Intlayer)                                 | `vue-i18n`                                                                |
| ---------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| **コンポーネントの近くに翻訳を配置**                 | ✅ はい、`.content.ts` を各コンポーネントと同じ場所に配置 | ✅ SFC の `<i18n>` ブロック経由（任意）。グローバルカタログが一般的な構成 |
| **TypeScript 統合**                                  | ✅ コンテンツから厳密な型を自動生成                       | ✅ 良好な型定義。厳密なキー安全性にはスキーマの型付けと規律が必要         |
| **翻訳欠落の検出**                                   | ✅ TypeScript エラー + ビルド時のエラー/警告              | ⚠️ ランタイムのフォールバック + コンソール警告                            |
| **リッチコンテンツ（コンポーネント / Markdown）**    | ✅ 直接サポート                                           | ⚠️ `<i18n-t>` コンポーネント補間。Markdown は外部プラグイン経由           |
| **ICU サポート**                                     | ⚠️ 開発中                                                 | ✅ はい                                                                   |
| **フォーマット（日付、数値、通貨）**                 | ✅ Intl ベースのフォーマッター                            | ✅ `datetimeFormats` / `numberFormats` を使った `d()` / `n()`             |
| **ローカライズされたルーティング**                   | ✅ Vue Router / Nuxt 向けヘルパー、`getMultilingualUrls`  | ⚠️ コアではない（`@nuxtjs/i18n` またはカスタムルーター設定）              |
| **SEO ヘルパー（hreflang、sitemap、robots）**        | ✅ 組み込みヘルパー                                       | ❌ コアではない                                                           |
| **ツリーシェイキング（使用するコンテンツのみ配信）** | ✅ コンポーネント単位・ロケール単位で、コンパイラが自動化 | ⚠️ 手動：カタログを分割し、ルートごとに `setLocaleMessage()`              |
| **遅延読み込み**                                     | ✅ `importMode: 'dynamic'`（設定 1 行）                   | ✅ 手動の `import()` + `setLocaleMessage()`                               |
| **未使用コンテンツのパージ**                         | ✅ 未使用の辞書はビルド時に削除                           | ❌ 組み込みなし                                                           |
| **翻訳欠落のテスト（CLI / CI）**                     | ✅ `npx intlayer content test`                            | ⚠️ サードパーティ（`vue-i18n-extract`）                                   |
| **AI による翻訳**                                    | ✅ 組み込み、自身のプロバイダーキーを使用                 | ❌ なし                                                                   |
| **ビジュアルエディター / CMS**                       | ✅ 無料のビジュアルエディター + オプションの CMS          | ❌ なし（外部のローカライゼーションプラットフォーム）                     |
| **MCP サーバーと Agent Skills**                      | ✅ はい                                                   | ❌ なし                                                                   |
| **エコシステム / コミュニティ**                      | ⚠️ 小規模だが急成長中                                     | ✅ Vue エコシステムで大規模かつ成熟                                       |

## ベンチマーク

### 計測内容

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) スイートは、各ライブラリで**同じ Vite + Vue 3 アプリケーション**をビルドします：**10 ページ**（home、about、blog、careers、contact、FAQ、pricing、products、settings、team）、**10 ロケール**（`en`、`fr`、`es`、`de`、`it`、`pt`、`zh`、`ja`、`ko`、`ru`）、同一のコンポーネントと同一のコンテンツ。ページは `en` と `fr` で計測されます。

両ライブラリとも、ほとんどの Vue プロジェクトが出荷している **static** 構成でテストされました：`vue-i18n` では各ロケールの JSON をインポートして `createI18n({ messages })` に渡し、Intlayer ではデフォルトの `importMode: 'static'` を使用。このモードでは Intlayer もすべてのロケールをバンドルしますが、コンパイラは依然としてコンテンツを**コンポーネント単位**でスコープするため、ページはレンダリングするコンポーネントの辞書だけを抱えます。

各ビルドについて、スイートは以下を記録します：

- **Lib size**：i18n ライブラリのみをインポートする空のコンポーネントの gzip サイズ。ランタイムの固定コスト。
- **Page JS**：ページあたりにダウンロードされる gzip JavaScript。全ページ・全ロケールの平均。
- **Locale leak %**：ダウンロードされた JS に含まれる翻訳文字列のうち、ユーザーが閲覧して**いない**ロケールに属するものの割合（`en` と `fr` でフィンガープリントするため、50% は「もう一方の計測ロケールが完全に含まれている」ことを意味し、10 ロケールをバンドルした場合の実際の無駄はそれより大きい）。
- **Page leak %**：ダウンロードされた JS に含まれる翻訳文字列のうち、ユーザーが**いない**ページに属するものの割合。
- **Component avg**：各コンポーネントを単体でコンパイルしたときの平均 gzip サイズ。1 つのコンポーネントがどれだけの i18n ランタイムとカタログを引き込むかを示します。
- **E2E reactivity**：新しいロケールを選択してから DOM の `html[lang]` が更新されるまでの実時間（Playwright、5 回反復）。
- **Page load**：`PerformanceNavigationTiming.duration`。

> 以下の数値は、`vue-i18n` 11.4.0 と `intlayer` 9.5.0 / 9.5.1 を使用した **2026-09-12** の実行結果です。テストアプリケーションは意図的に小さく作られている（ロケールあたり数十の文字列）ため、漏れの割合は**パターン**を示すものです：コンテンツが増えるほど割合は大きくなり、一方でランタイムコストは固定のままです。

### Vite + Vue 3 での結果

| ライブラリ                    | 戦略   | Lib size (gz) | Lib size (min) | Page JS 平均 (gz) | Locale leak | Page leak | Component 平均 (gz) | E2E リアクティビティ | Page load |
| ----------------------------- | ------ | ------------: | -------------: | ----------------: | ----------: | --------: | ------------------: | -------------------: | --------: |
| **base**（i18n なし）         | -      |        0.0 KB |         0.0 KB |           41.3 KB |        0.0% |         - |              1.1 KB |               1.8 ms |   10.8 ms |
| `vue-i18n`                    | static |       24.3 KB |        83.2 KB |          134.9 KB |       50.0% |     90.0% |            196.0 KB |               2.8 ms |   13.6 ms |
| **`vue-intlayer`**            | static |    **3.9 KB** |    **11.1 KB** |       **57.1 KB** |       56.8% |  **0.0%** |          **7.7 KB** |           **4.5 ms** |   13.8 ms |
| `@intlayer/vue-i18n` (compat) | static |        7.9 KB |        23.2 KB |           47.0 KB |       15.0% |      0.0% |              8.4 KB |               1.5 ms |    9.3 ms |

> ベースアプリの page-leak 列は空欄です：i18n ライブラリがない場合、フィンガープリントは共有チャンク内のハードコードされた文字列を拾ってしまい、数値に意味がありません。

**読み方**

- **ランタイムコスト。** `vue-i18n` はベンチマーク全体で最も重いランタイムの 1 つです：それをインポートするだけの空コンポーネントで **24.3 KB gzip / 83.2 KB minified**。`vue-intlayer` は 3.9 KB gzip です。この差は、文字列がいくつあろうと、すべてのページで支払うことになります。
- **ページあたりの JavaScript。** i18n なしのアプリは 41.3 KB です。`vue-i18n` はそれを 3 倍以上の **134.9 KB** にします。Intlayer は **57.1 KB**、+15.8 KB で、そのほとんどはバンドルされた 10 ロケール分です（次の項目を参照）。
- **漏れ。** `createI18n({ messages: { en, fr, ... } })` では、すべてのページがすべてのロケールとすべてのページの文字列を配信します：**50% のロケール漏れ**（フィンガープリントした 2 ロケールで）と **90% のページ漏れ**。Intlayer の `static` モードもすべてのロケールをバンドルします（そのためロケール漏れの数値は同程度）が、**ページ漏れは 0%** です：ページはレンダリングするコンポーネントの辞書だけを取り込みます。`importMode: 'dynamic'` に切り替えるとロケール漏れも解消されますが、その構成は今回の Vue 実行には含まれていません。
- **コンポーネントサイズにアーキテクチャの差が現れます。** `useI18n()` を呼ぶコンポーネントは平均で **196 KB** にコンパイルされます。`t()` が全ロケールの全メッセージを保持するグローバルインスタンスに束縛されているからです。同じコンポーネントを `useIntlayer()` にすると **7.7 KB** にコンパイルされます：自身の辞書にしか届きません。
- **リアクティビティ**は両者とも問題になりません（2〜5 ms）。メッセージがメモリに載ってしまえば、Vue のリアクティビティシステムによりロケール切り替えは安価です。
- **`@intlayer/vue-i18n`**、ドロップインアダプターは `vue-i18n` の API を維持し、アプリケーションコードに手を加えずに**ページあたり 47.0 KB**、**コンポーネントあたり 8.4 KB** を計測しました。

> 参考までに、同じ実行で `fluent-vue` はページあたり 171.8 KB、ランタイム 29.7 KB、コンポーネントあたり 217 KB を計測しました。

## なぜ差が出るのか？グローバルインスタンス vs コンパイル済み辞書

`vue-i18n` はランタイムです。`createI18n()` がロケールごとのメッセージツリーを保持するグローバルインスタンスを構築し、`useI18n()` が各コンポーネントをそれに束縛し、`t("footer.github")` がレンダリング時にキーを検索します。これが SFC の `<i18n>` ブロック、`v-t`、ランタイムでのメッセージ読み込みを可能にしている一方で、すべてのコンポーネントの依存グラフにツリー全体が含まれる理由でもあります：

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # ロケールごとに 1 ファイル、全ページを含む
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

最適化するということは、**あなたが** `en.json` をルートごとのファイルに分割し、**あなたが**ルーターガードで `setLocaleMessage()` を呼び、**あなたが**コンポーネントの移動に合わせてルートとファイルの対応を正しく保つということです。ランタイムはコンポーネントがどのキーを要求するか知らないため、代わりにやってくれることはありません。

Intlayer はその知識をビルドに移します。コンテンツはコンポーネントの隣で宣言され、`vite-intlayer` がどのコンポーネントがどの辞書をインポートするかを解決します：

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

コンパイラは辞書ごと・ロケールごとに、そのコンポーネントが必要とする JSON だけを正確に出力し、どこからもインポートされない辞書は削除します。ルート単位のスコープはコンポーネント単位のスコープの帰結であって、作業ではありません。

> 未使用のロケールも削除するには、`intlayer.config.ts` で `dictionary.importMode: 'dynamic'` を設定してください。[バンドル最適化のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)を参照してください。

## 開発者体験

### セットアップ

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### コンポーネント

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` は、メッセージスキーマを自分で型付けするまでは単なる文字列です。タイポするとキーがそのまま表示されます。

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` と `increment` は型付けされています。タイポは TypeScript エラーになり、フランス語の値の欠落はビルドエラーになります。

### ロケールごとの遅延読み込み

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

その後、ルーターガードから `loadLocaleMessages()` を呼び、ページ単位のスコープが欲しければ `locales/{locale}.json` をルートごとに自分で分割します。

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## vue-i18n の API を維持したまま、Intlayer の出力を得る

`@intlayer/vue-i18n` はドロップインアダプターです：`useI18n()`、`t()`、`d()`、`n()`、`{name}` と `{0}` の補間、パイプ複数形（`"car | cars"`）、`v-t`、`i18n.global.locale` はそのまま動作し、`vite-intlayer` がコンパイルした Intlayer 辞書から提供されます。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

ベンチマークでは、同じアプリの compat ビルドはコンポーネントに手を加えずに、ページあたり **134.9 KB から 47.0 KB** に、コンポーネントあたり **196 KB から 8.4 KB** になりました。既存の `locales/{locale}.json` は JSON 同期プラグインを通じて引き続き信頼できる情報源として使えます。

[vue-i18n 移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_vue-i18n_to_intlayer.md)と[互換性ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/vue-i18n.md)を参照してください。Nuxt ユーザーは [`@nuxtjs/i18n` 互換性](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/nuxtjs-i18n.md)を通じて同じ道をたどれます。

## どちらを選ぶべきか？

- **vue-i18n を選ぶ**：標準的な Vue のアプローチが欲しい、ICU メッセージや SFC の `<i18n>` ブロックに依存している、すでに `@nuxtjs/i18n` を使っている、または翻訳プラットフォームが集中管理された JSON を要求する場合。バンドルサイズが重要なら、カタログの分割とルートごとの遅延読み込みに時間を確保してください。
- **Intlayer を選ぶ**：**コンポーネントスコープのコンテンツ**、**厳密な TypeScript**、**ビルド時のキー欠落エラー**、**手間いらずのツリーシェイキングと遅延読み込み**、組み込みの編集ツール（ビジュアルエディター、CMS、AI 翻訳、MCP サーバー）が欲しい場合。大規模でモジュール化された Vue / Nuxt コードベースやデザインシステムに特に適しています。
- **`@intlayer/vue-i18n` を選ぶ**：すでに `vue-i18n` を使っていて、書き直しなしでバンドルの削減効果を得たい場合。

## 関連する比較

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-intl_vs_intlayer.md)（同じベンチマーク）
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18next_vs_intlayer.md)（同じベンチマーク）
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer.md)（同じベンチマーク）
- [vue-i18n vs Intlayer（機能と DX）](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer.md)
- [vue-i18n は時代遅れ？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/is_vue-i18n_outdated.md)

## GitHub スター

GitHub スターはプロジェクトの人気、コミュニティの信頼、長期的な妥当性を示す強い指標です。技術的品質を直接測るものではありませんが、どれだけの開発者がそのプロジェクトを有用だと感じ、進捗を追い、採用する可能性があるかを反映しています。

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## 結論

`vue-i18n` は成熟していて柔軟で、Vue と深く統合されています。ベンチマークは、そのランタイムファーストの設計が Vite ビルドで何を犠牲にするかを示しています：**24 KB gzip のランタイム**、i18n なしなら 41 KB のアプリで**ページあたり 134.9 KB**、すべてのページに **90% の他ページコンテンツ**、そしてグローバルなメッセージツリーにぶら下がっているためにそれぞれ **196 KB** に達するコンポーネント。

Intlayer はその作業をコンパイラに移します。コンポーネント単位の辞書と未使用コンテンツのパージはビルド出力であって、慣習ではありません。同じアプリで：**3.9 KB のランタイム**、**ページあたり 57.1 KB**、**ページ漏れ 0%**、コンポーネントは **25 分の 1**。そして書き直しが選択肢にない場合でも、`@intlayer/vue-i18n` はコンポーネントに手を加えずにその大部分を実現します。

生データ、テストアプリ、スクリプトはすべて [Benchmark Bloom リポジトリ](https://github.com/intlayer-org/benchmark-bloom)にあります。ぜひご自身で実行してみてください。

詳細は [「なぜ Intlayer？」ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)を参照してください。
