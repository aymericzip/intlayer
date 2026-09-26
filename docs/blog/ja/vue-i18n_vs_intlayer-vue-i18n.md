---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "vue-i18n vs @intlayer/vue-i18n: 同じAPI、異なるBundle"
description: Vue 3アプリが vue-i18n の呼び出しを保持しながら、@intlayer/vue-i18n compat adapterを通じてそれらをサーブする場合の変更点。同じ Vite + Vue コード上での、ページごとのJavaScript、ランタイムサイズ、コンポーネントサイズとリークの測定、およびアダプターが保持、無視、および置き換えることができないものの説明。
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | 同じAPI、異なるBundle

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

`@intlayer/vue-i18n` は互換性アダプター：vue-i18n API (`createI18n`、`useI18n`、`t()`、`d()`、`n()`、`$t`、`v-t`、`i18n.global.locale`...) を公開し、Intlayer によってコンパイルされたディクショナリから提供します。`.vue` ファイルは変わりません。`t("footer.github")` がバインドされるものが変わるだけです。

この記事では、同じVite + Vue 3アプリケーションでこのスワップを測定します。このアプリケーションは`vue-i18n`で1回、アダプターで1回ビルドされました。数値は[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)から取得されています。ライブラリとして比較される`vue-i18n`とIntlayerについては、[vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer.md)と[vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer_benchmark.md)を参照してください。この記事は、コンポーネントをそのまま保つ場合にアダプターが何を変更するかについてです。

<TOC/>

> **tl;dr**: 同じ Vite + Vue 3 アプリで、`vue-i18n` を `@intlayer/vue-i18n` に置き換えると、ページごとの JavaScript が **134.9 KB から 47.0 KB** gzip に削減されました（i18n なしのアプリは 41.3 KB）、ランタイムが **24.3 KB から 7.9 KB**、平均コンポーネントが **196 KB から 8.4 KB**、他言語ページの文字列漏洩が **90% から 0%** に改善され、`.vue` ファイルは一切編集していません。`createI18n({ messages })` はフォールバックとして動作し続けます。JSON のインポートを削除すると上記の数値が得られます。SFC `<i18n>` ブロックとランタイム `setLocaleMessage()` は、引き継がれない 2 つの機能です。

## `@intlayer/vue-i18n` とは

`vue-i18n` はランタイムです。`createI18n({ messages: { en, fr, ... } })` はすべてのロケールのすべてのメッセージを保持するグローバルインスタンスを構築します。`useI18n()` は各コンポーネントをそれにバインドします。`t("footer.github")` はレンダリング時にツリーをウォークします。この設計により、SFC `<i18n>` ブロックと `setLocaleMessage()` が可能になり、各コンポーネントの依存グラフがツリー全体を含む理由でもあります。

`@intlayer/vue-i18n` はAPIを保持し、ツリーを置き換えます：

1. **インポートエイリアシング。** `@intlayer/vue-i18n/plugin` の `vueI18nVitePlugin()` は `vite-intlayer` をラップし、`vue-i18n` が `@intlayer/vue-i18n` に解決されるように `resolve.alias` を追加します。インポートは名前変更されません。
2. **JSONを真実のソースとする。** `syncJSON` プラグインは、既存の `locales/{locale}.json` を `format: "vue-i18n"` で読み込み（`{name}`、`{0}` リスト補間、`"car | cars"` パイプ複数形が正しく解析されます）、CLI または CMS が更新したときに翻訳を書き戻します。
3. **コール・サイト・バインディング。** Intlayer の最適化パスは `useI18n()` コール・サイトを書き直すため、コンポーネントはキー名の辞書を受け取り、アクティブなロケールでインポートとして存在し、bundler がトレースして分割できます。

