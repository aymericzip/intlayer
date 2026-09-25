---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs @intlayer/lingui: 同じマクロ、異なるランタイム"
description: "ReactアプリがLinguiのマクロをそのまま維持しながら@intlayer/lingui互換アダプター経由で配信すると何が変わるのか。同一のTanStack Startコード上で測定されたコンポーネントサイズ、ハイドレーション、リーク率、ページあたりのJavaScript量、およびアダプターが劣るポイントを解説します。"
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - 互換アダプター
  - 移行
  - 国際化
  - i18n
  - ベンチマーク
  - バンドルサイズ
  - ブログ
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | 同じマクロ、異なるランタイム

`@intlayer/lingui` は、`@lingui/core` および `@lingui/react` 向けの互換アダプターです。`` t`...` ``、`<Trans>`、`useLingui()`、`i18n._()` の呼び出しは一切変更する必要がなく、マクロもそのままコンパイルされます。変化するのは、実行時にメッセージがどこから提供されるかという点です。ロケールごとに1つにまとめられたカタログではなく、各呼び出し箇所ごとに専用コンパイルされたIntlayerディクショナリへとバインドされます。

本記事では、同じTanStack StartアプリケーションをLingui単体とアダプター併用の両方でビルドし、その差異を検証します。数値は [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) に基づいています。ライブラリ同士の純粋な比較については [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer.md) をご覧ください。本稿では、アダプターの導入によって何が変わり、どこで利点が得られないのかに焦点を当てます。

<TOC/>

> **要約 (tl;dr)**: 同一のTanStack Startアプリにおいて、`@intlayer/lingui` はマクロを一切書き換えることなく、平均コンポーネントサイズを **85.5 KB から 12.8 KB** (gzip) に削減し、ハイドレーション時間を **28 ms から 19.7 ms** へ、言語切り替えを **5.9 ms から 2.9 ms** へと短縮しました。初期ロード時に全カタログを一括読み込みするナイーブな構成では、**90%のページリーク**を解消し、1ページあたり12 KB削減しました。ただし、遅延ロード構成では純粋なLinguiの115 KBに対して **137 KB/ページ** となります。これは、Linguiがビルド時に事前コンパイルされたトークン配列を配信するのに対し、アダプターは実行時にICUを解決するためです。元の言語のリーク率（約9〜10%）は、ランタイムではなくコンポーネント内に埋め込まれた `message` フォールバックに起因するため、両者で同等です。アダプターはViteプラグインとして機能し、TanStack Start上で測定されました。

## `@intlayer/lingui` とは何か

Linguiはコンパイラとランタイムで構成されています。ソースコード内のマクロはロケールごとの `.po`（またはJSON）カタログに抽出され、言語ごとのJSモジュールにコンパイルされた後、`i18n.load()` + `i18n.activate()` によってグローバルの `I18n` インスタンスへロードされます。すべての `useLingui()` はそのインスタンスを購読し、すべての `_()` 呼び出しはアクティブなカタログからIDを検索します。

`@intlayer/lingui` はマクロとAPIの使い勝手をそのまま維持し、カタログのルックアップ処理を置き換えます:

1. **インポートのエイリアス化。** `@intlayer/lingui/plugin` の `lingui()` プラグインが `vite-intlayer` をラップし、`resolve.alias` を設定して `@lingui/core` と `@lingui/react` を `@intlayer/lingui` に解決させます。ソース内のインポート文を変更する必要はありません。
2. **真実の単一ソースとしてのカタログ。** `syncJSON` プラグイン（`.po` ファイル用の `syncPO` も同様）が既存のカタログを読み取ってIntlayerディクショナリに変換し、CLIやCMSで翻訳が更新された際に逆書き込みを行います。`splitKeys: "key-prefix"` を指定することで、ドット区切りのフラットなカタログ（`footer.github`、`hero.title`）を、244 KBの巨大ファイル1つではなく接頭辞ごとの小さなディクショナリ群へと分割します。
3. **呼び出し箇所ごとのバインディング。** Intlayerの最適化パスが各ファイル内の `_`、`t`、`<Trans>` に渡されたIDを収集し、対応するディクショナリのみをコンポーネントに注入します。`<Trans id="hero.title">` は個別に対象ディクショナリにバインドされ、`useLingui()` はそのファイルで使われているすべての接頭辞にバインドされます。ドットを含まないID（ハッシュ化IDや `mockBanner` など）はLinguiの単一フォールバックディクショナリ `messages` を参照します。

