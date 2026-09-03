---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "How to test translations without writing brittle tests"
description: What is worth testing in an i18n app and what is not. Provider-based rendering tests, pseudolocalisation, RTL and plural coverage, and the snapshot trap.
keywords:
  - test translations
  - i18n testing
  - testing library i18n
  - pseudolocalisation
  - locale provider test
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# How to test translations without writing brittle tests

Most i18n test suites fail in one of two ways. Either they assert on literal copy, so every wording change breaks fifty tests and the team deletes them. Or they render everything in the default locale, so they prove nothing about the other seventeen. Both end in the same place, a suite nobody trusts.

## Table of Contents

<TOC/>

## The patterns are library-agnostic

Every pattern below works on any i18n stack. Swap the provider for `I18nextProvider`, `NextIntlClientProvider` or `IntlProvider` and the tests are otherwise identical, because they assert on rendered output rather than on a library API.

The coverage tooling ports too: with the [Sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md) pointed at your existing catalogues, or a [compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md) aliasing your current imports, the coverage assertion runs against the JSON you already have.

## Decide what you are actually testing

Translation quality is not a test. No assertion tells you whether the German is idiomatic, and pretending otherwise is how you get a suite full of hardcoded strings.

What is worth testing is mechanical:

| Worth testing                              | Not worth testing               |
| :----------------------------------------- | :------------------------------ |
| Every required locale has a value          | Whether the wording is good     |
| The right locale reaches the component     | Exact copy of every label       |
| Plurals resolve for each category          | That a translator did their job |
| RTL locales set direction and mirror       | Every string in every locale    |
| Formatted dates and numbers use the locale | Third-party `Intl` correctness  |

Coverage belongs in one data-driven test, not in your component tests. That is covered in [finding missing translations](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/detecting_missing_translations.md); this post is about the rest.

## Render under a provider, assert on role

The core pattern is to mount the component inside a locale provider and query by role or test id rather than by copy.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("renders the summary heading in French", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

Querying `getByRole("heading")` survives a copy change. `getByText("Récapitulatif")` does not. Use the literal only when the string itself is the thing under test, which is rare.

For attributes such as `aria-label` you need the raw string rather than a renderable node. In React, `useIntlayer` entries expose a `.value` field for that.

## Parameterise across locales

One test body, every locale, is worth more than one test per locale.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("renders without falling back to the key", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // A rendered key means the lookup failed.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("sets the correct text direction", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

The first assertion is the cheap generic win: if a lookup fails and your library renders the key, the DOM contains something shaped like `cart.summary.title`. That catches a whole class of bugs without naming a single string.

## Pseudolocalisation finds what catalogues cannot

Add a fake locale that transforms every string, for example `Checkout` becoming `[!!! Çĥéçķöũţ !!!]`. Then render a page in it.

Anything still in plain English is hardcoded, and no catalogue-based check can see that, because as far as the tooling is concerned the string does not exist. The brackets do a second job: they expand the text by roughly 30 percent, which surfaces layout that breaks in German before German does.

This is worth running as a visual or end-to-end pass rather than a unit test, since the failure is something you look at.

## Plurals need a test per category, not per language

Plural bugs hide because English has two forms and most developers only ever exercise those. Polish has four, Arabic six.

```ts fileName="plural.test.ts"
// Arabic exercises zero, one, two, few, many, other.
describe.each([0, 1, 2, 3, 11, 100])("count %i", (count) => {
  it("produces a non-empty string in Arabic", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

Pick counts that hit each CLDR category for your worst-case language rather than testing 1 and 2 everywhere. `Intl.PluralRules` tells you which category a number falls into, so you can derive the sample set instead of guessing. More on the categories in [the ICU message format post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/icu_message_format.md).

## The snapshot trap

Snapshots and i18n are a bad match. A snapshot of a localised component encodes every string in it, so a translator fixing a typo in Portuguese turns a green suite red, in a file no reviewer can evaluate. After the third time, someone runs `-u` without reading the diff, and the snapshots stop meaning anything.

If you want snapshots, take them in one locale only, and treat that as a structural check rather than a content check. Everything locale-specific belongs in explicit assertions.

## Test the negotiation, not just the rendering

The most common production i18n bug is not a missing string. It is the wrong locale being selected: a URL says `/fr/`, the client reads `navigator.language`, and they disagree.

Test the resolution order directly, as a pure function, separate from any component:

```ts fileName="locale-resolution.test.ts"
it("prefers the URL over the stored preference", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("falls back to the header when the URL has no prefix", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

This is the single highest-value i18n test most codebases are missing, and it needs no DOM.

## What to run where

- **Unit**: locale negotiation, formatters, plural categories. Fast, no DOM.
- **Component**: one provider-based render per locale, asserting on roles and on the absence of raw keys.
- **Coverage**: one data-driven test asserting no missing required locales.
- **Visual or end-to-end**: pseudolocalisation pass and one RTL page, because those failures are visual.

Keep the first three in the pipeline on every commit. The last one is cheap to run nightly and expensive to run on every push.

## Common mistakes

- **Asserting on literal copy everywhere.** Guarantees the suite is deleted within a quarter.
- **Snapshotting localised components.** Translators break your build, reviewers rubber-stamp the update.
- **Testing only the default locale.** The one locale that cannot be missing.
- **Testing 1 and 2 for plurals.** Misses every category English does not have.
- **Mocking the i18n library away.** You are then testing that your mock returns strings.
- **Never testing negotiation.** The most common real-world failure, and the easiest to test.

## Going further

- [Testing your content: CLI audit, programmatic API and UI assertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/testing.md)
- [ESLint plugin: catching hardcoded strings and dead content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/eslint.md)
- [Formatters and locale utilities, including `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/formatters.md)
- [Benchmark reports across frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/index.md)
- [Drop-in react-i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/react-i18next.md)
- [How to find missing translations](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/detecting_missing_translations.md)
- [ICU message format: plurals, select and skeletons](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/icu_message_format.md)
