---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: フォーマッター
description: 数字、パーセンテージ、通貨、日付、相対時間、単位、コンパクト表記のためのIntlベースのロケール対応フォーマットユーティリティ。キャッシュされたIntlヘルパーを含む。
keywords:
  - フォーマッター
  - Intl
  - 数字
  - 通貨
  - パーセンテージ
  - 日付
  - 相対時間
  - 単位
  - コンパクト
  - リスト
  - 国際化
slugs:
  - doc
  - formatters
history:
  - version: 5.8.0
    date: 2025-08-20
    changes: Vueフォーマッターを追加
  - version: 5.8.0
    date: 2025-08-18
    changes: フォーマッターのドキュメントを追加
  - version: 5.8.0
    date: 2025-08-20
    changes: Vueフォーマッターを追加
  - version: 5.8.0
    date: 2025-08-18
    changes: フォーマッターのドキュメントを追加
  - version: 5.8.0
    date: 2025-08-20
    changes: リストフォーマッターのドキュメントを追加
  - version: 5.8.0
    date: 2025-08-20
    changes: 追加のIntlユーティリティ（DisplayNames、Collator、PluralRules）を追加
  - version: 5.8.0
    date: 2025-08-20
    changes: ロケールユーティリティ（getLocaleName、getLocaleLang、getLocaleFromPathなど）を追加
  - version: 5.8.0
    date: 2025-08-20
    changes: コンテンツ処理ユーティリティ（getContent、getTranslation、getIntlayerなど）を追加
---

# Intlayer フォーマッター

## 概要

Intlayerは、ネイティブの`Intl` APIの上に構築された軽量なヘルパー群と、重いフォーマッターを繰り返し構築することを避けるためのキャッシュされた`Intl`ラッパーを提供します。これらのユーティリティは完全にロケール対応しており、メインの`intlayer`パッケージから利用可能です。

### インポート

```ts
import {
  Intl,
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

Reactを使用している場合は、フックも利用可能です。詳細は`react-intlayer/format`を参照してください。

## キャッシュされたIntl

エクスポートされる`Intl`は、グローバルな`Intl`の薄いキャッシュラッパーです。`NumberFormat`、`DateTimeFormat`、`RelativeTimeFormat`、`ListFormat`、`DisplayNames`、`Collator`、および`PluralRules`のインスタンスをメモ化し、同じフォーマッターを繰り返し再構築するのを防ぎます。

フォーマッターの構築は比較的コストが高いため、このキャッシュは動作を変えずにパフォーマンスを向上させます。ラッパーはネイティブの`Intl`と同じAPIを公開しているため、使用方法は同一です。

- キャッシュはプロセス単位で行われ、呼び出し元には透過的です。

> 環境に`Intl.DisplayNames`が存在しない場合、開発者向けの警告が一度だけ表示されます（ポリフィルの検討を推奨）。

例：

```ts
import { Intl } from "intlayer";

// 数値のフォーマット
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// 言語、地域などの表示名
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// ソート用の照合
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0（等しい）

// 複数形ルール
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## 追加のIntlユーティリティ

フォーマッターヘルパーに加えて、キャッシュされたIntlラッパーを直接使用して他のIntl機能も利用できます。

### `Intl.DisplayNames`

言語、地域、通貨、スクリプトのローカライズされた名前の取得：

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

ロケールに対応した文字列の比較とソートのために：

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

### `Intl.PluralRules`

異なるロケールでの複数形の判定のために：

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## ロケールユーティリティ

### `getLocaleName(displayLocale, targetLocale?)`

あるロケールの名前を別のロケールで取得します：

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: 名前を取得する対象のロケール
- **targetLocale**: 名前を表示するロケール（省略時は displayLocale と同じ）

### `getLocaleLang(locale?)`

ロケール文字列から言語コードを抽出します：

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: 言語コードを抽出する対象のロケール（省略時は現在のロケール）

### `getLocaleFromPath(inputUrl)`

URLまたはパス名からロケール部分を抽出します：

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en"（デフォルトのロケール）
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: 処理する完全なURL文字列またはパス名
- **returns**: 検出されたロケール、またはロケールが見つからない場合はデフォルトのロケール

### `getPathWithoutLocale(inputUrl, locales?)`

URLまたはパス名からロケールセグメントを削除します：

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: 処理する完全なURL文字列またはパス名
- **locales**: サポートされているロケールのオプション配列（デフォルトは設定されたロケール）
- **returns**: ロケール部分を除いたURL

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

現在のロケールに対応したローカライズされたURLを生成します：

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: ローカライズする元のURL
- **currentLocale**: 現在のロケール
- **locales**: サポートされているロケールのオプション配列（デフォルトは設定されたロケール）
- **defaultLocale**: オプションのデフォルトロケール（設定されたデフォルトロケールが使用されます）
- **prefixDefault**: デフォルトロケールにプレフィックスを付けるかどうか（設定された値が使用されます）

### `getHTMLTextDir(locale?)`

ロケールに対するテキストの方向を返します：

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: テキスト方向を取得するロケール（デフォルトは現在のロケール）
- **returns**: `"ltr"`、`"rtl"`、または `"auto"`

## コンテンツ処理ユーティリティ

### `getContent(node, nodeProps, locale?)`

