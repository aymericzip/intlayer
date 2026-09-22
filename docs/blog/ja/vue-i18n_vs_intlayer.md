---
createdAt: 2024-08-11
updatedAt: 2026-09-22
title: vue-i18n vs Intlayer
description: Vue/Nuxtアプリにおける国際化（i18n）について、vue-i18nとIntlayerを比較
keywords:
  - vue-i18n
  - Intlayer
  - 国際化
  - i18n
  - ブログ
  - Vue
  - Nuxt
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n VS Intlayer | Vueの国際化（i18n）

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

本ガイドでは、**Vue 3**（および**Nuxt**）向けの人気i18nオプションである**vue-i18n**と**Intlayer**を比較します。  
モダンなVueツール（Vite、Composition API）に焦点を当て、以下を評価します：

1. **アーキテクチャとコンテンツの構成**
2. **TypeScriptと安全性**
3. **翻訳漏れの取り扱い**
4. **ルーティングとURL戦略**
5. **パフォーマンスと読み込み挙動**
6. **開発者体験（DX）、ツールとメンテナンス**
7. **SEOと大規模プロジェクトのスケーラビリティ**

<TOC/>

> **要約**：どちらもVueアプリのローカライズが可能です。もし**コンポーネント単位のコンテンツ管理**、**厳格なTypeScript型**、**ビルド時の未翻訳キー検出**、**ツリーシェイク可能な辞書**、そして**ルーターやSEOヘルパーが標準装備**されていて、さらに**ビジュアルエディターとAI翻訳**も欲しいなら、**Intlayer**がより完全でモダンな選択肢です。

## 高レベルのポジショニング

- **vue-i18n** - Vueの事実上の標準i18nライブラリ。柔軟なメッセージフォーマット（ICUスタイル）、ローカルメッセージ用のSFC `<i18n>` ブロック、大規模なエコシステムを持ちます。安全性や大規模メンテナンスは主にユーザーの責任です。
- **Intlayer** - Vue/Vite/Nuxt向けのコンポーネント中心のコンテンツモデルで、**厳格なTS型付け**、**ビルド時チェック**、**ツリーシェイキング**、**ルーター＆SEOヘルパー**、オプションの**ビジュアルエディター/CMS**、および**AI支援翻訳**を備えています。

## ビルド時にかかるコスト

機能比較表の前に、実測値をご覧ください。[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) は同じ Vite + Vue 3 アプリ（10ページ、10言語）を各ライブラリで構築し、ブラウザがダウンロードするサイズを記録しています：

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                | Lib size (gz) | Page JS avg (gz) | Page leak | Component avg (gz) |
| -------------------- | ------------: | ---------------: | --------: | -----------------: |
| **base** (no i18n)   |        0.0 KB |          41.3 KB |         - |             1.1 KB |
| `vue-i18n`           |       24.3 KB |         134.9 KB |     90.0% |           196.0 KB |
| `@intlayer/vue-i18n` |        7.9 KB |          47.0 KB |      0.0% |             8.4 KB |
| **`vue-intlayer`**   |    **3.9 KB** |      **57.1 KB** |  **0.0%** |         **7.7 KB** |

