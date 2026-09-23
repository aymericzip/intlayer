---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "Lingui vs Intlayer: 2026年ベンチマーク＆機能比較"
description: "Next.jsおよびTanStack Startで測定された2つのコンパイラベースi18nライブラリ。バンドルサイズ、コンテンツリーク率、コンポーネントサイズ、ハイドレーション、言語切り替え応答性、および開発者体験の徹底比較。"
keywords:
  - Lingui
  - Intlayer
  - 国際化
  - i18n
  - ベンチマーク
  - バンドルサイズ
  - コンパイラ
  - ブログ
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | React & Next.js 国際化 (i18n) ベンチマーク比較

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

LinguiとIntlayerは、本ベンチマークにおいて純粋なランタイムではなく**コンパイラ**を活用する2つのライブラリです。Linguiはビルド時にマクロからメッセージを抽出し、言語ごとにカタログをコンパイルします。Intlayerはコンポーネント単位で辞書をコンパイルし、言語ごとにTree-shakingを行います。理論上は非常に近い性能になるはずですが、実測データはその決定的な違いを浮き彫りにしています。

測定データは、各ライブラリで同一のアプリケーションを構築しブラウザが実際にダウンロード・実行する内容を記録するオープンソースの検証スイート [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) に基づいています。

<TOC/>

> **要約 (tl;dr)**: ページ単体の純粋なJavaScript容量において、LinguiはIntlayerに最も肉薄しています。遅延ロード（lazy loading）設定後のTanStack Startでは **115〜120 KB** 対 **118.6 KB**、Next.jsでは **148.6 KB** 対 **141.3 KB** です。しかし、それ以外の指標で大きな差が生じます。個別にコンパイルされたコンポーネントサイズはIntlayerの **6〜8 KB** に対しLinguiは **58〜153 KB**、ハイドレーション所要時間はIntlayerの **11〜14 ms** に対し **28〜34 ms**、最適化構成であっても英語フォールバック文字列がフランス語ページに **3〜15%** リークし、その最適化構成を組むにはルートごとにカタログを手動で抽出・コンパイル・選択する必要があります。Intlayerはこれらをゼロ構成で達成します。

## 概要比較

- **Lingui** - マクロベース（`` t`...` ``、`<Trans>`、`msg`）、ICU MessageFormat構文、`.po` / JSONカタログ、`lingui extract` + `lingui compile` ワークフロー。メッセージIDをハッシュに圧縮し、言語ごとの動的カタログロードに対応。長年の実績がありフレームワーク非依存、`.po` を軸とした翻訳ツールとの連携が強力。
- **Intlayer** - コンポーネント中心のコンテンツモデル。各コンポーネントの隣に `.content.ts` 辞書を配置。ビルド時コンパイラがコンポーネント・言語単位でTree-shakingと遅延ロードを自動実行。コンテンツから厳密なTypeScript型を生成し、未翻訳キーをビルドエラーとして検出。ミドルウェア、SEOヘルパー、ビジュアルエディタ / CMS、AI翻訳機能を標準搭載。

| ライブラリ            | GitHub Stars                                                                                                                                                                   | 総コミット数                                                                                                                                                                       | 最終コミット                                                                                                                                        | 初版公開   | NPMバージョン                                                                                                       | NPMダウンロード数                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | 2024年4月  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | 2016年12月 | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> バッジは自動更新されます。スナップショットは時間の経過とともに変化します。

## 機能の直接比較

