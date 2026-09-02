---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "ICU Message Format: Syntax, Plurals and Select"
description: A practical reference to ICU MessageFormat - argument interpolation, plural and select branching, CLDR plural categories per language, and the usual mistakes.
keywords:
  - icu message format
  - icu messageformat
  - cldr plural rules
  - plural categories
  - selectordinal
  - i18n pluralization
  - message syntax
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# ICU Message Format: the syntax, and the parts that trip people up

ICU MessageFormat is a string syntax that lets a translation contain its own branching logic: plurals, gendered forms, number and date formatting. It exists because grammar belongs to the translator, not to the developer writing `if (count === 1)`. This post covers the syntax, the language-dependent parts that break naive implementations, and how the JS ecosystem handles it.

## Table of Contents

<TOC/>

## The problem, concretely

Here is the code almost everyone writes first:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

This works in English and breaks everywhere else:

- **Russian and Polish** need three or four forms, not two.
- **Japanese** needs one, and the space you concatenated is wrong.
- **Arabic** needs six, and the number itself should be rendered in the locale's numbering system.
- **French** puts a non-breaking space before some punctuation, which your `+ " "` just destroyed.

The deeper problem is that the sentence has been cut into fragments. A translator sees `item` and `items` with no context and no ability to reorder the sentence. ICU MessageFormat fixes this by keeping the whole sentence in one translatable string and giving the translator the branching operators.

## Simple arguments

The smallest unit is a placeholder in single braces:

```text
Hello, {name}!
```

You pass `{ name: "Alice" }` at format time and get `Hello, Alice!`. Braces are the only special characters; to print a literal brace you wrap it in single quotes: `'{'`.

That is the entire "interpolation" feature. Everything else in ICU is built on top of it.

## Plural

`plural` selects a branch based on a number:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

Three things to know:

- **`#`** is replaced by the formatted value of `count`, locale-formatted, so `1234` becomes `1,234` in `en-US` and `1 234` in `fr-FR`.
- **`other` is mandatory.** Every ICU implementation will throw or fail validation without it. It is the fallback when no category matches.
- **`=0`, `=1`, … match exact values** and are checked _before_ the CLDR categories. Use them for special-cased copy ("No messages"), not as a substitute for `one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n` subtracts `n` from the value before both category selection and `#` substitution. It exists for the "Alice and 3 others liked this" pattern:

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

With `count: 4`, the `#` renders `3`. `offset` is genuinely useful and genuinely under-supported, so check your runtime before relying on it.

## Plural categories are language-dependent

