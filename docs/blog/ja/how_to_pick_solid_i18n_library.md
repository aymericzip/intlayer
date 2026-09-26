---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "2026年に最適なSolid i18nライブラリを選ぶ方法"
description: SolidJSおよびSolidStartの国際化（i18n）に関する意思決定ガイド。@solid-primitives/i18n、solid-i18next、Paraglide、Lingui、Intlayerを比較する前に答えるべき質問と、リアクティビティ、バンドルサイズ、型定義における各選択肢のコストを解説します。
keywords:
  - solidjs i18n
  - solid start i18n
  - solid 国際化
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - i18n ライブラリ比較
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# 最適なSolid i18nライブラリを選ぶ方法

Solidのリアクティビティモデルは、i18nライブラリに求められる役割を大きく変えます。コンポーネントは一度しか実行されないため、セットアップ時に`const`に格納された翻訳文字列は固定された文字列（frozen string）になります。アクセサ（accessor）ではなく文字列を直接返すライブラリを使用すると、その書き方をした3つのコンポーネントだけ言語が切り替わらないページが出来上がってしまいます。Solid向けのライブラリ選びは、APIの扱いやすさだけでなく、そのようなミスを防ぎやすい設計になっているかどうかも重要な要素です。

本ガイドでは、まず確認すべき質問事項を整理し、それらに基づいて`@solid-primitives/i18n`、`solid-i18next`、Paraglide、`@lingui/solid`、Intlayerを、Vite + SolidおよびSolidStartの両方の環境で比較・マッピングしていきます。

