---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl: 同じAPI、異なるBundle"
description: Next.js アプリケーションの next-intl インポートが @intlayer/next-intl compat アダプターによって提供される場合に何が変わるかを説明します。Bundle サイズ、リーケージ、コンポーネントサイズ、および同じコードで測定されたハイドレーション、およびアダプターが保持、無視、および置き換えることができない内容。
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | 同じAPI、異なるBundle

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` は互換性アダプタです。`next-intl` API (`useTranslations`、`getTranslations`、`useLocale`、`t.rich()`、ICU複数形、`NextIntlClientProvider`...)を公開し、Intlayerによってコンパイルされたディクショナリから提供します。アプリケーションコードは変わりません。bundleが変わります。

この記事は、同じNext.jsアプリケーションで2つを比較しており、1回は`next-intl`で構築し、もう1回はアダプタで構築しています。数値は[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)から得られており、これはブラウザが実際にダウンロードするものを記録するオープンソーススイートです。ライブラリとして`next-intl`とIntlayerの比較が必要な場合は、[next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer)をお読みください。このドキュメントは、コンポーネントをそのままにしておいたときにアダプタが何を変更するかについてです。

<TOC/>

> **tl;dr**: 同じNext.jsアプリで、`next-intl`を`@intlayer/next-intl`に置き換えることで、ページあたりのJavaScriptが**153.6 KBから147.5 KB** gzipに、平均コンポーネントが**21.8 KBから8.1 KB**に、外部ページの文字列漏洩が**約90%から0%**に、ハイドレーションが**14.7 msから12.8 ms**に短縮され、コンポーネント編集なしで達成されました。TanStack Startでは、`use-intl`の同等物（`@intlayer/use-intl`）がコンポーネントを**76-87 KBから9-11 KB**に削減し、ロケール切り替えを**7-21 msから4-9 ms**に短縮しました。アダプターのランタイムコストは**8.0 KB**（`next-intl`は**14.7 KB**、ネイティブ`next-intlayer`は**5.5 KB**）です。ナビゲーションとミドルウェアはIntlayerのルーティング設定で再実装されます。ローカライズされた`pathnames`は唯一引き継がれない機能です。

## `@intlayer/next-intl`とは何か

`next-intl` はランタイムです: `getRequestConfig` はリクエストごとに `messages/{locale}.json` を読み込み、`NextIntlClientProvider` がそれをクライアントに送り、`useTranslations("about")` がレンダリング時にそのオブジェクトからキーを読み込みます。すべての最適化（名前空間、ページごとの `pick(messages, [...])`、遅延読み込み）はあなたが書く必要があります。

`@intlayer/next-intl` はそのチェーンの最初と最後の部分を保つ代わりに、中間部分を置き換えます。あなたのコンポーネントは依然として `useTranslations("about")` を呼び出しますが、受け取る内容はビルド時にコンパイルされた Intlayer 辞書から来ており、そのコンポーネントにスコープされ、アクティブなロケールのみが含まれます。

3 つのメカニズムでこれを実現します:

1. **Import aliasing.** `createNextIntlPlugin()` from `@intlayer/next-intl/plugin` は `withIntlayer` をラップし、Webpack / Turbopack aliases を追加します。これにより、`next-intl`、`next-intl/server`、`next-intl/navigation`、`next-intl/middleware` が `@intlayer/next-intl` に解決されます。codebase 内のいかなる import も変更されません。
2. **JSON as source of truth.** `syncJSON` plugin は既存の `messages/{locale}.json` を読み取り、その top-level keys を namespace ごとに 1 つの dictionary に分割し、CLI または CMS がそれらを更新する際に同じファイルに翻訳を書き込みます。translator のワークフローは変わりません。
3. **Call-site binding。** Intlayer optimize pass (Babel または SWC) は `useTranslations("about")` を、`about` dictionary を直接受け取る呼び出しに書き換えます。コンポーネントはもはやグローバルメッセージツリーにアクセスせず、自身のコンテンツにアクセスします。

```tsx fileName="app/[locale]/about/page.tsx"
// あなたのコード、変更なし
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="What the compiler emits (simplified)"
// コンパイラが出力するもの (簡略版)
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

そのリライトが、以下のコンポーネントサイズとページリーケージのカラムが移動する理由です：ページは、それがレンダリングするコンポーネントの辞書のみを取得し、提供されているロケールでのみ取得します。

## アダプターが保持、無視、および置き換えないもの