`vue-i18n` のランタイム単体で Intlayer の **6倍** の重さがあり、各ページは **90% の他ページの文字列** を抱え込み、単独でコンパイルされたコンポーネントは `useI18n()` がグローバルなメッセージツリーにバインドするため **196 KB** を引き込みます。リアクティビティやページ読み込み時間の完全な計測結果は、[vue-i18n vs Intlayer ベンチマーク](https://intlayer.org/ja/blog/vue-i18n-vs-intlayer-benchmark) をご覧ください。

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> 完全な表は [Vueベンチマークレポート](https://intlayer.org/ja/doc/benchmark/vue) をご覧ください。

## 機能の比較（Vueに特化）

| 機能                                                     | **Intlayer**                                                                          | **vue-i18n**                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **コンポーネント近くの翻訳**                             | ✅ はい、コンポーネントごとにコンテンツが共置（例：`MyComp.content.ts`）              | ✅ はい、SFCの`<i18n>`ブロック経由（オプション）                            |
| **TypeScript統合**                                       | ✅ 高度で自動生成された**厳密な**型とキーのオートコンプリート                         | ✅ 良好な型定義；**厳密なキー安全性は追加の設定/規律が必要**                |
| **翻訳漏れ検出**                                         | ✅ **ビルド時**の警告/エラーとTSへの反映                                              | ⚠️ 実行時のフォールバック/警告                                              |
| **リッチコンテンツ（コンポーネント/Markdown）**          | ✅ リッチノードおよびMarkdownコンテンツファイルの直接サポート                         | ⚠️ 制限あり（コンポーネントは`<i18n-t>`経由、Markdownは外部プラグイン経由） |
| **AIによる翻訳**                                         | ✅ 独自のAIプロバイダーキーを使用した組み込みワークフロー                             | ❌ 組み込みなし                                                             |
| **ビジュアルエディター / CMS**                           | ✅ 無料のビジュアルエディターおよびオプションのCMS                                    | ❌ 組み込みなし（外部プラットフォームを使用）                               |
| **ローカライズされたルーティング**                       | ✅ Vue Router/Nuxt用のローカライズされたパス、URL、および`hreflang`を生成するヘルパー | ⚠️ コア機能ではない（Nuxt i18nまたはカスタムVue Router設定を使用）          |
| **動的ルート生成**                                       | ✅ あり                                                                               | ❌ 提供されていない（Nuxt i18nが提供）                                      |
| **複数形とフォーマット**                                 | ✅ 列挙パターン；Intlベースのフォーマッター                                           | ✅ ICUスタイルのメッセージ；Intlフォーマッター                              |
| **コンテンツ形式**                                       | ✅ `.ts`、`.js`、`.json`、`.md`、`.txt`（YAML 作業中）                                | ✅ `.json`、`.js`（および SFC の `<i18n>` ブロック）                        |
| **ICU サポート**                                         | ⚠️ 作業中                                                                             | ✅ 対応                                                                     |
| **SEO ヘルパー（サイトマップ、robots、メタデータ）**     | ✅ 組み込みヘルパー（フレームワーク非依存）                                           | ❌ コア機能ではない（Nuxt i18n / コミュニティ）                             |
| **SSR/SSG**                                              | ✅ Vue SSRおよびNuxtで動作；静的レンダリングをブロックしない                          | ✅ Vue SSR/Nuxtで動作                                                       |
| **ツリーシェイキング（使用されるコンテンツのみを出荷）** | ✅ ビルド時にコンポーネント単位で実施                                                 | ⚠️ 部分的；手動でのコード分割や非同期メッセージが必要                       |
| **遅延読み込み**                                         | ✅ ロケール単位／辞書単位で対応                                                       | ✅ 非同期ロケールメッセージをサポート                                       |
| **未使用コンテンツの削除**                               | ✅ はい（ビルド時）                                                                   | ❌ 組み込みではない                                                         |
| **大規模プロジェクトの保守性**                           | ✅ モジュール化されたデザインシステムに適した構造を推奨                               | ✅ 可能だが、強力なファイル/名前空間の規律が必要                            |
| **エコシステム / コミュニティ**                          | ⚠️ 小規模だが急速に成長中                                                             | ✅ Vueエコシステム内で大規模かつ成熟している                                |

## 詳細比較

<AccordionGroup>
<Accordion header="1) アーキテクチャとスケーラビリティ">

- **vue-i18n**: 一般的な設定では、ロケールごとに**集中管理されたカタログ**を使用します（ファイルや名前空間に分割することも可能）。SFCの`<i18n>`ブロックはローカルメッセージを許可しますが、プロジェクトが大きくなるとチームはしばしば共有カタログに戻ります。 [コンポーネント単位 vs 集中管理 i18n](https://intlayer.org/ja/blog/per-component-vs-centralized-i18n) をご覧ください。
- **Intlayer**: コンポーネントごとに辞書を持ち、そのコンポーネントの隣に保存することを推奨します。これによりチーム間の競合が減り、コンテンツの発見性が保たれ、自然にキーのズレや未使用を制限できます。

**重要な理由:** 大規模なVueアプリやデザインシステムでは、**モジュール化されたコンテンツ**の方がモノリシックなカタログよりもスケールしやすいです。

</Accordion>
<Accordion header="2) TypeScriptと安全性">

- **vue-i18n**: TSサポートは良好ですが、**厳密なキー型付け**には通常カスタムスキーマやジェネリクス、慎重な規約が必要です。
- **Intlayer**: コンテンツから**厳密な型定義を生成**し、**IDEのオートコンプリート**やタイプミス・キーの欠落に対する**コンパイル時エラー**を提供します。

**重要な理由:** 強力な型付けにより、実行時**前に問題を検出**できます。

</Accordion>
<Accordion header="3) 欠落している翻訳の処理">

- **vue-i18n**: **実行時**の警告やフォールバック（例：フォールバックロケールやキー）。 [欠落した翻訳の検出](https://intlayer.org/ja/blog/detecting-missing-translations) をご覧ください。
- **Intlayer**: **ビルド時**にロケールやキー全体で警告やエラーを検出します。、さらにCIでの `npx intlayer test` も備えています。

**重要な理由:** ビルド時の検証により、本番環境のUIをクリーンかつ一貫性のある状態に保てます。

</Accordion>
<Accordion header="4) ルーティングとURL戦略 (Vue Router/Nuxt)">

- **両者**ともローカライズされたルートに対応可能です。 [hreflang ガイド](https://intlayer.org/ja/blog/hreflang-guide-multilingual-seo) をご覧ください。
- **Intlayer** は、**ローカライズされたパスの生成**、**ロケールプレフィックスの管理**、および SEO のための **`<link rel="alternate" hreflang>` の発行**を支援するヘルパーを提供します。Nuxt では、フレームワークのルーティングを補完します。

**重要な理由:** カスタムの接着層が減り、ロケール間での **よりクリーンな SEO** を実現します。

</Accordion>
<Accordion header="5) パフォーマンスと読み込み動作">

- **vue-i18n**: 非同期ロケールメッセージをサポートしますが、過剰なバンドルを避けるのはユーザー次第です（カタログを慎重に分割してください）。 上記のベンチマークがその数字を示しています：ページあたり 134.9 KB に対し 57.1 KB です。
- **Intlayer**: ビルド時に **ツリーシェイク** を行い、**辞書／ロケールごとに遅延読み込み** を行います。未使用のコンテンツは配信されません。

**重要な理由:** マルチロケールの Vue アプリで、より小さなバンドルサイズと高速な起動を実現します。

</Accordion>
<Accordion header="6) 開発者体験とツール">

- **vue-i18n**: 成熟したドキュメントとコミュニティを持ち、編集ワークフローには通常、**外部のローカリゼーションプラットフォーム**に依存します。
- **Intlayer**: **無料のビジュアルエディター**、オプションの**CMS**（Gitフレンドリーまたは外部化可能）、**VSCode拡張機能**、**CLI/CIユーティリティ**、および独自のプロバイダーキーを使用した**AI支援翻訳**を提供します。、**MCPサーバー**

**重要な理由:** 運用コストの削減と開発–コンテンツのループ短縮。

</Accordion>
<Accordion header="7) SEO、SSR、SSG">

- **両者**ともにVue SSRおよびNuxtと連携します。 [国際化とSEO](https://intlayer.org/ja/blog/SEO-and-i18n) をご覧ください。
- **Intlayer**: フレームワークに依存しない**SEOヘルパー**（サイトマップ/メタデータ/`hreflang`）を追加し、Vue/Nuxtのビルドとスムーズに連携します。

**重要な理由:** カスタム配線なしでの国際SEO。

</Accordion>
</AccordionGroup>

## なぜIntlayerなのか？（問題とアプローチ）

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

ほとんどのi18nスタック（**vue-i18n**を含む）は、**集中型カタログ**から始まります：

<Tabs defaultTab="per-locale" group="catalog">
<Tab label="ロケールごとに1ファイル" value="per-locale">

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
<Tab label="ロケールごとに1フォルダー" value="per-folder">

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
</Tabs>

各言語で機能ごとに名前空間が増え、そのフォルダーは肥大化し続けます：

![A locales folder with dozens of namespace files per language](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)

アプリが成長するにつれて、これが開発の遅延を招くことがよくあります：

1. **新しいコンポーネントの場合**、リモートカタログを作成/編集し、名前空間を設定し、翻訳を行います（多くの場合、AIツールからの手動コピー＆ペーストによる）。
2. **コンポーネントを変更する場合**、共有キーを探し出し、翻訳し、ロケールを同期させ、不要なキーを削除し、JSON構造を整合させます。

**Intlayer**はコンテンツを**コンポーネント単位**でスコープし、CSS、ストーリー、テスト、ドキュメントと同様に**コードの隣に保持**します。

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

<Tabs defaultTab="intlayer" group="techno">
<Tab label="vue-i18n" value="vue-i18n">

```json fileName="./locales/en.json"
{
  "componentExample": {
    "greeting": "Hello World"
  }
}
```

```vue fileName="./components/MyComponent.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <span>{{ t("componentExample.greeting") }}</span>
</template>
```

すべての言語ファイルを手動で編集する必要があり、キーは単なるプレーンテキストです。誤字があると本番環境で `componentExample.greting` とそのままレンダリングされてしまいます。

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="./components/MyComponent/myComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue integration

const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

すべての言語がコンポーネントの隣にある1つの型付きファイルに収まります。

</Tab>
</Tabs>

このアプローチは以下の利点があります：

- **開発を高速化**（一度宣言すれば、IDEやAIが自動補完）。
- **コードベースをクリーンに保つ**（1コンポーネント = 1辞書）。
- **複製や移行を容易に**（コンポーネントとそのコンテンツを一緒にコピー）。
- **不要なキーを回避**（未使用のコンポーネントはコンテンツをインポートしない）。
- **読み込みを最適化**（遅延読み込みされるコンポーネントは自身のコンテンツを持つ）。

## Intlayerの追加機能（Vue関連）

- **クロスフレームワーク対応**：Vue、Nuxt、Vite、React、Expressなどで動作。
- **JavaScript駆動のコンテンツ管理**：コード内で柔軟に宣言可能。
- **ロケールごとの宣言ファイル**: すべてのロケールをシードし、ツールが残りを生成します。
- **型安全な環境**: 強力なTS設定とオートコンプリート機能。
- **簡素化されたコンテンツ取得**: 辞書のすべてのコンテンツを取得する単一のフック/コンポーザブル。
- **整理されたコードベース**: 1コンポーネント = 同じフォルダ内の1辞書。
- **強化されたルーティング**: **Vue Router/Nuxt** のローカライズされたパスとメタデータのためのヘルパー。
- **Markdownサポート**: ロケールごとにリモート/ローカルMarkdownをインポートし、フロントマターをコードに公開。
- **無料のビジュアルエディター＆オプションのCMS**: 有料のローカリゼーションプラットフォームなしでの作成が可能。Gitに優しい同期。
- **ツリーシェイカブルなコンテンツ**: 使用されるものだけを出荷。遅延読み込みをサポート。
- **静的レンダリングに優しい**: SSGをブロックしません。
- **AI搭載の翻訳**: ご自身のAIプロバイダー/APIキーを使用して231言語に翻訳可能。
- **MCPサーバー＆VSCode拡張機能**: IDE内でのi18nワークフローとオーサリングを自動化。
- **相互運用性**: 必要に応じて**vue-i18n**、**react-i18next**、**react-intl**と連携。

## どちらを選ぶべきか？

<AccordionGroup>
<Accordion header="vue-i18n を選択する">

**標準的な Vue のアプローチ** を希望し、カタログや名前空間の自己管理に慣れており、アプリケーションが **小規模から中規模** の場合（または既に Nuxt i18n に依存している場合）。SFC `<i18n>` ブロックやランタイムの `setLocaleMessage()` は、Intlayer が意図的に再現していない機能です。

</Accordion>
<Accordion header="Intlayer を選択する">

**コンポーネント単位のコンテンツ**、**厳格な TypeScript**、**ビルド時の保証**、**Tree-shaking**、および組み込みのルーティング、SEO、エディターツールを重視する場合。特に **大規模でモジュール化された Vue/Nuxt コードベース** やデザインシステムに適しています。[VueとIntlayer](https://intlayer.org/ja/doc/environment/vite-and-vue) または [Nuxtとの組み合わせ](https://intlayer.org/ja/doc/environment/nuxt-and-vue) から始めてください。

</Accordion>
<Accordion header="@intlayer/vue-i18n を選択する">

現在 `vue-i18n` を使用しており、`.vue` ファイルを編集せずにバンドルサイズを削減したい場合。[互換アダプター](https://intlayer.org/ja/doc/compatibility/vue-i18n) は `createI18n`、`useI18n`、`t()`、`d()`、`n()`、`$t`、`v-t` を保持し、コンパイル済み辞書から提供します。[vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/ja/blog/vue-i18n-vs-intlayer-vue-i18n) での直接比較をご覧ください。

</Accordion>
</AccordionGroup>

## vue-i18n との相互運用性

`intlayer` は `vue-i18n` の名前空間の管理にも役立ちます。

`intlayer` を使用すると、お好みの i18n ライブラリの形式でコンテンツを宣言でき、intlayer が選択した場所（例：`/messages/{{locale}}/{{namespace}}.json`）に名前空間を生成します。 [vue-i18n 互換性ドキュメント](https://intlayer.org/ja/doc/compatibility/vue-i18n) および [Nuxt i18n アダプター](https://intlayer.org/ja/doc/compatibility/nuxtjs-i18n) をご覧ください。

## よくある質問

<FAQ>

<Question title="Intlayer は vue-i18n の代替ですか、それとも上位レイヤーですか？">

導入方法によって両方になります。`vue-intlayer` は独自の `useIntlayer()` コンポーザブルを持つネイティブランタイムです。`@intlayer/vue-i18n` は `vue-i18n` API を維持しながらバインド先を入れ替える互換アダプターであり、コンポーネントを変更せずに移行し、その後ファイル単位で移行を進めることができます。

</Question>

<Question title="SFC <i18n> ブロックはどうなりますか？">

アダプターはそれらを読み取りません。メッセージをロケール JSON に移動するか、生成された型を持つ同じ概念のコンポーネント隣の `.content.ts` に移動してください。これが引き継がれない唯一の `vue-i18n` 機能です。

</Question>

<Question title="Intlayer は Nuxt で動作しますか？">

はい。[NuxtとIntlayer](https://intlayer.org/ja/doc/environment/nuxt-and-vue) は多言語ルーティング、ロケール検出ミドルウェア、サイトマップ生成をサポートしています。`@nuxtjs/i18n` をご利用の場合は、[Nuxt i18n 互換アダプター](https://intlayer.org/ja/doc/compatibility/nuxtjs-i18n) が移行パスとなります。

</Question>

<Question title="locales/{locale}.json を信頼できる唯一の情報源として維持できますか？">

はい。[JSON同期プラグイン](https://intlayer.org/ja/doc/compatibility/vue-i18n) は `vue-i18n` 構文（`{name}`、`{0}`、パイプによる複数形 `"car | cars"`）で読み取り、CLI または CMS が更新したときに翻訳を書き戻します。

</Question>

<Question title="Vue 上の Intlayer で ICU は動作しますか？">

ネイティブの ICU サポートは準備中です。`@intlayer/vue-i18n` アダプターは、パイプによる複数形や名前付き/リスト補間を含む `vue-i18n` 自身のメッセージ構文を処理します。Intlayer の複数形モデルについては、[列挙コンテンツ](https://intlayer.org/ja/doc/concept/content/enumeration) をご覧ください。

</Question>

</FAQ>

## GitHub スター

GitHub のスターは、プロジェクトの人気度、コミュニティの信頼、および長期的な関連性の強力な指標です。技術的品質の直接的な尺度ではありませんが、多くの開発者がプロジェクトを有用であると認識し、その進行状況をフォローし、採用する可能性があることを反映しています。プロジェクトの価値を見積もるために、スターは代替案間の牽引力を比較し、エコシステムの成長に関する洞察を提供するのに役立ちます。

[![Star History Chart](https://api.star-history.com/svg?repos=intlify/vue-i18n&repos=aymericzip/intlayer&type=Date)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## 結論

**vue-i18n** と **Intlayer** はどちらも Vue アプリのローカライズに優れています。違いは、堅牢でスケーラブルなセットアップを実現するために、**どれだけ自分で構築する必要があるか**にあります：

- **Intlayer**では、**モジュール化されたコンテンツ**、**厳格なTypeScript**、**ビルド時の安全性**、**ツリーシェイクされたバンドル**、および**ルーター/SEO/エディター用ツール**が**標準で提供**されます。
- チームがマルチロケール対応のコンポーネント駆動型Vue/Nuxtアプリにおいて、**保守性と速度**を重視する場合、Intlayerは現時点で**最も充実した**体験を提供します。

## 参考文献

- [vue-i18n vs Intlayer benchmark](https://intlayer.org/ja/blog/vue-i18n-vs-intlayer-benchmark), the measured run behind the table above
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/ja/blog/vue-i18n-vs-intlayer-vue-i18n), the adapter on the same app
- [Is vue-i18n outdated?](https://intlayer.org/ja/blog/is-vue-i18n-outdated)
- [How to pick a Vue i18n library](https://intlayer.org/ja/blog/how-to-pick-vue-i18n-library)
- [Using Intlayer with vue-i18n](https://intlayer.org/ja/blog/intlayer-with-vue-i18n)
- [Vue benchmark report](https://intlayer.org/ja/doc/benchmark/vue)
- [Migration guide: vue-i18n to Intlayer](https://intlayer.org/ja/doc/migration/vue-i18n)
- [Bundle optimization](https://intlayer.org/ja/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/ja/doc/compiler)

Refer to ['Why Intlayer?' doc](https://intlayer.org/ja/doc/why) for more details.
