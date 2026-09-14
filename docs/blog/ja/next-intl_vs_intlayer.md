---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl vs Intlayer: 2026 ベンチマーク＆比較"
description: Bundle size、content leakage、locale-switch の反応性、および Next.js と TanStack Start での開発者体験を測定。2026年ではどのi18nライブラリを選ぶべきでしょうか？
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Next.js 国際化 (i18n) ベンチマーク

`next-intl`はNext.jsで最も人気のあるi18nライブラリです。Intlayerはコンパイラベース、コンポーネントスコープの代替案です。どちらもApp Routerアプリケーションをローカライズします。問題は、アプリがビルドされた後、それぞれがどの程度のコストがかかるかということです。

この記事はチュートリアルではありません。[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)からの数値に基づいた比較です。Benchmark Bloomはオープンソースのベンチマークスイートで、各ライブラリで同じアプリケーションをビルドし、ブラウザが実際にダウンロードして実行するものを測定します。

<TOC/>

> **tl;dr**: 同じ Next.js アプリケーションで、`next-intl` は全ページで **+12.6 KB gzip** の JavaScript を追加しますが、Intlayer は **+0.3 KB** です。追加の作業なしで、`next-intl` は全ページで **~90% の外国語ページ文字列** を配信します。`next-intl` で 0% のリークを達成するには、namespace スコープと per-page `pick(messages, [...])` が必要です。Intlayer はデフォルトで 0% に達します。なぜなら、そのコンパイラがコンテンツをコンポーネント単位でスコープするからです。`next-intl` API を Intlayer の出力で使いたい場合、`@intlayer/next-intl` アダプタは 1 ページあたり **147.5 KB** と測定されたのに対し、元のものは **153.6 KB** です。

## 要するに

- **next-intl** - 軽量でドキュメントが充実しており、ICU message format、App Router への first-class なサポート、middleware、formatters、navigation helpers を備えています。コンテンツは集中管理された JSON カタログに保存され、パフォーマンス最適化（namespaces、ページごとのメッセージ picking、lazy loading）はあなたの責任です。
- **Intlayer** - コンポーネント中心のコンテンツモデル。`.content.ts` dictionaries はそれが提供するコンポーネントの隣に配置され、build-time compiler がコンポーネントごと、locale ごとに tree-shake と lazy-load を行い、厳密な TypeScript 型がコンテンツから生成され、翻訳漏れは build 時に失敗します。middleware、SEO helpers、Visual Editor / CMS、AI 支援翻訳機能を搭載しています。

| ライブラリ            | GitHub スター                                                                                                                                                                  | 総コミット数                                                                                                                                                                       | 最後のコミット                                                                                                                                      | 最初のバージョン | NPM バージョン                                                                                                | NPM ダウンロード数                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | 2024年4月        | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | 2020年11月       | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> バッジは自動的に更新されます。スナップショットは時間とともに変わります。

## 機能比較