```vue fileName="src/components/Footer.vue"
<!-- コードは変更されていません -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="What the compiler emits (simplified)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

コンポーネントはもはやグローバルなメッセージツリーに到達しません。`footer` に到達します。これが、以下のコンポーネントサイズの列が 196 KB から 8 KB に低下する理由です。

## アダプターが保持、無視、および置換しないもの

| `vue-i18n` API                                                      | `@intlayer/vue-i18n` を使用する場合                                                                                                                  |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ 保持。`t` キーは辞書に対して型チェックされます                                                                                                    |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ 保持。`{name}`、`{0}` およびパイプ区切りの複数形は以前のように解決されます                                                                        |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ 保持。`createI18n()` の `datetimeFormats` / `numberFormats` は尊重され、ネイティブ `Intl` によってサポートされます                                |
| `i18n.global.locale.value = "fr"`                                   | ✅ 保持。Intlayerのクライアントに支えられた`WritableComputedRef`。リアクティビティは以前と同じように動作します                                       |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ 保持。`app.use(i18n)`によって`app.config.globalProperties`に登録されます                                                                          |
| `v-t` ディレクティブ                                                | ✅ 保持                                                                                                                                              |
| `legacy: true`                                                      | ✅ 受け入れられます                                                                                                                                  |
| `createI18n({ messages })`                                          | ⚠️ `messages` は **ランタイムフォールバック** として使用されます（開発警告付き）。バンドル削減のため JSON インポートを削除してください               |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ 警告を表示して何もしません。ランタイムメッセージ読み込みはビルド時辞書に置き換わります                                                            |
| SFC `<i18n>` カスタムブロック                                       | ❌ 読み込まれません。これらのメッセージをロケール JSON（またはコンポーネント隣の `.content.ts`）に移動してください                                   |
| `@nuxtjs/i18n`                                                      | ⚠️ 別のアダプター、[Nuxt compat ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/nuxtjs-i18n.md)を参照してください |

## ベンチマーク

### 測定内容

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) スイートは、**同じ Vite + Vue 3 アプリケーション**を各セットアップでビルドします: **10 ページ**(home、about、blog、careers、contact、FAQ、pricing、products、settings、team)、**10 言語**(`en`、`fr`、`es`、`de`、`it`、`pt`、`zh`、`ja`、`ko`、`ru`)、同一のコンポーネントと同一のコンテンツ。ページは `en` と `fr` で測定されます。

どちらも **static** 設定でビルドされています。これは Vue プロジェクトが最も一般的に使用する設定です: `vue-i18n` では、すべてのロケールの JSON をインポートして `createI18n({ messages })` に渡されます。アダプターでは、同じコンポーネントで `vite.config.ts` と `intlayer.config.ts` を変更し、`messages` インポートを削除しています。参照用に、ネイティブな `vue-intlayer` が含まれています。

各ビルドについて、スイートは以下を記録します:

- **Lib size**: i18nライブラリのみをインポートする空のコンポーネントのgzip（および縮小）サイズ。
- **Page JS**: ページあたりにダウンロードされるgzip JavaScript、すべてのページとlocaleの平均。
- **Locale leak %**: ユーザーが**表示していない** localeに属する、ダウンロードされたJS内の翻訳文字列のシェア。
- **Page leak %**: ユーザーが**いないページ**に属する、ダウンロードされたJS内の翻訳文字列のシェア。
- **Component avg**: 個別にコンパイルされた各コンポーネントの平均gzipサイズ。
- **E2E reactivity**: 新しいlocaleを選択してからDOM内の`html[lang]`が更新されるまでの実経過時間（Playwright、5回の反復）。
- **Page load**: `PerformanceNavigationTiming.duration`。

> 以下の数値は **2026-09-12** の実行から取得したもので、`vue-i18n` 11.4.0 と `@intlayer/vue-i18n` 9.5.1 を使用しています。テストアプリケーションは意図的に小さく設計されており（ロケールあたり数十の文字列）、リーク率は**パターン**を示します：コンテンツが増えるにつれてリーク率は増加しますが、ランタイムコストは固定されたままです。

### Vite + Vue 3 での結果

関心のある指標とライブラリを選択してください：

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                    | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (no i18n)       | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | static   |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> ベースアプリのpage-leakカラムは空白のままです。i18nライブラリがない場合、フィンガープリンティングは共有チャンク内のハードコードされた文字列を拾い上げ、その数は意味がありません。

**読み方**

- **ページあたり88 KB少なく、同じコンポーネント。** `vue-i18n`はベースアプリの41.3 KBを**134.9 KB**に増やします。同じコンポーネントのアダプタビルドは**47.0 KB**に落ち着き、ベースアプリより5.7 KB多くなります。差異のほとんどは、`createI18n({ messages })`が毎ページに引き込む74.9 KBの`src/locales`とアダプタがブロックとしてバンドルしない部分です。
- **ランタイムが3倍縮小します。** `vue-i18n` のみをインポートするコンポーネントは **24.3 KB gzip / 83.2 KB minified** かかります: `@intlify/core-base`、メッセージコンパイラーと実行時です。アダプターは **7.9 KB / 23.2 KB** かかります。ほとんどが Intlayer のコアと `vue-i18n` API サーフェスです。
- **コンポーネント: 23倍小さくなります。** 単独でコンパイルされた `useI18n()` コンポーネントは平均 **196 KB** です。これは `t` が全ロケールの全メッセージを保持するインスタンスにバインドされているためです。アダプターの場合、同じコンポーネントは平均 **8.4 KB** です: 独自の辞書に到達します。
- **リーク.** `vue-i18n`はすべてのロケールとすべてのページの文字列をすべてのページに含めます：50%のロケールリーク（2つのフィンガープリント付きロケール上；10個のロケールがバンドルされている場合、実際の無駄はさらに高い）、90%のページリーク。アダプターは、各コンポーネントがその辞書のみをインポートするため、ページリークを**0%**に削減します。このロケールリークはこの`static`実行で15%です；`importMode: 'dynamic'`はそれを削除する設定であり、その設定はこのVue実行の一部ではありませんでした。
- **リアクティビティとページ読み込み.** ロケール切り替えは両者にとって安価です（1.5～2.8 ms）；Vueのリアクティビティシステムは、メッセージがメモリ内にあれば可能にします。ページ読み込みは13.6 msから**9.3 ms**に短縮され、88 KBのJavaScriptのパースが減少することと一致しています。
- **ネイティブ行について。** このrun で、`vue-intlayer` は `static` モードですべてのロケールをバンドルし、57.1 KB に到達し、3.9 KB のランタイムを実装しました。アダプタの同期辞書は外国語ロケール文字列が少なかったため、ページごとの数値が低くなりました。ネイティブランタイムは 3 つの中で最も軽量のままであり、その `.content.ts` モデルは SFC `<i18n>` ブロックが同等のものを見つける場所です。

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> すべてのライブラリと各戦略の完全な表は、[Vueベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/vue.md)をご覧ください。

## 数値が移動する理由

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

`src/components/` の何も変わっていないため、ゲインは `useI18n` がバインドされているものから来ています。

**`vue-i18n`を使用する場合**、バインディングはグローバルインスタンスです。`createI18n({ messages: { en, fr, ... } })`は everything を保持する1つのインポートであり、`useI18n()`を呼び出すすべてのコンポーネントはそのすべてにアクセスできるため、bundler はインスタンス以下で分割できません。最適化とは、_あなたが_`en.json`をルートごとに分割し、router guard で`setLocaleMessage()`を呼び出し、コンポーネントが移動するときにルートからファイルへのマップを正確に保つことを意味します。 無駄はページとロケールの2つの軸で同時に増加します：

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── locales
│   ├── en.json                    # すべてのページの文字列
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**`@intlayer/vue-i18n`を使用する場合**、バインディングは辞書です。`syncJSON`は`en.json`の各トップレベルキーを辞書に変換します。最適化パスはコンポーネントにそのキー名のものをハンドし、bundlerが追跡して分割するインポートとしています。

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # 変わらず、相変わらず信頼できるソース
│   └── fr.json
├── .intlayer/                     # 生成: トップレベルキーごと、ロケールごとの辞書
└── src
    ├── i18n.ts                    # createI18n({})   ← messages インポート削除
    ├── main.ts                    # app.use(i18n)    ← 変わらず
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← 変わらず
```