| 機能                                                    | Intlayer (`react-intlayer` / `next-intlayer`)                                     | Lingui (`@lingui/core` / `@lingui/react`)                                             |
| ------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **コンポーネント近傍での翻訳管理**                      | ✅ 対応、各コンポーネントと同階層に `.content.ts` を配置                          | ⚠️ JSX内にマクロで原文をインライン記述、翻訳は一括 `.po` カタログで管理               |
| **TypeScript統合**                                      | ✅ コンテンツから厳格な型定義を自動生成                                           | ⚠️ マクロ自体は型付きだがメッセージIDは型付けされず、カタログの不足を検出不可         |
| **未翻訳テキストの検出**                                | ✅ TypeScriptエラー + ビルド時の警告/エラー検出                                   | ⚠️ `lingui extract` で統計表示、実行時は英語原文へフォールバック                      |
| **リッチコンテンツ（JSX / Markdown / コンポーネント）** | ✅ ネイティブ対応                                                                 | ✅ ネストされたコンポーネントを持つ `<Trans>`                                         |
| **ICU構文サポート**                                     | ⚠️ 開発中                                                                         | ✅ 対応（`plural`、`select`、`selectOrdinal` マクロ）                                 |
| **フォーマット処理（日付、数値、通貨）**                | ✅ `useNumber`, `useDate`, ...（内部で `Intl` を使用）                            | ✅ `i18n.date()`, `i18n.number()`                                                     |
| **ローカライズルーティング & ミドルウェア**             | ✅ 組み込みプロキシ/ミドルウェア、`getMultilingualUrls`                           | ❌ コア機能としては非対応                                                             |
| **SEOヘルパー（hreflang、sitemap、robots）**            | ✅ 組み込みヘルパー提供                                                           | ❌ 手動実装が必要                                                                     |
| **同期Server Components（RSC）**                        | ✅ `next-intlayer/server` の `useIntlayer` が任意の子サーバーコンポーネントで動作 | ⚠️ リクエストごとに `I18n` インスタンスが必要（Propsバケツリレーまたは `setI18n`）    |
| **Tree-shaking（使用コンテンツのみ配信）**              | ✅ コンポーネント単位・言語単位でコンパイラが全自動処理                           | ⚠️ `lingui compile` で言語別、ルート別は手動でのカタログ分割が必要                    |
| **遅延ロード（Lazy loading）**                          | ✅ `importMode: 'dynamic'`（設定1行のみ）                                         | ⚠️ コンパイル済みカタログの `import()` + `i18n.load()` / `i18n.activate()` を手動実装 |
| **未使用コンテンツのパージ**                            | ✅ 不要な辞書はビルド時に自動削除                                                 | ✅ `lingui extract --clean` で不要メッセージを削除可能                                |
| **未翻訳テスト（CLI / CI）**                            | ✅ `npx intlayer content test`                                                    | ⚠️ `lingui extract` の統計出力（デフォルトではエラー終了コードを返さない）            |
| **ビルドパイプライン**                                  | ✅ プラグイン1つ（`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`）         | ⚠️ マクロプラグイン（BabelまたはSWC） + `extract` + `compile` の個別ステップ          |
| **AI翻訳機能**                                          | ✅ 組み込み対応（OpenAI、Anthropic、Mistralなど自身のAPIキーを使用）              | ❌ なし                                                                               |
| **ビジュアルエディタ / CMS**                            | ✅ 無料ビジュアルエディタ + オプションのCMS                                       | ❌ なし（`.po` 形式による外部TMSとの連携）                                            |
| **MCPサーバー & エージェントスキル**                    | ✅ 対応                                                                           | ❌ なし                                                                               |
| **エコシステム / コミュニティ**                         | ⚠️ 新鋭だが急速に拡大中                                                           | ✅ 長年の実績、フレームワーク非依存                                                   |

## ベンチマークテスト

### 測定対象

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) スイートは、各ライブラリで**全く同一のアプリケーション**を構築します: **10ページ**（home, about, blog, careers, contact, FAQ, pricing, products, settings, team）、**10ロケール**（`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`）、同一のコンポーネント構成および同一のコンテンツ。測定は `en` と `fr` のページで行われます。各ライブラリは最大4つの**ロード戦略**で評価されました:

| 戦略               | 説明                                                                     | 主な想定用途                         |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------ |
| **static**         | 全言語のコンパイル済みカタログをはじめに一括インポート・ロード           | クイックプロトタイプ、AI生成コード   |
| **dynamic**        | `import()` で表示言語のカタログのみ取得するが、全ページ分が含まれる      | 一般的な大半のプロジェクト           |
| **scoped-static**  | ルートごとに1カタログを分割し、最初にすべてバンドル                      | まれなケース                         |
| **scoped-dynamic** | ルートごとにカタログ分割 + 遅延 `import()`。現在のページ・言語のみを配信 | 厳格なパフォーマンス予算を持つアプリ |