| 機能                                               | `next-intlayer` (Intlayer)                                                        | `next-intl`                                                                                                  |
| -------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **コンポーネント近くの翻訳**                       | ✅ はい、各コンポーネントに並置された `.content.ts`                               | ❌ いいえ、集中管理された `messages/{locale}.json`                                                           |
| **TypeScript統合**                                 | ✅ コンテンツから自動生成された厳密な型                                           | ✅ 良好、`global.d.ts` 拡張機能を使用してキーに型を付ける                                                    |
| **翻訳不足の検出**                                 | ✅ TypeScriptエラー + ビルド時エラー/警告                                         | ⚠️ ランタイム フォールバック + コンソール警告                                                                |
| **リッチコンテンツ (JSX / Markdown / components)** | ✅ 直接サポート                                                                   | ⚠️ `t.rich()` / `t.markup()` タグプレースホルダー付き                                                        |
| **ICU サポート**                                   | ⚠️ WIP                                                                            | ✅ Yes                                                                                                       |
| **フォーマット (日付、数値、通貨)**                | ✅ `useNumber`, `useDate`, ... (内部的に Intl を使用)                             | ✅ `useFormatter()` (内部的に Intl を使用)                                                                   |
| **ローカライズされたルーティング & ミドルウェア**  | ✅ ビルトイン proxy/middleware、`getMultilingualUrls`                             | ✅ ビルトイン middleware、`Link`、`redirect`、`usePathname`                                                  |
| **SEO ヘルパー (hreflang、sitemap、robots)**       | ✅ ビルトイン ヘルパー                                                            | ⚠️ 手動、ルーティング設定に基づく                                                                            |
| **同期サーバーコンポーネント**                     | ✅ `next-intlayer/server` の `useIntlayer` は任意の子サーバーコンポーネントで動作 | ⚠️ `getTranslations` は非同期; 同期子は `t` をプロップとして渡す必要がある                                   |
| **静的レンダリング**                               | ✅ 静的レンダリングをブロックしない                                               | ⚠️ `setRequestLocale()` が必須; 名前空間付きカタログは、当社のテストでもページを静的レンダリングから除外する |
| **Tree-shaking (使用済みコンテンツのみをシップ)**  | ✅ コンポーネントごと、ロケールごと、コンパイラによって自動化                     | ⚠️ 手動: 名前空間 + ページごとの `pick(messages, [...])`                                                     |
| **遅延読み込み**                                   | ✅ `importMode: 'dynamic'` (設定1行)                                              | ⚠️ 手動: `getRequestConfig` での動的インポート                                                               |
| **未使用コンテンツの削除**                         | ✅ デッドな辞書はビルド時にドロップされます                                       | ❌ 組み込みではありません                                                                                    |
| **翻訳の欠落をテスト (CLI / CI)**                  | ✅ `npx intlayer content test`                                                    | ⚠️ 組み込みではありません; ドキュメントは `npx @lingual/i18n-check` を示唆しています                         |
| **AI による翻訳**                                  | ✅ 組み込み、独自のプロバイダーキーを使用します                                   | ❌ いいえ                                                                                                    |
| **ビジュアルエディタ / CMS**                       | ✅ 無料ビジュアルエディタ + オプションCMS                                         | ❌ いいえ (外部ローカライゼーションプラットフォーム)                                                         |
| **MCPサーバー & エージェントスキル**               | ✅ はい                                                                           | ❌ いいえ                                                                                                    |
| **エコシステム / コミュニティ**                    | ⚠️ より小規模だが急速に成長中                                                     | ✅ 大規模、Next.jsの参照実装                                                                                 |

## ベンチマーク

### 測定内容

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) スイートは、各ライブラリで**同じアプリケーション**をビルドします：**10ページ**（ホーム、アバウト、ブログ、キャリア、コンタクト、FAQ、プライシング、プロダクト、設定、チーム）、**10ロケール**（`en`、`fr`、`es`、`de`、`it`、`pt`、`zh`、`ja`、`ko`、`ru`）、同一のコンポーネントと同一のコンテンツ。ページは`en`と`fr`で測定されます。各ライブラリは、最も単純なセットアップから最適なセットアップまで、最大4つの**ロード戦略**で実装されています：

| 戦略               | 説明                                                                              | これを行うのは                       |
| ------------------ | --------------------------------------------------------------------------------- | ------------------------------------ |
| **static**         | すべてのlocaleとすべてのページが一緒にバンドルされている                          | クイックプロトタイプ、AI生成コード   |
| **dynamic**        | アクティブなlocaleのみがロードされるが、すべてのページが一度にロードされる        | ほとんどのプロジェクト               |
| **scoped-static**  | ルートごとのnamespaces、lazy loadingなし                                          | まれ                                 |
| **scoped-dynamic** | ルートごとのnamespaces + lazy loading。現在のページの現在のlocaleのみが送信される | 厳密なパフォーマンス予算を持つアプリ |

Intlayerには「scoped」バリアントがありません。compilerはコンテンツを**コンポーネントごと**に自動的にスコープするため、その`static`と`dynamic`の行はすでにスコープされています。

各ビルドについて、スイートは以下を記録します：

