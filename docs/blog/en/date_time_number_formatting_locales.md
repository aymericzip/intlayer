---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Formatting dates and numbers by locale with Intl"
description: You probably do not need a formatting library. How Intl handles dates, numbers, currency and lists per locale, the caching cost, and the timezone bug that only breaks in production.
keywords:
  - format date by locale
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - locale currency format
  - relative time format
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Formatting dates and numbers by locale with Intl

Translating strings is the visible half of i18n. The half that generates bug reports is formatting: a German user seeing `1,234.56` instead of `1.234,56`, a Japanese user seeing `08/02/2026` and reading it as August, or a date that renders differently on the server and the client and takes the page down on hydration.

None of that needs a library. `Intl` is in every runtime you target.

## Table of Contents

<TOC/>

## Start by deleting your date helper

Almost every codebase has a `formatDate` written before anyone thought about locales. It hardcodes an order, a separator, and usually English month names.

```ts
// The thing to delete.
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat` replaces it and is correct in every locale:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

The same applies to numbers. `toFixed(2)` produces `1234.56` everywhere, which is wrong in most of Europe.

## What `Intl` covers

| API                       | Use it for                                              |
| :------------------------ | :------------------------------------------------------ |
| `Intl.DateTimeFormat`     | Dates and times, with `dateStyle` / `timeStyle` presets |
| `Intl.NumberFormat`       | Decimals, currency, percent, units, compact notation    |
| `Intl.RelativeTimeFormat` | "3 days ago", "in 2 hours"                              |
| `Intl.ListFormat`         | "a, b, and c" versus "a, b et c"                        |
| `Intl.PluralRules`        | Which plural category a number falls into               |
| `Intl.Collator`           | Sorting strings correctly per language                  |

`Intl.Collator` is the one people forget. `array.sort()` on strings uses code point order, so accented characters sort after `z` and Swedish `ö` lands in the wrong place. If you sort user-visible lists, sort with a collator.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("fr").compare);
// ["apple", "édouard", "zebra"]
```

## Prefer presets to hand-built options

`dateStyle` and `timeStyle` let the locale decide the order and separators. Specifying `year`, `month` and `day` individually gives you control you usually should not want, because the correct order differs by locale and you are overriding CLDR data with your own assumption.

```ts
// Locale decides the shape.
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// You decided the shape, and you are wrong somewhere.
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

Use explicit components only when the design genuinely requires a fixed shape, for instance a table column that must stay narrow.

## Constructing formatters is expensive

This is the performance detail that matters. Building an `Intl.NumberFormat` involves loading locale data, and it is far more expensive than the `format()` call that follows. Doing it inside a render or a loop over a thousand rows is a measurable cost.

```ts
// Rebuilds the formatter on every row.
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// Build once, reuse.
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()` and `toLocaleString()` have the same problem hidden inside them: each call constructs a formatter. They are fine for one value and wrong for a list.

Cache by the combination of locale and options, since those are what define a formatter:

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

## The timezone bug that only appears in production

This one costs entire afternoons. A server renders a date, the browser hydrates it, and React throws a hydration mismatch because the two produced different text.

The cause is that `Intl.DateTimeFormat` uses the ambient timezone when you do not name one. Your production server runs in UTC. Your laptop does not. So the bug is invisible locally and reproducible only in production, which is the worst possible combination.

```ts
// Server in UTC and a browser in UTC+9 disagree. Hydration mismatch.
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// Both agree.
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

Three workable approaches:

- **Pin a timezone** on the server and pass it explicitly. Correct and deterministic, but everyone sees UTC.
- **Render on the client only**, with a stable placeholder for the server pass. Correct per user, costs a flash.
- **Store the user's timezone** and pass it on both sides. Best result, most work.

Whichever you pick, always pass `timeZone` explicitly for any date rendered on both server and client. A date with no timezone is a date with two values.

## Currency needs a currency, not a locale

Locale and currency are independent. `fr-FR` does not mean euros: a French user can be looking at a USD invoice.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

The locale controls the separators, digit grouping and symbol placement. The currency comes from your data. Deriving one from the other is a bug that reaches accounting.

Also note `currencyDisplay`. In an interface where several currencies coexist, `"code"` removes the ambiguity between US, Canadian and Australian dollars.

## Relative time reads better than absolute time

For anything recent, "2 hours ago" beats a timestamp, and `Intl.RelativeTimeFormat` localizes it properly.

```ts
new Intl.RelativeTimeFormat("es", { numeric: "auto" }).format(-1, "day");
// "ayer"
```

`numeric: "auto"` is what produces "yesterday" instead of "1 day ago". Without it you get the numeric form in every language, which reads like a machine.

## What Intlayer adds

Intlayer wraps these in cached helpers so you do not maintain the map above, and so the active locale is applied by default rather than passed at every call site.

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
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2 hours ago"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5 kilometers"
compact(1200); // "1.2K"
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
```

`date()` also accepts presets (`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`) so the common cases do not need an options object. React and Vue equivalents exist as hooks and composables, which resolve the active locale from context instead of taking it as an argument.

To be clear about what this is: a caching layer and a locale default over the platform API. The formatting behaviour is `Intl`, and everything in this post applies whether or not you use it. Full signatures in the [formatters documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md).

## Common mistakes

- **`toLocaleDateString()` with no locale.** Uses the runtime's locale, which on a server is whatever the container was configured with.
- **Formatting in a loop.** Constructing the formatter dominates the cost. Build once.
- **No `timeZone` on isomorphic dates.** Hydration mismatch that never reproduces on your machine.
- **Deriving currency from locale.** `fr-FR` is not euros.
- **`sort()` on user-visible strings.** Use `Intl.Collator`.
- **Hardcoding month or day names.** They are in CLDR already, in every language.
- **`numeric: "always"` for relative time.** "1 day ago" where every language has a word for yesterday.

## Going further

- [Formatters and locale utilities: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md)
- [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [Benchmark reports across frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md)
- [Drop-in react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-intl.md)
- [ICU message format: plurals, select and number skeletons](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)
- [How to test translations, including formatter and plural coverage](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_testing_strategies.md)
- [What internationalization actually covers](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md)