`i18n.ts`の`messages`インポートは削除する1行です。それが88 KBです。

## 3つのステップでの移行

<Steps>
<Step number={1} title="インストール">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

このコマンドは`vue-i18n`を検出し、`intlayer`、`vue-intlayer`、`@intlayer/vue-i18n`、`@intlayer/sync-json-plugin`をインストールし、`intlayer.config.ts`を事前入力します。`vue-i18n`をインストールしたままにしておいてください。これはピア依存関係であり、型を提供します。

</Step>
<Step number={2} title="ロケールファイルをIntlayerにポイントする">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static"はすべてのロケールをバンドルします。"dynamic"はアクティブなロケールをオンデマンドでロードします
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // vue-i18n方言: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json`はそのままの場所に保持されます。各トップレベルキー（`footer`、`hero`など）はdictionaryになります。

</Step>
<Step number={3} title="プラグインを追加してメッセージインポートを削除する">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// 前: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` は `vite-intlayer`（コンテンツ監視、辞書コンパイル、最適化パス）をラップし、`vue-i18n` をアダプターにエイリアスします。`messages` インポートを削除することで 88 KB が削減されます。削除しないままにすると、アプリは動作し続けますが、両方がシップされます。

</Step>
</Steps>

### 後で削除できる内容

| ファイル / パターン                                             | 理由                                                                                               |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `import en from "./locales/en.json"` およびそれらの関連ファイル | アダプターによるフォールバックとしてのみ使用される。88 KBはここから来ていた                        |
| ルーターガード内の `setLocaleMessage()`                         | 何もしない。ルートごとのロードはコンパイラーの仕事になった                                         |
| `@intlify/unplugin-vue-i18n`                                    | 不要：メッセージをプリコンパイルし、SFCブロックはアダプターが読み取らない                          |
| SFC `<i18n>` ブロック                                           | 読み込まれない；これらをロケール JSON または コンポーネントごとの `.content.ts` に移動してください |