- **Lib size**: i18n ライブラリのみをインポートする空のコンポーネントの gzip サイズ。ランタイムの固定コスト。
- **Page JS**: ページごとにダウンロードされた gzip JavaScript。すべてのページとロケール全体で平均化されます。
- **Locale leak %**: ダウンロードされた JS に含まれる翻訳文字列のうち、ユーザーが**閲覧していない**ロケールに属する割合（`en` と `fr` でフィンガープリント化されているため、50% は「他の測定されたロケールが完全に存在する」を意味します。10 個のロケールがバンドルされている場合、実際の無駄はさらに大きくなります）。
- **Page leak %**: ダウンロードされた JS に含まれる翻訳文字列のうち、ユーザーが**いないページ**に属する割合。
- **Component avg**: 分離してコンパイルされた各コンポーネントの平均 gzip サイズ。単一のコンポーネントが i18n ランタイムをどの程度ドラッグインするかを示します。
- **E2E reactivity**: 新しいlocaleを選択してから、DOM内の`html[lang]`が更新されるまでの実際の経過時間（Playwright、5回の反復）。
- **Hydration**: Reactのhydrationフェーズの継続時間。

> 以下の数字は、`next-intl` 4.14.2、`use-intl` 4.14.2、`intlayer` 9.5.1を使用した**2026-09-12**実行日のものです。テストアプリケーションは意図的に小規模（locale あたり数十個の文字列）であるため、漏洩パーセンテージは**パターン**を説明します：コンテンツが増えるにつれて増加し、ランタイムコストは固定されたままです。

### Next.js（App Router）の結果

| Library                        | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (i18n なし)           | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| `next-intl`                    | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |   14.7 ms |
| `next-intl`                    | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |   14.8 ms |
| `next-intl`                    | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |   17.4 ms |
| `next-intl`                    | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |   16.8 ms |
| **`next-intlayer`**            | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**            | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |
| `@intlayer/next-intl` (compat) | static         |        8.0 KB |         147.5 KB |        0.0% |      0.0% |             8.1 KB |        14.5 ms |   12.8 ms |
| `@intlayer/next-intl` (compat) | dynamic        |        8.0 KB |         148.7 KB |        0.0% |      0.0% |             8.1 KB |        11.7 ms |   12.8 ms |

**読み方**

- **ランタイムコスト。** ベースアプリケーションのサイズはページあたり 141.0 KB です。`next-intl` はこれを 153.6 KB に増加させます（**毎ページ +12.6 KB gzip**）、Intlayer は 141.3 KB に増加させます（**+0.3 KB**）。このギャップは、文字列がいくつあるかに依存しません。これはライブラリランタイムです。
- **Leakage.** 最も一般的に使用されている2つのセットアップ（`static`と`dynamic`）では、`next-intl`は**すべてのページに外国語ページの文字列の約90%を配信します**。つまり、すべての`en.json`がクライアントプロバイダーに組み込まれます。0%に達するには、`scoped-*`セットアップが必要です。カタログを名前空間に分割し、各ページで正しいものを`pick()`します。Intlayerは、そのような手段なしに両方の行で0%です。
- **`next-intl`のページごとのJSは戦略間で変わりませんでした。** テストコンテンツが小さいため、ここでは～90%のleakはわずか数KBです。実際のアプリで1ページあたり数百の文字列がある場合、その比率が主要なコストになります。一方、+12.6 KBのランタイムはすべての設定で支払われます。
- **コンポーネントサイズ。** `useTranslations()`を呼び出すコンポーネントは平均21.8 KBにコンパイルされ、`useIntlayer()`を使用した同じコンポーネントは6.9 KBにコンパイルされます。`scoped-static`セットアップでは、各コンポーネントがそのnamespace catalogをインラインで含めるため、`next-intl`コンポーネントは80.1 KBにジャンプします。
- **リアクティビティとhydration**は、Next.js上の両方のライブラリで同じ範囲内です（15-18 ms）。ここではどちらもボトルネックではありません。

### TanStack Startでの結果（`use-intl`）

`use-intl`は`next-intl`のframework-agnosticなコアです。同じAPI、同じメッセージフォーマット。TanStack Startで`intlayer`と比較することで、方程式からNext.js固有の部分を削除します。

| Library                       | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |
| ----------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: |
| **base** (i18n なし)          | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |
| `use-intl`                    | static         |       14.1 KB |         179.8 KB |       50.0% |     89.8% |            76.0 KB |         6.7 ms |
| `use-intl`                    | dynamic        |       14.1 KB |         119.4 KB |        0.0% |     89.8% |            75.9 KB |         7.0 ms |
| `use-intl`                    | scoped-static  |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        20.9 ms |
| `use-intl`                    | scoped-dynamic |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        13.3 ms |
| **`intlayer`**                | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |
| **`intlayer`**                | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |
| `@intlayer/use-intl` (compat) | dynamic        |        7.3 KB |         129.7 KB |        0.0% |      0.0% |             9.3 KB |         8.7 ms |

