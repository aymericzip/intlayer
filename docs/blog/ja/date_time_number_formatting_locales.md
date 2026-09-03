---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Intl を使ってロケールごとに日付と数値をフォーマットする"
description: おそらくフォーマット専用ライブラリは不要です。Intl が言語ごとの日付、数値、通貨、リストをどう処理するか、キャッシュのオーバーヘッド、本番限定のタイムゾーンバグを解説します。
keywords:
  - ロケール別日付フォーマット
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - 通貨フォーマット ロケール
  - 相対時間フォーマット
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Intl を使ってロケールごとに日付と数値をフォーマットする

文言の翻訳は、国際化（i18n）の目に見える半分にすぎません。バグ報告の大半を生み出すもう半分はフォーマットです。ドイツ人ユーザーに `1.234,56` ではなく `1,234.56` と表示されたり、日本人ユーザーが `08/02/2026` を8月と誤読したり、サーバーとクライアントで日付の文字列が食い違って React のハイドレーションエラーで画面が真っ白になったりします。

これらを解決するために外部ライブラリは必要ありません。ターゲットとするすべてのモダンランタイムに `Intl` が標準搭載されています。

## 目次

<TOC/>

## まず自作の日付ヘルパー関数を削除する

ほぼすべてのコードベースに、多言語対応を意識する前に書かれた `formatDate` が存在します。表示順や区切り文字、英語の月名が決め打ちされています。

```ts
// 削除すべきコード
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` はこれらを完全に代替し、すべてのロケールで正しく動作します。

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

数値も同様です。`toFixed(2)` はどこでも `1234.56` を出力しますが、これはヨーロッパの大部分の地域で不適切です。

## `Intl` がカバーする範囲

| API                       | 用途                                                   |
| :------------------------ | :----------------------------------------------------- |
| `Intl.DateTimeFormat`     | 日付と時刻（`dateStyle` / `timeStyle` プリセット対応） |
| `Intl.NumberFormat`       | 小数、通貨、パーセント、単位、コンパクト表記           |
| `Intl.RelativeTimeFormat` | "3日前"、"2時間後" などの相対時間表現                  |
| `Intl.ListFormat`         | "A、B、およびC" といった列挙の結合                     |
| `Intl.PluralRules`        | 数値に応じた複数形ルールの判定                         |
| `Intl.Collator`           | 言語規則に基づく正確な文字列の並べ替え                 |

特に忘れられがちなのが `Intl.Collator` です。文字列に対する通常の `array.sort()` は Unicode コードポイント順でソートするため、アクセント記号付き文字が `z` の後ろに回ったり、スウェーデン語の `ö` が不自然な位置に来たりします。ユーザーに見せるリストを並べ替える際は、必ずコレーターを使用してください。

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("ja").compare);
// ["apple", "édouard", "zebra"]
```

## 個別のオプション指定よりもプリセットを優先する

`dateStyle` と `timeStyle` を使えば、ロケールに応じた正しい順序と区切り文字が自動的に決定されます。`year`、`month`、`day` を個別指定すると不要な制御が発生し、国ごとの慣習の違いを見落として CLDR の正確な定義を誤った推測で上書きしてしまいます。

```ts
// ロケールに応じた最適なフォーマット
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// 手動指定によって他国で不自然になる例
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

個別指定を行うのは、狭いテーブル列に収めるために固定幅が絶対に必要とされるデザイン要件がある場合だけに留めてください。

## フォーマッターのインスタンス生成コストに注意する

パフォーマンス面で極めて重要な点です。`Intl.NumberFormat` のインスタンス生成時にはロケールデータの読み込みが発生するため、その後の `.format()` 呼び出しよりもはるかに大きな処理コストがかかります。これをレンダリング内や1000行のループの中で毎回実行すると、明確な遅延となって現れます。

```ts
// 行ごとにフォーマッターを再生成（遅い）
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// 1度だけ生成して再利用（高速）
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` や `toLocaleString()` も内部で同じ処理を行っています。単一の値の変換には手軽ですが、リストの処理には向きません。

ロケールとオプションの組み合わせをキーにしてキャッシュしましょう。

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## 本番環境だけで発生するタイムゾーンバグ

多くの開発者が頭を抱えてきた問題です。SSR 時にサーバーが日付文字列をレンダリングし、ブラウザでハイドレーションを行う際、出力結果の不一致により React が Hydration Mismatch エラーを出して停止します。

