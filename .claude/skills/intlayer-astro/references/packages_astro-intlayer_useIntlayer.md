---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useIntlayer Hook Documentation | astro-intlayer
description: See how to use the useIntlayer hook in Astro components and client scripts to access localized content.
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# useIntlayer Hook Documentation

The `useIntlayer` hook allows you to retrieve localized dictionary content by key in Astro applications.

It can be called in two distinct contexts using the same import path:

1. **Server / Frontmatter**: Inside `.astro` files, it automatically resolves content using the request locale stored in `Astro.locals.intlayer`.
2. **Browser / Client `<script>`**: Inside client scripts or UI framework components, it resolves to the client-side store implementation (`vanilla-intlayer`).

## Usage

### In Astro Component Frontmatter

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### In Client `<script>` Blocks

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Parameters

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: The unique key of the dictionary (as defined in your `.content.ts` declaration files).
2. **`localeOrSelector`** (optional): A specific locale or selector object (`{ item }`, `{ variant }`, optionally with `locale`). When provided, it overrides the locale detected from the request context or client store.

## Description

The hook performs the following tasks:

1. **Locale Resolution**:
   - On the server, reads the active locale from `Astro.locals.intlayer` via an `AsyncLocalStorage` scope initialized by the `astro-intlayer/middleware`.
   - In the browser, reads the active locale from the client storage/store.
2. **Dictionary Retrieval**: Injects the dictionary content matching the specified key.
3. **Translation Processing**: Resolves translations (`t()`), enumerations, conditions, and markdown into ready-to-render content.

## Related Documentation

- [`intlayer` Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/intlayer.md)
- [`useDictionary` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useDictionary.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/astro-intlayer/useLocale.md)
