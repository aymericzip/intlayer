---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useDictionary Hook Documentation | remix-intlayer
description: See how to use the useDictionary hook in Remix 3 applications to resolve dictionary objects for the current request locale.
keywords:
  - useDictionary
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# useDictionary Hook Documentation

The `useDictionary` hook transforms an imported or inline dictionary object and returns its content resolved for the current request's locale in Remix 3 applications.

Unlike `useIntlayer`, which resolves dictionaries by their string key from the global dictionary registry, `useDictionary` accepts a dictionary object directly.

## Usage

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

You can also pass inline dictionaries defined with `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        "en-GB": "All rights reserved.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Parameters

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: A dictionary object or qualified dictionary group.
2. **`localeOrSelector`** (optional): A specific locale or selector object (`{ item }`, `{ variant }`, optionally with `locale`).

## Description

The hook performs the following tasks:

1. **Locale Detection**: Reads the active request locale from the `AsyncLocalStorage` store created by the `intlayer()` middleware.
2. **Content Resolution**: Evaluates translations (`t()`), enumerations, conditions, and nested structures according to the resolved locale.
3. **Selector Processing**: Applies any item or variant selectors specified in the arguments.

## Related Documentation

- [`intlayer` Middleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/remix-intlayer/useLocale.md)