原因は、`Intl.DateTimeFormat` にタイムゾーンを明示しないと実行環境のシステム設定が使われるためです。本番サーバーは通常 UTC で稼働していますが、開発者の PC はローカルタイムゾーン（JST など）です。そのため手元では再現せず、本番環境でのみ障害が発生します。

```ts
// サーバー（UTC）とブラウザ（JST）で結果が食い違い、ハイドレーション失敗
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// タイムゾーンを固定すれば完全に一致
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

現実的な3つの解決策：

- **サーバー側でタイムゾーンを固定**し、明示的に渡す。安全かつ確実ですが、全員に UTC が表示されます。
- **クライアントサイドのみでレンダリング**し、サーバーではプレースホルダーを表示する。ユーザーに正確な時刻を見せられますが、初期表示でチラつきが発生します。
- **ユーザーのタイムゾーンを保存**し、サーバーとクライアントの双方に渡す。最善のユーザー体験が得られますが、設計の手間が増えます。

どの方法を選ぶにせよ、サーバーとクライアントの両方で描画される日付には必ず `timeZone` を明示してください。タイムゾーンの指定がない日付は、2つの異なる値を持つことになります。

## 通貨に必要なのはロケールではなく通貨コード

ロケールと通貨はまったく別の概念です。`fr-FR` だからといって自動的にユーロになるわけではありません。フランス在住のユーザーが米ドル建ての請求書を見ることもあります。

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

ロケールは区切り文字や記号の位置を制御します。通貨そのものはアプリケーションのデータから指定します。ロケールから通貨を勝手に推測すると、会計上の重大なバグにつながります。

また、`currencyDisplay` も有用です。複数のドル通貨が混在するインターフェースでは、`"code"` を指定することで米ドル、カナダドル、オーストラリアドルの誤認を防ぐことができます。

## 絶対日時よりも相対時間の方が伝わりやすい

最近の出来事であれば、正確なタイムスタンプよりも「2時間前」の方が直感的に伝わります。`Intl.RelativeTimeFormat` はこれを適切に多言語化します。

```ts
new Intl.RelativeTimeFormat("ja", { numeric: "auto" }).format(-1, "day");
// "昨日"
```

`numeric: "auto"` を指定することで、「1日前」ではなく「昨日」と自然に出力されます。

## Intlayer が提供するラッパー

Intlayer はこれらの API をキャッシュ付きヘルパーとして提供しているため、手動でキャッシュ用 Map を管理する必要がなく、アクティブなロケールを自動適用してくれます。

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1,234.5"
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2時間前"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5キロメートル"
compact(1200); // "1.2千"
list(["りんご", "バナナ", "オレンジ"]); // "りんご、バナナ、オレンジ"
```

`date()` はプリセット（`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`）も受け付けます。React や Vue 向けのフックやコンポーザブルも用意されており、コンテキストから自動的に言語を解決します。

プラットフォーム標準の `Intl` をベースにしたキャッシュ層とロケール補完機能であるため、内部のフォーマット動作は `Intl` そのものです。詳細は [フォーマッタードキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md) を確認してください。

## よくある失敗

- **ロケール未指定の `toLocaleDateString()`。** 実行環境のデフォルトに依存し、サーバー側ではコンテナ設定に引きずられます。
- **ループ内での都度フォーマット生成。** インスタンス生成がボトルネックになります。1度生成して再利用してください。
- **サーバー・クライアント共通日付での `timeZone` 未指定。** ローカルで再現しないハイドレーションエラーの原因になります。
- **ロケールから通貨を推測する。** `fr-FR` はユーロを意味しません。
- **画面表示テキストに対する通常の `sort()`。** `Intl.Collator` を使ってください。
- **月名や曜日名のハードコード。** 全言語のデータがすでに CLDR に揃っています。
- **相対時間での `numeric: "always"` の放置。** 「昨日」という表現がある言語でも「1日前」と無機質に出力されてしまいます。

## さらに学ぶ

- [フォーマッターとロケールユーティリティ: `number`、`currency`、`date`、`relativeTime`、`list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)
- [設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [主要フレームワーク間のベンチマークレポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)
- [react-intl互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/react-intl.md)
- [ICUメッセージフォーマット: 複数形、条件分岐、数値スケルトン](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/icu_message_format.md)
- [翻訳のテスト戦略（フォーマッターと複数形カバレッジを含む）](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/i18n_testing_strategies.md)
- [国際化（i18n）がカバーする領域の本質](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/what_is_internationalization.md)