Intlayerには個別の "scoped" バリアントは存在しません。コンパイラが自動的に**コンポーネント単位**でコンテンツを分割するため、`static` および `dynamic` 行がすでに最適化された状態となっています。

各ビルドにおいて以下のメトリクスを記録しています:

- **Lib size**: i18nライブラリのみをインポートする空コンポーネントのgzipサイズ（ランタイム固定コスト）。
- **Page JS**: 全ページおよび全言語の平均として、1ページあたりにダウンロードされるJavaScriptのgzipサイズ。
- **Locale leak %**: ダウンロードされたJSのうち、ユーザーが閲覧して**いない**言語に属する文字列の割合。
- **Page leak %**: ダウンロードされたJSのうち、ユーザーが滞在して**いない**ページに属する文字列の割合。
- **Component avg**: 各コンポーネントを単独でコンパイルしたときの平均gzipサイズ。
- **E2E reactivity**: 言語選択からDOM内の `html[lang]` が更新されるまでの実測時間（Playwright、5回試行の平均）。
- **Hydration**: Reactハイドレーションフェーズの所要時間。

> 下記の数値は、`@lingui/react` 6.6.0 および `intlayer` 9.5.1 を使用した **2026-09-12** の実行結果です。テストアプリは意図的に軽量（言語あたり数十文字列程度）に設定されているため、リーク率はコンテンツ量に応じて拡大する**構造的パターン**を表しています。

### Next.jsでの測定結果

関心のある指標とライブラリを選択してください：

<I18nBenchmark framework="nextjs" vertical/>

| ライブラリ          | 戦略           | Lib size (gz) | Page JS 平均 (gz) | 言語リーク | ページリーク | コンポーネント平均 (gz) |   E2E応答性 | ハイドレーション |
| ------------------- | -------------- | ------------: | ----------------: | ---------: | -----------: | ----------------------: | ----------: | ---------------: |
| **base** (i18nなし) | -              |        0.0 KB |          141.0 KB |       0.0% |         0.0% |                  0.9 KB |     13.4 ms |          11.8 ms |
| Lingui              | static         |       11.9 KB |          207.4 KB |      50.0% |        90.0% |                 73.3 KB |     15.3 ms |          15.2 ms |
| Lingui              | dynamic        |       11.9 KB |          145.4 KB |       2.8% |        89.9% |                 19.9 KB |     15.7 ms |          12.7 ms |
| Lingui              | scoped-static  |       11.9 KB |          148.2 KB |       2.7% |        89.1% |                 20.4 KB |     15.1 ms |          13.1 ms |
| Lingui              | scoped-dynamic |       11.9 KB |          148.6 KB |      14.8% |         0.0% |                152.6 KB |     16.1 ms |          14.8 ms |
| **`next-intlayer`** | static         |    **5.5 KB** |      **141.3 KB** |   **0.0%** |     **0.0%** |              **8.5 KB** |     15.5 ms |          16.9 ms |
| **`next-intlayer`** | dynamic        |    **5.5 KB** |      **141.3 KB** |   **0.0%** |     **0.0%** |              **6.9 KB** | **15.3 ms** |          15.9 ms |

**データの読み解き方**

