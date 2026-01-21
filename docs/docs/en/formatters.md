---
createdAt: 2024-08-13
updatedAt: 2026-01-20
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
  - List
  - Internationalization
slugs:
  - doc
  - formatters
history:
  - version: 8.0.0
    date: 2026-01-20
    changes: Add useIntl
  - version: 6.2.0
    date: 2025-10-14
    changes: Remove getIntlayerAsync from formatters
  - version: 5.8.0
    date: 2025-08-20
    changes: Add vue formatters
  - version: 5.8.0
    date: 2025-08-18
    changes: Add formatters documentation
  - version: 5.8.0
    date: 2025-08-20
    changes: Add list formatter documentation
  - version: 5.8.0
    date: 2025-08-20
    changes: Add additional Intl utilities (DisplayNames, Collator, PluralRules)
  - version: 5.8.0
    date: 2025-08-20
    changes: Add locale utilities (getLocaleName, getLocaleLang, getLocaleFromPath, etc.)
  - version: 5.8.0
    date: 2025-08-20
    changes: Add content handling utilities (getContent, getTranslation, getIntlayer, etc.)
---

# Intlayer Formatters

## Table of Contents

<TOC/>

## Overview

Intlayer provides locale-aware formatting utilities built on top of the native `Intl` APIs. These formatters automatically use the current locale from your application context, eliminating the need to manually pass locale parameters.

**For React, Vue, and other frameworks**, use the framework-specific hooks/composables that automatically bind to your app's locale context:

| Framework                    | Import                                                               |
| ---------------------------- | -------------------------------------------------------------------- |
| **React** (client)           | `react-intlayer/format`                                              |
| **React** (server)           | `react-intlayer/server/format`                                       |
| **Next.js** (client)         | `next-intlayer/client/format`                                        |
| **Next.js** (server)         | `next-intlayer/server/format`                                        |
| **Vue**                      | `vue-intlayer/format`                                                |
| **Preact**                   | `preact-intlayer/format`                                             |
| **Vanilla JS / Node.js**     | `intlayer` (requires manual locale passing)                          |

## React Formatters

### Quick Start

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
  useIntl,
} from "react-intlayer/format";
// Next.js client: "next-intlayer/client/format"
// Next.js server: "next-intlayer/server/format"
// Preact: "preact-intlayer/format"

const PriceDisplay = () => {
  const currency = useCurrency();
  const percentage = usePercentage();

  return (
    <div>
      <p>Price: {currency(1234.5, { currency: "EUR" })}</p>
      <p>Discount: {percentage(0.25)}</p>
    </div>
  );
};
```

### Available Hooks

All hooks automatically use the locale from `IntlayerProvider` or `IntlayerServerProvider`.

| Hook             | Description                          | Example Output          |
| ---------------- | ------------------------------------ | ----------------------- |
| `useNumber()`    | Format numbers with grouping         | `"123,456.789"`         |
| `useCurrency()`  | Format currency values               | `"€1,234.50"`           |
| `usePercentage()`| Format percentages                   | `"25%"`                 |
| `useDate()`      | Format dates and times               | `"Aug 2, 2025"`         |
| `useRelativeTime()` | Format relative time              | `"in 3 days"`           |
| `useUnit()`      | Format values with units             | `"5 kilometers"`        |
| `useCompact()`   | Format numbers in compact notation   | `"1.2K"`                |
| `useList()`      | Format arrays as lists               | `"apple, banana, and orange"` |
| `useIntl()`      | Get locale-bound `Intl` object       | Full `Intl` API access  |

### Complete Example

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
      <p>{relativeTime(new Date(), new Date(Date.now() + 86400000))}</p>
      <p>{unit(5, { unit: "kilometer" })}</p>
    </div>
  );
};
```

### `useIntl` Hook

The `useIntl` hook provides direct access to a locale-bound `Intl` object. This is useful when you need the full `Intl` API (e.g., `DisplayNames`, `Collator`, `PluralRules`) with automatic locale injection.

```tsx
import { useIntl } from "react-intlayer/format";

const MyComponent = () => {
  const intl = useIntl(); // uses context locale

  // Standard Intl API, but locale is auto-injected when undefined
  const formatted = new intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(123.45);

  // You can still override the locale if needed
  const date = new intl.DateTimeFormat("fr-FR").format(new Date());

  // Access other Intl features
  const displayNames = new intl.DisplayNames(undefined, { type: "language" });
  const languageName = displayNames.of("fr"); // "French" (or localized)

  return (
    <div>
      <p>{formatted}</p>
      <p>{date}</p>
      <p>{languageName}</p>
    </div>
  );
};
```

## Vue Formatters

### Quick Start

```vue
<script setup>
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
  useIntl,
} from "vue-intlayer/format";

const currency = useCurrency();
const percentage = usePercentage();
</script>

<template>
  <div>
    <p>Price: {{ currency.value(1234.5, { currency: "EUR" }) }}</p>
    <p>Discount: {{ percentage.value(0.25) }}</p>
  </div>
</template>
```

### Available Composables

All composables return computed refs that automatically use the locale from the injected `IntlayerProvider`.

