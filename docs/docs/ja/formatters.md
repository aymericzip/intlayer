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
  - 国際化
slugs:
  - doc
  - formatters
---

# Intlayer フォーマッター

## 概要

Intlayerは、ネイティブの`Intl` APIの上に構築された軽量ヘルパー群と、重いフォーマッターを繰り返し構築するのを避けるためのキャッシュされた`Intl`ラッパーを提供します。これらのユーティリティは完全にロケール対応で、メインの`intlayer`パッケージから使用できます。

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
} from "intlayer";
```

Reactを使用している場合は、フックも利用可能です。詳細は`react-intlayer/format`を参照してください。

## キャッシュされたIntl

エクスポートされる`Intl`は、グローバルな`Intl`の薄いキャッシュラッパーです。`NumberFormat`、`DateTimeFormat`、`RelativeTimeFormat`のインスタンスをメモ化し、同じフォーマッターを繰り返し再構築するのを防ぎます。

フォーマッターの構築は比較的コストがかかるため、このキャッシュにより動作を変えずにパフォーマンスが向上します。このラッパーはネイティブの`Intl`と同じAPIを公開しているため、使用方法は同一です。

- キャッシュはプロセス単位で行われ、呼び出し元には透過的です。

> 環境に`Intl.DisplayNames`が存在しない場合、開発時のみの警告が一度だけ表示されます（ポリフィルの検討を推奨）。

例:

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## フォーマッター

以下のすべてのヘルパーは `intlayer` からエクスポートされています。

### `number(value, options?)`

ロケールに応じた区切りと小数点を使用して数値をフォーマットします。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

例:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789"（en-USの場合）
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

数値をパーセント文字列としてフォーマットします。

動作: 1より大きい値は全体のパーセンテージとして解釈され、正規化されます（例：`25` → `25%`、`0.25` → `25%`）。

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

値をローカライズされた通貨としてフォーマットします。デフォルトは小数点以下2桁の`USD`です。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 共通フィールド: `currency`（例: `"EUR"`）、`currencyDisplay`（`"symbol" | "code" | "name"`）

例:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

`Intl.DateTimeFormat` を使用して日付/時刻の値をフォーマットします。

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` または以下のプリセットのいずれか：
  - プリセット: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

例:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // 例: "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

`Intl.RelativeTimeFormat` を使用して、2つの時点間の相対時間をフォーマットします。

/// "now" を最初の引数に、対象の時刻を2番目の引数に渡すことで、自然な表現を得られます。

- **from**: `Date | string | number`
- **to**: `Date | string | number`（デフォルトは `new Date()`）
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - デフォルトの `unit` は `"second"` です。

例:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

### `units(value, options?)`

数値を `Intl.NumberFormat` の `style: 'unit'` を使用してローカライズされた単位文字列としてフォーマットします。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 共通フィールド: `unit`（例: `"kilometer"`, `"byte"`）、`unitDisplay`（`"short" | "narrow" | "long"`）
  - デフォルト: `unit: 'day'`、`unitDisplay: 'short'`、`useGrouping: false`

例:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"（ロケール依存）
```

### `compact(value, options?)`

数値をコンパクト表記（例: `1.2K`, `1M`）でフォーマットします。

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`（内部で `notation: 'compact'` を使用）

例:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

## 注意事項

- すべてのヘルパーは `string` 入力を受け付け、内部で数値や日付に変換されます。
- ロケールは指定がなければ設定された `internationalization.defaultLocale` がデフォルトで使用されます。
- これらのユーティリティは薄いラッパーであり、高度なフォーマットが必要な場合は標準の `Intl` オプションを直接渡してください。

## エントリーポイントと再エクスポート（`@index.ts`）

フォーマッターはコアパッケージに存在し、ランタイム間でのインポートを使いやすくするために上位パッケージから再エクスポートされています。

- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`（内部で `notation: 'compact'` を使用）

例:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

## 注意事項

- すべてのヘルパーは `string` 入力を受け付け、内部で数値または日付に変換されます。
- ロケールが指定されていない場合は、設定された `internationalization.defaultLocale` がデフォルトで使用されます。
- これらのユーティリティは薄いラッパーであり、高度なフォーマットが必要な場合は標準の `Intl` オプションを直接渡してください。

## エントリーポイントと再エクスポート（`@index.ts`）

フォーマッターはコアパッケージに存在し、ランタイム間でのインポートを使いやすくするために上位パッケージから再エクスポートされています。

例:

```ts
// アプリコード（推奨）
import { number, currency, date, Intl } from "intlayer";
```

### React

クライアントコンポーネント:

```ts
import { useNumber, useCurrency, useDate } from "react-intlayer/format";
// または Next.js アプリの場合
import { useNumber, useCurrency, useDate } from "next-intlayer/client/format";
```

サーバーコンポーネント（または React Server ランタイム）:

```ts
import { useNumber, useCurrency, useDate } from "intlayer/server/format";
// または Next.js アプリの場合
import { useNumber, useCurrency, useDate } from "next-intlayer/server/format";
```

> これらのフックは `IntlayerProvider` または `IntlayerServerProvider` からロケールを考慮します。

## ドキュメント履歴

| バージョン | 日付       | 変更内容                         |
| ---------- | ---------- | -------------------------------- |
| 5.8.0      | 2025-08-18 | フォーマッターのドキュメント追加 |
