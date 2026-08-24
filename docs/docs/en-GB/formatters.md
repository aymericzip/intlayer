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
  - List
  - Internationalisation
slugs:
  - doc
  - formatters
history:
  - version: 5.8.0
    date: 2025-08-20
    changes: "Add Vue formatters"
  - version: 5.8.0
    date: 2025-08-18
    changes: "Add formatters documentation"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Add list formatter documentation"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Add additional Intl utilities (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Add locale utilities (getLocaleName, getLocaleLang, getLocaleFromPath, etc.)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "Add content handling utilities (getContent, getTranslation, getIntlayer, etc.)"
author: aymericzip
---

# Intlayer Formatters

## Overview

Intlayer provides a set of lightweight helpers built on top of the native `Intl` APIs, plus a cached `Intl` wrapper to avoid repeatedly constructing heavy formatters. These utilities are fully locale-aware and can be used from the main `intlayer` package.

## Cached Intl

Because formatter construction is relatively expensive, this caching improves performance without changing behaviour. The wrapper exposes the same API as the native `Intl`, so usage is identical.

> If `Intl.DisplayNames` is not available in the environment, a single dev-only warning is printed (consider a polyfill).

Examples:

## Locale Utilities

### `getLocaleFromPath(inputUrl)`

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (default locale)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

### `getPathWithoutLocale(inputUrl, locales?)`

Removes the locale segment from a URL or pathname:

- **inputUrl**: The complete URL string or pathname to process
- **locales**: Optional array of supported locales (defaults to configured locales)
- **returns**: The URL without the locale segment

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
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

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

### `getTranslation(languageContent, locale?, fallback?)`

Extracts content for a specific locale from a language content object:

- **languageContent**: Object mapping locales to content
- **locale**: Target locale (defaults to configured default locale)
- **fallback**: Whether to fallback to the default locale (defaults to true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

Asynchronously retrieves content from a remote dictionary:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

## Formatters

All helpers below are exported from `intlayer`.

### `percentage(value, options?)`

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### Additional Intl Features

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

Formats a number as a percentage string. Values greater than 1 are normalised (e.g., `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

Formats a value as localised currency. Defaults to `USD`.

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
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometres"
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

Formats an array into a localised list string.

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

For localised names of languages, regions, currencies, and scripts:

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

### `units(value, options?)`

Examples:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometre", unitDisplay: "long", locale: "en-GB" }); // "5 kilometres"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (locale-dependent)
```

### `compact(value, options?)`

Examples:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

Examples:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

### `getLocaleLang(locale?)`

Extracts the language code from a locale string:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
```

### React

Client components:

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
} from "react-intlayer/server/format";
// or in Next.js apps
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

### `getHTMLTextDir(locale?)`

Returns the text direction for a locale:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## Content Handling Utilities

### Vue

Client components:

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