**読み方**

- 素朴な `use-intl` セットアップは、ベースアプリより **ページあたり 68.8 KB 多い JS** を配信しており、文字列の半分は間違ったロケールに属し、90% は間違ったページに属しています。
- `use-intl`の`dynamic`モードは119.4 KBに達し、Intlayerの118.6 KBに近いですが、それでも**89.8%のページリーク**を抱えています：アクティブなロケールのすべてのページの文字列がすべてのページで読み込まれます。それらをルートごとにスコープする（`scoped-*`）リークを削除しますが、さらに約9 KBのチャンク オーバーヘッドが必要です。
- Intlayerの`static`行は既に**0%のページリーク**があります：コンパイラはページ上のコンポーネントで使用されている辞書のみをバンドルします。`intlayer.config.ts`で1行の`importMode: 'dynamic'`を有効にすると、ロケールリークも削除されます。
- **コンポーネントサイズはアーキテクチャが表れる場所です**：`use-intl`ではコンポーネントあたり76～87 KB対Intlayerの6～8 KB。`useTranslations()`は各コンポーネントをグローバルメッセージツリーにバインドします。`useIntlayer()`はそれを独自の辞書にバインドします。
- **ロケール切り替え**は Intlayer で 2 倍～4 倍高速化されています（3 ms 対 7-21 ms）。

## なぜギャップがあるのか？集中型カタログ vs コンパイル済み辞書

`next-intl` は従来のモデルに従います：ロケールごとに 1 つの JSON、`getRequestConfig` で読み込み、`NextIntlClientProvider` にプッシュされ、`t("namespace.key")` で読まれます。

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

ランタイムはページがどのキーを使用するかを知ることができないため、安全なデフォルトはカタログ全体を送信することです。最適化するには、**あなた**がカタログを namespace に分割し、**あなた**が各ページに必要な namespace を決定し、**あなた**がコンポーネントが移動するにつれてそのマッピングを同期させ続ける必要があります。ベンチマークの `scoped-dynamic` 行はその作業の報酬であり、ほとんどのチームはそこに到達しません。

Intlayer は責任を逆転させます。コンテンツはコンポーネントの隣に宣言されます：

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           ├── page.tsx
    │           └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

ビルド時に、コンパイラ (`@intlayer/swc` / `@intlayer/babel`) はどのコンポーネントがどの辞書をインポートしているかを認識します。これらの辞書をバンドルし、アクティブなロケールのみを対象とし、何もインポートしていないものは削除されます。「scoped-dynamic」パターンは、チームが維持しなければならない規律ではなく、ビルドの出力になります。

