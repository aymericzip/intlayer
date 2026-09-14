---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "i18next vs Intlayer: 2026年ベンチマーク＆徹底比較"
description: "Next.jsおよびTanStack Startにおけるreact-i18nextとnext-i18nextをIntlayerと比較測定。バンドルサイズ、コンテンツリーク、ロケール切り替えの応答性、開発者体験を検証。"
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - 国際化
  - i18n
  - ベンチマーク
  - バンドルサイズ
  - ブログ
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | React & Next.js 国際化 (i18n) ベンチマーク比較

`i18next`は、JavaScriptエコシステムで最も広く利用されているi18nフレームワークです。`react-i18next`や`next-i18next`を通じて、数多くのReactおよびNext.jsアプリケーションで採用されています。Intlayerは、コンパイラ駆動型でコンポーネントスコープ設計を採用した新しい選択肢です。

本記事では、機能リストの単なる比較ではなく、客観的な実測値に基づいて両者を比較します。掲載されている数値は、同一アプリケーションを各ライブラリでビルドし、ブラウザが実際にダウンロードするリソースを記録するオープンソーススイート[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)の測定結果に基づいています。

<TOC/>

> **tl;dr**: `i18next`はベンチマーク内で最も重量級のランタイムであり、標準構成のNext.jsで**1ページあたり+77 KB gzip**、名前空間と遅延ロードを完全に最適化した場合でも**+22 KB**の増加をもたらします。対してIntlayerの増加はわずか**+0.3 KB**です。完全スコープ化された構成を除くすべての`i18next`構成では、**別ページの翻訳文字列が約90%リーク**して送信されますが、Intlayerはデフォルトで**0%**です。遅延読み込みバックエンドを使用したロケール切り替えは、`react-i18next`で**123〜185 ms**かかったのに対し、Intlayerは**3〜4 ms**で完了しました。`i18next`のAPIを維持できる互換アダプター`@intlayer/next-i18next`を使用した場合でも、1ページあたり**150.7 KB**となり、本家の**218.5 KB**から大幅に削減されます。

## 要約

- **i18next / react-i18next / next-i18next** - 実績豊富でプラグインが充実し、フレームワークに依存しません。名前空間、言語検出、各種バックエンド、プラグイン経由のICU、リッチコンテンツ用の`<Trans>`をサポート。翻訳は`locales/{lng}/{ns}.json`に一括管理されます。強力ですが、最適化（名前空間の分割、ページごとの読み込み制御、型安全性）のすべてを開発者自身で設計・保守する必要があります。
- **Intlayer** - コンポーネント中心のコンテンツモデル。`.content.ts`辞書ファイルを対応するコンポーネントと同階層に配置。ビルド時コンパイラがコンポーネントおよびロケール単位でツリーシェイキングと遅延読み込みを実施し、コンテンツから厳格なTypeScript型を自動生成。翻訳漏れはビルド時に検出・遮断されます。ミドルウェア、SEOヘルパー、ビジュアルエディタ / CMS、AI翻訳支援も標準提供。

| ライブラリ              | GitHubスター                                                                                                                                                                       | 総コミット数                                                                                                                                                                           | 最終コミット                                                                                                                                            | 初回リリース | NPMバージョン                                                                                                         | NPM月間ダウンロード数                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | 2024年4月    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | 2012年1月    | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | 2015年12月   | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | 2018年11月   | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> バッジは自動更新されます。測定時期により変動します。

## 機能比較一覧

