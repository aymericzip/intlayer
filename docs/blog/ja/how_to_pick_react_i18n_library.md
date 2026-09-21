---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026年に最適なReact i18nライブラリを選ぶ方法"
description: Reactの国際化（i18n）に関する意思決定ガイド。react-i18next、react-intl、Lingui、use-intl、Paraglide、Intlayerを比較する前に答えるべき質問と、バンドルサイズ、型安全性、メンテナンスコストにおける各選択肢のトレードオフを解説します。
keywords:
  - react i18n
  - react 国際化
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - i18n ライブラリ比較
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# 最適なReact i18nライブラリを選ぶ方法

Reactには標準のi18nプリミティブが用意されていません。プロジェクトの初期段階でどのライブラリを選択するかによって、翻訳がどのように保存され、どのようにバンドルへ組み込まれ、今後数年間にわたってどれだけの作業負荷が開発者に残り続けるかが決まります。多くのチームは知名度だけでライブラリを選び、翻訳キーが2,000個に達した段階でそのトレードオフに気づくことになります。

本ガイドでは逆のアプローチを取ります。まずプロジェクトに関するいくつかの質問に答え、その回答に合ったライブラリをマッピングしていきます。本記事はプレーンなReact（Vite、React Router、TanStack Start）に焦点を当てています。Next.jsには独自の制約があり、それについては[Next.jsの比較記事](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md)で解説しています。