> `dynamic` 行の数値を取得するには、`intlayer.config.ts` で `dictionary.importMode: 'dynamic'` を設定してください。[bundle optimization doc](https://intlayer.org/doc/concept/bundle-optimization) を参照してください。

## 開発者体験

### Client component

**next-intl**

```json fileName="messages/en.json"
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
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  // "counter"名前空間からの翻訳を取得
  const t = useTranslations("counter");
  // フォーマッター関数を取得
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> このコンポーネントをレンダリングするすべてのページで、`NextIntlClientProvider`に渡されるメッセージに`counter`名前空間を含めることを忘れないでください。

**Intlayer**

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ ja: "カウンター", en: "Counter", fr: "Compteur" }),
    increment: t({ ja: "増加", en: "Increment", fr: "Incrémenter" }),
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
  // "counter"ネームスペースから翻訳コンテンツを取得
  const { label, increment } = useIntlayer("counter");
  // 数値をフォーマットするための関数を取得
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

ページに登録する必要はありません。コンポーネントが独自のコンテンツを提供します。

### 同期サーバーコンポーネント

Design-system pieces (navbar, footer, cards) はしばしば client components の子として render される server components であるため、`async` にすることはできません。

**next-intl**

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

ページは `await getTranslations("counter")` と `await getFormatter()` を実行し、その結果を props として下に渡す必要があります。コンポーネントはもはや self-contained ではありません。

**Intlayer**

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  // 数値をフォーマットするためのフック
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

### メタデータ

**next-intl**

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

// ロケールに基づいてパスをローカライズする関数
const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  // localesオブジェクトを作成し、各localeに対応するパスをマッピング
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

**Intlayer**

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

## next-intl API を維持しながら Intlayer の出力を取得する

ベンチマーク結果を得るためにコンポーネントを書き換える必要はありません。`@intlayer/next-intl` はドロップイン アダプターです。`useTranslations`、`getTranslations`、`useFormatter`、`t.rich()`、ICU複数形、および `next-intl/navigation` ヘルパーを保持し、Intlayer コンパイラでコンパイルされた Intlayer辞書から提供します。

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

ベンチマークにおいて、同じアプリの互換ビルドは、アプリケーションコードに一切手を加えることなく、ページあたり **153.6 KB から 147.5 KB**、コンポーネントあたり **21.8 KB から 8.1 KB**、ページリークは **約90% から 0%** へと改善しました。既存の `messages/{locale}.json` ファイルは、[JSON 同期プラグイン](https://intlayer.org/ja/doc/compatibility/next-intl) を通じて信頼できる情報源として維持できます。

ステップバイステップの手順については、[next-intl 移行ガイド](https://intlayer.org/ja/doc/migration/next-intl) を参照してください。

## どちらを選ぶべきか？

- **next-intl を選ぶべきケース**: Next.js のエコシステム標準を重視する場合、ICU MessageFormat に依存している場合、アプリが小〜中規模の場合、または中央集権型の JSON を想定する翻訳プラットフォーム（Crowdin、Phrase、Lokalise など）と統合する場合。パフォーマンスが重要な場合は、名前空間カタログの分割やページごとのメッセージ抽出に時間を割く必要があります。
- **Intlayer を選ぶべきケース**: **コンポーネント単位のコンテンツ**、**厳格な TypeScript**、**ビルド時のキー不足エラー検出**、**設定不要のツリーシェイキングと遅延読み込み**、同期サーバーコンポーネント、組み込みの編集ツール（ビジュアルエディター、CMS、AI 翻訳、MCP サーバー）を求める場合。特に大規模でモジュール化されたコードベースやデザインシステムに適しています。
- **`@intlayer/next-intl` を選ぶべきケース**: すでに `next-intl` を使用しており、コードを書き換えることなくバンドルサイズの削減効果を得たい場合。

## 関連する比較

- [i18next vs Intlayer](https://intlayer.org/ja/blog/i18next-vs-intlayer) (同一ベンチマーク)
- [Lingui vs Intlayer](https://intlayer.org/ja/blog/lingui-vs-intlayer) (同一ベンチマーク)
- [vue-i18n vs Intlayer ベンチマーク](https://intlayer.org/ja/blog/vue-i18n-vs-intlayer-benchmark) (同一ベンチマーク)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ja/blog/next-i18next-vs-next-intl-vs-intlayer)
- [next-intl は時代遅れか？](https://intlayer.org/ja/blog/is-next-intl-outdated)

## GitHub STARS

GitHub のスター数は、プロジェクトの人気、コミュニティの信頼、長期的な持続可能性を示す強力な指標です。技術的な品質を直接測るものではありませんが、どれだけ多くの開発者がそのプロジェクトを有用だと感じ、その進捗を追い、採用しているかを反映しています。

[![スター履歴チャート](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## 結論

`next-intl` は堅牢でよくメンテナンスされたライブラリであり、ベンチマーク結果からも Next.js における決して悪い選択肢ではないことが確認できます。しかし、中央集権型のカタログモデルは、あらゆる最適化の負担を開発者に課します。素朴な構成では他ページのコンテンツが約90%リークし、ランタイムだけでもすべてのページで +12.6 KB gzip のコストが発生します。

Intlayer はその作業をコンパイラに移行します。コンポーネントごとの辞書、ロケールごとの遅延読み込み、不要なコンテンツの削除は、慣習ではなくビルド出力です。同じアプリでの結果は、**ページあたり +0.3 KB**、**リーク 0%**、コンポーネントは **3分の1のサイズ**、そして TanStack Start での言語切り替えは **2〜4倍高速** でした。

すべての生データ、テストアプリ、スクリプトは [Benchmark Bloom リポジトリ](https://github.com/intlayer-org/benchmark-bloom) で公開されています。ぜひご自身でお試しください。

詳細については、['Why Intlayer?' ドキュメント](https://intlayer.org/ja/doc/why) を参照してください。