| `next-intl` API                                                      | `@intlayer/next-intl`を使用している場合                                                                                                                |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ 保持。ビルド時に`ns`辞書にバインドされます。キーはコンテンツに対して型付けされます。                                                                |
| `getTranslations({ locale, namespace })`                             | ✅ 保持されています                                                                                                                                    |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ 保持されています。ICU plurals、`select`、`selectordinal`、`#`、`{ts, date, long}` は Intlayer の ICU resolver を通じて実行されます                  |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ 保持されています                                                                                                                                    |
| `useFormatter()`                                                     | ✅ 保持されています。`dateTime`、`number`、`relativeTime`、`list`、`dateTimeRange` はネイティブな `Intl` へ橋渡しされます                              |
| `NextIntlClientProvider`                                             | ✅ 維持。`messages`、`timeZone`、`now` プロップは**受け入れられていますが無視されます**（開発者向け警告が表示されます）                                |
| `getMessages()`                                                      | ✅ 互換性のため維持；もう必要ありません                                                                                                                |
| `getRequestConfig()` in `src/i18n.ts`                                | ⚠️ 不要。辞書はビルド時にコンパイルされます；リクエストごとのメッセージ読み込みはありません                                                            |
| `defineRouting()`                                                    | ✅ 維持。省略されたフィールド（`locales`、`defaultLocale`、`localePrefix`）は `intlayer.config.ts` から読み込まれます                                  |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ 保持。Intlayer のルーティング設定で再実装されます。`routing` 引数は受け入れられていますが無視されます                                               |
| `pathnames` (ローカライズされたルート名)                             | ❌ 型指定用に受け入れられます。**補間されません**。プレーンパス名を保つか、そのマッピングを Intlayer の `rewrite` に移動してください                   |
| `createMiddleware()`                                                 | ✅ 保持。Intlayer のプロキシを返します。`NEXT_LOCALE` cookie を設定するので、`useLocale()` とあなたのスイッチャーは機能し続けます                      |
| `NEXT_LOCALE` cookie                                                 | ✅ デフォルトで読み込まれます（`routing.storage` を自分で設定しない限り）                                                                              |
| Bare `useTranslations()` with no namespace                           | ⚠️ 動作しますが、呼び出しサイトがバインドされていません: ランタイムレジストリを通じて解決されます。バンドルの利得を得るには namespace を渡してください |

## ベンチマーク

### 測定内容

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) スイートは、各セットアップで**同じアプリケーション**をビルドします: **10 ページ** (home、about、blog、careers、contact、FAQ、pricing、products、settings、team)、**10 locales** (`en`、`fr`、`es`、`de`、`it`、`pt`、`zh`、`ja`、`ko`、`ru`)、同一のコンポーネントと同一のコンテンツ。ページは `en` と `fr` で測定されます。

`next-intl`は4つのローディング戦略で構築されました。単純なセットアップ(`messages/{locale}.json`全体を読み込む)から最適なもの(ルートごとに1つのnamespace + ページごとの`pick()`)まで。アダプターは**単純なセットアップと同じコンポーネント**で構築され、`next.config.ts`と`intlayer.config.ts`のみが変更されました。「scoped」バリアントはありません。コンパイラがコンポーネントごとにコンテンツをスコープするため、`static`と`dynamic`の行はすでにスコープされています。

各ビルドについて、スイートは以下を記録します:

- **Lib size**: i18nライブラリのみをインポートする空のコンポーネントのgzipサイズ。ランタイムの固定コスト。
- **Page JS**: ページごとにダウンロードされるgzip JavaScript。すべてのページとロケールで平均化されます。
- **ロケールリーク %**: ダウンロードされた JS に含まれる翻訳済み文字列のうち、ユーザーが表示していないロケールに属する文字列の割合。
- **ページリーク %**: ダウンロードされた JS に含まれる翻訳済み文字列のうち、ユーザーが閲覧していないページに属する文字列の割合。
- **Component avg**: 個別にコンパイルされた各コンポーネントの平均 gzip サイズ。単一のコンポーネントが i18n ランタイムとカタログにどの程度のオーバーヘッドをもたらすかを示します。
- **E2E reactivity**: 新しいロケールを選択してから DOM の `html[lang]` が更新されるまでの実際の時間 (Playwright、5 回のイテレーション)。
- **Hydration**: React ハイドレーション フェーズの継続時間。

