---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: 2026年においてvue-i18nは時代遅れなのか？
description: vue-i18nは10年以上にわたりVueとNuxtの標準として親しまれてきました。しかしベンチマークではWebで最も重いi18nランタイムという結果に。その理由を紐解きます。
keywords:
  - vue-i18n
  - Intlayer
  - 国際化
  - i18n
  - Vue
  - Nuxt
  - バンドルサイズ
  - ブログ
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# 2026年においてvue-i18nは時代遅れなのか？

Vueエコシステムにおいて、`vue-i18n`ほど広く定着したライブラリは他にありません。Vue 2時代からKazupon氏を中心に開発が続けられ、`@nuxtjs/i18n`の基盤としても採用されており、多言語対応Vueプロジェクトの第一候補となってきました。

しかし2026年のベンチマーク検証により、意外な事実が判明しました。**`vue-i18n`は、検証したすべての主要フロントエンドフレームワークの中で最も重いローカライズランタイムだったのです。**

Vite + Vueで構築した素の初期状態（31.5 KB）に`vue-i18n`を導入したところ、ページあたりの平均JavaScriptサイズは**136.4 KB**に達し、元の4倍以上に膨らみました。

軽量さを売りにするフレームワークで、なぜ国際化ツールがこれほど巨大になってしまうのでしょうか？そして従来のランタイム指向モデルは今も通用するのでしょうか？

<TOC/>

## 主なポイント

**検証中もっとも重いランタイム:**

テキストを追加する前の状態で**24.3 KB（gzip圧縮後、Minifiedで83.2 KB）**あり、`intlayer`のコアランタイム（2.7 KB）と比較して**約9倍のサイズ**です。

**ページ容量が330%増加:**

`vue-i18n`によって初期31.5 KBだったVueページが136.4 KBまで膨張しました。対照的にIntlayerは59.3 KBにとどまり、**56%軽量なペイロード**を実現します。

**ブラウザ内に含まれるコンパイラ:**

バンドラーで適切なエイリアス設定を行わない限り、`vue-i18n`はブラウザ上で文字列を解析するためにフルスペックのメッセージコンパイラをクライアントへ送り込みます。

**更新ペースの現状:**

過去1年間で`vue-i18n`のコミットは約259回行われましたが、主にバグ修正とVueのマイナー追従が中心です。

**次世代開発ツールの不在:**

Language Server（LSP）、AI向けMCPサーバー、CLIを通じた自動翻訳パイプラインなど、公式の現代的ツールが揃っていません。

## 保守状況と現代ツールの比較

| リポジトリ            | スター数                                                                                                                                               | 総コミット数                                                                                                                                                        | 年間コミット数                                                                                                                                                     | 最終コミット                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

過去12か月間の実績:

- `intlify/vue-i18n`: **259コミット**（Vue 3およびNuxt向けの定期保守）。
- `aymericzip/intlayer`: **4,343コミット**（コンパイラ最適化、LSP機能、AI連携ツールの継続開発）。

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

歴史あるライブラリには安定性の利点があります。しかし近年の開発手法は、ビルド時のAST解析、デッドコード除去、AIによる自動化を前提としています。クライアント上での実行に依存するアーキテクチャでは、こうした進化を取り入れるのが難しくなります。

## Vite + Vueでの性能測定