| 機能                                             | Intlayer (`react-intlayer` / `next-intlayer`)                                  | i18next (`react-i18next` / `next-i18next`)                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **コンポーネント同階層での翻訳定義**             | ✅ 可能（各コンポーネントと同階層に`.content.ts`）                             | ❌ 不可（`locales/{lng}/{ns}.json`に集中管理）                    |
| **TypeScript統合**                               | ✅ コンテンツから厳密な型を自動生成                                            | ⚠️ 基礎的（`CustomTypeOptions`拡張とリソース型定義が必要）        |
| **翻訳漏れの検知**                               | ✅ TypeScriptエラー + ビルド時の警告・エラー                                   | ⚠️ ランタイム時のフォールバック（`saveMissing`、キー表示）        |
| **リッチコンテンツ（JSX / Markdown）**           | ✅ ネイティブ対応                                                              | ⚠️ インデックス付きプレースホルダーによる`<Trans>`                |
| **ICUメッセージ形式**                            | ⚠️ 開発中                                                                      | ⚠️ プラグイン経由（`i18next-icu`）                                |
| **複数形処理**                                   | ✅ 列挙ベースのパターン                                                        | ✅ `_one` / `_other` 接尾辞（Intl.PluralRules）                   |
| **フォーマット（日付、数値、通貨）**             | ✅ `useNumber`、`useDate` 等（内部でIntl利用）                                 | ⚠️ 補間フォーマッターまたは手動の`Intl.*`呼び出し                 |
| **ローカライズされたルーティングとミドルウェア** | ✅ 組み込みプロキシ / ミドルウェア、`getMultilingualUrls`                      | ⚠️ 標準外（独自実装またはサードパーティ製ミドルウェアが必要）     |
| **SEOヘルパー（hreflang、サイトマップ等）**      | ✅ 標準提供                                                                    | ❌ 手動実装                                                       |
| **同期サーバーコンポーネント**                   | ✅ `next-intlayer/server`の`useIntlayer`を任意のServer Componentで直接利用可能 | ⚠️ ページで`getFixedT`を呼び出し、Propsで`t`をバケツリレー        |
| **ツリーシェイキング（使用コンテンツのみ配信）** | ✅ コンポーネントおよびロケール単位でコンパイラが自動処理                      | ⚠️ 手動（名前空間分割 + ページごとの`ns`リスト + バックエンド）   |
| **遅延ロード（Lazy Loading）**                   | ✅ `importMode: 'dynamic'`（設定ファイルに1行追記）                            | ✅ バックエンドプラグイン経由（`i18next-resources-to-backend`等） |
| **未使用コンテンツのパージ**                     | ✅ 参照されていない辞書はビルド時に破棄                                        | ❌ 標準機能なし                                                   |
| **翻訳漏れテスト（CLI / CI）**                   | ✅ `npx intlayer content test`                                                 | ⚠️ `i18next-parser`などのサードパーティツール                     |
| **AI翻訳機能**                                   | ✅ 標準搭載（独自のAPIキーを使用）                                             | ❌ なし（Locize等の外部有償サービスを利用）                       |
| **ビジュアルエディタ / CMS**                     | ✅ 無料のビジュアルエディタ + 任意利用可能なCMS                                | ❌ なし（Locize等の外部プラットフォーム）                         |
| **MCPサーバー & Agent Skills**                   | ✅ 対応                                                                        | ❌ 非対応                                                         |
| **エコシステム / コミュニティ規模**              | ⚠️ 比較的新しいが急速に拡大中                                                  | ✅ 最も大規模で成熟                                               |

## ベンチマーク測定

### 測定対象と環境

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)スイートは、各ライブラリを用いて**同一仕様のアプリケーション**を構築します。**10ページ**（home, about, blog, careers, contact, FAQ, pricing, products, settings, team）、**10ロケール**（`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`）、同一コンポーネント・同一コンテンツで検証し、測定は`en`および`fr`で行われます。

各ライブラリは、基本的な構成から最適な構成まで最大4つの**読み込み戦略**でテストされています：

| 戦略               | 概要                                                                                      | 想定ケース                                 |
| ------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------ |
| **static**         | 全言語・全ページの翻訳を初期バンドルに内包（`init()`に`resources`を直接指定）             | プロトタイプ開発、AI生成コード             |
| **dynamic**        | バックエンド経由でアクティブ言語のみを読み込むが、全名前空間を一括ロード                  | 一般的な多くのプロジェクト                 |
| **scoped-static**  | ルートごとに名前空間を分割するが、すべてビルド時にバンドル                                | 稀なケース                                 |
| **scoped-dynamic** | ルートごとの名前空間分割 + バックエンド遅延ロード。現在のページ・現在の言語のみを読み込む | 厳格なパフォーマンス予算を持つ大規模アプリ |

Intlayerには「scoped」バリアントが存在しません。コンパイラが自動的に**コンポーネント単位**でコンテンツをスコープ化するため、`static`および`dynamic`の行がすでに最適化された状態となります。

各ビルドで測定される指標：