- **ランタイムコストの差。** 空のコンポーネントはLinguiで11.9 KB gzip、Intlayerで5.5 KBです。ページ全体では、Linguiの最適構成はIntlayerに対し **+7.3 KB**（148.6 KB 対 141.3 KB）であり、Intlayerはi18n未導入のベースアプリに対してわずか **+0.3 KB** の増加にとどまります。
- **初歩的な全カタログ一括ロードは極めて重い。** 全言語のカタログを最初にロードする設定では **1ページあたり207.4 KB** となり、ベースアプリから+66 KBも肥大化します。文字列の半分は不要な言語であり、90%は開いていないページの内容です。
- **動的ロードは言語を解決してもページを解決しない。** 言語ごとに1カタログにまとめた場合、フランス語の全ページ用カタログが毎回送信されるためページリークは90%前後に留まります。Linguiでページリークを0%にするには `scoped-dynamic`（ルートごとにカタログを分割・抽出し、ページごとに手動読み込みする設計）が必要です。
- **原文フォールバックによるリーク。** 最適化構成であっても、**フランス語ページに英語文字列が3〜15%混入**します。Linguiマクロはフォールバック用として原文をバンドル内に保持するためです。Intlayerはビルド時にフォールバックを解決し、要求された言語のみを配信します。
- **`scoped-dynamic` でコンポーネントが肥大化。** 個別にコンパイルされたコンポーネントは平均 **152.6 KB** に達します。インポートを通じて各ルートのカタログに到達可能となるためです。同じコンポーネントを `useIntlayer()` で組んだ場合は平均 **6.9 KB** です。

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> すべてのライブラリと戦略の完全な表は、[Next.js ベンチマークレポート](https://intlayer.org/ja/doc/benchmark/nextjs)をご覧ください。

### TanStack Startでの測定結果

| ライブラリ                | 戦略           | Lib size (gz) | Page JS 平均 (gz) | 言語リーク | ページリーク | コンポーネント平均 (gz) |  E2E応答性 | ハイドレーション |
| ------------------------- | -------------- | ------------: | ----------------: | ---------: | -----------: | ----------------------: | ---------: | ---------------: |
| **base** (i18nなし)       | -              |        0.0 KB |          111.0 KB |       0.0% |         0.0% |                  0.7 KB |     8.1 ms |          21.6 ms |
| Lingui                    | static         |       11.2 KB |          152.2 KB |      50.0% |        90.0% |                 58.0 KB |     3.9 ms |          19.9 ms |
| Lingui                    | dynamic        |       11.2 KB |          115.2 KB |       9.3% |         0.0% |                 85.5 KB |     5.9 ms |          28.0 ms |
| Lingui                    | scoped-static  |       11.2 KB |          120.8 KB |       4.0% |         0.0% |                147.9 KB |     7.1 ms |          33.9 ms |
| Lingui                    | scoped-dynamic |       11.2 KB |          120.2 KB |       8.6% |         0.0% |                 83.7 KB |    42.1 ms |          32.9 ms |
| **`intlayer`**            | static         |    **5.0 KB** |      **125.8 KB** |      50.0% |     **0.0%** |              **8.1 KB** | **3.2 ms** |      **11.5 ms** |
| **`intlayer`**            | dynamic        |    **5.0 KB** |      **118.6 KB** |   **0.0%** |     **0.0%** |              **6.3 KB** |     3.6 ms |      **14.1 ms** |
| `@intlayer/lingui` (互換) | dynamic        |       10.3 KB |          137.0 KB |       9.9% |         0.0% |                 12.8 KB | **2.9 ms** |          19.7 ms |

**データの読み解き方**

- **ページあたりのJS量ではLinguiが僅差で優勢。** `dynamic` 設定のLinguiは **115.2 KB** であり、Intlayerの118.6 KBを3.4 KB下回ります。ハッシュ化IDを持つLinguiのコンパイル済みカタログは非常に高密度であり、TanStack Startのルーター分割が優秀なため `dynamic` の段階でページリークが0%になります。
- **それ以外のほぼすべての指標でIntlayerがリード。** ハイドレーション時間はLinguiの **28〜34 ms** に対しIntlayerは **11〜14 ms** です（`i18n.load()` + `i18n.activate()` がReactのハイドレーション前に実行されるため）。個別コンポーネントサイズもLinguiの **58〜148 KB** に対しIntlayerは **6〜8 KB**、言語リークもフォールバック仕様によりLinguiは0%になりません。
- **最適化構成での言語切り替えに遅延が発生。** `scoped-dynamic` のLinguiは、ルートカタログのフェッチ・ロード・アクティベーションを待つため `html[lang]` の更新に **42 ms** かかります。Intlayerは両モードとも **3〜4 ms** で即座に切り替わります。
- **Intlayerの `static` は最初からページリーク0%。** 該当ページのコンポーネントがインポートする辞書のみをバンドルするためです。設定に `importMode: 'dynamic'` を1行追加すれば言語リークも完全に解消されます。
- **`@intlayer/lingui`** はLinguiのマクロ構文を維持したままIntlayerの辞書からコンテンツを供給します。ページサイズ（マクロランタイムが残るため137 KB）を少し犠牲にする代わりに、コンポーネントの軽量化（12.8 KB）とハイドレーションの高速化を実現します。既存プロジェクトからの優れた移行手段となります。

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> 完全な表は、[TanStack Start ベンチマークレポート](https://intlayer.org/ja/doc/benchmark/tanstack)をご覧ください。

## なぜ差がつくのか？ 2つのコンパイラと2つの作業単位

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

両者ともコンパイルを行います。決定的な違いは**何を**コンパイルするかです。

**Linguiはカタログをコンパイルします。** ソース内のマクロは言語ごとの `.po` ファイルに抽出され、言語ごとのJSモジュールにコンパイルされます。単位は**ロケール（言語全体）**です。これ以上細かく（ルート別やコンポーネント別に）分割するには、複数のカタログを作成し、`lingui.config.ts` でファイルごとに抽出元を設定し、各ルートで適切なファイルを読み込む必要があります。`I18n` インスタンスはグローバルであり、すべての `useLingui()` がコンポーネントをそこへ接続します。

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # lingui compileの出力
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayerは辞書をコンパイルします。** 各 `.content.ts` ファイルはキーに紐づいた辞書です。コンパイラはどのコンポーネントがどのキーをインポートしているかを解決し、辞書・言語ごとにコンポーネントが必要とする最小限のJSONを出力します。単位は**コンポーネント**です。ルート別のスコープ化はその自然な結果であり、ページは自身が表示するコンポーネントの辞書しか読み込みません。

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

これが、`scoped-dynamic` パターンがIntlayerにとって「自動出力」であり、Linguiにとっては「手動の設定プロジェクト」となる理由です. その差はページとロケールの両軸で同時に拡大します：

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> `dynamic` 行の測定結果を再現するには、`intlayer.config.ts` で `dictionary.importMode: 'dynamic'` を指定してください。詳細は [バンドル最適化ドキュメント](https://intlayer.org/ja/doc/concept/bundle-optimization) をご覧ください。

## 開発者体験（DX）

### 初期設定

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

さらに `@lingui/babel-plugin-lingui-macro`（または `@lingui/swc-plugin`）をバンドラーに追加し、コード編集後に `lingui extract` を実行し、ビルド前に `lingui compile` を行い、ツリーを `<I18nProvider i18n={i18n}>` でラップします。

</Tab>
<Tab label="Intlayer" value="intlayer">

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

`vite.config.ts` に `intlayer()` を追加（Next.jsの場合は `next.config.ts` に `withIntlayer()` を追加）し、ツリーを `<IntlayerProvider>` でラップするだけです。抽出やコンパイルの個別コマンドは不要で、バンドラー実行時に自動処理されます。

</Tab>
</Tabs>
### コンポーネント実装

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

英語テキストはコンポーネント内に記述し、フランス語テキストは `lingui extract` 実行後に `src/locales/fr/messages.po` 内のハッシュ化IDの下に生成されます。抽出やコンパイルを忘れると、無言で英語原文が表示されます。

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
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

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

両言語がコンポーネントの隣の同一ファイルに同居します。`fr` の値が欠けていればビルドエラーになり、キー名を誤記すればTypeScriptが即座にエラーを報告します。

</Tab>
</Tabs>
### コンポーネント外部での利用

メタデータ、ローダー、サーバー関数など、Reactツリーが存在しない場所での利用です。

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

呼び出しごとに新しい `I18n` インスタンスを生成し、適切なカタログを手動でインポートし、`t` ではなく `msg` + `i18n._()` を使用します。[ベンチマークノート](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md)でも指摘されている通り、`t`、`` t` ` ``、`i18n.t()`、`msg`、`<Trans>` の使い分けは直感的とは言えません。

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

</Tab>
</Tabs>

## Linguiマクロを維持したままIntlayer辞書を利用する

`@intlayer/lingui` は、`@lingui/core` および `@lingui/react` 用のドロップインアダプターです。マクロはこれまで通りコンパイルされ、内部の `i18n._()` 呼び出しはIntlayer辞書から提供されます。`.po` 同期プラグインにより既存のカタログファイルをそのまま真実のソースとして保持可能です。ICUの複数形や条件分岐も同一にレンダリングされます。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

ビルド設定において、Intlayerコンパイラの前に `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` を実行するようにしてください。詳細は [Lingui互換性ドキュメント](https://intlayer.org/ja/doc/compatibility/lingui) をご覧ください。

## どちらを選択すべきか？

<AccordionGroup>
<Accordion header="Lingui を選ぶ理由">

型付きマクロを使用した **ICU MessageFormat** を求め、翻訳者が既存の TMS パイプラインで **`.po`** ファイルを扱い、JSX 内に直接ソース文字列を記述することを好み、チームが抽出・コンパイル・カタログ分割ワークフローの管理に慣れている場合。遅延読み込みを設定すれば、ページあたりの JS は十分に競争力があります。

</Accordion>
<Accordion header="Intlayer を選ぶ理由">

**コンポーネントスコープのコンテンツ**、**厳格な TypeScript**、**ビルド時のキー欠落エラー**、**設定不要のツリーシェイキングと遅延読み込み**、軽量なコンポーネント、高速なハイドレーション、即時のロケール切り替え、および組み込みの編集ツール（[ビジュアルエディター](https://intlayer.org/ja/doc/concept/editor)、[CMS](https://intlayer.org/ja/doc/concept/cms)、[AI 翻訳](https://intlayer.org/ja/doc/concept/auto-fill)、[MCP サーバー](https://intlayer.org/ja/doc/mcp-server)）を求める場合。特に大規模でモジュール化されたコードベースやデザインシステムに適しています。

</Accordion>
<Accordion header="@intlayer/lingui を選ぶ理由">

現在 Lingui を使用しており、マクロに手を加えることなく段階的に Intlayer の辞書へ移行したい場合。[PO 同期プラグイン](https://intlayer.org/ja/doc/compatibility/lingui)により、`.po` カタログは引き続き信頼できる単一の情報源として機能します。[Lingui vs @intlayer/lingui](https://intlayer.org/ja/blog/lingui-vs-intlayer-lingui) で詳細を測定しています。

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Lingui もコンパイルしますが、なぜ出力がこれほど異なるのですか？">

コンパイルの単位が異なるためです。Lingui は**ロケールごとに1つのカタログ**をコンパイルします。それ以下の単位（ルートごとのカタログ、遅延読み込み、フォールバックの除外）はすべて追加の設定が必要です。Intlayer は**コンポーネントごとに1つの辞書**をコンパイルするため、ルートごとのスコープがビルド時に自動的に生成されます。これが、単独でコンパイルされた Lingui コンポーネントが 6-8 KB に対し 58-153 KB になる理由です。

</Question>

<Question title="Lingui でロケールリークが 0% にならないのはなぜですか？">

マクロは実行時のフォールバックとして元のメッセージを利用可能にしておくため、英語の文字列が翻訳と一緒にバンドルに含まれます。最適化されたすべての構成において、ベンチマークでは **`fr` ページ内に 3-15% の `en` 文字列が含まれる** ことが測定されています。Intlayer はビルド時にフォールバックを解決し、アクティブなロケールのみを配信します。

</Question>

<Question title="Lingui のページあたり JavaScript は本当に競争力がありますか？">

はい、TanStack Start では僅差で勝利しています（`dynamic` で Intlayer の 118.6 KB に対し 115.2 KB）。ハッシュ化された ID を持つコンパイル済みカタログは非常にコンパクトです。ただしコストは別の場所に現れます。ハイドレーションは 11-14 ms に対し 28-34 ms であり、`scoped-dynamic` 構成でのロケール切り替えには **42 ms** かかります。

</Question>

<Question title="移行するためにマクロを諦める必要がありますか？">

いいえ。`@intlayer/lingui` は `` t`...` ``、`<Trans>`、`msg`、`plural`、`select`、`selectOrdinal` を従来どおりコンパイルします。`i18n._()` が解決する参照先のみが変わります。ビルド構成で `@lingui/babel-plugin-lingui-macro` または `@lingui/swc-plugin` をそのまま維持してください。[Lingui 互換性ドキュメント](https://intlayer.org/ja/doc/compatibility/lingui)を参照してください。

</Question>

<Question title="抽出とコンパイルの手順はどうなりますか？">

マクロ部分には残りますが、Intlayer 独自のコンテンツでは不要になります。`.content.ts` 辞書はバンドラーの実行時に自動構築され、個別の CLI コマンドは不要です。また、[`intlayer test`](https://intlayer.org/ja/doc/concept/cli) はキーが欠落している場合に元の文字列へ無言でフォールバックするのではなく、CI を失敗させます。

</Question>

</FAQ>

## 関連する比較記事

同じベンチマーク、他のライブラリ：

- [next-intl vs Intlayer](https://intlayer.org/ja/blog/next-intl-vs-intlayer)
- [i18next vs Intlayer](https://intlayer.org/ja/blog/i18next-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/ja/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ja/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/ja/blog/react-i18next-vs-react-intl-vs-intlayer)

さらに詳しく：

- [Lingui vs @intlayer/lingui](https://intlayer.org/ja/blog/lingui-vs-intlayer-lingui), 同一アプリで測定されたアダプター
- [Compiler-driven vs declarative i18n](https://intlayer.org/ja/blog/compiler-vs-declarative-i18n)
- [Per-component vs centralized i18n](https://intlayer.org/ja/blog/per-component-vs-centralized-i18n)
- [ICU message format explained](https://intlayer.org/ja/blog/icu-message-format)

参考ドキュメント：

- [Next.js ベンチマークレポート](https://intlayer.org/ja/doc/benchmark/nextjs) および [TanStack Start ベンチマークレポート](https://intlayer.org/ja/doc/benchmark/tanstack)
- [Compat adapter: Lingui](https://intlayer.org/ja/doc/compatibility/lingui)
- [バンドル最適化](https://intlayer.org/ja/doc/concept/bundle-optimization) および [Intlayer コンパイラー](https://intlayer.org/ja/doc/compiler)

## GitHubスターの推移

GitHubスターは、プロジェクトの人気、コミュニティの信頼、持続可能性を示す重要な指標です。コードの技術的品質を直接測るものではありませんが、どれだけ多くの開発者が有用と認め動向を追っているかを如実に表しています。

[![スター履歴チャート](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## 結論

Linguiは、本ベンチマークにおいて最も堅牢なランタイム＋コンパイラ型ライブラリです。ハッシュ化されたコンパイル済みカタログにより、1ページあたりのJavaScript容量はIntlayerに肉薄し、TanStack Startではわずかに下回るほどです。もしページサイズのみが評価軸であれば、実質的な引き分けと言えます。

しかし実際はそうではありません。Linguiのコンパイラは言語単位で止まるため、それ以下の最適化（ルート別カタログ、遅延ロード、フォールバック文字列の除外）はすべて手作業の設定頼みとなります。ベンチマークはその代償として、**10〜20倍重いコンポーネント**、**2〜3倍遅いハイドレーション**、**解消できない3〜15%の言語リーク**、最適化構成における **42 ms** の言語切り替え遅延を明確に示しています。Intlayerのコンパイラはコンポーネント単位で動作するため、追加設定なしで **6〜8 KB**、**11〜14 ms**、**0%**、**3〜4 ms** を標準で達成します。

すべての生データ、テストアプリ、スクリプトは [Benchmark Bloom リポジトリ](https://github.com/intlayer-org/benchmark-bloom) で公開されています。ぜひご自身でお確かめください。

詳細については [「Intlayerを選ぶ理由」ドキュメント](https://intlayer.org/ja/doc/why) をご覧ください。