ViteとVue 3による10ページ、10言語構成のアプリケーションで測定:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> 実ブラウザ環境で本番用gzip圧縮を適用して計測。詳細は[Vueベンチマークドキュメント](https://intlayer.org/ja/doc/benchmark/vue)をご覧ください。

### 初期ライブラリのサイズ

翻訳テキストを読み込む前のフットプリント:

| ライブラリ        | Gzip圧縮後 | Minified   |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB    |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB** |

`vue-i18n`のランタイムだけで**24.3 KB（gzip圧縮後）**を占め、Vueのコア全体に近い容量です。これに対してIntlayerはわずか**2.7 KB**にとどまります。

### ページサイズと不要データの混入率

| 構成               | 平均ページJS (gz) | 他言語混入率 | 他ページ混入率 | 平均コンポーネント (gz) |
| ------------------ | ----------------- | ------------ | -------------- | ----------------------- |
| ベース（i18nなし） | 31.5 KB           | 0.0%         | 90.0%          | 0.9 KB                  |
| `vue-i18n`         | **136.4 KB**      | 50.2%        | 90.0%          | 196.0 KB                |
| Intlayer           | **59.3 KB**       | 51.1%        | **0.0%**       | **6.5 KB**              |

### 主な分析結果

**相対的な増大率の高さ:**

Vue自体のフットプリントが非常に小さいため（約31 KB）、`vue-i18n`を追加することでページ全体の容量が4倍以上に跳ね上がります。

**他ページ翻訳の混入:**

デフォルト設定では、特定のルートに届く**テキストデータの90%**が他のページ用です。Intlayerはこれをビルド時に完全に排除し、**0.0%**に抑えます。

**スコープ付きコンポーネントの肥大化:**

辞書が重複してバンドルされるため、`vue-i18n`を使ったスコープ付きコンポーネントの平均サイズは196 KBに達しました。一方、Intlayerでは**6.5 KB**です。

## なぜvue-i18nは重いのか？

### ブラウザへ同梱されるASTコンパイラ

`vue-i18n`はメッセージフォーマット用の独自コンパイラを内蔵しています。複数形判定や変数置換を、ブラウザの実行時に構文木（AST）へ変換して解釈します。

これを回避するには、バンドラー設定で`vue-i18n/dist/vue-i18n.runtime.esm-bundler.js`へのエイリアスを指定し、`@intlify/unplugin-vue-i18n`を用いて事前コンパイルを行う必要がありますが、多くのプロジェクトで見落とされています。

### モノリシックな多機能設計

日付・数値フォーマッター、リンクメッセージ、旧来のOptions API向けブリッジ（`$t`, `v-t`）、リアクティブプロキシなどが一体となっています。`<script setup>`内でごく単純なテキストを表示したいだけであっても、すべての機能群が読み込まれます。

### 動的キーによるTree-shakingの阻害

`"home.hero.title"`が実行時に解釈されるため、バンドラーはどのキーが実際に使用されているかを追跡できません。不要なテキストもそのままバンドル内に残存します。

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

[Intlayerコンパイラ](https://intlayer.org/ja/doc/compiler)はアクセスされたプロパティを正確に追跡し、クライアント用チャンクをビルドする前に未使用データをカットします。詳細は[バンドル最適化](https://intlayer.org/ja/doc/concept/bundle-optimization)をご覧ください。

## 開発体験（DX）の比較

### 分離されたJSONとコンポーネント共配置

`vue-i18n`では翻訳文が遠く離れた`locales/`フォルダに保存されます。Intlayerならコンポーネントのすぐ隣にコンテンツファイルを配置できます。

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/ja.json"
{
  "hero": {
    "title": "あらゆる言語でリリースしよう"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      ja: "あらゆる言語でリリースしよう",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

`Hero.vue`をリネームまたは削除すれば、対応するコンテンツ定義も連動して処理されます。

### エディタ補完と厳密な完全性の違い

`DefineLocaleMessage`を使用すればエディタ上でキーの候補が表示されます。しかし全言語の網羅性まではチェックされません。`ja.json`からキーが欠落していてもTypeScriptはビルドを止めません。

Intlayerでは辞書の内容が厳密に検証されます。[`strictMode`](https://intlayer.org/ja/doc/concept/configuration)を有効にすれば、いずれかの言語で翻訳が不足している場合にビルドエラーが発生します。

### エディタおよびAIツールのサポート

| ツール                            | `vue-i18n`          | Intlayer                                                              |
| --------------------------------- | ------------------- | --------------------------------------------------------------------- |
| **VS Code拡張機能**               | 有志製（i18n Ally） | ✅ [公式拡張機能](https://intlayer.org/ja/doc/vs-code-extension)      |
| **Language Server (LSP)**         | ❌ なし             | ✅ [専用LSP](https://intlayer.org/ja/doc/lsp)                         |
| **AI用MCPサーバー**               | ❌ なし             | ✅ [内蔵MCPサーバー](https://intlayer.org/ja/doc/mcp-server)          |
| **エージェントスキル**            | ❌ なし             | ✅ [自律型スキル](https://intlayer.org/ja/doc/agent_skills)           |
| **インコンテキストビジュアルCMS** | ❌ なし             | ✅ [無料・オープンソース](https://intlayer.org/ja/doc/concept/editor) |

## 翻訳ワークフロー

`vue-i18n`には翻訳を自動生成するコマンドがありません。外部のCrowdinやPhrase等へファイルを送るのが通例です。

Intlayerは自前のツールチェーンを提供しています。

**ローカルAI翻訳機能（`intlayer fill`）:**

自身のOpenAI、Anthropic、Mistral、GeminiのAPIキーを使って、不足しているキーを自動翻訳します。

**セルフホスト対応ビジュアルCMS:**

[Intlayer CMS](https://intlayer.org/ja/doc/concept/cms)を起動し、非エンジニアのメンバーがWeb上で修正した内容を直接Gitに保存できます。

**オープンソースライセンス:**

すべてのツールがApache 2.0ライセンスで利用可能です。

## 今もvue-i18nが選択肢となるケース

<AccordionGroup>
<Accordion header="稼働中のNuxt 2/3大規模プロダクト">

ルーティングが`@nuxtjs/i18n`と緊密に結合している場合、システム刷新のコストが見合わないことがあります。

</Accordion>
<Accordion header="複雑なICUフォーマットを駆使している場合">

多重ネストされたメッセージリンクや高度な数値・日付フォーマットを多用している環境。

</Accordion>
<Accordion header="個人開発や小規模な検証プロジェクト">

バンドルサイズがUXやビジネス成果に大きく影響しないケース。

</Accordion>
</AccordionGroup>

## 既存のvue-i18n環境を向上させるには？

Intlayerは、`vue-i18n`および`@nuxtjs/i18n`の関数シグネチャ（`useI18n`、`$t`、`<i18n-t>`）をそのまま再現するドロップイン互換パッケージを提供しています。テンプレートやComposableを書き換えることなく、コンパイラ主導の軽量アーキテクチャの恩恵を受けることができます。

導入はコマンド1行で完了します:

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

この対話型CLIは以下の作業を自動で行います:

1. `@intlayer/vue-i18n`または`@intlayer/nuxt-i18n`互換パッケージをインストール。
2. ViteまたはNuxtバンドラーのエイリアスを設定し、既存のインポートやテンプレート記述をシームレスにIntlayerへルーティング。これにより`vue-i18n`を`package.json`から安全に削除できます。
3. Language Server（LSP）診断の即時有効化、クライアントバンドルからの24KB ASTパーサーの完全排除、ローカルAI翻訳ワークフローを大規模なリファクタリングなしで利用可能にします。

詳しい手順については、以下のガイドをご覧ください:

- **互換レイヤーの活用:** [`vue-i18n`互換レイヤー](https://intlayer.org/ja/doc/compatibility/vue-i18n)または[`@nuxtjs/i18n`互換レイヤー](https://intlayer.org/ja/doc/compatibility/nuxtjs-i18n)を使うことで、既存のテンプレートを維持したまま導入できます。
- **移行ガイドライン:** 既存のJSONファイルを型付き辞書へ移行するためのドキュメントを用意しています。[vue-i18nからの移行](https://intlayer.org/ja/doc/migration/vue-i18n)、[@nuxtjs/i18nからの移行](https://intlayer.org/ja/doc/migration/nuxtjs-i18n)。
- **ハイブリッド構成:** ランタイムとして`vue-i18n`を使い続けながら、[Intlayerとvue-i18nを連携](https://intlayer.org/ja/blog/intlayer-with-vue-i18n)させて厳格な型安全性とローカルAI翻訳を活用することも可能です。

自社サイトのサイズと翻訳漏れは無料の[i18n SEOスキャナー](https://intlayer.org/i18n-seo-scanner)で診断できます。

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## おすすめの記事

- [Vue & Vite i18nベンチマーク: パフォーマンス詳細比較](https://intlayer.org/ja/doc/benchmark/vue)
- [vue-i18n vs Intlayer: 項目別比較](https://intlayer.org/ja/blog/vue-i18n-vs-intlayer)
- [2026年においてnext-intlは時代遅れなのか？](https://intlayer.org/ja/blog/is-next-intl-outdated)
- [コンパイラ主導型国際化と宣言的i18nの比較](https://intlayer.org/ja/blog/compiler-vs-declarative-i18n)
