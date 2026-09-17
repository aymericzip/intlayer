---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026年に最適なVue i18nライブラリの選び方"
description: VueおよびNuxtの国際化（i18n）決定ガイド。vue-i18n、@nuxtjs/i18n、fluent-vue、Paraglide、Intlayerを比較する前に答えるべき質問と、各選択肢のバンドルサイズ、型定義、SSRペイロードのトレードオフを解説します。
keywords:
  - vue i18n
  - vue 国際化
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - i18n ライブラリ 比較
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# 最適なVue i18nライブラリの選び方

「Vue i18n」は一般的な用語であると同時に、ほぼすべての人が最初にインストールするライブラリの名前でもあります。これは便利である反面、誤解を招きやすい点でもあります。`vue-i18n` は優れたデフォルトの選択肢ですが、唯一の選択肢ではありません。また、選択の基準となるべき問い（SSRを使用するかどうか、ページ数、誰が翻訳を作成するかなど）は、`npm install` を実行する前に十分に検討されないことがよくあります。

本ガイドでは、まずこれらの検討すべき質問を整理し、その回答をもとに素のVite + VueおよびNuxtに最適なライブラリをマッピングします。

![Vue i18nライブラリのエコシステム](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 目次

<TOC/>

## ライブラリを比較する前に答えるべき6つの質問

1. **Vite SPAか、それともNuxtか？** SPAの場合、カタログのコストはJSバンドルの問題にとどまります。Nuxtの場合はHTMLペイロードの問題にもなります。メッセージがSSRステートにシリアライズされてハイドレーションされるためです。「vue-i18nが遅い」という報告の多くは、この理由からNuxtアプリケーションで発生しています。
2. **誰が翻訳を作成するか？** 開発者、TMS、ICU文字列を提供する翻訳会社、あるいはAIパイプラインか。`vue-i18n` はICUではなく独自のパイプ区切り複数形構文を使用します。外部から文字列を受け取る場合、この違いが重要になります。
3. **ロケール数とページ数はどのくらいか？** 2ロケール・5ページ程度であれば、すべてを一度に配信しても問題ありません。しかし、10ロケール・40ルートになるとそうはいかず、読み込み戦略が主なコスト要因になります。
4. **キーの型安全性が必要か？** `vue-i18n` では、メッセージスキーマのジェネリクスを渡さない限り `t("cart.totl")` のようなタイポもコンパイルが通ってしまいます。また、そのスキーマは遅延ロードされるカタログと競合しがちです。
5. **コンテンツに何が含まれるか？** UIラベルのみか、それともMarkdown、文章内のリンク、ロケールごとのブロックが含まれるか。リッチコンテンツを扱う場合、`t()` が単なる文字列を返す仕様は扱いづらくなります。
6. **CSP（コンテンツセキュリティポリシー）の制約はあるか？** デフォルトの `vue-i18n` ビルドはブラウザ上で `new Function` を使用してメッセージをコンパイルします。ランタイム専用ビルドを使用するには、ビルド時に事前コンパイルを行う `@intlify/unplugin-vue-i18n` が必要です。

これらの回答を書き留めておきましょう。以降の内容はすべてこれらに基づいて展開されます。

## 全体像を一目で把握する

Vueエコシステムのi18nライブラリはReactよりも数が少なく、それぞれ異なるアーキテクチャの世代から生まれています。

![JavaScript i18nライブラリの歴史](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="ランタイム辞書方式（2015年〜2019年）: vue-i18n, @nuxt/i18n">

`vue-i18n` は2015年に登場し、それ以来デフォルトの地位を維持してきました。`@nuxt/i18n` はそれをラップし、ロケールルーティング、SEOタグ、ロケールごとの遅延ロード機能を提供します。メッセージはレンダリング関数にコンパイルされ、unpluginを追加した場合はビルド時に、それ以外の場合はブラウザ上でコンパイルされます。

</Accordion>
<Accordion header="代替フォーマット（2020年）: fluent-vue">

Mozilla Fluentの `.ftl` ファイルにより、文法に応じた柔軟なバリアントを持つ扱いやすいメッセージ構文がもたらされました。キーの型定義はなく、Viteプラグインはすべてのロケールをすべてのページに読み込みます。

</Accordion>
<Accordion header="コンパイラおよびコロケーションコンテンツ方式（2024年〜2026年）: Paraglide, Intlayer">

Paraglideはメッセージごとに1つの関数を生成し、残りはバンドラーのTree-shakingに任せます。Intlayerは `.content.ts` ファイルでコンポーネントごとにコンテンツを宣言し、型を自動生成して、そのルートがレンダリングするものだけを配信します。

</Accordion>
</AccordionGroup>

各世代の詳細については、[JavaScript i18nの歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)で解説しています。

## 最も重要な決定: コンテンツの配置場所と読み込みタイミング

構成の違いによるバンドルサイズの差の大部分は、主に2つの構造的選択によって生じます。

- **集中管理か、スコープ化されたコンテンツか。** アプリ全体で1つの `locales/en.json` を使うか、コンポーネントごとに宣言するか。
- **静的インポートか、動的インポートか。** 起動時にすべて読み込むか、アクティブなロケール（および理想的にはアクティブなルート）をオンデマンドで取得するか。

下のグラフは、ページあたり約30 KBのテキストを持ち、1〜10ページ、1〜10ロケールに翻訳された理論上のアプリにおけるペイロードの推定値です。

![アーキテクチャ別の理論的コンテンツ漏洩](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` は動的インポートの軸をサポートしています。`import()` の後に `setLocaleMessage` を実行すれば、誰も読まない残り9ロケールの配信を停止できます。しかし、ページ単位の軸は提供されません。ロケールカタログは1つのオブジェクトであるため、それを読み込むとすべてのページのコピーが読み込まれます。SPAでは気づきにくいですが、Nuxtで `@nuxtjs/i18n` を使い10ページを超えると、各ルートが他のすべてのルートの文字列をJSチャンク内とSSRペイロード内の2回抱え込むことになります。

[Vueベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/vue.md)では、これを「他ルートからの漏洩」および「他ロケールからの漏洩」として測定しています。質問3の回答が「ページ数が多い」だった場合、このセクションはAPIの好み以上に重要な要素となります。[コンポーネント単位 vs 集中管理 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)の記事では、同じトレードオフのメンテナンス面について詳しく説明しています。

## 候補となるライブラリ

ライブラリのサイズは、10ページ・10ロケールのアプリを対象に、バンドル、Tree-shaking、Minify後の空コンポーネント内のプラグイン＋Composableを測定した[Vueベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/vue.md)の数値です。コンテンツ自体は別途測定されています。

| ライブラリ     | コンテンツモデル                                            | 型安全性                                 | メッセージフォーマット              | ルート単位の分割           | ライブラリサイズ                                 |
| :------------- | :---------------------------------------------------------- | :--------------------------------------- | :---------------------------------- | :------------------------- | :----------------------------------------------- |
| `vue-i18n`     | ロケールごとの中央カタログ、SFCの `<i18n>` ブロック（任意） | 2/5 — スキーマジェネリクス（オプトイン） | 独自（パイプ区切り複数形）          | 不可                       | ~24.3 kB                                         |
| `@nuxtjs/i18n` | `vue-i18n` と同様＋ルーティングおよびSEOタグ                | 2/5 — 同様                               | 同様                                | 不可（ロケール単位のみ）   | ~24.3 kB                                         |
| `fluent-vue`   | `.ftl` ファイル（Mozilla Fluent）                           | 1/5 — なし                               | Fluent                              | 不可                       | ~29.7 kB                                         |
| Paraglide      | inlangプロジェクト、生成された関数                          | 3.5/5 — 生成される                       | 独自                                | Tree-shaking経由           | ほぼゼロ（コードベースに生成されるコードのため） |
| Intlayer       | コンポーネントごとに1つの `.content.ts`                     | 5/5 — 生成される（デフォルトで有効）     | Intlayer (+ ICU, i18next, vue-i18n) | 可能（コンポーネント単位） | ~3.9 kB                                          |

> 数値はベンチマーク実施時のバージョンのスナップショットです。サイズだけで判断せず、ご自身のアプリで実際に測定することをおすすめします。
> 型安全性：5/5は、URLフォーマッターやヘルパーを含め、キー・パラメータ・すべてのロケールが手動設定なしに検証されることを意味します。

Paraglideのライブラリサイズがほぼゼロなのは設計によるものです。ランタイムがリポジトリ内に生成されるため、push前の再生成ステップが必要となり、生成ファイルでのマージコンフリクトが発生する可能性があります。Intlayerには `vite-intlayer`（またはNuxtモジュール）が必要なため、ビルドステップなしで実行することはできません。

## 回答をライブラリとマッチングする

<AccordionGroup>
<Accordion header="Vite SPA、少人数のチーム、ロケール数が少ない場合">

Compositionモード（`legacy: false`）の `vue-i18n` に `@intlify/unplugin-vue-i18n` を組み合わせ、ランタイム専用ビルドを配信します。`import()` を使用してロケールを遅延ロードします。これによりほとんどの小規模アプリをカバーでき、コミュニティの知見も豊富です。SFCの `<i18n>` ブロックはメッセージをコンポーネントと同じ場所に配置するのに役立ちますが、JSONカタログと比べて抽出ツールやTMS連携が少ないため、どちらを採用するかはチームで早期に決定しておきましょう。

</Accordion>
<Accordion header="ロケールルーティング、サイトマップ、hreflangを必要とするNuxtの場合">

`@nuxtjs/i18n` を使えば、ルーティング戦略、`hreflang` タグ、ロケール検出をコードなしで実現できるため、数ページのコンテンツサイトであればこれだけで採用する価値があります。制限となるのはロケール単位のカタログです。10ページ程度を超えると、SSRペイロードにすべてのルートのコピーが含まれるようになります。その場合は、`vue-i18n` を手動でルートごとに設定するか、スコープ化されたコンテンツに移行することを検討してください。[Nuxt i18nの記事](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/nuxt.md)では、まずルーティング戦略の選択について説明しています。

</Accordion>
<Accordion header="翻訳がTMSまたはICUを提供する翻訳会社から届く場合">

`vue-i18n` の複数形構文（`"no item | one item | {count} items"`）はICUではなく、移植性がありません。翻訳者に仕様を伝える必要があり、TMSのエクスポートでもそのまま生成されない場合があります。最初のカタログを作成する前にフォーマットを取り決めるか、ベンダーと一致するフォーマットを持つライブラリを選択してください。IntlayerのICUサポートは部分的なため、現在ICU文字列を受け取っている場合はその点にも留意が必要です。

</Accordion>
<Accordion header="大規模アプリ、多数のルート、バンドルまたはSSRペイロードの予算が厳しい場合">

ビルド時にコンパイルされるスコープ化されたコンテンツを選択するのが適しています。ParaglideはTree-shakingによってこれを実現し、Vite上で期待通りに動作します。Intlayerはコンポーネントごとの宣言によってこれを実現し、ルートがレンダリングするものだけを配信します。`vue-i18n` でも手動でメッセージをルートごとに分割できますが、強制力はなく、共有コンポーネントがグローバル名前空間をインポートすると容易に崩れてしまいます。

</Accordion>
<Accordion header="型安全性が必須条件である場合">

`vue-i18n` は `createI18n` にスキーマジェネリクスを渡すことで型付けが可能です。動作はしますが、カタログが遅延ロードされた瞬間に破綻します。スキーマがまだ存在しないメッセージまで記述してしまうためです。その保守を避けたい場合は、ParaglideやIntlayerのようにコンテンツから型が自動生成されるライブラリを選択してください。[翻訳漏れの検出](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/detecting_missing_translations.md)の記事では、各ライブラリがビルド時に何をキャッチできるかを比較しています。

</Accordion>
<Accordion header="コンテンツがUIラベルにとどまらない場合">

Markdownページ、文中に `<RouterLink>` が入る文章、ロケールごとのコンポーネントなどがある場合です。`vue-i18n` にはコンポーネント補間のための `<i18n-t>` があり、機能はしますが冗長になりがちです。IntlayerのコンテンツノードはMarkdown、HTML、ネストされたオブジェクトを直接扱えるため、コンテンツ量の多いアプリに適しています。

</Accordion>
<Accordion header="翻訳をAIで生成する場合">

この場合、集中管理されたJSONを維持する理由はほとんどありません。コンポーネントと同じ場所に配置されたコンテンツと、不足しているロケールを補完するCLIを組み合わせるのが最短のアプローチです。Intlayerの `fill` コマンドは自身のAPIキー（OpenAI、Anthropic、Mistral、Gemini）を使用して実行され、変更された部分のみを再翻訳します。

</Accordion>
</AccordionGroup>

## 各ライブラリの注意点・弱点

- **`vue-i18n`**: 候補の中で最も重く、独自の複数形フォーマットを持ち、型定義はオプトインかつ遅延ロード時に壊れやすく、ルート単位のスコープ化がなく、使われていないキーが静かに蓄積します。Vue 3アプリで `legacy: true` のままにするとVue 2互換レイヤーが維持され、`useI18n()` の型安全性が失われます。
- **`@nuxtjs/i18n`**: 上記のすべてを引き継ぎ、十数ルートを超えるとSSRペイロードが全ページの文字列を抱え込みます。
- **`fluent-vue`**: 優れたメッセージ構文を持つものの、キーの型定義はなく、Viteプラグインが全言語の全コンテンツを全ページに読み込みます。ベンチマークで最も重い結果となっています。
- **Paraglide**: 生成されたファイルをリポジトリにコミットする必要があり、push前の再生成が必要で、ロケールがリアクティブなストアからではなくメッセージ呼び出しごとにクッキーやストレージから読み取られるため、ロケール変更時の処理コストがかかります。
- **Intlayer**: ビルドプラグインが必須で、エコシステムが比較的小さく、ICUサポートが部分的であり、設計上コンテンツがコードベース全体に分散しているため、翻訳者向けに1つのJSONをエクスポートするには専用のツールが必要です。

## 各選択肢のコード例

タイトルと複数形を含む同じカートサマリーコンポーネントを、各候補で実装した例です。注目すべきはテンプレートではなく、コンテンツがどこに置かれ、`vue-tsc` がそれをどのように認識するかです。

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

パイプ区切りの複数形はvue-i18n独自のフォーマットであり、ICUではありません。`createI18n` にメッセージスキーマのジェネリクスを渡さない限り、`t` は任意の文字列を受け付けます。

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Fluentの構文は複数形や文法バリアントをうまく処理します。メッセージIDは型付けされていない文字列であり、Viteプラグインはすべてのロケールをすべてのページにバンドルします。

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

すべてのメッセージが生成された型付き関数であるため、キーが存在しない場合はインポートエラーになります。`paraglide/` フォルダはリポジトリ内に生成され、変更のたびに再生成されます。

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

すべてのロケールがコンポーネントの隣の1つのファイルに収まります。型はビルド時に生成されるため、`title` は自動補完され、タイポは `vue-tsc` でエラーになります。`<title />` はビジュアルエディタが対象にできるノードをレンダリングし、`{{ items(props.count) }}` は通常の文字列を返します。

  </Tab>
</Tabs>

すでに `vue-i18n` をお使いですか？[`@intlayer/vue-i18n` 互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/vue-i18n.md)はバンドラーレベルでパッケージをエイリアス化するため、Intlayerがコンテンツを提供しながら、`useI18n()`、`$t`、パイプ複数形、`v-t` をそのまま使い続けることができます。その後のアダプターからの完全移行については[移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_vue-i18n_to_intlayer.md)で説明しており、[Nuxt専用の移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_nuxtjs_i18n_to_intlayer.md)も用意されています。

## 採用を決める前のチェックポイント

機能比較表はライブラリが現在何ができるかを示しますが、以下のポイントは実際に運用したときの体験を示します。

**リポジトリのアクティビティを確認する。**

コミット頻度、Issueへの対応速度、最新のマイナーリリースが今年行われたかどうかを確認してください。メンテナーのいない優れた設計は、いずれ移行作業を強いられることになります。

**npmのダウンロード数だけで選ばない。**

最も多くインストールされているライブラリは、最初にリリースされたものであり、必ずしも2026年のVueコードベースに最も適したものであるとは限りません。ダウンロード数は歴史を測る指標であり、現在の適合度を示すものではありません。

![JavaScript i18nライブラリのランク表](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**誰がメンテナーに出資し、何を販売しているかを確認する。**

`vue-i18n` は、`next-intl` や `svelte-i18n` と同様にCrowdinの支援を受けています。`i18next` はLocizeの支援を受けています。Tolgee、Paraglide（inlang）、Intlayerはそれぞれ独自のプラットフォームを運営しています。ホスト型翻訳サービスを主な収益源とするベンダーは、ツールチェーン内での無料翻訳を促進する動機が薄くなります。Intlayerはこの中で唯一、自身のAPIキーを使用したCLI経由のAI翻訳と、セルフホスト可能なCMSを提供しています。

**AIエージェントに対応しているか？**

エージェントは依然としてi18nの扱いに苦戦します。ロケールの記述漏れ、キーの捏造、メッセージ構文の混同などが起きがちです。そのライブラリは、エージェントがコンテンツを一覧取得、補完、テストできるように[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)や[MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)を提供していますか？また、コンテンツの読み込みはデフォルトで最適化されていますか、それとも四半期ごとに名前空間や遅延インポートを見直す必要がありますか？

**導入直後からの型安全性。**

「追加の設定で型付けできる」ではなく、「新規インストール状態で存在しないキーを指定すると `tsc` が失敗する」かどうかです。存在しないキーを指定した場合や、1つの翻訳が欠落しているロケールがある場合に何が起きるかを確認してください。

**未使用コンテンツの検出。**

カタログは増え続ける一方です。Intlayerのビルドは未使用のフィールドをパージしてログを出力します（`build.purge`）。Paraglideは呼び出されないメッセージ関数がTree-shakingされるため、アーキテクチャ的にこれに対処します。それ以外のライブラリでは、不要なキーの整理は手動で行う必要があります。

**開発者体験（DX）。**

最初の翻訳文字列までのセットアップ時間、ホバー時に翻訳を表示して宣言にジャンプできる[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)または[VS Code拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)、補完・テスト・pushを行うための[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)、コンポーネント内のハードコードされた文字列を抽出してキーごとに管理する手間をなくす[コンパイラー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)や抽出ツール、そして開発者以外がPull Requestなしでコンテンツを編集できる手段（[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)や[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)）が用意されているかを確認してください。

## よくある質問

<FAQ>

<Question title="2026年でもvue-i18nは依然として適切なデフォルトの選択肢ですか？">

ほとんどのVueアプリにおいては「はい」です。エコシステムが最も大きく、ドキュメントも充実しており、コストも予測可能です。重いランタイム、独自の複数形フォーマット、手動で構築・維持が必要なルート単位のスコープ化などがそのコストにあたります。

</Question>

<Question title="Nuxtでは@nuxtjs/i18nを使うべきですか、それともvue-i18nを手動で設定すべきですか？">

ルーティングが特殊な場合やページ数がごく少ない場合を除き、モジュールを使用してください。手動で構築する場合、ロケールルート、ミドルウェア、`hreflang`、サイトマップを自前で再構築する必要があり、これらは見た目以上に複雑です。

</Question>

<Question title="コンパイラベースのライブラリは必要ですか？">

バンドルサイズ、SSRペイロード、生成される型、ビルド時のキー欠落チェックが実際の要件である場合にのみ必要です。[コンパイラ vs 宣言的 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)の記事では、コンパイラがもたらすメリットと注意すべき点について解説しています。

</Question>

<Question title="ライブラリの選択はSEOに影響しますか？">

間接的に影響します。クローラーはルーティング、`hreflang`、`<html lang>`、およびサーバーレンダリングされたHTML内にテキストが存在するかどうかを評価します。詳細は[hreflangガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/hreflang_guide_multilingual_seo.md)を参照してください。

</Question>

</FAQ>

## さらに詳しく

- [Vue i18n ベンチマーク: バンドルサイズ、漏洩、ロケール切り替え時間](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/vue.md)
- [Vue i18n: vue-i18nの仕組みと課題点](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/vue.md)および[Nuxt i18nの記事](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs Intlayer 機能別徹底比較](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer.md)および[vue-i18n vs Intlayer ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/vue-i18n_vs_intlayer_benchmark.md)
- [vue-i18nは時代遅れか？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/is_vue-i18n_outdated.md)
- [JavaScript i18nの歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)
- [コンパイラ vs 宣言的 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)
- [コンポーネント単位 vs 集中管理 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)
- [Vite + Vueアプリでi18nをセットアップする](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vue.md)および[Nuxtアプリでのセットアップ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nuxt.md)
- 他フレームワーク向けガイド: [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_react_i18n_library.md)、[Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_svelte_i18n_library.md)、[Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_solid_i18n_library.md)
