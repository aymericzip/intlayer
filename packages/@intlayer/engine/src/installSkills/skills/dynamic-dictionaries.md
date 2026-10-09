---
name: intlayer-dynamic-dictionaries
description: Declares several content files under one dictionary key with Intlayer collections (`item`) and variants (`variant`). Use when the user asks to "build an FAQ / list from separate files", "A/B test copy", "add a seasonal banner", "feature-flag content", "serve CMS / per-user content by id", or set an ambient `variant` on the provider.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  category: productivity
  tags: [i18n, collections, variants, ab-testing, dynamic-content]
  documentation: https://intlayer.org/doc/concept/dynamic-dictionaries
  support: contact@intlayer.org
---

# Intlayer Dynamic Dictionaries

[Doc](https://intlayer.org/doc/concept/dynamic-dictionaries.md)

Several content files can share the same dictionary `key`. A **top-level metadata field** tells them apart, no wrapper function needed:

| Feature     | Metadata field                      | Selector in `useIntlayer`                   |
| ----------- | ----------------------------------- | ------------------------------------------- |
| Collections | `item: N`                           | `{ item: N }`                               |
| Variants    | `variant: "name"` or `variant: {…}` | `{ variant: "name" }` or `{ variant: {…} }` |

Both compose with `locale` and with `importMode`. When a key declares both, they resolve in the order `variant → item`.

- **Collections**: ordered list of items managed in separate files (FAQ entries, pricing tiers, slides).
- **Variants**: alternatives of the same content. A **string** for A/B tests, seasonal banners or feature flags; an **object** for CMS records or user-specific copy addressed by fields.

## Collections

Each file is one item; `item` is its 1-based position. Intlayer merges them into an ordered array at build time.

```ts fileName="faq.1.content.ts"
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 1,
  content: {
    question: t({ en: "What is Intlayer?", fr: "Qu'est-ce qu'Intlayer ?" }),
    answer: t({ en: "An i18n toolkit.", fr: "Une boîte à outils i18n." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```tsx
const items = useIntlayer("faq"); // { question; answer }[]
const second = useIntlayer("faq", { item: 2 }); // { question; answer }
const secondFr = useIntlayer("faq", { item: 2, locale: "fr" });
```

## Variants

### Named (string) variants

Omitting `variant` (or setting `"default"`) marks the fallback entry.

```ts fileName="hero-banner.black-friday.content.ts"
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "black_friday",
  content: {
    headline: t({
      en: "50 % off, today only",
      fr: "−50 %, aujourd'hui seulement",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

```tsx
useIntlayer("hero-banner"); // default entry
useIntlayer("hero-banner", { variant: "black_friday" });
useIntlayer("hero-banner", { variant: "black_friday", locale: "fr" });
useIntlayer("hero-banner", { variant: "never-declared" }); // default entry
```

A variant declares **only the keys it overrides**; the others are inherited from the default entry. Only add a variant file where the wording differs. A key resolves to `null` only when it declares variants but no default entry.

### Object (structured) variants

The **whole object** is the identity: the selector must pass an equal object (every field, any order), otherwise the result is `null`. This replaces the former `meta` field (`meta: {…}` → `variant: {…}`).

```ts fileName="product.abc.content.ts"
const dictionary = {
  key: "product",
  importMode: "fetch", // object variants are often loaded lazily ("dynamic" | "fetch")
  variant: { id: "prod_abc", userId: "user_123" },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
  },
} satisfies Dictionary;
```

```tsx
const content = useIntlayer("product", {
  variant: { id: productId, userId },
});

if (!content) return null; // no matching record

useIntlayer("product", { variant: { id: "prod_abc" } }); // null: `userId` missing
```

### Ambient variant (provider)

For dimensions fixed for a whole session (tenant, plan tier, school type), set `variant` once on the provider, like `locale`:

```tsx
<IntlayerProvider locale={locale} variant={schoolType}>
  <App />
</IntlayerProvider>
```

Other frameworks: `installIntlayer(app, { locale, variant })` (Vue, Vanilla), `setupIntlayer(locale, variant)` (Svelte), `provideIntlayer(locale, true, variant)` (Angular), `variant` prop on `IntlayerProvider` from `next-intlayer/server` (Next.js).

A call-site selector **replaces** the provider variant, it does not extend it.

| Provider `variant` form                                   | Meaning                         |
| --------------------------------------------------------- | ------------------------------- |
| `variant="school1"`                                       | one named variant for every key |
| `variant={["school1", "default"]}`                        | ordered preference chain        |
| `variant={{ "hero-banner": "school1", default: "base" }}` | one variant per dictionary key  |

- A **chain** is tried left to right against the entries each key declares; the first declared one wins, else the default entry. Chains are also accepted at the call site: `useIntlayer("hero-banner", { variant: ["black_friday", "summer"] })`.
- On a provider, a plain object is **always** a per-key map. To pin an object variant globally, nest it: `variant={{ default: { id: "prod_abc" } }}`. Map keys are type-checked against declared dictionary keys.

## Rules

- **Never wrap `useIntlayer` in a custom hook to inject a variant.** The build optimization only rewrites a literal `useIntlayer("key")` imported from the framework package; content behind a wrapper is not bundled. Use the provider `variant` instead.
- Keep the selector argument a literal object passed to `useIntlayer` so the key stays statically analyzable.
- Collections return an array without `item`; guard object variants against `null`.

## References

- [Dynamic Dictionaries](https://intlayer.org/doc/concept/dynamic-dictionaries.md)
- [Collections](https://intlayer.org/doc/concept/collections.md)
- [Variants](https://intlayer.org/doc/concept/variants.md)
- [Bundle Optimization](https://intlayer.org/doc/concept/bundle-optimization.md)
