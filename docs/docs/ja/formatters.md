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
    changes: "Vueフォーマッターを追加"
  - version: 5.8.0
    date: 2025-08-18
    changes: "フォーマッターのドキュメントを追加"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Vueフォーマッターを追加"
  - version: 5.8.0
    date: 2025-08-18
    changes: "フォーマッターのドキュメントを追加"
  - version: 5.8.0
    date: 2025-08-20
    changes: "リストフォーマッターのドキュメントを追加"
  - version: 5.8.0
    date: 2025-08-20
    changes: "追加のIntlユーティリティ（DisplayNames、Collator、PluralRules）を追加"
  - version: 5.8.0
    date: 2025-08-20
    changes: "ロケールユーティリティ（getLocaleName、getLocaleLang、getLocaleFromPathなど）を追加"
  - version: 5.8.0
    date: 2025-08-20
    changes: "コンテンツ処理ユーティリティ（getContent、getTranslation、getIntlayerなど）を追加"
author: aymericzip
---

# Intlayer フォーマッター

## 概要

Intlayerは、ネイティブの`Intl` APIの上に構築された軽量なヘルパー群と、重いフォーマッターを繰り返し構築することを避けるためのキャッシュされた`Intl`ラッパーを提供します。これらのユーティリティは完全にロケール対応しており、メインの`intlayer`パッケージから利用可能です。

## キャッシュされたIntl

エクスポートされる`Intl`は、グローバルな`Intl`の薄いキャッシュラッパーです。`NumberFormat`、`DateTimeFormat`、`RelativeTimeFormat`、`ListFormat`、`DisplayNames`、`Collator`、および`PluralRules`のインスタンスをメモ化し、同じフォーマッターを繰り返し再構築するのを防ぎます。

> 環境に`Intl.DisplayNames`が存在しない場合、開発者向けの警告が一度だけ表示されます（ポリフィルの検討を推奨）。

例：

## ロケールユーティリティ

### `getLocaleLang(locale?)`

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

### `getLocaleFromPath(inputUrl)`

URLまたはパス名からロケール部分を抽出します：

- **inputUrl**: 処理する完全なURL文字列またはパス名
- **returns**: 検出されたロケール、またはロケールが見つからない場合はデフォルトのロケール

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

### `getHTMLTextDir(locale?)`

ロケールに対するテキストの方向を返します：

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## コンテンツ処理ユーティリティ

### `getContent(node, nodeProps, locale?)`

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

### `getTranslation(languageContent, locale?, fallback?)`

言語コンテンツオブジェクトから特定のロケールのコンテンツを抽出します：

- **languageContent**: ロケールをコンテンツにマッピングしたオブジェクト
- **locale**: 対象のロケール（デフォルトは設定されたデフォルトロケール）
- **fallback**: デフォルトロケールにフォールバックするかどうか（デフォルトは true）

### `getIntlayer(dictionaryKey, locale?, plugins?)`

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

遠隔の辞書から非同期にコンテンツを取得します：

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

## フォーマッター

以下のすべてのヘルパーは `intlayer` からエクスポートされています。

### `percentage(value, options?)`

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### フォーマッター関数

#### `number(value, options?)`

ロケール対応のグループ化と小数点を使用して数値をフォーマットします。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

数値をパーセンテージ文字列としてフォーマットします。1より大きい値は正規化されます（例：`25` → `25%`、`0.25` → `25%`）。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

値をローカライズされた通貨としてフォーマットします。デフォルトは `USD` です。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 一般的: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

日時の値をフォーマットします。

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` またはプリセット: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // 例: "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

2つの時刻間の相対時間をフォーマットします。

- **from**: `Date | string | number`
- **to**: `Date | string | number` (デフォルトは `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "3日後"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2時間前"
```

#### `units(value, options?)`

数値を単位付きでフォーマットします。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 一般的: `unit` (例: `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

コンパクト記法を使用して数値をフォーマットします。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

配列をローカライズされたリスト文字列にフォーマットします。

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - 共通: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## キャッシュされた Intl

`intlayer` からエクスポートされた `Intl` は、グローバル `Intl` のキャッシュされたラッパーです。フォーマッター インスタンス（`NumberFormat`、`DateTimeFormat` など）をメモ化して、繰り返しの構築を避け、パフォーマンスを向上させます。

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
collator.compare("é", "e"); // 0 (等しい)

// 複数形ルール
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### 追加の Intl 機能

#### `Intl.DisplayNames`

言語、地域、通貨、スクリプトのローカライズされた名前の場合:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

ロケール対応の文字列比較とソート:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

#### `Intl.PluralRules`

異なるロケールで複数形を決定するため:

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

### `units(value, options?)`

例:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"（ロケール依存）
```

### `getLocaleLang(locale?)`

ロケール文字列から言語コードを抽出します:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
```

### `compact(value, options?)`

例:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `getPathWithoutLocale(inputUrl, locales?)`

URLからロケールセグメントを削除します:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
```

### `list(values, options?)`

例:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

### `getHTMLTextDir(locale?)`

ロケールのテキスト方向を返します:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## コンテンツ処理ユーティリティ

### React

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

### `getTranslation(languageContent, locale?, fallback?)`

特定のロケールのコンテンツを抽出します：

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  { en: "Hello", fr: "Bonjour", de: "Hallo" },
  "fr",
  true
); // "Bonjour"
```

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

## 注記

- すべてのヘルパーは `string` 入力を受け入れます。内部的には数値または日付に強制されます。
- ロケールが提供されていない場合、設定された `internationalization.defaultLocale` がデフォルトになります。
- これらのユーティリティは薄いラッパーです。高度なフォーマットについては、標準の `Intl` オプションをパスしてください。
