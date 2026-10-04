---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: なぜICU MessageFormatはJavaScript向けではないのか
description: "ICU MessageFormatはJavaやC++向けに設計されました。ブラウザで完全な互換性を提供するには約10KBのパーサーコードが必要です。そのコストの理由と代替手段を解説します。"
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - icu バンドルサイズ
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - i18n 複数形
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# なぜICU MessageFormatはJavaScript向けではないのか

ICU MessageFormatは優れた標準仕様です。包括的で、翻訳者にも広く認知されており、大半の翻訳管理システム（TMS）で扱うことができます。問題は、それが作られた実行環境にあります。ICUはC++やJavaの世界から生まれました。そこでは完全なメッセージパーサーやフォーマッターのコストは、プログラム全体から見れば無視できるほど小さなものでした。しかしブラウザバンドルにおいては、そのコストがページを読み込むたびに発生します。

本記事では、ICUの歴史的背景、複数形の構文が肥大化しやすい理由、そして完全な互換性を維持することがJavaScript i18nライブラリを重くする原因について考察します。構文そのものの確認が必要な場合は、まず[ICU Message Formatリファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/icu_message_format.md)をご覧ください。

- [ICU Message Formatリファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/icu_message_format.md)

<TOC/>

## IBMからUnicode Consortiumへ

ICUは _International Components for Unicode_ の略称です。そのメッセージ構文はJavaから始まりました。AppleとIBMの合弁会社であったTaligentが、JDK 1.1（1997年）の国際化クラス群（`java.text.MessageFormat`を含む）を開発しました。IBMはこれをICU4Jとして継続開発し、C/C++向けに移植したICU4Cを1999年にオープンソース化しました。2016年には、ICUが依存するロケールデータ基盤CLDRを管理するUnicode Consortiumの傘下へと移行しました。

### 元々の使用用途

主なターゲットはサーバーおよびデスクトップソフトウェアでした。具体的にはJavaエンタープライズアプリケーションやIBM製品、そして後のオペレーティングシステムなどです。メッセージは`ResourceBundle`経由で読み込まれるJavaの`.properties`ファイルや、ICU独自のリソースバンドル形式（C/C++用）に記述されていました。

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

当初のJDKバージョンには`plural`が存在しませんでした。数値範囲を指定する`choice`（`{0,choice,0#no files|1#one file|1<{0} files}`）が使われていましたが、これは英語のような複数形を持つ言語にしか適合しませんでした。ICUは2008年（ICU 4.0）にCLDRルールに基づく`plural`を導入し、2010年（ICU 4.4）に`select`を追加しました。

### `.po`との相違点

ICUはgettextと混同されがちですが、これらは異なる文脈から生まれています。`.po`ファイルはGNU gettext（C、Linux、のちにPHPやPython）に由来します。`.po`のエントリはシンプルな`msgid`と`msgstr`のペアで構成され、複数形の判定はファイルヘッダー内のC言語式（`Plural-Forms: nplurals=2; plural=(n > 1);`）で行われます。メッセージ内部での条件分岐はありません。一方ICUは文字列の中に直接分岐ロジックを埋め込むため、1つのメッセージ内で`plural`、`select`、数値フォーマットを複合的に扱うことができます。

### 現在ICUが稼働している環境

ICU4CはAndroid、iOS、macOS、Windows、Node.js、そしてChromeやFirefoxのJavaScriptエンジンに組み込まれています。ブラウザの標準`Intl` APIの多くはICUを基盤としています。つまり、ブラウザ自身がすでにICUの複数形ルールや数値、日付フォーマット機能を内蔵しているのです。内蔵されていないのはメッセージパーサーです。`Intl.MessageFormat`は現在もTC39プロポーザルの初期段階であり、新しいMessageFormat 2構文に基づいて設計されているため、ICU MessageFormat 1との後方互換性はありません。

この歴史が設計上の選択を物語っています。

- **サーバーおよびデスクトップ環境を想定している。** 実行時にメッセージ文字列をパースするコストは極めて低く、ライブラリはOSや実行環境に一度インストールされるだけで、各訪問者がダウンロードする必要がありません。
- **文字列の中にDSLを埋め込む設計。** 分岐、数値フォーマット、日付、ネストがすべて1つの構文に収まっているため、翻訳者がコードに触れずに編集できます。
- **完全性の追求。** 翻訳者が求めるあらゆる文法ケースに対応する専用オペレーターが用意されています。