```tsx fileName="src/components/Hero.tsx"
// あなたのコード（変更なし）
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="コンパイラの出力内容（簡略化）"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

コンポーネントはグローバルインスタンスや背後にある巨大なカタログ全体にアクセスしなくなります。コンポーネントが必要とするのは `hero` だけです。これこそが、下表でコンポーネントサイズが7分の1に激減する理由です。

## アダプターが保持するもの、無視するもの、置き換えないもの

| Lingui API                                                | `@intlayer/lingui` 併用時                                                                                          |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `` t`...` ``、`msg`、`plural`、`select`、`<Trans>` マクロ | ✅ 維持。Intlayer処理の前にビルドへ `@lingui/babel-plugin-lingui-macro` や `@lingui/swc-plugin` を保持してください |
| `useLingui()` → `{ i18n, _, t }`                          | ✅ 維持。プロバイダー外部でも動作可能（ロケールは `react-intlayer` より取得）                                      |
| `i18n._(id, values)`、`i18n.t()`                          | ✅ 維持。明示的なIDもハッシュ化IDも解決可能                                                                        |
| ICU複数形、`select`、`selectordinal`、`#`                 | ✅ 維持。IntlayerのICUリゾルバーを介して処理                                                                       |
| `i18n.date()`、`i18n.number()`、`formats`                 | ✅ 維持。ネイティブの `Intl` を使用                                                                                |
| `I18nProvider`                                            | ✅ 維持。`IntlayerProvider` をラップし、`activate()` による再レンダリングのため `i18n.on("change")` をリッスン     |
| `i18n.activate(locale)`                                   | ✅ 維持                                                                                                            |
| `i18n.load(locale, messages)` / `loadAndActivate()`       | ⚠️ **実行時フォールバック**として受容。コンパイル済みディクショナリが優先され、dev警告で削除を推奨                 |
| `setupI18n({ messages, missing })`                        | ⚠️ `messages` はフォールバックとしてマージされ、`missing` は無視されます                                           |
| `lingui extract` / `lingui compile`                       | ✅ 既存のワークフローを継続可能。抽出されたカタログに `syncPO` / `syncJSON` を向けてください                       |
| `I18nProvider` の `defaultComponent`                      | ⚠️ コンテキスト内に保持されますが、レンダリング時には適用されません                                                |
| Next.js                                                   | ❌ 本プラグインは `vite-intlayer` をラップしています。Vite、TanStack Start、React Router のみ対応                  |

## ベンチマーク検証

### 測定対象

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) スイートは、各構成で**同一のアプリケーション**を構築します: **10ページ**（home, about, blog, careers, contact, FAQ, pricing, products, settings, team）、**10ロケール**（`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`）、同一のコンポーネント構成および同一のコンテンツで構成されています。測定は `en` と `fr` のページで行われました。

Linguiは、全コンパイル済みカタログを最初に一括インポートする構成（`static`）から、ルートごとにカタログを遅延ロードする構成（`scoped-dynamic`）まで4つの戦略でビルドされました。アダプターは**同一のコンポーネント**を用い、`vite.config.ts` と `intlayer.config.ts` のみを変更してテストされました。その `static` 行は全言語をバンドルし、`dynamic` 行（`importMode: 'dynamic'`）はアクティブな言語を必要に応じて取得します。最適化パスが呼び出し箇所ごとに自動スコープ化するため、"scoped" バリアントは不要です。

各ビルドで以下の指標を記録しています:

- **Lib size**: i18nライブラリのみをインポートする空コンポーネントのgzipサイズ。
- **Page JS**: 全ページおよび全言語で平均化された、1ページあたりにダウンロードされるJavaScriptのgzipサイズ。
- **Locale leak %**: ダウンロードされたJSのうち、ユーザーが閲覧して**いない**言語に属する文字列の割合。
- **Page leak %**: ダウンロードされたJSのうち、ユーザーが滞在して**いない**ページに属する文字列の割合。
- **Component avg**: 各コンポーネントを単独でコンパイルしたときの平均gzipサイズ。
- **E2E reactivity**: 言語選択からDOM内の `html[lang]` が更新されるまでの実測所要時間（Playwright、5回試行）。
- **Hydration**: Reactのハイドレーションフェーズにかかる時間。

