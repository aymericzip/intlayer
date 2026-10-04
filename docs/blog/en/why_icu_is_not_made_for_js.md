---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: Why ICU MessageFormat Is Not Made for JavaScript
description: "ICU MessageFormat was built for Java and C++. In the browser, full support ships about 10 KB of parser code. Where that cost comes from, and the alternatives."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - icu bundle size
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - i18n pluralization
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# Why ICU MessageFormat Is Not Made for JavaScript

ICU MessageFormat is a good standard. It is complete, translators know it, and most translation management systems (TMS) can read it. The problem is the runtime it was built for. ICU comes from C++ and Java, where a full message parser and formatter is a small cost next to the rest of the program. In a browser bundle, that cost is paid on every page load.

This post looks at where ICU comes from, why its syntax is heavy for plurals, and why full compatibility adds weight to any JavaScript i18n library. If you need the syntax itself, read the [ICU Message Format reference](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md) first.

- [ICU Message Format reference](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)

<TOC/>

## From IBM to the Unicode Consortium

ICU stands for _International Components for Unicode_. Its message syntax started in Java: Taligent, a joint venture of Apple and IBM, wrote the internationalization classes of JDK 1.1 (1997), including `java.text.MessageFormat`. IBM kept developing them as ICU4J, ported them to C/C++ as ICU4C, and open-sourced the project in 1999. In 2016, ICU moved under the Unicode Consortium, which also maintains CLDR, the locale data it depends on.

### What it was used for

The target was server and desktop software: Java enterprise applications, IBM products, and later operating systems. Messages lived in Java `.properties` files loaded through `ResourceBundle`, or in ICU's own resource bundle format for C/C++:

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

The original JDK version had no `plural`. It used `choice`, with numeric ranges (`{0,choice,0#no files|1#one file|1<{0} files}`), which only fits languages that pluralize like English. ICU added `plural` based on CLDR rules in 2008 (ICU 4.0) and `select` in 2010 (ICU 4.4).

### Not `.po`

ICU is often confused with gettext, but they are separate traditions. `.po` files come from GNU gettext (C, Linux, then PHP and Python). A `.po` entry holds plain `msgid` / `msgstr` pairs, and plurals are chosen by a C expression in the file header (`Plural-Forms: nplurals=2; plural=(n > 1);`). There is no branching inside the message. ICU puts the branching inside the string itself, so one message can combine `plural`, `select` and number formatting.

### Where ICU runs today

ICU4C ships in Android, iOS, macOS, Windows, Node.js, and the JavaScript engines of Chrome and Firefox. The browser's `Intl` APIs are largely built on it. So the browser already contains ICU's plural rules and number and date formatting. What it does not contain is the message parser: `Intl.MessageFormat` is still an early-stage TC39 proposal, built on the newer MessageFormat 2 syntax and not compatible with ICU MessageFormat 1.

That history explains the design:

- **It targets server and desktop runtimes.** Parsing a message string at runtime is cheap there, and the library is installed once on the system, not downloaded by each visitor.
- **It is a DSL inside a string.** Branching, number formatting, dates and nesting all live in one syntax that a translator can edit without touching code.
- **It aims for completeness.** Any grammatical case a translator may need has an operator.

None of these are mistakes. They just assume a runtime that the browser is not.

## Plurals are verbose

The most common ICU construct is also the noisiest. A count with a zero case looks like this:

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

That is the argument name, the keyword `plural`, a case label per branch, nested braces, and `#` as a special token that only works inside plural branches. Add a gendered subject and the message nests:

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

Nine of the fifteen lines are structure. Polish needs four plural branches in each of those three gender branches, so the translated string becomes a block of braces where one missing `}` breaks the whole message, often only at runtime.

In JavaScript the same structure can be plain data: an object whose keys are plural categories, checked by the type system and the editor, with no parser between the file and the value.

## Complete, and that is the cost

ICU covers a lot:

- `plural` with exact matches (`=0`) and `offset:`
- `selectordinal`, with its own CLDR ordinal table
- `select`, nestable to any depth
- `number`, `date` and `time` arguments, in legacy style names (`number, currency`) and in skeletons (`::currency/EUR compact-short`)
- quoting and escape rules (`'{'`, `''`)
- rich-text tags in some implementations (`<b>…</b>`)