### バイト数以外に得られるもの

- **型付きキー。** `t("footer.github")` はコンパイルされた `footer` 辞書に対して型付けされます；間違ったパスは、キーがテキストとしてレンダリングされる代わりに TypeScript エラーになります。
- **`npx intlayer test`** は、いずれかのロケールで欠落しているキーがある場合、CI に失敗します。**`npx intlayer fill`** は、あなた自身のプロバイダーキー（OpenAI、Anthropic、Mistral、Gemini...）を使用して欠落しているキーを翻訳し、`locales/{locale}.json` に書き戻します。
- **ビジュアルエディターと CMS** は同じ JSON で動作するため、開発者以外は UI を通じて編集でき、ファイルが更新されます。
- **`.content.ts` への段階的な移行。** 任意のコンポーネントは、co-located content ファイルを使用して `useI18n()` から `useIntlayer("footer")` に切り替えることができます。JSON と `.content.ts` の辞書は共存し、マージされます。

## 始める前に知っておくべき制限事項

<AccordionGroup>
<Accordion header="SFC <i18n> ブロックは読み取られません">

メッセージがコンポーネント内にある場合は、ロケールファイルまたは生成された型を持つ同じ概念の `.content.ts` に移動する必要があります。

</Accordion>
<Accordion header="ランタイムでのメッセージ読み込みは削除されました">

`setLocaleMessage()` および `mergeLocaleMessage()` は警告を出力して返ります。実行時にCMSから取得される翻訳には、[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) または `intlayer pull` / `push` コマンドが必要です。

</Accordion>
<Accordion header="messages はフォールバックであり、無料ではありません">

`createI18n()` 内のJSONインポートを保持すると、バンドル内に75 KBが残ります。`intlayer test` が成功したら削除してください。

</Accordion>
<Accordion header="アダプターはネイティブランタイムではありません">

`vue-intlayer` の3.9 KBに対してアダプターは7.9 KBです。すべてのコンポーネントが `useIntlayer` に移行したら削除してください。

</Accordion>
</AccordionGroup>

## どのような場合にどちらを使うか？

<AccordionGroup>
<Accordion header="vue-i18n を継続利用する">

アプリがSFC `<i18n>` ブロックやランタイムの `setLocaleMessage()` フローに依存している場合、またはページあたり90 KBがユーザー層にとって懸念事項でない場合。

</Accordion>
<Accordion header="@intlayer/vue-i18n を使用する">