> 下記の数値は、`@lingui/react` 6.6.0 および `@intlayer/lingui` 9.5.1 を使用した **2026-09-12** の実行結果です。テストアプリは意図的に軽量（言語あたり数十文字列程度）に設定されているため、リーク率はコンテンツ量に応じて拡大する**構造的パターン**を示しています。

### TanStack Start上での測定結果

| 構成                    | 戦略           | Lib size (gz) | Page JS 平均 (gz) | 言語リーク | ページリーク | コンポーネント平均 (gz) |  E2E応答性 | ハイドレーション |
| ----------------------- | -------------- | ------------: | ----------------: | ---------: | -----------: | ----------------------: | ---------: | ---------------: |
| **base** (i18nなし)     | -              |        0.0 KB |          111.0 KB |       0.0% |         0.0% |                  0.7 KB |     8.1 ms |          21.6 ms |
| Lingui                  | static         |       11.2 KB |          152.2 KB |      50.0% |        90.0% |                 58.0 KB |     3.9 ms |          19.9 ms |
| Lingui                  | dynamic        |       11.2 KB |      **115.2 KB** |       9.3% |         0.0% |                 85.5 KB |     5.9 ms |          28.0 ms |
| Lingui                  | scoped-static  |       11.2 KB |          120.8 KB |       4.0% |         0.0% |                147.9 KB |     7.1 ms |          33.9 ms |
| Lingui                  | scoped-dynamic |       11.2 KB |          120.2 KB |       8.6% |         0.0% |                 83.7 KB |    42.1 ms |          32.9 ms |
| **`@intlayer/lingui`**  | static         |   **10.3 KB** |          140.5 KB |      50.0% |     **0.0%** |             **14.9 KB** | **3.3 ms** |      **11.3 ms** |
| **`@intlayer/lingui`**  | dynamic        |   **10.3 KB** |          137.0 KB |       9.9% |     **0.0%** |             **12.8 KB** | **2.9 ms** |      **19.7 ms** |
| `intlayer` (ネイティブ) | static         |        5.0 KB |          125.8 KB |      50.0% |         0.0% |                  8.1 KB |     3.2 ms |          11.5 ms |
| `intlayer` (ネイティブ) | dynamic        |        5.0 KB |          118.6 KB |       0.0% |         0.0% |                  6.3 KB |     3.6 ms |          14.1 ms |

**結果の解説**

- **コンポーネントが7分の1に軽量化。** これがアダプターの最大の強みです。Linguiコンポーネントを個別にコンパイルすると戦略に応じて平均 **58〜148 KB** に達します。これは `useLingui()` がグローバルインスタンスとそこに登録された全カタログを参照するためです。アダプターを適用した同一コンポーネントは平均 **12.8〜14.9 KB** であり、自身のディクショナリとICUリゾルバー以外を一切参照しません。
- **ハイドレーションが8〜14 ms高速化。** `i18n.load()` + `i18n.activate()` はReactのハイドレーション開始前にクライアント側で実行されるため、遅延ロードの度合いが高まるほど処理が遅くなります（28〜34 ms）。アダプターでは、バンドラーによってページチャンク内にすでに配置された通常のインポートとしてディクショナリが届くため、`static` で **11.3 ms**、`dynamic` で **19.7 ms** に短縮されます。
- **言語切り替えが2倍高速、性能の崖がない。** Linguiの最適化構成である `scoped-dynamic` では、ルートカタログのフェッチ、ロード、アクティベーションが完了するまで画面が更新されないため、`html[lang]` の反映に **42 ms** かかります。アダプターは両モードとも **2.9〜3.3 ms** で安定しています。
- **初歩的な構成の無駄を自動解消。** 静的Linguiは全カタログを全ページに配信するため、152.2 KB、ページリーク90%となります。静的アダプターは同一コンポーネントのまま140.5 KB、ページリーク0%を実現します。
- **ページサイズ: `dynamic` ではLinguiが22 KB有利。** ここは客観的に把握すべき点です。Linguiはビルド時にメッセージをトークン配列に変換し、それを走査するだけの11 KBの軽量ランタイムを配信します。一方のアダプターは、IntlayerのICUリゾルバー（ネイティブ構成より約15 KB増の `@intlayer/core`）、アダプター層（約10 KB）、`react-intlayer`（約6 KB）を含みます。本アプリでは **137.0 KB 対 115.2 KB** となります。1ページあたりの転送量削減が唯一の目的であり、すでに遅延ロード対応Linguiを最適化して運用している場合、アダプターによるサイズ削減効果はありません。
- **言語リーク率は双方同等。** `dynamic` においてLinguiが9.3%、アダプターが9.9%となっています。これはコンポーネントコード自体に起因します: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` はフォールバックとして英語原文を保持しており、messageフィールドを除去しない限りマクロの出力にも残ります。この英語はどのランタイムを使っても `fr` チャンクに混入します。インライン原文を持たないネイティブIntlayer（`.content.ts`）のみが0%を達成できます。

## なぜ数値が改善し、なぜ特定指標が変わらないのか

これらの指標は、**コンポーネントが何にバインドされているか**、そして**メッセージがどの形式で転送されるか**の2点によって決まります。

**バインディングの違い。** Linguiにおける分割の最小単位は「言語（ロケール）」です。`fr` 用の `messages.mjs` は1つのモジュールとして完結しているため、それをロードしたインスタンスを参照するコンポーネントは全体にアクセスでき、バンドラーは言語単位未満でコードを分割できません。アダプターでは、最小単位が「呼び出し箇所」となります。`hero` と `footer` は独立したインポートとなり、コンポーネントごとに分割・遅延ロードされます。これがコンポーネントサイズ、ハイドレーション、ページリーク改善の要因です。

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # lingui compileの出力（言語ごとに1つ）
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # 自動生成: 言語ごと・IDプレフィックスごとのディクショナリ
└── src
    ├── locales
    │   ├── en/messages.json             # 変更なし（真実のソースとして維持）
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← 変更なし
```