- **Lib size**: i18nライブラリのみをインポートした空コンポーネントのgzipサイズ。ランタイムの固定コスト。
- **Page JS**: 1ページあたりにダウンロードされるJavaScriptのgzipサイズ（全ページ・全言語の平均）。
- **Locale leak %**: ダウンロードされたJS内の翻訳文字列のうち、ユーザーが**閲覧していない**言語の割合。
- **Page leak %**: ダウンロードされたJS内の翻訳文字列のうち、ユーザーが**開いていない**ページの割合。
- **Component avg**: 独立してコンパイルされた各コンポーネントの平均gzipサイズ。
- **E2E reactivity**: 言語切り替え操作からDOMの`html[lang]`が更新されるまでの実測時間（Playwright、5回試行の平均）。
- **Hydration**: Reactのハイドレーションフェーズの所要時間。

> 以下の測定値は、`next-i18next` 16.3.0、`react-i18next` 17.0.13、`intlayer` 9.5.1を使用した**2026-09-12**時点のデータです。テストアプリは意図的に軽量（言語あたり数十個の文字列）に作られているため、リーク率は**構造的な傾向**を表しています。コンテンツ量が増加するにつれてリーク量は拡大しますが、ランタイムコストは固定されます。

### Next.jsでの結果 (`next-i18next`)

| ライブラリ                      | 戦略           | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) |   E2E応答性 | Hydration |
| ------------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | ----------: | --------: |
| **base** (i18nなし)             | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |     13.4 ms |   11.8 ms |
| `next-i18next`                  | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |     16.4 ms |   15.6 ms |
| `next-i18next`                  | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |     15.4 ms |   27.7 ms |
| `next-i18next`                  | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |     16.4 ms |   14.7 ms |
| `next-i18next`                  | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |     15.9 ms |   15.1 ms |
| **`next-intlayer`**             | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** | **15.5 ms** |   16.9 ms |
| **`next-intlayer`**             | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** | **15.3 ms** |   15.9 ms |
| `@intlayer/next-i18next` (互換) | static         |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |     10.7 ms |   11.3 ms |
| `@intlayer/next-i18next` (互換) | dynamic        |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |     11.9 ms |   10.6 ms |

**結果の解説**

- **ランタイムコスト**: `i18next`コア + `react-i18next`は、空のコンポーネントでも**19.7 KB gzip**と測定対象中最大で、`next-intlayer`の5.5 KBを大きく上回ります。
- **標準構成の肥大化**: `init()`に`resources`をインライン化すると、ベースアプリから+77.5 KB増の**218.5 KB/ページ**に達します。全ページが全名前空間を持ち歩くためです。
- **最適化の難易度**: バックエンド（`dynamic`）に切り替えると49 KB削減できますが、依然として**別ページの文字列が90%リーク**し、測定構成では半分が別言語の文字列となります。ルート単位の名前空間分割（`scoped-dynamic`）を導入してようやくリーク0%（**163.4 KB**）に達しますが、設定不要なIntlayerの141.3 KBより**22.4 KB重い**結果となります。
- **コンポーネントサイズ**: `useTranslation()`を使用するコンポーネントは構成に応じて26〜79 KBに膨らみますが、`useIntlayer()`を使う同一コンポーネントは6.9 KBで済みます。
- **ハイドレーション**: `dynamic`構成では27.7 msに悪化します。クライアント側でReactがハイドレーションを開始する前に、i18nextインスタンスが初期化されバックエンドを解決する必要があるためです。

### TanStack Startでの結果 (`react-i18next`)

Next.js特有のオーバーヘッドを排除するため、TanStack Start上で純粋な`react-i18next`を使用した比較です。

| ライブラリ          | 戦略           | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) |  E2E応答性 | Hydration |
| ------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | ---------: | --------: |
| **base** (i18nなし) | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |     8.1 ms |   21.6 ms |
| `react-i18next`     | static         |       18.4 KB |         180.3 KB |       50.0% |     89.8% |            24.3 KB |    12.9 ms |   85.1 ms |
| `react-i18next`     | dynamic        |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |   123.1 ms |   32.9 ms |
| `react-i18next`     | scoped-static  |       18.4 KB |         184.2 KB |       50.7% |     89.8% |            25.3 KB |   185.1 ms |   25.2 ms |
| `react-i18next`     | scoped-dynamic |       18.4 KB |         127.2 KB |        0.0% |      0.0% |            26.7 KB |    17.6 ms |   11.3 ms |
| **`intlayer`**      | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** | **3.2 ms** |   11.5 ms |
| **`intlayer`**      | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** | **3.6 ms** |   14.1 ms |

