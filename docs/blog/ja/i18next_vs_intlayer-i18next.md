---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs @intlayer/i18next: 同じAPI、異なるバンドルサイズ"
description: ReactやNext.jsアプリがi18next、react-i18next、next-i18nextの呼び出しを維持したまま、@intlayer/i18nextアダプターを経由して提供された場合に何が変わるのか。同一コードで測定されたページごとのJavaScript、コンポーネントサイズ、文字列リーク、ハイドレーション、そしてアダプターが保持・無視・置換できない機能を解説します。
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - 互換アダプター
  - 移行
  - 国際化
  - i18n
  - ベンチマーク
  - バンドルサイズ
  - ブログ
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | 同じAPI、異なるバンドルサイズ

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/i18next`、`@intlayer/react-i18next`、`@intlayer/next-i18next` は互換アダプターです。既存のコードが使用している `i18next` のAPI（`useTranslation`、`t()`、`<Trans>`、`i18n.changeLanguage()`、`getFixedT`、`serverSideTranslations` など）をそのまま公開し、Intlayerによってコンパイルされた辞書からデータを提供します。コンポーネント自体は変更されず、内部のランタイムのみが置き換わります。

本記事では、同一のNext.jsアプリケーションを `next-i18next` と `@intlayer/next-i18next` のそれぞれでビルドしてその差異を測定しました。数値は [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) から引用しています。ライブラリ単体としての `i18next` と Intlayer の比較については [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18next_vs_intlayer.md) をご覧ください。本記事では、既存のコードをそのまま維持した状態でアダプターが何をもたらすかに焦点を当てます。

<TOC/>

> **要約 (tl;dr)**: 同一のNext.jsアプリにおいて、`next-i18next` を `@intlayer/next-i18next` に置き換えることで、ページごとのJavaScriptサイズがgzipで **218.5 KB から 150.7 KB** へ削減され（基本構成比）、完全に最適化された `next-i18next` の構成（163.4 KB）よりもさらに **12.7 KB** 小さくなりました。コンポーネントの平均サイズは **78.5 KB から 9.7 KB** に激減し、他ページの文字列リークは **~90% から 0%** に、ハイドレーション時間は **15.6 ms から 11.3 ms** に、ランタイム自体も **19.7 KB から 9.4 KB** に縮小しました。コンポーネントの書き換えは不要で、Providerファイルを1つ差し替えるだけで導入可能です。`i18next` のプラグイン（バックエンド、言語検出器）は受け入れられますが何もしません。ランタイム時にロードや検出を行う必要がなくなるためです。

## `@intlayer/i18next` とは

`i18next` はランタイムです。`i18n.init({ resources })` やバックエンドプラグインによって `locales/{lng}/{ns}.json` がグローバルインスタンスに読み込まれ、`useTranslation("about")` でコンポーネントが購読し、`t("title")` がレンダリング時にキーを検索します。名前空間、遅延読み込み、ページごとの名前空間リスト、型安全性はすべて開発者が手動で構成・維持する必要があります。

互換アダプターはAPIを維持しつつ、そのインスタンスを置き換えます。

1. **インポートのエイリアス化。** `@intlayer/next-i18next/plugin` の `createNextI18nPlugin()`（または `withI18next`）が `withIntlayer` をラップし、Webpack / Turbopack のエイリアスを追加することで、`next-i18next`、`react-i18next`、`i18next` がそれぞれの `@intlayer/*` パッケージに解決されるようにします。Vite環境では `@intlayer/react-i18next/plugin` の `reactI18nextVitePlugin()` が同様の処理を行います。インポート文を変更する必要はありません。
2. **信頼できる唯一の情報源としてのJSON。** `syncJSON` プラグインが既存の `locales/{lng}/{ns}.json` を `format: "i18next"` で読み込み（`{{name}}`、`$t()` のネスト、`_one` / `_other`、コンテキストサフィックスを正常に解析）、CLIやCMSによる更新時に翻訳を書き戻します。
3. **コールサイト（呼び出し箇所）でのバインディング。** Intlayerの最適化パスが `useTranslation("about")` を書き換え、アクティブなロケールにおける `about` 辞書を直接受け取る呼び出しに変換します。これにより、コンポーネントはグローバルストアを参照しなくなります。

```tsx fileName="components/About.tsx"
// あなたのコード（変更なし）
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="コンパイラが出力するコード（簡略化版）"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

このコード書き換えこそが、後述のコンポーネントサイズ縮小やページリーク解消の原動力となっています。

## アダプターが保持、無視、および代替しない機能

| `i18next` API                                                                   | `@intlayer/*` を適用した場合                                                                                          |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ 保持。ビルド時に `ns` 辞書へバインドされ、コンテンツに沿って型付けされます                                         |
| `t("key", { name })`, `{{interpolation}}`, `$t(key)` ネスト                     | ✅ 保持                                                                                                               |
| `key_one` / `key_other` 複数形、`key_male` コンテキスト、`returnObjects`        | ✅ 保持。複数形は `Intl.PluralRules` で評価されます                                                                   |
| `components`、番号付きタグ `<1>...</1>`、`values` を持つ `<Trans>`              | ✅ 保持                                                                                                               |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ 保持                                                                                                               |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ 保持。`changeLanguage` がIntlayerのロケールを切り替えます                                                          |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ 保持                                                                                                               |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` はプラグインの `init` を呼んで即終了します。読み込みや検出の対象がなくなるためです                         |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` は警告付きで**無視**されます。バンドル削減の恩恵を得るためにJSONインポートを削除してください           |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ `IntlayerProvider` をレンダリングします。`i18n` プロパティは無視されます。App Routerではロケールを渡します（後述） |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ 期待通りのオブジェクト構造を返しますが何も読み込みません。残しても削除しても無害です                               |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ 保持                                                                                                               |
| `next-i18next.config.js`                                                        | ⚠️ 読み込まれません。ロケール設定は `intlayer.config.ts` で管理します                                                 |
| 名前空間を指定しない素の `useTranslation()`                                     | ✅ ファイル全体の `translation` 辞書に対して解決されます（`splitKeys: false`）                                        |

## ベンチマーク

### 測定対象

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) スイートは、各構成で**同一のアプリケーション**をビルドして検証しています。**10ページ**（home、about、blog、careers、contact、FAQ、pricing、products、settings、team）、**10ロケール**（`en`、`fr`、`es`、`de`、`it`、`pt`、`zh`、`ja`、`ko`、`ru`）、同一のコンポーネントおよびコンテンツで構成され、`en` と `fr` のページを測定しています。

`next-i18next` は、全ロケールのJSONを `resources` に直接インポートする構成（`static`）から、ルートごとに名前空間を分離してバックエンド経由で遅延ロードする構成（`scoped-dynamic`）まで、4つの読み込み戦略でビルドされました。アダプターは**基本構成と同一のコンポーネント**を用い、`next.config.ts`、`intlayer.config.ts`、およびProviderファイルのみを変更してビルドされました。コンパイラがコンポーネント単位でコンテンツをスコープ化するため、手動の "scoped" バリアントは不要です。

各ビルドで以下の指標を記録しています。

- **Lib size**: i18nライブラリのみをインポートした空コンポーネントのgzipサイズ。
- **Page JS**: 全ページ・全ロケールの平均ダウンロードJavaScriptサイズ（gzip）。
- **Locale leak %**: ダウンロードされたJSのうち、ユーザーが**閲覧していない**ロケールに属する翻訳文字列の割合。
- **Page leak %**: ダウンロードされたJSのうち、ユーザーが**滞在していない**ページに属する翻訳文字列の割合。
- **Component avg**: 各コンポーネントを個別にコンパイルした場合の平均gzipサイズ。
- **E2E reactivity**: 新しいロケールを選択してからDOM内の `html[lang]` が更新されるまでの実測時間（Playwright、5回試行）。
- **Hydration**: Reactのハイドレーションフェーズにかかる時間。

> 下記の測定値は **2026-09-12** 時点のもので、`next-i18next` 16.3.0（`react-i18next` 17.0.13、`i18next` 26.4.2）および `@intlayer/next-i18next` 9.5.1 を使用しています。テストアプリは意図的に軽量化（1言語あたり数十行）されているため、リーク率は**傾向**を示しています。コンテンツが増えるほどリーク量は膨張しますが、ランタイムの固定コストは変わりません。

### Next.js での検証結果

関心のある指標とライブラリを選択してください：

<I18nBenchmark framework="nextjs" vertical/>

| 構成                         | 戦略           | Libサイズ (gz) | ページJS平均 (gz) | ロケールリーク | ページリーク | コンポーネント平均 (gz) | E2E反応速度 | ハイドレーション |
| ---------------------------- | -------------- | -------------: | ----------------: | -------------: | -----------: | ----------------------: | ----------: | ---------------: |
| **base** (i18nなし)          | -              |         0.0 KB |          141.0 KB |           0.0% |         0.0% |                  0.9 KB |     13.4 ms |          11.8 ms |
| `next-i18next`               | static         |        19.7 KB |          218.5 KB |           0.0% |        89.8% |                 78.5 KB |     16.4 ms |          15.6 ms |
| `next-i18next`               | dynamic        |        19.7 KB |          169.5 KB |          50.0% |        89.8% |                 26.1 KB |     15.4 ms |          27.7 ms |
| `next-i18next`               | scoped-static  |        19.7 KB |          220.1 KB |           0.0% |        89.8% |                 78.9 KB |     16.4 ms |          14.7 ms |
| `next-i18next`               | scoped-dynamic |        19.7 KB |          163.4 KB |           0.0% |         0.0% |                 27.1 KB |     15.9 ms |          15.1 ms |
| **`@intlayer/next-i18next`** | static         |     **9.4 KB** |      **150.7 KB** |       **0.0%** |     **0.0%** |              **9.7 KB** | **10.7 ms** |      **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |     **9.4 KB** |      **150.7 KB** |       **0.0%** |     **0.0%** |              **9.7 KB** | **11.9 ms** |      **10.6 ms** |
| `next-intlayer` (ネイティブ) | static         |         5.5 KB |          141.3 KB |           0.0% |         0.0% |                  8.5 KB |     15.5 ms |          16.9 ms |
| `next-intlayer` (ネイティブ) | dynamic        |         5.5 KB |          141.3 KB |           0.0% |         0.0% |                  6.9 KB |     15.3 ms |          15.9 ms |

**データの読み解き方**

- **基本構成比でページあたり68 KBの軽量化。** `resources: { en, fr, ... }` の構成では、すべてのロケールと全名前空間が毎ページ送信され **218.5 KB** に達します。同一コンポーネントをアダプター経由でビルドすると **150.7 KB** に抑制されます。また、`i18next` のランタイム単体で19.7 KBあるのに対しアダプターは9.4 KBであるため、`next-i18next` の最も綿密な最適化構成（163.4 KB）よりもさらに12.7 KB軽量です。
- **コンポーネントに手を加えることなくリーク率0%を達成。** 手動で厳密に分割した設定を除き、従来の `next-i18next` は約90%もの他ページ用文字列を同梱してしまいます。`dynamic` 設定ではページ間リークが残る上に、言語別バックエンドが `translation` 名前空間全体を取得するため **50%のロケールリーク** が新たに発生します。アダプター構成では、既存コードのままで 0% / 0% を達成します。
- **コンポーネントが約8分の1のサイズに。** 単体コンパイルされた `useTranslation()` コンポーネントは、`t` がグローバルストアに束縛されているため、インライン `resources` で平均 **78.5 KB**、バックエンド構成でも **26〜27 KB** に達します。アダプターを導入すると平均 **9.7 KB** まで激減します。
- **ハイドレーションと切り替え速度の向上。** ハイドレーション時間は15.6 msから **11.3 ms** に短縮されます（バックエンド取得がクリティカルパスに乗る `dynamic` の27.7 msと比較すると大幅な改善）。ロケール切り替えも15〜16 msから **11〜12 ms** へ高速化します。
- **アダプターはネイティブランタイムとは別物。** `next-intlayer` はベースアプリ比わずか+0.3 KBの **141.3 KB** です。アダプターはIntlayerのコア上に `i18next` のAPI互換レイヤー（補間構文、複数形・コンテキスト解決、`<Trans>` 解析）を保持しているため、ネイティブ比で+9.4 KBとなります。これは移行のための架け橋であり、最終ゴールではありません。

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> すべてのライブラリと各戦略の完全な表は、[Next.jsベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)をご覧ください。

> Vite / TanStack Start 環境での `react-i18next` アダプターはこのテストには含まれていません。TanStack Start における基準値は [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18next_vs_intlayer.md) で確認できます。

## なぜ数値が改善するのか

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

`components/` 配下のソースコードは一切変わっていません。この改善は、`useTranslation` が何にバインドされているかの違いによるものです。

**`i18next` の場合**、コンポーネントはグローバルインスタンスにバインドされます。インスタンスに読み込まれたデータ（`static` の全言語、`dynamic` のアクティブ言語全体）は、`useTranslation()` を呼びすすべてのコンポーネントから参照可能になります。バンドラーはインスタンスが保持している単位未満にはコードを分割できず、ランタイムもどのキーが必要とされるかを予測できません。

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # 全ページの文字列
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

インスタンスが保持するすべてのものが各ページに送信され、無駄はページと言語の2つの軸で増加します：

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**`@intlayer/next-i18next` の場合**、コンポーネントは辞書ファイルに直接バインドされます。`syncJSON` が各名前空間ファイルを辞書に変換し、最適化パスが指定された辞書だけを直接インポートとしてコンポーネントに渡すため、バンドラーはページごと・ロケールごとに過不足なくコード分割できます。

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # 変更不要、信頼できる情報源のまま
│   └── fr/translation.json
├── .intlayer/                        # 生成物: 名前空間・ロケールごとに1つの辞書
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← 変更なし
```

`i18n/i18n.ts` やその `resources` インポートは不要なデッドコードとなり、これによって68 KBの削減が実現します。

## 3ステップでの移行手順

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

このコマンドは `i18next` / `react-i18next` / `next-i18next` を自動検出し、`intlayer`、フレームワークパッケージ（`next-intlayer` または `react-intlayer`）、対応する `@intlayer/*` アダプター、および `@intlayer/sync-json-plugin` をインストールして `intlayer.config.ts` を初期設定します。元のパッケージは型定義の提供およびピア依存関係として必要となるため、インストールしたままにしておきます。

</Step>
<Step number={2} title="ロケールファイルを指定する">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // i18nextの方言: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // 名前空間ごとのファイル構成: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

言語ごとに単一の `translation.json` のみを使用している場合（i18nextのデフォルト名前空間）、`splitKeys: false` を設定することでファイル全体が単一辞書として保持され、名前空間なしの `useTranslation()` もそのまま動作します。

</Step>
<Step number={3} title="プラグインを追加する">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

App Routerでは、クライアントコンポーネントは `[locale]` セグメントからロケールを取得します。アダプターの `I18nextProvider` はロケール引数を取らないため、Providerファイルを一度だけ更新します。

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

配下の全コンポーネントは引き続き `useTranslation()` をそのまま呼び出せます。

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` は `vite-intlayer` をラップし、`react-i18next` と `i18next` のエイリアスを設定します。React以外のプロジェクトでは、`@intlayer/i18next/plugin` の `i18nextVitePlugin()` が `i18next` 単体をエイリアス化します。

</Tab>
</Tabs>

</Step>
</Steps>

### 移行後に削除できるコード

| ファイル / パターン                                    | 削除できる理由                                                                                |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` および関連JSONインポート  | アダプターによって無視されます。ここに68 KB分の原因がありました                               |
| `i18next-http-backend`, `i18next-resources-to-backend` | 実行時に取得するものがなくなります                                                            |
| `i18next-browser-languagedetector`                     | ロケール検出はIntlayerのルーティング設定（URLプレフィックス、Cookie、ヘッダー）に統合されます |
| `getStaticProps` 内の `serverSideTranslations()`       | 空のオブジェクトを返すだけとなり、削除しても動作に影響しません                                |
| `next-i18next.config.js`                               | 読み込まれません。設定はすべて `intlayer.config.ts` で管理します                              |
| ページごとの `ns: [...]` 定義リスト                    | コンパイラがコンポーネント単位で必要な名前空間を自動判別します                                |

### 容量削減以外のメリット

- **型付けされたキー。** `useTranslation("about")` はコンパイルされた `about` 辞書に対して型付けされ、存在しないキー `t("does.not.exist")` は文字列ではなくTypeScriptのエラーとして即座に検出されます。
- **`npx intlayer test`** で、いずれかの言語に欠落キーがある場合にCIを失敗させることができます。また **`npx intlayer fill`** を使えば、自身のAPIキー（OpenAI、Anthropic、Mistral、Geminiなど）で未翻訳キーを自動翻訳し、`locales/{lng}/{ns}.json` に書き戻せます。
- **ビジュアルエディターとCMS** が同一のJSON上で動作するため、翻訳者がUI経由でテキストを編集するとGitリポジトリ上のファイルが直接更新されます。
- **`.content.ts` への段階的移行が可能。** コンポーネントごとに個別のコンテンツファイルを配置し、`useTranslation("about")` から `useIntlayer("about")` へ少しずつ切り替えることができます。JSONと `.content.ts` 辞書は完全に共存可能です。

## 事前に把握しておくべき制限事項

<AccordionGroup>
<Accordion header="バックエンドと検出器は機能しません">

`i18n.use(HttpBackend)` はプラグインの init を呼び出すだけで、他には何もしません。アプリが実行時にCMSから翻訳を取得することに依存していた場合、そのフローは利用できなくなります。代わりに [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) または `intlayer pull` / `push` コマンドを使用してください。言語検出はIntlayerのルーティング設定（URLプレフィックス、cookie、ヘッダー）に置き換わります。

</Accordion>
<Accordion header="resources はマージされず、無視されます">

他のアダプターとは異なり、`@intlayer/i18next` はインラインの `resources` をフォールバックとして使用しません。すべてのキーは同期された辞書内に存在する必要があり、これは `intlayer test` で検証されます。

</Accordion>
<Accordion header="App Router ではプロバイダーの編集が必要です">

上記に示した1つのファイルのみです。`appWithTranslation` を使用する Pages Router では何も変更する必要はありません。

</Accordion>
<Accordion header="next-i18next.config.js は読み取られません">

`localePath`、`fallbackLng`、`reloadOnPrerender` などに相当するものはありません。ロケールとフォールバックは `intlayer.config.ts` から取得されます。

</Accordion>
<Accordion header="アダプターには一定のコストがあります">

`next-intlayer` に対してランタイムが 9.4 KB、ページあたり +9.4 KB 増加します。すべてのコンポーネントが `useIntlayer` に移行したら、アダプターを削除してください。

</Accordion>
</AccordionGroup>

## 選択の指針

<AccordionGroup>
<Accordion header="i18next を継続利用する">

アプリが実行時バックエンド（リクエスト時にCMSから提供される翻訳）、プラグインエコシステム、またはアダプターが対応していない非Reactターゲットに依存している場合。

</Accordion>
<Accordion header="@intlayer/* を使用する">

`react-i18next` / `next-i18next` を使用中で、コードを書き直さずに 68 KB の削減、8倍小さいコンポーネント、0%のリーク、型付けされたキー、CIチェックを実現したい場合。既存の `i18next` コードベースへのエントリポイントとなります。

</Accordion>
<Accordion header="ネイティブに移行する (next-intlayer / react-intlayer)">

新規プロジェクト、またはアダプターが役割を果たした後向けです。最も軽量なランタイム（5.5 KB、ページあたり +0.3 KB）を備え、同期サーバーコンポーネントおよびコンポーネント単位の `.content.ts` ファイルを利用可能にします。[Next.jsとIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md) または [ViteおよびReact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md) から始めてください。

</Accordion>
</AccordionGroup>

## よくある質問

<FAQ>

<Question title="68 KB の削減はどこから得られるのですか？">

`resources: { en, fr, ... }` からです。素朴な `next-i18next` セットアップでは、各言語のJSONを `init()` にインポートするため、すべてのページが全言語の全名前空間を持ち運びます（ページあたり **218.5 KB**）。アダプターはそのブロックを一切バンドルせず、各コンポーネントにアクティブな言語で指定された辞書のみを渡します。

</Question>

<Question title="<Trans> コンポーネントは引き続き動作しますか？">

はい、`components`、番号付きの `<1>...</1>` タグ、`values` をサポートしています。`{{interpolation}}`、`$t(key)` のネスト、`key_one` / `key_other` の複数形（`Intl.PluralRules` による評価）、コンテキストサフィックス、`returnObjects` も同様に動作します。

</Question>

<Question title="言語ごとに単一の translation.json を使用している場合はどうなりますか？">

`syncJSON` プラグインで `splitKeys: false` を設定してください。ファイル全体が1つの辞書として保持され、シンプルな `useTranslation()` が引き続きそれに対して解決されます。

</Question>

<Question title="これは Intlayer への完全な移行と同じですか？">

いいえ、移行の架け橋です。アダプターは `i18next` API を維持し、ランタイムコストは 9.4 KB です。ネイティブの `next-intlayer` は 5.5 KB で、同期サーバーコンポーネントと同ディレクトリ配置の `.content.ts` ファイルが追加されます。JSON と `.content.ts` の辞書は共存できるため、コンポーネント単位で移行できます。

</Question>

<Question title="翻訳者は現在の作業フローを維持できますか？">

はい。`locales/{lng}/{ns}.json` が信頼できる唯一の情報源として維持されます。`syncJSON` が i18next 構文で読み取り、CLI または CMS が更新したときに翻訳を書き戻します。

</Question>

</FAQ>

## 関連する比較記事

同じアダプターシリーズ：

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-intl_vs_intlayer-next-intl.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer-vue-i18n.md)

直接比較されたライブラリ：

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18next_vs_intlayer.md), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/react-i18next_vs_react-intl_vs_intlayer.md)
- [Is i18next outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/is_i18next_outdated.md)

リファレンスドキュメント：

- Compat adapters: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/next-i18next.md)
- Migration guides: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-i18next_to_intlayer.md)
- [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md) and [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) and [AI translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)

## まとめ

`i18next` は本ベンチマークの中で最も重いランタイムですが、互換アダプターを導入すればAPIを一切変更することなくその大部分を削ぎ落とせます。同一のNext.jsアプリにおいて、設定ファイルとProviderの軽微な変更だけで、初期構成比で**ページあたり68 KBの削減**、最高度に手動最適化された構成比でも**12.7 KBの削減**、**コンポーネントサイズ8分の1**、**リーク率0%**、**ハイドレーション速度4 ms向上**が達成されます。

すべての測定データ、検証用アプリ、再現スクリプトは [Benchmark Bloom リポジトリ](https://github.com/intlayer-org/benchmark-bloom) に公開されています。

詳細は [なぜIntlayerなのか？](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md) ドキュメントをご覧ください。