A library that claims 1:1 ICU compatibility has to ship all of it, because it cannot know at build time which features your messages use. In practice that means:

1. **A parser** that turns the message string into an AST, including the error handling for malformed braces.
2. **A skeleton parser** for the `::` number and date syntax, which is its own small language.
3. **A formatter** that walks the AST and maps each node onto `Intl.PluralRules`, `Intl.NumberFormat` and `Intl.DateTimeFormat`.

The third part is thin, because modern JavaScript already has the CLDR logic built into `Intl`. The first two exist only to read a syntax. In FormatJS's `intl-messageformat`, the reference implementation that `react-intl` and `next-intl` build on, that is about **10 KB of compressed JavaScript** sent to every visitor, before any of your own messages.

Most apps use a small part of it: `{name}` interpolation and a few `plural` blocks. They still download the parser for skeletons, ordinals and offsets, because nothing in a runtime-parsed string tells the bundler what can be removed.

## next-intl ran into the same problem

This is not only a theoretical concern. `next-intl`, one of the most widely used ICU-based libraries, reached the same conclusion. In version 4.8 (January 2026) it added an experimental `precompile` option that parses ICU messages at build time into a compact AST and replaces the runtime parser with a small evaluator. The project reports around **9 KB of compressed JavaScript removed** by turning the flag on.

The tradeoff shows the limit of the approach: `t.raw` does not work with precompilation, because the raw ICU string no longer exists at runtime. Once you stop parsing in the browser, you are no longer shipping ICU. You are shipping a compiled representation of it, and the string syntax is only the authoring format.

At that point, the question is fair: if the browser never reads the string, why should developers and translators write it?

## What a JavaScript-native approach looks like

JavaScript already provides the hard part. `Intl.PluralRules` knows that Polish has four cardinal categories and that English has four ordinal ones. `Intl.NumberFormat` and `Intl.DateTimeFormat` handle currencies, units, compact notation and calendars. What remains is choosing a branch and inserting values, which only takes a few lines once the structure is data and not a string.

That is the model Intlayer uses. Branching is a function in a typed content declaration, and each locale declares only the categories its grammar needs:

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // Polish locale → "5 nieprzeczytanych wiadomości"
```

What changes compared with ICU:

- **No parser in the bundle.** The structure is already an object when it reaches the browser. `plural` picks a key with `Intl.PluralRules`, which the browser already provides.
- **Errors move to build time.** A missing branch or a misspelled key is a type error, not a broken string discovered in production.
- **Formatting stays outside the message.** Numbers, dates and currencies go through [formatter hooks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md) that wrap `Intl` directly, so there is no skeleton language to parse.
- **Unused features cost nothing.** If no message uses `gender`, the bundler drops it.

- [formatter hooks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md)

There are real downsides. You need a build step, the content files are code rather than plain strings, and some TMS tools expect ICU strings and will not read a content declaration directly.

## When ICU is still the right choice

ICU remains the better choice when:

- **Your translation pipeline is built around it.** Many TMS tools import and export ICU strings, and translators are trained on the syntax.
- **Messages are shared across platforms.** The same catalog feeding an iOS app, an Android app and a web app is a strong reason to keep one standard format.
- **You already have a large ICU catalog.** Rewriting thousands of messages is rarely worth it on its own.

In the last case you do not have to choose between a rewrite and keeping the runtime parser. Intlayer's [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-intl.md) reads existing ICU strings (`plural`, `select`, `selectordinal`, `#`, legacy `number` / `date` / `time`), so you can migrate gradually and keep the ICU cost only where the old messages still need it.

- [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-intl.md)

## Conclusion

ICU MessageFormat solved a real problem: grammar belongs to translators, not to `if (count === 1)` in application code. It solved it for runtimes where parsing a string DSL costs nothing. In the browser, full compatibility means shipping a parser for features most apps never use, and the ICU-based libraries are now compiling their own messages ahead of time to avoid it.

JavaScript already has the CLDR rules in `Intl`. What it needs from an i18n format is the branching structure, and that can be expressed as data.

## Going further

- [ICU Message Format: syntax, plurals and select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)
- [Plural content in Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/plurial.md)
- [Select-based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/select.md)
- [i18n library benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md)
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/is_next-intl_outdated.md)
