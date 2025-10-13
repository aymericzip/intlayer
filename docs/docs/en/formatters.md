---
createdAt: 2024-08-13
updatedAt: 2025-10-14
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
} from "intlayer";
```

If you are using React, hooks are also available; see `react-intlayer/format`.

## Cached Intl

The exported `Intl` is a thin, cached wrapper around the global `Intl`. It memoizes instances of `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator`, and `PluralRules`, which avoids rebuilding the same formatter repeatedly.

Because formatter construction is relatively expensive, this caching improves performance without changing behavior. The wrapper exposes the same API as the native `Intl`, so usage is identical.

- Caching is per process and transparent to callers.

> If `Intl.DisplayNames` is not available in the environment, a single dev-only warning is printed (consider a polyfill).

Examples:

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

## Additional Intl Utilities

Beyond the formatter helpers, you can also use the cached Intl wrapper directly for other Intl features:

### `Intl.DisplayNames`

For localized names of languages, regions, currencies, and scripts:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

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

### `Intl.PluralRules`

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

Gets the localized name of a locale in another locale:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: The locale to get the name for
- **targetLocale**: The locale to display the name in (defaults to displayLocale)

### `getLocaleLang(locale?)`

Extracts the language code from a locale string:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: The locale to extract the language from (defaults to current locale)

### `getLocaleFromPath(inputUrl)`

Extracts the locale segment from a URL or pathname:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (default locale)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: The complete URL string or pathname to process
- **returns**: The detected locale or default locale if no locale is found

### `getPathWithoutLocale(inputUrl, locales?)`

Removes the locale segment from a URL or pathname:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: The complete URL string or pathname to process
- **locales**: Optional array of supported locales (defaults to configured locales)
- **returns**: The URL without the locale segment

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

Generates a localized URL for the current locale:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: The original URL to localize
- **currentLocale**: The current locale
- **locales**: Optional array of supported locales (defaults to configured locales)
- **defaultLocale**: Optional default locale (defaults to configured default locale)
- **prefixDefault**: Whether to prefix the default locale (defaults to configured value)

### `getHTMLTextDir(locale?)`

Returns the text direction for a locale:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: The locale to get the text direction for (defaults to current locale)
- **returns**: `"ltr"`, `"rtl"`, or `"auto"`

## Content Handling Utilities

### `getContent(node, nodeProps, locale?)`

Transforms a content node with all available plugins (translation, enumeration, insertion, etc.):

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: The content node to transform
- **nodeProps**: Properties for the transformation context
- **locale**: Optional locale (defaults to configured default locale)

### `getTranslation(languageContent, locale?, fallback?)`

Extracts content for a specific locale from a language content object:

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

- **languageContent**: Object mapping locales to content
- **locale**: Target locale (defaults to configured default locale)
- **fallback**: Whether to fallback to default locale (defaults to true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

Retrieves and transforms content from a dictionary by key:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: The key of the dictionary to retrieve
- **locale**: Optional locale (defaults to configured default locale)
- **plugins**: Optional array of custom transformation plugins

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
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

Formats a number as a percentage string.

Behavior: values greater than 1 are interpreted as whole percentages and normalized (e.g., `25` → `25%`, `0.25` → `25%`).

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

Formats a value as localized currency. Defaults to `USD` with two fraction digits.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common fields: `currency` (e.g., `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

Examples:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
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

- Pass "now" as the first argument and the target as the second to get natural phrasing.
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

Formats a numeric value as a localized unit string using `Intl.NumberFormat` with `style: 'unit'`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - Common fields: `unit` (e.g., `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - Defaults: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

Examples:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
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

### `list(values, options?)`

Formats an array of values into a localized list string using `Intl.ListFormat`.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - Common fields: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - Defaults: `type: 'conjunction'`, `style: 'long'`

Examples:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## Notes

- All helpers accept `string` inputs; they are internally coerced to numbers or dates.
- Locale defaults to your configured `internationalization.defaultLocale` if not provided.
- These utilities are thin wrappers; for advanced formatting, pass through the standard `Intl` options.

## Entry points and re-exports (`@index.ts`)

The formatters live in the core package and are re-exported from higher-level packages to keep imports ergonomic across runtimes:

Examples:

```ts
// App code (recommended)
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
} from "intlayer";
```

### React

Client components:

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
// or in Preact apps
// "preact-intlayer/format";
// or in Next.js apps
// "next-intlayer/client/format";

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

Server components (or React Server runtime):

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

> That hooks will consider the locale from the `IntlayerProvider` or `IntlayerServerProvider`

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

> That composables will consider the locale from the injected `IntlayerProvider`

## Doc History

| Version | Date       | Changes                                                                        |
| ------- | ---------- | ------------------------------------------------------------------------------ |
| 6.2.0   | 2025-10-14 | Remove getIntlayerAsync from formatters                                        |
| 5.8.0   | 2025-08-20 | Add vue formatters                                                             |
| 5.8.0   | 2025-08-18 | Add formatters documentation                                                   |
| 5.8.0   | 2025-08-20 | Add list formatter documentation                                               |
| 5.8.0   | 2025-08-20 | Add additional Intl utilities (DisplayNames, Collator, PluralRules)            |
| 5.8.0   | 2025-08-20 | Add locale utilities (getLocaleName, getLocaleLang, getLocaleFromPath, etc.)   |
| 5.8.0   | 2025-08-20 | Add content handling utilities (getContent, getTranslation, getIntlayer, etc.) |
