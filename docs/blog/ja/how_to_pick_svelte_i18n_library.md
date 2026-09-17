---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026年に最適なSvelte i18nライブラリを選ぶ方法"
description: SvelteおよびSvelteKitの国際化（i18n）に関する意思決定ガイド。svelte-i18n、Paraglide、typesafe-i18n、wuchale、Intlayerを比較する前に答えるべき質問と、バンドルサイズ、型定義、SSR安全性における各選択肢のコストを解説します。
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte 国際化
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - i18n ライブラリ比較
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# 最適なSvelte i18nライブラリを選ぶ方法

Svelteにはi18n用の機能が標準で用意されていません。`$t`も、ロケールプリミティブも、メッセージフォーマットもありません。すべての選択肢がサードパーティ製であり、Svelteエコシステムはコンパイル時i18nが最も進んでいる領域であるため、各候補の違いはReactやVue以上に大きくなります。

本ガイドでは、まず確認すべき質問事項を整理し、それらに基づいて`svelte-i18n`、Paraglide、`typesafe-i18n`、`wuchale`、Intlayerを、Vite + SvelteおよびSvelteKitの両方の環境で比較・マッピングしていきます。

![Svelte i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 目次

<TOC/>

## ライブラリを比較する前に答えるべき6つの質問

1. **Vite SPAか、SvelteKitか？** SPAであればモジュールレベルのストアで問題ありません。1つのタブ、1人のユーザー、1つのロケールで完結するからです。しかしSvelteKitでは、同じシングルトンがサーバー上の並行リクエスト間で共有されてしまい、リクエストBがリクエストAの言語でレンダリングされてしまう危険があります。ライブラリがリクエストごとの分離機構（コンテキストや`locals`）を提供しているか、あるいは開発者自身で実装する必要があります。
2. **誰が翻訳を作成するか？** 開発者か、TMS（翻訳管理システム）か、ICU形式を納品する翻訳会社か、それともAIパイプラインか。`svelte-i18n`はICUに対応しています。Paraglideと`typesafe-i18n`は独自の構文を使用します。翻訳フローに合ったフォーマットを選びましょう。
3. **ロケール数とページ数はどのくらいか？** 2つのロケールと5ページ程度であれば、すべてをまとめて配信できます。10ロケールと40ルートがある場合はそれが不可能になり、ランタイムカタログとコンパイル済みメッセージの差が最大のコスト要因になります。
4. **キーの型安全性は必要か？** `svelte-i18n`では`$_("cart.totl")`のようなタイポは実行時エラー（またはフォールバック）になります。コンパイル時ライブラリは構造上これを型エラーとして検出します。
5. **Svelte 4のストアか、Svelte 5のRunesか？** Runesはロケール状態の構文を変えるものであり、共有問題そのものを解決するわけではありません。ただし、`.ts`ファイル内の`$state`は単純な変数にコンパイルされるため、Svelte 5を使用している場合はライブラリのランタイムがRuneに対応している必要があります。
6. **リポジトリ内に生成ファイルが含まれても問題ないか？** Paraglideと`typesafe-i18n`は、ソースツリー内にJavaScriptまたはTypeScriptを生成します。これを許容できるチームもあれば、並行ブランチごとにマージコンフリクトが発生して困るチームもあります。

回答を書き出してみてください。以降の内容はすべてこれらの項目を前提に進めます。

## 1枚の図で見る全体像

Svelteのi18nはReactやVueよりも後に登場したため、初期の段階をスキップして直接コンパイル時の波へと進みました。

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="ランタイム辞書（2019年〜2020年）: svelte-i18n, sveltekit-i18n">

JSONカタログを使用し、`intl-messageformat`経由でブラウザ内でICUをパースし、モジュールレベルのストア（`$locale`, `$_`）でロケールを保持します。最も普及しておりドキュメントも豊富ですが、SSRの連携は自前で構築する必要があります。

</Accordion>
<Accordion header="生成された型（2020年〜2022年）: typesafe-i18n">

ジェネレーターがカタログを監視し、型付きアクセサ（`$LL.cart.total()`）を出力します。優れたモデルですが、リポジトリ内にファイルが生成され、最近はリポジトリの更新があまり活発ではありません。

</Accordion>
<Accordion header="コンパイラとコロケーション（2022年〜2026年）: Paraglide, wuchale, Intlayer">

Paraglideは各メッセージをエクスポート関数にコンパイルし、ルートが呼び出さないメッセージをバンドラーがツリーシェイキングできるようにします。`wuchale`はビルド時にマークアップから文字列を抽出します。Intlayerはコンポーネントごとにコンテンツを宣言し、型とコンポーネントごとの辞書を生成します。

</Accordion>
</AccordionGroup>

各世代の詳細については、[JavaScript i18nの歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)で詳しく解説しています。

## 最も重要な意思決定: コンテンツの配置場所と読み込みタイミング

構成におけるバンドルサイズの差の大部分は、主に2つの構造的な選択によって決まります。

- **集中管理か、コンポーネントごとのスコープ管理か。** アプリ全体で1つの`locales/en.json`を持つか、コンポーネントごとに1つの宣言を持つか。
- **静的インポートか、動的インポートか。** 起動時にすべて読み込むか、アクティブなロケール（理想的にはアクティブなルートも）をオンデマンドで取得するか。

以下のグラフは、1〜10ページ、1〜10ロケール、1ページあたり約30 KBのテキストを持つ理論上のアプリにおけるペイロードの推定値を示しています。

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n`はデフォルトで左上に位置します。`register("fr", () => import("./fr.json"))`によりロケールごとの動的読み込みは可能ですが、ロケールカタログは1つのオブジェクトであるため、それを読み込むと全ページのテキストが読み込まれます。Paraglideは興味深いケースです。すべてのメッセージが個別のエクスポートとなるため、ツリーシェイキングによってページ軸の最適化が無償で得られます。[Svelteベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/svelte.md)でも、Vite + Svelte環境で期待通りに機能することが確認されています（ReactやNext.jsのベンチマークでは機能しませんでした）。Intlayerはコンポーネントごとの宣言によって同じ領域に到達します。

質問3の回答が「多くのページがある」だった場合は、APIの好みよりもこのセクションを重視してください。[コンポーネント単位 vs 集中管理型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)の記事では、このトレードオフのメンテナンス面について解説しています。

## 比較対象の候補

ライブラリのサイズは、10ページ・10ロケールのアプリを対象にした[Svelteベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/svelte.md)（バンドル、ツリーシェイキング、minify後の空コンポーネントにおけるストア＋アクセサ）の数値です。コンテンツのサイズは個別に測定しています。

| ライブラリ      | メッセージの配置場所                 | ロケール状態                               | 型安全性                         | メッセージフォーマット        | ルートごとの分割               | ライブラリサイズ                                 |
| :-------------- | :----------------------------------- | :----------------------------------------- | :------------------------------- | :---------------------------- | :----------------------------- | :----------------------------------------------- |
| `svelte-i18n`   | ロケールごとのJSONカタログ           | モジュールレベルのSvelteストア             | 2/5 — 手動Union型                | ICU                           | なし                           | 約16.6 kB                                        |
| `typesafe-i18n` | 生成されたTSモジュール               | ストアアダプター                           | 4/5 — 自動生成                   | 独自構文                      | 一部対応                       | 軽量                                             |
| Paraglide       | inlangプロジェクト、関数へコンパイル | Cookie、URL、Storageから呼び出しごとに取得 | 3.5/5 — 自動生成                 | 独自構文                      | あり（ツリーシェイキング経由） | ほぼゼロ（コードベースに生成されるコードのため） |
| `wuchale`       | ビルド時にマークアップから抽出       | ストア                                     | 該当なし（キーなし）             | 独自構文                      | あり                           | 約30.7 kB                                        |
| Intlayer        | コンポーネント隣の`.content.ts`      | コンテキスト＋ストア、Rune対応             | 5/5 — 自動生成、デフォルトで有効 | Intlayer (+ ICU, i18next, PO) | あり（コンポーネント単位）     | ~3.6 kB                                          |

> 数値はベンチマーク実施バージョンのスナップショットです。サイズだけで判断する前に、実際のアプリで計測してください。
> 型安全性：5/5は、URLフォーマッターやヘルパーを含め、キー・パラメータ・すべてのロケールが手動設定なしに検証されることを意味します。

Paraglideのライブラリサイズがほぼゼロである理由は構造によるものです。ランタイムがリポジトリ内に直接生成されます。Intlayerは`vite-intlayer`を必要とするため、ビルドステップなしでは動作しません。

## 回答に合ったライブラリを選ぶ

<AccordionGroup>
<Accordion header="Vite SPA、小規模チーム、少数のロケール">

`svelte-i18n`。最もドキュメントが充実した選択肢であり、`$_`はマークアップ内で自然に読め、`register`と`waitLocale()`によりロケールごとの遅延ロードがカバーされます。初回ペイントを`isLoading`で制御しないと、生のキーが一瞬表示（フラッシュ）されてしまいます。将来的にサーバー（SSR）を導入する可能性がある場合は、モジュールストアに頼るのではなく、初日からロケールをSvelteコンテキストに配置してください。今ならコストはかからず、本番環境でのみ発生するバグを未然に防ぐことができます。

</Accordion>
<Accordion header="ロケールルーティングとSSRを伴うSvelteKit">

共有問題が決定打となります。`svelte-i18n`はSvelteKitでも動作しますが、リクエストごとの連携（`hooks.server.ts`、`locals`、`load`、そして`setContext`）は自前で記述する必要があり、微妙なミスが起きやすいです。Paraglideはルーティングを処理し呼び出しごとにロケールを読み取るSvelteKit統合を提供しており、シングルトンの問題を回避できます。Intlayerは`load`データからコンテキストへとロケールを設定します。[SvelteKit i18nの記事](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/sveltekit.md)では`[[lang]]`と`reroute`の選択について解説しています。ライブラリを選ぶ前に決めておきましょう。

</Accordion>
<Accordion header="翻訳がTMSまたはICUを納品する翻訳会社から提供される場合">

`svelte-i18n`は`intl-messageformat`によるネイティブなICU対応を備えているため、多くのベンダーと直接連携できます。Paraglideと`typesafe-i18n`は独自の構文を使用しているため変換が必要です。IntlayerのICUサポートは部分的なものにとどまるため、現在ICU文字列を受け取っている場合はブロッカー（採用を見送る理由）として扱う必要があります。

</Accordion>
<Accordion header="バンドルサイズが最優先の制約である場合">

コンパイル時ライブラリ。ParaglideのツリーシェイキングはVite + Svelteで効果的に機能し、ライブラリコストはほぼゼロです。Intlayerのコンポーネントごとの辞書も、リポジトリ内にファイルを生成することなく同様の結果をもたらします。`svelte-i18n`はICUパーサーとカタログ全体を同梱するため、コンテンツを含める前のベンチマーク段階で`svelte-intlayer`の約4.5倍のサイズになります。

</Accordion>
<Accordion header="型安全性が必須である場合">

素の`svelte-i18n`以外のすべてです。`svelte-i18n`での唯一の型付けは手書きのUnion型であり、JSONとすぐに乖離してしまいます。`typesafe-i18n`、Paraglide、Intlayerはいずれもコンテンツから型を自動生成します。コードベースをコミットする前に`typesafe-i18n`のリポジトリのアクティビティを確認してください。[不足している翻訳の検出](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/detecting_missing_translations.md)の記事では、ビルド時にそれぞれが何を検知できるかを比較しています。

</Accordion>
<Accordion header="リポジトリ内に生成ファイルを置きたくない場合">

Paraglideと`typesafe-i18n`は候補から外れます。`svelte-i18n`とIntlayerは出力を`node_modules`またはビルドディレクトリ内に保持します。Intlayerの場合、`.content.ts`ファイルは手書きのソースコードであり、コンパイルされた辞書と型は`.intlayer/`内に配置されgitignoreされます。

</Accordion>
<Accordion header="翻訳をAIで生成する場合">

集中管理されたJSONを維持する理由はなくなります。コロケーションされたコンテンツと、不足しているロケールを補完するCLIを組み合わせるのが近道です。Intlayerの`fill`コマンドは自身のAPIキー（OpenAI、Anthropic、Mistral、Gemini）で動作し、変更された部分のみを再翻訳します。Paraglideのinlangエコシステムでも、独自のプランを持つホスト型同等機能が提供されています。

</Accordion>
</AccordionGroup>

## 各ライブラリの弱点・課題

- **`svelte-i18n`**: 最も重く、キーの型がなく、ルートごとの分割がなく、コンテキストを自前で接続しない限りSvelteKit上でリクエストをまたいで共有ストアがリークする。
- **`typesafe-i18n`**: ウォッチャープロセスが必要で、リポジトリ内にファイルが生成され、最近リポジトリの動きがあまりない。
- **Paraglide**: リポジトリにコミットされプッシュごとに再生成される生成ファイル、並行ブランチでのマージコンフリクト、ストアからではなくメッセージ呼び出しごとにCookieやストレージからロケールを読み取るためロケール変更時の処理コストがかかる。
- **`wuchale`**: マークアップ抽出という興味深いアイデアだが、まだ初期段階。Reactベンチマークではプロバイダーの再レンダリングを強制する必要があるリアクティビティの問題が発生し、ドキュメントも少ない。
- **Intlayer**: 必須のビルドプラグイン、比較的小さなエコシステム、部分的なICUサポート、そして設計上コンテンツがコードベース全体に分散しているため翻訳者向けに1つのJSONをエクスポートするにはツールが必要。

## 各選択肢のコード例

タイトルと複数形を含む同じカート概要コンポーネントを、各候補で記述した例です。注目すべきはマークアップではなく、コンテンツがどこに配置され、ロケールがどのように保持され、型チェッカーが何を把握しているかです。

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

`intl-messageformat`によるICU、モジュールレベルのストアで保持されるロケール。`$_`は任意の文字列を受け付けます。型付けは手書きのUnion型のみです。

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

すべてのメッセージが生成された型付き関数であり、呼び出されなければツリーシェイキングされます。`paraglide/`フォルダーはリポジトリ内に生成され、ロケールはストアからではなく呼び出しごとに読み取られます。

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

ウォッチャープロセスによって生成される型付きアクセサ。モデルは堅牢ですが、生成ファイルがリポジトリ内に存在し、プロジェクトは最近静かです。

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      ja: "ショッピングカート",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      ja: plural({
        one: "{{count}}個のアイテム",
        other: "{{count}}個のアイテム",
      }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

全ロケールがコンポーネントの隣にある1つのファイルに記述されます。`useIntlayer`は読み取り可能なストアを返すため、`$content`はお馴染みの自動購読（auto-subscription）となり、ロケールはモジュールシングルトンではなくコンテキスト（SSRセーフ）で保持されます。

  </Tab>
</Tabs>

すでに`svelte-i18n`を使用している場合、[`@intlayer/svelte-i18n`互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/svelte-i18n.md)によってバンドラーレベルでパッケージがエイリアスされるため、Intlayerがコンテンツを提供しながら`$_`、`$date`、`$number`およびフラットなキーを引き続き機能させることができます。

## 採用を決める前のチェックポイント

機能比較表は現在の機能を示しているに過ぎません。以下のポイントは、実際にそのライブラリを運用していく際の体験を左右します。

**リポジトリのアクティビティを確認する。**

コミット頻度、Issueへの返答時間、最新のマイナーリリースが今年行われているかを確認してください。メンテナーのいない優れた設計は、いずれ移行作業を迫られることになります。

**npmのダウンロード数だけで選ばない。**

最もインストールされているライブラリは、最初にリリースされたものであり、必ずしも2026年のSvelteコードベースに適合しているわけではありません。ダウンロード数は歴史の長さを示すものであり、適合度を示すものではありません。

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**メンテナーの収益モデルと販売対象を確認する。**

`svelte-i18n`は`next-intl`や`vue-i18n`と同様にCrowdinが支援しています。`i18next`はLocizeが支援しています。Tolgee、Paraglide（inlang）、Intlayerはそれぞれ独自のプラットフォームを運営しています。ホスティング翻訳サービスを主な収益源とするベンダーは、開発ツールチェーン内での無料翻訳を促進する動機が薄くなりがちです。Intlayerはこの中で唯一、独自のAPIキーを使ったCLI経由のAI翻訳と、セルフホスト可能なCMSを提供しています。

**AIエージェントに対応しているか？**

AIエージェントは依然としてi18nの扱いに苦労することが多く、ロケールの不足、キーの捏造、メッセージ構文の混同などが起きがちです。エージェントがコンテンツのリストアップ、補完、テストを行えるように、ライブラリが[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)や[MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)を提供しているか確認してください。またコンテンツの読み込みがデフォルトで最適化されているか、あるいは四半期ごとにネームスペースや遅延インポートの見直しが必要になるかも重要です。

**設定なし（out of the box）での型安全性。**

「追加の設定を行えば型付けできる」ではなく、「新規インストール状態で存在しないキーを指定すると`tsc`が失敗する」かどうかです。存在しないキーを指定した場合や、1つのロケールで翻訳が欠落している場合に何が起きるかを確認してください。

**未使用コンテンツの検出。**

カタログは増え続ける一方です。Intlayerのビルドは未使用のフィールドを削除しログを出力します（`build.purge`）。Paraglideは呼び出されないメッセージ関数がツリーシェイキングされる構造になっています。他のライブラリでは未使用キーの整理を自前で行う必要があります。

**開発者体験（Developer Experience）。**

最初の翻訳文字列を表示するまでのセットアップ時間、ホバー時に翻訳を表示し定義元へジャンプできる[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)や[VS Code拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)、補完・テスト・プッシュを行うための[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)、コンポーネント内のハードコードされた文字列を抽出してキーごとに管理する手間をなくす[コンパイラー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)や抽出ツール、そして開発者以外でもプルリクエストなしでコンテンツを編集できる手段（[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)や[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)）の有無を確認してください。

## よくある質問

<FAQ>

<Question title="2026年でもsvelte-i18nはデフォルトの選択肢として適切ですか？">

カタログが小さいVite SPAであれば適切です。最もドキュメントが充実した選択肢であり、ICUの互換性は多くのチームにとって重要です。ただしSvelteKit上や数十ページを超える規模になると、そのコスト（型がない、スコープ分割がない、共有ストア）が顕在化し始めます。

</Question>

<Question title="Paraglideのツリーシェイキングは本当に機能しますか？">

Vite + Svelteにおいては機能し、ベンチマークでもそれが確認されています。TanStack Startを用いたReactやNext.jsでは同じベンチマークで効果が見られませんでした。どちらの結果も盲信するのではなく、自身のスタックで検証してください。

</Question>

<Question title="Runesの導入によって選ぶべきライブラリは変わりますか？">

Runesはロケール状態の記述構文を変えるものであり、共有問題そのものを変えるわけではありません。重要なのは、Svelte 5においてライブラリのランタイムがRuneに対応しているかどうか、そしてモジュールストアではなくコンテキストを使用しているかどうかです。両方を確認してください。

</Question>

<Question title="ライブラリの選択はSEOに影響しますか？">

間接的に影響します。クローラーはルーティング、`hreflang`、`<html lang>`、およびサーバーレンダリングされたHTML内にテキストが存在するかどうかを評価します。[hreflangガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/hreflang_guide_multilingual_seo.md)を参照してください。

</Question>

</FAQ>

## さらに詳しく

- [Svelte i18nベンチマーク: バンドルサイズ、リーク、ロケール切り替え時間](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/svelte.md)
- [Svelte i18n: ストア、Runes、モジュールレベルの罠](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/svelte.md)および[SvelteKit i18n: ルーティング、SSR、共有状態](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/sveltekit.md)
- [そのまま使えるsvelte-i18n互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/svelte-i18n.md)
- [JavaScript i18nの歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)
- [コンパイラ vs 宣言型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)
- [コンポーネント単位 vs 集中管理型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)
- [ビルド時におけるバンドル最適化の仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)
- [Vite + Svelteアプリでのi18n設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+svelte.md)および[SvelteKitアプリでの設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_svelte_kit.md)
- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_react_i18n_library.md)、[Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_vue_i18n_library.md)、[Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_solid_i18n_library.md)向けの同様のガイド