**結果の解説**

- 初期の`react-i18next`アプリはベースアプリより**+69 KB/ページ**重く、ハイドレーションに**85 ms**（ベースの4倍）かかります。初回の描画前にすべてのリソースツリーを解析・登録するためです。
- **言語切り替え時の遅延**: バックエンドによる遅延読み込みを行う場合、言語を変更するとネットワーク往復が発生してから`html[lang]`が更新されるため、`dynamic`で**123 ms**、`scoped-static`で**185 ms**を要します。対してIntlayerはどちらのモードでも**3〜4 ms**で即座にDOMが反映されます。
- 最大限に最適化した`scoped-dynamic`でも127.2 KBと、Intlayerの`dynamic`より**+8.6 KB**重く、ルートと名前空間のマッピングやSuspenseの設定などの複雑な作業が必要です。
- Intlayerの`static`は、該当ページのコンポーネントがインポートした辞書のみをバンドルするため、初期状態で**ページリーク0%**です。`importMode: 'dynamic'`を設定すれば、言語リークも0%になります。
- **コンポーネントサイズ**: `react-i18next`の24〜27 KBに対し、Intlayerは6〜8 KBです。

## なぜこれほどの差が出るのか？ グローバルインスタンス vs コンパイル済み辞書

`i18next`は2012年にランタイム主導で設計されました。グローバルインスタンスがリソースストアを保持し、プラグインがそれを拡張し、描画時に`t()`がキーを検索します。この構造が高い汎用性をもたらす一方で、オーバーヘッドの原因となっています：

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # ["common", "about"]が必要であることを把握しておく必要がある
```

インスタンスはコンポーネントがどのキーを必要とするか事前に知ることができないため、指定された名前空間をすべて保持します。最適化のためには、**開発者自身**がカタログを名前空間に分割し、ページごとの依存関係を定義し、コンポーネントの移動に合わせてメンテナンスし続ける必要があります。[ベンチマークノート](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md)にある通り、「型安全性を保ちながら各ページに必要な名前空間を正確に把握・維持することは非常に過酷な作業」です。

Intlayerはグローバルインスタンスを排除します。コンテンツはコンポーネントのすぐ隣で宣言され、コンパイラがビルド時に依存関係グラフを解決します：

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel`がコンポーネントと辞書の依存関係を追跡し、アクティブな言語に必要な辞書のみをバンドルし、未使用のコンテンツを切り捨てます。「scoped-dynamic」な最適化は、手作業のルールではなくビルドの成果物として自動的に実現されます。