これらは決して設計ミスではありません。ただ、ブラウザという特殊な実行環境を前提としていなかっただけです。

## 複数形構文の冗長性

ICUで最もよく使われる構文は、最も記述量が多く複雑なものでもあります。ゼロのケースを含むカウントの記述は以下のようになります。

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

引数名、キーワード`plural`、分岐ごとのケースラベル、ネストされた波括弧、そして複数形ブロック内でのみ動作する特殊トークン`#`が必要です。さらに主語の性別による分岐を加えると、ネストは一段と深くなります。

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

全15行中9行が純粋な構文構造のためだけに消費されます。ポーランド語ではこれら3つの性別ごとに4つの複数形分岐が必要となるため、翻訳後の文字列は波括弧が密集したブロックと化し、閉じ括弧が1つ抜けただけでメッセージ全体が破損します（しかも実行時まで検知できないケースも珍しくありません）。

JavaScriptの世界では、これと同じ構造を純粋なデータとして表現できます。キーが複数形カテゴリに対応したオブジェクトとし、TypeScriptの型システムとエディタで検証可能にすれば、ファイルと値の間にパーサーを挟む必要がなくなります。

## 完全性がもたらすオーバーヘッド

ICUがカバーする範囲は非常に広大です。

- 完全一致（`=0`）およびオフセット（`offset:`）に対応した`plural`
- 独自のCLDR序数テーブルを持つ`selectordinal`
- 任意の階層までネスト可能な`select`
- 従来形式（`number, currency`）およびスケルトン（`::currency/EUR compact-short`）形式の`number`、`date`、`time`引数
- エスケープや引用符のルール（`'{'`, `''`）
- 一部の実装がサポートするリッチテキストタグ（`<b>…</b>`）

ICUとの1対1の完全互換を掲げるライブラリは、これらすべてをバンドルに同梱しなければなりません。ビルド時点ではどの構文が実際に使用されるかを予測できないためです。実質的に以下が必要となります。

1. 文字列をASTに変換し、波括弧の構文エラーを捕捉する**パーサー**
2. 数値や日付の`::`構文を解釈する、独自の小さな構文解析器である**スケルトンパーサー**
3. ASTを走査し、各ノードを`Intl.PluralRules`、`Intl.NumberFormat`、`Intl.DateTimeFormat`へ結びつける**フォーマッター**

3つ目の処理は軽量です。現代のJavaScriptには`Intl`を通じてCLDRロジックがあらかじめ備わっているからです。問題は前の2つであり、文字列構文を読み取るためだけに存在しています。`react-intl`や`next-intl`の基盤となっているFormatJSの`intl-messageformat`では、これだけで**約10KBの圧縮済みJavaScript**が、自分たちの翻訳メッセージが届く前にすべてのユーザーへ送信されます。

ほとんどのWebアプリケーションで実際に使われるのは、`{name}`の変数展開と少数の`plural`ブロック程度です。それでもスケルトン、序数、オフセットに対応したフルセットのパーサーがダウンロードされます。実行時にパースされる文字列からは、バンドラーが不要なコードを安全に削除できないからです。

## next-intlも直面した同じ課題

これは机上の空論ではありません。最も普及しているICUベースのライブラリの1つである`next-intl`も、同じ結論に達しました。バージョン4.8（2026年1月）において、ビルド時にICUメッセージを解析して軽量なASTへ変換し、実行時のパーサーを小さなエバリュエーターで置き換える実験的な`precompile`オプションが追加されました。この設定を有効にすることで、**約9KBの圧縮済みJavaScriptを削減できる**と報告されています。

しかしこのトレードオフは、文字列ベースのアプローチが持つ限界を示しています。事前コンパイルを行うと生のICU文字列が実行時に存在しなくなるため、`t.raw`が機能しなくなります。ブラウザでのパースを中止した時点で、配信しているのは実質的にICUそのものではなくなります。コンパイル済みの表現を配信しているのであり、文字列構文は単なる執筆時のフォーマットに過ぎなくなります。