This is the part people get wrong. The category names `zero`, `one`, `two`, `few`, `many`, `other` are not universal buckets you fill in for every language. Each locale uses a _subset_, defined by the [CLDR plural rules](https://cldr.unicode.org/index/cldr-spec/plural-rules), and the rules are grammatical, not intuitive.

| Language | Tag  | Categories used                  | Count |
| -------- | ---- | -------------------------------- | ----- |
| Japanese | `ja` | other                            | 1     |
| Chinese  | `zh` | other                            | 1     |
| English  | `en` | one, other                       | 2     |
| German   | `de` | one, other                       | 2     |
| French   | `fr` | one, many, other                 | 3     |
| Czech    | `cs` | one, few, many, other            | 4     |
| Polish   | `pl` | one, few, many, other            | 4     |
| Russian  | `ru` | one, few, many, other            | 4     |
| Arabic   | `ar` | zero, one, two, few, many, other | 6     |
| Welsh    | `cy` | zero, one, two, few, many, other | 6     |

Two consequences that surprise people:

- **`one` does not mean "1".** In Russian, `one` covers 1, 21, 31, 101: any number ending in 1 except those ending in 11. In French, `0` falls into `one`.
- **Adding a category to the English source does nothing.** The English message only needs `one` and `other`; the Polish translation needs four branches, and that structure lives in the Polish string, not the English one. Any format that forces all locales to share one key shape will fight you here.

You can check what a runtime actually does without installing anything:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

`Intl.PluralRules` ships CLDR data in every modern browser and in Node. A library claiming CLDR pluralization is almost always calling it underneath.

## select and selectordinal

`select` branches on an arbitrary string: a gender, a role, a status, a plan tier.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

Keys are matched literally and `other` is mandatory here too. `select` is the right tool any time sentence structure depends on an enum value, because languages disagree about which enums affect grammar.

`selectordinal` is the same shape as `plural` but uses the **ordinal** plural rules, which are a different table from the cardinal ones:

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

English uses four ordinal categories (1st, 2nd, 3rd, 4th) even though it only uses two cardinal ones. That asymmetry is exactly why the two operators are separate.

## Number, date and time arguments

ICU can format the value it interpolates:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

The modern form is the **skeleton**, introduced with ICU 60 and marked by a `::` prefix. Skeletons are far more expressive than the legacy style names:

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

Skeleton support is the most uneven part of the ecosystem. FormatJS implements them; several other runtimes only accept the legacy `number, currency` / `date, long` forms. Verify `::` support in your actual runtime before shipping.

## Nesting, and where it stops being readable

ICU composes. A plural branch can contain a select, which can contain another plural:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

This is the canonical ICU example and also the canonical argument against deep nesting. Two levels is where translators start making brace errors and where TMS editors stop helping. Nest at most two levels; if you need a third, split the sentence into two messages.

## How JS libraries handle ICU

| Library               | ICU support       | What you actually write                                                   |
| --------------------- | ----------------- | ------------------------------------------------------------------------- |
| react-intl (FormatJS) | Native, full      | ICU strings, including skeletons and rich-text tags                       |
| next-intl             | Native            | ICU strings, via FormatJS's `intl-messageformat`                          |
| i18next               | Plugin required   | `key_one` / `key_other` suffix keys and `{{name}}`; ICU via `i18next-icu` |
| vue-i18n              | Partial / its own | `{name}` interpolation and pipe-separated plural branches                 |
| Angular (`$localize`) | Subset            | ICU `plural` / `select` inside templates, extracted to XLIFF              |

A few notes so the table is not misleading:

- **i18next's default syntax is not ICU** and is not worse for it. Suffix keys (`item_one`, `item_few`) map onto `Intl.PluralRules` categories and are arguably easier for translators to edit in flat JSON. But `select` and nested branching are not part of it, so you either add `i18next-icu` or you write the logic in code.
- **vue-i18n's pipe plurals** use a per-locale rule function, not CLDR categories by default. That works, but the plural rule lives in your app config rather than in the data.
- **FormatJS is the reference implementation** in JS. When people say "ICU MessageFormat" in a JS context, they usually mean what FormatJS accepts.

## How Intlayer handles it

Intlayer does not use a string DSL. The branching operators are functions in a content declaration file, so the structure is typed and each locale declares only the categories its grammar needs:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Polish locale → "5 ofert"
```

The mapping to ICU concepts is direct:

| ICU construct                 | Intlayer                                     |
| ----------------------------- | -------------------------------------------- |
| `{name}`                      | `insert("Hello {{name}}")`, or auto-detected |
| `{count, plural, …}`          | `plural({ one, few, many, other })`          |
| `{value, select, …}`          | `select({ draft, published, fallback })`     |
| gender branch of `select`     | `gender({ male, female, fallback })`         |
| boolean branch of `select`    | `cond({ true, false })`                      |
| numeric ranges (non-CLDR)     | `enu({ "0": …, ">5": …, fallback: … })`      |
| `{n, number, ::currency/EUR}` | `useCurrency()(1234.5, { currency: "EUR" })` |

`plural` delegates category selection to `Intl.PluralRules`, so the CLDR table above applies unchanged. Formatting stays separate: numbers, dates, currencies and lists go through the [formatter hooks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md) instead of being embedded in the message.

Honest limits:

- Intlayer requires a build step; the compiler extracts declarations at build time. If you want plain JSON loaded at runtime, that is a different model.
- `plural` cannot nest a `t()` inside its branches yet; you wrap `plural` in `t()`, not the other way round.
- The ecosystem is smaller than i18next's. Fewer TMS integrations, fewer StackOverflow answers.

If you are coming from a codebase that already contains real ICU strings, the [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-intl.md) parses them directly: `plural`, `select`, `selectordinal`, `#`, and the legacy `number` / `date` / `time` arguments. Skeletons and `offset:` are not covered by that resolver, so check those messages when you migrate. The [i18next adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next.md) resolves the suffix form (`key_one`, `key_male`) against `Intl.PluralRules` instead.

## Common mistakes

- **Hardcoding plural logic in JS.** `count === 1 ? a : b` produces the wrong output for 8 of the 10 languages in the table above. Once the ternary is in code, no translator can fix it.
- **Concatenating translated fragments.** Word order, agreement and punctuation spacing are all locale-dependent. Keep the sentence whole.
- **Omitting `other`.** It is required by the spec, not a convention. Most parsers reject the message; the ones that do not will render nothing.
- **Assuming your categories generalize.** An English source with `one` / `other` does not mean the Polish file has two branches. Let each locale declare its own. See [per-locale content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md).
- **Using `=1` where you meant `one`.** `=1` matches only the literal 1. In Russian, 21 needs `one`, and `=1` will never fire for it.
- **Putting `#` outside a plural branch.** It is only special inside `plural` / `selectordinal`. Elsewhere it is a literal hash.
- **Forgetting that `#` is formatted.** If you want the raw number, interpolate the argument by name instead.

## Going further

- [Plural content in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/plurial.md): the CLDR-backed `plural` node and its category table.
- [Select-based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/select.md): the equivalent of ICU `select`, and when to use `enu` or `cond` instead.
- [Insertion placeholders](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md): `{{name}}` interpolation and automatic detection.
- [i18n library benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md): bundle size and runtime cost across the libraries listed above.
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/react-i18next_vs_react-intl_vs_intlayer.md): a fuller comparison of the three message models.
- [What is internationalization?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md): the wider scope beyond message formatting.
- [i18n meaning](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_meaning.md): where the term comes from and how i18n differs from l10n.