すべての利用可能なプラグイン（翻訳、列挙、挿入など）を使ってコンテンツノードを変換します：

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: 変換するコンテンツノード
- **nodeProps**: 変換コンテキストのプロパティ
- **locale**: オプションのロケール（デフォルトは設定されたデフォルトロケール）

### `getTranslation(languageContent, locale?, fallback?)`

言語コンテンツオブジェクトから特定のロケールのコンテンツを抽出します：

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    de: "Hallo",
  },
  "fr",
  true
); // "Bonjour"
```

- **languageContent**: ロケールをコンテンツにマッピングしたオブジェクト
- **locale**: 対象のロケール（デフォルトは設定されたデフォルトロケール）
- **fallback**: デフォルトロケールにフォールバックするかどうか（デフォルトは true）

### `getIntlayer(dictionaryKey, locale?, plugins?)`

キーによって辞書からコンテンツを取得し変換します：

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: 取得する辞書のキー
- **locale**: オプションのロケール（デフォルトは設定されたデフォルトロケール）
- **plugins**: オプションのカスタム変換プラグインの配列

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

遠隔の辞書から非同期にコンテンツを取得します：

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**: 取得する辞書のキー
- **locale**: オプションのロケール（デフォルトは設定されたデフォルトロケール）
- **plugins**: オプションのカスタム変換プラグインの配列

## フォーマッター

以下のすべてのヘルパーは `intlayer` からエクスポートされています。

### `number(value, options?)`

数値をロケールに応じた区切りと小数点でフォーマットします。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

例:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789"（en-USの場合）
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

数値をパーセンテージ文字列としてフォーマットします。

動作: 1より大きい値は全体のパーセンテージとして解釈され正規化されます（例：`25` → `25%`、`0.25` → `25%`）。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

例:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

値をローカライズされた通貨形式でフォーマットします。デフォルトは小数点以下2桁の `USD` です。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 共通フィールド: `currency`（例: `"EUR"`）、`currencyDisplay`（`"symbol" | "code" | "name"`）

例:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

`Intl.DateTimeFormat` を使って日付/時刻の値をフォーマットします。

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` または以下のプリセットのいずれか:
  - プリセット: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

例:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // 例: "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

`Intl.RelativeTimeFormat` を使って、2つの時点間の相対時間をフォーマットします。

- 最初の引数に "now" を渡し、2番目に対象の日時を渡すと自然な表現が得られます。
- **from**: `Date | string | number`
- **to**: `Date | string | number` （デフォルトは `new Date()`）
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - デフォルトの `unit` は `"second"` です。

例:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "3日後"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2時間前"
```

### `units(value, options?)`

`Intl.NumberFormat` の `style: 'unit'` を使って数値をローカライズされた単位文字列としてフォーマットします。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 共通フィールド: `unit`（例: `"kilometer"`、`"byte"`）、`unitDisplay`（`"short" | "narrow" | "long"`）
  - デフォルト: `unit: 'day'`、`unitDisplay: 'short'`、`useGrouping: false`

例:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"（ロケール依存）
```

### `compact(value, options?)`

数値をコンパクト表記（例: `1.2K`、`1M`）でフォーマットします。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`（内部で `notation: 'compact'` を使用）

例:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

`Intl.ListFormat`を使用して、値の配列をローカライズされたリスト文字列にフォーマットします。

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - 共通フィールド: `type`（`"conjunction" | "disjunction" | "unit"`）、`style`（`"long" | "short" | "narrow"`）
  - デフォルト: `type: 'conjunction'`、`style: 'long'`

例:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## 注意事項

- すべてのヘルパーは `string` 入力を受け入れます。内部的に数値や日付に変換されます。
- ロケールは指定されない場合、設定された `internationalization.defaultLocale` がデフォルトになります。
- これらのユーティリティは薄いラッパーです。高度なフォーマットが必要な場合は、標準の `Intl` オプションを直接渡してください。

## エントリーポイントと再エクスポート（`@index.ts`）

フォーマッターはコアパッケージに存在し、ランタイム間でのインポートを使いやすくするために上位パッケージから再エクスポートされています。

例:

```ts
// アプリコード（推奨）
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

### React

クライアントコンポーネント:

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/format";
// または Next.js アプリの場合
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/client/format";

const MyComponent = () => {
  const number = useNumber();
  const currency = useCurrency();
  const date = useDate();
  const percentage = usePercentage();
  const compact = useCompact();
  const list = useList();
  const relativeTime = useRelativeTime();
  const unit = useUnit();

  return (
    <div>
      <p>{number(123456.789)}</p>
      <p>{currency(1234.5, { currency: "EUR" })}</p>
      <p>{date(new Date(), "short")}</p>
      <p>{percentage(0.25)}</p>
      <p>{compact(1200)}</p>
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date() + 1000)}</p>
      <p>{unit(123456.789, { unit: "kilometer" })}</p>
    </div>
  );
};
```

サーバーコンポーネント（または React Server ランタイム）:

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "intlayer/server/format";
// または Next.js アプリの場合
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/server/format";
```

> これらのフックは `IntlayerProvider` または `IntlayerServerProvider` からロケールを考慮します

### Vue

クライアントコンポーネント:

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";
```

> これらのコンポーザブルは、注入された `IntlayerProvider` からロケールを考慮します