そうであれば、当然の疑問が浮かびます。ブラウザがその文字列を直接読まないのであれば、なぜ開発者や翻訳者はわざわざ複雑な文字列構文を書かなければならないのでしょうか。

## JavaScriptネイティブなアプローチ

JavaScriptはすでに難解な部分をネイティブに解決しています。`Intl.PluralRules`はポーランド語に4つの基数カテゴリがあり、英語に4つの序数カテゴリがあることを知っています。`Intl.NumberFormat`や`Intl.DateTimeFormat`は通貨、単位、コンパクト表記、暦法を正確に処理します。残る作業は適切な分岐を選び値を埋め込むことだけであり、データ構造として表現されていればわずか数行のコードで完了します。

これこそがIntlayerが採用しているモデルです。分岐処理は型付けされたコンテンツ宣言内の関数として定義され、各ロケールはその言語の文法に必要なカテゴリのみを記述します。

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      ja: plural({
        other: "{{count}}件の未読メッセージ",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // ポーランド語ロケール → "5 nieprzeczytanych wiadomości"
```

ICUと比較した場合の利点：

- **バンドル内にパーサーが不要。** ブラウザに到達した時点で、構造はすでにJavaScriptオブジェクトになっています。`plural`はブラウザ標準の`Intl.PluralRules`を使用してキーを選択します。
- **エラーをビルド時に検知。** 分岐の不足やプロパティのタイポはTypeScriptの型エラーとして検出され、本番環境での不具合を未然に防ぎます。
- **フォーマット処理をメッセージから分離。** 数値、日付、通貨は`Intl`を直接ラップする[フォーマッターフック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)を通じて処理されるため、スケルトンパーサーをロードする必要がありません。
- **使わない機能のコストはゼロ。** メッセージ内で`gender`が使われていなければ、バンドラーがTree-shakingによって完全に除去します。

- [フォーマッターフック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)

もちろん考慮すべき点もあります。ビルドステップが必須になること、コンテンツ定義が平文テキストではなくコードになること、そしてICU構文を前提とした一部のTMSツールではTypeScriptファイルを直接扱えない場合があることです。

## ICUが適しているケース

以下の状況においては、依然としてICUが適した選択肢となります。

- **翻訳ワークフローがICUを中心に構築されている場合。** 多くのTMSツールがICU文字列のインポート・エクスポートに対応しており、翻訳者もこの構文に習熟しています。
- **複数のプラットフォームでメッセージを共有する場合。** iOSアプリ、Androidアプリ、Webアプリで同一の翻訳カタログを共有する場合、単一の標準形式を維持することは強力なメリットです。
- **すでに大量のICUメッセージ資産が存在する場合。** 何千もの既存メッセージを書き直す作業は、それ単体では費用対効果に見合わないことがあります。

最後のケースにおいても、全面的な書き直しと重いパーサーの維持の二者択一を迫られるわけではありません。Intlayerの[react-intl互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-intl.md)は既存のICU文字列（`plural`、`select`、`selectordinal`、`#`、従来の`number`/`date`/`time`）を読み取ることができるため、段階的に移行しながら、古いメッセージが必要とする箇所のみにICUのオーバーヘッドを限定することが可能です。

- [react-intl互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-intl.md)

## まとめ

ICU MessageFormatは本質的な課題を解決しました。文法規則の管理はアプリケーションコード内の`if (count === 1)`ではなく、翻訳者の手元にあるべきだという点です。文字列DSLのパースコストがゼロに近い環境において、これは理想的な解答でした。しかしWebブラウザにおいては、完全互換を達成するために大半のアプリが使わないパーサーコードを配信することになり、ICUベースのライブラリ自身も事前コンパイルを採用せざるを得なくなっています。

JavaScriptには`Intl`を通じてCLDRのルールがすでに整っています。モダンなi18nフォーマットに求められているのは条件分岐のロジック構造であり、それは型付けされたデータとして極めて自然に表現できます。

## 関連リンク

- [ICU Message Format：構文、複数形、select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/icu_message_format.md)
- [Intlayerにおける複数形コンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/plurial.md)
- [selectベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/select.md)
- [i18nライブラリ ベンチマーク比較](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)
- [next-intlは時代遅れなのか？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/is_next-intl_outdated.md)