> 以下の数値は **2026-09-12** に実施した実行結果です。`next-intl` / `use-intl` 4.14.2 および `@intlayer/*` 9.5.1 を使用しています。テストアプリケーションは意図的に小規模（ロケールあたり数十の文字列）であるため、リーケージのパーセンテージは**パターン**を説明しています。コンテンツが増えるにつれてリーケージは増加しますが、runtime のコストは固定のままです。

### Next.js での結果

関心のある指標とライブラリを選択してください：

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**読み方**

- **同じコンポーネント、ページあたり 6 KB 削減。** アダプター ビルドのナイーブなアプリは **147.5 KB** に到達し、完全に最適化されたもの (153.6 KB) を含む すべての `next-intl` 構成の下にあります。ランタイム自体が違い：8.0 KB 対 14.7 KB で、すべてのページで支払われます。
- **リークは何も変更することなく 0% に到達します。** ナイーブな `next-intl` セットアップは、すべてのページで外国ページ文字列の約 90% を配信しています。`next-intl` で 0% に到達するには、`scoped-*` セットアップが必要です：ルートごとに 1 つの namespace、および各ページで `pick(messages, [...])` を使用します。アダプターは、optimize パスが各 `useTranslations("ns")` をそれ独自の辞書にバインドするため、ナイーブなコードから 0% に到達します。
- **コンポーネントは 2.7 倍縮小されます。** 分離されたコンパイルされたコンポーネントは、`next-intl` の場合は平均 **21.8 KB**（プロバイダーとメッセージツリーに達します）で、アダプターの場合は **8.1 KB** です。`next-intl` の `scoped-static` セットアップでは、その数は **80 KB** に上がります。なぜなら、すべてのルートの namespace ファイルがそれを選択するページから到達可能になるからです。
- **Hydrationが2ms高速** (12.8 vs 14.7 ms): RSCペイロードから逆シリアル化するメッセージオブジェクトがないため、Reactが水和できます。
- **アダプターはネイティブランタイムではありません。** `next-intlayer`は**141.3 KB**で、ベースアプリの上に+0.3 KBで、5.5 KBのランタイムを備えています。アダプターはIntlayerのコア上に`next-intl` APIサーフェス(`useFormatter`、`t.rich`、ICUリゾルバ)を搭載しており、したがって8.0 KBと1ページあたり+6 KBです。これはブリッジであり、目的地ではありません。

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> すべてのライブラリと戦略の完全な表は、[Next.js ベンチマークレポート](https://intlayer.org/ja/doc/benchmark/nextjs)をご覧ください。

### TanStack Start上の結果 (`use-intl`)

`use-intl`は`next-intl`のフレームワークに依存しないコアです。そのアダプター`@intlayer/use-intl`は、Viteプラグイン(`@intlayer/use-intl/plugin`)を使用して同じ設計に従います。

| セットアップ             | ストラテジー   | Lib サイズ (gz) | ページ JS 平均 (gz) | ロケール漏洩 | ページ漏洩 | コンポーネント平均 (gz) | E2E レスポンシビティ | ハイドレーション |
| ------------------------ | -------------- | --------------: | ------------------: | -----------: | ---------: | ----------------------: | -------------------: | ---------------: |
| **base** (i18n なし)     | -              |          0.0 KB |            111.0 KB |         0.0% |       0.0% |                  0.7 KB |               8.1 ms |          21.6 ms |
| `use-intl`               | static         |         14.1 KB |            179.8 KB |        50.0% |      89.8% |                 76.0 KB |               6.7 ms |          15.3 ms |
| `use-intl`               | dynamic        |         14.1 KB |            119.4 KB |         0.0% |      89.8% |                 75.9 KB |               7.0 ms |          15.4 ms |
| `use-intl`               | scoped-static  |         14.1 KB |            128.7 KB |         0.0% |       0.0% |                 87.1 KB |              20.9 ms |          24.8 ms |
| `use-intl`               | scoped-dynamic |         14.1 KB |            128.7 KB |         0.0% |       0.0% |                 87.1 KB |              13.3 ms |          25.9 ms |
| **`@intlayer/use-intl`** | static         |      **7.3 KB** |            135.8 KB |        49.7% |   **0.0%** |             **10.9 KB** |           **4.2 ms** |      **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |      **7.3 KB** |        **129.7 KB** |     **0.0%** |   **0.0%** |              **9.3 KB** |           **8.7 ms** |          16.1 ms |
| `intlayer` (native)      | static         |          5.0 KB |            125.8 KB |        50.0% |       0.0% |                  8.1 KB |               3.2 ms |          11.5 ms |
| `intlayer` (native)      | dynamic        |          5.0 KB |            118.6 KB |         0.0% |       0.0% |                  6.3 KB |               3.6 ms |          14.1 ms |

**読み方**

- **ページあたりのバイト数は最適化された `use-intl` と同等です。** `@intlayer/use-intl` の `dynamic` モード (129.7 KB) は `use-intl` の `scoped-dynamic` (128.7 KB) と 1 KB の差以内であり、`use-intl` の通常の `dynamic` (119.4 KB) より 10 KB **上回っています**。その通常の `dynamic` 行は外部ページの文字列の 90% を依然リークしています。バイト数が低いのはテストアプリのコンテンツが小さいためです。アダプターの 0% はコンテンツが増加しても一定に保たれるものです。
- **コンポーネントは7～9倍小さい。** `use-intl`コンポーネントは平均**76～87 KB**でこれはすべての戦略で同じです。これは`useTranslations`がプロバイダーの全メッセージオブジェクトにバインドされているためです。アダプターは平均**9～11 KB**です。
- **ロケール切り替えが高速。** 最適化された`use-intl`セットアップは`html[lang]`を更新するのに**13～21 ms**かかります。アダプターは**4～9 ms**かかります。再レンダリングされるコンポーネントが少なく、メッセージツリーから再取得されるものがありません。
- **`static`はすべてのロケールを保持する。** アダプターの`static`行は49.7%のロケールリークを示しており、これはネイティブIntlayerの`static`モードと同じです。すべてのロケールがバンドルされ、ページの辞書のみが対象です。1行の設定（`importMode: 'dynamic'`）でこれを削除できます。

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> 完全な表は、[TanStack Start ベンチマークレポート](https://intlayer.org/ja/doc/benchmark/tanstack)をご覧ください。

## 数字が変わる理由

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

コンポーネント内では何も変更されていないため、利益はすべて`useTranslations`がバインドされているもの由来です。

**`next-intl`の場合**、バインディングはプロバイダーです。`NextIntlClientProvider`はロケールの`messages`オブジェクト全体を受け取り、すべての`useTranslations("about")`がそこから読み込まれます。バンドラーは1つのコンポーネントが1つのフックをインポートしており、そのフックが1つのコンテキストを読み込んでいることを認識しますが、`about`ブランチのみが使用されていることを知ることはできません。以下のルートはすべて同じメッセージオブジェクトを共有しているため、page-leakカラムは自分でファイルを分割するまで〜90%を読み込みます, そして無駄なオーバーヘッドは、ページとロケールの両軸で同時に増大します：

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # あらゆるnamespace、あらゆるpage
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**`@intlayer/next-intl`を使用する場合**、バインディングは辞書です。`syncJSON`は`messages/en.json`を1つのトップレベルキーごとに1つの辞書に変換します。コンパイラは`useTranslations("about")`を呼び出すコンポーネントを解決し、アクティブなロケールで`about`を直接渡します。これはbundlerが追跡して分割できるimportです。

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # 変更なし、真実のソースのまま
│   └── fr.json
├── .intlayer/                        # 生成: 名前空間とロケールごとに1つの辞書
└── src
    ├── middleware.ts                 # createMiddleware() は現在 Intlayer のプロキシを返します
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (messages prop なし)
        └── about/page.tsx            # useTranslations("about")  ← 変更なし
```

`src/i18n.ts` と `messages` prop は廃止されます。その他はすべて同じです。

## 3 つのステップでの移行

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

このコマンドは`next-intl`を検出し、`intlayer`、`next-intlayer`、`@intlayer/next-intl`、`@intlayer/sync-json-plugin`をインストールします。`next-intl`をインストール状態のままにしてください。これはアダプターのピア依存関係であり、型を提供しています。

</Step>
<Step number={2} title="Intlayerをメッセージに指す">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static"はすべてのロケールをバンドルします。"dynamic"はオンデマンドでアクティブなものをロードします
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // ICUプレースホルダー: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` はそのままの場所に留まります。各トップレベルのキーは辞書になります。`useTranslations("about")` は `about` 辞書にマッピングされます。

</Step>
<Step number={3} title="next.config.ts をラップする">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` は `withIntlayer` (コンテンツ監視、辞書コンパイル、最適化パス) と Webpack および Turbopack の `next-intl` → `@intlayer/next-intl` エイリアスを構成します。ビルドすれば、上記の表の数字があなたのものになります。

</Step>
</Steps>

### その後削除できるもの

| ファイル / パターン                          | 理由                                                                                                                             |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `src/i18n.ts` の `getRequestConfig`          | リクエストごとのメッセージ読み込みがありません。ファイルは `createNavigation` ヘルパーもエクスポートする場合のみ保持してください |
| `messages={...}` on `NextIntlClientProvider` | アダプターはコンパイル済み出力を読み込みます。このプロップは無視され、開発時に警告がログに記録されます                           |
| `await getMessages()` in layouts             | 同じ理由                                                                                                                         |
| Per-page `pick(messages, [...])`             | コンパイラーがコンポーネントごとにピッキングを実行します                                                                         |

### バイト数以上に得られるもの

- **型付きキー。** `useTranslations("about")` はコンパイル済み `about` 辞書に対して型チェックされます。`t("does.not.exist")` はランタイムのフォールバックではなく TypeScript エラーになります。
- **`npx intlayer test`** はロケールにキーが不足している場合にCIを失敗させます。**`npx intlayer fill`** は、選択したプロバイダー（OpenAI、Anthropic、Mistral、Gemini など）を使用して不足しているキーを翻訳し、独自のキーを使用して結果を `messages/{locale}.json` に書き込みます。
- **Visual Editor と CMS** は同じ辞書を操作するため、開発者以外のユーザーは UI を通じて `messages/fr.json` を編集でき、ファイルが更新されます。
- **`.content.ts` への段階的な移行。** どのコンポーネントでも、`useTranslations("about")` から `useIntlayer("about")` へ、コンポーネントの近くにあるコンテンツファイルとともに、一度に 1 つずつ切り替えることができます。JSON と `.content.ts` の辞書は共存してマージされます。

## 開始する前に知っておくべき制限事項

<AccordionGroup>
<Accordion header="ルーティング設定は intlayer.config.ts に移行します">

`createNavigation(routing)` と `createMiddleware(routing)` は関数のシグネチャを維持しますが引数は無視されます。ロケール、デフォルトロケール、プレフィックス戦略は Intlayer の `routing` 設定から取得されます。`next-intl` のローカライズされた `pathnames`（`/about` から `/a-propos`）を使用している場合、アダプターはそれらを補間しません。Intlayer の `routing.rewrite` がそのケースをカバーしますが、これは別の設定変更となります。

</Accordion>
<Accordion header="名前空間のない useTranslations() はバインドされません">

最適化パスは、インポートする辞書を特定するために静的な名前空間を必要とします。名前空間なしの呼び出しは、すべての辞書を参照するランタイムレジストリを介して引き続き動作しますが、これはまさに排除しようとしていたリークそのものです。名前空間を渡してください。

</Accordion>
<Accordion header="アダプターは完全な無料ではありません">

`next-intlayer` の 5.5 KB に対して 8.0 KB のランタイムが必要であり、ネイティブビルドと比較してページあたり +6-7 KB 増加します。これは `next-intl` API サーフェスを維持するための代償です。すべてのコンポーネントが `useIntlayer` に移行したら、アダプターを削除してください。

</Accordion>
<Accordion header="provider の messages、timeZone、now は無視されます">

フォーマッターはネイティブの `Intl` に基づいており、ロケールのみが出力に影響します。ハイドレーションが安定した日付のために強制的なタイムゾーンや固定の `now` に依存している場合は、呼び出し側で処理してください。[日付、時刻、数値のフォーマット](https://intlayer.org/ja/blog/date-time-number-formatting-locales)を参照してください。

</Accordion>
</AccordionGroup>

## どれを使うべきか?

<AccordionGroup>
<Accordion header="next-intl を使い続ける">

アプリが小さく、バンドルサイズが懸念事項ではなく、チームがページごとに名前空間と `pick()` を手動管理することに慣れている場合。

</Accordion>
<Accordion header="@intlayer/next-intl を使用する">

現在すでに `next-intl` を使用しており、コードを書き直すことなくバンドル削減、リーク防止、ハイドレーションの高速化、型付けされたキー、CLI / CMS ツールを活用したい場合。これは既存の `next-intl` コードベースにとって推奨されるエントリポイントです。

</Accordion>
<Accordion header="ネイティブ（next-intlayer）に移行する">

新規プロジェクト、またはアダプターがその役割を果たした後に適しています。3つの中で最も軽量であり（5.5 KB、ページあたり +0.3 KB）、同期サーバーコンポーネント、コンポーネントごとの `.content.ts` ファイル、およびすべてのフル機能を活用できます。[Next.js での Intlayer の導入](https://intlayer.org/ja/doc/environment/nextjs)から始めてください。

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="アプリケーションコードは本当に変更しなくてよいのですか？">

Next.js において、コンポーネントは変更不要です。ベンチマークのビルドでは `next.config.ts` と `intlayer.config.ts` のみを変更しました。`src/i18n.ts` 内の `getRequestConfig`、provider の `messages` プロパティ、およびページごとの `pick()` 呼び出しはデッドコードとなり、後から削除できます。

</Question>

<Question title="ICU メッセージはどうなりますか？">

そのまま動作し続けます。`t("key", { count })`、`t.rich()`、`t.markup()`、`select`、`selectordinal`、`#`、`{ts, date, long}` は Intlayer の ICU リゾルバーによって解決されます。[ICU メッセージフォーマット](https://intlayer.org/ja/blog/icu-message-format)を参照してください。

</Question>

<Question title="なぜアダプターはネイティブの next-intlayer より重いのですか？">

Intlayer コアの上に `next-intl` API サーフェス（`useFormatter`、`t.rich`、ICU リゾルバー、ナビゲーションヘルパー）を搭載しているためです。これにより 5.5 KB に対して 8.0 KB となり、ページあたり +6 KB 増加します。これは架け橋であり、最終目的地ではありません。

</Question>

<Question title="コンポーネントごとに段階的に移行できますか？">

はい。任意のコンポーネントで、同一階層に `.content.ts` を配置することで `useTranslations("about")` から `useIntlayer("about")` へ移行できます。JSON と `.content.ts` の辞書は共存してマージされます。

</Question>

<Question title="ローカライズされたパス名（pathnames）は機能しますか？">

`next-intl` の `pathnames` 経由では機能しません。アダプターは型チェック用に受け入れますが補間は行いません。代わりに Intlayer の `routing.rewrite` を使用してください。

</Question>

</FAQ>

## 関連する比較

同じアダプターシリーズ：

- [i18next vs @intlayer/i18next](https://intlayer.org/ja/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/ja/blog/lingui-vs-intlayer-lingui)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/ja/blog/vue-i18n-vs-intlayer-vue-i18n)

両ライブラリの直接比較：

- [next-intl vs Intlayer](https://intlayer.org/ja/blog/next-intl-vs-intlayer), 同じベンチマーク
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ja/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is next-intl outdated?](https://intlayer.org/ja/blog/is-next-intl-outdated)

参考ドキュメント：

- [Compat adapter: next-intl](https://intlayer.org/ja/doc/compatibility/next-intl)
- [移行ガイド：next-intl から Intlayer へ](https://intlayer.org/ja/doc/migration/next-intl)
- [Next.js ベンチマークレポート](https://intlayer.org/ja/doc/benchmark/nextjs) および [TanStack Start ベンチマークレポート](https://intlayer.org/ja/doc/benchmark/tanstack)
- [バンドル最適化](https://intlayer.org/ja/doc/concept/bundle-optimization) および [Intlayer コンパイラー](https://intlayer.org/ja/doc/compiler)
- [ビジュアルエディター](https://intlayer.org/ja/doc/concept/editor)、[CMS](https://intlayer.org/ja/doc/concept/cms) および [AI 翻訳](https://intlayer.org/ja/doc/concept/auto-fill)

## 結論

`@intlayer/next-intl` は 1 つのことを行います。`useTranslations` をバインドする対象を、すべてのメッセージを保持するプロバイダーから、そのコンポーネント用にコンパイルされた dictionary に変更します。**1 ページあたり 6 KB** の価値がある同じ Next.js アプリで、**2.7 倍小さいコンポーネント**、**0% のリーケージ** と **2 ms のハイドレーション** が実現でき、誰もコンポーネント ファイルを開く前に達成されます。Navigation と middleware は Intlayer のルーティング設定の上で API を維持し、ネイティブ `next-intlayer` ランタイムはさらに軽いままです。

すべてのraw data、テスト アプリ、およびスクリプトは [Benchmark Bloom リポジトリ](https://github.com/intlayer-org/benchmark-bloom) にあります。自分で実行してください。

詳細については、['Why Intlayer?' ドキュメント](https://intlayer.org/doc/why) を参照してください。
