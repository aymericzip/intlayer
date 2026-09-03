---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "How to find missing translations before your users do"
description: Missing translations fail silently. Why fallback hides them, the four detection layers that actually work, and how to fail a build on an untranslated key.
keywords:
  - find missing translations
  - missing translation keys
  - i18n audit
  - untranslated strings
  - translation coverage
  - i18n lint
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# How to find missing translations before your users do

A missing translation almost never throws. Depending on your setup it either shows the English string to a Japanese user, or prints `checkout.summary.total` on a live page. Both ship, both pass code review, and both are found by a customer rather than by you.

## Table of Contents

<TOC/>

## This applies whatever library you use

Nothing here is specific to one stack. The detection layers below work the same on i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate or Lingui, because they all resolve keys the same way and all fail the same way.

The tooling is portable too. If your messages live in JSON catalogs today, the [Sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) points Intlayer at those files, so you get the audit, fill and test commands without moving your content or changing a single import:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // or "icu" for next-intl / react-intl
    }),
  ],
};

export default config;
```

If you want the runtime API to stay identical as well, the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md) alias `useTranslation`, `$t` and friends at the bundler level. Either way, treat the commands below as one implementation of the idea, not as a requirement.

## Why they are invisible

Every i18n library resolves a key through the same chain: look up the active locale, fall back to a default, and if that fails, return the key itself. That last step is the problem. There is no error, no warning in production, and no failing test, because nothing in the pipeline treats a missing key as abnormal.

Fallback makes it worse, not better. A page that silently renders in English looks fine to an English-speaking developer and to every automated check you have. The bug is only visible to the person who cannot read the result.

So the question is not "how do I handle missing translations at runtime". It is "how do I make a missing translation impossible to merge".

## The four places you can catch them

Each layer catches something the others cannot. You want more than one.

| Layer           | Catches                                      | Misses                                        |
| :-------------- | :------------------------------------------- | :-------------------------------------------- |
| Types           | Keys that do not exist at all                | A key that exists but is untranslated in `ja` |
| Lint            | Hardcoded strings never sent for translation | Keys missing from a catalog                   |
| Audit           | Locale coverage across every declared key    | Text that was never made translatable         |
| Rendering tests | Keys that resolve but render wrong           | Everything not covered by a test              |

The gap most teams have is the third row: they know their keys are valid, but nothing checks that all eighteen locales actually have a value.

## Layer 1: make the key a type, not a string

`t("checkout.summry.total")` is a typo that compiles. If your keys are plain strings, every rename is a runtime risk and every deletion leaves an orphan.

Typed keys turn that into a build error. `react-i18next` supports it through declaration merging, `next-intl` infers from your message shape, Lingui derives IDs from the source text, and Intlayer generates types from the declaration files. All of them work; what differs is how much you have to wire up.

This layer is necessary and not sufficient. Types describe the shape of your default catalog. They say nothing about whether Korean has a value for that key.

## Layer 2: lint the strings that never became keys

The translation you cannot find is often the one that was never externalized. A hardcoded label in a component is invisible to every catalog-based audit, because as far as the tooling is concerned it does not exist.

Intlayer's ESLint plugin covers this with `no-raw-text`, plus `no-unused-content` for the reverse case: content declared and no longer read by anything.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` is the one that keeps catalogs from growing forever. Dead keys are not a correctness bug, but they are what makes a translation vendor invoice larger than it should be. Full rule list in the [ESLint plugin doc](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md).

## Layer 3: audit locale coverage

This is the layer that answers the actual question. Intlayer ships it as a CLI command:

```bash packageManager="npm"
npx intlayer content test
```

It reads your configured locales and declared dictionaries, then reports which keys are missing which locales, and in which file.

One detail worth knowing before you wire it into anything: **the CLI prints a report but does not exit non-zero on failure.** If you drop it into a pipeline expecting a red build, you will get a green one with a wall of text nobody reads. For gating, use the programmatic API instead, covered below.

## Layer 4: assert it in the test suite

`listMissingTranslations()` gives you the same audit as data, which is what you want for a build gate.

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("has no missing required locales", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Three fields come back, and the distinction matters:

- `missingTranslations`: per key, which locales are missing and from which file. This is what you print when the test fails.
- `missingLocales`: the union across every key.
- `missingRequiredLocales`: restricted to `requiredLocales` in your config, or all locales if you have not set it.

## Required locales are the useful knob

Shipping eighteen locales does not mean all eighteen must be complete to deploy. Most teams have a tier that blocks a release and a tier that is best-effort.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Without `requiredLocales`, every declared locale is required and your build stays red until the last language lands. That is usually how teams end up disabling the check entirely, which is worse than not having it.

## Finding the ones already in production

The layers above prevent new gaps. For an app that already shipped, two things help.

**Pseudolocalization.** Run a locale where every string is transformed, for example `[!!! Ĉĥéçķöũţ !!!]`. Anything rendering in plain English is hardcoded. It finds in ten minutes what a catalog audit structurally cannot see, because it tests the rendered page rather than the catalog.

**Crawl your own site.** If you serve localized URLs, fetch a sample per locale and grep the HTML for your default-language strings. A page in `/ja/` containing "Add to cart" is either a missing translation or a fallback you did not know about.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## Filling the gaps

Once you know what is missing, `intlayer fill` populates the empty entries, and the `autoFill` option can generate per-locale files as content is declared. See [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/autoFill.md).

Worth being clear-eyed about this: machine-filled translations turn a _visible_ gap into an _invisible_ one. The key now has a value, so the audit goes green, and nobody reviews the wording. Use it to unblock a release, then route the output through a human for anything a customer reads before deciding. It is a scaffold, not an answer.

## Common mistakes

- **Treating fallback as a feature.** It is a rendering strategy, not a safety net. A silent English page is a bug that reports itself to nobody.
- **Relying on the CLI report to gate CI.** `intlayer content test` exits zero regardless. Assert in a test.
- **Requiring every locale.** The check gets disabled the first time a release is blocked by a half-finished language.
- **Auditing catalogs but never the rendered page.** Hardcoded strings are invisible to a catalog audit by definition.
- **Checking only the default locale in tests.** That is the one locale that cannot be missing.
- **Letting machine fill close the loop.** Green audit, unreviewed copy.

## Going further

- [Testing your content: CLI audit, programmatic API and UI assertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/testing.md)
- [ESLint plugin rules, including `no-raw-text` and `no-unused-content`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md)
- [autoFill: generating per-locale declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/autoFill.md)
- [Configuration reference: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [Benchmark reports across frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md)
- [Drop-in i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next.md)
- [What internationalization actually covers](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