![React i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 目次

<TOC/>

## ライブラリを比較する前に答えるべき6つの質問

自分にとってどの比較項目が重要なのかを知らなければ、機能比較表を見ても意味がありません。まずは以下の点を確認してください。

1. **アプリはどのようにレンダリングされるか？** SPAのみか、ハイドレーションを伴うSSRか、それともReact Server Components（RSC）か。ContextベースのフックはSPAであればどこでも動作します。しかしRSCでは、フックを使用するとテキストをレンダリングするすべてのコンポーネントに`"use client"`を強制することになるため、サーバーサイドAPIも必要になります。
2. **誰が翻訳を作成するか？** 開発者か、TMS（翻訳管理システム）を利用する社内チームか、ICUファイルを納品する翻訳会社か、それともAIパイプラインか。これはAPIの詳細以上にカタログのフォーマットを左右します。
3. **ロケール数とページ数はどのくらいか？** 2つのロケールと5ページ程度であれば、すべてをまとめてバンドルに含めても問題ありません。しかし、10ロケールで50ルートある場合、それは不可能であり、読み込み戦略が最大のコスト要因になります。
4. **キーの型安全性は必要か？** `t("checkout.totl")`のようなタイポは、自分で型を定義・接続しない限り、すべてのキーベースのライブラリでそのままコンパイルが通ってしまいます。それを許容できるかどうかを判断してください。
5. **文字列に何が含まれるか？** プレーンテキストか、複数形か、それとも文章の途中に`<Link>`が含まれるようなリッチテキストか。リッチコンテンツは、多くのAPIが扱いづらくなるポイントです。
6. **プロジェクトの運用期間はどのくらいか？** 3ヶ月のプロトタイプと5年間運用するプロダクトでは、必要となるビルドツールの充実度が異なります。

回答を書き出してみてください。以下の内容はすべてこれらの回答に関連しています。

## 1枚の図で見る全体像

JavaScript i18nの15年の歴史は4つのアーキテクチャの波に分けられ、比較対象となるReactライブラリはそれぞれ異なる世代に属しています。

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="ランタイム辞書（2011年〜2017年）: i18next, react-intl">

JSONカタログをメモリにロードし、実行時に`t("a.b")`を検索し、ブラウザ内でICUや独自構文をパースします。最大のエコシステムを持ちますが、ランタイムが最も重く、型定義はオプトイン（追加設定が必要）です。

</Accordion>
<Accordion header="コンパイル時マクロ（2018年〜2021年）: Lingui, typesafe-i18n">

ビルド時にメッセージを抽出し、コンパクトなカタログへコンパイルして引数を型付けします。バンドルサイズを削減できる反面、追加のビルドステップ（`extract`、`compile`）が必要です。

</Accordion>
<Accordion header="サーバーファースト（2022年〜2024年）: use-intl / next-intl">

SSRおよびServer Componentsを考慮して設計されています。サーバー側でレンダリングし、クライアントが必要とするものだけをハイドレーションします。ただし、依然としてキーベースであり中央集約型です。

</Accordion>
<Accordion header="コンパイラーおよびコロケーションコンテンツ（2024年〜2026年）: Paraglide, Intlayer, wuchale">

コンテンツをツリーシェイキング可能な関数またはコンポーネントごとの辞書にコンパイルします。型が自動生成され、翻訳漏れがあるとビルドが失敗し、CLIからAI翻訳を実行できます。

</Accordion>
</AccordionGroup>

[JavaScript i18nの歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)では、それぞれの波が前の世代の課題をどのように解決したかを詳しく解説しています。

## 最も重要な決定: コンテンツの配置場所と読み込みタイミング

すべてのReact i18nライブラリは、ストア、プロバイダー、フックという基本的に同じ構造を持っています。プロバイダーが受け取ったものは、最終的にクライアントバンドルまたはハイドレーションペイロードに含まれます。したがって、構造上の選択肢は次の2つです。

- **中央集約型（Centralized）か、スコープ付きコンテンツ（Scoped）か。** アプリ全体で1つの`en.json`を持つか、コンポーネントごと（または名前空間ごと）に1つの宣言を持つか。
- **静的インポート（Static）か、動的インポート（Dynamic）か。** 起動時にすべてをバンドルするか、アクティブなロケールとルートをオンデマンドで取得するか。

下のグラフは、1〜10ページ、1〜10ロケールに翻訳され、1ページあたり約30 KBのテキストを持つ理論上のアプリにおけるペイロードの推定値です。

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

静的インポートを使用した中央集約型コンテンツは、両方の軸に比例して肥大化します。10ページ × 10ロケールの場合、すべてのページに300 KBのテキストが含まれることになります。動的インポートを採用するとロケール軸の無駄を排除できます。スコープ化を行うとページ軸の無駄を排除できます。この両方を組み合わせて初めて、ペイロードを常にフラットな状態に保つことができます。

これはライブラリ自体の特性というよりも、設計規律の問題です。`react-i18next`でも名前空間や遅延ロードバックエンドを使用してスコープ化が可能です。`use-intl`もルートごとに分割できます。しかし、それを強制する仕組みはなく、共通の`<Button>`が`t("common:cta")`を参照するだけで、`common`が静かにすべてのルートの依存関係になってしまいます。[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)ではこれを「他ルートからのリーク」および「他ロケールからのリーク」として測定しており、これこそがライブラリ間の差の大部分を生み出しています。

質問3への回答が「多数のロケール、多数のページ」であった場合、APIの好み以上にこのセクションを重視してください。[コンポーネント単位 vs 中央集約型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)の記事では、この選択によるメンテナンス面の違いをさらに詳しく掘り下げています。

## 候補となるライブラリ

ライブラリのサイズは[TanStack Startベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)に基づいています（空のコンポーネントにおけるプロバイダーとフック、バンドル・ツリーシェイキング・Minify後、10ページ・10ロケール）。コンテンツのサイズは別途測定されています。

| ライブラリ              | 世代（Wave）       | コンテンツモデル                                 | 型安全性                                | メッセージフォーマット        | ライブラリサイズ                                 |
| :---------------------- | :----------------- | :----------------------------------------------- | :-------------------------------------- | :---------------------------- | :----------------------------------------------- |
| `react-i18next`         | ランタイム         | 中央JSON、名前空間                               | 2/5 — オプトイン（`CustomTypeOptions`） | i18next（サフィックス複数形） | 約18.4 kB                                        |
| `react-intl` (FormatJS) | ランタイム         | 中央JSON、ICU                                    | 2/5 — オプトイン（抽出 + union）        | ICU                           | 約15.3 kB                                        |
| `use-intl`              | サーバーファースト | 中央JSON、ICU                                    | 2/5 — オプトイン（declaration merging） | ICU                           | 約14.1 kB                                        |
| `@tolgee/react`         | ランタイム         | 中央集約、インコンテキスト編集                   | 1/5 — なし                              | ICU                           | 約11.1 kB                                        |
| Lingui                  | マクロ             | コード内のソーステキスト、コンパイル済みカタログ | 2/5 — 良好（コンパイラーから）          | マクロ経由のICU               | 約11.8 kB                                        |
| Paraglide               | コンパイラー       | inlangプロジェクト、生成された関数               | 3.5/5 — 自動生成                        | 独自                          | ほぼゼロ（コードベースに生成されるコードのため） |
| Intlayer                | コンパイラー       | コンポーネントごとの`.content.ts`                | 5/5 — 自動生成、デフォルトで有効        | Intlayer (+ ICU, i18next, PO) | ~5.0 kB                                          |

> 数値はベンチマーク実施時のバージョンに基づくスナップショットであり、リリースによって変動します。サイズだけで判断する前に、自身のアプリでベンチマークを実行してください。
> 型安全性：5/5は、URLフォーマッターやヘルパーを含め、キー・パラメータ・すべてのロケールが手動設定なしに検証されることを意味します。

この表に現れていない点が2つあります。`Paraglide`はコードをリポジトリ内に直接生成するためライブラリサイズがほぼゼロになりますが、コミット前ごとの再生成ステップが必要になり、生成ファイルでマージコンフリクトが発生しやすくなります。また、`Intlayer`はバンドラープラグイン（`vite-intlayer`など）を必須とするため、ビルドステップのない環境（no-build setup）では動作しません。

## 回答に基づいたライブラリの選択

<AccordionGroup>
<Accordion header="プロトタイプ、少人数チーム、少ないロケール">

過剰な投資は避け、最もシンプルに動くものを選択してください。ロケールごとに1つのJSONを使用する`react-i18next`で十分であり、過去10年間に蓄積されたStack Overflowの知見が開発時間を節約してくれます。必要になるまで名前空間の導入は見送りましょう。プロトタイプが正式なプロダクトに移行した場合は、スコープ付きコンテンツへの移行を検討してください。[react-i18next互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-i18next.md)を利用すれば、段階的な移行が可能です。

</Accordion>
<Accordion header="翻訳がICU対応の翻訳会社またはTMSから提供される">

カタログのフォーマットはあらかじめ決まっています。`react-intl`はICUネイティブであり、FormatJSの抽出ツールはそのようなパイプライン向けに構築されています。`use-intl`もICUを読み込めます。`react-i18next`の場合はICUプラグインが必要となり、そうでない場合は独自の複数形キーを使用することになります。IntlayerのICUサポートはまだ部分的なため、現在ICU文字列を受け取るワークフローがある場合は、完全サポートされるまで待つのが無難です。

</Accordion>
<Accordion header="大規模アプリ、多数のルート、バンドルサイズの制限が厳しい">

規約に頼るのではなく、デフォルトでスコープ付きコンテンツと動的ロードを提供するものを優先してください。`Lingui`や`Paraglide`はコンパイルによってこれを実現します。Intlayerはコンポーネントごとの宣言によって実現し、コンパイラーがそのルートでレンダリングされる内容のみを出力します。`react-i18next`や`use-intl`を採用する場合は、ツール側で強制されないため、初日から名前空間と遅延ロード戦略を設計し、コードレビューで徹底する必要があります。

</Accordion>
<Accordion header="型安全性が必須要件である">

キーベースのライブラリはすべて型付けが可能ですが、最初から型付けされているものはほとんどありません。遅延ロードされる名前空間に対応するためのdeclaration mergingの保守を避けたい場合は、コンテンツから型が自動生成されるライブラリ（`Lingui`、`Paraglide`、Intlayer）を選択してください。[翻訳漏れの検知に関する記事](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/detecting_missing_translations.md)では、ビルド時に各ライブラリが何を検出できるかを比較しています。

</Accordion>
<Accordion header="リッチコンテンツ（マークダウン、文中のリンク、ロケールごとのコンポーネント）が多い">

文字列を返すだけの`t()`関数は、リッチノードの扱いで破綻しがちです。`react-i18next`や`Lingui`には`<Trans>`があり、`react-intl`にはリッチテキストタグがありますが、いずれもプレーンな文字列の場合と比べて記述が煩雑になります。IntlayerのコンテンツノードはJSX、マークダウン、ネストされたオブジェクトを直接受け取ることができるため、コンテンツが単なるUIラベルにとどまらない場合に最適です。

</Accordion>
<Accordion header="翻訳をAIで生成し、開発者がレビューする">

この場合、インポート先のTMSが存在しないため、中央集約型のJSONを用意する必要はありません。コロケーションされたコンテンツと、欠落しているロケールを補完するCLIを組み合わせるのが最短のルートです。Intlayerの`fill`コマンドは自身のAPIキー（OpenAI、Anthropic、Mistral、Gemini）を使用して実行され、変更された差分のみを翻訳します。ParaglideやTolgeeも、独自のプランでホスト型同等機能を提供しています。

</Accordion>
<Accordion header="将来的にNext.js App Routerへ移行する可能性がある">

Reactのコンテキストはサーバーとクライアントの境界を越えることができません。クライアントフックのみに依存するライブラリ（`react-i18next`、`react-intl`）は、RSCを採用する段階で並行して動作するサーバーAPIが必要になります。`use-intl`（`next-intl`として）やIntlayer（`next-intlayer`として）はすでにその分割に対応しています。標準パターンを決定する前に、[Next.js i18nの記事](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/nextjs.md)を確認してください。

</Accordion>
</AccordionGroup>

## 各ライブラリのデメリット・注意点

すべての選択肢に何らかのトレードオフが存在するため、率直な限界を挙げます。

- **`react-i18next`**: この中で最も重く、独自の複数形フォーマットを持ち、型定義の接続・保守は開発者の責任であり、使用されていないデッドキーが静かに蓄積されがちです。
- **`react-intl`**: 冗長な開発者体験（`useIntl()`を呼び出してから`formatMessage({ id })`を実行）、多数のノードと紐づくグローバルインスタンス。
- **`use-intl`**: 導入は簡単ですが最適化が困難です。名前空間、動的ロード、型定義を組み合わせると開発スピードが大幅に低下します。
- **`Lingui`**: 追加の`extract` / `compile`ビルドステップが必要で、重複する複数の構文（`t()`、タグ付きテンプレート、`i18n.t()`、`<Trans>`）が存在するため人間とAIアシスタントの双方が混乱しがちです。
- **`Paraglide`**: リポジトリ内にコードが自動生成され、Reactベンチマークではツリーシェイキングが有効に機能せず、ロケールはストアではなく各ノードでストレージから直接読み込まれます。
- **`Tolgee`**: キーの型定義がなく、導入の学習コストが高めです。インコンテキスト編集機能が主なセールスポイントです。
- **`Intlayer`**: ビルドプラグインが必須で、エコシステムは比較的小さく、ICUサポートは部分的です。設計上コンテンツがコードベース全体に分散しているため、翻訳者向けに単一のJSONとしてエクスポートするにはツールが必要です。
- **`gt-react`, `lingo.dev`**: ベンチマークでは非推奨と評価されました。ビルド時のクォータエラー、ベンダーロックイン、プロバイダーの再レンダリングを強制する必要があるリアクティビティの問題などが確認されています。

## コードによる各選択肢の比較

タイトルと複数形を含む同じコンポーネント（カートの概要）を、各候補ライブラリで記述した例です。注目すべきはコンポーネント自体ではなく、コンテンツがどこに配置され、型チェッカーがそれをどのように認識するかという点です。

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

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
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

複数形は`Intl.PluralRules`を介して解決されるサフィックスキーです。`CustomTypeOptions`を宣言しない限り`t`は`(key: string) => string`となるため、`t("titel")`のようなタイポもコンパイルが通ってしまいます。

  </Tab>
  <Tab label="react-intl" value="react-intl">

  <Tabs group="locale">
  <Tab value="en" label="英語">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="フランス語">

```json fileName="src/locales/fr.json"
{
  "cart.title": "Votre panier",
  "cart.items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  <Tab value="es" label="スペイン語">

```json fileName="src/locales/es.json"
{
  "cart.title": "Tu carrito",
  "cart.items": "{count, plural, one {# artículo} other {# artículos}}"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

エンドツーエンドでICUを使用しており、これは多くのTMSプラットフォームがエクスポートする形式です。`id`の型安全性は`formatjs`の抽出ステップと生成されたunion型から得られるものであり、初期状態ですぐに使えるわけではありません。

  </Tab>
  <Tab label="use-intl" value="use-intl">

  <Tabs group="locale">
  <Tab value="en" label="英語">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="フランス語">

```json fileName="messages/fr.json"
{
  "Cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="スペイン語">

```json fileName="messages/es.json"
{
  "Cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Next.jsのバインディングがない点を除けば`next-intl`と同じ構造です。`AppConfig`をメッセージ型で拡張（augment）するとキーが型付けされます。名前空間の分割は開発者自身で行う必要があります。

  </Tab>
  <Tab label="Lingui" value="lingui">

  <Tabs group="locale">
  <Tab value="en" label="英語">

```po fileName="src/locales/en/messages.po"
msgid "Your cart"
msgstr "Your cart"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# item} other {# items}}"
```

  </Tab>
  <Tab value="fr" label="フランス語">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

  </Tab>
  <Tab value="es" label="スペイン語">

```po fileName="src/locales/es/messages.po"
msgid "Your cart"
msgstr "Tu carrito"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# artículo} other {# artículos}}"
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

ソース言語はコンポーネント内に直接記述され、その他のロケールは`lingui extract`実行後にハッシュ化されたIDを持つ`.po`ファイルに格納されます。`extract`または`compile`を忘れると、サイレントに英語へフォールバックされます。

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
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

すべてのメッセージが型付きの自動生成関数となるため、存在しないキーを参照するとインポートエラーになります。`paraglide/`フォルダーはリポジトリ内に生成され、変更のたびに再生成されます。

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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

すべてのロケールがコンポーネントの隣にある1つのファイルに記述されます。ビルド時に型が自動生成されるため、`title`は自動補完され、タイポがあるとdeclaration mergingなしで`tsc`がエラーを検出します。コンポーネントフォルダーを削除すれば、対応する文字列も一緒に削除されます。

  </Tab>
</Tabs>

すでに`react-i18next`、`react-intl`、または`Lingui`をお使いですか？互換アダプター（[react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-i18next.md)、[react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-intl.md)、[Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/lingui.md)）はバンドラーレベルでインポートをエイリアス化するため、コンポーネント単位で移行を進めながら既存のAPIをそのまま動作させ続けることができます。その他の詳細については[マイグレーションガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_react-i18next_to_intlayer.md)をご覧ください。

## 採用を決める前に

機能一覧表はライブラリが現在何ができるかを教えてくれますが、以下のポイントは実際にそのライブラリを運用し続けることがどのようなものかを教えてくれます。

**リポジトリのアクティビティを確認する。**

コミット頻度、Issueへの返信時間、直近のマイナーリリースが今年行われているかどうかを確認してください。メンテナーがいない優れた設計は、いずれ将来の移行作業を余儀なくされます。

**npmのダウンロード数だけで選ばない。**

最もインストールされているライブラリは、最初にリリースされたものであり、必ずしも2026年のReactコードベースに適したものであるとは限りません。ダウンロード数は歴史の長さを示しているだけで、現在の適合度を示すものではありません。

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**メンテナーに誰が資金を提供し、何を販売しているかを確認する。**

`i18next`はLocizeが支援しています。`next-intl` / `use-intl`、`vue-i18n`、`svelte-i18n`、LinguiはCrowdinが支援しています。Tolgee、Paraglide（inlang）、Intlayerはそれぞれ独自のプラットフォームを運営しています。ホスト型翻訳サービスの提供を主な収益源とするベンダーは、自社のツールチェーン内で翻訳を完全に無料化するインセンティブがほとんどありません。Intlayerはこの中で唯一、開発者自身のAPIキーを使用してCLI経由でAI翻訳を実行でき、セルフホスト可能なCMSを提供しています。

**AIエージェントに対応しているか？**

AIエージェントは依然としてi18nに苦労しています（ロケールを忘れる、存在しないキーを作成する、メッセージ構文を混同するなど）。ライブラリが[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)や[MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)を提供しており、エージェントがコンテンツの一覧表示、自動補完、テストを実行できるようになっているか？また、コンテンツの読み込みはデフォルトで最適化されているか、それとも四半期ごとに誰かが名前空間や遅延インポートを見直す必要があるか？

**初期状態で型安全であるか。**

「追加の設定を行えば型付けできる」ではなく、「新規インストール時に不正なキーを指定すると`tsc`が失敗する」かどうかを確認してください。存在しないキーを指定した場合や、翻訳が1つ欠落しているロケールがある場合に何が起こるかを検証してください。

**未使用コンテンツの検出。**

翻訳カタログは肥大化する一方です。Intlayerのビルドは未使用のフィールドをパージ（削除）してログを出力します（`build.purge`）。Paraglideはアーキテクチャによってこれを実現し、呼び出されないメッセージ関数はツリーシェイキングされます。それ以外のライブラリでは、クリーンアップ作業は開発者自身に委ねられます。

**開発者体験（DX）。**

最初の翻訳文字列が表示されるまでのセットアップ時間、ホバー時に翻訳を表示して宣言箇所へジャンプできる[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)や[VS Code拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)、補完・テスト・プッシュのための[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)、コンポーネント内のハードコードされた文字列を抽出してキーごとに管理する手間をなくす[コンパイラー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)や抽出ツール、そして開発者以外でもプルリクエストなしでコンテンツを編集できる仕組み（[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)や[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)）が用意されているかを確認してください。

## よくある質問（FAQ）

<FAQ>

<Question title="2026年でもreact-i18nextは依然として無難な選択肢ですか？">

多くのチームにとって依然として有効な選択肢です。最大のエコシステムを持ち、オンライン上に最も多くの解決策が存在します。そのコスト（最も重いランタイム、独自の複数形フォーマット、手動で設定・維持しなければならない型安全性とスコープ管理など）は無視できませんが、予測可能です。

</Question>

<Question title="コンパイラーベースのライブラリは必須ですか？">

バンドルサイズ、自動生成される型、またはビルド時の翻訳漏れチェックが要件に含まれている場合にのみ必要となります。2つのロケールを持つ小規模なアプリであれば、ランタイムライブラリの方がシンプルです。[コンパイラー vs 宣言的 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)の記事では、コンパイラーがもたらすメリットと注意すべき点について解説しています。

</Question>

<Question title="すべてのコンポーネントを書き直さずに後からライブラリを変更できますか？">

部分的に可能です。キーベースのライブラリは共通の構造を持っているため、互換アダプターによってあるAPIを別のAPIへエイリアス変換できます（Intlayerのアダプターはこのように動作します）。メッセージフォーマット（ICU vs i18next vs ヘルパー）は自動変換されないため、複数形や変数の埋め込み（補間）部分は手動で修正する必要があります。

</Question>

<Question title="ライブラリの選択はSEOに影響しますか？">

間接的に影響します。クローラーが認識する内容は、ルーティング、`hreflang`、`<html lang>`、およびテキストがサーバーレンダリングされたHTMLに含まれているかどうかによって決まります。一部のライブラリはこれらを補助するヘルパーを提供していますが、多くは開発者自身の実装に委ねられています。詳細は[hreflangガイド](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/hreflang_guide_multilingual_seo.md)をご覧ください。

</Question>

</FAQ>

## さらに詳しく知るには

- [i18nライブラリ ベンチマーク: バンドルサイズ、リーク、ロケール切り替え時間](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)および[TanStack Startレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)
- [React i18n: プロバイダーモデルの仕組みとコスト](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/list_i18n_technologies/frameworks/react.md)
- [react-i18next vs react-intl vs Intlayerの機能別徹底比較](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/next-i18next_vs_next-intl_vs_intlayer.md)
- [JavaScript i18nの歴史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/history_of_i18n.md)
- [コンパイラー vs 宣言的 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)
- [コンポーネント単位 vs 中央集約型 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/per-component_vs_centralized_i18n.md)
- [ビルド時におけるバンドル最適化の仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)
- [Vite + Reactアプリでのi18nセットアップ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)
- 各フレームワーク向けガイド: [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_vue_i18n_library.md)、[Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_svelte_i18n_library.md)、[Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/how_to_pick_solid_i18n_library.md)
