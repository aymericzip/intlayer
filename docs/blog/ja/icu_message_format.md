---
createdAt: 2026-09-02
updatedAt: 2026-10-03
priority: 8
title: "ICU MessageFormat: 構文、複数形、Selectの完全解説"
description: ICU MessageFormatの実践的なリファレンス。引数の埋め込み、複数形やselectの分岐、言語ごとのCLDR複数形カテゴリ、よくある落とし穴を解説します。
keywords:
  - icu message format
  - icu messageformat
  - cldr 複数形ルール
  - 複数形カテゴリ
  - selectordinal
  - i18n 複数形
  - メッセージ構文
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# ICU MessageFormat: 構文とよくある落とし穴

ICU MessageFormatは、翻訳文字列の中に複数形、性別による変化、数値や日付のフォーマットといった分岐ロジックを直接持たせることができる構文規格です。これは、文法は`if (count === 1)`を書くエンジニアではなく、翻訳者が管理すべきものだという思想に基づいています。本記事では、構文の基本、単純な実装が破綻しやすい言語特有のルール、そしてJavaScriptエコシステムにおける対応状況を解説します。

## 目次

<TOC/>

## 具体的な課題

多くの開発者が最初に書いてしまいがちなコードがこちらです。

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

これは英語では問題なく動きますが、他の言語では破綻します。

- **ロシア語やポーランド語**では2つではなく、3〜4つの形態が必要です。
- **日本語**では複数形の変化は1つだけで十分であり、連結された半角スペースも不自然になります。
- **アラビア語**では6つの形態が必要で、数値自体もその地域の数字表記に合わせる必要があります。
- **フランス語**では特定の約物の前にノーブレークスペースが必要ですが、`+ " "`による連結によってそれが失われます。

より本質的な問題は、文章が断片化されている点です。翻訳者は文脈のない`item`や`items`だけを見せられ、文全体の語順を入れ替える自由が奪われます。ICU MessageFormatは、文全体を1つの翻訳可能な文字列として保持し、翻訳者に分岐オペレータを提供することでこの問題を解決します。

## 単純な引数の埋め込み

最小単位は、波括弧で囲まれたプレースホルダーです。

```text
Hello, {name}!
```

フォーマット時に`{ name: "Alice" }`を渡すと、`Hello, Alice!`が出力されます。波括弧が唯一の特殊文字です。文字通りの波括弧を表示したい場合は、シングルクォートで囲みます（例: `'{'`）。

これが補間（インライン展開）の全機能であり、ICUの他の機能はすべてこの上に成り立っています。

## 複数形（plural）

`plural`は数値に基づいて適切な分岐を選択します。

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

把握しておくべき3つの要点があります。

- **`#`** は、ロケールに合わせてフォーマットされた`count`の値に置換されます。例えば`1234`は`en-US`では`1,234`になり、`ja-JP`では`1,234`になります。
- **`other`は必須です。** どのICU実装でも、`other`がない場合はエラーになるかバリデーションに失敗します。どのカテゴリにも一致しない場合のフォールバックとして機能します。
- **`=0`、`=1`などは厳密な値に一致し**、CLDRカテゴリよりも_先_に評価されます。これらは`one`の代用ではなく、「メッセージはありません」のような特別な文言に使用します。

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n`は、カテゴリの判定と`#`の置換を行う前に、数値から`n`を減算します。「アリスと他3人がいいねしました」といった表現に使用します。

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

`count: 4`の場合、`#`には`3`が描画されます。`offset`は非常に便利ですが、ランタイムによってサポート状況が異なるため、実環境での動作確認をおすすめします。

## 複数形カテゴリは言語によって異なる