> `dynamic`行の数値を再現するには、`intlayer.config.ts`で`dictionary.importMode: 'dynamic'`を設定します。詳細は[バンドル最適化ドキュメント](https://intlayer.org/ja/doc/concept/bundle-optimization)を参照してください。

## 開発者体験（DX）

### セットアップの比較

**next-i18next (App Router)**

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

これに加えて、クライアント側の`I18nProvider`の作成、`generateStaticParams`の設定、各ページでの名前空間リストの指定が必要です。

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

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

### クライアントコンポーネント

**react-i18next**

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> このコンポーネントを描画するページは`about`名前空間をロードする必要があり、`CustomTypeOptions`を拡張しない限り`t("counter.label")`の型安全性は保証されません。

**Intlayer**

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
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

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

`label`と`increment`は厳格に型付けされており、キーのタイポはTypeScriptエラーになり、フランス語の翻訳欠落はビルド時にエラーとして検出されます。

### 同期サーバーコンポーネント

**next-i18next**

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

ページ側で`i18n.getFixedT(locale, "about")`を呼び出し、Propsを通じて`t`と`locale`を渡す必要があります。

**Intlayer**

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

## i18nextのAPIのままIntlayerの最適化を享受する

既存のコンポーネントを書き換えることなく、上記のベンチマーク性能を得ることも可能です。`@intlayer/i18next`、`@intlayer/react-i18next`、`@intlayer/next-i18next`はドロップイン互換アダプターとして機能します。`useTranslation`、`t()`、`<Trans>`、`{{interpolation}}`、複数形接尾辞、コンテキスト接尾辞、`returnObjects`がそのまま動作し、背後ではIntlayerコンパイラが辞書を最適化して供給します。

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

ベンチマークでは、アプリコードを変更することなく、Next.jsアプリが1ページあたり**218.5 KBから150.7 KB**へ、コンポーネントが**78.5 KBから9.7 KB**へ、ページリークが**~90%から0%**へと改善し、ハイドレーション時間も15.6 msから11.3 msへ短縮されました。既存の`locales/{lng}/{ns}.json`は、JSON同期プラグインを介してマスターデータのまま運用できます。

詳細は移行ガイドをご覧ください: [i18next](https://intlayer.org/ja/doc/migration/i18next), [react-i18next](https://intlayer.org/ja/doc/migration/react-i18next), [next-i18next](https://intlayer.org/ja/doc/migration/next-i18next)。

## どちらを選ぶべきか？

- **i18nextを選ぶべき場合**: 豊富なプラグインエコシステム（各種バックエンド、ICU、Locize等）が不可欠な場合、React以外の領域（Node.jsサービス、Vanilla JS、他フレームワーク）でも同一ツールを使いたい場合、チームがすでに習熟している場合、翻訳プラットフォームが`locales/{lng}/{ns}.json`を前提としている場合。ただし、パフォーマンスを追求する場合は名前空間の設計やページマッピングの維持に十分なリソースを確保してください。
- **Intlayerを選ぶべき場合**: **コンポーネントスコープのコンテンツ管理**、**厳格なTypeScript型付け**、**ビルド時の翻訳漏れ検出**、**自動ツリーシェイキングと遅延ロード**、瞬時のロケール切り替え、同期サーバーコンポーネント、統合編集ツール（ビジュアルエディタ、CMS、AI翻訳支援、MCPサーバー）を重視する場合。モジュール化されたコードベースやデザインシステムに最適です。
- **`@intlayer/*-i18next`アダプターを選ぶべき場合**: すでにi18nextを採用しており、大規模なコード書き換えなしにバンドルサイズと応答性の向上を図りたい場合。

## 関連する比較記事

- [next-intl vs Intlayer](https://intlayer.org/ja/blog/next-intl-vs-intlayer)（同一ベンチマーク）
- [Lingui vs Intlayer](https://intlayer.org/ja/blog/lingui-vs-intlayer)（同一ベンチマーク）
- [vue-i18n vs Intlayer ベンチマーク](https://intlayer.org/ja/blog/vue-i18n-vs-intlayer-benchmark)（同一ベンチマーク）
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ja/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/ja/blog/react-i18next-vs-react-intl-vs-intlayer)
- [i18nextは時代遅れか？](https://intlayer.org/ja/blog/is-i18next-outdated)

## GitHubスター

GitHubスターは、プロジェクトの認知度、コミュニティの信頼、長期的な継続性の目安となります。技術的な優劣を直接測るものではありませんが、どれだけの開発者が関心を持ち、実務で採用しているかを反映しています。

[![スター履歴グラフ](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## 結論

`i18next`は10年以上にわたるメンテナンスと抜群の汎用性により、現在の地位を確立しました。しかし、今回のベンチマークはそのランタイム依存型アーキテクチャのコストを浮き彫りにしています。一般的な構成では**1ページあたり+70〜77 KB gzip**が加算され、**別ページの文字列が約90%漏洩**し、遅延ロード時の言語切り替えに**100 ms以上**かかります。リークを0%に抑えることも可能ですが、それには手動での名前空間マッピングが必要であり、それでもなおIntlayerより**9〜22 KB**重くなります。

Intlayerはこの負担をコンパイラに移行させました。コンポーネント単位の辞書分割、ロケールごとの遅延ロード、未使用コンテンツのパージは、手作業のルールではなくビルドの成果物として自動化されます。同一アプリでの実測値は、**1ページあたり+0.3 KB**、**リーク0%**、コンポーネントサイズ**3〜10倍削減**、ロケール切り替え**3〜4 ms**です。

テストアプリ、生データ、自動化スクリプトはすべて[Benchmark Bloomリポジトリ](https://github.com/intlayer-org/benchmark-bloom)で公開されています。ぜひご自身で追試してみてください。

詳細は['Why Intlayer?' ドキュメント](https://intlayer.org/ja/doc/why)をご覧ください。