`vue-i18n` を使用中で、`.vue` ファイルを編集せずに88 KBの削減、23倍小さいコンポーネント、0%のページリーク、型付けされたキー、CIチェックを実現したい場合。既存の `vue-i18n` コードベースのエントリポイントとなります。

</Accordion>
<Accordion header="ネイティブに移行する (vue-intlayer)">

新規プロジェクト、またはアダプターが役割を果たした後向けです。最も軽量なランタイム（3.9 KB）と、`<i18n>` ブロックを型付きコンテンツに置き換えるコンポーネント単位の `.content.ts` モデルを備えています。[VueとIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vue.md) または [Nuxtとの組み合わせ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nuxt.md) から始めてください。

</Accordion>
</AccordionGroup>

## よくある質問

<FAQ>

<Question title=".vue ファイルを編集する必要がありますか？">

いいえ。ベンチマークのビルドでは、`vite.config.ts`、`intlayer.config.ts`、そして `src/i18n.ts` 内の `messages` インポートの1行のみを変更しました。すべての `useI18n()`、`$t`、`v-t`、Options APIの呼び出し箇所はそのまま保持されました。

</Question>

<Question title="なぜコンポーネントサイズが23倍も小さいのですか？">

`useI18n()` がグローバルインスタンスの参照を停止するためです。`createI18n({ messages })` はすべてのロケールの全メッセージを保持するため、単独でコンパイルされたコンポーネントでも196 KBを引き込みます。アダプターを使用すると、自身の辞書のみにアクセスします：8.4 KB。

</Question>

<Question title="d() や n() のフォーマットはどうなりますか？">

維持されます。`createI18n()` に渡された `datetimeFormats` と `numberFormats` は尊重され、ネイティブの `Intl` APIによって処理されます。[日付、時間、数値のフォーマット](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/date_time_number_formatting_locales.md)をご覧ください。

</Question>

<Question title="Nuxt でも動作しますか？">

`@intlayer/vue-i18n` は Vite + Vue を対象としています。`@nuxtjs/i18n` については、[Nuxt i18n 互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/nuxtjs-i18n.md) を使用し、ネイティブ構成については [NuxtとIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nuxt.md) をご覧ください。

</Question>

<Question title="コンポーネントごとに段階的に移行できますか？">

はい。任意のコンポーネントで、同一ディレクトリのコンテンツファイルを使用して `useI18n()` から `useIntlayer("footer")` に切り替えることができます。JSON と `.content.ts` の辞書は共存してマージされます。

</Question>

</FAQ>

## 関連する比較

同じアダプターシリーズ：

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-intl_vs_intlayer-next-intl.md)
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer-lingui.md)

直接比較されたライブラリ：

- [vue-i18n vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer.md), features and DX
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer_benchmark.md)
- [Is vue-i18n outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/is_vue-i18n_outdated.md)
- [How to pick a Vue i18n library](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_vue_i18n_library.md)

リファレンスドキュメント：

- [Compat adapter: vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/vue-i18n.md) and [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/nuxtjs-i18n.md)
- [移行ガイド：vue-i18n から Intlayer へ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_vue-i18n_to_intlayer.md)
- [Vueベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/vue.md)
- [バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md) と [Intlayerコンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)
- [ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) および [AI翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)

## 結論

`@intlayer/vue-i18n` は `useI18n()` がバインドされるものを変更します：すべてのロケールのすべてのメッセージを保持するグローバルインスタンスから、そのコンポーネント用にコンパイルされたディクショナリーへ。同じ Vite + Vue 3 アプリで **ページあたり 88 KB削減**、**3倍小さいランタイム**、**23倍小さいコンポーネント** および **0% ページリーク** を実現し、設定ファイル、プラグインの一行、削除されたインポートのみで実装できます。SFC `<i18n>` ブロックとランタイムメッセージ読み込みの 2 つは実装されておらず、ネイティブ `vue-intlayer` ランタイムのサイズは引き続き半分です。

すべてのrawデータ、テストアプリ、スクリプトは[Benchmark Bloomリポジトリ](https://github.com/intlayer-org/benchmark-bloom)にあります。自分で実行してみてください。

詳細については、['Intlayerについて'ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)を参照してください。
