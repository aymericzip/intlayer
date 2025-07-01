---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: How to customise the locale list?
description: Learn how to customise the locale list.
keywords:
  - locales
  - list
  - intlayer
  - configuration
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - locale
  - list
slugs:
  - doc
  - faq
  - customised-locale-list
---

# Is it possible to block a language type, like English? I am adding English in my dictionaries but I don't want English available on the website just yet

Yes, you can block a language type, like English, by using the `availableLocales` option in the Intlayer configuration.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

or

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

This configuration will modify the types of your `t()` function to only include the available locales.

The `availableLocales` option is optional; if you do not provide it, all locales will be available.

Be cautious: all locales included in the `availableLocales` option should also be included in the `locales` option.

Note that if you use the `useLocale` hook, the `availableLocales` option will be used to set access to the locale list.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