![Solid i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 目次

<TOC/>

## ライブラリを比較する前に答えるべき6つの質問

1. **Vite SPAか、SolidStartか？** SPAであれば、ロケールをシグナル（signal）内で保持するだけで完結します。SolidStartの場合、サーバー上でURLからロケールを解決する必要があり、クローラーがJavaScriptなしで読み取るべき要素（`<html lang>`、`hreflang`）は`entry-server.tsx`に記述する必要があります。
2. **ロケール変更のリアクティビティはどの程度必要か？** 言語切り替え時にページ全体をリロードする仕様で問題ないアプリもあります。そうでない場合、ライブラリが提供する値はシグナルまたはアクセサである必要があり、その値の読み取りはコピーではなく追跡（tracked）されなければなりません。
3. **誰が翻訳を作成するか？** 開発者か、TMS（翻訳管理システム）か、ICU形式を納品する翻訳会社か、それともAIパイプラインか。`solid-i18next`はi18nextのフォーマットに対応しています。`@solid-primitives/i18n`は自作の辞書オブジェクトそのものです。翻訳を行う担当者やツールに合った形式を選びましょう。
4. **ロケール数とページ数はどのくらいか？** 2つのロケールと5ページ程度であれば、すべてをまとめて配信できます。10ロケールと40ルートがある場合はそれが不可能になり、遅延ロード（lazy catalogs）とスコープ分割が最大のコスト要因になります。
5. **キーの型安全性は必要か？** `@solid-primitives/i18n`は元の辞書オブジェクトから型を推論します。`solid-i18next`は手動での型宣言が必要です。コンパイル時ライブラリは型を自動生成します。
6. **どの程度の機能セットが必要か？** Cookie管理、ロケールプレフィックス付きルーティング、リダイレクト、フォーマッタなど。最も軽量な選択肢にはこれらの機能は一切含まれていません。要件が小さいうちはそれでも問題ありません。

回答を書き出してみてください。以降の内容はすべてこれらの項目を前提に進めます。

## 1枚の図で見る全体像

Solidは比較的新しいエコシステムであり選択肢も少なめですが、大きく3つの波に分かれています。

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="ランタイム辞書: solid-i18next">

Solid向けにラップされたi18next。ネームスペース、バックエンド、言語検出、そして10年以上にわたる豊富なプラグインを備えています。最も重い選択肢であり、Reactと同様に`t("a.b")`のオーバーヘッドが存在します。

</Accordion>
<Accordion header="最小限のプリミティブ（2022年）: @solid-primitives/i18n">

自身で管理するフラットな辞書、アクセサを返す`translator()`、元のオブジェクトから推論される型定義。非常に軽量ですが、スコープ分割、ルーティング、フォーマッタなどの機能はありません。コミュニティ標準の選択肢です。

</Accordion>
<Accordion header="コンパイラとコロケーション（2024年〜2026年）: Paraglide, Intlayer, @lingui/solid">

Paraglideはメッセージごとに1つの関数を生成します。Intlayerは`.content.ts`ファイルでコンポーネントごとにコンテンツを宣言し、シグナル対応のノードを返します。2026年に登場したLinguiのSolidバインディングは、マクロベースの抽出機能を提供します。

</Accordion>
</AccordionGroup>

各世代の詳細については、[JavaScript i18nの歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)で詳しく解説しています。

## 最も重要な意思決定: コンテンツの配置場所と読み込みタイミング

構成におけるバンドルサイズの差の大部分は、主に2つの構造的な選択によって決まります。

- **集中管理か、コンポーネントごとのスコープ管理か。** アプリ全体で1つの辞書を持つか、コンポーネントごとに1つの宣言を持つか。
- **静的インポートか、動的インポートか。** 起動時にすべて読み込むか、アクティブなロケール（理想的にはアクティブなルートも）をオンデマンドで取得するか。

以下のグラフは、1〜10ページ、1〜10ロケール、1ページあたり約30 KBのテキストを持つ理論上のアプリにおけるペイロードの推定値を示しています。

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n`はどちらの軸も自動では対応しません。ロケールごとに辞書を`createResource`することで動的ロードは実現できますが、それ以外の制御は自作する必要があります。`solid-i18next`にはネームスペースと遅延バックエンドがありますが、マッピングが強制されないため、共通コンポーネントが`common`をインポートすると、それがすべてのルートの依存関係になってしまいます。Paraglideはツリーシェイキング（tree-shaking）によってページ単位の最適化を行いますが、[Solidベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/solid.md)の実装では効果が現れませんでした。Intlayerはコンポーネントごとの宣言によってこれを実現します。

質問4の回答が「多くのページがある」だった場合は、APIの好みよりもこのセクションを重視してください。[コンポーネント単位 vs 集中管理型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)の記事では、このトレードオフのメンテナンス面について解説しています。

## 比較対象の候補

ライブラリのサイズは、10ページ・10ロケールのアプリを対象にした[Solidベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/solid.md)（バンドル、ツリーシェイキング、minify後の空コンポーネントにおけるProvider＋アクセサ）の数値です。コンテンツのサイズは個別に測定しています。

| ライブラリ               | コンテンツモデル                                 | ロケール変更時のリアクティビティ              | 型安全性                         | スコープ管理と遅延ロード         | ライブラリサイズ                                 |
| :----------------------- | :----------------------------------------------- | :-------------------------------------------- | :------------------------------- | :------------------------------- | :----------------------------------------------- |
| `@solid-primitives/i18n` | 自身で管理するフラットな辞書                     | シグナル、translatorから返されるアクセサ      | 3/5 — 元の辞書から推論           | 組み込みなし                     | 約0.6 kB                                         |
| `solid-i18next`          | i18nextのカタログとネームスペース                | Store、Provider経由の再レンダリング           | 2/5 — 手動宣言                   | ネームスペース、遅延バックエンド | 約14.9 kB                                        |
| Paraglide                | inlangプロジェクト、生成された関数               | CookieまたはStorageから呼び出しごとに読み取り | 3.5/5 — 自動生成                 | ツリーシェイキング（ベンチ外）   | ほぼゼロ（コードベースに生成されるコードのため） |
| `@lingui/solid`          | コード内のソーステキスト、コンパイル済みカタログ | シグナルベース                                | 2/5 — コンパイラから生成         | カタログ単位                     | 約11.8 kB                                        |
| Intlayer                 | コンポーネントごとに1つの`.content.ts`           | シグナル対応ノード、コンポーネント再実行なし  | 5/5 — 自動生成、デフォルトで有効 | あり（コンポーネント単位）       | ~4.3 kB                                          |

> 数値はベンチマーク実施バージョンのスナップショットです。`@lingui/solid`のサイズはTanStack Startベンチマークの値です。サイズだけで判断する前に、実際のアプリで計測してください。
> 型安全性：5/5は、URLフォーマッターやヘルパーを含め、キー・パラメータ・すべてのロケールが手動設定なしに検証されることを意味します。

Paraglideのライブラリサイズがほぼゼロである理由は構造によるものです。ランタイムがリポジトリ内に直接生成されます。Intlayerは`vite-intlayer`を必要とするため、ビルドステップなしでは動作しません。

## 回答に基づいたライブラリの選定

<AccordionGroup>
<Accordion header="Vite SPA、小規模なカタログ、シンプルな構成を好む場合">

`@solid-primitives/i18n`が適しています。フラットな辞書、アクセサを返す`translator()`、設定不要で推論される型定義が特徴です。小規模アプリには最適な選択肢であり、ソースコードも10分程度で読み通せます。ロケールの永続化、ルーティング、フォーマッタ、ルートごとのコード分割などは自分で実装する必要があります。これらの要件が増えてきたら、他のライブラリへの移行を検討する合図です。

</Accordion>
<Accordion header="i18nextコードベースのReactプロジェクトから移行する場合">

`solid-i18next`を使用すれば、既存のカタログ、ネームスペース、バックエンド、言語検出処理をそのまま再利用できます。最も重い選択肢であり、`react-i18next`と同様のコスト（手動での型宣言、可能だが手間の掛かる最適化、文字列を返す`t()`による翻訳フリーズの起きやすさなど）が伴います。読み取りはJSX内またはメモ（memo）内で行い、セットアップ時に変数へ保存しないようにしてください。

</Accordion>
<Accordion header="SolidStartでロケールプレフィックス付きルートとSSRを扱う場合">

クライアントとサーバーで言語設定を一致させるため、サーバー側のURLからロケールを取得する必要があります。クライアント側で検出していては遅すぎます。`@solid-primitives/i18n`や`solid-i18next`では、`[[locale]]`ルート、`matchFilters`、リダイレクト処理、`entry-server.tsx`のタグ設定をすべて自前で構築する必要があります。Paraglideにはルーティングを処理するViteプラグインが用意されています。Intlayerにはミドルウェアとルートヘルパーが同梱されています。どの選択肢を採用する場合でも、`<html lang>`と`hreflang`は`entry-server.tsx`に記述してください。SolidStart v2では`@solidjs/meta`がクライアント側でハイドレーション後に適用されるためです。詳細なセットアップ手順は[Solid i18nの記事](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/solid.md)を参照してください。

</Accordion>
<Accordion header="ロケール変更を即座かつきめ細かく（fine-grained）反映させたい場合">

値がシグナルまたはアクセサであり、読み取りが追跡されるライブラリを選択してください。`@solid-primitives/i18n`のアクセサとIntlayerのノードは、コンポーネント全体を再実行することなく、それらを読み取っているDOMノードのみを更新します。`solid-i18next`はProviderを介して再レンダリングを行います。Paraglideはシグナルではなくメッセージ呼び出しごとにCookieやStorageからロケールを読み取るため、動作はしますが不要な処理コストが発生します。

</Accordion>
<Accordion header="大規模アプリ、多数のルート、バンドルサイズを重視する場合">

ビルド時にコンパイルされるスコープ管理されたコンテンツが最適です。Intlayerはルートが描画するものだけを配信します。Paraglideはツリーシェイキングによって最適化されるはずですが、ベンチマーク環境では機能しなかったため実際の環境で検証してください。`solid-i18next`を使用する場合は、初日からネームスペースと遅延読み込みの戦略を設計し、コードレビューで徹底する必要があります。

</Accordion>
<Accordion header="型安全性が必須条件である場合">

`@solid-primitives/i18n`は追加設定なしで推論された型を提供します。これは多くのReactライブラリ以上の利点です。遅延ロードやルートごとのコード分割に対応した生成型の点では、Paraglide、`@lingui/solid`、Intlayerはいずれもコンテンツから型を自動生成します。[不足している翻訳の検出](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/detecting_missing_translations.md)の記事では、各ライブラリがビルド時に何をキャッチできるかを比較しています。

</Accordion>
<Accordion header="翻訳をAIで自動生成する場合">

集中管理型の辞書ファイルはもはや不要になります。コンポーネントと同じ場所に配置するコロケーション（colocated content）と、不足ロケールを補完するCLIを組み合わせるのが最も効率的です。Intlayerの`fill`コマンドは独自のAPIキー（OpenAI、Anthropic、Mistral、Gemini）を利用でき、変更された部分のみを再翻訳します。

</Accordion>
</AccordionGroup>

## 各ライブラリのデメリット・注意点

- **`@solid-primitives/i18n`**: 自作しない限り遅延ロードやスコープ管理がなく、ルーティング、Cookie処理、フォーマッタも非搭載。小規模アプリには優れていますが、プロダクション規模では機能不足になりやすいです。
- **`solid-i18next`**: 候補の中で最も重く、型の定義が手動であり、独自の複数形フォーマットを採用しています。また`t()`が文字列を返すためセットアップ時に保存すると翻訳がフリーズします。
- **Paraglide**: 生成されたファイルをリポジトリにコミットしPush前に再生成する必要があり、Solidベンチマークではツリーシェイキングが有効に機能せず、シグナルではなくストレージから呼び出しごとにロケールを読み取ります。
- **`@lingui/solid`**: 2026年に登場したばかりで本番実績がまだ少ないです。Lingui特有の`extract` / `compile`ビルドステップと、複数の重複する構文を引き継いでいます。
- **Intlayer**: ビルドプラグインが必須で、エコシステムが比較的小さく、ICUのサポートが一部に留まります。また設計上コンテンツがコードベース全体に分散するため、翻訳者向けに1つのJSONへエクスポートするにはツールが必要です。

## コードによる各選択肢の比較

タイトルと複数形を含む同じカートサマリーコンポーネントを、各候補ライブラリで記述した例です。翻訳がどこで読み取られているかに注目してください。JSX内では追跡されますが、セットアップ関数内では固定された文字列になってしまいます。

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

  <Tabs group="locale">
  <Tab value="en" label="英語">

```ts fileName="src/i18n/en.ts"
export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export type Dict = typeof en;
```

  </Tab>
  <Tab value="fr" label="フランス語">

```ts fileName="src/i18n/fr.ts"
import type { Dict } from "./en";

export const fr: Dict = {
  cart: { title: "Votre panier", items: "{{ count }} articles" },
};
```

  </Tab>
  <Tab value="es" label="スペイン語">

```ts fileName="src/i18n/es.ts"
import type { Dict } from "./en";

export const es: Dict = {
  cart: { title: "Tu carrito", items: "{{ count }} artículos" },
};
```

  </Tab>
  </Tabs>

```ts fileName="src/i18n/index.ts"
import { createSignal } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export type Locale = "en" | "fr" | "es";

const dictionaries = {
  en: i18n.flatten(en),
  fr: i18n.flatten(fr),
  es: i18n.flatten(es),
};

export const [locale, setLocale] = createSignal<Locale>("en");
export const dictionary = () => dictionaries[locale()];
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

コード生成なしで英語オブジェクトからキーの型が推論されます。複数形ルール、遅延読み込み、ルーティングは含まれておらず、必要に応じて追加する必要があります。

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

  <Tabs group="locale">
  <Tab value="en" label="英語">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="フランス語">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="スペイン語">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

i18nextのカタログ、ネームスペース、プラグインをそのまま使用できます。`t`は文字列を返すため、セットアップ時に`const title = t("cart:title")`と記述すると値が固定されてしまいます。呼び出しはJSX内で行うようにしてください。

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="英語">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="フランス語">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="スペイン語">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

すべてのメッセージが型付きの自動生成関数になります。ロケールはシグナルではなく呼び出しごとにCookieまたはStorageから読み取られるため、切り替え時のリアクティビティは自前で設定する必要があります。

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      ja: "カート",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        ja: "{{count}} 点の商品",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        ja: "{{count}} 点の商品",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

コンポーネントの隣にある1つのファイルに全ロケールを記述します。`useIntlayer`はシグナル対応ノードを返すため、ロケール変更時はそれらを読み取るDOMノードのみが更新されます。JSX内の`{content.title}`は追跡されますが、セットアップ関数内の`content.title.value`は追跡されません。

  </Tab>
</Tabs>

既存のi18nextコードベースに対しては、[i18next互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/i18next.md)によりバンドラーレベルでパッケージがエイリアスされ、Intlayerがコンテンツを提供しながらカタログと`t()`を引き続き動作させることができます。その他の詳細は[移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)を参照してください。

## 採用を決める前のチェックポイント

機能比較表は現在の機能を示しているに過ぎません。以下のポイントは、実際にそのライブラリを運用していく際の体験を左右します。

**リポジトリのアクティビティを確認する。**

コミット頻度、Issueへの返答時間、最新のマイナーリリースが今年行われているかを確認してください。メンテナーのいない優れた設計は、いずれ移行作業を迫られることになります。

**npmのダウンロード数だけで選ばない。**

最もインストールされているライブラリは、最初にリリースされたものであり、必ずしも2026年のSolidコードベースに適合しているわけではありません。ダウンロード数は歴史の長さを示すものであり、適合度を示すものではありません。

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**メンテナーの収益モデルと販売対象を確認する。**

`solid-i18next`の背後にある`i18next`はLocizeが支援しています。`next-intl`、`vue-i18n`、`svelte-i18n`、LinguiはCrowdinが支援しています。Tolgee、Paraglide（inlang）、Intlayerはそれぞれ独自のプラットフォームを運営しています。ホスティング翻訳サービスを主な収益源とするベンダーは、開発ツールチェーン内での無料翻訳を促進する動機が薄くなりがちです。Intlayerはこの中で唯一、独自のAPIキーを使ったCLI経由のAI翻訳と、セルフホスト可能なCMSを提供しています。

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

<Question title="@solid-primitives/i18nはプロダクションアプリに十分ですか？">

小規模なアプリであれば十分であり、最も軽量な選択肢です。ただし、ルートごとの遅延カタログ、SolidStartでのロケールルーティング、Cookieによる永続化、フォーマッタなどが必要になった場合は、すべて自前で構築する必要があるため不足を感じるようになります。

</Question>

<Question title="ロケールを変更しても翻訳が更新されないのはなぜですか？">

Solidのコンポーネントは一度しか実行されないためです。セットアップ時に`const`に読み込まれた翻訳は単なる文字列であり、サブスクリプションではありません。JSX内、エフェクト内、またはメモ内で読み取るか、値がアクセサになっていて誤った記述をしにくいライブラリを選択してください。

</Question>

<Question title="コンパイラベースのライブラリは必要ですか？">

バンドルサイズ、自動生成された型、あるいはビルド時の不足キーチェックが実際に必要な要件である場合にのみ検討してください。[コンパイラ vs 宣言型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)の記事では、コンパイラが提供する利点と注意点について解説しています。

</Question>

<Question title="ライブラリの選択はSEOに影響しますか？">

間接的に影響します。クローラーはルーティング、`hreflang`、`<html lang>`、およびサーバーレンダリングされたHTML内にテキストが存在するかどうかを評価します。SolidStartにおいては`entry-server.tsx`の設定が重要になります。[hreflangガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/hreflang_guide_multilingual_seo.md)を参照してください。

</Question>

</FAQ>

## さらに詳しく

- [Solid i18nベンチマーク: バンドルサイズ、リーク、ロケール切り替え時間](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/solid.md)
- [Solid i18n: ロケール変更時に翻訳がフリーズする理由](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/solid.md)
- [そのまま使えるi18next互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/i18next.md)および[i18next移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)
- [JavaScript i18nの歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)
- [コンパイラ vs 宣言型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)
- [コンポーネント単位 vs 集中管理型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)
- [ビルド時におけるバンドル最適化の仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)
- [Vite + Solidアプリでのi18n設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+solid.md)および[SolidStartアプリでの設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_solid_start.md)
- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_react_i18n_library.md)、[Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_vue_i18n_library.md)、[Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_svelte_i18n_library.md)向けの同様のガイド