| Composable       | Description                          | Example Output          |
| ---------------- | ------------------------------------ | ----------------------- |
| `useNumber()`    | Format numbers with grouping         | `"123,456.789"`         |
| `useCurrency()`  | Format currency values               | `"€1,234.50"`           |
| `usePercentage()`| Format percentages                   | `"25%"`                 |
| `useDate()`      | Format dates and times               | `"Aug 2, 2025"`         |
| `useRelativeTime()` | Format relative time              | `"in 3 days"`           |
| `useUnit()`      | Format values with units             | `"5 kilometers"`        |
| `useCompact()`   | Format numbers in compact notation   | `"1.2K"`                |
| `useList()`      | Format arrays as lists               | `"apple, banana, and orange"` |
| `useIntl()`      | Get locale-bound `Intl` object       | Full `Intl` API access  |

### Complete Example

```vue
<script setup>
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

const number = useNumber();
const currency = useCurrency();
const date = useDate();
const percentage = usePercentage();
const compact = useCompact();
const list = useList();
const relativeTime = useRelativeTime();
const unit = useUnit();
</script>

<template>
  <div>
    <p>{{ number.value(123456.789) }}</p>
    <p>{{ currency.value(1234.5, { currency: "EUR" }) }}</p>
    <p>{{ date.value(new Date(), "short") }}</p>
    <p>{{ percentage.value(0.25) }}</p>
    <p>{{ compact.value(1200) }}</p>
    <p>{{ list.value(["apple", "banana", "orange"]) }}</p>
    <p>{{ relativeTime.value(new Date(), new Date(Date.now() + 86400000)) }}</p>
    <p>{{ unit.value(5, { unit: "kilometer" }) }}</p>
  </div>
</template>
```

### `useIntl` Composable

The `useIntl` composable provides direct access to a locale-bound `Intl` object. This is useful when you need the full `Intl` API with automatic locale injection.

```vue
<script setup>
import { useIntl } from "vue-intlayer/format";

const intl = useIntl(); // uses context locale

// Standard Intl API, but locale is auto-injected when undefined
const formatted = new intl.value.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
}).format(123.45);

// You can still override the locale if needed
const date = new intl.value.DateTimeFormat("fr-FR").format(new Date());

// Access other Intl features
const displayNames = new intl.value.DisplayNames(undefined, { type: "language" });
const languageName = displayNames.of("fr");
</script>

<template>
  <div>
    <p>{{ formatted }}</p>
    <p>{{ date }}</p>
    <p>{{ languageName }}</p>
  </div>
</template>
```

## Vanilla JS / Node.js Formatters

For non-framework contexts, import formatters directly from `intlayer`. Note that you must pass the locale manually.

### Import

```ts
import {
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
} from "intlayer";
```

### Formatter Functions

#### `number(value, options?)`

Formats a numeric value using locale-aware grouping and decimals.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (in en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

Formats a number as a percentage string. Values greater than 1 are normalized (e.g., `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Formats a value as localized currency. Defaults to `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

Formats a date/time value.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` or preset: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // e.g., "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

Formats relative time between two instants.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (defaults to `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "in 3 days"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
```

#### `units(value, options?)`

Formats a numeric value with a unit.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common: `unit` (e.g., `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

Formats a number using compact notation.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

Formats an array into a localized list string.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Common: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Cached Intl

The exported `Intl` from `intlayer` is a cached wrapper around the global `Intl`. It memoizes formatter instances (`NumberFormat`, `DateTimeFormat`, etc.) to avoid repeatedly constructing them, improving performance.

```ts
import { Intl } from "intlayer";

// Number formatting
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// Display names for languages, regions, etc.
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Collation for sorting
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (equal)

// Plural rules
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### Additional Intl Features

#### `Intl.DisplayNames`

For localized names of languages, regions, currencies, and scripts:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

For locale-aware string comparison and sorting:

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

For determining plural forms in different locales:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## Locale Utilities

### `getLocaleName(displayLocale, targetLocale?)`

Gets the localized name of a locale:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

### `getLocaleLang(locale?)`

Extracts the language code from a locale string:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
```

### `getLocaleFromPath(inputUrl)`

Extracts the locale segment from a URL or pathname:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (default locale)
```

### `getPathWithoutLocale(inputUrl, locales?)`

Removes the locale segment from a URL:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
```

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Generates a localized URL:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
```

### `getHTMLTextDir(locale?)`

Returns the text direction for a locale:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## Content Handling Utilities

### `getContent(node, nodeProps, locale?)`

Transforms a content node with all available plugins:

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

### `getTranslation(languageContent, locale?, fallback?)`

Extracts content for a specific locale:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  { en: "Hello", fr: "Bonjour", de: "Hallo" },
  "fr",
  true
); // "Bonjour"
```

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Retrieves and transforms content from a dictionary:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
```

## Notes

- All helpers accept `string` inputs; they are internally coerced to numbers or dates.
- Locale defaults to your configured `internationalization.defaultLocale` if not provided.
- These utilities are thin wrappers; for advanced formatting, pass through the standard `Intl` options.
