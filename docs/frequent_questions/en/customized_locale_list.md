---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: How to customize the locale list?
description: Learn how to customize the locale list.
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
  - frequent-questions
  - customized-locale-list
---

# Is it possible to block a language type, like English? I am adding english in my dictionares but i dont want english available in the web site just yet

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

This configuration will change the types of your `t()` function to only include the available locales.

Available locales is optional, if you don't provide it, all locales will be available.

Be careful, all locales included in the `availableLocales` option should be included in the `locales` option.

Note that if you use the `useLocale` hook, the `availableLocales` option will be used to set access to the locale list.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