**フォーマットの違い。** Linguiのコンパイル処理は `{count, plural, one {# item} other {# items}}` をトークン配列へと変換するため、ランタイムでICU構文をパースしません。アダプターはメッセージをテキストとして保持し、IntlayerのICUリゾルバーでパースします。これはページごとに1回発生する約15 KBの固定コストであり、`dynamic` 行が他のすべての項目で圧倒しながら転送量で下回る理由です。ネイティブIntlayerでは、`.content.ts` ディクショナリがビルド時に解決される `enu()` / `insert()` ノードを使用するため、このコストを回避できます。

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

このコマンドはLinguiを自動検出し、`lingui.config.ts` を解析して `syncPO`（`.po` カタログ用）または `syncJSON`（JSONカタログ用）を選択し、`intlayer`、`react-intlayer`、`@intlayer/lingui`、および対応する同期プラグインをインストールします。また、必要に応じて `vite.config.ts` 内の `@lingui/vite-plugin` をアダプタープラグインに置き換えます。`@lingui/core`、`@lingui/react`、マクロプラグインはそのまま残してください。マクロは引き続きコンパイルされ、アダプターはLinguiの型定義を利用します。

</Step>
<Step number={2} title="カタログをIntlayerに関連付ける">

JSONカタログの場合（`lingui.config.ts` で `format: "minimal"` の場合）:

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
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // ドット区切りのIDを先頭セグメントでグループ化: `footer.github` → ディクショナリ `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

`.po` カタログの場合は、`syncJSON` を `@intlayer/sync-po-plugin` の `syncPO` に置き換え、拡張子を `.po` にした同様の `source` パターンを指定します。詳細は [Sync POプラグインドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md) を参照してください。

`splitKeys: "key-prefix"` こそがコンポーネントサイズ削減の要です。元のカタログファイルはフラットな構造のまま保持され、分割は自動生成されたディクショナリ内にのみ存在し、逆同期によってキーは自動的に再統合されます。

