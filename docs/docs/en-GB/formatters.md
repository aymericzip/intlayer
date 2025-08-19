---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: Formatters
description: Locale-aware formatting utilities based on Intl for numbers, percentages, currency, dates, relative time, units, and compact notation. Includes a cached Intl helper.
keywords:
  - Formatters
  - Intl
  - Number
  - Currency
  - Percentage
  - Date
  - Relative Time
  - Units
  - Compact
  - Internationalisation
slugs:
  - doc
  - formatters
---

# Intlayer Formatters

## Overview

Intlayer provides a set of lightweight helpers built on top of the native `Intl` APIs, plus a cached `Intl` wrapper to avoid repeatedly constructing heavy formatters. These utilities are fully locale-aware and can be used from the main `intlayer` package.

### Import

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

If you are using React, hooks are also available; see `react-intlayer/format`.

## Cached Intl

The exported `Intl` is a thin, cached wrapper around the global `Intl`. It memoises instances of `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, which avoids rebuilding the same formatter repeatedly.

Because formatter construction is relatively expensive, this caching improves performance without changing behaviour. The wrapper exposes the same API as the native `Intl`, so usage is identical.

- Caching is per process and transparent to callers.

> If `Intl.DisplayNames` is not available in the environment, a single dev-only warning is printed (consider a polyfill).

Example:

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## Formatters

All helpers below are exported from `intlayer`.

### `number(value, options?)`

Formats a numeric value using locale-aware grouping and decimals.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Examples:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Formats a number as a percentage string.

Behaviour: values greater than 1 are interpreted as whole percentages and normalised (e.g., `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

Examples:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

Formats a value as localised currency. Defaults to `USD` with two fraction digits.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common fields: `currency` (e.g., `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Examples:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

Formats a date/time value with `Intl.DateTimeFormat`.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` or one of the presets:
  - Presets: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

Examples:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // e.g., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

Formats relative time between two instants with `Intl.RelativeTimeFormat`.

- Pass "now" as the first argument and the target as the second to obtain natural phrasing.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (defaults to `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - Default `unit` is `"second"`.

Examples:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

### `units(value, options?)`

Formats a numeric value as a localised unit string using `Intl.NumberFormat` with `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common fields: `unit` (e.g., `"kilometre"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Defaults: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Examples:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometre", unitDisplay: "long", locale: "en-GB" }); // "5 kilometres"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (locale-dependent)
```

### `compact(value, options?)`

Formats a number using compact notation (e.g., `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (uses `notation: 'compact'` under the hood)

Examples:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

## Notes

- All helpers accept `string` inputs; these are internally coerced to numbers or dates.
- The locale defaults to your configured `internationalization.defaultLocale` if not provided.
- These utilities are thin wrappers; for advanced formatting, pass through the standard `Intl` options.

## Entry points and re-exports (`@index.ts`)

The formatters reside in the core package and are re-exported from higher-level packages to keep imports ergonomic across runtimes:

Examples:

```ts
// App code (recommended)
import { number, currency, date, Intl } from "intlayer";
```

### React

Client components:

```ts
import { useNumber, useCurrency, useDate } from "react-intlayer/format";
// or in Next.js apps
import { useNumber, useCurrency, useDate } from "next-intlayer/client/format";
```

Server components (or React Server runtime):

```ts
import { useNumber, useCurrency, useDate } from "intlayer/server/format";
// or in Next.js apps
import { useNumber, useCurrency, useDate } from "next-intlayer/server/format";
```

> These hooks will consider the locale from the `IntlayerProvider` or `IntlayerServerProvider`

## Doc History

| Version | Date       | Changes                      |
| ------- | ---------- | ---------------------------- |
| 5.8.0   | 2025-08-18 | Add formatters documentation |
