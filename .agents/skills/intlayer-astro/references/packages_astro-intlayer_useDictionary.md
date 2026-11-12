---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useDictionary Hook Documentation | astro-intlayer
description: See how to use the useDictionary hook in Astro components and scripts to resolve dictionary objects.
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# useDictionary Hook Documentation

The `useDictionary` hook resolves an imported or inline dictionary object and returns its content for the current locale in Astro applications.

Unlike `useIntlayer`, which retrieves dictionaries by key from the global dictionary registry, `useDictionary` works directly with a dictionary object.

## Usage

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

You can also pass inline dictionaries defined with `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
      es: "Todos los derechos reservados.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Parameters

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: A dictionary object or qualified dictionary group.
2. **`localeOrSelector`** (optional): A specific locale or selector object (`{ item }`, `{ variant }`, optionally with `locale`).

## Description

The hook performs the following tasks:

1. **Locale Detection**: On the server, it obtains the locale from `Astro.locals.intlayer`. In the browser, it uses the client-side store locale.
2. **Content Processing**: Resolves translations (`t()`), enumerations, conditions, and nested structures according to the resolved locale.
3. **Selectors**: Applies any item or variant selectors provided in the arguments.

## Related Documentation

- [`intlayer` Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useLocale.md)