ここが最も誤解されやすいポイントです。`zero`、`one`, `two`、`few`、`many`、`other`というカテゴリ名は、あらゆる言語で共通の箱ではありません。各言語は[CLDR複数形ルール](https://cldr.unicode.org/index/cldr-spec/plural-rules)で定義された_サブセット_を使用しており、これらは直感ではなく文法規則に基づいています。

| 言語         | タグ | 使用されるカテゴリ               | 総数 |
| ------------ | ---- | -------------------------------- | ---- |
| 日本語       | `ja` | other                            | 1    |
| 中国語       | `zh` | other                            | 1    |
| 英語         | `en` | one, other                       | 2    |
| ドイツ語     | `de` | one, other                       | 2    |
| フランス語   | `fr` | one, many, other                 | 3    |
| チェコ語     | `cs` | one, few, many, other            | 4    |
| ポーランド語 | `pl` | one, few, many, other            | 4    |
| ロシア語     | `ru` | one, few, many, other            | 4    |
| アラビア語   | `ar` | zero, one, two, few, many, other | 6    |
| ウェールズ語 | `cy` | zero, one, two, few, many, other | 6    |

注意すべき2つのポイントがあります。

- **`one`は「1」だけを意味するわけではありません。** ロシア語では、11で終わるものを除き、1、21、31、101など1で終わるすべての数値が`one`に該当します。フランス語では`0`も`one`に含まれます。
- **英語の原文にカテゴリを増やしても効果はありません。** 英語メッセージは`one`と`other`だけで完結しますが、ポーランド語への翻訳には4つの分岐が必要であり、その構造はポーランド語の文字列側で保持されるべきものです。すべての言語に単一のキー構造を強制するフォーマットでは問題が生じます。

追加のパッケージを導入することなく、ランタイムの実際の動作を確認できます。

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

モダンブラウザやNode.jsには標準で`Intl.PluralRules`にCLDRデータが組み込まれています。CLDR対応を謳うライブラリの多くは、内部でこのAPIを呼び出しています。

## select と selectordinal

`select`は、性別、ロール、ステータス、プランなど任意の文字列に基づいて分岐します。

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

キーは完全一致で比較され、ここでも`other`は必須です。言語によって文法構造に影響を与える値の種類が異なるため、列挙値によって文構造が変わる場合は常に`select`が適しています。

`selectordinal`は`plural`と同じ形式ですが、基数ではなく**序数（1st、2ndなど）**の規則を使用します。

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

英語は基数では2つのカテゴリしか使用しませんが、序数では4つのカテゴリ（1st、2nd、3rd、4th）を使用します。この非対称性があるため、2つのオペレータは明確に分離されています。

## 数値、日付、時刻のフォーマット

ICUは埋め込む値の書式設定も可能です。

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

現代的な形式は、ICU 60で導入された`::`プレフィックスを持つ**スケルトン（skeleton）**です。従来のキーワード指定よりもはるかに表現力が高くなっています。

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

エコシステムにおけるスケルトンのサポート状況は様々です。FormatJSはフルサポートしていますが、他のランタイムでは従来の`number, currency`や`date, long`しか認識しない場合があります。本番運用前に使用環境での対応状況をご確認ください。

## ネストと可読性のバランス

ICUは組み合わせが可能です。複数形の分岐の中にselectを含め、さらにその中に別の複数形を含めることもできます。

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

これはICUの典型的な例であると同時に、深いネストに対する代表的な戒めでもあります。2階層を超えると翻訳者は括弧のエラーを起こしやすくなり、TMSエディタの支援も難しくなります。ネストは最大2階層に留め、3階層目が必要な場合は文自体を2つに分割することをお勧めします。

## JavaScriptライブラリにおけるICU対応

| ライブラリ            | ICUサポート状況      | 実際に書くコード                                                          |
| --------------------- | -------------------- | ------------------------------------------------------------------------- |
| react-intl (FormatJS) | ネイティブ、完全対応 | スケルトンやリッチテキストタグを含むICU文字列                             |
| next-intl             | ネイティブ           | FormatJSの`intl-messageformat`を経由したICU文字列                         |
| i18next               | プラグインが必要     | `key_one` / `key_other`接尾辞と`{{name}}`。ICU対応には`i18next-icu`を使用 |
| vue-i18n              | 部分対応 / 独自仕様  | `{name}`の補間とパイプ区切りの複数形分岐                                  |
| Angular (`$localize`) | サブセット           | テンプレート内のICU `plural` / `select`。XLIFFへ抽出                      |

表を正しく解釈するための補足事項です。

- **i18nextのデフォルト構文はICUではありません**が、決して劣っているわけではありません。接尾辞キー（`item_one`、`item_few`）は`Intl.PluralRules`のカテゴリに対応しており、フラットなJSONで管理しやすいメリットがあります。ただし`select`や深いネスト分岐は標準外となるため、`i18next-icu`を併用するかコード側でロジックを組む必要があります。
- **vue-i18nのパイプ区切り複数形**は、デフォルトではCLDRカテゴリではなくロケールごとの独自関数に基づきます。実用上は機能しますが、複数形ルールがデータではなくアプリケーション設定側に保持されることになります。
- **FormatJSは事実上の標準**です。JavaScriptコミュニティで「ICU MessageFormat」と言う場合、大半はFormatJSが受け付ける仕様を指しています。
- **完全なICUサポートにはバンドルコストが伴います。** パーサーとスケルトンの処理により、約10KBの圧縮済みJavaScriptが追加されます。[なぜICUはJavaScript向けではないのか](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/why_icu_is_not_made_for_js.md)を参照してください。

## Intlayerのアプローチ

Intlayerは文字列ベースのDSLを採用していません。分岐オペレータはコンテンツ宣言ファイル内のTypeScript関数として提供されるため、構造全体が型安全になり、各ロケールは自身の文法に必要なカテゴリだけを柔軟に定義できます。

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      ja: plural({
        other: "{{count}}件の求人",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // 日本語ロケール → "5件の求人"
```

ICUの概念との対応は非常に明確です。

| ICUの記法                     | Intlayerでの表現                             |
| ----------------------------- | -------------------------------------------- |
| `{name}`                      | `insert("Hello {{name}}")` または自動認識    |
| `{count, plural, …}`          | `plural({ one, few, many, other })`          |
| `{value, select, …}`          | `select({ draft, published, fallback })`     |
| `select`の性別分岐            | `gender({ male, female, fallback })`         |
| `select`のブール分岐          | `cond({ true, false })`                      |
| 数値範囲（非CLDR）            | `enu({ "0": …, ">5": …, fallback: … })`      |
| `{n, number, ::currency/EUR}` | `useCurrency()(1234.5, { currency: "EUR" })` |

`plural`は内部でカテゴリ判定を`Intl.PluralRules`に委譲しているため、前述のCLDR表がそのまま適用されます。数値、日付、通貨、リストなどのフォーマット処理はメッセージ本体に直接埋め込むのではなく、[専用のフォーマッターフック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)を通じて分離して管理されます。

- [専用のフォーマッターフック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)

留意点：

- Intlayerはビルドステップを必要とします。コンパイラがビルド時にコンテンツ宣言を静的抽出します。実行時にプレーンなJSONを動的取得するモデルとは異なります。
- 現在のところ、`plural`の分岐内部に直接`t()`をネストすることはできません。`t()`の中に`plural`を配置する構造をとります。
- i18nextに比べるとエコシステムの歴史が浅く、TMS連携ツールの種類やコミュニティ上のQ&A数はこれから拡大していく段階です。

すでにICU文字列が多数存在するプロジェクトから移行する場合、[react-intl互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-intl.md)がそれらを直接解釈します（`plural`、`select`、`selectordinal`、`#`、従来の`number` / `date` / `time`）。スケルトンや`offset:`はこのリゾルバーの対象外となるため、移行時に該当箇所を確認してください。[i18nextアダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/i18next.md)は、接尾辞形式（`key_one`、`key_male`）を`Intl.PluralRules`と照合して解決します。

- [react-intl互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-intl.md)
- [i18nextアダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/i18next.md)

## よくある間違い

- **複数形ロジックをJSの三項演算子で書くこと。** `count === 1 ? a : b`という書き方は、上の表にある10言語のうち8言語で誤った結果を生みます。三項演算子がコードに埋め込まれてしまうと、翻訳者側で修正する手段がありません。
- **翻訳済みパーツを文字列結合すること。** 語順、修飾関係、記号周りの余白はロケールごとに異なります。文は常に1つの単位として完結させてください。
- **`other`を省略すること。** 仕様上の必須要件であり、単なる慣習ではありません。大半のパーサーはエラーで停止し、それ以外のパーサーも空白しか表示しません。
- **全言語で同一のカテゴリが必要と思い込むこと。** 英語の原文が`one`と`other`の2つだからといって、ポーランド語も2つで済むわけではありません。各言語が必要な分岐を宣言できるようにしてください。[ロケール別コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)を参照してください。
- **`one`と書くべきところで`=1`を使うこと。** `=1`は数値の「1」そのものにしか一致しません。ロシア語の21には`one`が必要ですが、`=1`では決してヒットしません。
- **`#`をpluralの外に配置すること。** `#`が特別な意味を持つのは`plural`や`selectordinal`の内部のみです。それ以外の場所ではただの記号として扱われます。
- **`#`がすでにロケール整形済みであることを忘れること。** 区切り文字のない生の数値が必要な場合は、引数名を直接指定してインライン展開してください。

## 関連リソース

- [なぜICUはJavaScript向けではないのか](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/why_icu_is_not_made_for_js.md)
- [Intlayerの複数形コンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)
- [Selectベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/select.md)
- [挿入プレースホルダー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)
- [i18nライブラリのベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/react-i18next_vs_react-intl_vs_intlayer.md)
- [国際化（i18n）とは？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/what_is_internationalization.md)