</Step>
<Step number={3} title="プラグインを追加する">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // マクロプラグインは保持（Intlayerの処理前に実行される必要があります）
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()` は `vite-intlayer`（コンテンツ監視、ディクショナリコンパイル、最適化パス）を内包し、`@lingui/core` と `@lingui/react` をアダプターへエイリアスします。ビルドすれば、上記のベンチマーク数値が手に入ります。

</Step>
</Steps>

### 移行後に削除できる記述

| ファイル / パターン                                  | 理由                                                                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | ディクショナリはそれを利用するコンポーネントによって直接読み込まれます。`i18n.load()` はフォールバック化します |
| `i18n.load()` / `i18n.loadAndActivate()`             | `i18n.activate(locale)` のみ残し、手動カタログロード処理は削除します                                           |
| ビルドスクリプト内の `lingui compile`                | JSONや `.po` を直接のソースとし、コンパイル済みモジュールをインポートしない場合に削除可能です                  |

### バイト数削減以外の導入メリット

- **未翻訳キーの自動検出。** `npx intlayer test` は言語間でキーが欠けている場合にCIを失敗させます（`lingui extract` は統計出力のみ）。
- **`npx intlayer fill`** による自動翻訳。好みのAIプロバイダー（OpenAI, Anthropic, Mistral, Gemini等）を用いて未翻訳エントリを補完し、カタログへ書き戻します。
- **ビジュアルエディターとCMS連携。** 同じディクショナリを直接編集できるため、非エンジニアでもUI上で `.po` や JSON の翻訳を更新できます。
- **`.content.ts` への段階的移行。** 任意のコンポーネントを `useLingui()` からローカル配置の `useIntlayer("hero")` へいつでも移行できます。両形式のディクショナリは問題なく共存します。

## 導入前に把握しておくべき制約

- **`dynamic` におけるページ容量コスト。** 前述の通り、小規模アプリの遅延ロードLinguiに対して約20 KB/ページの増加が見込まれます。この差はコンテンツ量とともに増大することはありませんが（リゾルバーに起因するため）、縮まることもありません。
- **ソース言語リークの残存。** メッセージ記述子やマクロ出力には、フォールバック用の英語テキストが含まれます。これを完全に防ぐには、`message` フィールドを削るかコンポーネントを `.content.ts` に移行する必要があります。
- **`i18n.load()` はフォールバック目的。** コンパイル済みカタログをインポートして `load()` を呼び出し続けると、新旧両方のバンドルを二重に読み込むことになります。該当インポートは削除してください。
- **Vite限定。** `@intlayer/lingui` にはNext.jsプラグインがありません。Linguiを利用中のNext.jsプロジェクトは [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md) の直接導入をご検討ください。
- **`defaultComponent` の不適用。** `<Trans>` の自動ラッピングに頼っていた場合は、コンポーネント側でラッパーを明示的に指定してください。

## どちらを選択すべきか？

- **Linguiを継続すべきケース**: すでに `scoped-dynamic` を導入しており、評価基準がページあたりのバイト数のみで、42 msの言語切り替え時間や30 msのハイドレーション時間が許容できる場合。
- **`@intlayer/lingui` を選ぶべきケース**: 既存のLinguiアプリにおいて、マクロを修正することなく、コンポーネントの軽量化、ハイドレーションや言語切り替えの高速化、素朴な構成でのページリーク解消、型安全なID、CIテスト、AI補完を活用したい場合。
- **ネイティブIntlayer（`react-intlayer`）へ移行すべきケース**: コンポーネントの大幅なリファクタリングを予定している場合。**言語リーク0%**、ランタイム5 KB、ベースアプリに対してわずか+7.6 KB/ページを実現できる唯一の選択肢です。

## 関連する比較記事

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/lingui_vs_intlayer.md)（ライブラリ本体の詳細比較、同一ベンチマーク）
- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-intl_vs_intlayer-next-intl.md)（アダプター比較シリーズ）
- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18next_vs_intlayer-i18next.md)（アダプター比較シリーズ）
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer-vue-i18n.md)（アダプター比較シリーズ）
- [互換アダプターリファレンス: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md)
- [コンパイラ型 vs 宣言型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)

## 結論

`@intlayer/lingui` は、Lingui呼び出し箇所のバインディング対象を根本から変革します。グローバルインスタンスと巨大カタログではなく、各コンポーネント専用にコンパイルされたディクショナリに接続します。TanStack Startアプリにおいて、マクロを一切書き換えることなく **コンポーネントが7分の1に縮小**、**ハイドレーションが8〜14 ms短縮**、**言語切り替えが2倍高速化**し、42 msの引っかかりも解消されます。コンポーネント内のフォールバック文字列はそのまま保持されるためソース言語リークは残り、実行時にICUを解析するため動的ロード構成では純粋なLinguiより約20 KB/ページ増加します。自社のパフォーマンス予算に合わせて最適な構成をお選びください。

ベンチマークの全生データ、テストアプリ、スクリプトは [Benchmark Bloom リポジトリ](https://github.com/intlayer-org/benchmark-bloom) で公開されています。ぜひご自身でお試しください。

詳細については [「Intlayerを選ぶ理由」ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md) をご参照ください。
